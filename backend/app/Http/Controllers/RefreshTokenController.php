<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\Users;
use Exception;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class RefreshTokenController extends Controller
{
    public function validationRefreshToken(Request $request): JsonResponse
    {
        try {
            //get the refresh token from the body
            $refreshToken = $request->input('refreshToken');
            //check if the refresh token is null
            if (!$refreshToken) {
                throw new Exception('Refresh token not found');
            }

            //decode the refresh token and get the payload
            $secret = env('JWT_SECRET');
            $refreshTokenDecoded = JWT::decode($refreshToken, new Key($secret, 'HS256'));

            //it exists on the database
            $user = Users::where('id', $refreshTokenDecoded->sub)->first();

            //check if the user exists
            if (!$user) {
                return response()->json([
                    'error' => 'Forbidden',
                ], 403);
            }

            //check if the refresh token is the same
            if ($user->refreshToken !== $refreshToken) {
                return response()->json([
                    'error' => 'Forbidden',
                ], 403);
            }

            //check the refresh token expiration date
            if (time() > $refreshTokenDecoded->exp) {
                return response()->json([
                    'error' => 'Forbidden',
                ], 403);
            }

            //create a new token
            $userType = Role::where('id', $user['roleId'])->first();
            $permissions = Role::with('RolePermission.permission')
                ->where('id', $user['roleId'])
                ->first();
            $permissionNames = $permissions->RolePermission->map(function ($rp) {
                return $rp->permission->name;
            });

            $token = array(
                "sub" => $user['id'],
                "role" => $userType->name,
                "permissions" => $permissionNames,
                "exp" => time() + 86400
            );

            //create refresh token
            $refreshToken = array(
                "sub" => $user['id'],
                "exp" => time() + 86400 * 30
            );

            $refreshJwt = JWT::encode($refreshToken, env('JWT_SECRET'), 'HS256');
            $jwt = JWT::encode($token, env('JWT_SECRET'), 'HS256');

            Users::where('id', $user['id'])->update([
                'refreshToken' => $refreshJwt
            ]);

            $user->refreshToken = $refreshJwt;
            $user->save();

            return response()->json([
                'token' => $jwt,
                'refreshToken' => $refreshJwt,
                'user' => $user,
            ], 200);


        } catch (Exception $exception) {
            return response()->json([
                'message' => $exception->getMessage(),
            ], 500);
        }
    }
}
