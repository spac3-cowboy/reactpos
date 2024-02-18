<?php

namespace App\Http\Controllers;

use App\Models\AppSetting;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class AppSettingController extends Controller
{
    //get single app setting
    public function getSingleAppSetting(): JsonResponse
    {
        try {
            $getSingleAppSetting = AppSetting::where('id', 1)->first();

            $currentAppUrl = url('/');
            $getSingleAppSetting->logo = "$currentAppUrl/files/$getSingleAppSetting->logo";

            $converted = arrayKeysToCamelCase($getSingleAppSetting->toArray());
            return response()->json($converted, 200);
        } catch (Exception $error) {
            return response()->json(['error' => 'An error occurred during getting app setting. Please try again later.'], 500);
        }
    }

    //update app setting
    public function updateAppSetting(Request $request): JsonResponse
    {
        try {
            //if logo is not empty then update the logo file. if is empty then update other fields but not replace the logo file.
            if ($request->hasFile('images')) {
                $file_paths = $request->file_paths;
                $appSetting = AppSetting::where('id', 1)->first();
                $appSetting->update([
                    'companyName' => $request->companyName,
                    'tagLine' => $request->tagLine,
                    'address' => $request->address,
                    'phone' => $request->phone,
                    'email' => $request->email,
                    'website' => $request->website,
                    'footer' => $request->footer,
                    'logo' => $file_paths[0],
                ]);
                $converted = arrayKeysToCamelCase($appSetting->toArray());
                return response()->json($converted, 200);
            }

            $appSetting = AppSetting::where('id', 1)->first();
            $appSetting->update($request->all());
            $converted = arrayKeysToCamelCase($appSetting->toArray());
            return response()->json($converted, 200);
        } catch (Exception $error) {
            return response()->json(['error' => 'An error occurred during updating app setting. Please try again later.'], 500);
        }
    }
}
