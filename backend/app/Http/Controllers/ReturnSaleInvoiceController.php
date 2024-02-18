<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ReturnSaleInvoice;
use App\Models\ReturnSaleInvoiceProduct;
use App\Models\SaleInvoice;
use App\Models\Transaction;
use Carbon\Carbon;
use DateTime;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ReturnSaleInvoiceController extends Controller
{
    //create returnSaleInvoice controller method
    public function createSingleReturnSaleInvoice(Request $request): JsonResponse
    {
        try {
            // calculate total purchase price
            $totalSalePrice = 0;
            foreach ($request->returnSaleInvoiceProduct as $item) {
                $totalSalePrice += (float) $item['productSalePrice'] * (float) $item['productQuantity'];
            }


            // get all the product
            $allProduct = collect($request->returnSaleInvoiceProduct)->map(function ($item) {
                return Product::where('id', $item['productId'])
                    ->get();
            })->flatten();


            // iterate over allProduct and calculate totalPurchase price
            $totalPurchasePrice = 0;
            foreach ($request->returnSaleInvoiceProduct as $index => $item) {
                $totalPurchasePrice += $allProduct[$index]['productPurchasePrice'] * $item['productQuantity'];
            }

            // ============= START calculate the dueAmount of saleInvoice ===============
            // calculate the due before returnSaleInvoice creation

            $singleSaleInvoice = SaleInvoice::where('id', (int) $request->input('saleInvoiceId'))
                ->with('saleInvoiceProduct', 'saleInvoiceProduct.product', 'customer', 'user:id,username')
                ->first();

            // transactions of the paidAmount
            $transactions2 = Transaction::where('type', 'sale')
                ->where('relatedId', (int) $request->input('saleInvoiceId'))
                ->where(function ($query) {
                    $query->orWhere('debitId', 1)
                        ->orWhere('debitId', 2);
                })
                ->with('debit:id,name', 'credit:id,name')
                ->get();

            // calculate the discount given amount at the time of make the payment
            $transactions3 = Transaction::where('type', 'sale')
                ->where('relatedId', (int) $request->input('saleInvoiceId'))
                ->where('debitId', 14)
                ->with('debit:id,name', 'credit:id,name')
                ->get();

            // calculate the totalAmount return back to customer for returnSaleInvoice from transactions
            // transactions of the paid amount
            $transactions4 = Transaction::where('type', 'sale_return')
                ->where('relatedId', (int) $request->input('saleInvoiceId'))
                ->where(function ($query) {
                    $query->orWhere('creditId', 1)
                        ->orWhere('creditId', 2);
                })
                ->with('debit:id,name', 'credit:id,name')
                ->get();

            // transaction of the total returnAmount
            $returnSaleInvoice = ReturnSaleInvoice::where('saleInvoiceId', (int) $request->input('saleInvoiceId'))
                ->with('returnSaleInvoiceProduct', 'returnSaleInvoiceProduct.product')
                ->get();

            // sum total paidAmount of all transactions
            $totalPaidAmount = $transactions2->sum('amount');

            // sum of total discountGivenAmount at the time of make the payment
            $totalDiscountAmount = $transactions3->sum('amount');

            // total paidAmountReturn from transactions
            $paidAmountReturn = $transactions4->sum('amount');

            // total returnAmount from returnSaleInvoice
            $totalReturnAmount = $returnSaleInvoice->sum('totalAmount');

            // calculate the dueAmount
            $dueAmount = $singleSaleInvoice->totalAmount -
                $singleSaleInvoice->discount -
                $totalPaidAmount -
                $totalDiscountAmount -
                $totalReturnAmount +
                $paidAmountReturn;

            // convert all incoming date to a specific format.
            $date = Carbon::parse($request->input('date'))->toDateString();

            // create returnSaleInvoice method
            $createdReturnSaleInvoice = ReturnSaleInvoice::create([
                'date' => new DateTime($date),
                'totalAmount' => takeUptoThreeDecimal((float) $totalSalePrice),
                'saleInvoiceId' => (int) $request->input('saleInvoiceId'),
                'note' => $request->input('note'),
            ]);

            if ($createdReturnSaleInvoice) {
                foreach ($request->returnSaleInvoiceProduct as $item) {
                    ReturnSaleInvoiceProduct::create([
                        'invoiceId' => $createdReturnSaleInvoice->id,
                        'productId' => (int) $item['productId'],
                        'productQuantity' => (int) $item['productQuantity'],
                        'productSalePrice' => takeUptoThreeDecimal((float) $item['productSalePrice']),
                    ]);
                }
            }

            // return transaction Account Receivable - for due amount
            if ($dueAmount >= $totalSalePrice) {
                Transaction::create([
                    'date' => new DateTime($date),
                    'debitId' => 8,
                    'creditId' => 4,
                    'amount' => takeUptoThreeDecimal((float) $totalSalePrice),
                    'particulars' => "Account Receivable on Sale return Invoice #{$createdReturnSaleInvoice->id} of sale Invoice #{$request->input('saleInvoiceId')}",
                    'type' => 'sale_return',
                    'relatedId' => (int) $request->input('saleInvoiceId'),
                ]);
            }

            // dueAmount is less than total Accounts Receivable - for cash amount
            // two transaction will be created for cash and due adjustment
            // TODO: dynamic credit id like bank, cash, etc
            if ($dueAmount < $totalSalePrice) {
                Transaction::create([
                    'date' => new DateTime($date),
                    'debitId' => 8,
                    'creditId' => 4,
                    'amount' => takeUptoThreeDecimal((float) $dueAmount),
                    'particulars' => "Account Receivable on Sale return Invoice #{$createdReturnSaleInvoice->id} of sale Invoice #{$request->input('saleInvoiceId')}",
                    'type' => 'sale_return',
                    'relatedId' => (int) $request->input('saleInvoiceId'),
                ]);

                Transaction::create([
                    'date' => new DateTime($date),
                    'debitId' => 8,
                    'creditId' => 1,
                    'amount' => takeUptoThreeDecimal((float) ($totalSalePrice - $dueAmount)),
                    'particulars' => "Cash paid on Sale return invoice #{$createdReturnSaleInvoice->id} of sale Invoice #{$request->input('saleInvoiceId')}",
                    'type' => 'sale_return',
                    'relatedId' => (int) $request->input('saleInvoiceId'),
                ]);
            }

            // goods received on return sale transaction create
            Transaction::create([
                'date' => new DateTime($date),
                'debitId' => 3,
                'creditId' => 9,
                'amount' => takeUptoThreeDecimal((float) $totalPurchasePrice),
                'particulars' => "Cost of sales reduce on Sale return Invoice #{$createdReturnSaleInvoice->id} of sale Invoice #{$request->input('saleInvoiceId')}",
                'type' => 'sale_return',
                'relatedId' => (int) $request->input('saleInvoiceId'),
            ]);

            // iterate through all products of this return sale invoice and increase the product quantity
            foreach ($request->returnSaleInvoiceProduct as $item) {
                Product::where('id', (int) $item['productId'])
                    ->update([
                        'productQuantity' => DB::raw("productQuantity +  {$item['productQuantity']}"),
                    ]);
            }

            // decrease sale invoice profit by return sale invoice's calculated profit profit
            $returnSaleInvoiceProfit = $totalSalePrice - $totalPurchasePrice;

            SaleInvoice::where('id', (int) $request->input('saleInvoiceId'))
                ->update([
                    'profit' => DB::raw("profit - $returnSaleInvoiceProfit"),
                ]);


            $converted = arrayKeysToCamelCase($createdReturnSaleInvoice->toArray());
            return response()->json($converted, 201);
        } catch (Exception $err) {
            return response()->json(['error' => 'An error occurred during create ReturnSaleInvoice. Please try again later.'], 500);
        }
    }

    // get all returnSaleInvoice controller method
    public function getAllReturnSaleInvoice(Request $request): JsonResponse
    {
        if ($request->query('query') === 'info') {
            try {
                $aggregations = ReturnSaleInvoice::selectRaw('COUNT(id) as countedId, SUM(totalAmount) as totalAmount')
                    ->first();

                $result = [
                    '_count' => [
                        'id' => $aggregations->countedId
                    ],
                    '_sum' => [
                        'totalAmount' => $aggregations->totalAmount,
                    ],
                ];

                return response()->json($result, 200);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during getting ReturnSaleInvoice. Please try again later.'], 500);
            }
        } else if ($request->query('query') === 'all') {
            try {
                $allReturnSaleInvoice = ReturnSaleInvoice::with('saleInvoice.customer:id,name,email,phone,address')
                    ->get();

                $converted = arrayKeysToCamelCase($allReturnSaleInvoice->toArray());
                return response()->json($converted, 200);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during getting ReturnSaleInvoice. Please try again later.'], 500);
            }
        } else if ($request->query('query') === 'group') {
            try {
                $allReturnSaleInvoice = ReturnSaleInvoice::selectRaw('date as date, SUM(totalAmount) as totalAmount, COUNT(id) as idCount')
                    ->groupBy('date')
                    ->orderBy('date', 'asc')
                    ->get();

                $converted = arrayKeysToCamelCase($allReturnSaleInvoice->toArray());
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
                return response()->json(['error' => 'An error occurred during getting ReturnSaleInvoice. Please try again later.'], 500);
            }
        } else if ($request->query('status')) {
            try {
                $pagination = getPagination($request->query());

                $startDate = Carbon::parse($request->query('startdate'));
                $endDate = Carbon::parse($request->query('enddate'));

                $aggregation = ReturnSaleInvoice::where('status', $request->query('status'))
                    ->whereBetween('date', [$startDate, $endDate])
                    ->selectRaw('COUNT(id) as idCount, SUM(totalAmount) as totalAmount')
                    ->first();

                $allReturnSaleInvoice = ReturnSaleInvoice::where('status', $request->query('status'))
                    ->whereBetween('date', [$startDate, $endDate])
                    ->with('saleInvoice.customer:id,name,email,phone,address')
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

                $converted = arrayKeysToCamelCase($allReturnSaleInvoice->toArray());
                $finalResult = [
                    'aggregations' => $aggregations,
                    'allSaleInvoice' => $converted,
                ];

                return response()->json($finalResult, 200);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during getting ReturnSaleInvoice. Please try again later.'], 500);
            }
        } else {
            try {
                $pagination = getPagination($request->query());

                $startDate = Carbon::parse($request->query('startdate'));
                $endDate = Carbon::parse($request->query('enddate'));

                $aggregation = ReturnSaleInvoice::whereBetween('date', [$startDate, $endDate])
                    ->where('status', 'true')
                    ->selectRaw('COUNT(id) as idCount, SUM(totalAmount) as totalAmount')
                    ->first();

                $allSaleReturnSaleInvoice = ReturnSaleInvoice::whereBetween('date', [$startDate, $endDate])
                    ->where('status', 'true')
                    ->with('saleInvoice.customer:id,name,email,phone,address')
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

                $converted = arrayKeysToCamelCase($allSaleReturnSaleInvoice->toArray());
                $finalResult = [
                    'aggregations' => $aggregations,
                    'allSaleInvoice' => $converted,
                ];

                return response()->json($finalResult, 200);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during getting ReturnSaleInvoice. Please try again later.'], 500);
            }
        }
    }

    // get a single returnSaleInvoice controller method
    public function getSingleReturnSaleInvoice(Request $request, $id): JsonResponse
    {
        try {
            $singleProduct = ReturnSaleInvoice::where('id', (int) $id)
                ->with('returnSaleInvoiceProduct', 'returnSaleInvoiceProduct.product', 'saleInvoice.customer:id,name,email,phone,address')
                ->first();

            $converted = arrayKeysToCamelCase($singleProduct->toArray());
            return response()->json($converted, 200);
        } catch (Exception $err) {
            return response()->json(['error' => 'An error occurred during getting ReturnSaleInvoice. Please try again later.'], 500);
        }
    }

    // delete a single returnSaleInvoice controller method
    // on delete purchase invoice, decrease product quantity, customer due amount decrease, transaction create
    public function deleteSingleReturnSaleInvoice(Request $request, $id): JsonResponse
    {
        try {
            // get returnSaleInvoice details
            $returnSaleInvoice = ReturnSaleInvoice::where('id', (int) $id)
                ->with('returnSaleInvoiceProduct', 'returnSaleInvoiceProduct.product')
                ->first();

            // product quantity decrease
            foreach ($returnSaleInvoice->returnSaleInvoiceProduct as $item) {
                $productId = (int) $item['productId'];
                $productQuantity = (int) $item['productQuantity'];

                Product::where('id', $productId)->update([
                    'productQuantity' => DB::raw("productQuantity - $productQuantity"),
                ]);
            }

            $deletedReturnSaleInvoice = ReturnSaleInvoice::where('id', (int) $id)
                ->update([
                    'status' => $request->input('status'),
                ]);

            if (!$deletedReturnSaleInvoice) {
                return response()->json(['error' => 'Failed To Delete ReturnSaleInvoice'], 404);
            }

            return response()->json(['message' => 'Return Sale Invoice deleted successfully'], 200);
        } catch (Exception $err) {
            return response()->json(['error' => 'An error occurred during delete ReturnSaleInvoice. Please try again later.'], 500);
        }
    }
}
