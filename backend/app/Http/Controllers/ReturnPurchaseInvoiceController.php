<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\PurchaseInvoice;
use App\Models\ReturnPurchaseInvoice;
use App\Models\ReturnPurchaseInvoiceProduct;
use App\Models\Transaction;
use Carbon\Carbon;
use DateTime;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ReturnPurchaseInvoiceController extends Controller
{
    //create returnPurchaseInvoice controller method
    public function createSingleReturnPurchaseInvoice(Request $request): JsonResponse
    {
        try {
            // calculate total purchase price
            $totalPurchasePrice = 0;
            foreach ($request->returnPurchaseInvoiceProduct as $item) {
                $totalPurchasePrice += (float) $item['productPurchasePrice'] * (float) $item['productQuantity'];
            }

            // ===================== DUE AMOUNT CALCULATION START=============================
            // get single purchase invoice information with products
            $singlePurchaseInvoice = PurchaseInvoice::where('id', (int) $request->input('purchaseInvoiceId'))
                ->first();

            // get transaction of paidAmount
            $transactions2 = Transaction::where('type', 'purchase')
                ->where('relatedId', (int) $request->input('purchaseInvoiceId'))
                ->where(function ($query) {
                    $query->orWhere('creditId', 1)
                        ->orWhere('creditId', 2);
                })
                ->get();

            // get transactions of discountEarned
            $transactions3 = Transaction::where('type', 'purchase')
                ->where('relatedId', (int) $request->input('purchaseInvoiceId'))
                ->where('creditId', 13)
                ->get();

            // transactions of the returnPurchaseInvoice amount
            $transactions4 = Transaction::where('type', 'purchase_return')
                ->where('relatedId', (int) $request->input('purchaseInvoiceId'))
                ->where(function ($query) {
                    $query->orWhere('debitId', 1)
                        ->orWhere('debitId', 2);
                })
                ->get();

            // get returnPurchaseInvoice information with products of this purchaseInvoice
            $returnPurchaseInvoice = ReturnPurchaseInvoice::where('purchaseInvoiceId', (int) $request->input('purchaseInvoiceId'))
                ->with('returnPurchaseInvoiceProduct', 'returnPurchaseInvoiceProduct.product')
                ->get();

            // sum of total paidAmount
            $totalPaidAmount = $transactions2->sum('amount');

            // sum of total discountEarned amount
            $totalDiscountAmount = $transactions3->sum('amount');

            // sum of total returnPurchaseInvoice amount
            $paidAmountReturn = $transactions4->sum('amount');

            // sum total amount of all returnPurchaseInvoice related to this purchaseInvoice
            $totalReturnAmount = $returnPurchaseInvoice->sum('totalAmount');

            $dueAmount = $singlePurchaseInvoice->totalAmount -
                $singlePurchaseInvoice->discount -
                $totalPaidAmount -
                $totalDiscountAmount -
                $totalReturnAmount +
                $paidAmountReturn;

            // ======================= DUE AMOUNT CALCULATION END =============================
            // convert all incoming data to a specific format.
            $date = Carbon::parse($request->input('date'));

            $createdReturnPurchaseInvoice = ReturnPurchaseInvoice::create([
                'date' => $date,
                'totalAmount' => takeUptoThreeDecimal((float) $totalPurchasePrice),
                'purchaseInvoiceId' => $request->input('purchaseInvoiceId'),
                'note' => $request->input('note'),
            ]);

            if ($createdReturnPurchaseInvoice) {
                foreach ($request->returnPurchaseInvoiceProduct as $item) {
                    ReturnPurchaseInvoiceProduct::create([
                        'invoiceId' => $createdReturnPurchaseInvoice->id,
                        'productId' => (int) $item['productId'],
                        'productQuantity' => (int) $item['productQuantity'],
                        'productPurchasePrice' => takeUptoThreeDecimal((float) (float) $item['productPurchasePrice']),
                    ]);
                }
            }

            // receive payment from supplier on return purchase transaction create
            if ($dueAmount >= $totalPurchasePrice) {
                Transaction::create([
                    'date' => $date,
                    'debitId' => 5,
                    'creditId' => 3,
                    'amount' => takeUptoThreeDecimal((float) $totalPurchasePrice),
                    'particulars' => "Account payable (due) reduced on Purchase return Invoice #{$createdReturnPurchaseInvoice->id} of purchase invoice #{$request->input('purchaseInvoiceId')}",
                    'type' => 'purchase_return',
                    'relatedId' => (int) $request->input('purchaseInvoiceId'),
                ]);
            }

            if ($dueAmount < $totalPurchasePrice) {
                Transaction::create([
                    'date' => $date,
                    'debitId' => 5,
                    'creditId' => 3,
                    'amount' => takeUptoThreeDecimal((float) $dueAmount),
                    'particulars' => "Account payable (due) reduced on Purchase return invoice #{$createdReturnPurchaseInvoice->id} of purchase invoice #{$request->input('purchaseInvoiceId')}",
                    'type' => 'purchase_return',
                    'relatedId' => (int) $request->input('purchaseInvoiceId'),
                ]);

                Transaction::create([
                    'date' => $date,
                    'debitId' => 1,
                    'creditId' => 3,
                    'amount' => takeUptoThreeDecimal((float) $totalPurchasePrice - (float) $dueAmount),
                    'particulars' => "Cash receive on Purchase return invoice #{$createdReturnPurchaseInvoice->id} of purchase invoice #{$request->input('purchaseInvoiceId')}",
                    'type' => 'purchase_return',
                    'relatedId' => (int) $request->input('purchaseInvoiceId'),
                ]);
            }

            // iterate through all products of this return purchase invoice and decrement the product quantity,
            foreach ($request->returnPurchaseInvoiceProduct as $item) {
                $productId = (int) $item['productId'];
                $productQuantity = (int) $item['productQuantity'];

                Product::where('id', $productId)->update([
                    'productQuantity' => DB::raw("productQuantity - $productQuantity"),
                ]);
            }

            $converted = arrayKeysToCamelCase($createdReturnPurchaseInvoice->toArray());
            return response()->json(["createdReturnPurchaseInvoice" => $converted], 201);
        } catch (Exception $err) {
            return response()->json(['error' => 'An error occurred during create ReturnPurchaseInvoice. Please try again later.'], 500);
        }
    }

    // get all the returnPurchaseInvoice controller method
    public function getAllReturnPurchaseInvoice(Request $request): JsonResponse
    {
        if ($request->query('query') === 'info') {
            try {
                $aggregations = ReturnPurchaseInvoice::selectRaw('COUNT(id) as id, SUM(totalAmount) as totalAmount')
                    ->first();

                $result = [
                    '_count' => [
                        'id' => $aggregations->id
                    ],
                    '_sum' => [
                        'totalAmount' => $aggregations->totalAmount,
                    ],
                ];

                return response()->json($result, 200);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during getting ReturnPurchaseInvoice. Please try again later.'], 500);
            }
        } else if ($request->query('query') === 'all') {
            try {
                $allReturnPurchaseInvoice = ReturnPurchaseInvoice::with('purchaseInvoice.supplier')
                    ->get();

                $converted = arrayKeysToCamelCase($allReturnPurchaseInvoice->toArray());
                return response()->json($converted, 200);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during getting ReturnPurchaseInvoice. Please try again later.'], 500);
            }
        } else if ($request->query('query') === 'group') {
            try {
                $allReturnPurchaseInvoice = ReturnPurchaseInvoice::selectRaw('date as date, SUM(totalAmount) as totalAmount, COUNT(id) as idCount')
                    ->groupBy('date')
                    ->orderBy('date', 'asc')
                    ->get();

                $converted = arrayKeysToCamelCase($allReturnPurchaseInvoice->toArray());
                $finalResult = collect($converted)->map(function ($item) {
                    $modifiedInvoice = [
                        '_sum' => [
                            'totalAmount' => $item['totalAmount'],
                        ],
                        '_count' => [
                            'id' => $item['idCount'],
                        ],
                        'date' => $item['date'],
                    ];

                    return $modifiedInvoice;
                });

                return response()->json($finalResult, 200);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during getting ReturnPurchaseInvoice. Please try again later.'], 500);
            }
        } else if ($request->query('status')) {
            try {
                $pagination = getPagination($request->query());

                $startDate = Carbon::parse($request->query('startdate'));
                $endDate = Carbon::parse($request->query('enddate'));

                $aggregation = ReturnPurchaseInvoice::whereBetween('date', [$startDate, $endDate])
                    ->where('status', $request->query('status'))
                    ->selectRaw('COUNT(id) as idCount, SUM(totalAmount) as totalAmount')
                    ->first();

                $allPurchaseInvoice = ReturnPurchaseInvoice::whereBetween('date', [$startDate, $endDate])
                    ->where('status', $request->query('status'))
                    ->with('purchaseInvoice.supplier')
                    ->orderBy('id', 'desc')
                    ->skip($pagination['skip'])
                    ->take($pagination['limit'])
                    ->get();

                $aggregations = [
                    '_count' => [
                        'id' => $aggregation->idCount,
                    ],
                    '_sum' => [
                        'totalAmount' => $aggregation->totalAmount,
                    ],
                ];

                $converted = arrayKeysToCamelCase($allPurchaseInvoice->toArray());
                $finalResult = [
                    'aggregations' => $aggregations,
                    'allPurchaseInvoice' => $converted,
                ];

                return response()->json($finalResult, 200);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during getting ReturnPurchaseInvoice. Please try again later.'], 500);
            }
        } else {
            try {
                $pagination = getPagination($request->query());

                $startDate = Carbon::parse($request->query('startdate'));
                $endDate = Carbon::parse($request->query('enddate'));

                $aggregation = ReturnPurchaseInvoice::whereBetween('date', [$startDate, $endDate])
                    ->where('status', 'true')
                    ->selectRaw('COUNT(id) as idCount, SUM(totalAmount) as totalAmount')
                    ->first();

                $allPurchaseInvoice = ReturnPurchaseInvoice::whereBetween('date', [$startDate, $endDate])
                    ->where('status', 'true')
                    ->with('purchaseInvoice.supplier')
                    ->orderBy('id', 'desc')
                    ->skip($pagination['skip'])
                    ->take($pagination['limit'])
                    ->get();

                $aggregations = [
                    '_count' => [
                        'id' => $aggregation->idCount,
                    ],
                    '_sum' => [
                        'totalAmount' => $aggregation->totalAmount,
                    ],
                ];

                $converted = arrayKeysToCamelCase($allPurchaseInvoice->toArray());
                $finalResult = [
                    'aggregations' => $aggregations,
                    'allPurchaseInvoice' => $converted,
                ];

                return response()->json($finalResult, 200);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during getting ReturnPurchaseInvoice. Please try again later.'], 500);
            }
        }
    }

    // get a single returnPurchaseInvoice controller method
    public function getSingleReturnPurchaseInvoice(Request $request, $id): JsonResponse
    {
        try {
            $singleProduct = ReturnPurchaseInvoice::where('id', (int) $id)
                ->with('returnPurchaseInvoiceProduct', 'returnPurchaseInvoiceProduct.product', 'purchaseInvoice.supplier')
                ->first();

            $converted = arrayKeysToCamelCase($singleProduct->toArray());
            return response()->json($converted, 200);
        } catch (Exception $err) {
            return response()->json(['error' => 'An error occurred during getting ReturnPurchaseInvoice. Please try again later.'], 500);
        }
    }

    // on delete purchase invoice, decrease product quantity, supplier due amount decrease, transaction create
    public function deleteSingleReturnPurchaseInvoice(Request $request, $id): JsonResponse
    {
        try {
            // get purchaseInvoice details
            $returnPurchaseInvoice = ReturnPurchaseInvoice::where('id', (int) $id)
                ->with('returnPurchaseInvoiceProduct', 'returnPurchaseInvoiceProduct.product')
                ->first();

            // product quantity increase
            foreach ($returnPurchaseInvoice->returnPurchaseInvoiceProduct as $item) {
                $productId = (int) $item['productId'];
                $productQuantity = (int) $item['productQuantity'];

                Product::where('id', $productId)->update([
                    'productQuantity' => DB::raw("productQuantity + $productQuantity"),
                ]);
            }

            $deletePurchaseInvoice = ReturnPurchaseInvoice::where('id', (int) $id)
                ->update([
                    'status' => $request->input('status'),
                ]);

            if (!$deletePurchaseInvoice) {
                return response()->json(['error' => 'Failed To Delete ReturnPurchaseInvoice'], 404);
            }

            return response()->json(['message' => 'Return Purchase Invoice deleted successfully'], 200);
        } catch (Exception $err) {
            return response()->json(['error' => 'An error occurred during delete ReturnPurchaseInvoice. Please try again later.'], 500);
        }
    }
}
