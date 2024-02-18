<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductVat;
use App\Models\ReturnSaleInvoice;
use App\Models\SaleInvoice;
use App\Models\SaleInvoiceProduct;
use App\Models\SaleInvoiceVat;
use App\Models\Transaction;
use App\Models\Coupon;
use Carbon\Carbon;
use DateTime;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SaleInvoiceController extends Controller
{
    // create a single SaleInvoice controller method
    public function createSingleSaleInvoice(Request $request): JsonResponse
    {
        try {
            // Get all the product
            $allProducts = collect($request->input('saleInvoiceProduct'))->map(function ($item) {
                return Product::where('id', (int)$item['productId'])
                    ->first();
            });
            // Calculate the product total price with their VAT
            $productSalePriceWithVat = collect($request->input('saleInvoiceProduct'))->map(function ($item) use ($allProducts) {

                $product = $allProducts->firstWhere('id', $item['productId']);
                $productVat = $product->productVat ?? 0;

                $productTotalPrice = (float)$item['productSalePrice'] * (float)$item['productQuantity'];
                return $productTotalPrice + ($productTotalPrice * $productVat) / 100;
            });

            // All VAT
            $productVat = ProductVat::whereIn('id', $request->input('vatId'))->get();
            $totalVat = (float)$productVat->sum('percentage');

            // Calculate total salePrice
            $totalSalePrice = (float)$productSalePriceWithVat->sum() - (float)$request->input('discount') ?? 0;

            // calculated coupon with sale price
            $couponCode = $request->input('couponCode');
            $inputDate = Carbon::parse($request->input('date'));

            $couponData = Coupon::where('couponCode', $couponCode)
                ->whereDate('startDate', '<=', $inputDate)
                ->whereDate('endDate', '>=', $inputDate)
                ->where('status', 'true')
                ->orderBy('id', 'desc')
                ->first();


            if ($couponCode) {
                if ($couponData) {
                    if ($couponData->type === 'flat') {
                        $totalSalePrice = $totalSalePrice - $couponData->value;
                    } else {
                        $totalSalePrice = $totalSalePrice - ($totalSalePrice * $couponData->value) / 100;
                    }
                } else {
                    return response()->json(['error' => 'Invalid coupon code'], 404);
                }
            }
            // Check if any product is out of stock
            collect($request->input('saleInvoiceProduct'))->map(function ($item) use ($allProducts) {
                $product = $allProducts->firstWhere('id', $item['productId']);

                if ($item['productQuantity'] > $product->productQuantity) {
                    return response()->json(['error' => 'Product out of stock'], 400);
                }
            });

            // calculate total purchase price
            $totalPurchasePrice = 0;
            foreach ($request->saleInvoiceProduct as $item) {
                $product = $allProducts->firstWhere('id', $item['productId']);
                $totalPurchasePrice += (float)$product->productPurchasePrice * (float)$item['productQuantity'];
            }

            // Due amount
            $due = $totalSalePrice + ($totalSalePrice * $totalVat) / 100 - (float)$request->input('paidAmount');

            // Convert all incoming date to a specific format
            $date = Carbon::parse($request->input('date'));

            // Create sale invoice
            if ($request->input('isHold') === 'true') {
                $createdInvoice = SaleInvoice::create([
                    'date' => $date,
                    'totalAmount' => takeUptoThreeDecimal($totalSalePrice + ($totalSalePrice * $totalVat) / 100),
                    'discount' => takeUptoThreeDecimal((float)$request->input('discount')) ?? 0,
                    'paidAmount' => takeUptoThreeDecimal((float)$request->input('paidAmount')) ?? 0,
                    'profit' => takeUptoThreeDecimal($totalSalePrice - (float)$request->input('discount') - $totalPurchasePrice),
                    'dueAmount' => takeUptoThreeDecimal($due),
                    'note' => $request->input('note'),
                    'address' => $request->input('address'),
                    'orderStatus' => $request->input('orderStatus') ?? 'PENDING',
                    'customerId' => $request->input('customerId'),
                    'userId' => $request->input('userId'),
                    'isHold' => $request->input('isHold'),
                ]);

                foreach ($request->saleInvoiceProduct as $item) {
                    SaleInvoiceProduct::create([
                        'invoiceId' => $createdInvoice->id,
                        'productId' => (int)$item['productId'],
                        'productQuantity' => (int)$item['productQuantity'],
                        'productSalePrice' => takeUptoThreeDecimal((float)$item['productSalePrice']),
                    ]);
                }

                if (count($productVat) > 0) {
                    foreach ($request->input('vatId') as $vatId) {
                        SaleInvoiceVat::create([
                            'invoiceId' => $createdInvoice->id,
                            'productVatId' => (int)$vatId,
                        ]);
                    }
                }

                return response()->json(['createdInvoiceHold' => $createdInvoice], 201);
            }
            $createdInvoice = SaleInvoice::create([
                'date' => $date,
                'totalAmount' => takeUptoThreeDecimal($totalSalePrice + ($totalSalePrice * $totalVat) / 100),
                'discount' => takeUptoThreeDecimal((float)$request->input('discount')) ?? 0,
                'paidAmount' => takeUptoThreeDecimal((float)$request->input('paidAmount')) ?? 0,
                'profit' => takeUptoThreeDecimal($totalSalePrice - (float)$request->input('discount') - $totalPurchasePrice),
                'dueAmount' => takeUptoThreeDecimal($due),
                'note' => $request->input('note'),
                'address' => $request->input('address'),
                'orderStatus' => $request->input('orderStatus') ?? 'PENDING',
                'customerId' => $request->input('customerId'),
                'userId' => $request->input('userId'),
            ]);


            if (count($productVat) > 0) {
                foreach ($request->input('vatId') as $vatId) {
                    SaleInvoiceVat::create([
                        'invoiceId' => $createdInvoice->id,
                        'productVatId' => (int)$vatId,
                    ]);
                }
            }

            foreach ($request->saleInvoiceProduct as $item) {
                SaleInvoiceProduct::create([
                    'invoiceId' => $createdInvoice->id,
                    'productId' => (int)$item['productId'],
                    'productQuantity' => (int)$item['productQuantity'],
                    'productSalePrice' => takeUptoThreeDecimal((float)$item['productSalePrice']),
                ]);
            }

            // new transactions will be created as journal entry for paid amount
            if ($request->input('paidAmount') > 0) {
                Transaction::create([
                    'date' => new DateTime($date),
                    'debitId' => $request->input('paymentType') ? (int)$request->input('paymentType') : 1,
                    'creditId' => 8,
                    'amount' => takeUptoThreeDecimal((float)$request->input('paidAmount')),
                    'particulars' => "Cash receive on Sale Invoice #{$createdInvoice->id}",
                    'type' => 'sale',
                    'relatedId' => (int)$createdInvoice->id,
                ]);
            }

            // if sale on due another transactions will be created as journal entry
            $dueAmount = $totalSalePrice + ($totalSalePrice * $totalVat) / 100 - (float)$request->input('paidAmount');

            if ($dueAmount > 0) {
                Transaction::create([
                    'date' => new DateTime($date),
                    'debitId' => 4,
                    'creditId' => 8,
                    'amount' => takeUptoThreeDecimal($dueAmount),
                    'particulars' => "Due on Sale Invoice #{$createdInvoice->id}",
                    'type' => 'sale',
                    'relatedId' => (int)$createdInvoice->id,
                ]);
            }

            // cost of sales will be created as journal entry
            Transaction::create([
                'date' => new DateTime($date),
                'debitId' => 9,
                'creditId' => 3,
                'amount' => takeUptoThreeDecimal((float)$totalPurchasePrice),
                'particulars' => "Cost of sales on Sale Invoice #{$createdInvoice->id}",
                'type' => 'sale',
                'relatedId' => (int)$createdInvoice->id,
            ]);


            $totalProductPrice = 0;
            foreach ($request->saleInvoiceProduct as $item) {
                $totalProductPrice += (float)$item['productSalePrice'] * (int)$item['productQuantity'];
            }

            $amount = $totalSalePrice + ($totalSalePrice * $totalVat) / 100 - $totalProductPrice;

            // created vat into transaction
            Transaction::create([
                'date' => new DateTime($date),
                'debitId' => $request->input('paymentType') ? (int)$request->input('paymentType') : 1,
                'creditId' => 15,
                'amount' => takeUptoThreeDecimal($amount),
                'particulars' => "Vat Collected on Sale Invoice #{$createdInvoice->id}",
                'type' => 'vat',
                'relatedId' => (int)$createdInvoice->id,
            ]);

            //created discount into transaction
            if ($request->input('discount') > 0) {
                Transaction::create([
                    'date' => new DateTime($date),
                    'debitId' => 14,
                    'creditId' => $request->input('paymentType') ? (int)$request->input('paymentType') : 1,
                    'amount' => takeUptoThreeDecimal((float)$request->input('discount')),
                    'particulars' => "Discount on Sale Invoice #{$createdInvoice->id}",
                    'type' => 'sale',
                    'relatedId' => (int)$createdInvoice->id,
                ]);
            }

            //created for coupon code transaction
            if ($couponCode) {
                if ($couponData) {
                    if ($couponData->type === 'flat') {
                        Transaction::create([
                            'date' => new DateTime($date),
                            'debitId' => 15,
                            'creditId' => 8,
                            'amount' => takeUptoThreeDecimal($couponData->value),
                            'particulars' => "Coupon Code on Sale Invoice #{$createdInvoice->id}",
                            'type' => 'sale',
                            'relatedId' => (int)$createdInvoice->id,
                        ]);
                    } else {
                        Transaction::create([
                            'date' => new DateTime($date),
                            'debitId' => 15,
                            'creditId' => 8,
                            'amount' => takeUptoThreeDecimal(($totalSalePrice * $couponData->value) / 100),
                            'particulars' => "Coupon Code on Sale Invoice #{$createdInvoice->id}",
                            'type' => 'sale',
                            'relatedId' => (int)$createdInvoice->id,
                        ]);
                    }
                }
            }

            // iterate through all products of this sale invoice and decrease product quantity
            foreach ($request->saleInvoiceProduct as $item) {
                $productId = (int)$item['productId'];
                $productQuantity = (int)$item['productQuantity'];

                Product::where('id', $productId)->update([
                    'productQuantity' => DB::raw("productQuantity - $productQuantity"),
                ]);
            }

            $converted = arrayKeysToCamelCase($createdInvoice->toArray());
            return response()->json(['createdInvoice' => $converted], 201);
        } catch (Exception $err) {
            echo $err;
            return response()->json(['error' => 'An error occurred during create saleInvoice. Please try again later.'], 500);
        }
    }

    // get all the saleInvoice controller method
    public function getAllSaleInvoice(Request $request): JsonResponse
    {
        if ($request->query('query') === 'info') {
            try {
                $aggregation = SaleInvoice::selectRaw('COUNT(id) as id, SUM(totalAmount) as totalAmount, SUM(dueAmount) as dueAmount,SUM(discount) as discount, SUM(paidAmount) as paidAmount, SUM(profit) as profit')
                    ->where('isHold', 'false')
                    ->first();

                $result = [
                    '_count' => [
                        'id' => $aggregation->id
                    ],
                    '_sum' => [
                        'totalAmount' => $aggregation->totalAmount,
                        'discount' => $aggregation->discount,
                        'dueAmount' => $aggregation->dueAmount,
                        'paidAmount' => $aggregation->paidAmount,
                        'profit' => $aggregation->profit,
                    ],
                ];

                return response()->json($result, 200);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during getting saleInvoice. Please try again later.'], 500);
            }
        } else if ($request->query('query') === 'search') {
            try {
                $allSaleInvoice = SaleInvoice::where('id', $request->query('sale'))
                    ->with('saleInvoiceProduct')
                    ->orderBy('id', 'desc')
                    ->where('isHold', 'false')
                    ->get();

                $converted = arrayKeysToCamelCase($allSaleInvoice->toArray());
                return response()->json($converted, 200);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during getting saleInvoice. Please try again later.'], 500);
            }
        } else if ($request->query('query') === 'search-order') {
            try {
                $allOrder = SaleInvoice::where(function ($query) use ($request) {
                    if ($request->has('status')) {
                        $status = $request->query('status');
                        $query->where('orderStatus', 'LIKE', "%$status%");
                    }
                })
                    ->with('saleInvoiceProduct')
                    ->orderBy('id', 'desc')
                    ->where('isHold', 'false')
                    ->get();

                $converted = arrayKeysToCamelCase($allOrder->toArray());
                return response()->json($converted, 200);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during getting saleInvoice. Please try again later.'], 500);
            }
        } else {
            $pagination = getPagination($request->query());
            try {
                if ($request->query('user')) {
                    if ($request->query('count')) {
                        $startDate = Carbon::parse($request->query('startdate'));
                        $endDate = Carbon::parse($request->query('enddate'));

                        $aggregation = SaleInvoice::whereBetween('date', [$startDate, $endDate])
                            ->where('userId', (int)$request->query('user'))
                            ->where('isHold', 'false')
                            ->where('status', $request->query('status'))
                            ->selectRaw('COUNT(id) as id, SUM(totalAmount) as totalAmount, SUM(discount) as discount, SUM(dueAmount) as dueAmount, SUM(paidAmount) as paidAmount, SUM(profit) as profit')
                            ->first();

                        $saleInvoices = SaleInvoice::whereBetween('date', [$startDate, $endDate])
                            ->where('userId', $request->query('user'))
                            ->with('saleInvoiceProduct', 'saleInvoiceProduct.product', 'customer:id,name', 'user:id,username')
                            ->orderBy('id', 'desc')
                            ->where('status', $request->query('status'))
                            ->where('isHold', 'false')
                            ->skip($pagination['skip'])
                            ->take($pagination['limit'])
                            ->get();
                    } else {
                        $startDate = Carbon::parse($request->query('startdate'));
                        $endDate = Carbon::parse($request->query('enddate'));

                        $aggregation = SaleInvoice::whereBetween('date', [$startDate, $endDate])
                            ->where('userId', (int)$request->query('user'))
                            ->where('isHold', 'false')
                            ->where('status', $request->query('status'))
                            ->selectRaw('COUNT(id) as id, SUM(totalAmount) as totalAmount, SUM(discount) as discount, SUM(dueAmount) as dueAmount, SUM(paidAmount) as paidAmount, SUM(profit) as profit')
                            ->first();

                        $saleInvoices = SaleInvoice::whereBetween('date', [$startDate, $endDate])
                            ->where('userId', $request->query('user'))
                            ->with('saleInvoiceProduct', 'saleInvoiceProduct.product', 'customer:id,name', 'user:id,username')
                            ->orderBy('id', 'desc')
                            ->where('status', $request->query('status'))
                            ->where('isHold', 'false')
                            ->skip($pagination['skip'])
                            ->take($pagination['limit'])
                            ->get();
                    }
                } else {
                    if ($request->query('count')) {
                        $startDate = Carbon::parse($request->query('startdate'));
                        $endDate = Carbon::parse($request->query('enddate'));

                        $aggregation = SaleInvoice::whereBetween('date', [$startDate, $endDate])
                            ->selectRaw('COUNT(id) as id, SUM(totalAmount) as totalAmount, SUM(discount) as discount, SUM(dueAmount) as dueAmount, SUM(paidAmount) as paidAmount, SUM(profit) as profit')
                            ->where('isHold', 'false')
                            ->where('status', $request->query('status'))
                            ->first();


                        $saleInvoices = SaleInvoice::whereBetween('date', [$startDate, $endDate])
                            ->with('saleInvoiceProduct', 'saleInvoiceProduct.product', 'customer:id,name', 'user:id,username')
                            ->orderBy('id', 'desc')
                            ->where('status', $request->query('status'))
                            ->where('isHold', 'false')
                            ->skip($pagination['skip'])
                            ->take($pagination['limit'])
                            ->get();
                    } else {

                        $startDate = Carbon::parse($request->query('startdate'));
                        $endDate = Carbon::parse($request->query('enddate'));

                        $aggregation = SaleInvoice::whereBetween('date', [$startDate, $endDate])
                            ->selectRaw('COUNT(id) as id, SUM(totalAmount) as totalAmount, SUM(discount) as discount, SUM(dueAmount) as dueAmount, SUM(paidAmount) as paidAmount, SUM(profit) as profit')
                            ->where('isHold', 'false')
                            ->where('status', $request->query('status'))
                            ->first();

                        $saleInvoices = SaleInvoice::whereBetween('date', [$startDate, $endDate])
                            ->with('saleInvoiceProduct', 'saleInvoiceProduct.product', 'customer:id,name', 'user:id,username')
                            ->where('status', $request->query('status'))
                            ->orderBy('id', 'desc')
                            ->where('isHold', 'false')
                            ->skip($pagination['skip'])
                            ->take($pagination['limit'])
                            ->get();
                    }
                }


                $saleInvoicesIds = $saleInvoices->pluck('id')->toArray();

                // modify data to actual data of sale invoice's current value by adjusting with transactions and returns
                $transactions = Transaction::where('type', 'sale')
                    ->whereIn('relatedId', $saleInvoicesIds)
                    ->where(function ($query) {
                        $query->orWhere('debitId', 1)
                            ->orWhere('debitId', 2);
                    })
                    ->get();

                // the return that paid back to customer on return invoice
                $transactions2 = Transaction::where('type', 'sale_return')
                    ->whereIn('relatedId', $saleInvoicesIds)
                    ->where(function ($query) {
                        $query->orWhere('creditId', 1)
                            ->orWhere('creditId', 2);
                    })
                    ->get();


                $returnSaleInvoice = ReturnSaleInvoice::whereIn('saleInvoiceId', $saleInvoicesIds)
                    ->get();

                // calculate paid amount and due amount of individual sale invoice from transactions and returnSaleInvoice and attach it to saleInvoices
                $allSaleInvoice = $saleInvoices->map(function ($item) use ($transactions, $transactions2, $returnSaleInvoice) {
                    $paidAmount = $transactions->filter(function ($transaction) use ($item) {
                        return $transaction->relatedId === $item->id;
                    })->sum('amount');

                    $paidAmountReturn = $transactions2->filter(function ($transaction) use ($item) {
                        return $transaction->relatedId === $item->id;
                    })->sum('amount');

                    $returnAmount = $returnSaleInvoice->filter(function ($returnInvoice) use ($item) {
                        return $returnInvoice->saleInvoiceId === $item->id;
                    })->sum('totalAmount');

                    $totalUnitMeasurement = $item->saleInvoiceProduct->reduce(function ($acc, $curr) {
                        return $acc + ((int)$curr->product->unitMeasurement * $curr->productQuantity);
                    }, 0);


                    $item->paidAmount = $paidAmount;
                    $item->dueAmount = $item->totalAmount -
                        $paidAmount -
                        $returnAmount +
                        $paidAmountReturn;
                    $item->totalUnitMeasurement = $totalUnitMeasurement;

                    return $item;
                });

                $converted = arrayKeysToCamelCase($allSaleInvoice->toArray());
                $totalUnitMeasurement = $allSaleInvoice->sum('totalUnitMeasurement');
                $totalUnitQuantity = $allSaleInvoice->map(function ($item) {
                    return $item->saleInvoiceProduct->sum('productQuantity');
                })->sum();

                $finalResult = [
                    'aggregations' => [
                        '_count' => [
                            'id' => $aggregation->id,
                        ],
                        '_sum' => [
                            'totalAmount' => $aggregation->totalAmount,
                            'paidAmount' => $aggregation->paidAmount,
                            'dueAmount' => $aggregation->dueAmount,
                            'discount' => $aggregation->discount,
                            'profit' => $aggregation->profit,
                            'totalUnitMeasurement' => $totalUnitMeasurement,
                            'totalUnitQuantity' => $totalUnitQuantity,
                        ],
                    ],

                    'allSaleInvoice' => $converted,
                ];

                return response()->json($finalResult, 200);
            } catch (Exception $err) {
                echo $err;
                return Response()->json(['error' => 'An error occurred during getting saleInvoice. Please try again later.'], 500);
            }
        }
    }

    public function getAllHoldInvoice(): JsonResponse
    {
        try {
            $pagination = getPagination(request()->query());
            $allHoldInvoice = SaleInvoice::where('isHold', 'true')
                ->with('saleInvoiceProduct', 'saleInvoiceProduct.product', 'customer:id,name', 'user:id,username')
                ->orderBy('id', 'desc')
                ->skip($pagination['skip'])
                ->take($pagination['limit'])
                ->get();

            $converted = arrayKeysToCamelCase($allHoldInvoice->toArray());
            $totalData = SaleInvoice::where('isHold', 'true')->count();

            $aggregation = [
                'allHoldInvoice' => $converted,
                '_count' => [
                    'id' => $totalData,
                ],
            ];

            return response()->json($aggregation, 200);
        } catch (Exception $err) {
            return response()->json(['error' => 'An error occurred during getting saleInvoice. Please try again later.'], 500);
        }
    }

    // get a single saleInvoice controller method
    public function getSingleSaleInvoice($id): JsonResponse
    {
        try {
            // get single Sale invoice information with products
            $singleSaleInvoice = SaleInvoice::where('id', (int)$id)
                ->with('saleInvoiceProduct', 'saleInvoiceProduct.product', 'saleInvoiceVat', 'saleInvoiceVat.productVat', 'customer:id,name,address,phone,email', 'user:id,username')
                ->where('isHold', 'false')
                ->first();

            if (!$singleSaleInvoice) {
                return response()->json(['error' => 'This invoice not Found'], 400);
            }

            // get all transactions related to this sale invoice
            $transactions = Transaction::where('relatedId', (int)$id)
                ->where(function ($query) {
                    $query->orWhere('type', 'sale')
                        ->orWhere('type', 'sale_return')
                        ->orWhere('type', 'vat');
                })
                ->with('debit:id,name', 'credit:id,name')
                ->get();


            // get the transaction of the paidAmount
            $transactions2 = Transaction::where('relatedId', $id)
                ->where('type', 'sale')
                ->where(function ($query) {
                    $query->orWhere('debitId', 1)
                        ->orWhere('debitId', 2);
                })
                ->with('debit:id,name', 'credit:id,name')
                ->get();

            // get the transaction of the discountGiven amount at the time of make the payment
            $transactions3 = Transaction::where('relatedId', (int)$id)
                ->where('type', 'sale')
                ->where('debitId', 14)
                ->with('debit:id,name', 'credit:id,name')
                ->get();

            // transactions returnSaleInvoice amount
            $transactions4 = Transaction::where('relatedId', (int)$id)
                ->where('type', 'sale_return')
                ->where(function ($query) {
                    $query->orWhere('creditId', 1)
                        ->orWhere('creditId', 2);
                })
                ->with('debit:id,name', 'credit:id,name')
                ->get();

            // transactions of vatAmount
            $transactions5 = Transaction::where('relatedId', (int)$id)
                ->where('type', 'vat')
                ->with('debit:id,name', 'credit:id,name')
                ->get();

            // get totalReturnAmount of saleInvoice
            $returnSaleInvoice = ReturnSaleInvoice::where('saleInvoiceId', (int)$id)
                ->with('returnSaleInvoiceProduct', 'returnSaleInvoiceProduct.product')
                ->get();


            // sum of total paidAmount
            $totalPaidAmount = $transactions2->sum('amount');

            // sum of total returnSaleInvoice amount
            $paidAmountReturn = $transactions4->sum('amount');

            // sum of total discountGiven amount at the time of make the payment
            $totalDiscountAmount = $transactions3->sum('amount');

            // sum of total vat amount at the time of make the payment
            $totalVatAmount = $transactions5->sum('amount');

            // sum total amount of all return purchase invoice related to this purchase invoice
            $totalReturnAmount = $returnSaleInvoice->sum('totalAmount');


            if ($singleSaleInvoice->totalAmount === 'undefined' || null) {
                return response()->json(['message' => 'This invoice is not valid'], 400);
            }

            $dueAmount = $singleSaleInvoice->totalAmount -
                $totalPaidAmount -
                $totalReturnAmount +
                $paidAmountReturn;

            $status = 'UNPAID';
            if ($dueAmount <= 0.0) {
                $status = "PAID";
            }

            // calculate total unitMeasurement
            $totalUnitMeasurement = $singleSaleInvoice->saleInvoiceProduct->reduce(function ($acc, $item) {
                return $acc + (int)$item->product->unitMeasurement * $item->productQuantity;
            }, 0);


            $convertedSingleSaleInvoice = arrayKeysToCamelCase($singleSaleInvoice->toArray());
            $convertedReturnSaleInvoice = arrayKeysToCamelCase($returnSaleInvoice->toArray());
            $convertedTransactions = arrayKeysToCamelCase($transactions->toArray());

            $finalResult = [
                'status' => $status,
                'totalPaidAmount' => $totalPaidAmount,
                'totalReturnAmount' => $totalReturnAmount,
                'dueAmount' => $dueAmount,
                'totalVatAmount' => $totalVatAmount,
                'totalUnitMeasurement' => $totalUnitMeasurement,
                'singleSaleInvoice' => $convertedSingleSaleInvoice,
                'returnSaleInvoice' => $convertedReturnSaleInvoice,
                'transactions' => $convertedTransactions,
            ];

            return response()->json($finalResult, 200);
        } catch (Exception $err) {
            return response()->json(['error' => 'An error occurred during getting saleInvoice. Please try again later.'], 500);
        }
    }

    public function getSingleHold($id): JsonResponse
    {
        try {
            // get single Sale invoice information with products
            $singleSaleInvoice = SaleInvoice::where('id', (int)$id)
                ->with('saleInvoiceProduct', 'saleInvoiceProduct.product', 'saleInvoiceVat', 'saleInvoiceVat.productVat', 'customer:id,name,address,phone,email', 'user:id,username')
                ->where('isHold', 'true')
                ->first();

            if (!$singleSaleInvoice) {
                return response()->json(['error' => 'This invoice not Found'], 400);
            }

            $convertedSingleSaleInvoice = arrayKeysToCamelCase($singleSaleInvoice->toArray());
            return response()->json($convertedSingleSaleInvoice, 200);
        } catch (Exception $err) {
            return response()->json(['error' => 'An error occurred during getting saleInvoice. Please try again later.'], 500);
        }
    }

    // update saleInvoice controller method
    public function updateSaleStatus(Request $request): JsonResponse
    {
        try {
            $updatedSaleStatus = SaleInvoice::where('id', (int)$request->input('invoiceId'))
                ->update([
                    'orderStatus' => $request->input('orderStatus'),
                ]);

            if (!$updatedSaleStatus) {
                return response()->json(['error' => 'Failed To Update SaleInvoice'], 404);
            }

            return response()->json(['message' => 'Sale Invoice updated successfully!'], 200);
        } catch (Exception $err) {
            return response()->json(['error' => 'An error occurred during update saleInvoice. Please try again later.'], 500);
        }
    }

    public function updateHoldInvoice(Request $request, $id): JsonResponse
    {
        try {
            //check the invoice is hold or not
            $checkHold = SaleInvoice::where('id', (int)$id)->first();
            if ($checkHold->isHold === 'false') {
                return response()->json(['error' => 'You can not update this invoice'], 400);
            }
            // Get all the product
            $allProducts = collect($request->input('saleInvoiceProduct'))->map(function ($item) {
                return Product::where('id', (int)$item['productId'])
                    ->first();
            });

            // Calculate the product total price with their VAT
            $productSalePriceWithVat = collect($request->input('saleInvoiceProduct'))->map(function ($item) use ($allProducts) {

                $product = $allProducts->firstWhere('id', $item['productId']);
                $productVat = $product->productVat ?? 0;

                $productTotalPrice = (float)$item['productSalePrice'] * (float)$item['productQuantity'];
                return $productTotalPrice + ($productTotalPrice * $productVat) / 100;
            });

            // All VAT
            $productVat = ProductVat::whereIn('id', $request->input('vatId'))->get();
            $totalVat = (float)$productVat->sum('percentage');

            // Calculate total salePrice
            $totalSalePrice = (float)$productSalePriceWithVat->sum() - (float)$request->input('discount') ?? 0;

            // calculated coupon with sale price
            $couponCode = $request->input('couponCode');
            $inputDate = Carbon::parse($request->input('date'));

            $couponData = Coupon::where('couponCode', $couponCode)
                ->whereDate('startDate', '<=', $inputDate)
                ->whereDate('endDate', '>=', $inputDate)
                ->where('status', 'true')
                ->orderBy('id', 'desc')
                ->first();


            if ($couponCode) {
                if ($couponData) {
                    if ($couponData->type === 'flat') {
                        $totalSalePrice = $totalSalePrice - $couponData->value;
                    } else {
                        $totalSalePrice = $totalSalePrice - ($totalSalePrice * $couponData->value) / 100;
                    }
                } else {
                    return response()->json(['error' => 'Invalid coupon code'], 404);
                }
            }
            // Check if any product is out of stock
            collect($request->input('saleInvoiceProduct'))->map(function ($item) use ($allProducts) {
                $product = $allProducts->firstWhere('id', $item['productId']);

                if ($item['productQuantity'] > $product->productQuantity) {
                    return response()->json(['error' => 'Product out of stock'], 400);
                }
                return $item;
            });

            // calculate total purchase price
            $totalPurchasePrice = 0;
            foreach ($request->saleInvoiceProduct as $item) {
                $product = $allProducts->firstWhere('id', $item['productId']);
                $totalPurchasePrice += (float)$product->productPurchasePrice * (float)$item['productQuantity'];
            }
            // Due amount
            $due = $totalSalePrice + ($totalSalePrice * $totalVat) / 100 - (float)$request->input('paidAmount');

            // Convert all incoming date to a specific format
            $date = Carbon::parse($request->input('date'));
            //updated sale invoice
            $checkHold->update([
                'date' => $date,
                'totalAmount' => takeUptoThreeDecimal($totalSalePrice + ($totalSalePrice * $totalVat) / 100),
                'discount' => takeUptoThreeDecimal((float)$request->input('discount')) ?? 0,
                'paidAmount' => takeUptoThreeDecimal((float)$request->input('paidAmount')) ?? 0,
                'profit' => takeUptoThreeDecimal($totalSalePrice - (float)$request->input('discount') - $totalPurchasePrice),
                'dueAmount' => takeUptoThreeDecimal($due),
                'note' => $request->input('note'),
                'address' => $request->input('address'),
                'orderStatus' => $request->input('orderStatus') ?? 'PENDING',
                'customerId' => $request->input('customerId'),
                'userId' => $request->input('userId'),
                'isHold' => $request->input('isHold'),
            ]);

            $updatedInvoice = SaleInvoice::where('id', $checkHold->id)->first();

            if (count($productVat) > 0) {
                foreach ($request->input('vatId') as $vatId) {
                    $vat = SaleInvoiceVat::where('invoiceId', $updatedInvoice->id)->where('productVatId', $vatId)->first();
                    if ($vat) {
                        //update vat
                        SaleInvoiceVat::where('invoiceId', $updatedInvoice->id)->update([
                            'invoiceId' => $updatedInvoice->id,
                            'productVatId' => $vatId,
                        ]);
                    } else {
                        SaleInvoiceVat::create([
                            'invoiceId' => $updatedInvoice->id,
                            'productVatId' => $vatId,
                        ]);
                    }
                }
            }

            //is product is existing then update if not then create
            foreach ($request->saleInvoiceProduct as $item) {
                $product = SaleInvoiceProduct::where('invoiceId', $updatedInvoice->id)->where('productId', $item['productId'])->first();
                if ($product) {
                    //update product
                    SaleInvoiceProduct::where('invoiceId', $updatedInvoice->id)->where('productId', $item['productId'])->update([
                        'productQuantity' => (int)$item['productQuantity'],
                        'productSalePrice' => takeUptoThreeDecimal((float)$item['productSalePrice']),
                    ]);
                } else {
                    SaleInvoiceProduct::create([
                        'invoiceId' => $updatedInvoice->id,
                        'productId' => (int)$item['productId'],
                        'productQuantity' => (int)$item['productQuantity'],
                        'productSalePrice' => takeUptoThreeDecimal((float)$item['productSalePrice']),
                    ]);
                }
            }
            // new transactions will be created as journal entry for paid amount
            if ($request->input('paidAmount') > 0) {
                Transaction::create([
                    'date' => new DateTime($date),
                    'debitId' => $request->input('paymentType') ? (int)$request->input('paymentType') : 1,
                    'creditId' => 8,
                    'amount' => takeUptoThreeDecimal((float)$request->input('paidAmount')),
                    'particulars' => "Cash receive on Sale Invoice #{$updatedInvoice->id}",
                    'type' => 'sale',
                    'relatedId' => (int)$updatedInvoice->id,
                ]);
            }

            // if sale on due another transactions will be created as journal entry
            $dueAmount = $totalSalePrice + ($totalSalePrice * $totalVat) / 100 - (float)$request->input('paidAmount');

            if ($dueAmount > 0) {
                Transaction::create([
                    'date' => new DateTime($date),
                    'debitId' => 4,
                    'creditId' => 8,
                    'amount' => takeUptoThreeDecimal($dueAmount),
                    'particulars' => "Due on Sale Invoice #{$updatedInvoice->id}",
                    'type' => 'sale',
                    'relatedId' => (int)$updatedInvoice->id,
                ]);
            }

            // cost of sales will be created as journal entry
            Transaction::create([
                'date' => new DateTime($date),
                'debitId' => 9,
                'creditId' => 3,
                'amount' => takeUptoThreeDecimal((float)$totalPurchasePrice),
                'particulars' => "Cost of sales on Sale Invoice #{$updatedInvoice->id}",
                'type' => 'sale',
                'relatedId' => (int)$updatedInvoice->id,
            ]);


            $totalProductPrice = 0;
            foreach ($request->saleInvoiceProduct as $item) {
                $totalProductPrice += (float)$item['productSalePrice'] * (int)$item['productQuantity'];
            }

            $amount = $totalSalePrice + ($totalSalePrice * $totalVat) / 100 - $totalProductPrice;

            // created vat into transaction
            Transaction::create([
                'date' => new DateTime($date),
                'debitId' => $request->input('paymentType') ? (int)$request->input('paymentType') : 1,
                'creditId' => 15,
                'amount' => takeUptoThreeDecimal($amount),
                'particulars' => "Vat Collected on Sale Invoice #{$updatedInvoice->id}",
                'type' => 'vat',
                'relatedId' => (int)$updatedInvoice->id,
            ]);

            //created discount into transaction
            if ($request->input('discount') > 0) {
                Transaction::create([
                    'date' => new DateTime($date),
                    'debitId' => 14,
                    'creditId' => $request->input('paymentType') ? (int)$request->input('paymentType') : 1,
                    'amount' => takeUptoThreeDecimal((float)$request->input('discount')),
                    'particulars' => "Discount on Sale Invoice #{$updatedInvoice->id}",
                    'type' => 'sale',
                    'relatedId' => (int)$updatedInvoice->id,
                ]);
            }

            //created for coupon code transaction
            if ($couponCode) {
                if ($couponData) {
                    if ($couponData->type === 'flat') {
                        Transaction::create([
                            'date' => new DateTime($date),
                            'debitId' => 15,
                            'creditId' => 8,
                            'amount' => takeUptoThreeDecimal($couponData->value),
                            'particulars' => "Coupon Code on Sale Invoice #{$updatedInvoice->id}",
                            'type' => 'sale',
                            'relatedId' => (int)$updatedInvoice->id,
                        ]);
                    } else {
                        Transaction::create([
                            'date' => new DateTime($date),
                            'debitId' => 15,
                            'creditId' => 8,
                            'amount' => takeUptoThreeDecimal(($totalSalePrice * $couponData->value) / 100),
                            'particulars' => "Coupon Code on Sale Invoice #{$updatedInvoice->id}",
                            'type' => 'sale',
                            'relatedId' => (int)$updatedInvoice->id,
                        ]);
                    }
                }
            }

            // iterate through all products of this sale invoice and decrease product quantity
            foreach ($request->saleInvoiceProduct as $item) {
                $productId = (int)$item['productId'];
                $productQuantity = (int)$item['productQuantity'];

                Product::where('id', $productId)->update([
                    'productQuantity' => DB::raw("productQuantity - $productQuantity"),
                ]);
            }

            $converted = arrayKeysToCamelCase($updatedInvoice->toArray());
            return response()->json(['createdInvoice' => $converted], 201);
        } catch (Exception $err) {
            echo $err;
            return response()->json(['error' => 'An error occurred during update saleInvoice. Please try again later.'], 500);
        }
    }
}
