<?php

namespace App\Http\Controllers;

use App\Models\SaleInvoice;
use App\Models\Transaction;
use Carbon\Carbon;
use DateTime;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PaymentSaleInvoiceController extends Controller
{
    //create paymentSaleInvoice controller method
    public function createSinglePaymentSaleInvoice(Request $request): JsonResponse
    {
        try {
            $date = Carbon::parse($request->input('date'))->toDateString();

            // received paidAmount against saleInvoice using a transaction
            $transaction1 = Transaction::create([
                'date' => new DateTime($date),
                'debitId' => 1,
                'creditId' => 4,
                'amount' =>  takeUptoThreeDecimal((float) $request->input('amount')),
                'particulars' => "Received payment of Sale Invoice #{$request->input('saleInvoiceNo')}",
                'type' => 'sale',
                'relatedId' => (int) $request->input('saleInvoiceNo'),
            ]);

            // discount given using a transaction
            $transaction2 = [];
            if ($request->input('discount') > 0) {
                $transaction2 = Transaction::create([
                    'date' => new DateTime($date),
                    'debitId' => 14,
                    'creditId' => 4,
                    'amount' =>  takeUptoThreeDecimal((float) $request->input('discount')),
                    'particulars' => "Discount given of Sale Invoice #{$request->input('saleInvoiceNo')}",
                    'type' => 'sale',
                    'relatedId' => (int) $request->input('saleInvoiceNo'),
                ]);
            }

            // decrease sale invoice profit by discount value
            $discount = $request->input('discount');
            SaleInvoice::where('id', (int) $request->input('saleInvoiceNo'))
                ->update([
                    'profit' => DB::raw("profit - $discount"),
                ]);

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
            return response()->json(['error' => 'An error occurred during create  paymentSale Please try again later.'], 500);
        }
    }

    // get all the paymentSaleInvoice controller method
    public function getAllPaymentSaleInvoice(Request $request): JsonResponse
    {
        if ($request->query('query') === 'all') {
            try {
                $allPaymentSaleInvoice = Transaction::where('type', 'sale')
                    ->orderBy('id', 'desc')
                    ->get();

                $converted = arrayKeysToCamelCase($allPaymentSaleInvoice->toArray());
                return response()->json($converted, 200);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during getting  paymentSale Please try again later.'], 500);
            }
        } else if ($request->query('query') === 'info') {
            try {
                $aggregations = Transaction::where('type', 'sale')
                    ->selectRaw('COUNT(id) as countedId, SUM(amount) as amount')
                    ->first();

                $finalResult = [
                    '_count' => [
                        'id' => $aggregations->countedId,
                    ],
                    '_sum' => [
                        'amount' => $aggregations->amount,
                    ],
                ];

                return response()->json($finalResult, 200);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during getting  paymentSale Please try again later.'], 500);
            }
        } else {
            try {
                $pagination = getPagination($request->query());
                $getAllPaymentSaleInvoice = Transaction::where('type', 'sale')
                    ->orderBy('id', 'desc')
                    ->skip($pagination['skip'])
                    ->take($pagination['limit'])
                    ->get();

                $aggregations = Transaction::where('type', 'sale')
                    ->selectRaw('COUNT(id) as count, SUM(amount) as amount')
                    ->first();

                $converted = arrayKeysToCamelCase($getAllPaymentSaleInvoice->toArray());
                $finalResult = [
                    'getAllPaymentSaleInvoice' => $converted,
                    'totalPaymentSaleInvoice' => $aggregations->count,
                    'totalAmount' => $aggregations->amount,
                ];

                return response()->json($finalResult, 200);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during getting  paymentSale Please try again later.'], 500);
            }
        }
    }
}
