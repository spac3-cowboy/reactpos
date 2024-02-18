<?php

namespace App\Http\Controllers;

use App\Models\Account;
use App\Models\SubAccount;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AccountController extends Controller
{
    //create subAccount
    public function createSubAccount(Request $request): JsonResponse
    {
        try {
            $createdSubAccount = SubAccount::create([
                'name' => $request->input('name'),
                'accountId' => $request->input('accountId'),
            ]);
            $converted = arrayKeysToCamelCase($createdSubAccount->toArray());
            return response()->json($converted, 201);
        } catch (Exception $error) {
            return response()->json(['error' => 'An error occurred during create subAccount. Please try again later.'], 500);
        }
    }

    //get all account
    public function getAllAccount(Request $request): JsonResponse
    {
        if ($request->query('query') === 'tb') {
            try {
                $allAccounts = Account::orderBy('id', 'asc')
                    ->with(['subAccount' => function ($query) {
                        $query->with(['debit' => function ($query) {
                            $query->where('status', 'true');
                        }, 'credit' => function ($query) {
                            $query->where('status', 'true');
                        }]);
                    }])
                    ->get();

                $accountInfo = [];

                foreach ($allAccounts as $account) {
                    foreach ($account->subAccount as $subAccount) {
                        $totalDebit = $subAccount->debit->where('status', true)->sum('amount');
                        $totalCredit = $subAccount->credit->where('status', true)->sum('amount');
                        $balance = $totalDebit - $totalCredit;

                        $accountInfo[] = [
                            'account' => $account->name,
                            'subAccount' => $subAccount->name,
                            'totalDebit' => $totalDebit,
                            'totalCredit' => $totalCredit,
                            'balance' => $balance,
                        ];
                    }
                }

                $trialBalance = $accountInfo; // Assuming you already have $accountInfo

                $debits = [];
                $credits = [];

                foreach ($trialBalance as $item) {
                    if ($item['balance'] > 0) {
                        $debits[] = $item;
                    }
                    if ($item['balance'] < 0) {
                        $credits[] = $item;
                    }
                }

                // Assuming you have already separated items into $debits and $credits arrays

                $totalDebit = array_reduce($debits, function ($carry, $debit) {
                    return $carry + $debit['balance'];
                }, 0);

                $totalCredit = array_reduce($credits, function ($carry, $credit) {
                    return $carry + $credit['balance'];
                }, 0);

                $match = true;

                if (-$totalDebit === $totalCredit) {
                    $match = true;
                } else {
                    $match = false;
                }

                $responseData = [
                    'match' => $match,
                    'totalDebit' => $totalDebit,
                    'totalCredit' => $totalCredit,
                    'debits' => $debits,
                    'credits' => $credits,
                ];

                return response()->json($responseData)->setStatusCode(200);
            } catch (Exception $error) {
                return response()->json(['error' => 'An error occurred during getting trial balance. Please try again later.'], 500);
            }
        } elseif ($request->query('query') === 'bs') {
            try {
                $allAccount = Account::orderBy('id', 'asc')
                    ->with('subAccount.credit', 'subAccount.debit')
                    ->get();


                $accountInfo = [];

                foreach ($allAccount as $account) {
                    foreach ($account->subAccount as $subAccount) {
                        $totalDebit = $subAccount->debit->sum('amount');
                        $totalCredit = $subAccount->credit->sum('amount');
                        $balance = $totalDebit - $totalCredit;


                        // Add the total debit and total credit to each subAccount object
                        $subAccount->totalDebit = $totalDebit;
                        $subAccount->totalCredit = $totalCredit;
                        $subAccount->balance = $balance;

                        // Create an array for the transformed subAccount data
                        $accountInfo[] = [
                            'account' => $account->type,
                            'subAccount' => $subAccount->name,
                            'totalDebit' => $totalDebit,
                            'totalCredit' => $totalCredit,
                            'balance' => $balance,
                        ];
                    }
                }

                $balanceSheet = $accountInfo;
                $assets = [];
                $liabilities = [];
                $equity = [];

                foreach ($balanceSheet as $item) {
                    if ($item['account'] === "Asset" && $item['balance'] !== 0) {
                        $assets[] = $item;
                    }
                    if ($item['account'] === "Liability" && $item['balance'] !== 0) {
                        // Convert negative balance to positive
                        $item['balance'] = -$item['balance'];
                        $liabilities[] = $item;
                    }
                    if ($item['account'] === "Owner's Equity" && $item['balance'] !== 0) {
                        // Convert negative balance to positive
                        $item['balance'] = -$item['balance'];
                        $equity[] = $item;
                    }
                }

                $totalAsset = array_reduce($assets, function ($carry, $asset) {
                    return $carry + $asset['balance'];
                }, 0);

                $totalLiability = array_reduce($liabilities, function ($carry, $liability) {
                    return $carry + $liability['balance'];
                }, 0);

                $totalEquity = array_reduce($equity, function ($carry, $equityItem) {
                    return $carry + $equityItem['balance'];
                }, 0);

                if (-$totalAsset === $totalLiability + $totalEquity) {
                    $match = true;
                } else {
                    $match = false;
                }

                $responseData = [
                    'match' => $match,
                    'totalAsset' => $totalAsset,
                    'totalLiability' => $totalLiability,
                    'totalEquity' => $totalEquity,
                    'assets' => $assets,
                    'liabilities' => $liabilities,
                    'equity' => $equity,
                ];

                return response()->json($responseData, 200);
            } catch (Exception $error) {
                return response()->json(['error' => 'An error occurred during getting balance sheet. Please try again later.'], 500);
            }
        } elseif ($request->query('query') === 'is') {
            try {
                $allAccount = Account::with('subAccount.credit', 'subAccount.debit')->orderBy('id', 'asc')->get();

                $accountInfo = [];

                foreach ($allAccount as $account) {
                    foreach ($account->subAccount as $subAccount) {
                        $totalDebit = $subAccount->debit->sum('amount');
                        $totalCredit = $subAccount->credit->sum('amount');
                        $balance = $totalDebit - $totalCredit;

                        // Create an array for the transformed subAccount data
                        $accountInfo[] = [
                            'id' => $subAccount->id,
                            'account' => $account->name,
                            'subAccount' => $subAccount->name,
                            'totalDebit' => $totalDebit,
                            'totalCredit' => $totalCredit,
                            'balance' => $balance,
                        ];
                    }
                }

                $incomeStatement = $accountInfo;
                $revenue = [];
                $expense = [];

                foreach ($incomeStatement as $item) {
                    if ($item['account'] === "Revenue" && $item['balance'] !== 0) {
                        // Convert negative balance to positive
                        $item['balance'] = -$item['balance'];
                        $revenue[] = $item;
                    }
                    if ($item['account'] === "Expense" && $item['balance'] !== 0) {
                        // Convert negative balance to positive
                        $item['balance'] = -$item['balance'];
                        $expense[] = $item;
                    }
                }


                $totalRevenue = array_reduce($revenue, function ($carry, $revenueItem) {
                    return $carry + $revenueItem['balance'];
                }, 0);

                $totalExpense = array_reduce($expense, function ($carry, $expenseItem) {
                    return $carry + $expenseItem['balance'];
                }, 0);

                $profit = $totalRevenue + $totalExpense;

                $responseData = [
                    'totalRevenue' => $totalRevenue,
                    'totalExpense' => $totalExpense,
                    'profit' => $profit,
                    'revenue' => $revenue,
                    'expense' => $expense,
                ];

                return response()->json($responseData, 200);
            } catch (Exception $error) {
                return response()->json(['error' => 'An error occurred during getting income statement. Please try again later.'], 500);
            }
        } elseif ($request->query('type') === 'sa' && $request->query('query') === 'all') {
            try {
                $allSubAccount = SubAccount::where('status', 'true')
                    ->with('account')
                    ->orderBy('id', 'asc')
                    ->get();

                $converted = arrayKeysToCamelCase($allSubAccount->toArray());

                return response()->json($converted, 200);
            } catch (Exception $error) {
                return response()->json(['error' => 'An error occurred during getting sub account. Please try again later.'], 500);
            }
        } elseif ($request->query('type') === 'sa') {
            try {
                $pagination = getPagination($request->query());

                $allSubAccount = SubAccount::where('status', $request->query('status'))
                    ->skip($pagination['skip'])
                    ->take($pagination['limit'])
                    ->with('account')
                    ->orderBy('id', 'asc')
                    ->get();

                $converted = arrayKeysToCamelCase($allSubAccount->toArray());
                $finalResult = [
                    'getAllSubAccount' => $converted,
                    'totalSubAccount' => SubAccount::where('status', $request->query('status'))->count(),
                ];

                return response()->json($finalResult, 200);
            } catch (Exception $error) {
                return response()->json(['error' => 'An error occurred during getting sub account. Please try again later.'], 500);
            }
        } elseif ($request->query('query') === 'ma') {
            try {
                $allAccount = Account::orderBy('id', 'asc')->get();
                $converted = arrayKeysToCamelCase($allAccount->toArray());
                return response()->json($converted, 200);
            } catch (Exception $error) {
                return response()->json(['error' => 'An error occurred during getting main account. Please try again later.'], 500);
            }
        } else {
            try {
                $allAccount = Account::with('subAccount.credit', 'subAccount.debit')->orderBy('id', 'asc')->get();
                $converted = arrayKeysToCamelCase($allAccount->toArray());
                return response()->json($converted, 200);
            } catch (Exception $error) {
                return response()->json(['error' => 'An error occurred during getting all. Please try again later.'], 500);
            }
        }
    }

    public function getSingleAccount(Request $request, $id): JsonResponse
    {
        try {
            $singleAccount = SubAccount::with('debit', 'credit')->find($id);

            // calculate balance from total debit and credit

            $totalDebit = $singleAccount->debit->sum('amount');
            $totalCredit = $singleAccount->credit->sum('amount');
            $balance = $totalDebit - $totalCredit;
            $singleAccount->balance = $balance;

            $converted = arrayKeysToCamelCase($singleAccount->toArray());
            return response()->json($converted, 200);
        } catch (Exception $error) {
            return response()->json(['error' => 'An error occurred during getting single account. Please try again later.'], 500);
        }
    }

    //update the subAccount
    public function updateSubAccount(Request $request, $id): JsonResponse
    {
        try {
            $account = SubAccount::findOrFail($id);
            $account->update($request->all());

            if (!$account) {
                return response()->json(['error' => 'Failed to update account'], 400);
            }
            return response()->json(['message' => 'Update Successful'], 200);
        } catch (Exception $error) {
            return response()->json(['error' => 'An error occurred during login. Please try again later.'], 500);
        }
    }

    public function deleteSubAccount(Request $request, $id): JsonResponse
    {
        try {
            SubAccount::where('id', $id)->update([
                'status' => $request->input('status')
            ]);
            return response()->json('Sub Account deleted successfully', 200);
        } catch (Exception $error) {
            return response()->json(['error' => 'An error occurred during delete sub account. Please try again later.'], 500);
        }
    }
}
