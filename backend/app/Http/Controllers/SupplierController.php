<?php

namespace App\Http\Controllers;

use App\Models\PurchaseInvoice;
use App\Models\Supplier;
use App\Models\Transaction;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SupplierController extends Controller
{
    //create supplier controller method
    public function createSingleSupplier(Request $request): JsonResponse
    {
        if ($request->query('query') === 'deletemany') {
            try {
                $ids = json_decode($request->getContent(), true);
                $deletedSupplier = Supplier::destroy($ids);

                $deletedCount = [
                    'count' => $deletedSupplier
                ];

                return response()->json($deletedCount, 200);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during delete supplier. Please try again later.'], 500);
            }
        } elseif ($request->query('query') === 'createmany') {
            try {
                $supplierData = json_decode($request->getContent(), true);

                 //check if product already exists
                $supplierData = collect($supplierData)->map(function ($item) {
                    $supplier = Supplier::where('name', $item['name'])->first();
                    if ($supplier) {
                        return null;
                    }
                    return $item;
                })->filter(function ($item) {
                    return $item !== null;
                })->toArray();

                //if all products already exists
                if (count($supplierData) === 0) {
                    return response()->json(['error' => 'All Supplier already exists.'], 500);
                }

                $createdSupplier = collect($supplierData)->map(function ($item) {
                    return Supplier::firstOrCreate($item);
                });

                $result = [
                    'count' => count($createdSupplier),
                ];

                return response()->json($result, 201);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during create supplier. Please try again later.'], 500);
            }
        } else {
            try {
                $supplierData = json_decode($request->getContent(), true);

                $createdSupplier = Supplier::create([
                    'name' => $supplierData['name'],
                    'phone' => $supplierData['phone'],
                    'address' => $supplierData['address'],
                ]);

                $converted = arrayKeysToCamelCase($createdSupplier->toArray());
                return response()->json($converted, 201);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during create supplier. Please try again later.'], 500);
            }
        }
    }

    // get all the supplier controller method
    public function getAllSupplier(Request $request): JsonResponse
    {
        if ($request->query('query') === 'all') {
            try {
                $allSupplier = Supplier::orderBy('id', 'asc')
                    ->with('purchaseInvoice')
                    ->get();

                $converted = arrayKeysToCamelCase($allSupplier->toArray());
                return response()->json($converted, 200);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during getting supplier. Please try again later.'], 500);
            }
        } elseif ($request->query('query') === 'info') {
            try {
                $aggregation = Supplier::where('status', 'true')
                    ->count();

                $result = [
                    '_count' => [
                        'id' => $aggregation,
                    ],
                ];

                return response()->json($result, 200);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during getting supplier. Please try again later.'], 500);
            }
        } elseif ($request->query('status')) {
            try {
                $pagination = getPagination($request->query());
                $allSupplier = Supplier::orderBy('id', 'asc')
                    ->where('status', $request->query("status"))
                    ->with('purchaseInvoice')
                    ->skip($pagination['skip'])
                    ->take($pagination['limit'])
                    ->get();

                $converted = arrayKeysToCamelCase($allSupplier->toArray());
                $finalResult = [
                    'getAllSupplier' => $converted,
                    'totalSupplier' => Supplier::where('status', $request->query('status'))->count(),
                ];

                return response()->json($finalResult, 200);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during getting supplier. Please try again later.'], 500);
            }
        } else {
            try {
                $pagination = getPagination($request->query());
                $allSupplier = Supplier::orderBy('id', 'asc')
                    ->where('status', 'true')
                    ->with('purchaseInvoice')
                    ->skip($pagination['skip'])
                    ->take($pagination['limit'])
                    ->get();

                $converted = arrayKeysToCamelCase($allSupplier->toArray());
                $finalResult = [
                    'getAllSupplier' => $converted,
                    'totalSupplier' => Supplier::where('status', 'true')->count(),
                ];

                return response()->json($finalResult, 200);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during getting supplier. Please try again later.'], 500);
            }
        }
    }

    // get a single supplier controller method
    public function getSingleSupplier(Request $request, $id): JsonResponse
    {
        try {
            $singleSupplier = Supplier::where('id', (int)$id)
                ->with('purchaseInvoice')
                ->first();

            $allPurchaseInvoiceTotalAmount = PurchaseInvoice::where('supplierId', (int)$id)
                ->selectRaw('SUM(totalAmount) as totalAmount, SUM(discount) as discount')
                ->first();

            // all invoice of a supplier with return purchase invoice nested
            $suppliersAllInvoice = Supplier::where('id', (int)$id)
                ->with(['purchaseInvoice', 'purchaseInvoice.returnPurchaseInvoice' => function ($query) {
                    $query->where('status', 'true');
                }])
                ->first();

            // get all returnPurchaseInvoice of a purchaser
            $allReturnPurchaseInvoice = $suppliersAllInvoice->purchaseInvoice->map(function ($item) {
                return $item->returnPurchaseInvoice;
            });

            // calculate total returnPurchaseInvoice amount
            $totalReturnPurchaseInvoice = collect($allReturnPurchaseInvoice)->reduce(function ($carry, $invoices) {
                $returnPurchaseInvoiceTotalAmount = collect($invoices)->reduce(function ($acc, $item) {
                    return $acc + $item['totalAmount'];
                }, 0);

                return $carry + $returnPurchaseInvoiceTotalAmount;
            }, 0);


            // get all returnPurchaseInvoice of a purchaser
            $allPurchaseInvoiceId = $suppliersAllInvoice->purchaseInvoice->map(function ($item) {
                return $item->id;
            });

            // get all transactions related to purchaseInvoice
            $allPurchaseTransaction = Transaction::where('type', 'purchase')
                ->whereIn('relatedId', $allPurchaseInvoiceId)
                ->whereIn('creditId', [1, 2])
                ->with('debit', 'credit')
                ->get();

            // get all transactions related to purchaseInvoice
            $allReturnPurchaseTransaction = Transaction::where('type', 'purchase_return')
                ->whereIn('relatedId', $allPurchaseInvoiceId)
                ->whereIn('debitId', [1, 2])
                ->with('debit', 'credit')
                ->get();

            // calculate the discount earned amount at the time of make the payment
            $discountEarned = Transaction::where('type', 'purchase')
                ->whereIn('relatedId', $allPurchaseInvoiceId)
                ->where('creditId', 13)
                ->with('debit', 'credit')
                ->get();

            $totalPaidAmount = collect($allPurchaseTransaction)->reduce(function ($acc, $current) {
                return $acc + $current['amount'];
            }, 0);
            $paidAmountReturn = collect($allReturnPurchaseTransaction)->reduce(function ($acc, $current) {
                return $acc + $current['amount'];
            }, 0);
            $totalDiscountEarned = collect($discountEarned)->reduce(function ($acc, $current) {
                return $acc + $current['amount'];
            }, 0);

            //get all transactions related to purchaseInvoiceId
            $allTransaction = Transaction::whereIn('type', ["purchase", "purchase_return"])
                ->whereIn('relatedId', $allPurchaseInvoiceId)
                ->with('debit', 'credit')
                ->get();

            // calculate due amount
            $dueAmount = (float)$allPurchaseInvoiceTotalAmount->totalAmount -
                (float)$allPurchaseInvoiceTotalAmount->discount -
                (float)$totalPaidAmount - (float)$totalDiscountEarned -
                (float)$totalReturnPurchaseInvoice + (float)$paidAmountReturn;


            // include dueAmount in singleSupplier
            $singleSupplier->dueAmount = takeUptoThreeDecimal((float)$dueAmount) ?? 0;

            $singleSupplier->allReturnPurchaseInvoice = arrayKeysToCamelCase(($allReturnPurchaseInvoice->flatten())->toArray());

            $singleSupplier->allTransaction = arrayKeysToCamelCase($allTransaction->toArray());

            //==================== UPDATE supplier's purchase invoice information START====================

            $singleSupplier->purchaseInvoice->map(function ($item) use ($allPurchaseTransaction, $allReturnPurchaseTransaction, $discountEarned, $allReturnPurchaseInvoice) {
                $paidAmount = $allPurchaseTransaction->filter(function ($transaction) use ($item) {
                    return $transaction->relatedId === $item->id;
                })->reduce(function ($acc, $curr) {
                    return $acc + $curr->amount;
                }, 0);

                $paidAmountReturn = $allReturnPurchaseTransaction->filter(function ($transaction) use ($item) {
                    return $transaction->relatedId === $item->id;
                })->reduce(function ($acc, $curr) {
                    return $acc + $curr->amount;
                }, 0);

                $singleDiscountEarned = $discountEarned->filter(function ($transaction) use ($item) {
                    return $transaction->relatedId === $item->id;
                })->reduce(function ($acc, $curr) {
                    return $acc + $curr->amount;
                }, 0);

                $returnAmount = ($allReturnPurchaseInvoice->flatten())->filter(function ($returnPurchaseInvoice) use ($item) {
                    return $returnPurchaseInvoice->purchaseInvoiceId === $item->id;
                })->reduce(function ($acc, $curr) {
                    return $acc + $curr->totalAmount;
                }, 0);

                $discount = $item->discount + $singleDiscountEarned;
                $dueAmount = $item->totalAmount - $item->discount - $paidAmount - $returnAmount + $paidAmountReturn - $singleDiscountEarned;

                $item->paidAmount = $paidAmount;
                $item->discount = $discount;
                $item->dueAmount = $dueAmount;

                return $item;
            });
            arrayKeysToCamelCase($singleSupplier->toArray());
            $converted = arrayKeysToCamelCase($singleSupplier->toArray());
            return response()->json($converted, 200);
        } catch (Exception $err) {
            return response()->json(['error' => 'An error occurred during getting supplier. Please try again later.'], 500);
        }
    }

    // update single supplier controller method
    public function updateSingleSupplier(Request $request, $id): JsonResponse
    {
        try {
            $updatedSupplier = Supplier::where('id', (int)$id)
                ->update([
                    'name' => $request->input('name'),
                    'phone' => $request->input('phone'),
                    'address' => $request->input('address'),
                ]);

            if (!$updatedSupplier) {
                return response()->json(['error' => 'Failed To Update Supplier'], 404);
            }
            return response()->json(['message' => 'Supplier updated Successfully'], 200);
        } catch (Exception $err) {
            return response()->json(['error' => 'An error occurred during update supplier. Please try again later.'], 500);
        }
    }

    // delete single supplier controller method
    public function deleteSingleSupplier(Request $request, $id): JsonResponse
    {
        try {
            $deletedSupplier = Supplier::where('id', (int)$id)
                ->update([
                    'status' => $request->input('status')
                ]);

            if (!$deletedSupplier) {
                return response()->json(['error' => 'Failed To delete Supplier'], 404);
            }
            return response()->json(['message' => 'Supplier deleted Successfully'], 200);
        } catch (Exception $err) {
            return response()->json(['error' => 'An error occurred during delete supplier. Please try again later.'], 500);
        }
    }
}
