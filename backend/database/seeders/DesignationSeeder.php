<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Designation;

class DesignationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $designation = new Designation();
        $designation->name = 'Manager';
        $designation->save();

        $designation = new Designation();
        $designation->name = 'employee';
        $designation->save();

        $designation = new Designation();
        $designation->name = 'Salesman';
        $designation->save();

        $designation = new Designation();
        $designation->name = 'Accountant';
        $designation->save();

        $designation = new Designation();
        $designation->name = 'Storekeeper';
        $designation->save();

        $designation = new Designation();
        $designation->name = 'Driver';
        $designation->save();

        $designation = new Designation();
        $designation->name = 'Cleaner';
        $designation->save();
    }
}
