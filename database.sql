-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 19, 2023 at 05:29 PM
-- Server version: 8.0.34
-- PHP Version: 8.1.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `osapp_inventoryos`
--

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

CREATE TABLE `account` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`id`, `name`, `type`, `created_at`, `updated_at`) VALUES
(1, 'Asset', 'Asset', '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(2, 'Liability', 'Liability', '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(3, 'Capital', 'Owner\'s Equity', '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(4, 'Withdrawal', 'Owner\'s Equity', '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(5, 'Revenue', 'Owner\'s Equity', '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(6, 'Expense', 'Owner\'s Equity', '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(7, 'vat', 'Govt.', '2023-11-19 05:15:19', '2023-11-19 05:15:19');

-- --------------------------------------------------------

--
-- Table structure for table `adjustInvoice`
--

CREATE TABLE `adjustInvoice` (
  `id` bigint UNSIGNED NOT NULL,
  `note` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `userId` bigint UNSIGNED NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `adjustInvoiceProduct`
--

CREATE TABLE `adjustInvoiceProduct` (
  `id` bigint UNSIGNED NOT NULL,
  `adjustInvoiceId` bigint UNSIGNED NOT NULL,
  `productId` bigint UNSIGNED DEFAULT NULL,
  `adjustQuantity` int NOT NULL,
  `adjustType` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `appSetting`
--

CREATE TABLE `appSetting` (
  `id` bigint UNSIGNED NOT NULL,
  `companyName` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tagLine` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `website` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `footer` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `appSetting`
--

INSERT INTO `appSetting` (`id`, `companyName`, `tagLine`, `address`, `phone`, `email`, `website`, `footer`, `logo`, `created_at`, `updated_at`) VALUES
(1, 'Company Name', 'Tag Line', 'Address', '2345678', 'company@gmail.com', 'Website', 'Footer', NULL, '2023-11-19 05:15:19', '2023-11-19 05:15:19');

-- --------------------------------------------------------

--
-- Table structure for table `colors`
--

CREATE TABLE `colors` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `colorCode` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'true',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `colors`
--

INSERT INTO `colors` (`id`, `name`, `colorCode`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Red', '#FF0000', 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(2, 'Green', '#008000', 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(3, 'Blue', '#0000FF', 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(4, 'Yellow', '#FFFF00', 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(5, 'Black', '#000000', 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(6, 'White', '#FFFFFF', 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(7, 'Orange', '#FFA500', 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(8, 'Purple', '#800080', 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(9, 'Pink', '#FFC0CB', 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(10, 'Brown', '#A52A2A', 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(11, 'Grey', '#808080', 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(12, 'Gold', '#FFD700', 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(13, 'Silver', '#C0C0C0', 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(14, 'Cyan', '#00FFFF', 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(15, 'Magenta', '#FF00FF', 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(16, 'Lime', '#00FF00', 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(17, 'Teal', '#008080', 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(18, 'Maroon', '#800000', 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(19, 'Navy', '#000080', 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(20, 'Olive', '#808000', 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19');

-- --------------------------------------------------------

--
-- Table structure for table `coupon`
--

CREATE TABLE `coupon` (
  `id` bigint UNSIGNED NOT NULL,
  `couponCode` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `type` enum('flat','percentage') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'percentage',
  `value` double NOT NULL,
  `startDate` datetime NOT NULL,
  `endDate` datetime NOT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'true',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'true',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`id`, `name`, `email`, `phone`, `address`, `password`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Doe', 'test@gmail.com', '1234567890', '123 Main St', '$2y$10$tDk4XcG9ahWmElyaJqsPE.VANXDRXrwY2Nys23MN2dJ0rZZgcLVaO', 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19');

-- --------------------------------------------------------

--
-- Table structure for table `customerPermissions`
--

CREATE TABLE `customerPermissions` (
  `id` bigint UNSIGNED NOT NULL,
  `user` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `permissions` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'true',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `customerPermissions`
--

INSERT INTO `customerPermissions` (`id`, `user`, `permissions`, `status`, `created_at`, `updated_at`) VALUES
(1, 'customer', 'read-product_details', 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(2, 'customer', 'read-profile', 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(3, 'customer', 'update-profile', 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(4, 'customer', 'create-purchase', 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(5, 'customer', 'read-purchase', 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(6, 'customer', 'update-purchase', 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19');

-- --------------------------------------------------------

--
-- Table structure for table `designation`
--

CREATE TABLE `designation` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'true',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `designation`
--

INSERT INTO `designation` (`id`, `name`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Manager', 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(2, 'employee', 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(3, 'Salesman', 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(4, 'Accountant', 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(5, 'Storekeeper', 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(6, 'Driver', 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(7, 'Cleaner', 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19');

-- --------------------------------------------------------

--
-- Table structure for table `email`
--

CREATE TABLE `email` (
  `id` bigint UNSIGNED NOT NULL,
  `senderEmail` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `receiverEmail` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `subject` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `body` longtext COLLATE utf8mb4_unicode_ci,
  `emailStatus` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'true',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `emailConfig`
--

CREATE TABLE `emailConfig` (
  `id` bigint UNSIGNED NOT NULL,
  `emailConfigName` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `emailHost` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `emailPort` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `emailUser` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `emailPass` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'true',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `emailConfig`
--

INSERT INTO `emailConfig` (`id`, `emailConfigName`, `emailHost`, `emailPort`, `emailUser`, `emailPass`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Omega', 'server.vibd.me', '465', 'no-reply@osapp.net', 'password', 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(2, '2023_07_10_040609_create_role_table', 1),
(3, '2023_07_10_040624_create_shift_table', 1),
(4, '2023_07_10_040639_create_users_table', 1),
(5, '2023_07_12_065307_create_permission_table', 1),
(6, '2023_07_12_090218_create_role_permission_table', 1),
(7, '2023_07_16_082632_create_designation_table', 1),
(8, '2023_07_17_043455_create_app_setting_table', 1),
(9, '2023_07_17_080852_create_account_table', 1),
(10, '2023_07_17_081817_create_sub_account_table', 1),
(11, '2023_07_17_101745_create_transaction_table', 1),
(12, '2023_08_23_083031_create_customer_table', 1),
(13, '2023_08_24_105303_create_quote_table', 1),
(14, '2023_08_29_081018_create_email_config_table', 1),
(15, '2023_08_30_065226_create_email_table', 1),
(16, '2023_09_12_070409_add_foreign_keys_to_users', 1),
(17, '2023_09_12_085848_create_product_category_table', 1),
(18, '2023_09_12_102045_create_product_sub_category_table', 1),
(19, '2023_09_12_115431_create_product_brand_table', 1),
(20, '2023_09_13_052838_create_product_table', 1),
(21, '2023_09_13_053133_create_product_vat_table', 1),
(22, '2023_09_13_090355_create_colors_table', 1),
(23, '2023_09_13_090642_create_product_color_table', 1),
(24, '2023_09_14_045604_create_adjust_invoice_table', 1),
(25, '2023_09_14_050114_create_adjust_invoice_product_table', 1),
(26, '2023_09_14_080843_create_supplier_table', 1),
(27, '2023_09_14_081416_create_purchase_invoice_table', 1),
(28, '2023_09_14_083711_create_purchase_invoice_product_table', 1),
(29, '2023_09_14_092035_create_return_purchase_invoice_table', 1),
(30, '2023_09_14_093131_create_return_purchase_invoice_product_table', 1),
(31, '2023_09_14_105322_create_quote_product_table', 1),
(32, '2023_09_17_054805_add_foreign_keys_to_product', 1),
(33, '2023_09_18_110701_create_customer_permissions_table', 1),
(34, '2023_09_19_050350_create_sale_invoice_table', 1),
(35, '2023_09_19_050400_create_sale_invoice_product_table', 1),
(36, '2023_09_19_054001_create_sale_invoice_vat_table', 1),
(37, '2023_09_19_055200_create_return_sale_invoice_table', 1),
(38, '2023_09_19_055907_create_return_sale_invoice_product_table', 1),
(39, '2023_09_21_074801_create_review_rating_table', 1),
(40, '2023_10_25_095135_create_coupon_table', 1),
(41, '2023_10_26_052811_create_purchase_reorder_invoice_table', 1),
(42, '2023_11_02_050923_create_page_size_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `pageSize`
--

CREATE TABLE `pageSize` (
  `id` bigint UNSIGNED NOT NULL,
  `pageSizeName` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `width` double NOT NULL,
  `height` double NOT NULL,
  `unit` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'inches',
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'true',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `pageSize`
--

INSERT INTO `pageSize` (`id`, `pageSizeName`, `width`, `height`, `unit`, `status`, `created_at`, `updated_at`) VALUES
(1, 'A4', 8.3, 11.7, 'inches', 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19');

-- --------------------------------------------------------

--
-- Table structure for table `permission`
--

CREATE TABLE `permission` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `permission`
--

INSERT INTO `permission` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'create-paymentPurchaseInvoice', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(2, 'readAll-paymentPurchaseInvoice', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(3, 'readSingle-paymentPurchaseInvoice', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(4, 'update-paymentPurchaseInvoice', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(5, 'delete-paymentPurchaseInvoice', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(6, 'create-paymentSaleInvoice', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(7, 'readAll-paymentSaleInvoice', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(8, 'readSingle-paymentSaleInvoice', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(9, 'update-paymentSaleInvoice', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(10, 'delete-paymentSaleInvoice', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(11, 'create-returnSaleInvoice', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(12, 'readAll-returnSaleInvoice', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(13, 'readSingle-returnSaleInvoice', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(14, 'update-returnSaleInvoice', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(15, 'delete-returnSaleInvoice', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(16, 'create-purchaseInvoice', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(17, 'readAll-purchaseInvoice', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(18, 'readSingle-purchaseInvoice', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(19, 'update-purchaseInvoice', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(20, 'delete-purchaseInvoice', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(21, 'create-returnPurchaseInvoice', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(22, 'readAll-returnPurchaseInvoice', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(23, 'readSingle-returnPurchaseInvoice', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(24, 'update-returnPurchaseInvoice', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(25, 'delete-returnPurchaseInvoice', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(26, 'create-rolePermission', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(27, 'readAll-rolePermission', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(28, 'readSingle-rolePermission', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(29, 'update-rolePermission', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(30, 'delete-rolePermission', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(31, 'create-saleInvoice', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(32, 'readAll-saleInvoice', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(33, 'readSingle-saleInvoice', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(34, 'update-saleInvoice', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(35, 'delete-saleInvoice', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(36, 'create-transaction', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(37, 'readAll-transaction', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(38, 'readSingle-transaction', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(39, 'update-transaction', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(40, 'delete-transaction', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(41, 'create-permission', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(42, 'readAll-permission', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(43, 'readSingle-permission', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(44, 'update-permission', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(45, 'delete-permission', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(46, 'create-dashboard', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(47, 'readAll-dashboard', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(48, 'readSingle-dashboard', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(49, 'update-dashboard', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(50, 'delete-dashboard', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(51, 'create-customer', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(52, 'readAll-customer', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(53, 'readSingle-customer', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(54, 'update-customer', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(55, 'delete-customer', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(56, 'create-supplier', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(57, 'readAll-supplier', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(58, 'readSingle-supplier', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(59, 'update-supplier', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(60, 'delete-supplier', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(61, 'create-product', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(62, 'readAll-product', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(63, 'readSingle-product', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(64, 'update-product', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(65, 'delete-product', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(66, 'create-user', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(67, 'readAll-user', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(68, 'readSingle-user', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(69, 'update-user', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(70, 'delete-user', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(71, 'create-role', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(72, 'readAll-role', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(73, 'readSingle-role', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(74, 'update-role', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(75, 'delete-role', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(76, 'create-designation', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(77, 'readAll-designation', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(78, 'readSingle-designation', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(79, 'update-designation', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(80, 'delete-designation', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(81, 'create-productCategory', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(82, 'readAll-productCategory', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(83, 'readSingle-productCategory', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(84, 'update-productCategory', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(85, 'delete-productCategory', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(86, 'create-account', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(87, 'readAll-account', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(88, 'readSingle-account', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(89, 'update-account', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(90, 'delete-account', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(91, 'create-setting', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(92, 'readAll-setting', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(93, 'readSingle-setting', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(94, 'update-setting', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(95, 'delete-setting', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(96, 'create-productSubCategory', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(97, 'readAll-productSubCategory', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(98, 'readSingle-productSubCategory', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(99, 'update-productSubCategory', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(100, 'delete-productSubCategory', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(101, 'create-productBrand', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(102, 'readAll-productBrand', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(103, 'readSingle-productBrand', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(104, 'update-productBrand', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(105, 'delete-productBrand', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(106, 'create-email', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(107, 'readAll-email', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(108, 'readSingle-email', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(109, 'update-email', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(110, 'delete-email', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(111, 'create-adjust', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(112, 'readAll-adjust', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(113, 'readSingle-adjust', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(114, 'update-adjust', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(115, 'delete-adjust', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(116, 'create-warehouse', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(117, 'readAll-warehouse', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(118, 'readSingle-warehouse', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(119, 'update-warehouse', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(120, 'delete-warehouse', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(121, 'create-stock', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(122, 'readAll-stock', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(123, 'readSingle-stock', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(124, 'update-stock', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(125, 'delete-stock', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(126, 'create-attribute', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(127, 'readAll-attribute', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(128, 'readSingle-attribute', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(129, 'update-attribute', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(130, 'delete-attribute', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(131, 'create-color', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(132, 'readAll-color', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(133, 'readSingle-color', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(134, 'update-color', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(135, 'delete-color', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(136, 'create-meta', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(137, 'readAll-meta', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(138, 'readSingle-meta', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(139, 'update-meta', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(140, 'delete-meta', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(141, 'create-transfer', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(142, 'readAll-transfer', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(143, 'readSingle-transfer', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(144, 'update-transfer', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(145, 'delete-transfer', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(146, 'create-review', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(147, 'readAll-review', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(148, 'readSingle-review', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(149, 'update-review', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(150, 'delete-review', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(151, 'create-slider', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(152, 'readAll-slider', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(153, 'readSingle-slider', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(154, 'update-slider', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(155, 'delete-slider', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(156, 'create-shoppingCart', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(157, 'readAll-shoppingCart', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(158, 'readSingle-shoppingCart', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(159, 'update-shoppingCart', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(160, 'delete-shoppingCart', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(161, 'create-vat', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(162, 'readAll-vat', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(163, 'readSingle-vat', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(164, 'update-vat', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(165, 'delete-vat', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(166, 'create-reorderQuantity', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(167, 'readAll-reorderQuantity', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(168, 'readSingle-reorderQuantity', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(169, 'update-reorderQuantity', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(170, 'delete-reorderQuantity', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(171, 'create-coupon', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(172, 'readAll-coupon', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(173, 'readSingle-coupon', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(174, 'update-coupon', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(175, 'delete-coupon', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(176, 'create-purchaseReorderInvoice', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(177, 'readAll-purchaseReorderInvoice', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(178, 'readSingle-purchaseReorderInvoice', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(179, 'update-purchaseReorderInvoice', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(180, 'delete-purchaseReorderInvoice', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(181, 'create-pageSize', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(182, 'readAll-pageSize', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(183, 'readSingle-pageSize', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(184, 'update-pageSize', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(185, 'delete-pageSize', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(186, 'create-quote', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(187, 'readAll-quote', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(188, 'readSingle-quote', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(189, 'update-quote', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(190, 'delete-quote', '2023-11-19 05:15:18', '2023-11-19 05:15:18');

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `productThumbnailImage` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `productSubCategoryId` bigint UNSIGNED DEFAULT NULL,
  `productBrandId` bigint UNSIGNED DEFAULT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sku` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `productQuantity` int NOT NULL,
  `productSalePrice` double NOT NULL,
  `productPurchasePrice` double NOT NULL,
  `unitType` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `unitMeasurement` double DEFAULT NULL,
  `reorderQuantity` int DEFAULT NULL,
  `productVat` double DEFAULT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'true',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `purchaseInvoiceId` bigint UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `name`, `productThumbnailImage`, `productSubCategoryId`, `productBrandId`, `description`, `sku`, `productQuantity`, `productSalePrice`, `productPurchasePrice`, `unitType`, `unitMeasurement`, `reorderQuantity`, `productVat`, `status`, `created_at`, `updated_at`, `purchaseInvoiceId`) VALUES
(1, 'Samsung Galaxy S21 Ultra 5G', 'https://www.gizmochina.com/wp-content/uploads/2021/01/Samsung-Galaxy-S21-Ultra-5G-1.jpg', 1, 1, 'Samsung Galaxy S21 Ultra 5G', '123-433-365', 10, 1000, 900, 'Piece', 1, 5, 10, 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19', NULL),
(2, 'apple iphone 12 pro max', 'https://www.gizmochina.com/wp-content/uploads/2021/apple-iphone-12-pro-max-1.jpg', 1, 2, 'apple iphone 12 pro max', '123-953-365', 10, 1000, 900, 'Piece', 1, 5, 10, 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `productBrand`
--

CREATE TABLE `productBrand` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'true',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `productBrand`
--

INSERT INTO `productBrand` (`id`, `name`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Samsung', 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(2, 'Apple', 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(3, 'Huawei', 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(4, 'Xiaomi', 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(5, 'Oppo', 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(6, 'Dell', 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(7, 'HP', 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(8, 'Lenovo', 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(9, 'Asus', 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(10, 'Sony', 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(11, 'LG', 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(12, 'Panasonic', 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(13, 'Philips', 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(14, 'Hitachi', 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(15, 'Toshiba', 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(16, 'Sharp', 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19');

-- --------------------------------------------------------

--
-- Table structure for table `productCategory`
--

CREATE TABLE `productCategory` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'true',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `productCategory`
--

INSERT INTO `productCategory` (`id`, `name`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Electronics', 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(2, 'Clothing', 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(3, 'Grocery', 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(4, 'Furniture', 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(5, 'Stationary', 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(6, 'Sports', 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(7, 'Books', 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(8, 'Toys', 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(9, 'Others', 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19');

-- --------------------------------------------------------

--
-- Table structure for table `productColor`
--

CREATE TABLE `productColor` (
  `id` bigint UNSIGNED NOT NULL,
  `productId` bigint UNSIGNED NOT NULL,
  `colorId` bigint UNSIGNED DEFAULT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'true',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `productColor`
--

INSERT INTO `productColor` (`id`, `productId`, `colorId`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(2, 1, 2, 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(3, 1, 3, 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(4, 1, 4, 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(5, 1, 5, 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(6, 2, 1, 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(7, 2, 2, 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(8, 2, 3, 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(9, 2, 4, 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(10, 2, 5, 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19');

-- --------------------------------------------------------

--
-- Table structure for table `productSubCategory`
--

CREATE TABLE `productSubCategory` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `productCategoryId` bigint UNSIGNED DEFAULT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'true',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `productSubCategory`
--

INSERT INTO `productSubCategory` (`id`, `name`, `productCategoryId`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Mobile', 1, 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(2, 'Laptop', 1, 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(3, 'Television', 1, 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(4, 'Camera', 1, 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(5, 'Headphone', 1, 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(6, 'Shirt', 2, 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(7, 'Pant', 2, 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(8, 'T-Shirt', 2, 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(9, 'Jeans', 2, 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(10, 'Shoes', 2, 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(11, 'Rice', 3, 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(12, 'Oil', 3, 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(13, 'Spices', 3, 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(14, 'Vegetables', 3, 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(15, 'Fruits', 3, 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(16, 'Bed', 4, 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(17, 'Sofa', 4, 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(18, 'Table', 4, 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(19, 'Chair', 4, 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(20, 'Almirah', 4, 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(21, 'Pen', 5, 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(22, 'Pencil', 5, 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(23, 'Notebook', 5, 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(24, 'Paper', 5, 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(25, 'Eraser', 5, 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(26, 'Bat', 6, 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(27, 'Ball', 6, 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(28, 'Football', 6, 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19');

-- --------------------------------------------------------

--
-- Table structure for table `productVat`
--

CREATE TABLE `productVat` (
  `id` bigint UNSIGNED NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `percentage` double NOT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'true',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `productVat`
--

INSERT INTO `productVat` (`id`, `title`, `percentage`, `status`, `created_at`, `updated_at`) VALUES
(1, 'standard', 15, 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(2, 'import and supply', 15, 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19');

-- --------------------------------------------------------

--
-- Table structure for table `purchaseInvoice`
--

CREATE TABLE `purchaseInvoice` (
  `id` bigint UNSIGNED NOT NULL,
  `date` datetime NOT NULL,
  `totalAmount` double NOT NULL,
  `discount` double NOT NULL,
  `paidAmount` double NOT NULL,
  `dueAmount` double NOT NULL,
  `supplierId` bigint UNSIGNED NOT NULL,
  `note` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `supplierMemoNo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `purchaseInvoiceProduct`
--

CREATE TABLE `purchaseInvoiceProduct` (
  `id` bigint UNSIGNED NOT NULL,
  `invoiceId` bigint UNSIGNED NOT NULL,
  `productId` bigint UNSIGNED DEFAULT NULL,
  `productQuantity` int NOT NULL,
  `productPurchasePrice` double NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `purchaseReorderInvoice`
--

CREATE TABLE `purchaseReorderInvoice` (
  `id` bigint UNSIGNED NOT NULL,
  `reorderInvoiceId` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `productId` bigint UNSIGNED NOT NULL,
  `productQuantity` int NOT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'true',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `quote`
--

CREATE TABLE `quote` (
  `id` bigint UNSIGNED NOT NULL,
  `quoteOwnerId` bigint UNSIGNED NOT NULL,
  `quoteName` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `quoteDate` datetime DEFAULT NULL,
  `expirationDate` datetime DEFAULT NULL,
  `termsAndConditions` longtext COLLATE utf8mb4_unicode_ci,
  `description` longtext COLLATE utf8mb4_unicode_ci,
  `discount` double(8,2) DEFAULT NULL,
  `totalAmount` double(8,2) DEFAULT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'true',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `quoteProduct`
--

CREATE TABLE `quoteProduct` (
  `id` bigint UNSIGNED NOT NULL,
  `quoteId` bigint UNSIGNED NOT NULL,
  `productId` bigint UNSIGNED NOT NULL,
  `unitPrice` double(8,2) NOT NULL,
  `productQuantity` int NOT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'true',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `returnPurchaseInvoice`
--

CREATE TABLE `returnPurchaseInvoice` (
  `id` bigint UNSIGNED NOT NULL,
  `date` datetime NOT NULL,
  `totalAmount` double NOT NULL,
  `note` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `purchaseInvoiceId` bigint UNSIGNED NOT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'true',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `returnPurchaseInvoiceProduct`
--

CREATE TABLE `returnPurchaseInvoiceProduct` (
  `id` bigint UNSIGNED NOT NULL,
  `invoiceId` bigint UNSIGNED NOT NULL,
  `productId` bigint UNSIGNED DEFAULT NULL,
  `productQuantity` int NOT NULL,
  `productPurchasePrice` double NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `returnSaleInvoice`
--

CREATE TABLE `returnSaleInvoice` (
  `id` bigint UNSIGNED NOT NULL,
  `date` datetime NOT NULL,
  `totalAmount` double NOT NULL,
  `note` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `saleInvoiceId` bigint UNSIGNED NOT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'true',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `returnSaleInvoiceProduct`
--

CREATE TABLE `returnSaleInvoiceProduct` (
  `id` bigint UNSIGNED NOT NULL,
  `invoiceId` bigint UNSIGNED NOT NULL,
  `productId` bigint UNSIGNED DEFAULT NULL,
  `productQuantity` int NOT NULL,
  `productSalePrice` double NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `reviewRating`
--

CREATE TABLE `reviewRating` (
  `id` bigint UNSIGNED NOT NULL,
  `rating` int NOT NULL,
  `review` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `productId` bigint UNSIGNED DEFAULT NULL,
  `customerId` bigint UNSIGNED NOT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'true',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'true',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`id`, `name`, `status`, `created_at`, `updated_at`) VALUES
(1, 'admin', 'true', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(2, 'staff', 'true', '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(3, 'e-commerce', 'true', '2023-11-19 05:15:18', '2023-11-19 05:15:18');

-- --------------------------------------------------------

--
-- Table structure for table `rolePermission`
--

CREATE TABLE `rolePermission` (
  `id` bigint UNSIGNED NOT NULL,
  `roleId` bigint UNSIGNED NOT NULL,
  `permissionId` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `rolePermission`
--

INSERT INTO `rolePermission` (`id`, `roleId`, `permissionId`, `created_at`, `updated_at`) VALUES
(1, 1, 1, '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(2, 1, 2, '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(3, 1, 3, '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(4, 1, 4, '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(5, 1, 5, '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(6, 1, 6, '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(7, 1, 7, '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(8, 1, 8, '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(9, 1, 9, '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(10, 1, 10, '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(11, 1, 11, '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(12, 1, 12, '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(13, 1, 13, '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(14, 1, 14, '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(15, 1, 15, '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(16, 1, 16, '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(17, 1, 17, '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(18, 1, 18, '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(19, 1, 19, '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(20, 1, 20, '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(21, 1, 21, '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(22, 1, 22, '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(23, 1, 23, '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(24, 1, 24, '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(25, 1, 25, '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(26, 1, 26, '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(27, 1, 27, '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(28, 1, 28, '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(29, 1, 29, '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(30, 1, 30, '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(31, 1, 31, '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(32, 1, 32, '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(33, 1, 33, '2023-11-19 05:15:18', '2023-11-19 05:15:18'),
(34, 1, 34, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(35, 1, 35, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(36, 1, 36, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(37, 1, 37, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(38, 1, 38, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(39, 1, 39, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(40, 1, 40, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(41, 1, 41, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(42, 1, 42, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(43, 1, 43, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(44, 1, 44, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(45, 1, 45, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(46, 1, 46, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(47, 1, 47, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(48, 1, 48, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(49, 1, 49, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(50, 1, 50, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(51, 1, 51, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(52, 1, 52, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(53, 1, 53, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(54, 1, 54, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(55, 1, 55, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(56, 1, 56, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(57, 1, 57, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(58, 1, 58, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(59, 1, 59, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(60, 1, 60, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(61, 1, 61, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(62, 1, 62, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(63, 1, 63, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(64, 1, 64, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(65, 1, 65, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(66, 1, 66, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(67, 1, 67, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(68, 1, 68, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(69, 1, 69, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(70, 1, 70, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(71, 1, 71, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(72, 1, 72, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(73, 1, 73, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(74, 1, 74, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(75, 1, 75, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(76, 1, 76, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(77, 1, 77, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(78, 1, 78, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(79, 1, 79, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(80, 1, 80, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(81, 1, 81, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(82, 1, 82, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(83, 1, 83, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(84, 1, 84, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(85, 1, 85, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(86, 1, 86, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(87, 1, 87, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(88, 1, 88, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(89, 1, 89, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(90, 1, 90, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(91, 1, 91, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(92, 1, 92, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(93, 1, 93, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(94, 1, 94, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(95, 1, 95, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(96, 1, 96, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(97, 1, 97, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(98, 1, 98, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(99, 1, 99, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(100, 1, 100, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(101, 1, 101, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(102, 1, 102, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(103, 1, 103, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(104, 1, 104, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(105, 1, 105, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(106, 1, 106, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(107, 1, 107, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(108, 1, 108, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(109, 1, 109, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(110, 1, 110, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(111, 1, 111, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(112, 1, 112, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(113, 1, 113, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(114, 1, 114, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(115, 1, 115, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(116, 1, 116, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(117, 1, 117, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(118, 1, 118, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(119, 1, 119, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(120, 1, 120, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(121, 1, 121, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(122, 1, 122, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(123, 1, 123, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(124, 1, 124, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(125, 1, 125, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(126, 1, 126, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(127, 1, 127, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(128, 1, 128, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(129, 1, 129, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(130, 1, 130, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(131, 1, 131, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(132, 1, 132, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(133, 1, 133, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(134, 1, 134, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(135, 1, 135, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(136, 1, 136, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(137, 1, 137, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(138, 1, 138, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(139, 1, 139, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(140, 1, 140, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(141, 1, 141, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(142, 1, 142, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(143, 1, 143, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(144, 1, 144, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(145, 1, 145, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(146, 1, 146, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(147, 1, 147, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(148, 1, 148, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(149, 1, 149, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(150, 1, 150, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(151, 1, 151, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(152, 1, 152, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(153, 1, 153, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(154, 1, 154, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(155, 1, 155, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(156, 1, 156, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(157, 1, 157, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(158, 1, 158, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(159, 1, 159, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(160, 1, 160, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(161, 1, 161, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(162, 1, 162, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(163, 1, 163, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(164, 1, 164, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(165, 1, 165, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(166, 1, 166, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(167, 1, 167, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(168, 1, 168, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(169, 1, 169, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(170, 1, 170, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(171, 1, 171, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(172, 1, 172, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(173, 1, 173, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(174, 1, 174, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(175, 1, 175, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(176, 1, 176, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(177, 1, 177, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(178, 1, 178, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(179, 1, 179, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(180, 1, 180, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(181, 1, 181, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(182, 1, 182, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(183, 1, 183, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(184, 1, 184, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(185, 1, 185, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(186, 1, 186, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(187, 1, 187, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(188, 1, 188, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(189, 1, 189, '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(190, 1, 190, '2023-11-19 05:15:19', '2023-11-19 05:15:19');

-- --------------------------------------------------------

--
-- Table structure for table `saleInvoice`
--

CREATE TABLE `saleInvoice` (
  `id` bigint UNSIGNED NOT NULL,
  `date` datetime NOT NULL,
  `totalAmount` double NOT NULL,
  `discount` double NOT NULL,
  `paidAmount` double NOT NULL,
  `dueAmount` double NOT NULL,
  `profit` double NOT NULL,
  `customerId` bigint UNSIGNED NOT NULL,
  `userId` bigint UNSIGNED NOT NULL,
  `note` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `orderStatus` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `isHold` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'false',
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'true',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `saleInvoiceProduct`
--

CREATE TABLE `saleInvoiceProduct` (
  `id` bigint UNSIGNED NOT NULL,
  `productId` bigint UNSIGNED NOT NULL,
  `invoiceId` bigint UNSIGNED NOT NULL,
  `productQuantity` int NOT NULL,
  `productSalePrice` double NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `saleInvoiceVat`
--

CREATE TABLE `saleInvoiceVat` (
  `id` bigint UNSIGNED NOT NULL,
  `invoiceId` bigint UNSIGNED NOT NULL,
  `productVatId` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `shift`
--

CREATE TABLE `shift` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `startTime` time NOT NULL,
  `endTime` time NOT NULL,
  `workHour` double DEFAULT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'true',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `subAccount`
--

CREATE TABLE `subAccount` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `accountId` bigint UNSIGNED NOT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'true',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `subAccount`
--

INSERT INTO `subAccount` (`id`, `name`, `accountId`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Cash', 1, 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(2, 'Bank', 1, 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(3, 'Inventory', 1, 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(4, 'Accounts Receivable', 1, 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(5, 'Accounts Payable', 2, 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(6, 'Capital', 3, 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(7, 'Withdrawal', 4, 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(8, 'Sales', 5, 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(9, 'Cost of Sales', 6, 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(10, 'Salary', 6, 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(11, 'Rent', 6, 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(12, 'Utilities', 6, 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(13, 'Discount Earned', 5, 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(14, 'Discount Given', 6, 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(15, 'Tax Received', 7, 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(16, 'Tax Given', 7, 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19');

-- --------------------------------------------------------

--
-- Table structure for table `supplier`
--

CREATE TABLE `supplier` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'true',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `supplier`
--

INSERT INTO `supplier` (`id`, `name`, `phone`, `address`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Samsung', '0518162516', 'Dhaka', 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(2, 'Apple', '0618222516', 'Dhaka', 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19'),
(3, 'Xiaomi', '0188162516', 'Dhaka', 'true', '2023-11-19 05:15:19', '2023-11-19 05:15:19');

-- --------------------------------------------------------

--
-- Table structure for table `transaction`
--

CREATE TABLE `transaction` (
  `id` bigint UNSIGNED NOT NULL,
  `date` datetime NOT NULL,
  `debitId` bigint UNSIGNED NOT NULL,
  `creditId` bigint UNSIGNED NOT NULL,
  `particulars` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `amount` double NOT NULL,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `relatedId` int DEFAULT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'true',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint UNSIGNED NOT NULL,
  `username` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `refreshToken` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `salary` int DEFAULT NULL,
  `idNo` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bloodGroup` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `joinDate` datetime DEFAULT NULL,
  `leaveDate` datetime DEFAULT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'true',
  `roleId` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `designationId` bigint UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `refreshToken`, `email`, `salary`, `idNo`, `phone`, `address`, `bloodGroup`, `image`, `joinDate`, `leaveDate`, `status`, `roleId`, `created_at`, `updated_at`, `designationId`) VALUES
(1, 'admin', '$2y$10$D7478BKBs7.JyHYoIXfVq.JwaaAtf9LlRdVAZvwBbOViocjKcVBaW', NULL, NULL, NULL, '1001', NULL, NULL, NULL, NULL, NULL, NULL, 'true', 1, '2023-11-19 05:15:18', '2023-11-19 05:15:18', NULL),
(2, 'staff', '$2y$10$AoxyfpBNL9xoxMZ7.snC5.j2lEsBBmLj1lVWEJfA0llmyIAMV9nYG', NULL, NULL, NULL, '1002', NULL, NULL, NULL, NULL, NULL, NULL, 'true', 2, '2023-11-19 05:15:18', '2023-11-19 05:15:18', NULL),
(3, 'e-commerce', '$2y$10$cPAXfGP3awwFQ4Of9amzwuQuncWk6w18h.lmdor960FlI.y9Ir.Tq', NULL, NULL, NULL, '1003', NULL, NULL, NULL, NULL, NULL, NULL, 'true', 3, '2023-11-19 05:15:18', '2023-11-19 05:15:18', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `adjustInvoice`
--
ALTER TABLE `adjustInvoice`
  ADD PRIMARY KEY (`id`),
  ADD KEY `adjustinvoice_userid_foreign` (`userId`);

--
-- Indexes for table `adjustInvoiceProduct`
--
ALTER TABLE `adjustInvoiceProduct`
  ADD PRIMARY KEY (`id`),
  ADD KEY `adjustinvoiceproduct_adjustinvoiceid_foreign` (`adjustInvoiceId`),
  ADD KEY `adjustinvoiceproduct_productid_foreign` (`productId`);

--
-- Indexes for table `appSetting`
--
ALTER TABLE `appSetting`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `colors`
--
ALTER TABLE `colors`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `coupon`
--
ALTER TABLE `coupon`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customerPermissions`
--
ALTER TABLE `customerPermissions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `designation`
--
ALTER TABLE `designation`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `designation_name_unique` (`name`);

--
-- Indexes for table `email`
--
ALTER TABLE `email`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `emailConfig`
--
ALTER TABLE `emailConfig`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pageSize`
--
ALTER TABLE `pageSize`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `permission`
--
ALTER TABLE `permission`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `permission_name_unique` (`name`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `product_name_unique` (`name`),
  ADD UNIQUE KEY `product_sku_unique` (`sku`),
  ADD KEY `product_productsubcategoryid_foreign` (`productSubCategoryId`),
  ADD KEY `product_productbrandid_foreign` (`productBrandId`),
  ADD KEY `product_purchaseinvoiceid_foreign` (`purchaseInvoiceId`);

--
-- Indexes for table `productBrand`
--
ALTER TABLE `productBrand`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `productbrand_name_unique` (`name`);

--
-- Indexes for table `productCategory`
--
ALTER TABLE `productCategory`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `productcategory_name_unique` (`name`);

--
-- Indexes for table `productColor`
--
ALTER TABLE `productColor`
  ADD PRIMARY KEY (`id`),
  ADD KEY `productcolor_productid_foreign` (`productId`),
  ADD KEY `productcolor_colorid_foreign` (`colorId`);

--
-- Indexes for table `productSubCategory`
--
ALTER TABLE `productSubCategory`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `productsubcategory_name_unique` (`name`),
  ADD KEY `productsubcategory_productcategoryid_foreign` (`productCategoryId`);

--
-- Indexes for table `productVat`
--
ALTER TABLE `productVat`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `purchaseInvoice`
--
ALTER TABLE `purchaseInvoice`
  ADD PRIMARY KEY (`id`),
  ADD KEY `purchaseinvoice_supplierid_foreign` (`supplierId`);

--
-- Indexes for table `purchaseInvoiceProduct`
--
ALTER TABLE `purchaseInvoiceProduct`
  ADD PRIMARY KEY (`id`),
  ADD KEY `purchaseinvoiceproduct_invoiceid_foreign` (`invoiceId`),
  ADD KEY `purchaseinvoiceproduct_productid_foreign` (`productId`);

--
-- Indexes for table `purchaseReorderInvoice`
--
ALTER TABLE `purchaseReorderInvoice`
  ADD PRIMARY KEY (`id`),
  ADD KEY `purchasereorderinvoice_productid_foreign` (`productId`);

--
-- Indexes for table `quote`
--
ALTER TABLE `quote`
  ADD PRIMARY KEY (`id`),
  ADD KEY `quote_quoteownerid_foreign` (`quoteOwnerId`);

--
-- Indexes for table `quoteProduct`
--
ALTER TABLE `quoteProduct`
  ADD PRIMARY KEY (`id`),
  ADD KEY `quoteproduct_quoteid_foreign` (`quoteId`),
  ADD KEY `quoteproduct_productid_foreign` (`productId`);

--
-- Indexes for table `returnPurchaseInvoice`
--
ALTER TABLE `returnPurchaseInvoice`
  ADD PRIMARY KEY (`id`),
  ADD KEY `returnpurchaseinvoice_purchaseinvoiceid_foreign` (`purchaseInvoiceId`);

--
-- Indexes for table `returnPurchaseInvoiceProduct`
--
ALTER TABLE `returnPurchaseInvoiceProduct`
  ADD PRIMARY KEY (`id`),
  ADD KEY `returnpurchaseinvoiceproduct_invoiceid_foreign` (`invoiceId`),
  ADD KEY `returnpurchaseinvoiceproduct_productid_foreign` (`productId`);

--
-- Indexes for table `returnSaleInvoice`
--
ALTER TABLE `returnSaleInvoice`
  ADD PRIMARY KEY (`id`),
  ADD KEY `returnsaleinvoice_saleinvoiceid_foreign` (`saleInvoiceId`);

--
-- Indexes for table `returnSaleInvoiceProduct`
--
ALTER TABLE `returnSaleInvoiceProduct`
  ADD PRIMARY KEY (`id`),
  ADD KEY `returnsaleinvoiceproduct_invoiceid_foreign` (`invoiceId`),
  ADD KEY `returnsaleinvoiceproduct_productid_foreign` (`productId`);

--
-- Indexes for table `reviewRating`
--
ALTER TABLE `reviewRating`
  ADD PRIMARY KEY (`id`),
  ADD KEY `reviewrating_productid_foreign` (`productId`),
  ADD KEY `reviewrating_customerid_foreign` (`customerId`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `rolePermission`
--
ALTER TABLE `rolePermission`
  ADD PRIMARY KEY (`id`),
  ADD KEY `rolepermission_roleid_foreign` (`roleId`),
  ADD KEY `rolepermission_permissionid_foreign` (`permissionId`);

--
-- Indexes for table `saleInvoice`
--
ALTER TABLE `saleInvoice`
  ADD PRIMARY KEY (`id`),
  ADD KEY `saleinvoice_customerid_foreign` (`customerId`),
  ADD KEY `saleinvoice_userid_foreign` (`userId`);

--
-- Indexes for table `saleInvoiceProduct`
--
ALTER TABLE `saleInvoiceProduct`
  ADD PRIMARY KEY (`id`),
  ADD KEY `saleinvoiceproduct_productid_foreign` (`productId`),
  ADD KEY `saleinvoiceproduct_invoiceid_foreign` (`invoiceId`);

--
-- Indexes for table `saleInvoiceVat`
--
ALTER TABLE `saleInvoiceVat`
  ADD PRIMARY KEY (`id`),
  ADD KEY `saleinvoicevat_invoiceid_foreign` (`invoiceId`),
  ADD KEY `saleinvoicevat_productvatid_foreign` (`productVatId`);

--
-- Indexes for table `shift`
--
ALTER TABLE `shift`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `shift_name_unique` (`name`);

--
-- Indexes for table `subAccount`
--
ALTER TABLE `subAccount`
  ADD PRIMARY KEY (`id`),
  ADD KEY `subaccount_accountid_foreign` (`accountId`);

--
-- Indexes for table `supplier`
--
ALTER TABLE `supplier`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `supplier_phone_unique` (`phone`);

--
-- Indexes for table `transaction`
--
ALTER TABLE `transaction`
  ADD PRIMARY KEY (`id`),
  ADD KEY `transaction_debitid_foreign` (`debitId`),
  ADD KEY `transaction_creditid_foreign` (`creditId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_username_unique` (`username`),
  ADD UNIQUE KEY `users_idno_unique` (`idNo`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD KEY `users_roleid_foreign` (`roleId`),
  ADD KEY `users_designationid_foreign` (`designationId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `account`
--
ALTER TABLE `account`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `adjustInvoice`
--
ALTER TABLE `adjustInvoice`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `adjustInvoiceProduct`
--
ALTER TABLE `adjustInvoiceProduct`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `appSetting`
--
ALTER TABLE `appSetting`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `colors`
--
ALTER TABLE `colors`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `coupon`
--
ALTER TABLE `coupon`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `customerPermissions`
--
ALTER TABLE `customerPermissions`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `designation`
--
ALTER TABLE `designation`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `email`
--
ALTER TABLE `email`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `emailConfig`
--
ALTER TABLE `emailConfig`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `pageSize`
--
ALTER TABLE `pageSize`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `permission`
--
ALTER TABLE `permission`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=191;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `productBrand`
--
ALTER TABLE `productBrand`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `productCategory`
--
ALTER TABLE `productCategory`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `productColor`
--
ALTER TABLE `productColor`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `productSubCategory`
--
ALTER TABLE `productSubCategory`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `productVat`
--
ALTER TABLE `productVat`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `purchaseInvoice`
--
ALTER TABLE `purchaseInvoice`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `purchaseInvoiceProduct`
--
ALTER TABLE `purchaseInvoiceProduct`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `purchaseReorderInvoice`
--
ALTER TABLE `purchaseReorderInvoice`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `quote`
--
ALTER TABLE `quote`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `quoteProduct`
--
ALTER TABLE `quoteProduct`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `returnPurchaseInvoice`
--
ALTER TABLE `returnPurchaseInvoice`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `returnPurchaseInvoiceProduct`
--
ALTER TABLE `returnPurchaseInvoiceProduct`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `returnSaleInvoice`
--
ALTER TABLE `returnSaleInvoice`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `returnSaleInvoiceProduct`
--
ALTER TABLE `returnSaleInvoiceProduct`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `reviewRating`
--
ALTER TABLE `reviewRating`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `rolePermission`
--
ALTER TABLE `rolePermission`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=191;

--
-- AUTO_INCREMENT for table `saleInvoice`
--
ALTER TABLE `saleInvoice`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `saleInvoiceProduct`
--
ALTER TABLE `saleInvoiceProduct`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `saleInvoiceVat`
--
ALTER TABLE `saleInvoiceVat`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `shift`
--
ALTER TABLE `shift`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `subAccount`
--
ALTER TABLE `subAccount`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `supplier`
--
ALTER TABLE `supplier`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `transaction`
--
ALTER TABLE `transaction`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `adjustInvoice`
--
ALTER TABLE `adjustInvoice`
  ADD CONSTRAINT `adjustinvoice_userid_foreign` FOREIGN KEY (`userId`) REFERENCES `users` (`id`);

--
-- Constraints for table `adjustInvoiceProduct`
--
ALTER TABLE `adjustInvoiceProduct`
  ADD CONSTRAINT `adjustinvoiceproduct_adjustinvoiceid_foreign` FOREIGN KEY (`adjustInvoiceId`) REFERENCES `adjustInvoice` (`id`),
  ADD CONSTRAINT `adjustinvoiceproduct_productid_foreign` FOREIGN KEY (`productId`) REFERENCES `product` (`id`);

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_productbrandid_foreign` FOREIGN KEY (`productBrandId`) REFERENCES `productBrand` (`id`),
  ADD CONSTRAINT `product_productsubcategoryid_foreign` FOREIGN KEY (`productSubCategoryId`) REFERENCES `productSubCategory` (`id`),
  ADD CONSTRAINT `product_purchaseinvoiceid_foreign` FOREIGN KEY (`purchaseInvoiceId`) REFERENCES `purchaseInvoice` (`id`);

--
-- Constraints for table `productColor`
--
ALTER TABLE `productColor`
  ADD CONSTRAINT `productcolor_colorid_foreign` FOREIGN KEY (`colorId`) REFERENCES `colors` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `productcolor_productid_foreign` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `productSubCategory`
--
ALTER TABLE `productSubCategory`
  ADD CONSTRAINT `productsubcategory_productcategoryid_foreign` FOREIGN KEY (`productCategoryId`) REFERENCES `productCategory` (`id`);

--
-- Constraints for table `purchaseInvoice`
--
ALTER TABLE `purchaseInvoice`
  ADD CONSTRAINT `purchaseinvoice_supplierid_foreign` FOREIGN KEY (`supplierId`) REFERENCES `supplier` (`id`);

--
-- Constraints for table `purchaseInvoiceProduct`
--
ALTER TABLE `purchaseInvoiceProduct`
  ADD CONSTRAINT `purchaseinvoiceproduct_invoiceid_foreign` FOREIGN KEY (`invoiceId`) REFERENCES `purchaseInvoice` (`id`),
  ADD CONSTRAINT `purchaseinvoiceproduct_productid_foreign` FOREIGN KEY (`productId`) REFERENCES `product` (`id`);

--
-- Constraints for table `purchaseReorderInvoice`
--
ALTER TABLE `purchaseReorderInvoice`
  ADD CONSTRAINT `purchasereorderinvoice_productid_foreign` FOREIGN KEY (`productId`) REFERENCES `product` (`id`);

--
-- Constraints for table `quote`
--
ALTER TABLE `quote`
  ADD CONSTRAINT `quote_quoteownerid_foreign` FOREIGN KEY (`quoteOwnerId`) REFERENCES `users` (`id`);

--
-- Constraints for table `quoteProduct`
--
ALTER TABLE `quoteProduct`
  ADD CONSTRAINT `quoteproduct_productid_foreign` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `quoteproduct_quoteid_foreign` FOREIGN KEY (`quoteId`) REFERENCES `quote` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `returnPurchaseInvoice`
--
ALTER TABLE `returnPurchaseInvoice`
  ADD CONSTRAINT `returnpurchaseinvoice_purchaseinvoiceid_foreign` FOREIGN KEY (`purchaseInvoiceId`) REFERENCES `purchaseInvoice` (`id`);

--
-- Constraints for table `returnPurchaseInvoiceProduct`
--
ALTER TABLE `returnPurchaseInvoiceProduct`
  ADD CONSTRAINT `returnpurchaseinvoiceproduct_invoiceid_foreign` FOREIGN KEY (`invoiceId`) REFERENCES `returnPurchaseInvoice` (`id`),
  ADD CONSTRAINT `returnpurchaseinvoiceproduct_productid_foreign` FOREIGN KEY (`productId`) REFERENCES `product` (`id`);

--
-- Constraints for table `returnSaleInvoice`
--
ALTER TABLE `returnSaleInvoice`
  ADD CONSTRAINT `returnsaleinvoice_saleinvoiceid_foreign` FOREIGN KEY (`saleInvoiceId`) REFERENCES `saleInvoice` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `returnSaleInvoiceProduct`
--
ALTER TABLE `returnSaleInvoiceProduct`
  ADD CONSTRAINT `returnsaleinvoiceproduct_invoiceid_foreign` FOREIGN KEY (`invoiceId`) REFERENCES `returnSaleInvoice` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `returnsaleinvoiceproduct_productid_foreign` FOREIGN KEY (`productId`) REFERENCES `product` (`id`);

--
-- Constraints for table `reviewRating`
--
ALTER TABLE `reviewRating`
  ADD CONSTRAINT `reviewrating_customerid_foreign` FOREIGN KEY (`customerId`) REFERENCES `customer` (`id`),
  ADD CONSTRAINT `reviewrating_productid_foreign` FOREIGN KEY (`productId`) REFERENCES `product` (`id`);

--
-- Constraints for table `rolePermission`
--
ALTER TABLE `rolePermission`
  ADD CONSTRAINT `rolepermission_permissionid_foreign` FOREIGN KEY (`permissionId`) REFERENCES `permission` (`id`),
  ADD CONSTRAINT `rolepermission_roleid_foreign` FOREIGN KEY (`roleId`) REFERENCES `role` (`id`);

--
-- Constraints for table `saleInvoice`
--
ALTER TABLE `saleInvoice`
  ADD CONSTRAINT `saleinvoice_customerid_foreign` FOREIGN KEY (`customerId`) REFERENCES `customer` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `saleinvoice_userid_foreign` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `saleInvoiceProduct`
--
ALTER TABLE `saleInvoiceProduct`
  ADD CONSTRAINT `saleinvoiceproduct_invoiceid_foreign` FOREIGN KEY (`invoiceId`) REFERENCES `saleInvoice` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `saleinvoiceproduct_productid_foreign` FOREIGN KEY (`productId`) REFERENCES `product` (`id`);

--
-- Constraints for table `saleInvoiceVat`
--
ALTER TABLE `saleInvoiceVat`
  ADD CONSTRAINT `saleinvoicevat_invoiceid_foreign` FOREIGN KEY (`invoiceId`) REFERENCES `saleInvoice` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `saleinvoicevat_productvatid_foreign` FOREIGN KEY (`productVatId`) REFERENCES `productVat` (`id`);

--
-- Constraints for table `subAccount`
--
ALTER TABLE `subAccount`
  ADD CONSTRAINT `subaccount_accountid_foreign` FOREIGN KEY (`accountId`) REFERENCES `account` (`id`);

--
-- Constraints for table `transaction`
--
ALTER TABLE `transaction`
  ADD CONSTRAINT `transaction_creditid_foreign` FOREIGN KEY (`creditId`) REFERENCES `subAccount` (`id`),
  ADD CONSTRAINT `transaction_debitid_foreign` FOREIGN KEY (`debitId`) REFERENCES `subAccount` (`id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_designationid_foreign` FOREIGN KEY (`designationId`) REFERENCES `designation` (`id`),
  ADD CONSTRAINT `users_roleid_foreign` FOREIGN KEY (`roleId`) REFERENCES `role` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
