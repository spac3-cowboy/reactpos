<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductColor;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    //create a single product controller method
    public function createSingleProduct(Request $request): JsonResponse
    {
        if ($request->query('query') === 'deletemany') {
            try {
                $ids = json_decode($request->getContent(), true);
                $deletedProduct = Product::whereIn('id', $ids)->delete();

                $deletedCount = [
                    'count' => $deletedProduct
                ];

                return response()->json($deletedCount, 200);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during delete product.Please try again later.'], 500);
            }
        } elseif ($request->query('query') === 'createmany') {
            try {
                $productData = json_decode($request->getContent(), true);

                //check if product already exists
                $productData = collect($productData)->map(function ($item) {
                    $product = Product::where('name', $item['name'])->first();
                    if ($product) {
                        return null;
                    }
                    return $item;
                })->filter(function ($item) {
                    return $item !== null;
                })->toArray();

                //if all products already exists
                if (count($productData) === 0) {
                    return response()->json(['error' => 'All products already exists.'], 500);
                }

                $createdProduct = collect($productData)->map(function ($item) {
                    return Product::firstOrCreate($item);
                });

                $result = [
                    'count' => count($createdProduct),
                ];

                return response()->json($result, 201);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during create product.Please try again later.'], 500);
            }
        } else {
            try {
                $file_paths = $request->file_paths;

                $createdProduct = Product::create([
                    'name' => $request->input('name'),
                    'productThumbnailImage' => $file_paths[0] ?? null,
                    'productSubCategoryId' => (int)$request->input('productSubCategoryId'),
                    'productBrandId' => (int)$request->input('productBrandId'),
                    'description' => $request->input('description'),
                    'sku' => $request->input('sku') ?? null,
                    'productQuantity' => (int)$request->input('productQuantity'),
                    'productPurchasePrice' => takeUptoThreeDecimal((float)$request->input('productPurchasePrice')),
                    'productSalePrice' => takeUptoThreeDecimal((float)$request->input('productSalePrice')),
                    'unitType' => $request->input('unitType'),
                    'unitMeasurement' => takeUptoThreeDecimal((float)$request->input('unitMeasurement')) ?? null,
                    'reorderQuantity' => (int)$request->input('reorderQuantity') ?? null,
                    'status' => $request->input('status'),
                    'productVat' => takeUptoThreeDecimal((float)$request->input('productVat')) ?? null,
                ]);


                if ($createdProduct && $request->input('productSubCategoryId')) {
                    $createdProduct->load('productSubCategory');
                }

                if ($createdProduct && $request->input('productBrandId')) {
                    $createdProduct->load('productBrand');
                }


                // add color code against createdProduct Id
                $colors = $request->input('colors');
                $colorsArray = explode(',', $colors);

                if ($createdProduct && $colors) {
                    foreach ($colorsArray as $item) {
                        ProductColor::create([
                            'productId' => $createdProduct->id,
                            'colorId' => $item,
                        ]);
                    }
                }

                $currentAppUrl = url('/');
                if ($createdProduct) {
                    $createdProduct->productThumbnailImageUrl = "{$currentAppUrl}/product-image/{$createdProduct->productThumbnailImage}";
                }

                $converted = arrayKeysToCamelCase($createdProduct->toArray());
                return response()->json($converted, 201);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during create product.Please try again later.'], 500);
            }
        }
    }

    // get all the product controller method
    public function getAllProduct(Request $request): JsonResponse
    {
        if ($request->query('query') === 'all') {
            try {
                $getAllProduct = Product::orderBy('id', 'desc')
                    ->with('productSubCategory', 'productBrand', 'reviewRating', 'reviewRating.customer:id,name')
                    ->get();

                collect($getAllProduct)->map(function ($product) {
                    $totalCount = count($product->reviewRating);

                    if (count($product->reviewRating) > 0) {
                        $product->totalRating = $product->reviewRating->reduce(function ($acc, $curr) {
                            return ($acc + $curr->rating);
                        }, 0) / $totalCount;
                    } else {
                        $product->totalRating = 0;
                    }
                    return $product;
                });

                $currentAppUrl = url('/');
                collect($getAllProduct)->map(function ($product) use ($currentAppUrl) {
                    if ($product->productThumbnailImage) {
                        $product->productThumbnailImageUrl = "{$currentAppUrl}/product-image/{$product->productThumbnailImage}";
                    }
                    return $product;
                });

                $converted = arrayKeysToCamelCase($getAllProduct->toArray());
                return response()->json($converted, 200);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during getting product.Please try again later.'], 500);
            }
        } elseif ($request->query('query') === 'info') {
            try {
                $aggregation = Product::where('status', 'true')
                    ->count();

                $result = [
                    '_count' => [
                        'id' => $aggregation,
                    ],
                ];

                return response()->json($result, 200);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during getting product.Please try again later.'], 500);
            }
        } elseif ($request->query('query') === 'search') {
            try {
                $getAllProduct = Product::orWhere('name', 'LIKE', '%' . $request->query('key') . '%')
                    ->orWhere('sku', 'LIKE', '%' . $request->query('key') . '%')
                    ->with('productSubCategory', 'productColor.color')
                    ->orderBy('id', 'desc')
                    ->get();

                // remove productPurchasePrice
                $getAllProduct->map(function ($item) {
                    unset($item->productPurchasePrice);
                });

                collect($getAllProduct)->map(function ($product) {
                    $totalCount = count($product->reviewRating);

                    if (count($product->reviewRating) > 0) {
                        $product->totalRating = $product->reviewRating->reduce(function ($acc, $curr) {
                            return ($acc + $curr->rating);
                        }, 0) / $totalCount;
                    } else {
                        $product->totalRating = 0;
                    }
                    return $product;
                });

                $currentAppUrl = url('/');
                collect($getAllProduct)->map(function ($product) use ($currentAppUrl) {
                    if ($product->productThumbnailImage) {
                        $product->productThumbnailImageUrl = "{$currentAppUrl}/product-image/{$product->productThumbnailImage}";
                    }
                    return $product;
                });

                $converted = arrayKeysToCamelCase($getAllProduct->toArray());
                return response()->json($converted, 200);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during getting product.Please try again later.'], 500);
            }
        } elseif ($request->query('status')) {
            try {
                $pagination = getPagination($request->query());
                $getAllProduct = Product::orderBy('id', 'desc')
                    ->where('status', $request->query("status"))
                    ->with('productSubCategory', 'productBrand', 'productColor.color')
                    ->skip($pagination['skip'])
                    ->take($pagination['limit'])
                    ->get();

                collect($getAllProduct)->map(function ($product) {
                    $totalCount = count($product->reviewRating);

                    if (count($product->reviewRating) > 0) {
                        $product->totalRating = $product->reviewRating->reduce(function ($acc, $curr) {
                            return ($acc + $curr->rating);
                        }, 0) / $totalCount;
                    } else {
                        $product->totalRating = 0;
                    }
                    return $product;
                });

                $currentAppUrl = url('/');
                collect($getAllProduct)->map(function ($product) use ($currentAppUrl) {
                    if ($product->productThumbnailImage) {
                        $product->productThumbnailImageUrl = "{$currentAppUrl}/product-image/{$product->productThumbnailImage}";
                    }
                    return $product;
                });

                $converted = arrayKeysToCamelCase($getAllProduct->toArray());
                $finalResult = [
                    'getAllProduct' => $converted,
                    'totalProduct' => Product::where('status', $request->query('status'))->count(),
                ];

                return response()->json($finalResult, 200);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during getting product.Please try again later.'], 500);
            }
        } else {
            try {
                $pagination = getPagination($request->query());
                $getAllProduct = Product::orderBy('id', 'desc')
                    ->where('status', 'true')
                    ->with('productSubCategory', 'productBrand', 'productColor.color')
                    ->skip($pagination['skip'])
                    ->take($pagination['limit'])
                    ->get();

                collect($getAllProduct)->map(function ($product) {
                    $totalCount = count($product->reviewRating);

                    if (count($product->reviewRating) > 0) {
                        $product->totalRating = $product->reviewRating->reduce(function ($acc, $curr) {
                            return ($acc + $curr->rating);
                        }, 0) / $totalCount;
                    } else {
                        $product->totalRating = 0;
                    }
                    return $product;
                });

                $currentAppUrl = url('/');
                collect($getAllProduct)->map(function ($product) use ($currentAppUrl) {
                    if ($product->productThumbnailImage) {
                        $product->productThumbnailImageUrl = "{$currentAppUrl}/product-image/{$product->productThumbnailImage}";
                    }
                    return $product;
                });

                $converted = arrayKeysToCamelCase($getAllProduct->toArray());
                $finalResult = [
                    'getAllProduct' => $converted,
                    'totalProduct' => Product::where('status', 'true')->count(),
                ];

                return response()->json($finalResult, 200);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during getting product.Please try again later.'], 500);
            }
        }
    }

    // get a single singleProduct controller method
    public function getSingleProduct($id): JsonResponse
    {
        try {
            $singleProduct = Product::where('id', (int)$id)
                ->with('productColor.color', 'reviewRating', 'productSubCategory.productCategory', 'productBrand')
                ->first();

            $currentAppUrl = url('/');
            if ($singleProduct->productThumbnailImage) {
                $singleProduct->productThumbnailImageUrl = "{$currentAppUrl}/product-image/{$singleProduct->productThumbnailImage}";
            }

            if (!$singleProduct) {
                return response()->json(['error' => 'product not found!'], 404);
            }
            $converted = arrayKeysToCamelCase($singleProduct->toArray());
            return response()->json($converted, 200);
        } catch (Exception $err) {
            return response()->json(['error' => 'An error occurred during getting product.Please try again later.'], 500);
        }
    }

    // update a single product controller method
    public function updateSingleProduct(Request $request, $id): JsonResponse
    {
        try {
            if ($request->hasFile('images')) {
                $file_paths = $request->file_paths;

                $product = Product::where('id', $id)->update([
                    'name' => $request->input('name'),
                    'productThumbnailImage' => $file_paths[0],
                    'productSubCategoryId' => (int)$request->input('productSubCategoryId'),
                    'productBrandId' => (int)$request->input('productBrandId'),
                    'description' => $request->input('description'),
                    'sku' => $request->input('sku'),
                    'productQuantity' => (int)$request->input('productQuantity'),
                    'productPurchasePrice' => takeUptoThreeDecimal((float)$request->input('productPurchasePrice')),
                    'productSalePrice' => takeUptoThreeDecimal((float)$request->input('productSalePrice')),
                    'unitType' => $request->input('unitType'),
                    'unitMeasurement' => takeUptoThreeDecimal((float)$request->input('unitMeasurement')) ?? null,
                    'reorderQuantity' => (int)$request->input('reorderQuantity') ?? null,
                    'productVat' => takeUptoThreeDecimal((float)$request->input('productVat')) ?? null,
                ]);

                if (!$product) {
                    return response()->json(['error' => 'Failed To Updated Product'], 404);
                }

                // add color code against createdProduct Id
                $colors = $request->input('colors');
                $colorsArray = explode(',', $colors);
                if ($product && $colors) {
                    ProductColor::where('productId', $id)->delete();
                    foreach ($colorsArray as $item) {
                        ProductColor::create([
                            'productId' => $id,
                            'colorId' => $item,
                        ]);
                    }
                }
                return response()->json(['message' => 'Product updated Successfully'], 200);
            }

            $product = Product::where('id', $id)->first();
            $product->update($request->all());

            if (!$product) {
                return response()->json(['error' => 'Failed To Updated Product'], 404);
            }
            // add color code against createdProduct Id
            $colors = $request->input('colors');
            $colorsArray = explode(',', $colors);
            if ($product && $colors) {
                ProductColor::where('productId', $id)->delete();
                foreach ($colorsArray as $item) {
                    ProductColor::create([
                        'productId' => $id,
                        'colorId' => $item,
                    ]);
                }
            }
            return response()->json(['message' => 'Product updated Successfully'], 200);
        } catch (Exception $err) {
            return response()->json(['error' => 'An error occurred during updated product.Please try again later.'], 500);
        }
    }


    // delete a single product controller method
    public function deleteSingleProduct(Request $request, $id): JsonResponse
    {
        try {
            $deletedProduct = Product::where('id', (int)$id)
                ->update([
                    'status' => $request->input('status'),
                ]);

            if (!$deletedProduct) {
                return response()->json(['error' => 'Failed To Delete Product'], 404);
            }
            return response()->json(['message' => 'Product deleted Successfully'], 200);
        } catch (Exception $err) {
            return response()->json(['error' => 'An error occurred during delete product.Please try again later.'], 500);
        }
    }
}
