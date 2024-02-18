<?php

namespace App\Http\Controllers;

use App\Models\AdjustInvoice;
use App\Models\AdjustInvoiceProduct;
use App\Models\Product;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdjustInventoryController extends Controller
{
    //create adjust inventory
    public function createAdjustInventory(Request $request): JsonResponse
    {
        try {
            $data = json_decode($request->getContent(), true);
            $date = Carbon::parse($data['date']);
            $adjustInvoiceProduct = $data['adjustInvoiceProduct'];

            $createdInvoice = AdjustInvoice::create([
                'date' => $date,
                'userId' => $request->input('userId'),
                'note' => $request->input('note'),
            ]);

            if ($createdInvoice) {
                foreach ($adjustInvoiceProduct as $productData) {
                    AdjustInvoiceProduct::create([
                        'adjustInvoiceId' => $createdInvoice->id,
                        'productId' => $productData['productId'],
                        'adjustQuantity' => $productData['adjustQuantity'],
                        'adjustType' => $productData['adjustType'],
                    ]);

                    $product = Product::find($productData['productId']);
                    if ($product) {
                        if ($productData['adjustType'] === 'increment') {
                            $product->productQuantity += $productData['adjustQuantity'];
                        } elseif ($productData['adjustType'] === 'decrement') {
                            $product->productQuantity -= $productData['adjustQuantity'];
                        }
                        $product->save();
                    }
                }
            }

            $converted = arrayKeysToCamelCase($createdInvoice->toArray());
            return response()->json($converted, 201);
        } catch (Exception $err) {
            echo $err;
            return response()->json(['message' => 'An error occurred during adjust invoice. Please try again later.'], 500);
        }
    }

    //get all adjust invoices
    public function getAllAdjustInvoices(Request $request): JsonResponse
    {
        try {
            if ($request->query('query') === "search") {
                try {
                    $startDate = Carbon::parse($request->query('startdate'));
                    $endDate = Carbon::parse($request->query('enddate'));
                    $adjustInvoices = AdjustInvoice::whereBetween('date', [$startDate, $endDate])->orWhere('userId', $request->query('key'))->orderBy('id', 'desc')->get();
                    $converted = arrayKeysToCamelCase($adjustInvoices->toArray());
                    return response()->json(["adjustInvoice" => $converted], 200);
                } catch (Exception $err) {
                    return response()->json(['message' => 'An error occurred during fetching adjust invoices. Please try again later.'], 500);
                }
            } else if ($request->query()) {
                try {
                    $pagination = getPagination($request->query());
                    $startDate = Carbon::parse($request->query('startdate'));
                    $endDate = Carbon::parse($request->query('enddate'));

                    $adjustInvoices = AdjustInvoice::orderBy('id', 'desc')->whereBetween('date', [$startDate, $endDate])
                        ->skip($pagination['skip'])
                        ->take($pagination['limit'])
                        ->get();

                    //aggregate total
                    $totalAdjustInvoices = AdjustInvoice::orderBy('id', 'desc')->get();
                    $converted = arrayKeysToCamelCase($adjustInvoices->toArray());
                    $aggregation = [
                        'getAllAdjustInvoice' => $converted,
                        '_count' => [
                            'id' => count($totalAdjustInvoices)
                        ],
                    ];

                    return response()->json($aggregation, 200);
                } catch (Exception $err) {
                    return response()->json(['message' => 'An error occurred during fetching adjust invoices. Please try again later.'], 500);
                }
            } else {
                return response()->json(["message" => "Invalid Query"], 400);
            }
        } catch (Exception $err) {
            return response()->json(['message' => 'An error occurred during fetching adjust invoices. Please try again later.'], 500);
        }
    }

    public function getSingleAdjustInvoice(Request $request, $id): JsonResponse
    {
        try {
            $adjustInvoice = AdjustInvoice::where('id', $id)->with('user:id,username', 'adjustInvoiceProduct.product')->first();
            $converted = arrayKeysToCamelCase($adjustInvoice->toArray());
            return response()->json(["adjustInvoice" => $converted], 200);
        } catch (Exception $err) {
            return response()->json(['message' => 'An error occurred during fetching adjust invoice. Please try again later.'], 500);
        }
    }
}
