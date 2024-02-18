<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
//
class TransactionController extends Controller
{
    public function createTransaction(Request $request): JsonResponse
    {
        try {
            $date = new \DateTime($request->input('date'));
            $request->merge([
                'date' => $date,
            ]);
            $transaction = Transaction::create($request->all());
            return response()->json($transaction, 201);
        } catch (Exception $err) {
            return response()->json(['error' => 'An error occurred during create transaction. Please try again later.'], 500);
        }
    }

    public function getAllTransaction(Request $request): JsonResponse
    {
        if ($request->query('query') === 'info') {
            try {
                $aggregations = Transaction::where('status', "true")
                    ->selectRaw('COUNT(id) as _count, SUM(amount) as _sum')
                    ->first();

                $response = [
                    '_count' => [
                        'id' => $aggregations->_count ?? 0,
                    ],
                    '_sum' => [
                        'amount' => $aggregations->_sum ?? null,
                    ],
                ];
                return response()->json($response, 200);
            } catch (Exception $error) {
                return response()->json(['error' => 'An error occurred during getting transaction. Please try again later.'], 500);
            }
        } else if ($request->query('query') === 'all') {
            try {
                $allTransaction = Transaction::with('debit', 'credit')->orderBy('id', 'asc')->get();
                $converted = arrayKeysToCamelCase($allTransaction->toArray());
                return response()->json($converted, 200);
            } catch (Exception $error) {
                return response()->json(['error' => 'An error occurred during getting transaction. Please try again later.'], 500);
            }
        } else if ($request->query('query') === 'inactive') {
            try {
                $aggregations = Transaction::query()
                    ->selectRaw('COUNT(id) as totalCount, SUM(amount) as totalAmount')
                    ->where('date', '>=', $request->query('startdate'))
                    ->where('date', '<=', $request->query('enddate'))
                    ->where('status', "false")
                    ->first();

                $allTransaction = Transaction::query()
                    ->where('date', '>=', $request->query('startdate'))
                    ->where('date', '<=', $request->query('enddate'))
                    ->where('status', "false")
                    ->orderBy('id', 'asc')
                    ->with('debit', 'credit')
                    ->get();
                echo $allTransaction;

                $converted = arrayKeysToCamelCase($allTransaction->toArray());

                $response = [
                    'aggregations' => [
                        '_count' => [
                            'id' => $aggregations->totalCount ?? 0,
                        ],
                        '_sum' => [
                            'amount' => $aggregations->totalAmount ?? null,
                        ],
                    ],
                    'allTransaction' => $converted,
                ];

                return response()->json($response, 200);
            } catch (Exception $error) {
                return response()->json(['error' => 'An error occurred during getting transaction. Please try again later.'], 500);
            }
        } else if ($request->query('query') === 'search') {
            try {
                $allTransaction = Transaction::where('id', (int) $request->query('transaction'))
                    ->with('debit', 'credit')
                    ->orderBy('id', 'desc')
                    ->get();

                $converted = arrayKeysToCamelCase($allTransaction->toArray());

                return response()->json($converted, 200);
            } catch (Exception $error) {
                return response()->json(['error' => 'An error occurred during getting transaction. Please try again later.'], 500);
            }
        } else {
            $pagination = getPagination($request->query());
            try {
                $aggregations = Transaction::query()
                    ->selectRaw('COUNT(id) as totalCount, SUM(amount) as totalAmount')
                    ->where('date', '>=', $request->query('startdate'))
                    ->where('date', '<=', $request->query('enddate'))
                    ->where('status', "true")
                    ->first();

                $allTransaction = Transaction::query()
                    ->where('date', '>=', $request->query('startdate'))
                    ->where('date', '<=', $request->query('enddate'))
                    ->where('status', "true")
                    ->orderBy('id', 'asc')
                    ->with('debit', 'credit')
                    ->skip($pagination['skip'])
                    ->take($pagination['limit'])
                    ->get();

                $converted = arrayKeysToCamelCase($allTransaction->toArray());

                $response = [
                    'aggregations' => [
                        '_count' => [
                            'id' => $aggregations->totalCount ?? 0,
                        ],
                        '_sum' => [
                            'amount' => $aggregations->totalAmount ?? null,
                        ],
                    ],
                    'allTransaction' => $converted,
                ];

                return response()->json($response, 200);
            } catch (Exception $error) {
                return response()->json(['error' => 'An error occurred during getting transaction. Please try again later.'], 500);
            }
        }
    }

    // get a single transaction controller method
    public function getSingleTransaction(Request $request, $id): JsonResponse
    {
        try {
            $singleTransaction = Transaction::where('id', (int) $id)
                ->with('debit:id,name', 'credit:id,name')
                ->first();
            $converted = arrayKeysToCamelCase($singleTransaction->toArray());
            return response()->json($converted, 200);
        } catch (Exception $error) {
            return response()->json(['error' => 'An error occurred during getting transaction. Please try again later.'], 500);
        }
    }

    // update a single transaction controller method
    public function updateSingleTransaction(Request $request, $id): JsonResponse
    {
        try {
            $date = Carbon::parse($request->input('date'));

            $updatedTransaction = Transaction::where('id', (int) $id)->update([
                'date' => $date,
                'particulars' => $request->input('particulars'),
                'type' => 'transaction',
                'relatedId' => 0,
                'amount' => takeUptoThreeDecimal((float) $request->input('amount')),
            ]);

            if (!$updatedTransaction) {
                return response()->json(['error' => 'Failed To Update Transaction'], 404);
            }
            return response()->json(['message' => 'Transaction updated successfully'], 200);
        } catch (Exception $error) {
            return response()->json(['error' => 'An error occurred during update transaction. Please try again later.'], 500);
        }
    }

    // delete a single transaction controller method
    public function deleteSingleTransaction(Request $request, $id): JsonResponse
    {
        try {
            $deletedTransaction = Transaction::where('id', (int) $id)->update([
                'status' => $request->input('status'),
            ]);

            if (!$deletedTransaction) {
                return response()->json(['error' => 'Failed To Update Transaction'], 404);
            }
            return response()->json(['message' => 'Transaction deleted successfully'], 200);
        } catch (Exception $error) {
            return response()->json(['error' => 'An error occurred during delete transaction. Please try again later.'], 500);
        }
    }
}
