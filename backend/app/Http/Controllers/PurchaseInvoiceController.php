<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\PurchaseInvoice;
use App\Models\PurchaseInvoiceProduct;
use App\Models\ReturnPurchaseInvoice;
use App\Models\Transaction;
use Carbon\Carbon;
use DateTime;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PurchaseInvoiceController extends Controller
{
    //create purchaseInvoice controller method
    public function createSinglePurchaseInvoice(Request $request): JsonResponse
    {
        try {
            // calculate total purchase price
            $totalPurchasePrice = 0;
            foreach ($request->purchaseInvoiceProduct as $item) {
                $totalPurchasePrice += (float)$item['productPurchasePrice'] * (float)$item['productQuantity'];
            }

            $date = Carbon::parse($request->input('date'));

            $createdInvoice = PurchaseInvoice::create([
                'date' => $date,
                'totalAmount' => takeUptoThreeDecimal((float)$totalPurchasePrice),
                'discount' => takeUptoThreeDecimal((float)$request->input('discount')),
                'paidAmount' => takeUptoThreeDecimal((float)$request->input('paidAmount')),
                'dueAmount' => takeUptoThreeDecimal((float)$totalPurchasePrice) -
                    takeUptoThreeDecimal((float)$request->input('discount')) -
                    takeUptoThreeDecimal((float)$request->input('paidAmount')),
                'supplierId' => $request->input('supplierId'),
                'note' => $request->input('note'),
                'supplierMemoNo' => $request->input('supplierMemoNo'),
            ]);

            if ($createdInvoice) {
                foreach ($request->purchaseInvoiceProduct as $item) {
                    PurchaseInvoiceProduct::create([
                        'invoiceId' => $createdInvoice->id,
                        'productId' => $item['productId'],
                        'productQuantity' => $item['productQuantity'],
                        'productPurchasePrice' => takeUptoThreeDecimal((float)$item['productPurchasePrice']),
                    ]);
                }
            }


            // pay on purchase transaction create
            if ($request->input('paidAmount') > 0) {
                Transaction::create([
                    'date' => new DateTime($date),
                    'debitId' => 3,
                    'creditId' => $request->input('paymentType') ? (int)$request->input('paymentType') : 1,
                    'amount' => takeUptoThreeDecimal((float)$request->input('paidAmount')),
                    'particulars' => "Cash paid on Purchase Invoice #{$createdInvoice->id}",
                    'type' => 'purchase',
                    'relatedId' => $createdInvoice->id,
                ]);
            }

            // if purchase on due then create another transaction
            $dueAmount = $totalPurchasePrice -
                (float)$request->input('discount') -
                (float)$request->input('paidAmount');

            if ($dueAmount > 0) {
                Transaction::create([
                    'date' => $date,
                    'debitId' => 3,
                    'creditId' => 5,
                    'amount' => takeUptoThreeDecimal((float)$dueAmount),
                    'particulars' => "Due on Purchase Invoice #{$createdInvoice->id}",
                    'type' => 'purchase',
                    'relatedId' => $createdInvoice->id,
                ]);
            }

            // iterate through all products of this purchase invoice and add product quantity, update product purchase price to database
            foreach ($request->purchaseInvoiceProduct as $item) {
                $productId = (int)$item['productId'];
                $productQuantity = (int)$item['productQuantity'];
                $productPurchasePrice = (float)$item['productPurchasePrice'];
                $productSalePrice = (float)$item['productSalePrice'];

                Product::where('id', $productId)->update([
                    'productQuantity' => DB::raw("productQuantity + $productQuantity"),
                    'productPurchasePrice' => takeUptoThreeDecimal($productPurchasePrice),
                    'productSalePrice' => takeUptoThreeDecimal($productSalePrice),
                ]);
            }

            $converted = arrayKeysToCamelCase($createdInvoice->toArray());
            return response()->json(["createdInvoice" => $converted], 201);
        } catch (Exception $err) {
            return response()->json(['error' => 'An error occurred during create PurchaseInvoice. Please try again later.'], 500);
        }
    }

    // get all the purchaseInvoice controller method
    public function getAllPurchaseInvoice(Request $request): JsonResponse
    {
        if ($request->query('query') === 'info') {
            try {
                $aggregation = PurchaseInvoice::selectRaw('COUNT(id) as id, SUM(totalAmount) as totalAmount, SUM(dueAmount) as dueAmount, SUM(paidAmount) as paidAmount, SUM(discount) as discount')
                    ->first();

                // transaction of the paidAmount
                $totalPaidAmount = Transaction::where('type', 'purchase')
                    ->where(function ($query) {
                        $query->orWhere('creditId', 1)
                            ->orWhere('creditId', 2);
                    })
                    ->selectRaw('COUNT(id) as id, SUM(amount) as amount')
                    ->first();

                // transaction of the discountEarned amount
                $totalDiscountAmount = Transaction::where('type', 'purchase')
                    ->where('creditId', 13)
                    ->selectRaw('COUNT(id) as id, SUM(amount) as amount')
                    ->first();

                // transactions returnPurchaseInvoice amount
                $paidAmountReturn = Transaction::where('type', 'purchase_return')
                    ->where(function ($query) {
                        $query->orWhere('debitId', 1)
                            ->orWhere('debitId', 2);
                    })
                    ->selectRaw('COUNT(id) as id, SUM(amount) as amount')
                    ->first();

                // get return purchaseInvoice information with products of this purchase invoice
                $totalReturnAmount = ReturnPurchaseInvoice::selectRaw('COUNT(id) as id, SUM(totalAmount) as totalAmount')
                    ->first();

                $dueAmount = $aggregation->totalAmount -
                    $aggregation->discount -
                    $totalPaidAmount->amount -
                    $totalDiscountAmount->amount -
                    $totalReturnAmount->totalAmount +
                    $paidAmountReturn->amount;

                $result = [
                    '_count' => [
                        'id' => $aggregation->id
                    ],
                    '_sum' => [
                        'totalAmount' => $aggregation->totalAmount,
                        'dueAmount' => $dueAmount,
                        'paidAmount' => $aggregation->paidAmount,
                    ],
                ];

                return response()->json($result, 200);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during getting PurchaseInvoice. Please try again later.'], 500);
            }
        } else if ($request->query('query') === 'search') {
            try {
                $allPurchase = PurchaseInvoice::where('id', $request->query('purchase'))
                    ->with('purchaseInvoiceProduct')
                    ->orderBy('id', 'desc')
                    ->get();

                $converted = arrayKeysToCamelCase($allPurchase->toArray());
                return response()->json($converted, 200);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during getting PurchaseInvoice. Please try again later.'], 500);
            }
        } else {
            try {
                $pagination = getPagination($request->query());

                $startDate = Carbon::parse($request->query('startdate'));
                $endDate = Carbon::parse($request->query('enddate'));

                $aggregations = PurchaseInvoice::whereBetween('date', [$startDate, $endDate])
                    ->selectRaw('COUNT(id) as id, SUM(totalAmount) as totalAmount, SUM(discount) as discount, SUM(dueAmount) as dueAmount, SUM(paidAmount) as paidAmount')
                    ->first();

                $purchaseInvoices = PurchaseInvoice::with('supplier:id,name')
                    ->whereBetween('date', [$startDate, $endDate])
                    ->orderBy('id', 'desc')
                    ->get();

                $purchaseInvoiceIds = $purchaseInvoices->pluck('id')->toArray();

                // get all transactions related to purchase invoice
                $transactions = Transaction::where('type', 'purchase')
                    ->whereIn('relatedId', $purchaseInvoiceIds)
                    ->where(function ($query) {
                        $query->orWhere('creditId', 1)
                            ->orWhere('creditId', 2);
                    })
                    ->get();

                // get all transactions related to purchase returns invoice
                $transactions2 = Transaction::where('type', 'purchase_return')
                    ->whereIn('relatedId', $purchaseInvoiceIds)
                    ->where(function ($query) {
                        $query->orWhere('debitId', 1)
                            ->orWhere('debitId', 2);
                    })
                    ->get();

                // calculate the discount earned amount at the time of make the payment
                $transactions3 = Transaction::where('type', 'purchase')
                    ->whereIn('relatedId', $purchaseInvoiceIds)
                    ->where('creditId', 13)
                    ->with('debit:id,name', 'credit:id,name')
                    ->get();

                $returnPurchaseInvoice = ReturnPurchaseInvoice::whereIn('purchaseInvoiceId', $purchaseInvoiceIds)
                    ->get();


                // calculate paid amount and due amount of individual purchase invoice from transactions and returnPurchaseInvoice and attach it to purchaseInvoices
                $allPurchaseInvoice = $purchaseInvoices->map(function ($item) use ($transactions, $transactions2, $transactions3, $returnPurchaseInvoice) {

                    $paidAmount = $transactions->filter(function ($trans) use ($item) {
                        return $trans->relatedId === $item->id;
                    })->reduce(function ($acc, $current) {
                        return $acc + $current->amount;
                    }, 0);

                    $paidAmountReturn = $transactions2->filter(function ($trans) use ($item) {
                        return $trans->relatedId === $item->id;
                    })->reduce(function ($acc, $current) {
                        return $acc + $current->amount;
                    }, 0);

                    $discountEarned = $transactions3->filter(function ($trans) use ($item) {
                        return $trans->relatedId === $item->id;
                    })->reduce(function ($acc, $current) {
                        return $acc + $current->amount;
                    }, 0);

                    $returnAmount = $returnPurchaseInvoice->filter(function ($returnPurchaseInv) use ($item) {
                        return $returnPurchaseInv->purchaseInvoiceId === $item->id;
                    })->reduce(function ($acc, $current) {
                        return $acc + $current->totalAmount;
                    }, 0);


                    $discount = $item->discount + $discountEarned;

                    $dueAmount = $item->totalAmount -
                        $item->discount -
                        $paidAmount -
                        $returnAmount +
                        $paidAmountReturn -
                        $discountEarned;

                    $item->paidAmount = $paidAmount;
                    $item->discount = $discount;
                    $item->dueAmount = $dueAmount;

                    return $item;
                });

                // calculate total paidAmount and dueAmount from allPurchaseInvoice and attach it to aggregations
                $totalAmount = $allPurchaseInvoice->sum('totalAmount');
                $totalPaidAmount = $allPurchaseInvoice->sum('paidAmount');
                $totalDueAmount = $allPurchaseInvoice->sum('dueAmount');
                $totalDiscountGiven = $allPurchaseInvoice->sum('discount');
                $counted = $allPurchaseInvoice->count('id');

                $modifiedData = collect($allPurchaseInvoice)->skip($pagination['skip'])
                    ->take($pagination['limit']);

                $aggregations = [
                    '_count' => [
                        'id' => $counted,
                    ],
                    '_sum' => [
                        'totalAmount' => $totalAmount,
                        'paidAmount' => $totalPaidAmount,
                        'dueAmount' => $totalDueAmount,
                        'discount' => $totalDiscountGiven,
                    ],
                ];

                $converted = arrayKeysToCamelCase($modifiedData->toArray());
                $finalResult = [
                    'aggregations' => $aggregations,
                    'allPurchaseInvoice' => $converted,
                ];

                return response()->json($finalResult, 200);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during getting PurchaseInvoice. Please try again later.'], 500);
            }
        }
    }

    // get a single purchaseInvoice controller method
    public function getSinglePurchaseInvoice(Request $request, $id): JsonResponse
    {
        try {
            // get single purchase invoice information with products
            $singlePurchaseInvoice = PurchaseInvoice::where('id', $id)
                ->with('purchaseInvoiceProduct.product', 'supplier')
                ->first();

            // get all transactions related to this purchase invoice
            $transactions = Transaction::where('relatedId', $id)
                ->where(function ($query) {
                    $query->orWhere('type', 'purchase')
                        ->orWhere('type', 'purchase_return');
                })
                ->with('debit:id,name', 'credit:id,name')
                ->get();

            // transaction of the paidAmount
            $transactions2 = Transaction::where('relatedId', $id)
                ->where('type', 'purchase')
                ->where(function ($query) {
                    $query->orWhere('creditId', 1)
                        ->orWhere('creditId', 2);
                })
                ->with('debit:id,name', 'credit:id,name')
                ->get();

            // transaction of the discountEarned amount
            $transactions3 = Transaction::where('relatedId', $id)
                ->where('type', 'purchase')
                ->where('creditId', 13)
                ->with('debit:id,name', 'credit:id,name')
                ->get();

            // transactions returnPurchaseInvoice amount
            $transactions4 = Transaction::where('relatedId', $id)
                ->where('type', 'purchase_return')
                ->where(function ($query) {
                    $query->orWhere('debitId', 1)
                        ->orWhere('debitId', 2);
                })
                ->with('debit:id,name', 'credit:id,name')
                ->get();

            // get return purchaseInvoice information with products of this purchase invoice
            $returnPurchaseInvoice = ReturnPurchaseInvoice::where('purchaseInvoiceId', $id)
                ->with('returnPurchaseInvoiceProduct', 'returnPurchaseInvoiceProduct.product')
                ->get();

            // sum of total paid amount
            $totalPaidAmount = $transactions2->sum('amount');

            // sum of total discount earned amount
            $totalDiscountAmount = $transactions3->sum('amount');

            // sum of total return purchase invoice amount
            $paidAmountReturn = $transactions4->sum('amount');

            // sum total amount of all return purchase invoice related to this purchase invoice
            $totalReturnAmount = $returnPurchaseInvoice->sum('totalAmount');


            $dueAmount = $singlePurchaseInvoice->totalAmount -
                $singlePurchaseInvoice->discount -
                $totalPaidAmount -
                $totalDiscountAmount -
                $totalReturnAmount +
                $paidAmountReturn;


            $status = "UNPAID";
            if ($dueAmount <= (float)0) {
                $status = "PAID";
            }

            $convertedSingleInvoice = arrayKeysToCamelCase($singlePurchaseInvoice->toArray());
            $convertedReturnInvoice = arrayKeysToCamelCase($returnPurchaseInvoice->toArray());
            $convertedTransactions = arrayKeysToCamelCase($transactions->toArray());
            $finalResult = [
                'status' => $status,
                'totalPaidAmount' => $totalPaidAmount,
                'totalReturnAmount' => $totalReturnAmount,
                'dueAmount' => $dueAmount,
                'singlePurchaseInvoice' => $convertedSingleInvoice,
                'returnPurchaseInvoice' => $convertedReturnInvoice,
                'transactions' => $convertedTransactions,
            ];

            return response()->json($finalResult, 200);
        } catch (Exception $err) {
            return response()->json(['error' => 'An error occurred during getting PurchaseInvoice. Please try again later.'], 500);
        }
    }
}
