<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Carbon\Carbon;
use DateTime;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PaymentPurchaseInvoiceController extends Controller
{
    //create paymentPurchaseInvoice controller method
    public function createPaymentPurchaseInvoice(Request $request): JsonResponse
    {
        try {
            $date = Carbon::parse($request->input('date'));

            // paid amount against purchaseInvoice using a transaction
            $transaction1 = Transaction::create([
                'date' => $date,
                'debitId' => 5,
                'creditId' => 1,
                'amount' => takeUptoThreeDecimal((float) $request->input('amount')),
                'particulars' => "Due pay of Purchase Invoice #{$request->input('purchaseInvoiceNo')}",
                'type' => 'purchase',
                'relatedId' => (int) $request->input('purchaseInvoiceNo'),
            ]);

            // discount earned using a transaction
            $transaction2 = [];
            if ($request->input('discount') > 0) {
                $transaction2 = Transaction::create([
                    'date' => $date,
                    'debitId' => 5,
                    'creditId' => 13,
                    'amount' => takeUptoThreeDecimal((float) $request->input('discount')),
                    'particulars' => "Discount earned of Purchase Invoice #{$request->input('purchaseInvoiceNo')}",
                    'type' => 'purchase',
                    'relatedId' => (int) $request->input('purchaseInvoiceNo'),
                ]);
            }


            $converted1 = $transaction1 ? arrayKeysToCamelCase($transaction1->toArray()) : [];
            $converted2 = $transaction2 ? arrayKeysToCamelCase($transaction2->toArray()) : [];
            if ($converted1 && $converted2) {
                $finalResult = [
                    'transaction1' => $converted1,
                    'transaction2' => $converted2,
                ];
            } else {
                $finalResult = [
                    'transaction1' => $converted1,
                ];
            }

            return response()->json($finalResult, 201);
        } catch (Exception $err) {
            return response()->json(['error' => 'An error occurred during create  paymentPurchase. Please try again later.'], 500);
        }
    }

    // get all the paymentPurchaseInvoice controller method
    public function getAllPaymentPurchaseInvoice(Request $request): JsonResponse
    {
        if ($request->query('query') === 'all') {
            try {
                $allPaymentPurchaseInvoice = Transaction::where('type', 'purchase')
                    ->orderBy('id', 'desc')
                    ->get();

                $converted = arrayKeysToCamelCase($allPaymentPurchaseInvoice->toArray());
                return response()->json($converted, 200);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during getting  paymentPurchase. Please try again later.'], 500);
            }
        } else if ($request->query('query') === 'info') {
            try {
                $aggregations = Transaction::where('type', 'purchase')
                    ->selectRaw('COUNT(id) as id, SUM(amount) as amount')
                    ->first();

                $finalResult = [
                    '_count' => [
                        'id' => $aggregations->id,
                    ],
                    '_sum' => [
                        'amount' => $aggregations->amount,
                    ],
                ];

                return response()->json($finalResult, 200);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during getting  paymentPurchase. Please try again later.'], 500);
            }
        } else {
            try {
                $pagination = getPagination($request->query());
                $allPaymentPurchaseInvoice = Transaction::where('type', 'purchase')
                    ->orderBy('id', 'desc')
                    ->skip($pagination['skip'])
                    ->take($pagination['limit'])
                    ->get();

                $aggregations = Transaction::where('type', 'purchase')
                    ->selectRaw('COUNT(id) as count, SUM(amount) as amount')
                    ->first();

                $converted = arrayKeysToCamelCase($allPaymentPurchaseInvoice->toArray());
                $finalResult = [
                    'getAllPaymentPurchaseInvoice' => $converted,
                    'totalPaymentPurchaseInvoice' => $aggregations->count,
                    'totalAmount' => $aggregations->amount,
                ];

                return response()->json($finalResult, 200);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during getting  paymentPurchase. Please try again later.'], 500);
            }
        }
    }
}
