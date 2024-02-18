<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PurchaseOrderCreationController extends Controller
{
    //get purchase order creation list
    public function getPurchaseOrderCreation(Request $request): JsonResponse
    {
        try {
            if ($request->query()) {
                $pagination = getPagination($request->query());
                $allProduct = Product::whereColumn('productQuantity', '<=', 'reorderQuantity')
                    ->skip($pagination['skip'])
                    ->take($pagination['limit'])
                    ->get();

                $converted = arrayKeysToCamelCase($allProduct->toArray());


                $aggregation = [
                    'getAllReOderList' => $converted,
                    '_count' =>
                        Product::whereColumn('productQuantity', '<=', 'reorderQuantity')
                            ->selectRaw('COUNT(id) as id')
                            ->first()
                    ,
                ];

                return response()->json($aggregation, 200);
            }else{
                return response()->json(['error'=>'Invalid query'], 400);
            }
        } catch (Exception $err) {
            return response()->json(['error' => 'An error occurred during getting the list of purchase order creation'], 500);
        }
    }
}
