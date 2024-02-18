<?php

namespace App\Http\Controllers;
//
use Illuminate\Http\Request;
use Illuminate\Http\jsonResponse;
use Exception;
use Illuminate\Support\Str;
use App\Models\Designation;
use App\Models\Users;

class DesignationController extends Controller
{
    // create designation controller method
    public function createSingleDesignation(Request $request): jsonResponse
    {
        if ($request->query('query') === 'deletemany') {
            try {
                // delete many Designation at once
                $data = json_decode($request->getContent(), true);
                $deletedDesignation = Designation::destroy($data);

                $deletedCounted = [
                    'count' => $deletedDesignation,
                ];

                return response()->json($deletedCounted, 200);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during getting $designations. Please try again later.'], 500);
            }
        } else if ($request->query('query') === 'createmany') {
            try {
                $designations = json_decode($request->getContent(), true);
                $createdDesignation = collect($designations)->map(function ($designation) {
                    return Designation::create([
                        'name' => $designation['name'],
                    ]);
                });

                return response()->json(['count' => count($createdDesignation)], 201);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during creating $designations. Please try again later.'], 500);
            }
        } else {
            try {
                $createdDesignation = Designation::create([
                    'name' => $request->input('name'),
                ]);

                $converted = arrayKeysToCamelCase($createdDesignation->toArray());
                return response()->json($converted, 201);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during creating $designations. Please try again later.'], 500);
            }
        }
    }

    // get all the designation controller method
    public function getAllDesignation(Request $request): jsonResponse
    {
        if ($request->query('query') === 'all') {
            try {
                $allDesignation = Designation::orderBy('id', 'asc')
                    ->where('status', "true")
                    ->with('user.role', 'user.designation')
                    ->get();

                collect($allDesignation)->each(function ($item) {
                    collect($item->user)->each(function ($x) {
                        unset($x->password);
                    });
                });

                $converted = arrayKeysToCamelCase($allDesignation->toArray());
                $finalResult = [
                    'getAllDesignation' => $converted,
                    'totalDesignation' => Designation::where('status', 'true')
                        ->count()
                ];

                return response()->json($finalResult, 200);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during getting $designations. Please try again later.'], 500);
            }
        } else if ($request->query('query') === 'info') {
            try {
                $aggregations = [
                    '_count' => [
                        'id' => Designation::where('status', 'true')
                            ->count()
                    ],
                ];

                return response()->json($aggregations, 200);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during getting $designations. Please try again later.'], 500);
            }
        } else if ($request->query('status')) {
            try {
                $allDesignation = Designation::orderBy('id', 'asc')
                    ->where('status', $request->query('status'))
                    ->with('user.role', 'user.designation')
                    ->get();

                collect($allDesignation)->each(function ($item) {
                    collect($item->user)->each(function ($x) {
                        unset($x->password);
                    });
                });

                $converted = arrayKeysToCamelCase($allDesignation->toArray());
                $finalResult = [
                    'getAllDesignation' => $converted,
                    'totalDesignation' => Designation::where('status', $request->query('status'))
                        ->count()
                ];

                return response()->json($finalResult, 200);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during getting $designations. Please try again later.'], 500);
            }
        } else if ($request->query()) {
            $pagination = getPagination($request->query());
            try {
                $allDesignation = Designation::orderBy('id', 'asc')
                    ->where('status', 'true')
                    ->with('user.role', 'user.designation')
                    ->skip($pagination['skip'])
                    ->take($pagination['limit'])
                    ->get();

                collect($allDesignation)->each(function ($item) {
                    collect($item->user)->each(function ($x) {
                        unset($x->password);
                    });
                });

                $converted = arrayKeysToCamelCase($allDesignation->toArray());
                $finalResult = [
                    'getAllDesignation' => $converted,
                    'totalDesignation' => Designation::where('status', 'true')
                        ->count()
                ];

                return response()->json($finalResult, 200);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during getting $designations. Please try again later.'], 500);
            }
        } else {
            return response()->json(['error' => 'Invalid Query'], 400);
        }
    }

    // get a single designation controller method
    public function getSingleDesignation(Request $request, $id): jsonResponse
    {
        try {
            $singleDesignation = Designation::where('id', (int) $id)
                ->with('user.role', 'user.designation')
                ->first();

            collect($singleDesignation->user)->each(function ($x) {
                unset($x->password);
            });


            $converted = arrayKeysToCamelCase($singleDesignation->toArray());
            return response()->json($converted, 200);
        } catch (Exception $err) {
            return response()->json(['error' => 'An error occurred during getting single $designations. Please try again later.'], 500);
        }
    }

    // update a designation controller method
    public function updateSingleDesignation(Request $request, $id): jsonResponse
    {
        try {
            $updatedDesignation = Designation::where('id', $id)->update($request->all());

            if (!$updatedDesignation) {
                return response()->json(['error' => 'Failed To Update Designation'], 404);
            }
            return response()->json(['message' => 'Designation updated successfully'], 200);
        } catch (Exception $err) {
            return response()->json(['error' => 'An error occurred during update $designations. Please try again later.'], 500);
        }
    }

    // delete a designation controller method
    public function deleteSingleDesignation(Request $request, $id): jsonResponse
    {
        try {
            $deletedDesignation = Designation::where('id', $id)->update([
                'status' => $request->input('status'),
            ]);

            if ($deletedDesignation) {
                return response()->json(['message' => 'Designation Deleted Successfully'], 200);
            } else {
                return response()->json(['error' => 'Failed To Delete Designation'], 404);
            }
        } catch (Exception $err) {
            return response()->json(['error' => 'An error occurred during delete $designations. Please try again later.'], 500);
        }
    }
}
