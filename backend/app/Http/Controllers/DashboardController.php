<?php

namespace App\Http\Controllers;
//

use App\Models\Customer;
use App\Models\PurchaseInvoice;
use App\Models\SaleInvoice;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function getDashboardData(Request $request): JsonResponse
    {
        try {

            //==================================saleProfitCount===============================================

            $startDate = Carbon::parse($request->query('startdate'))->toDateString();;
            $endDate = Carbon::parse($request->query('enddate'))->toDateString();;

            // get all sale invoice by group
            $allSaleInvoice = SaleInvoice::whereBetween('date', [$startDate, $endDate])
                ->groupBy('date')
                ->orderBy('date', 'asc')
                ->selectRaw('COUNT(id) as countedId, SUM(totalAmount) as totalAmount, SUM(paidAmount) as paidAmount, SUM(dueAmount) as dueAmount, SUM(profit) as profit, date')
                ->get();

            // format response data for data visualization chart in antd
            $formattedData1 = $allSaleInvoice->map(function ($item) {
                return [
                    'type' => 'Sales',
                    'date' => Carbon::parse($item->date)->toDateString(),
                    'amount' => $item->totalAmount,
                ];
            });

            $formattedData2 = $allSaleInvoice->map(function ($item) {
                return [
                    'type' => 'Profit',
                    'date' => Carbon::parse($item->date)->toDateString(),
                    'amount' => $item->profit,
                ];
            });

            $formattedData3 = $allSaleInvoice->map(function ($item) {
                return [
                    'type' => 'Invoice Count',
                    'date' => Carbon::parse($item->date)->toDateString(),
                    'amount' => $item->countedId,
                ];
            });

            // concat formatted data
            $saleProfitCount = $formattedData1->concat($formattedData2)->concat($formattedData3);

            //=============== PurchaseVSSale ==============

            // get all customer due amount
            $salesInfo = SaleInvoice::selectRaw('COUNT(id) as countedId, SUM(totalAmount) as totalAmount')->first();

            $purchasesInfo = PurchaseInvoice::selectRaw('COUNT(id) as countedId, SUM(totalAmount) as totalAmount')->first();

            // format response data for data visualization chart in antd
            $formattedData4 =  [
                [
                    'type' => 'sales',
                    'value' => $salesInfo->totalAmount,
                ]
            ];

            $formattedData5 = [
                [
                    'type' => 'purchases',
                    'value' => $salesInfo->totalAmount,
                ]
            ];

            $SupplierVSCustomer = array_merge($formattedData4, $formattedData5);


            //==================================customerSaleProfit===============================================

            // get all sale invoice by group
            $allSaleInvoiceByGroup = SaleInvoice::whereBetween('date', [$startDate, $endDate])
                ->groupBy('customerId')
                ->selectRaw('COUNT(id) as countedId, SUM(totalAmount) as totalAmount, SUM(profit) as profit, customerId')
                ->get();

            // format response data for data visualization chart in antdantd
            $formattedData6 = $allSaleInvoiceByGroup->map(function ($item) {
                $customer = Customer::where('id', (int) $item->customerId)
                    ->first();

                $formattedData = [
                    'label' => $customer->name,
                    'type' => 'Sales',
                    'value' => $item->totalAmount,
                ];

                return $formattedData;
            });

            $formattedData7 = $allSaleInvoiceByGroup->map(function ($item) {
                $customer = Customer::where('id', (int) $item->customerId)
                    ->first();

                $formattedData = [
                    'label' => $customer->name,
                    'type' => 'Profit',
                    'value' => $item->profit,
                ];

                return $formattedData;
            });

            // concat formatted data
            $customerSaleProfit = collect([...$formattedData6, ...$formattedData7])->sortBy('value')->values()->all();

            //====================== cardInfo ======================
            $purchaseInfo = PurchaseInvoice::whereBetween('date', [$startDate, $endDate])
                ->selectRaw('COUNT(id) as countedId, SUM(totalAmount) as totalAmount, SUM(dueAmount) as dueAmount, SUM(paidAmount) as paidAmount')
                ->first();

            $saleInfo = SaleInvoice::whereBetween('date', [$startDate, $endDate])
                ->selectRaw('COUNT(id) as countedId, SUM(totalAmount) as totalAmount, SUM(dueAmount) as dueAmount, SUM(paidAmount) as paidAmount, SUM(profit) as profit')
                ->first();

            $cardInfo = [
                'purchaseCount' => $purchaseInfo->countedId,
                'purchaseTotal' => takeUptoThreeDecimal((float) $purchaseInfo->totalAmount),
                'saleCount' => $saleInfo->countedId,
                'saleTotal' => takeUptoThreeDecimal((float) $saleInfo->totalAmount),
                'saleProfit' => takeUptoThreeDecimal((float) $saleInfo->profit),
            ];

            $result = [
                'saleProfitCount' => $saleProfitCount,
                'SupplierVSCustomer' => $SupplierVSCustomer,
                'customerSaleProfit' => $customerSaleProfit,
                'cardInfo' => $cardInfo,

            ];

            return response()->json($result, 200);
        } catch (Exception $err) {
            return response()->json(['error' => 'An error occurred during getting dashboard. Please try again later.'], 500);
        }
    }
}
