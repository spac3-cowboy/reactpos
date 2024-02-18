<?php

namespace App\Http\Controllers;

use App\Models\PurchaseInvoice;
use App\Models\PurchaseReorderInvoice;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PurchaseReorderInvoiceController extends Controller
{
    public function createPurchaseReorderInvoice(Request $request): JsonResponse
    {
        try {
            // generate 10 digit unique invoice id
            $reorderInvoiceId = $this->generateInvoiceId(10);
            if (PurchaseReorderInvoice::where('reorderInvoiceId', $reorderInvoiceId)->exists()) {
                $reorderInvoiceId = $this->generateInvoiceId(8);
            }


            $reorderData = json_decode($request->getContent(), true);
            $createdReorderInvoice = collect($reorderData)->map(function ($item) use ($reorderInvoiceId) {
                return PurchaseReorderInvoice::create([
                    'reorderInvoiceId' => $reorderInvoiceId,
                    'productId' => $item['productId'],
                    'productQuantity' => $item['productQuantity']
                ]);
            });

            $converted = arrayKeysToCamelCase($createdReorderInvoice->toArray());
            return response()->json($converted, 200);
        } catch (Exception $err) {
            return response()->json(['error' => 'An error occurred during creating a purchase reorder invoice'], 500);
        }
    }

    protected function generateInvoiceId($digit): string
    {
        $characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $invoiceCode = '';

        for ($i = 0; $i < $digit; $i++) {
            $randomIndex = rand(0, strlen($characters) - 1);
            $invoiceCode = $invoiceCode . $characters[$randomIndex];
        }
        return $invoiceCode;
    }

    //get all purchase reorder invoice
    public function getAllPurchaseReorderInvoice(Request $request): JsonResponse
    {
        if ($request->query('query') === 'all') {
            try {
                $getAllPurchaseReorderInvoice = PurchaseReorderInvoice::orderBy('id', 'desc')
                    ->get();
                $groupBy = $getAllPurchaseReorderInvoice->groupBy('reorderInvoiceId');

                $modified = [];
                foreach ($groupBy as $reorderInvoiceId => $groupedData) {
                    $modified[] = [
                        'reorderInvoiceId' => $reorderInvoiceId,
                        'created_at' => $groupedData[0]['created_at'],
                        'updated_at' => $groupedData[0]['updated_at'],
                        'status' => $groupedData[0]['status'],
                    ];
                }

                $converted = arrayKeysToCamelCase(collect($modified)->toArray());
                return response()->json($converted, 200);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during creating a purchase reorder invoice'], 500);
            }
        } else {
            try {
                $pagination = getPagination($request->query());
                $getAllPurchaseReorderInvoice = PurchaseReorderInvoice::orderBy('id', 'desc')
                    ->get();

                $totalCount = $getAllPurchaseReorderInvoice->groupBy('reorderInvoiceId')->count();
                $groupBy = $getAllPurchaseReorderInvoice->groupBy('reorderInvoiceId')
                    ->skip($pagination['skip'])
                    ->take($pagination['limit']);

                $modified = [];
                foreach ($groupBy as $reorderInvoiceId => $groupedData) {
                    $modified[] = [
                        'reorderInvoiceId' => $reorderInvoiceId,
                        'created_at' => $groupedData[0]['created_at'],
                        'updated_at' => $groupedData[0]['updated_at'],
                        'status' => $groupedData[0]['status'],
                    ];
                }

                $converted = arrayKeysToCamelCase(collect($modified)->toArray());
                $finalResult = [
                    'getAllPurchaseReorderInvoice' => $converted,
                    'totalReorderInvoice' => $totalCount,
                ];

                return response()->json($finalResult, 200);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during creating a purchase reorder invoice'], 500);
            }
        }
    }

    // get a single purchase reorder invoice
    public function getSinglePurchaseReorderInvoice(Request $request, $reorderInvoiceId): JsonResponse
    {
        try {
            $getAllPurchaseReorderInvoice = PurchaseReorderInvoice::where('reorderInvoiceId', $reorderInvoiceId)
                ->orderBy('id', 'desc')
                ->with('product')
                ->get();
            $groupBy = $getAllPurchaseReorderInvoice->groupBy('reorderInvoiceId');
            $modified = [];
            foreach ($groupBy as $reorderInvoiceId => $groupedData) {
                $modified = [
                    'reorderInvoiceId' => $reorderInvoiceId,
                    'created_at' => $groupedData[0]['created_at'],
                    'updated_at' => $groupedData[0]['updated_at'],
                    'status' => $groupedData[0]['status'],
                    'productList' => collect($groupedData)->map(function ($item) {
                        $data = [
                            'productId' => $item['productId'],
                            'reorderProductQuantity' => $item['productQuantity'],
                            'product' => $item['product']
                        ];
                        return $data;
                    })
                ];
            }

            $converted = arrayKeysToCamelCase(collect($modified)->toArray());
            return response()->json($converted, 200);
        } catch (Exception $err) {
            return response()->json(['error' => 'An error occurred during creating a purchase reorder invoice'], 500);
        }
    }

    // delete a single purchase reorder invoice
    public function deletePurchaseReorderInvoice(Request $request, $reorderInvoiceId): JsonResponse
    {
        try {
            $deleted = PurchaseReorderInvoice::where('reorderInvoiceId', $reorderInvoiceId)
                ->delete();

            if (!$deleted) {
                return response()->json(['error' => 'Failed to delete Reorder Invoice'], 404);
            }
            return response()->json(['message' => 'Reorder Invoice deleted successfully'], 200);
        } catch (Exception $err) {
            return response()->json(['error' => 'An error occurred during creating a purchase reorder invoice'], 500);
        }
    }
}
