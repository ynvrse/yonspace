<?php

namespace App\Traits;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

trait HasFile
{
    /**
     * Upload a file to the specified folder.
     *
     * @param Request $request
     * @param string $column
     * @param string $folder
     * @return string|null
     */
    public function upload_file(Request $request, string $column, string $folder): ?string
    {
        return $request->hasFile($column)
            ? $request->file($column)->store($folder, 'public')
            : null;
    }

    /**
     * Update a file and delete the old one if it exists.
     *
     * @param Request $request
     * @param Model $model
     * @param string $column
     * @param string $folder
     * @return string|null
     */
    public function update_file(Request $request, Model $model, string $column, string $folder): ?string
    {
        if ($request->hasFile($column)) {
            // Delete the old file if it exists
            if ($model->$column) {
                Storage::disk('public')->delete($model->$column);
            }

            // Store the new file
            return $request->file($column)->store($folder, 'public');
        }

        // Keep the existing file if no new file is uploaded
        return $model->$column;
    }

    public function delete_file(Model $model, string $column): void
    {
        if ($model->$column) {
            Storage::delete($model->$column);
        }
    }
}
