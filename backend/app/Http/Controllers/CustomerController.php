<?php

namespace App\Http\Controllers;

use App\Mail\Sendmail;
use App\Models\EmailConfig;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Exception;
use Firebase\JWT\JWT;
use App\Models\Customer;
use App\Models\Role;
use App\Models\AppSetting;
use App\Models\CustomerPermissions;
use App\Models\SaleInvoice;
use App\Models\Transaction;

class CustomerController extends Controller
{
    //generate random strings
    public function customerLogin(Request $request): jsonResponse
    {
        try {
            $loggedCustomer = json_decode($request->getContent(), true);

            $customer = Customer::where('email', $loggedCustomer['email'])->first();
            // check authentication using email and password;
            if (!($customer && Hash::check($loggedCustomer['password'], $customer->password))) {
                return response()->json(['message' => 'authentication failed!'], 401);
            }

            $allUser = CustomerPermissions::where('user', 'customer')
                ->select('permissions')
                ->get();

            $endpointString = $allUser->map(function ($item) {
                return $item->permissions;
            });

            if ($customer) {
                $token = array(
                    "sub" => $customer->id,
                    "permissions" => $endpointString,
                    "exp" => time() + 86400
                );

                $jwt = JWT::encode($token, env('JWT_SECRET'), 'HS256');

                unset($customer->password);
                $customer->token = $jwt;

                $converted = arrayKeysToCamelCase($customer->toArray());
                return response()->json($converted, 200);
            } else {
                return response()->json(['error' => 'authentication failed!'], 401);
            }
        } catch (Exception $err) {
            return response()->json(['error' => 'An error occurred during getting customer. Please try again later.'], 500);
        }
    }

    // login customer controller method;

    public function resetPassword(Request $request, $id): JsonResponse
    {
        try {
            $data = $request->attributes->get("data");
            echo $data['sub'];
            if ($data['sub'] !== (int)$id) {
                return response()->json(['error' => 'Unauthorized access!'], 401);
            }

            $customer = Customer::findOrFail($id);
            $checkingOldPassword = Hash::check($request->input('oldPassword'), $customer->password);

            if ($checkingOldPassword === false) {
                return response()->json(['error' => 'authentication failed!'], 401);
            }

            $newHashedPassword = Hash::make($request->input('password'));

            $updatedPassword = Customer::where('id', $id)->update([
                'password' => $newHashedPassword,
            ]);

            if (!$updatedPassword) {
                return response()->json(['error' => 'password not updated!'], 404);
            }
            return response()->json(['message' => 'password reset successfully'], 200);
        } catch (Exception $err) {
            return response()->json(['error' => 'An error occurred during getting customer. Please try again later.'], 500);
        }
    }

    // reset Customer Password controller method;

    public function forgotPassword(Request $request): jsonResponse
    {
        try {

            //get the customer
            $customerEmail = $request->input('email');
            $customer = Customer::where('email', $customerEmail)->first();

            if (!$customer) {
                return response()->json(['error' => 'Email Not Found!'], 404);
            }

            //get the setting for company name
            $company = AppSetting::where('id', 1)->first();

            // generated hashed password randomly;
            $randomPassword = $this->makePassword(10);
            $generatedHashedPassword = Hash::make($randomPassword);

            //Customer password update
            Customer::where('id', $customer->id)->update([
                'password' => $generatedHashedPassword,
            ]);

            //company
            $companyName = AppSetting::first();
            $emailConfig = EmailConfig::first();
            //set the config
            config([
                'mail.mailers.smtp.host' => $emailConfig->emailHost,
                'mail.mailers.smtp.port' => $emailConfig->emailPort,
                'mail.mailers.smtp.encryption' => $emailConfig->emailEncryption,
                'mail.mailers.smtp.username' => $emailConfig->emailUser,
                'mail.mailers.smtp.password' => $emailConfig->emailPass,
                'mail.mailers.smtp.local_domain' => env('MAIL_EHLO_DOMAIN'),
                'mail.from.address' => $emailConfig->emailUser,
                'mail.from.name' => $emailConfig->emailConfigName,
            ]);

            //convert the email before @
            $email = explode('@', $customerEmail);
            $mailData = [
                'title' => 'Forget Password',
                'name' => 'shaon',
                'email' => $request->email,
                'password' => $randomPassword,
                'body' => $request->body,
                'companyName' => $companyName->companyName,
            ];

            $email = Mail::to($request->email)->send(new Sendmail($mailData));

            if (!$email) {
                return response()->json(['error' => 'Email Not Sent!'], 500);
            }

            return response()->json(['message' => 'Please check your mail']);
        } catch (Exception $err) {
            return response()->json(['error' => 'An error occurred during getting customer. Please try again later.'], 500);
        }
    }

    // forgot Password controller method

    private function makePassword($length)
    {
        $characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        $password = "";

        for ($i = 0; $i < $length; $i++) {
            $password .= $characters[random_int(0, strlen($characters) - 1)];
        }
        return $password;
    }

    // register a customer controller method;

    public function createSingleCustomer(Request $request): jsonResponse
    {
        if ($request->query('query') === 'deletemany') {
            try {
                $ids = json_decode($request->getContent(), true);
                $deletedCustomer = Customer::destroy($ids);

                return response()->json($deletedCustomer, 200);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during getting customer. Please try again later.'], 500);
            }
        } else if ($request->query('query') === 'createmany') {
            try {
                $customerData = json_decode($request->getContent(), true);

                //check if product already exists
                $customerData = collect($customerData)->map(function ($item) {
                    $customer = Customer::where('name', $item['name'])->first();
                    if ($customer) {
                        return null;
                    }
                    return $item;
                })->filter(function ($item) {
                    return $item !== null;
                })->toArray();

                //if all products already exists
                if (count($customerData) === 0) {
                    return response()->json(['error' => 'All Customer already exists.'], 500);
                }
                $createdCustomer = collect($customerData)->map(function ($item) {
                    $randomPassword = $this->makePassword(10);
                    $hashedPass = Hash::make($randomPassword);

                    return Customer::firstOrCreate([
                        'name' => $item['name'],
                        'email' => $item['email'],
                        'phone' => $item['phone'],
                        'address' => $item['address'],
                        'password' => $hashedPass,
                    ]);
                });

                return response()->json($createdCustomer, 201);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during getting customer. Please try again later.'], 500);
            }
        } else {
            try {
                $randomPassword = $this->makePassword(10);
                $hashedPass = Hash::make($randomPassword);

                $createdCustomer = Customer::create([
                    'name' => $request->input('name'),
                    'email' => $request->input('email'),
                    'phone' => $request->input('phone'),
                    'address' => $request->input('address'),
                    'password' => $hashedPass,
                ]);

                $companyName = AppSetting::first();
                $emailConfig = EmailConfig::first();
                //set the config
                config([
                    'mail.mailers.smtp.host' => $emailConfig->emailHost,
                    'mail.mailers.smtp.port' => $emailConfig->emailPort,
                    'mail.mailers.smtp.encryption' => $emailConfig->emailEncryption,
                    'mail.mailers.smtp.username' => $emailConfig->emailUser,
                    'mail.mailers.smtp.password' => $emailConfig->emailPass,
                    'mail.mailers.smtp.local_domain' => env('MAIL_EHLO_DOMAIN'),
                    'mail.from.address' => $emailConfig->emailUser,
                    'mail.from.name' => $emailConfig->emailConfigName,
                ]);

                //convert the email before @
                $email = explode('@', $request->email);
                $mailData = [
                    'title' => "New Account",
                    "body" => $request->body,
                    "name" => $email[0],
                    "email" => $request->email,
                    "password" => $randomPassword,
                    "companyName" => $companyName->companyName,
                ];
                $email = Mail::to($request->email)->send(new Sendmail($mailData));

                if (!$email) {
                    return response()->json(['error' => 'Email Not Sent!'], 404);
                }
                unset($createdCustomer->password);
                return response()->json(['message' => 'Please check your mail', 'data' => $createdCustomer], 201);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during getting customer. Please try again later.'], 500);
            }
        }
    }

    // get all the customer controller method;
    public function getAllCustomer(Request $request): jsonResponse
    {
        if ($request->query('query') === 'all') {
            try {
                $allCustomer = Customer::orderBy('id', 'asc')
                    ->with('saleInvoice')
                    ->get();

                // secure data by removing password form customer data;
                collect($allCustomer)->map(function ($item) {
                    unset($item->password);
                });

                $converted = arrayKeysToCamelCase($allCustomer->toArray());
                return response()->json($converted, 200);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during getting customer. Please try again later.'], 500);
            }
        } else if ($request->query('query') === 'info') {

            //aggregate query
            $customerInfo = Customer::where('status', 'true')
                ->selectRaw('COUNT(id) as countedId')
                ->first();

            $result = [
                '_count' => [
                    'id' => $customerInfo->countedId,
                ],
            ];
            return response()->json($result, 200);
        } else if ($request->query('query') === 'search') {
            try {
                $key = trim($request->query('prod'));
                $getAllCustomer = Customer::where(function ($query) use ($key) {
                    $query->orWhere('name', 'LIKE', '%' . $key . '%');
                })
                    ->with('saleInvoice')
                    ->orderBy('id', 'desc')
                    ->get();

                // secure data removing password form customer data;
                collect($getAllCustomer)->map(function ($item) {
                    unset($item->password);
                });

                $converted = arrayKeysToCamelCase($getAllCustomer->toArray());
                return response()->json($converted, 200);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during getting customer. Please try again later.'], 500);
            }
        } else if ($request->query('status')) {
            $pagination = getPagination($request->query());
            $getAllCustomer = Customer::where('status', $request->query('status'))
                ->with('saleInvoice')
                ->orderBy('id', 'asc')
                ->skip($pagination['skip'])
                ->take($pagination['limit'])
                ->get();

            //aggregate query
            $customerInfo = Customer::where('status', $request->query('status'))
                ->selectRaw('count(id) as countedId')
                ->first();

            // secure data removing password form customer data;
            collect($getAllCustomer)->map(function ($item) {
                unset($item->password);
            });

            $converted = arrayKeysToCamelCase($getAllCustomer->toArray());
            $result = [
                'getAllCustomer' => $converted,
                'totalCustomer' => $customerInfo->countedId,
            ];

            return response()->json($result, 200);
        } else {
            return response()->json(['error' => 'Invalid query!'], 400);
        }
    }

    // get a single customer data controller method;
    public function getSingleCustomer(Request $request, $customerId): jsonResponse
    {
        try {
            $singleCustomer = Customer::where('id', $customerId)
                ->with('saleInvoice')
                ->first();
            // to secure data removing password form customer data;
            unset($singleCustomer->password);

            // get saleInvoice totalAmount by customer id from saleInvoice
            $SaleInvoiceTotalAmount = SaleInvoice::where('customerId', (int)$customerId)
                ->selectRaw("SUM(totalAmount) as totalAmount, SUM(discount) as discount")
                ->first();

            $allSaleInvoiceTotalAmount = [
                '_sum' => [
                    'totalAmount' => $SaleInvoiceTotalAmount->totalAmount,
                    'discount' => $SaleInvoiceTotalAmount->discount,
                ],
            ];

            //get returnSaleInvoice nested by customerId from customer table
            $customersAllInvoice = Customer::where('id', (int)$customerId)
                ->with(['saleInvoice', 'saleInvoice.returnSaleInvoice' => function ($query) {
                    $query->where('status', 'true');
                }])
                ->first();

            // get all returnSaleInvoice of a customer
            $allReturnSaleInvoice = $customersAllInvoice->saleInvoice->map(function ($item) {
                return $item->returnSaleInvoice;
            })->flatten();

            // calculate total returnSaleInvoice amount
            $TotalReturnSaleInvoice = $allReturnSaleInvoice->sum('totalAmount');

            // get all saleInvoice id by customer
            $allSaleInvoiceId = $customersAllInvoice->saleInvoice->pluck('id')->all();

            // get all transactions which is related to these saleInvoice
            $allSaleTransaction = Transaction::where('type', 'sale')
                ->whereIn('relatedId', $allSaleInvoiceId)
                ->where(function ($query) {
                    $query->orWhere('debitId', 1)
                        ->orWhere('debitId', 2);
                })
                ->with('debit:id,name', 'credit:id,name')
                ->get();

            // get all transactions related to returnSaleInvoice
            $allReturnSaleTransaction = Transaction::where('type', 'sale_return')
                ->whereIn('relatedId', $allSaleInvoiceId)
                ->where(function ($query) {
                    $query->orWhere('creditId', 1)
                        ->orWhere('creditId', 2);
                })
                ->with('debit:id,name', 'credit:id,name')
                ->get();

            // calculate the discountGivenAmount at the time of make the payment
            $discountGiven = Transaction::where('type', 'sale')
                ->whereIn('relatedId', $allSaleInvoiceId)
                ->where('debitId', 14)
                ->with('debit:id,name', 'credit:id,name')
                ->get();

            $totalPaidAmount = $allSaleTransaction->sum('amount');
            $paidAmountReturn = $allReturnSaleTransaction->sum('amount');
            $totalDiscountGiven = $discountGiven->sum('amount');

            //get all transactions related to saleInvoiceId
            $allTransaction = Transaction::whereIn('relatedId', $allSaleInvoiceId)
                ->with('debit:id,name', 'credit:id,name')
                ->get();

            $dueAmount = (float)($allSaleInvoiceTotalAmount['_sum']['totalAmount']) -
                (float)($allSaleInvoiceTotalAmount['_sum']['discount']) -
                (float)$totalPaidAmount -
                (float)$totalDiscountGiven -
                (float)$TotalReturnSaleInvoice +
                (float)$paidAmountReturn;

            $singleCustomer->dueAmount = $dueAmount ? takeUptoThreeDecimal((float)$dueAmount) : 0;

            $singleCustomer->allReturnSaleInvoice = $allReturnSaleInvoice ? arrayKeysToCamelCase($allReturnSaleInvoice->toArray()) : [];
            $singleCustomer->allTransaction = $allTransaction ? arrayKeysToCamelCase($allTransaction->toArray()) : [];

            //======= UPDATE customer's purchase invoice information START =========
            $singleCustomer->saleInvoice->map(function ($item) use ($allSaleTransaction, $allReturnSaleTransaction, $discountGiven, $allReturnSaleInvoice) {
                $paidAmount = $allSaleTransaction->filter(function ($transaction) use ($item) {
                    return $transaction->relatedId === $item->id;
                })->sum('amount');

                $paidAmountReturn = $allReturnSaleTransaction->filter(function ($transaction) use ($item) {
                    return $transaction->relatedId === $item->id;
                })->sum('amount');

                $singleDiscountGiven = $discountGiven->filter(function ($transaction) use ($item) {
                    return $transaction->relatedId === $item->id;
                })->sum('amount');

                $returnAmount = $allReturnSaleInvoice->filter(function ($returnSaleInvoice) use ($item) {
                    return $returnSaleInvoice->saleInvoiceId === $item->id;
                })->sum('totalAmount');

                $item->paidAmount = $paidAmount;
                $item->discount = $item->discount + $singleDiscountGiven;
                $item->dueAmount = $item->totalAmount -
                    $item->discount -
                    $paidAmount -
                    $returnAmount +
                    $paidAmountReturn -
                    $singleDiscountGiven;

                return $item;
            });

            $converted = arrayKeysToCamelCase($singleCustomer->toArray());
            return response()->json($converted, 200);
        } catch (Exception $err) {
            return response()->json(['error' => 'An error occurred during getting customer. Please try again later.'], 500);
        }
    }

    // update a single customer data controller method;
    public function updateSingleCustomer(Request $request, $id): jsonResponse
    {
        try {
            $customerData = json_decode($request->getContent(), true);

            if (isset($customerData['password'])) {
                unset($customerData['password']);
                return response()->json(['message' => 'password cannot be updated!'], 400);
            }

            unset($customerData['resetPassword']);
            $updatedCustomer = Customer::where('id', $id)->update([
                'name' => $customerData['name'],
                'phone' => $customerData['phone'],
                'address' => $customerData['address'],
            ]);

            if (!$updatedCustomer) {
                return response()->json(['error' => 'Customer Not Updated!'], 404);
            }

            return response()->json(['message' => 'Customer Updated SuccessFully'], 200);
        } catch (Exception $err) {
            return response()->json(['error' => 'An error occurred during update customer. Please try again later.'], 500);
        }
    }

    // delete a single customer data controller method
    public function deleteSingleCustomer(Request $request, $id): jsonResponse
    {
        try {
            $status = json_decode($request->getContent(), true);
            $deleted = Customer::where('id', (int)$id)->update([
                'status' => $status['status'],
            ]);

            if (!$deleted) {
                return response()->json(['error' => 'Failed to Delete Customer'], 404);
            }
            return response()->json(["message" => "Customer Deleted SuccessFull"], 200);
        } catch (Exception $err) {
            return response()->json(['error' => 'An error occurred during delete customer. Please try again later.'], 500);
        }
    }
}
