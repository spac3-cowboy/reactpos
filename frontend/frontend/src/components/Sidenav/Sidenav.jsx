import {
  AppstoreOutlined,
  BgColorsOutlined,
  CodeSandboxOutlined,
  FileDoneOutlined,
  FileOutlined,
  FileProtectOutlined,
  FileSyncOutlined,
  FlagOutlined,
  HomeOutlined,
  ImportOutlined,
  MinusSquareOutlined,
  MoneyCollectOutlined,
  OrderedListOutlined,
  SettingOutlined,
  ShoppingOutlined,
  SolutionOutlined,
  TeamOutlined,
  UngroupOutlined,
  UnorderedListOutlined,
  UsergroupAddOutlined,
  UserOutlined,
  UserSwitchOutlined,
  WalletOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import React from "react";
import { BiSolidQuoteLeft } from "react-icons/bi";
import { GiTicket } from "react-icons/gi";
import { PiWarehouseBold } from "react-icons/pi";
import { NavLink } from "react-router-dom";
import getPermissions from "../../utils/getPermissions";

const Sidenav = () => {
  const permissions = getPermissions();

  const hasPermission = (item) => {
    return permissions?.includes(item ? item : "");
  };
  const menu = [
    {
      label: (
        <NavLink to='/admin/dashboard'>
          <span>Dashboard</span>
        </NavLink>
      ),
      key: "dashboard",
      icon: <HomeOutlined />,
    },
    (hasPermission("create-product") || hasPermission("readAll-product")) && {
      label: "INVENTORY",
      key: "inventory",
      icon: <CodeSandboxOutlined />,
      children: [
        {
          label: (
            <NavLink to='/admin/product'>
              <span>Product</span>
            </NavLink>
          ),
          key: "products",
          icon: <UnorderedListOutlined />,
        },
        {
          label: (
            <NavLink to='/admin/product/importcsv'>
              <span>Import Product </span>
            </NavLink>
          ),
          key: "import_csv",
          icon: <ImportOutlined />,
        },

        {
          label: (
            <NavLink to='/admin/product-category'>
              <span>Product Category</span>
            </NavLink>
          ),
          key: "productCategory",
          icon: <AppstoreOutlined />,
        },
        {
          label: (
            <NavLink to='/admin/product-subcategory'>
              <span>Product Subcategory</span>
            </NavLink>
          ),
          key: "productSubcategory",
          icon: <UngroupOutlined />,
        },
        {
          label: (
            <NavLink to='/admin/product-brand'>
              <span>Product Brand</span>
            </NavLink>
          ),
          key: "productBrand",
          icon: <FileProtectOutlined />,
        },

        {
          label: (
            <NavLink to='/admin/product-color'>
              <span>Product Color</span>
            </NavLink>
          ),
          key: "productColor",
          icon: <BgColorsOutlined />,
        },
        {
          label: (
            <NavLink to='/admin/product-sort-list'>
              <span>Product Sort List</span>
            </NavLink>
          ),
          key: "productSortList",
          icon: <OrderedListOutlined />,
        },
        {
          label: (
            <NavLink to='/admin/adjust-inventory'>
              <span>Adjust Inventory</span>
            </NavLink>
          ),
          key: "adjust-inventory",
          icon: <PiWarehouseBold />,
        },
        /*{
          label: (
            <NavLink to='/admin/coupon'>
              <span>Coupon</span>
            </NavLink>
          ),
          key: "coupon",
          icon: <GiTicket />,
        }, */
        {
          label: (
            <NavLink to='/admin/customer'>
              <span>Customers</span>
            </NavLink>
          ),
          key: "customers",
          icon: <UserOutlined />,
        },
        

        {
          label: (
          <NavLink to='/admin/vat-tax'>
            <span>VAT/TAX</span>
          </NavLink>
        ),
        key: "vat/tax",
        icon: <MoneyCollectOutlined />,
      },


      ],
    },
    (hasPermission("create-purchaseInvoice") ||
      hasPermission("readAll-purchaseInvoice")) && {
      label: "PURCHASE",
      key: "purchases",
      icon: <ShoppingOutlined />,
      children: [
        {
          label: (
            <NavLink to='/admin/purchase'>
              <span>Purchase</span>
            </NavLink>
          ),
          key: "purchase",
          icon: <UnorderedListOutlined />,
        },
        {
          label: (
            <NavLink to='/admin/supplier'>
              <span>Suppliers</span>
            </NavLink>
          ),
          key: "suppliers",
          icon: <UserOutlined />,
        },
        {
          label: (
            <NavLink to='/admin/purchase-return-list'>
              <span>Purchase Return List</span>
            </NavLink>
          ),
          key: "purchaseReturn",
          icon: <OrderedListOutlined />,
        },
        {
          label: (
            <NavLink to='/admin/purchase-reorder-invoice'>
              <span>Purchase Order List</span>
            </NavLink>
          ),
          key: "purchaseOrder",
          icon: <OrderedListOutlined />,
        },
      ],
    },
    (hasPermission("create-saleInvoice") ||
      hasPermission("readAll-saleInvoice")) && {
    label: "SALE",
      key: "sale",
      icon: <MinusSquareOutlined />,
       children: [
        {
          label: (
            <NavLink to='/admin/sale'>
              <span>Sale</span>
            </NavLink>
          ),
          key: "sales",
          icon: <UnorderedListOutlined />,
        },
        {
          label: (
            <NavLink to='/admin/customer'>
              <span>Customers</span>
            </NavLink>
          ),
          key: "customers",
          icon: <UserOutlined />,
        },
        {
          label: (
            <NavLink to='/admin/hold-sale'>
              <span>Draft Sale List</span>
            </NavLink>
          ),
          key: "holdSale",
          icon: <OrderedListOutlined />,
        },
        {
          label: (
            <NavLink to='/admin/sale-return-list'>
              <span>Sale Return List</span>
            </NavLink>
          ),
          key: "saleReturn",
          icon: <OrderedListOutlined />,
        },
      ],
    },
    (hasPermission("create-vat") || hasPermission("readAll-vat")) && {
      label: (
        <NavLink to='/admin/vat-tax'>
          <span>VAT/TAX</span>
        </NavLink>
      ),
      key: "vat/tax",
      icon: <MoneyCollectOutlined />,
    },
    (hasPermission("create-account") || hasPermission("readAll-account")) && {
      label: "ACCOUNTS",
      key: "accounts",
      icon: <WalletOutlined />,
      children: [
        {
          label: (
            <NavLink to='/admin/account/'>
              <span>Account</span>
            </NavLink>
          ),
          key: "accountList",
          icon: <UnorderedListOutlined />,
        },
        {
          label: (
            <NavLink to='/admin/transaction/'>
              <span>Transaction</span>
            </NavLink>
          ),
          key: "transactionList",
          icon: <UnorderedListOutlined />,
        },
      ], 
    },
    {
      label: "REPORT",
      key: "report",
      icon: <FlagOutlined />,
      children: [
        {
          label: (
            <NavLink to='/admin/account/trial-balance'>
              <span>Trial Balance</span>
            </NavLink>
          ),
          key: "trialBalance",
          icon: <FileDoneOutlined />,
        },
        {
          label: (
            <NavLink to='/admin/account/balance-sheet'>
              <span>Balance Sheet</span>
            </NavLink>
          ),
          key: "balanceSheet",
          icon: <FileOutlined />,
        },
        {
          label: (
            <NavLink to='/admin/account/income'>
              <span>Income Statement</span>
            </NavLink>
          ),
          key: "incomeStatement",
          icon: <FileSyncOutlined />,
        },
      ],
    },

    (hasPermission("create-user") || hasPermission("readAll-user")) && {
      label: "HR",
      key: "hr",
      icon: <TeamOutlined />,
      children: [
        {
          label: (
            <NavLink to='/admin/hr/staffs'>
              <span>Staffs</span>
            </NavLink>
          ),
          key: "staffs",
          icon: <UsergroupAddOutlined />,
        },
        {
          label: (
            <NavLink to='/admin/role'>
              <span>Role & Permissions</span>
            </NavLink>
          ),
          key: "roleAndPermissions",
          icon: <UserSwitchOutlined />,
        },
        {
          label: (
            <NavLink to='/admin/designation/'>
              <span>Designation</span>
            </NavLink>
          ),
          key: "designation",
          icon: <SolutionOutlined />,
        },
      ], 
    },
    (hasPermission("create-quote") || hasPermission("readAll-quote")) && {
      label: (
        <NavLink to='/admin/quote'>
          <span>QUOTE</span>
        </NavLink>
      ),
      key: "quote",
      icon: <BiSolidQuoteLeft />,
    },
    {
      label: "SETTINGS",
      key: "settings",
      icon: <SettingOutlined />,
      children: [
        {
          label: (
            <NavLink to='/admin/invoice-setting'>
              <span>Invoice Settings</span>
            </NavLink>
          ),
          key: "invoiceSetting",
          icon: <SettingOutlined />,
        },
        (hasPermission("create-pageSize") ||
          hasPermission("readAll-pageSize")) && {
          label: (
            <NavLink to='/admin/print-page-setting'>
              <span>Print Page Settings</span>
            </NavLink>
          ),
          key: "printPageSetting",
          icon: <SettingOutlined />,
        },
      ],
    },
  ];

  return (
    <div className=''>
      <Menu theme='dark' mode='inline' items={menu} />
    </div>
  );
};

export default Sidenav;
