<?php

namespace App\Http\Controllers;

use App\Models\Users;
use Illuminate\Http\JsonResponse;
use DateTime;
use Exception;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use Firebase\JWT\JWT;
use App\Models\Role;
use Carbon\Carbon;

class UsersController extends Controller
{
    public function login(Request $request): JsonResponse
    {
        try {
            $allUser = Users::all();
            $users = json_decode($allUser, true);
            global $isValid;
            foreach ($users as $user) {

                $isValid = $user['username'] == $request['username'] && Hash::check($request['password'], $user['password']);

                $permissions = Role::with('RolePermission.permission')
                    ->where('id', $user['roleId'])
                    ->first();

                $permissionNames = $permissions->RolePermission->map(function ($rp) {
                    return $rp->permission->name;
                });
                if ($isValid) {
                    $userType = Role::where('id', $user['roleId'])->first();

                    $token = array(
                        "sub" => $user['id'],
                        "role" => $userType->name,
                        "permissions" => $permissionNames,
                        "exp" => time() + 86400
                    );

                    //create refresh token
                    $refreshToken = array(
                        "sub" => $user['id'],
                        "role" => $userType->name,
                    );

                    $userWithoutPassword = $user;
                    unset($userWithoutPassword['password']);

                    $refreshJwt = JWT::encode($refreshToken, env('JWT_SECRET'), 'HS256');
                    $jwt = JWT::encode($token, env('JWT_SECRET'), 'HS256');

                    Users::where('id', $user['id'])->update([
                        'refreshToken' => $refreshJwt
                    ]);

                    //set the refresh token in the browser cookie
                  //  Cookie::queue('refreshToken', $refreshJwt, 60 * 24 * 30);

                    $userWithoutPassword['role'] = $userType->name;
                    $userWithoutPassword['token'] = $jwt;

                    $converted = arrayKeysToCamelCase($userWithoutPassword);
                    return response()->json($converted, 200);
                }
            }

            return response()->json(['error' => 'Invalid username or password'], 401);
        } catch (Exception $error) {
            return response()->json(['error' => 'An error occurred during create user. Please try again later.'], 500);
        }
    }

    public function register(Request $request): JsonResponse
    {
        try {
            $joinDate = new DateTime($request->input('joinDate'));
            $leaveDate = $request->input('leaveDate') ? new DateTime($request->input('leaveDate')) : null;

            $hash = Hash::make($request->input('password'));

            $createUser = Users::create([
                'username' => $request->input('username'),
                'password' => $hash,
                'roleId' => $request->input('roleId'),
                'email' => $request->input('email'),
                'salary' => (int)$request->input('salary'),
                'joinDate' => $joinDate->format('Y-m-d H:i:s'),
                'leaveDate' => $leaveDate?->format('Y-m-d H:i:s'),
                'idNo' => $request->input('idNo'),
                'phone' => $request->input('phone'),
                'address' => $request->input('address'),
                'bloodGroup' => $request->input('bloodGroup'),
                'image' => $request->input('image'),
                'designationId' => $request->input('designationId'),
            ]);

            $converted = arrayKeysToCamelCase($createUser->toArray());
            return response()->json($converted, 201);
        } catch (Exception $error) {
            echo $error;
            return response()->json(['error' => 'An error occurred during register user. Please try again later.'], 500);
        }
    }

    // get all the user controller method
    public function getAllUser(Request $request): JsonResponse
    {
        if ($request->query('query') === 'all') {
            try {
                $allUser = Users::orderBy('id', "desc")
                    ->with('saleInvoice')
                    ->get();

                $filteredUsers = $allUser->map(function ($u) {
                    return $u->makeHidden('password')->toArray();
                });

                $converted = arrayKeysToCamelCase($filteredUsers->toArray());
                $finalResult = [
                    'getAllUser' => $converted,
                    'totalUser' => count($converted)
                ];

                return response()->json($finalResult, 200);
            } catch (Exception $error) {
                return response()->json(['error' => 'An error occurred during getting user. Please try again later.'], 500);
            }
        } elseif ($request->query('status') === 'false') {
            try {
                $allUser = Users::where('status', "false")
                    ->with('saleInvoice')
                    ->orderBy('id', "desc")
                    ->get();

                $filteredUsers = $allUser->map(function ($u) {
                    return $u->makeHidden('password')->toArray();
                });

                $converted = arrayKeysToCamelCase($filteredUsers->toArray());
                $finalResult = [
                    'getAllUser' => $converted,
                    'totalUser' => Users::where('status', 'false')->count(),
                ];

                return response()->json($finalResult, 200);
            } catch (Exception $error) {
                return response()->json(['error' => 'An error occurred during getting user. Please try again later.'], 500);
            }
        } else {
            try {
                $pagination = getPagination($request->query());
                $allUser = Users::where('status', "true")
                    ->with('saleInvoice')
                    ->skip($pagination['skip'])
                    ->take($pagination['limit'])
                    ->orderBy('id', "desc")
                    ->get();

                $filteredUsers = $allUser->map(function ($u) {
                    return $u->makeHidden('password')->toArray();
                });
                $converted = arrayKeysToCamelCase($filteredUsers->toArray());
                $finalResult = [
                    'getAllUser' => $converted,
                    'totalUser' => Users::where('status', 'true')->count(),
                ];

                return response()->json($finalResult, 200);
            } catch (Exception $error) {
                return response()->json(['error' => 'An error occurred during getting user. Please try again later.'], 500);
            }
        }
    }

    // get a single user controller method
    public function getSingleUser(Request $request): JsonResponse
    {
        try {
            $data = $request->attributes->get("data");

            if ($data['sub'] !== (int)$request['id'] && $data['role'] !== 'admin') {
                return response()->json(['error' => 'Unauthorized'], 401);
            }

            $singleUser = Users::where('id', $request['id'])
                ->with('saleInvoice')
                ->first();

            if (!$singleUser) {
                return response()->json(['error' => 'User not found!'], 404);
            }

            $userWithoutPassword = $singleUser->toArray();
            unset($userWithoutPassword['password']);

            $converted = arrayKeysToCamelCase($userWithoutPassword);
            return response()->json($converted, 200);
        } catch (Exception $err) {
            return response()->json(['message' => $err->getMessage()], 500);
        }
    }

    public function updateSingleUser(Request $request, $id): JsonResponse
    {
        try {

            $joinDate = new DateTime($request->input('joinDate'));
            $leaveDate = $request->input('leaveDate') !== null ? new DateTime($request->input('leaveDate')) : null;

            // Check if joinDate is present in the request data
            if (!$request->has('joinDate')) {
                // If joinDate is not in the request, do not update it in the database
                $user = Users::where('id', $id)->update([
                    'email' => $request->input('email'),
                    'salary' => (int)$request->input('salary'),
                    'leaveDate' => $leaveDate?->format('Y-m-d H:i:s'),
                    'phone' => $request->input('phone'),
                    'address' => $request->input('address'),
                    'bloodGroup' => $request->input('bloodGroup'),
                    'designationId' => $request->input('designationId'),
                ]);
            } else if (!$request->has('joinDate') && !$request->has('leaveDate')) {
                // If joinDate is not in the request, do not update it in the database
                $user = Users::where('id', $id)->update([
                    'email' => $request->input('email'),
                    'salary' => (int)$request->input('salary'),
                    'phone' => $request->input('phone'),
                    'address' => $request->input('address'),
                    'bloodGroup' => $request->input('bloodGroup'),
                    'designationId' => $request->input('designationId'),
                ]);
            } else {
                // If joinDate is in the request, update it in the database
                $user = Users::where('id', $id)->update([
                    'email' => $request->input('email'),
                    'salary' => (int)$request->input('salary'),
                    'joinDate' => $joinDate->format('Y-m-d H:i:s'),
                    'leaveDate' => $leaveDate?->format('Y-m-d H:i:s'),
                    'phone' => $request->input('phone'),
                    'address' => $request->input('address'),
                    'bloodGroup' => $request->input('bloodGroup'),
                    'designationId' => $request->input('designationId'),
                ]);
            }

            if (!$user) {
                return response()->json(['error' => 'Failed To Update user'], 404);
            }

            return response()->json(['message' => 'user updated successfully'], 200);
        } catch (Exception $error) {
            return response()->json(['error' => 'An error occurred during update user. Please try again later.'], 500);
        }
    }

    public function deleteUser(Request $request, $id): JsonResponse
    {
        try {
            //update the status
            $user = Users::findOrFail($id);
            $user->status = $request->input('status');
            $user->save();

            if (!$user) {
                return response()->json(['error' => 'Failed To Delete user'], 404);
            }
            return response()->json(['message' => 'User deleted successfully'], 200);
        } catch (Exception $error) {
            return response()->json(['error' => 'An error occurred during delete user. Please try again later.'], 500);
        }
    }
}
