<?php

namespace App\Http\Middleware;

use Closure;
use Exception;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class FileUploader
{
    protected function generateFileName($bytes = 32): string
    {
        return bin2hex(random_bytes($bytes));
    }

    // Store files upload folder in disk
    protected function getDestinationPath(): string
    {
        return 'uploads';
    }

    public function handle(Request $request, Closure $next, $maxFileCount = 1): Response
    {
        try {
            $filesArray = [];

            $request->validate([
                'images.*' => 'required|file|mimes:jpg,jpeg,png,pdf',
            ]);

            if ($request->hasFile('images')) {

                if (count($request->file('images')) > $maxFileCount) {
                    throw new Exception("You can upload a maximum of $maxFileCount files.");
                }

                foreach ($request->file('images') as $file) {
                    $extension = $file->getClientOriginalExtension();

                    $uniqueSuffix = $this->generateFileName();
                    $filename = $uniqueSuffix . '.' . $extension;

                    $file->storeAs($this->getDestinationPath(), $filename);

                    $filesArray[] = $filename;
                }
            }

            $request->merge(['file_paths' => $filesArray]);

            return $next($request);
        } catch (Exception $error) {
            return response()->json(["message" => $error->getMessage()]);
        }
    }
}
