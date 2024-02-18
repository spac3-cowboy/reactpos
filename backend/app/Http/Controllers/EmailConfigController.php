<?php

namespace App\Http\Controllers;
//
use App\Models\EmailConfig;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class EmailConfigController extends Controller
{
    //create email config
    public function createEmailConfig(Request $request): JsonResponse
    {
        try {
            $emailConfig = EmailConfig::create([
                'emailConfigName' => $request->input("emailConfigName"),
                'emailHost' => $request->input("emailHost"),
                'emailPort' => $request->input("emailPort"),
                'emailUser' => $request->input("emailUser"),
                'emailPass' => $request->input("emailPass"),
            ]);

            $converted = arrayKeysToCamelCase($emailConfig->toArray());
            return response()->json($converted);
        } catch (Exception $err) {
            return response()->json(['error' => 'An error occurred during create email config. Please try again later.'], 500);
        }
    }

    //get all email config
    public function getAllEmailConfig(): JsonResponse
    {
        try {
            $emailConfig = EmailConfig::all();

            $converted = arrayKeysToCamelCase($emailConfig->toArray());
            return response()->json($converted);
        } catch (Exception $err) {
            return response()->json(['error' => 'An error occurred during get email config. Please try again later.'], 500);
        }
    }

    //getSingle email config
    public function getSingleEmailConfig($id): JsonResponse
    {
        try {
            $emailConfig = EmailConfig::find($id);

            $converted = arrayKeysToCamelCase($emailConfig->toArray());
            return response()->json($converted);
        } catch (Exception $err) {
            return response()->json(['error' => 'An error occurred during get email config. Please try again later.'], 500);
        }
    }

    //update email config
    public function updateEmailConfig(Request $request, $id): JsonResponse
    {
        try {
            $emailConfig = EmailConfig::findOrFail($id);
            $emailConfig->update($request->all());

            if ($emailConfig) {
                return response()->json(['message' => 'Email config updated successfully.'], 200);
            } else {
                return response()->json(['error' => 'Failed to update email config.'], 404);
            }
        } catch (Exception $err) {
            return response()->json(['error' => 'An error occurred during update email config. Please try again later.'], 500);
        }
    }

    //delete email config
    public function deleteEmailConfig($id): JsonResponse
    {
        try {
            $emailConfig = EmailConfig::findOrFail($id);
            $emailConfig->delete();

            if ($emailConfig) {
                return response()->json(['message' => 'Email config deleted successfully.'], 200);
            } else {
                return response()->json(['error' => 'Failed to delete email config.'], 404);
            }
        } catch (Exception $err) {
            return response()->json(['error' => 'An error occurred during delete email config. Please try again later.'], 500);
        }
    }
}
