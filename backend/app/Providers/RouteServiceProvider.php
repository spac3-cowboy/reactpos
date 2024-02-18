<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Route;

class RouteServiceProvider extends ServiceProvider
{
    /**
     * The path to your application's "home" route.
     *
     * Typically, users are redirected here after authentication.
     *
     * @var string
     */
    public const HOME = '/home';

    /**
     * Define your route model bindings, pattern filters, and other route configuration.
     */
    public function boot(): void
    {
        RateLimiter::for('user', function (Request $request) {
            return Limit::perMinute(60)->by($request->user()?->id ?: $request->ip());
        });

        $this->routes(function () {
            Route::middleware('user')
                ->prefix('user')
                ->group(base_path('routes/userRoutes.php'));
            Route::middleware('permission')
                ->prefix('permission')
                ->group(base_path('routes/permissionRoutes.php'));
            Route::middleware('role')
                ->prefix('role')
                ->group(base_path('routes/roleRoutes.php'));
            Route::middleware('setting')
                ->prefix('setting')
                ->group(base_path('routes/appSettingRoutes.php'));
            Route::middleware('account')
                ->prefix('account')
                ->group(base_path('routes/accountRoutes.php'));
            Route::middleware('transaction')
                ->prefix('transaction')
                ->group(base_path('routes/transactionRoutes.php'));
            Route::middleware('role-permission')
                ->prefix('role-permission')
                ->group(base_path('routes/rolePermissionRoutes.php'));
            Route::middleware('designation')
                ->prefix('designation')
                ->group(base_path('routes/designationRoutes.php'));
            Route::middleware('files')
                ->prefix('files')
                ->group(base_path('routes/filesRoutes.php'));
            Route::middleware('email-config')
                ->prefix('email-config')
                ->group(base_path('routes/emailConfigRoutes.php'));
            Route::middleware('email')
                ->prefix('email')
                ->group(base_path('routes/emailRoutes.php'));
            Route::middleware('dashboard')
                ->prefix('dashboard')
                ->group(base_path('routes/dashboardRoutes.php'));
            Route::middleware('product-category')
                ->prefix('product-category')
                ->group(base_path('routes/productCategoryRoutes.php'));
            Route::middleware('product-sub-category')
                ->prefix('product-sub-category')
                ->group(base_path('routes/productSubCategoryRoutes.php'));
            Route::middleware('product-vat')
                ->prefix('product-vat')
                ->group(base_path('routes/productVatRoutes.php'));
            Route::middleware('customer')
                ->prefix('customer')
                ->group(base_path('routes/customerRoutes.php'));
            Route::middleware('product-brand')
                ->prefix('product-brand')
                ->group(base_path('routes/productBrandRoutes.php'));
            Route::middleware('product')
                ->prefix('product')
                ->group(base_path('routes/productRoutes.php'));
            Route::middleware('product-color')
                ->prefix('product-color')
                ->group(base_path('routes/colorsRoutes.php'));
            Route::middleware('adjust-inventory')
                ->prefix('adjust-inventory')
                ->group(base_path('routes/adjustInventoryRoutes.php'));
            Route::middleware('supplier')
                ->prefix('supplier')
                ->group(base_path('routes/supplierRoutes.php'));
            Route::middleware('purchase-invoice')
                ->prefix('purchase-invoice')
                ->group(base_path('routes/purchaseInvoiceRoutes.php'));
            Route::middleware('payment-purchase-invoice')
                ->prefix('payment-purchase-invoice')
                ->group(base_path('routes/paymentPurchaseInvoiceRoutes.php'));
            Route::middleware('return-purchase-invoice')
                ->prefix('return-purchase-invoice')
                ->group(base_path('routes/returnPurchaseInvoiceRoutes.php'));
            Route::middleware('sale-invoice')
                ->prefix('sale-invoice')
                ->group(base_path('routes/saleInvoiceRoutes.php'));
            Route::middleware('payment-sale-invoice')
                ->prefix('payment-sale-invoice')
                ->group(base_path('routes/paymentSaleInvoiceRoutes.php'));
            Route::middleware('return-sale-invoice')
                ->prefix('return-sale-invoice')
                ->group(base_path('routes/returnSaleInvoiceRoutes.php'));
            Route::middleware('product-image')
                ->prefix('product-image')
                ->group(base_path('routes/productImageRoutes.php'));
            Route::middleware('report')
                ->prefix('report')
                ->group(base_path('routes/reportRoutes.php'));
            Route::middleware('reorder-quantity')
                ->prefix('reorder-quantity')
                ->group(base_path('routes/reorderQuantityRoutes.php'));
            Route::middleware('coupon')
                ->prefix('coupon')
                ->group(base_path('routes/couponRoutes.php'));
            Route::middleware('purchase-reorder-invoice')
                ->prefix('purchase-reorder-invoice')
                ->group(base_path('routes/purchaseReorderInvoiceRoutes.php'));
            Route::middleware('page-size')
                ->prefix('page-size')
                ->group(base_path('routes/pageSizeRoutes.php'));
            Route::middleware('quote')
                ->prefix('quote')
                ->group(base_path('routes/quoteRoutes.php'));
        });
    }
}
