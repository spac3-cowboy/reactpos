<?php

namespace Database\Seeders;

use App\Models\CustomerPermissions;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CustomerPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $customerEndpoints = [
            'product_details',
            'profile',
            'purchase',
        ];

        $endpointPermissionMapping = [
            'product_details' => ["read"],
            'profile' => ["read", "update"],
            'purchase' => ["create", "read", "update"],
        ];

        $customerPermissionsData = [];

        foreach ($customerEndpoints as $endpoint) {
            $permissionTypes = $endpointPermissionMapping[$endpoint];
            foreach ($permissionTypes as $permissionType) {
                $permission = "{$permissionType}-{$endpoint}";
                $customerPermissionsData[] = $permission;
            }
        }

        foreach ($customerPermissionsData as $permission) {
            $customerPermissions = new CustomerPermissions();
            $customerPermissions->user = 'customer';
            $customerPermissions->permissions = $permission;
            $customerPermissions->save();
        }
    }
}
