<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Exception;
use App\Models\RolePermission;
use Illuminate\Support\Str;

class RolePermissionController extends Controller
{
    //create a rolePermission controller method
    public function createRolePermission(Request $request): jsonResponse
    {
        if ($request->query('query') === 'deletemany') {
            try {
                // delete many role permission at once
                $data = json_decode($request->getContent(), true);
                $deletedRolePermission = RolePermission::destroy($data);

                return response()->json(['count' => $deletedRolePermission], 200);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during create RolePermission. Please try again later.'], 500);
            }
        } else {
            try {
                $permissions = $request->json('permissionId');
                $roleId = $request->json('roleId');
                $createdRolePermission = collect($permissions)->map(function ($permissionId) use ($roleId) {
                    return RolePermission::firstOrCreate([
                        'roleId' => (int)$roleId,
                        'permissionId' => (int)$permissionId,
                    ]);
                });

                return response()->json(['count' => count($createdRolePermission)], 201);
            } catch (Exception $err) {
                return response()->json(['error' => 'An error occurred during create RolePermission. Please try again later.'], 500);
            }
        }
    }

    // delete a single rolePermission controller method
    public function deleteSingleRolePermission(Request $request, $id): jsonResponse
    {
        try {
            $deletedRolePermission = RolePermission::where('id', (int)$id)->delete();

            if ($deletedRolePermission) {
                return response()->json(['message' => 'RolePermission Deleted Successfully'], 200);
            } else {
                return response()->json(['error' => 'Failed To Delete RolePermission'], 404);
            }
        } catch (Exception $err) {
            return response()->json(['error' => 'An error occurred during delete RolePermission. Please try again later.'], 500);
        }
    }
}
