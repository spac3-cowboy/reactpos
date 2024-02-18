<?php

namespace Database\Seeders;

//use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\CustomerPermissions;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            RoleSeeder::class,
            UsersSeeder::class,
            PermissionSeeder::class,
            RolePermissionSeeder::class,
            DesignationSeeder::class,
            AppSettingSeeder::class,
            AccountSeeder::class,
            SubAccountSeeder::class,
            EmailConfigSeeder::class,
            ProductCategorySeeder::class,
            ProductSubCategorySeeder::class,
            customerSeeder::class,
            ProductBrandSeeder::class,
            ProductSeeder::class,
            ColorsSeeder::class,
            ProductColorSeeder::class,
            SupplierSeeder::class,
            CustomerPermissionsSeeder::class,
            ProductVatSeeder::class,
            PageSizeSeeder::class,
        ]);
    }
}
