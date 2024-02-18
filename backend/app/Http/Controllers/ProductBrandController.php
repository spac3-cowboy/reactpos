<?php

namespace App\Http\Controllers;

use App\Models\ProductBrand;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProductBrandController extends Controller
{
    //create single productBrand controller method
    public function createSingleProductBrand(Request $request): JsonResponse
    {
        if ($request->query('query') === 'deletemany') {
            try {
                $ids = json_decode($request->getContent(), true);
                $deletedProductBrand = ProductBrand::destroy($ids);

                $deletedCount = [
                    'count' => $deletedProductBrand
                ];

                return response()->json($deletedCount, 200);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during create productBrand. Please try again later.'], 500);
            }
        } elseif ($request->query('query') === 'createmany') {
            try {
                $brandData = json_decode($request->getContent(), true);

                $createdProductBrand = collect($brandData)->map(function ($item) {
                    return ProductBrand::firstOrCreate([
                        'name' => $item['name'],
                    ]);
                });

                $result = [
                    'count' => count($createdProductBrand),
                ];

                return response()->json($result, 201);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during create productBrand. Please try again later.'], 500);
            }
        } else {
            try {
                $brandData = json_decode($request->getContent(), true);

                $createdProductBrand = ProductBrand::create([
                    'name' => $brandData['name'],
                ]);

                $converted = arrayKeysToCamelCase($createdProductBrand->toArray());
                return response()->json($converted, 201);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during create productBrand. Please try again later.'], 500);
            }
        }
    }

    // get all productBrand controller method 
    public function getAllProductBrand(Request $request): JsonResponse
    {
        if ($request->query('query') === 'all') {
            try {
                $getAllProductBrand = ProductBrand::orderBy('id', 'asc')
                    ->with('product')
                    ->get();

                $converted = arrayKeysToCamelCase($getAllProductBrand->toArray());
                return response()->json($converted, 200);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during getting productBrand. Please try again later.'], 500);
            }
        } elseif ($request->query('query') === 'search') {
            try {
                $getAllProductBrand = ProductBrand::where('name', 'LIKE', '%' . $request->query('key') . '%')
                    ->with('product')
                    ->orderBy('id', 'desc')
                    ->get();

                $converted = arrayKeysToCamelCase($getAllProductBrand->toArray());
                return response()->json($converted, 200);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during getting productBrand. Please try again later.'], 500);
            }
        } elseif ($request->query('status')) {
            try {
                $pagination = getPagination($request->query());
                $getAllProductBrand = ProductBrand::orderBy('id', 'asc')
                    ->where('status', $request->query("status"))
                    ->with('product')
                    ->skip($pagination['skip'])
                    ->take($pagination['limit'])
                    ->get();

                $converted = arrayKeysToCamelCase($getAllProductBrand->toArray());
                $finalResult = [
                    'getAllProductBrand' => $converted,
                    'totalProductBrand' => ProductBrand::where('status', $request->query('status'))->count(),
                ];

                return response()->json($finalResult, 200);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during getting productBrand. Please try again later.'], 500);
            }
        } else {
            try {
                $pagination = getPagination($request->query());
                $getAllProductBrand = ProductBrand::orderBy('id', 'asc')
                    ->where('status', 'true')
                    ->with('product')
                    ->skip($pagination['skip'])
                    ->take($pagination['limit'])
                    ->get();

                $converted = arrayKeysToCamelCase($getAllProductBrand->toArray());
                $finalResult = [
                    'getAllProductBrand' => $converted,
                    'totalProductBrand' => ProductBrand::where('status', 'true')->count(),
                ];

                return response()->json($finalResult, 200);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during getting productBrand. Please try again later.'], 500);
            }
        }
    }

    // get a single productBrand controller method
    // TODO: need to modify imageUrl
    public function getSingleProductBrand(Request $request, $id): JsonResponse
    {
        try {
            $singleProductBrand = ProductBrand::where('id', (int) $id)
                ->with('product')
                ->first();

            $converted = arrayKeysToCamelCase($singleProductBrand->toArray());
            return response()->json($converted, 200);
        } catch (Exception $err) {
            return response()->json(['error' => 'An error occurred during getting productBrand. Please try again later.'], 500);
        }
    }

    // update a single productCategory controller method
    public function updateSingleProductBrand(Request $request, $id): JsonResponse
    {
        try {
            $updatedProductBrand = ProductBrand::where('id', (int) $id)
                ->update($request->all());

            if (!$updatedProductBrand) {
                return response()->json(['error' => 'Failed To Update Product Brand'], 404);
            }
            return response()->json(['message' => 'Product Brand updated Successfully'], 200);
        } catch (Exception $err) {
            return response()->json(['error' => 'An error occurred during update productBrand. Please try again later.'], 500);
        }
    }

    // delete a single productCategory controller method
    public function deleteSingleProductBrand(Request $request, $id): JsonResponse
    {
        try {
            $deletedProductBrand = ProductBrand::where('id', (int) $id)
                ->update([
                    'status' => $request->input('status'),
                ]);

            if (!$deletedProductBrand) {
                return response()->json(['error' => 'Failed To Delete Product Brand'], 404);
            }
            return response()->json(['message' => 'Product Brand deleted Successfully'], 200);
        } catch (Exception $err) {
            return response()->json(['error' => 'An error occurred during delete productBrand. Please try again later.'], 500);
        }
    }
}
