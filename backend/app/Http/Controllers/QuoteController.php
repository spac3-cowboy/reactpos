<?php

namespace App\Http\Controllers;

use App\Models\Quote;
use App\Models\QuoteProduct;
use DateTime;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class QuoteController extends Controller
{
    //create quote
    public function createQuote(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if ($request->query('query') === 'deletemany') {
            try {
                $deleteMany = Quote::destroy($data);
                return response()->json(["count" => $deleteMany], 200);
            } catch (Exception $e) {
                return response()->json(['error' => 'An error occurred during deleting the quote'], 500);
            }
        } else if ($request->query('query') === 'createmany') {
            try {
                //check if product already exists
                $quoteData = collect($data)->map(function ($item) {
                    $quoteData = Quote::where('name', $item['name'])->first();
                    if ($quoteData) {
                        return null;
                    }
                    return $item;
                })->filter(function ($item) {
                    return $item !== null;
                })->toArray();

                //if all products already exists
                if (count($quoteData) === 0) {
                    return response()->json(['error' => 'All Quote already exists.'], 500);
                }

                foreach ($data as $item) {
                    Quote::insertOrIgnore($item);
                }
                return response()->json(["count" => count(json_decode($data))], 200);
            } catch (Exception $e) {
                return response()->json(['error' => 'An error occurred during creating the quote'], 500);
            }
        } else {
            try {
                //calculate the total amount
                $quoteProduct = $request->input('quoteProduct');
                $totalAmount = 0;
                foreach ($quoteProduct as $item) {
                    $totalAmount += $item['productQuantity'] * $item['unitPrice'];
                }


                //quote date
                $quoteDate = new DateTime($request->input('quoteDate'));
                $expirationDate = new DateTime($request->input('expirationDate'));


                $createdQuote = Quote::create([
                    'quoteOwnerId' => $request->input('quoteOwnerId'),
                    'quoteName' => $request->input('quoteName'),
                    'quoteDate' => $quoteDate,
                    'expirationDate' => $expirationDate,
                    'termsAndConditions' => $request->input('termsAndConditions'),
                    'description' => $request->input('description'),
                    'discount' => $request->input('discount'),
                    'totalAmount' => $totalAmount - $request->input('discount'),
                ]);

                //create quoteProduct
                $quoteProduct = $request->input('quoteProduct');
                foreach ($quoteProduct as $item) {
                    QuoteProduct::create([
                        'quoteId' => $createdQuote->id,
                        'productId' => $item['productId'],
                        'productQuantity' => $item['productQuantity'],
                        'unitPrice' => $item['unitPrice'],
                    ]);
                }

                $converted = arrayKeysToCamelCase($createdQuote->toArray());
                return response()->json($converted, 200);
            } catch (Exception $e) {
                return response()->json(['error' => 'An error occurred during creating the quote'], 500);
            }
        }
    }

    //get all quote
    public function getAllQuote(Request $request): JsonResponse
    {

        if ($request->query('query') === 'search') {
            try {
                $pagination = getPagination($request->query());
                $getAllQuote = Quote::with('quoteOwner:id,username')
                    ->where("quoteName", "LIKE", "%{$request['key']}%")
                    ->orderBy('id', 'desc')
                    ->skip($pagination['skip'])
                    ->take($pagination['limit'])
                    ->get();

                $aggregate = Quote::all();
                $converted = arrayKeysToCamelCase($getAllQuote->toArray());
                $finalResult = [
                    'getAllQuote' => $converted,
                    'totalQuoteCount' => [
                        '_count' => [
                            'id' => count($aggregate),
                        ],
                    ],
                ];

                return response()->json($finalResult, 200);
            } catch (Exception $e) {
                return response()->json(['error' => 'An error occurred during retrieving the quote'], 500);
            }

        } else if ($request->query()) {
            try {
                $pagination = getPagination($request->query());
                $quote = Quote::with('quoteOwner:id,username')
                    ->orderBy('id', 'desc')
                    ->where('status', $request->query('status'))
                    ->skip($pagination['skip'])
                    ->take($pagination['limit'])
                    ->get();

                $converted = arrayKeysToCamelCase($quote->toArray());
                return response()->json($converted, 200);
            } catch (Exception $e) {
                return response()->json(['error' => 'An error occurred during retrieving the quote'], 500);
            }
        } else {
            return response()->json(['message' => 'invalid query'], 500);
        }
    }

    //get single quote
    public function getSingleQuote(Request $request, $id): JsonResponse
    {
        try {
            $quote = Quote::where('id', $id)
                ->with('quoteOwner:id,username', 'quoteProduct.product')
                ->first();
            if (!$quote) {
                return response()->json(['message' => 'Quote not found'], 404);
            }
            $converted = arrayKeysToCamelCase($quote->toArray());
            return response()->json($converted, 200);
        } catch (Exception $e) {
            return response()->json(['error' => 'An error occurred during retrieving the quote'], 500);
        }
    }

    //update quote
    public function updateQuote(Request $request, $id): JsonResponse
    {
        try {
            $quote = Quote::findOrFail($id);
            $quote->update($request->all());
            if (!$quote) {
                return response()->json(['message' => 'Quote not updated'], 404);
            }
            $converted = arrayKeysToCamelCase($quote->toArray());
            return response()->json($converted, 200);
        } catch (Exception $e) {
            return response()->json(['error' => 'An error occurred during creating a purchase reorder invoice'], 500);
        }
    }

    //delete quote
    public function deleteQuote(Request $request, $id): JsonResponse
    {
        try {
            $deletedQuote = Quote::where('id', $id)->update([
                'status' => $request->input('status'),
            ]);
            if (!$deletedQuote) {
                return response()->json(['message' => 'Quote not updated'], 404);
            }
            return response()->json(['message' => 'Quote Deleted Successfully'], 200);
        } catch (Exception $e) {
            return response()->json(['error' => 'An error occurred during deleting the quote'], 500);

        }
    }

}
