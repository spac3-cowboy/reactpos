<?php

namespace Database\Seeders;

use App\Models\PageSize;
use Illuminate\Database\Seeder;

class PageSizeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $newPageSize = new PageSize();
        $newPageSize->pageSizeName = 'A4';
        $newPageSize->width = 8.3;
        $newPageSize->height = 11.7;
        $newPageSize->unit = 'inches';
        $newPageSize->save();
    }
}
