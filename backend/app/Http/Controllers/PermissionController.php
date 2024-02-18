<?php

namespace App\Http\Controllers;

use App\Models\Permission;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PermissionController extends Controller
{
    //get all permission
    public function getAllPermission(Request $request): JsonResponse
    {
        if ($request->query('query') === 'all') {
            try {
                $allPermissions = Permission::orderBy('id', 'asc')->get();

                $converted = arrayKeysToCamelCase($allPermissions->toArray());
                return response()->json($converted);
            }catch (Exception $error) {
                return response()->json(['error' => 'An error occurred during getting permission. Please try again later.'], 500);
            }
        } else {
            $pagination = getPagination($request->query());
            try {
                $permissions = Permission::orderBy('id', 'asc')
                    ->skip($pagination['skip'])
                    ->take($pagination['limit'])
                    ->get();

                $converted = arrayKeysToCamelCase($permissions->toArray());
                return response()->json($converted, 200);
            } catch (Exception $error) {
                return response()->json(['error' => 'An error occurred during getting permission. Please try again later.'], 500);
            }
        }
    }
}
