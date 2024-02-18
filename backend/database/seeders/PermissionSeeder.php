<?php

namespace Database\Seeders;


use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use \App\Models\Permission;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        define('endpoints', [
            "paymentPurchaseInvoice",
            "paymentSaleInvoice",
            "returnSaleInvoice",
            "purchaseInvoice",
            "returnPurchaseInvoice",
            "rolePermission",
            "saleInvoice",
            "transaction",
            "permission",
            "dashboard",
            "customer",
            "supplier",
            "product",
            "user",
            "role",
            "designation",
            "productCategory",
            "account",
            "setting",
            "productSubCategory",
            "productBrand",
            "email",
            "adjust",
            "warehouse",
            "stock",
            "attribute",
            "color",
            "meta",
            "transfer",
            "review",
            "slider",
            "shoppingCart",
            "vat",
            "reorderQuantity",
            "coupon",
            "purchaseReorderInvoice",
            "pageSize",
            "quote",
        ]);

        define('PERMISSIONSTYPES', [
            'create',
            'readAll',
            "readSingle",
            'update',
            'delete',
        ]);
        foreach (endpoints as $endpoint) {
            foreach (PERMISSIONSTYPES as $permissionType) {
                $permission = new Permission();
                $permission->name = $permissionType . "-" . $endpoint;
                $permission->save();
            }
        }
    }
}
