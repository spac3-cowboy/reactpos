import { configureStore } from "@reduxjs/toolkit";
import couponSlice from "../features/Coupon/couponSlice";
import PurchaseReturnListSlice from "../features/PurchaseReturnList/PurchaseReturnListSlice";
import SaleReturnListSlice from "../features/SaleReturnList/SaleReturnListSlice";
import accountReducer from "../features/account/accountSlice";
import adjustInventorySlice from "../features/adjustInventory/adjustInventorySlice";
import cartReducer from "../features/cart/cartSlice";
import colorReducer from "../features/color/colorSlice";
import customerReducer from "../features/customer/customerSlice";
import customerPaymentReducer from "../features/customerPayment/customerPaymentSlice";
import dashboardReducer from "../features/dashboard/dashboardSlice";
import designationReducer from "../features/designation/designationSlice";
import roleSlice from "../features/hr/role/roleSlice";
import productReducer from "../features/product/productSlice";
import productBrandReducer from "../features/productBrand/productBrandSlice";
import productCategoryReducer from "../features/productCategory/productCategorySlice";
import ProductSortListSlice from "../features/productSortList/ProductSortListSlice";
import productSubCategoryReducer from "../features/productSubCategory/productSubCategorySlice";
import purchaseReducer from "../features/purchase/purchaseSlice";
import purchaseOrderSlice from "../features/purchaseOrder/purchaseOrderSlice";
import saleReducer from "../features/sale/saleSlice";
import settingReducer from "../features/setting/settingSlice";
import supplierReducer from "../features/supplier/supplierSlice";
import supplierPaymentReducer from "../features/supplierPayment/supplierPaymentSlice";
import transactionReducer from "../features/transaction/transactionSlice";
import userReducer from "../features/user/userSlice";
import vatTaxSlice from "../features/vatTax/vatTaxSlice";
import printPageSlice from "../features/printPage/printPageSlice";
import holdSaleSlice from "../features/holdSale/holdSaleSlice";
import quoteSlice from "../features/quote/quoteSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    suppliers: supplierReducer,
    products: productReducer,
    purchases: purchaseReducer,
    purchaseReturn: PurchaseReturnListSlice,
    purchaseOrder: purchaseOrderSlice,
    customers: customerReducer,
    sales: saleReducer,
    saleReturn: SaleReturnListSlice,
    adjustInventory: adjustInventorySlice,
    users: userReducer,
    supplierPayments: supplierPaymentReducer,
    accounts: accountReducer,
    dashboard: dashboardReducer,
    transactions: transactionReducer,
    productCategories: productCategoryReducer,
    productSubCategories: productSubCategoryReducer,
    productBrands: productBrandReducer,
    designations: designationReducer,
    colors: colorReducer,
    customerPayments: customerPaymentReducer,
    vatTax: vatTaxSlice,
    role: roleSlice,
    setting: settingReducer,
    productSortList: ProductSortListSlice,
    coupon: couponSlice,
    print: printPageSlice,
    holdSale: holdSaleSlice,
    quote:quoteSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: [
          "product/loadSingleProduct/fulfilled",
          "vatTax/loadVatTaxStatement/fulfilled",
          "transaction/deleteStaff/fulfilled",
          "productCategory/loadSingleProductCategory/fulfilled",
          "productSubCategory/loadSingleProductSubCategory/fulfilled",
          "productBrand/loadSingleProductBrand/fulfilled",
          "supplier/loadSupplier/fulfilled",
          "customer/loadSingleCustomer/fulfilled",
          "sale/loadSingleSale/fulfilled",
          "user/loadSingleStaff/fulfilled",
          "designation/loadSingleDesignation/fulfilled",
          "user/loadSingleStaff/fulfilled",
        ],
      },
    }).concat(),
});

export default store;
