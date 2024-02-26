-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 26, 2024 at 01:43 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `invent`
--

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

CREATE TABLE `account` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`id`, `name`, `type`, `created_at`, `updated_at`) VALUES
(1, 'Asset', 'Asset', '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(2, 'Liability', 'Liability', '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(3, 'Capital', 'Owner\'s Equity', '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(4, 'Withdrawal', 'Owner\'s Equity', '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(5, 'Revenue', 'Owner\'s Equity', '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(6, 'Expense', 'Owner\'s Equity', '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(7, 'vat', 'Govt.', '2024-02-17 12:53:24', '2024-02-17 12:53:24');

-- --------------------------------------------------------

--
-- Table structure for table `adjustinvoice`
--

CREATE TABLE `adjustinvoice` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `note` varchar(255) DEFAULT NULL,
  `userId` bigint(20) UNSIGNED NOT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp(),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `adjustinvoiceproduct`
--

CREATE TABLE `adjustinvoiceproduct` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `adjustInvoiceId` bigint(20) UNSIGNED NOT NULL,
  `productId` bigint(20) UNSIGNED DEFAULT NULL,
  `adjustQuantity` int(11) NOT NULL,
  `adjustType` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `appsetting`
--

CREATE TABLE `appsetting` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `companyName` varchar(255) NOT NULL,
  `tagLine` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `website` varchar(255) NOT NULL,
  `footer` varchar(255) NOT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `appsetting`
--

INSERT INTO `appsetting` (`id`, `companyName`, `tagLine`, `address`, `phone`, `email`, `website`, `footer`, `logo`, `created_at`, `updated_at`) VALUES
(1, 'Company Name', 'Tag Line', 'Address', '2345678', 'company@gmail.com', 'Website', 'Footer', NULL, '2024-02-17 12:53:24', '2024-02-17 12:53:24');

-- --------------------------------------------------------

--
-- Table structure for table `colors`
--

CREATE TABLE `colors` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `colorCode` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'true',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `colors`
--

INSERT INTO `colors` (`id`, `name`, `colorCode`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Red', '#FF0000', 'true', '2024-02-17 12:53:25', '2024-02-17 12:53:25'),
(2, 'Green', '#008000', 'true', '2024-02-17 12:53:25', '2024-02-17 12:53:25'),
(3, 'Blue', '#0000FF', 'true', '2024-02-17 12:53:25', '2024-02-17 12:53:25'),
(4, 'Yellow', '#FFFF00', 'true', '2024-02-17 12:53:25', '2024-02-17 12:53:25'),
(5, 'Black', '#000000', 'true', '2024-02-17 12:53:25', '2024-02-17 12:53:25'),
(6, 'White', '#FFFFFF', 'true', '2024-02-17 12:53:25', '2024-02-17 12:53:25'),
(7, 'Orange', '#FFA500', 'true', '2024-02-17 12:53:25', '2024-02-17 12:53:25'),
(8, 'Purple', '#800080', 'true', '2024-02-17 12:53:25', '2024-02-17 12:53:25'),
(9, 'Pink', '#FFC0CB', 'true', '2024-02-17 12:53:25', '2024-02-17 12:53:25'),
(10, 'Brown', '#A52A2A', 'true', '2024-02-17 12:53:25', '2024-02-17 12:53:25'),
(11, 'Grey', '#808080', 'true', '2024-02-17 12:53:25', '2024-02-17 12:53:25'),
(12, 'Gold', '#FFD700', 'true', '2024-02-17 12:53:25', '2024-02-17 12:53:25'),
(13, 'Silver', '#C0C0C0', 'true', '2024-02-17 12:53:25', '2024-02-17 12:53:25'),
(14, 'Cyan', '#00FFFF', 'true', '2024-02-17 12:53:25', '2024-02-17 12:53:25'),
(15, 'Magenta', '#FF00FF', 'true', '2024-02-17 12:53:25', '2024-02-17 12:53:25'),
(16, 'Lime', '#00FF00', 'true', '2024-02-17 12:53:25', '2024-02-17 12:53:25'),
(17, 'Teal', '#008080', 'true', '2024-02-17 12:53:25', '2024-02-17 12:53:25'),
(18, 'Maroon', '#800000', 'true', '2024-02-17 12:53:25', '2024-02-17 12:53:25'),
(19, 'Navy', '#000080', 'true', '2024-02-17 12:53:25', '2024-02-17 12:53:25'),
(20, 'Olive', '#808000', 'true', '2024-02-17 12:53:25', '2024-02-17 12:53:25');

-- --------------------------------------------------------

--
-- Table structure for table `coupon`
--

CREATE TABLE `coupon` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `couponCode` varchar(255) DEFAULT NULL,
  `type` enum('flat','percentage') NOT NULL DEFAULT 'percentage',
  `value` double NOT NULL,
  `startDate` datetime NOT NULL,
  `endDate` datetime NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'true',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'true',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`id`, `name`, `email`, `phone`, `address`, `password`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Walking Customer', 'test@gmail.com', '1234567890', '123 Main St', '$2y$10$DqAKIaldcCGjaYceD8.9DOit9gF9OJ1N5TKYwpHtoIcZtMK2Gk8ci', 'true', '2024-02-17 12:53:24', '2024-02-17 14:52:06');

-- --------------------------------------------------------

--
-- Table structure for table `customerpermissions`
--

CREATE TABLE `customerpermissions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user` varchar(255) NOT NULL,
  `permissions` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'true',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `customerpermissions`
--

INSERT INTO `customerpermissions` (`id`, `user`, `permissions`, `status`, `created_at`, `updated_at`) VALUES
(1, 'customer', 'read-product_details', 'true', '2024-02-17 12:53:25', '2024-02-17 12:53:25'),
(2, 'customer', 'read-profile', 'true', '2024-02-17 12:53:25', '2024-02-17 12:53:25'),
(3, 'customer', 'update-profile', 'true', '2024-02-17 12:53:25', '2024-02-17 12:53:25'),
(4, 'customer', 'create-purchase', 'true', '2024-02-17 12:53:25', '2024-02-17 12:53:25'),
(5, 'customer', 'read-purchase', 'true', '2024-02-17 12:53:25', '2024-02-17 12:53:25'),
(6, 'customer', 'update-purchase', 'true', '2024-02-17 12:53:25', '2024-02-17 12:53:25');

-- --------------------------------------------------------

--
-- Table structure for table `designation`
--

CREATE TABLE `designation` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'true',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `designation`
--

INSERT INTO `designation` (`id`, `name`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Manager', 'true', '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(2, 'employee', 'true', '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(3, 'Salesman', 'true', '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(4, 'Accountant', 'true', '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(5, 'Storekeeper', 'true', '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(6, 'Driver', 'true', '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(7, 'Cleaner', 'true', '2024-02-17 12:53:24', '2024-02-17 12:53:24');

-- --------------------------------------------------------

--
-- Table structure for table `email`
--

CREATE TABLE `email` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `senderEmail` varchar(255) NOT NULL,
  `receiverEmail` varchar(255) NOT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `body` longtext DEFAULT NULL,
  `emailStatus` varchar(255) DEFAULT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'true',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `emailconfig`
--

CREATE TABLE `emailconfig` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `emailConfigName` varchar(255) NOT NULL,
  `emailHost` varchar(255) NOT NULL,
  `emailPort` varchar(255) NOT NULL,
  `emailUser` varchar(255) NOT NULL,
  `emailPass` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'true',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `emailconfig`
--

INSERT INTO `emailconfig` (`id`, `emailConfigName`, `emailHost`, `emailPort`, `emailUser`, `emailPass`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Omega', 'server.vibd.me', '465', 'no-reply@osapp.net', 'password', 'true', '2024-02-17 12:53:24', '2024-02-17 12:53:24');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
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
-- Table structure for table `pagesize`
--

CREATE TABLE `pagesize` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `pageSizeName` varchar(255) NOT NULL,
  `width` double NOT NULL,
  `height` double NOT NULL,
  `unit` varchar(255) NOT NULL DEFAULT 'inches',
  `status` varchar(255) NOT NULL DEFAULT 'true',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `pagesize`
--

INSERT INTO `pagesize` (`id`, `pageSizeName`, `width`, `height`, `unit`, `status`, `created_at`, `updated_at`) VALUES
(1, 'A4', 8.3, 11.7, 'inches', 'true', '2024-02-17 12:53:25', '2024-02-17 12:53:25');

-- --------------------------------------------------------

--
-- Table structure for table `permission`
--

CREATE TABLE `permission` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `permission`
--

INSERT INTO `permission` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'create-paymentPurchaseInvoice', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(2, 'readAll-paymentPurchaseInvoice', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(3, 'readSingle-paymentPurchaseInvoice', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(4, 'update-paymentPurchaseInvoice', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(5, 'delete-paymentPurchaseInvoice', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(6, 'create-paymentSaleInvoice', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(7, 'readAll-paymentSaleInvoice', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(8, 'readSingle-paymentSaleInvoice', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(9, 'update-paymentSaleInvoice', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(10, 'delete-paymentSaleInvoice', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(11, 'create-returnSaleInvoice', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(12, 'readAll-returnSaleInvoice', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(13, 'readSingle-returnSaleInvoice', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(14, 'update-returnSaleInvoice', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(15, 'delete-returnSaleInvoice', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(16, 'create-purchaseInvoice', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(17, 'readAll-purchaseInvoice', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(18, 'readSingle-purchaseInvoice', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(19, 'update-purchaseInvoice', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(20, 'delete-purchaseInvoice', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(21, 'create-returnPurchaseInvoice', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(22, 'readAll-returnPurchaseInvoice', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(23, 'readSingle-returnPurchaseInvoice', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(24, 'update-returnPurchaseInvoice', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(25, 'delete-returnPurchaseInvoice', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(26, 'create-rolePermission', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(27, 'readAll-rolePermission', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(28, 'readSingle-rolePermission', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(29, 'update-rolePermission', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(30, 'delete-rolePermission', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(31, 'create-saleInvoice', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(32, 'readAll-saleInvoice', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(33, 'readSingle-saleInvoice', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(34, 'update-saleInvoice', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(35, 'delete-saleInvoice', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(36, 'create-transaction', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(37, 'readAll-transaction', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(38, 'readSingle-transaction', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(39, 'update-transaction', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(40, 'delete-transaction', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(41, 'create-permission', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(42, 'readAll-permission', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(43, 'readSingle-permission', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(44, 'update-permission', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(45, 'delete-permission', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(46, 'create-dashboard', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(47, 'readAll-dashboard', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(48, 'readSingle-dashboard', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(49, 'update-dashboard', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(50, 'delete-dashboard', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(51, 'create-customer', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(52, 'readAll-customer', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(53, 'readSingle-customer', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(54, 'update-customer', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(55, 'delete-customer', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(56, 'create-supplier', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(57, 'readAll-supplier', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(58, 'readSingle-supplier', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(59, 'update-supplier', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(60, 'delete-supplier', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(61, 'create-product', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(62, 'readAll-product', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(63, 'readSingle-product', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(64, 'update-product', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(65, 'delete-product', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(66, 'create-user', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(67, 'readAll-user', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(68, 'readSingle-user', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(69, 'update-user', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(70, 'delete-user', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(71, 'create-role', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(72, 'readAll-role', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(73, 'readSingle-role', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(74, 'update-role', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(75, 'delete-role', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(76, 'create-designation', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(77, 'readAll-designation', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(78, 'readSingle-designation', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(79, 'update-designation', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(80, 'delete-designation', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(81, 'create-productCategory', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(82, 'readAll-productCategory', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(83, 'readSingle-productCategory', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(84, 'update-productCategory', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(85, 'delete-productCategory', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(86, 'create-account', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(87, 'readAll-account', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(88, 'readSingle-account', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(89, 'update-account', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(90, 'delete-account', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(91, 'create-setting', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(92, 'readAll-setting', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(93, 'readSingle-setting', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(94, 'update-setting', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(95, 'delete-setting', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(96, 'create-productSubCategory', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(97, 'readAll-productSubCategory', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(98, 'readSingle-productSubCategory', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(99, 'update-productSubCategory', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(100, 'delete-productSubCategory', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(101, 'create-productBrand', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(102, 'readAll-productBrand', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(103, 'readSingle-productBrand', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(104, 'update-productBrand', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(105, 'delete-productBrand', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(106, 'create-email', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(107, 'readAll-email', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(108, 'readSingle-email', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(109, 'update-email', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(110, 'delete-email', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(111, 'create-adjust', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(112, 'readAll-adjust', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(113, 'readSingle-adjust', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(114, 'update-adjust', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(115, 'delete-adjust', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(116, 'create-warehouse', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(117, 'readAll-warehouse', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(118, 'readSingle-warehouse', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(119, 'update-warehouse', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(120, 'delete-warehouse', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(121, 'create-stock', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(122, 'readAll-stock', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(123, 'readSingle-stock', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(124, 'update-stock', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(125, 'delete-stock', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(126, 'create-attribute', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(127, 'readAll-attribute', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(128, 'readSingle-attribute', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(129, 'update-attribute', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(130, 'delete-attribute', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(131, 'create-color', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(132, 'readAll-color', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(133, 'readSingle-color', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(134, 'update-color', '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(135, 'delete-color', '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(136, 'create-meta', '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(137, 'readAll-meta', '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(138, 'readSingle-meta', '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(139, 'update-meta', '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(140, 'delete-meta', '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(141, 'create-transfer', '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(142, 'readAll-transfer', '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(143, 'readSingle-transfer', '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(144, 'update-transfer', '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(145, 'delete-transfer', '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(146, 'create-review', '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(147, 'readAll-review', '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(148, 'readSingle-review', '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(149, 'update-review', '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(150, 'delete-review', '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(151, 'create-slider', '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(152, 'readAll-slider', '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(153, 'readSingle-slider', '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(154, 'update-slider', '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(155, 'delete-slider', '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(156, 'create-shoppingCart', '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(157, 'readAll-shoppingCart', '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(158, 'readSingle-shoppingCart', '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(159, 'update-shoppingCart', '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(160, 'delete-shoppingCart', '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(161, 'create-vat', '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(162, 'readAll-vat', '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(163, 'readSingle-vat', '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(164, 'update-vat', '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(165, 'delete-vat', '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(166, 'create-reorderQuantity', '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(167, 'readAll-reorderQuantity', '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(168, 'readSingle-reorderQuantity', '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(169, 'update-reorderQuantity', '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(170, 'delete-reorderQuantity', '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(171, 'create-coupon', '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(172, 'readAll-coupon', '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(173, 'readSingle-coupon', '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(174, 'update-coupon', '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(175, 'delete-coupon', '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(176, 'create-purchaseReorderInvoice', '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(177, 'readAll-purchaseReorderInvoice', '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(178, 'readSingle-purchaseReorderInvoice', '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(179, 'update-purchaseReorderInvoice', '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(180, 'delete-purchaseReorderInvoice', '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(181, 'create-pageSize', '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(182, 'readAll-pageSize', '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(183, 'readSingle-pageSize', '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(184, 'update-pageSize', '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(185, 'delete-pageSize', '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(186, 'create-quote', '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(187, 'readAll-quote', '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(188, 'readSingle-quote', '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(189, 'update-quote', '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(190, 'delete-quote', '2024-02-17 12:53:23', '2024-02-17 12:53:23');

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
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
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `productThumbnailImage` varchar(255) DEFAULT NULL,
  `productSubCategoryId` bigint(20) UNSIGNED DEFAULT NULL,
  `productBrandId` bigint(20) UNSIGNED DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `sku` varchar(255) DEFAULT NULL,
  `productQuantity` int(11) NOT NULL,
  `productSalePrice` double DEFAULT NULL,
  `productPurchasePrice` double DEFAULT NULL,
  `unitType` varchar(255) DEFAULT NULL,
  `unitMeasurement` double DEFAULT NULL,
  `reorderQuantity` int(11) DEFAULT NULL,
  `productVat` double DEFAULT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'true',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `purchaseInvoiceId` bigint(20) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `name`, `productThumbnailImage`, `productSubCategoryId`, `productBrandId`, `description`, `sku`, `productQuantity`, `productSalePrice`, `productPurchasePrice`, `unitType`, `unitMeasurement`, `reorderQuantity`, `productVat`, `status`, `created_at`, `updated_at`, `purchaseInvoiceId`) VALUES
(1, 'Samsung Galaxy S21 Ultra 5G', 'https://www.gizmochina.com/wp-content/uploads/2021/01/Samsung-Galaxy-S21-Ultra-5G-1.jpg', 1, 1, 'Samsung Galaxy S21 Ultra 5G', '123-433-365', 108, 10000, 9000, 'Piece', 1, 5, 10, 'true', '2024-02-17 12:53:25', '2024-02-17 17:46:35', NULL),
(2, 'apple iphone 12 pro max', 'https://www.gizmochina.com/wp-content/uploads/2021/apple-iphone-12-pro-max-1.jpg', 1, 2, 'apple iphone 12 pro max', '123-953-365', -18, 1000, 900, 'Piece', 1, 5, 10, 'true', '2024-02-17 12:53:25', '2024-02-17 17:35:07', NULL),
(3, 'Test', '8e80b9376e4150457638053095ce6e60bf8f2f9bddccfc8bb036ba0c890300b9.jpeg', 19, 5, NULL, '1234', 100, 200, 152, 'pc', 1, 50, 0, 'true', '2024-02-17 14:56:30', '2024-02-17 14:56:30', NULL),
(4, 'Test2', '1b4ce16f5d7e1cb99472734b4feba798d34cf3886b47e0a293bde3dbb2c3b21b.jpeg', 16, 8, NULL, '345', 100, 20000, 1222, 'pc', 1, 19, 0, 'false', '2024-02-17 14:59:04', '2024-02-17 15:10:14', NULL),
(5, 'Test3', '3bf8ffa6a257c6822987cf0185e1b165d41014fbe0e1c56e3816158016c49753.jpeg', 26, 9, NULL, '11', 100, 200, 100, 'pc', 1, 20, 1, 'true', '2024-02-17 15:11:17', '2024-02-17 15:11:17', NULL),
(6, 'tes4', 'fdbe69fcd45051e4308ee01ea335c0bcdbeca8b8aae51fa3e37cb36c7d522a69.jpeg', 26, 7, NULL, 'undefined', 111, 222, 111, 'pc', 1, 20, 0, 'true', '2024-02-17 15:18:38', '2024-02-17 15:18:38', NULL),
(10, 'aka', '9e5d6fd9ed8b5a0efe483dfb765b5cc56c2f7dbaed4769852cf9aaddf6c780ca.jpeg', 26, 6, NULL, '222', 100, 149, 120, 'pc', 1, 0, 0, 'true', '2024-02-17 15:56:41', '2024-02-17 15:56:41', NULL),
(13, 'wwww', '088bb014d5f8af826d17b9577400327ff33dde035db6dc371725c7f2885bec47.jpeg', 4, 14, NULL, '123456', 123, 148, 100, 'pc', 1, 0, 0, 'true', '2024-02-17 16:03:33', '2024-02-17 16:03:33', NULL),
(15, 'ww', '43bdacecab17810c2bfa3baacb81d79d076033703a314ed3d710a3329c2ee284.jpeg', 16, 14, NULL, '{Date.now().toString()}', 111, 3, 1, 'pc', 1, 0, 0, 'true', '2024-02-17 16:05:57', '2024-02-17 16:05:57', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `productbrand`
--

CREATE TABLE `productbrand` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'true',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `productbrand`
--

INSERT INTO `productbrand` (`id`, `name`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Samsung', 'true', '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(2, 'Apple', 'true', '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(3, 'Huawei', 'true', '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(4, 'Xiaomi', 'true', '2024-02-17 12:53:25', '2024-02-17 12:53:25'),
(5, 'Oppo', 'true', '2024-02-17 12:53:25', '2024-02-17 12:53:25'),
(6, 'Dell', 'true', '2024-02-17 12:53:25', '2024-02-17 12:53:25'),
(7, 'HP', 'true', '2024-02-17 12:53:25', '2024-02-17 12:53:25'),
(8, 'Lenovo', 'true', '2024-02-17 12:53:25', '2024-02-17 12:53:25'),
(9, 'Asus', 'true', '2024-02-17 12:53:25', '2024-02-17 12:53:25'),
(10, 'Sony', 'true', '2024-02-17 12:53:25', '2024-02-17 12:53:25'),
(11, 'LG', 'true', '2024-02-17 12:53:25', '2024-02-17 12:53:25'),
(12, 'Panasonic', 'true', '2024-02-17 12:53:25', '2024-02-17 12:53:25'),
(13, 'Philips', 'true', '2024-02-17 12:53:25', '2024-02-17 12:53:25'),
(14, 'Hitachi', 'true', '2024-02-17 12:53:25', '2024-02-17 12:53:25'),
(15, 'Toshiba', 'true', '2024-02-17 12:53:25', '2024-02-17 12:53:25'),
(16, 'Sharp', 'true', '2024-02-17 12:53:25', '2024-02-17 12:53:25');

-- --------------------------------------------------------

--
-- Table structure for table `productcategory`
--

CREATE TABLE `productcategory` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'true',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `productcategory`
--

INSERT INTO `productcategory` (`id`, `name`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Electronics', 'true', '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(2, 'Clothing', 'true', '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(3, 'Grocery', 'true', '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(4, 'Furniture', 'true', '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(5, 'Stationary', 'true', '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(6, 'Sports', 'true', '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(7, 'Books', 'true', '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(8, 'Toys', 'true', '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(9, 'Others', 'true', '2024-02-17 12:53:24', '2024-02-17 12:53:24');

-- --------------------------------------------------------

--
-- Table structure for table `productcolor`
--

CREATE TABLE `productcolor` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `productId` bigint(20) UNSIGNED NOT NULL,
  `colorId` bigint(20) UNSIGNED DEFAULT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'true',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `productcolor`
--

INSERT INTO `productcolor` (`id`, `productId`, `colorId`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 'true', '2024-02-17 12:53:25', '2024-02-17 12:53:25'),
(2, 1, 2, 'true', '2024-02-17 12:53:25', '2024-02-17 12:53:25'),
(3, 1, 3, 'true', '2024-02-17 12:53:25', '2024-02-17 12:53:25'),
(4, 1, 4, 'true', '2024-02-17 12:53:25', '2024-02-17 12:53:25'),
(5, 1, 5, 'true', '2024-02-17 12:53:25', '2024-02-17 12:53:25'),
(6, 2, 1, 'true', '2024-02-17 12:53:25', '2024-02-17 12:53:25'),
(7, 2, 2, 'true', '2024-02-17 12:53:25', '2024-02-17 12:53:25'),
(8, 2, 3, 'true', '2024-02-17 12:53:25', '2024-02-17 12:53:25'),
(9, 2, 4, 'true', '2024-02-17 12:53:25', '2024-02-17 12:53:25'),
(10, 2, 5, 'true', '2024-02-17 12:53:25', '2024-02-17 12:53:25');

-- --------------------------------------------------------

--
-- Table structure for table `productsubcategory`
--

CREATE TABLE `productsubcategory` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `productCategoryId` bigint(20) UNSIGNED DEFAULT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'true',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `productsubcategory`
--

INSERT INTO `productsubcategory` (`id`, `name`, `productCategoryId`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Mobile', 1, 'true', '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(2, 'Laptop', 1, 'true', '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(3, 'Television', 1, 'true', '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(4, 'Camera', 1, 'true', '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(5, 'Headphone', 1, 'true', '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(6, 'Shirt', 2, 'true', '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(7, 'Pant', 2, 'true', '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(8, 'T-Shirt', 2, 'true', '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(9, 'Jeans', 2, 'true', '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(10, 'Shoes', 2, 'true', '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(11, 'Rice', 3, 'true', '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(12, 'Oil', 3, 'true', '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(13, 'Spices', 3, 'true', '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(14, 'Vegetables', 3, 'true', '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(15, 'Fruits', 3, 'true', '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(16, 'Bed', 4, 'true', '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(17, 'Sofa', 4, 'true', '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(18, 'Table', 4, 'true', '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(19, 'Chair', 4, 'true', '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(20, 'Almirah', 4, 'true', '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(21, 'Pen', 5, 'true', '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(22, 'Pencil', 5, 'true', '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(23, 'Notebook', 5, 'true', '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(24, 'Paper', 5, 'true', '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(25, 'Eraser', 5, 'true', '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(26, 'Bat', 6, 'true', '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(27, 'Ball', 6, 'true', '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(28, 'Football', 6, 'true', '2024-02-17 12:53:24', '2024-02-17 12:53:24');

-- --------------------------------------------------------

--
-- Table structure for table `productvat`
--

CREATE TABLE `productvat` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `percentage` double NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'true',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `productvat`
--

INSERT INTO `productvat` (`id`, `title`, `percentage`, `status`, `created_at`, `updated_at`) VALUES
(1, 'standard', 5, 'true', '2024-02-17 12:53:25', '2024-02-17 14:06:14'),
(2, 'import and supply', 15, 'false', '2024-02-17 12:53:25', '2024-02-17 14:06:07'),
(3, 'NO VAT/TAX', 0, 'true', '2024-02-17 14:43:24', '2024-02-17 14:43:24');

-- --------------------------------------------------------

--
-- Table structure for table `purchaseinvoice`
--

CREATE TABLE `purchaseinvoice` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `date` datetime NOT NULL,
  `totalAmount` double NOT NULL,
  `discount` double NOT NULL,
  `paidAmount` double NOT NULL,
  `dueAmount` double NOT NULL,
  `supplierId` bigint(20) UNSIGNED NOT NULL,
  `note` varchar(255) DEFAULT NULL,
  `supplierMemoNo` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `purchaseinvoice`
--

INSERT INTO `purchaseinvoice` (`id`, `date`, `totalAmount`, `discount`, `paidAmount`, `dueAmount`, `supplierId`, `note`, `supplierMemoNo`, `created_at`, `updated_at`) VALUES
(1, '2024-02-17 05:58:29', 9000, 0, 9000, 0, 2, NULL, NULL, '2024-02-17 13:59:14', '2024-02-17 13:59:14'),
(2, '2024-02-17 09:39:08', 900000, 8987, 891013, 0, 1, 'jkkd', '76876', '2024-02-17 17:40:14', '2024-02-17 17:40:14');

-- --------------------------------------------------------

--
-- Table structure for table `purchaseinvoiceproduct`
--

CREATE TABLE `purchaseinvoiceproduct` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `invoiceId` bigint(20) UNSIGNED NOT NULL,
  `productId` bigint(20) UNSIGNED DEFAULT NULL,
  `productQuantity` int(11) NOT NULL,
  `productPurchasePrice` double NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `purchaseinvoiceproduct`
--

INSERT INTO `purchaseinvoiceproduct` (`id`, `invoiceId`, `productId`, `productQuantity`, `productPurchasePrice`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 1, 9000, '2024-02-17 13:59:14', '2024-02-17 13:59:14'),
(2, 2, 1, 100, 9000, '2024-02-17 17:40:14', '2024-02-17 17:40:14');

-- --------------------------------------------------------

--
-- Table structure for table `purchasereorderinvoice`
--

CREATE TABLE `purchasereorderinvoice` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `reorderInvoiceId` varchar(255) NOT NULL,
  `productId` bigint(20) UNSIGNED NOT NULL,
  `productQuantity` int(11) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'true',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `quote`
--

CREATE TABLE `quote` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `quoteOwnerId` bigint(20) UNSIGNED NOT NULL,
  `quoteName` varchar(255) NOT NULL,
  `quoteDate` datetime DEFAULT NULL,
  `expirationDate` datetime DEFAULT NULL,
  `termsAndConditions` longtext DEFAULT NULL,
  `description` longtext DEFAULT NULL,
  `discount` double(8,2) DEFAULT NULL,
  `totalAmount` double(8,2) DEFAULT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'true',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `quoteproduct`
--

CREATE TABLE `quoteproduct` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `quoteId` bigint(20) UNSIGNED NOT NULL,
  `productId` bigint(20) UNSIGNED NOT NULL,
  `unitPrice` double(8,2) NOT NULL,
  `productQuantity` int(11) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'true',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `returnpurchaseinvoice`
--

CREATE TABLE `returnpurchaseinvoice` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `date` datetime NOT NULL,
  `totalAmount` double NOT NULL,
  `note` varchar(255) DEFAULT NULL,
  `purchaseInvoiceId` bigint(20) UNSIGNED NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'true',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `returnpurchaseinvoiceproduct`
--

CREATE TABLE `returnpurchaseinvoiceproduct` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `invoiceId` bigint(20) UNSIGNED NOT NULL,
  `productId` bigint(20) UNSIGNED DEFAULT NULL,
  `productQuantity` int(11) NOT NULL,
  `productPurchasePrice` double NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `returnsaleinvoice`
--

CREATE TABLE `returnsaleinvoice` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `date` datetime NOT NULL,
  `totalAmount` double NOT NULL,
  `note` varchar(255) DEFAULT NULL,
  `saleInvoiceId` bigint(20) UNSIGNED NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'true',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `returnsaleinvoiceproduct`
--

CREATE TABLE `returnsaleinvoiceproduct` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `invoiceId` bigint(20) UNSIGNED NOT NULL,
  `productId` bigint(20) UNSIGNED DEFAULT NULL,
  `productQuantity` int(11) NOT NULL,
  `productSalePrice` double NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `reviewrating`
--

CREATE TABLE `reviewrating` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `rating` int(11) NOT NULL,
  `review` varchar(255) DEFAULT NULL,
  `productId` bigint(20) UNSIGNED DEFAULT NULL,
  `customerId` bigint(20) UNSIGNED NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'true',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'true',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`id`, `name`, `status`, `created_at`, `updated_at`) VALUES
(1, 'admin', 'true', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(2, 'staff', 'true', '2024-02-17 12:53:22', '2024-02-17 12:53:22'),
(3, 'e-commerce', 'true', '2024-02-17 12:53:22', '2024-02-17 12:53:22');

-- --------------------------------------------------------

--
-- Table structure for table `rolepermission`
--

CREATE TABLE `rolepermission` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `roleId` bigint(20) UNSIGNED NOT NULL,
  `permissionId` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `rolepermission`
--

INSERT INTO `rolepermission` (`id`, `roleId`, `permissionId`, `created_at`, `updated_at`) VALUES
(1, 1, 1, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(2, 1, 2, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(3, 1, 3, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(4, 1, 4, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(5, 1, 5, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(6, 1, 6, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(7, 1, 7, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(8, 1, 8, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(9, 1, 9, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(10, 1, 10, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(11, 1, 11, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(12, 1, 12, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(13, 1, 13, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(14, 1, 14, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(15, 1, 15, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(16, 1, 16, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(17, 1, 17, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(18, 1, 18, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(19, 1, 19, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(20, 1, 20, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(21, 1, 21, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(22, 1, 22, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(23, 1, 23, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(24, 1, 24, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(25, 1, 25, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(26, 1, 26, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(27, 1, 27, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(28, 1, 28, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(29, 1, 29, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(30, 1, 30, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(31, 1, 31, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(32, 1, 32, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(33, 1, 33, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(34, 1, 34, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(35, 1, 35, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(36, 1, 36, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(37, 1, 37, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(38, 1, 38, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(39, 1, 39, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(40, 1, 40, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(41, 1, 41, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(42, 1, 42, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(43, 1, 43, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(44, 1, 44, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(45, 1, 45, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(46, 1, 46, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(47, 1, 47, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(48, 1, 48, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(49, 1, 49, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(50, 1, 50, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(51, 1, 51, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(52, 1, 52, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(53, 1, 53, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(54, 1, 54, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(55, 1, 55, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(56, 1, 56, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(57, 1, 57, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(58, 1, 58, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(59, 1, 59, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(60, 1, 60, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(61, 1, 61, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(62, 1, 62, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(63, 1, 63, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(64, 1, 64, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(65, 1, 65, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(66, 1, 66, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(67, 1, 67, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(68, 1, 68, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(69, 1, 69, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(70, 1, 70, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(71, 1, 71, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(72, 1, 72, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(73, 1, 73, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(74, 1, 74, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(75, 1, 75, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(76, 1, 76, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(77, 1, 77, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(78, 1, 78, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(79, 1, 79, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(80, 1, 80, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(81, 1, 81, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(82, 1, 82, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(83, 1, 83, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(84, 1, 84, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(85, 1, 85, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(86, 1, 86, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(87, 1, 87, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(88, 1, 88, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(89, 1, 89, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(90, 1, 90, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(91, 1, 91, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(92, 1, 92, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(93, 1, 93, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(94, 1, 94, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(95, 1, 95, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(96, 1, 96, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(97, 1, 97, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(98, 1, 98, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(99, 1, 99, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(100, 1, 100, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(101, 1, 101, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(102, 1, 102, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(103, 1, 103, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(104, 1, 104, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(105, 1, 105, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(106, 1, 106, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(107, 1, 107, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(108, 1, 108, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(109, 1, 109, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(110, 1, 110, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(111, 1, 111, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(112, 1, 112, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(113, 1, 113, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(114, 1, 114, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(115, 1, 115, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(116, 1, 116, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(117, 1, 117, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(118, 1, 118, '2024-02-17 12:53:23', '2024-02-17 12:53:23'),
(119, 1, 119, '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(120, 1, 120, '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(121, 1, 121, '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(122, 1, 122, '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(123, 1, 123, '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(124, 1, 124, '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(125, 1, 125, '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(126, 1, 126, '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(127, 1, 127, '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(128, 1, 128, '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(129, 1, 129, '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(130, 1, 130, '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(131, 1, 131, '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(132, 1, 132, '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(133, 1, 133, '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(134, 1, 134, '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(135, 1, 135, '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(136, 1, 136, '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(137, 1, 137, '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(138, 1, 138, '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(139, 1, 139, '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(140, 1, 140, '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(141, 1, 141, '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(142, 1, 142, '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(143, 1, 143, '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(144, 1, 144, '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(145, 1, 145, '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(146, 1, 146, '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(147, 1, 147, '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(148, 1, 148, '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(149, 1, 149, '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(150, 1, 150, '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(151, 1, 151, '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(152, 1, 152, '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(153, 1, 153, '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(154, 1, 154, '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(155, 1, 155, '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(156, 1, 156, '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(157, 1, 157, '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(158, 1, 158, '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(159, 1, 159, '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(160, 1, 160, '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(161, 1, 161, '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(162, 1, 162, '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(163, 1, 163, '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(164, 1, 164, '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(165, 1, 165, '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(166, 1, 166, '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(167, 1, 167, '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(168, 1, 168, '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(169, 1, 169, '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(170, 1, 170, '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(171, 1, 171, '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(172, 1, 172, '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(173, 1, 173, '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(174, 1, 174, '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(175, 1, 175, '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(176, 1, 176, '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(177, 1, 177, '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(178, 1, 178, '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(179, 1, 179, '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(180, 1, 180, '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(181, 1, 181, '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(182, 1, 182, '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(183, 1, 183, '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(184, 1, 184, '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(185, 1, 185, '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(186, 1, 186, '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(187, 1, 187, '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(188, 1, 188, '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(189, 1, 189, '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(190, 1, 190, '2024-02-17 12:53:24', '2024-02-17 12:53:24');

-- --------------------------------------------------------

--
-- Table structure for table `saleinvoice`
--

CREATE TABLE `saleinvoice` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `date` datetime NOT NULL,
  `totalAmount` double NOT NULL,
  `discount` double NOT NULL,
  `paidAmount` double NOT NULL,
  `dueAmount` double NOT NULL,
  `profit` double NOT NULL,
  `customerId` bigint(20) UNSIGNED NOT NULL,
  `userId` bigint(20) UNSIGNED NOT NULL,
  `note` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `orderStatus` varchar(255) NOT NULL DEFAULT 'pending',
  `isHold` varchar(255) NOT NULL DEFAULT 'false',
  `status` varchar(255) NOT NULL DEFAULT 'true',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `saleinvoice`
--

INSERT INTO `saleinvoice` (`id`, `date`, `totalAmount`, `discount`, `paidAmount`, `dueAmount`, `profit`, `customerId`, `userId`, `note`, `address`, `orderStatus`, `isHold`, `status`, `created_at`, `updated_at`) VALUES
(1, '2024-02-17 06:00:07', 11008.8, 0, 11008.8, 0, 2008.8, 1, 2, NULL, NULL, 'pending', 'false', 'true', '2024-02-17 14:00:52', '2024-02-17 14:00:52'),
(2, '2024-02-17 06:01:32', 19800, 0, 19800, 0, 3600, 1, 1, NULL, NULL, 'pending', 'false', 'true', '2024-02-17 14:01:49', '2024-02-17 14:01:49'),
(3, '2024-02-17 09:33:45', 9840, 60, 9840, 0, 780, 1, 1, NULL, NULL, 'pending', 'false', 'true', '2024-02-17 17:35:07', '2024-02-17 17:35:07'),
(4, '2024-02-17 09:40:44', 21945, 0, 21945, 0, 2900, 1, 1, NULL, NULL, 'pending', 'false', 'true', '2024-02-17 17:46:35', '2024-02-17 17:46:35'),
(5, '2024-02-17 09:52:54', 202, 0, 0, 202, 102, 1, 1, NULL, NULL, 'pending', 'true', 'true', '2024-02-17 17:53:25', '2024-02-17 17:53:25');

-- --------------------------------------------------------

--
-- Table structure for table `saleinvoiceproduct`
--

CREATE TABLE `saleinvoiceproduct` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `productId` bigint(20) UNSIGNED NOT NULL,
  `invoiceId` bigint(20) UNSIGNED NOT NULL,
  `productQuantity` int(11) NOT NULL,
  `productSalePrice` double NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `saleinvoiceproduct`
--

INSERT INTO `saleinvoiceproduct` (`id`, `productId`, `invoiceId`, `productQuantity`, `productSalePrice`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 1, 10008, '2024-02-17 14:00:52', '2024-02-17 14:00:52'),
(2, 2, 2, 18, 1000, '2024-02-17 14:01:49', '2024-02-17 14:01:49'),
(3, 2, 3, 10, 900, '2024-02-17 17:35:07', '2024-02-17 17:35:07'),
(4, 1, 4, 2, 9500, '2024-02-17 17:46:35', '2024-02-17 17:46:35'),
(5, 5, 5, 1, 200, '2024-02-17 17:53:25', '2024-02-17 17:53:25');

-- --------------------------------------------------------

--
-- Table structure for table `saleinvoicevat`
--

CREATE TABLE `saleinvoicevat` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `invoiceId` bigint(20) UNSIGNED NOT NULL,
  `productVatId` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `saleinvoicevat`
--

INSERT INTO `saleinvoicevat` (`id`, `invoiceId`, `productVatId`, `created_at`, `updated_at`) VALUES
(1, 4, 1, '2024-02-17 17:46:35', '2024-02-17 17:46:35');

-- --------------------------------------------------------

--
-- Table structure for table `shift`
--

CREATE TABLE `shift` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `startTime` time NOT NULL,
  `endTime` time NOT NULL,
  `workHour` double DEFAULT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'true',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `subaccount`
--

CREATE TABLE `subaccount` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `accountId` bigint(20) UNSIGNED NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'true',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `subaccount`
--

INSERT INTO `subaccount` (`id`, `name`, `accountId`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Cash', 1, 'true', '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(2, 'Bank', 1, 'true', '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(3, 'Inventory', 1, 'true', '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(4, 'Accounts Receivable', 1, 'true', '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(5, 'Accounts Payable', 2, 'true', '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(6, 'Capital', 3, 'true', '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(7, 'Withdrawal', 4, 'true', '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(8, 'Sales', 5, 'true', '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(9, 'Cost of Sales', 6, 'true', '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(10, 'Salary', 6, 'true', '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(11, 'Rent', 6, 'true', '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(12, 'Utilities', 6, 'true', '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(13, 'Discount Earned', 5, 'true', '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(14, 'Discount Given', 6, 'true', '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(15, 'Tax Received', 7, 'true', '2024-02-17 12:53:24', '2024-02-17 12:53:24'),
(16, 'Tax Given', 7, 'true', '2024-02-17 12:53:24', '2024-02-17 12:53:24');

-- --------------------------------------------------------

--
-- Table structure for table `supplier`
--

CREATE TABLE `supplier` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'true',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `supplier`
--

INSERT INTO `supplier` (`id`, `name`, `phone`, `address`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Samsung', '0518162516', 'Dhaka', 'true', '2024-02-17 12:53:25', '2024-02-17 12:53:25'),
(2, 'Apple', '0618222516', 'Dhaka', 'true', '2024-02-17 12:53:25', '2024-02-17 12:53:25'),
(3, 'Xiaomi', '0188162516', 'Dhaka', 'true', '2024-02-17 12:53:25', '2024-02-17 12:53:25');

-- --------------------------------------------------------

--
-- Table structure for table `transaction`
--

CREATE TABLE `transaction` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `date` datetime NOT NULL,
  `debitId` bigint(20) UNSIGNED NOT NULL,
  `creditId` bigint(20) UNSIGNED NOT NULL,
  `particulars` varchar(255) NOT NULL,
  `amount` double NOT NULL,
  `type` varchar(255) DEFAULT NULL,
  `relatedId` int(11) DEFAULT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'true',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `transaction`
--

INSERT INTO `transaction` (`id`, `date`, `debitId`, `creditId`, `particulars`, `amount`, `type`, `relatedId`, `status`, `created_at`, `updated_at`) VALUES
(1, '2024-02-17 05:58:29', 3, 1, 'Cash paid on Purchase Invoice #1', 9000, 'purchase', 1, 'true', '2024-02-17 13:59:14', '2024-02-17 13:59:14'),
(2, '2024-02-17 06:00:07', 1, 8, 'Cash receive on Sale Invoice #1', 11008.8, 'sale', 1, 'true', '2024-02-17 14:00:52', '2024-02-17 14:00:52'),
(3, '2024-02-17 06:00:07', 9, 3, 'Cost of sales on Sale Invoice #1', 9000, 'sale', 1, 'true', '2024-02-17 14:00:52', '2024-02-17 14:00:52'),
(4, '2024-02-17 06:00:07', 1, 15, 'Vat Collected on Sale Invoice #1', 1000.8, 'vat', 1, 'true', '2024-02-17 14:00:53', '2024-02-17 14:00:53'),
(5, '2024-02-17 06:01:32', 1, 8, 'Cash receive on Sale Invoice #2', 19800, 'sale', 2, 'true', '2024-02-17 14:01:49', '2024-02-17 14:01:49'),
(6, '2024-02-17 06:01:32', 9, 3, 'Cost of sales on Sale Invoice #2', 16200, 'sale', 2, 'true', '2024-02-17 14:01:49', '2024-02-17 14:01:49'),
(7, '2024-02-17 06:01:32', 1, 15, 'Vat Collected on Sale Invoice #2', 1800, 'vat', 2, 'true', '2024-02-17 14:01:49', '2024-02-17 14:01:49'),
(8, '2024-02-17 09:33:45', 1, 8, 'Cash receive on Sale Invoice #3', 9840, 'sale', 3, 'true', '2024-02-17 17:35:07', '2024-02-17 17:35:07'),
(9, '2024-02-17 09:33:45', 9, 3, 'Cost of sales on Sale Invoice #3', 9000, 'sale', 3, 'true', '2024-02-17 17:35:07', '2024-02-17 17:35:07'),
(10, '2024-02-17 09:33:45', 1, 15, 'Vat Collected on Sale Invoice #3', 840, 'vat', 3, 'true', '2024-02-17 17:35:07', '2024-02-17 17:35:07'),
(11, '2024-02-17 09:33:45', 14, 1, 'Discount on Sale Invoice #3', 60, 'sale', 3, 'true', '2024-02-17 17:35:07', '2024-02-17 17:35:07'),
(12, '2024-02-17 09:39:08', 3, 1, 'Cash paid on Purchase Invoice #2', 891013, 'purchase', 2, 'true', '2024-02-17 17:40:14', '2024-02-17 17:40:14'),
(13, '2024-02-17 09:40:44', 1, 8, 'Cash receive on Sale Invoice #4', 21945, 'sale', 4, 'true', '2024-02-17 17:46:35', '2024-02-17 17:46:35'),
(14, '2024-02-17 09:40:44', 9, 3, 'Cost of sales on Sale Invoice #4', 18000, 'sale', 4, 'true', '2024-02-17 17:46:35', '2024-02-17 17:46:35'),
(15, '2024-02-17 09:40:44', 1, 15, 'Vat Collected on Sale Invoice #4', 2945, 'vat', 4, 'true', '2024-02-17 17:46:35', '2024-02-17 17:46:35');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `refreshToken` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `salary` int(11) DEFAULT NULL,
  `idNo` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `bloodGroup` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `joinDate` datetime DEFAULT NULL,
  `leaveDate` datetime DEFAULT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'true',
  `roleId` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `designationId` bigint(20) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `refreshToken`, `email`, `salary`, `idNo`, `phone`, `address`, `bloodGroup`, `image`, `joinDate`, `leaveDate`, `status`, `roleId`, `created_at`, `updated_at`, `designationId`) VALUES
(1, 'admin', '$2y$10$9YeayERh5K5R7XR0reBKR.rzbUdZglDIpf/AsXRzhHMg3RozbEZXm', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsInJvbGUiOiJhZG1pbiJ9.0En-pbzMIgN18ZlNOiiwRBOKufs-bOJKB14fXQCX19o', NULL, NULL, '1001', NULL, NULL, NULL, NULL, NULL, NULL, 'true', 1, '2024-02-17 12:53:22', '2024-02-26 19:51:13', NULL),
(2, 'staff', '$2y$10$gok0wN//ab1jYGT3XNGI4u2jnBKqK0j1j5yPpJCmIB9HXQ7qF.yI6', NULL, NULL, NULL, '1002', NULL, NULL, NULL, NULL, NULL, NULL, 'true', 2, '2024-02-17 12:53:22', '2024-02-17 12:53:22', NULL),
(3, 'e-commerce', '$2y$10$Luzh/nV.zYiEkfHwh1XaLuAFU5BCyIniMuTiWovsSVqRQOq.zjF8.', NULL, NULL, NULL, '1003', NULL, NULL, NULL, NULL, NULL, NULL, 'true', 3, '2024-02-17 12:53:22', '2024-02-17 12:53:22', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `adjustinvoice`
--
ALTER TABLE `adjustinvoice`
  ADD PRIMARY KEY (`id`),
  ADD KEY `adjustinvoice_userid_foreign` (`userId`);

--
-- Indexes for table `adjustinvoiceproduct`
--
ALTER TABLE `adjustinvoiceproduct`
  ADD PRIMARY KEY (`id`),
  ADD KEY `adjustinvoiceproduct_adjustinvoiceid_foreign` (`adjustInvoiceId`),
  ADD KEY `adjustinvoiceproduct_productid_foreign` (`productId`);

--
-- Indexes for table `appsetting`
--
ALTER TABLE `appsetting`
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
-- Indexes for table `customerpermissions`
--
ALTER TABLE `customerpermissions`
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
-- Indexes for table `emailconfig`
--
ALTER TABLE `emailconfig`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pagesize`
--
ALTER TABLE `pagesize`
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
-- Indexes for table `productbrand`
--
ALTER TABLE `productbrand`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `productbrand_name_unique` (`name`);

--
-- Indexes for table `productcategory`
--
ALTER TABLE `productcategory`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `productcategory_name_unique` (`name`);

--
-- Indexes for table `productcolor`
--
ALTER TABLE `productcolor`
  ADD PRIMARY KEY (`id`),
  ADD KEY `productcolor_productid_foreign` (`productId`),
  ADD KEY `productcolor_colorid_foreign` (`colorId`);

--
-- Indexes for table `productsubcategory`
--
ALTER TABLE `productsubcategory`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `productsubcategory_name_unique` (`name`),
  ADD KEY `productsubcategory_productcategoryid_foreign` (`productCategoryId`);

--
-- Indexes for table `productvat`
--
ALTER TABLE `productvat`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `purchaseinvoice`
--
ALTER TABLE `purchaseinvoice`
  ADD PRIMARY KEY (`id`),
  ADD KEY `purchaseinvoice_supplierid_foreign` (`supplierId`);

--
-- Indexes for table `purchaseinvoiceproduct`
--
ALTER TABLE `purchaseinvoiceproduct`
  ADD PRIMARY KEY (`id`),
  ADD KEY `purchaseinvoiceproduct_invoiceid_foreign` (`invoiceId`),
  ADD KEY `purchaseinvoiceproduct_productid_foreign` (`productId`);

--
-- Indexes for table `purchasereorderinvoice`
--
ALTER TABLE `purchasereorderinvoice`
  ADD PRIMARY KEY (`id`),
  ADD KEY `purchasereorderinvoice_productid_foreign` (`productId`);

--
-- Indexes for table `quote`
--
ALTER TABLE `quote`
  ADD PRIMARY KEY (`id`),
  ADD KEY `quote_quoteownerid_foreign` (`quoteOwnerId`);

--
-- Indexes for table `quoteproduct`
--
ALTER TABLE `quoteproduct`
  ADD PRIMARY KEY (`id`),
  ADD KEY `quoteproduct_quoteid_foreign` (`quoteId`),
  ADD KEY `quoteproduct_productid_foreign` (`productId`);

--
-- Indexes for table `returnpurchaseinvoice`
--
ALTER TABLE `returnpurchaseinvoice`
  ADD PRIMARY KEY (`id`),
  ADD KEY `returnpurchaseinvoice_purchaseinvoiceid_foreign` (`purchaseInvoiceId`);

--
-- Indexes for table `returnpurchaseinvoiceproduct`
--
ALTER TABLE `returnpurchaseinvoiceproduct`
  ADD PRIMARY KEY (`id`),
  ADD KEY `returnpurchaseinvoiceproduct_invoiceid_foreign` (`invoiceId`),
  ADD KEY `returnpurchaseinvoiceproduct_productid_foreign` (`productId`);

--
-- Indexes for table `returnsaleinvoice`
--
ALTER TABLE `returnsaleinvoice`
  ADD PRIMARY KEY (`id`),
  ADD KEY `returnsaleinvoice_saleinvoiceid_foreign` (`saleInvoiceId`);

--
-- Indexes for table `returnsaleinvoiceproduct`
--
ALTER TABLE `returnsaleinvoiceproduct`
  ADD PRIMARY KEY (`id`),
  ADD KEY `returnsaleinvoiceproduct_invoiceid_foreign` (`invoiceId`),
  ADD KEY `returnsaleinvoiceproduct_productid_foreign` (`productId`);

--
-- Indexes for table `reviewrating`
--
ALTER TABLE `reviewrating`
  ADD PRIMARY KEY (`id`),
  ADD KEY `reviewrating_productid_foreign` (`productId`),
  ADD KEY `reviewrating_customerid_foreign` (`customerId`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `rolepermission`
--
ALTER TABLE `rolepermission`
  ADD PRIMARY KEY (`id`),
  ADD KEY `rolepermission_roleid_foreign` (`roleId`),
  ADD KEY `rolepermission_permissionid_foreign` (`permissionId`);

--
-- Indexes for table `saleinvoice`
--
ALTER TABLE `saleinvoice`
  ADD PRIMARY KEY (`id`),
  ADD KEY `saleinvoice_customerid_foreign` (`customerId`),
  ADD KEY `saleinvoice_userid_foreign` (`userId`);

--
-- Indexes for table `saleinvoiceproduct`
--
ALTER TABLE `saleinvoiceproduct`
  ADD PRIMARY KEY (`id`),
  ADD KEY `saleinvoiceproduct_productid_foreign` (`productId`),
  ADD KEY `saleinvoiceproduct_invoiceid_foreign` (`invoiceId`);

--
-- Indexes for table `saleinvoicevat`
--
ALTER TABLE `saleinvoicevat`
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
-- Indexes for table `subaccount`
--
ALTER TABLE `subaccount`
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
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `adjustinvoice`
--
ALTER TABLE `adjustinvoice`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `adjustinvoiceproduct`
--
ALTER TABLE `adjustinvoiceproduct`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `appsetting`
--
ALTER TABLE `appsetting`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `colors`
--
ALTER TABLE `colors`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `coupon`
--
ALTER TABLE `coupon`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `customerpermissions`
--
ALTER TABLE `customerpermissions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `designation`
--
ALTER TABLE `designation`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `email`
--
ALTER TABLE `email`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `emailconfig`
--
ALTER TABLE `emailconfig`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `pagesize`
--
ALTER TABLE `pagesize`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `permission`
--
ALTER TABLE `permission`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=191;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `productbrand`
--
ALTER TABLE `productbrand`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `productcategory`
--
ALTER TABLE `productcategory`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `productcolor`
--
ALTER TABLE `productcolor`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `productsubcategory`
--
ALTER TABLE `productsubcategory`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `productvat`
--
ALTER TABLE `productvat`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `purchaseinvoice`
--
ALTER TABLE `purchaseinvoice`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `purchaseinvoiceproduct`
--
ALTER TABLE `purchaseinvoiceproduct`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `purchasereorderinvoice`
--
ALTER TABLE `purchasereorderinvoice`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `quote`
--
ALTER TABLE `quote`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `quoteproduct`
--
ALTER TABLE `quoteproduct`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `returnpurchaseinvoice`
--
ALTER TABLE `returnpurchaseinvoice`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `returnpurchaseinvoiceproduct`
--
ALTER TABLE `returnpurchaseinvoiceproduct`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `returnsaleinvoice`
--
ALTER TABLE `returnsaleinvoice`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `returnsaleinvoiceproduct`
--
ALTER TABLE `returnsaleinvoiceproduct`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `reviewrating`
--
ALTER TABLE `reviewrating`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `rolepermission`
--
ALTER TABLE `rolepermission`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=191;

--
-- AUTO_INCREMENT for table `saleinvoice`
--
ALTER TABLE `saleinvoice`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `saleinvoiceproduct`
--
ALTER TABLE `saleinvoiceproduct`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `saleinvoicevat`
--
ALTER TABLE `saleinvoicevat`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `shift`
--
ALTER TABLE `shift`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `subaccount`
--
ALTER TABLE `subaccount`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `supplier`
--
ALTER TABLE `supplier`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `transaction`
--
ALTER TABLE `transaction`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `adjustinvoice`
--
ALTER TABLE `adjustinvoice`
  ADD CONSTRAINT `adjustinvoice_userid_foreign` FOREIGN KEY (`userId`) REFERENCES `users` (`id`);

--
-- Constraints for table `adjustinvoiceproduct`
--
ALTER TABLE `adjustinvoiceproduct`
  ADD CONSTRAINT `adjustinvoiceproduct_adjustinvoiceid_foreign` FOREIGN KEY (`adjustInvoiceId`) REFERENCES `adjustinvoice` (`id`),
  ADD CONSTRAINT `adjustinvoiceproduct_productid_foreign` FOREIGN KEY (`productId`) REFERENCES `product` (`id`);

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_productbrandid_foreign` FOREIGN KEY (`productBrandId`) REFERENCES `productbrand` (`id`),
  ADD CONSTRAINT `product_productsubcategoryid_foreign` FOREIGN KEY (`productSubCategoryId`) REFERENCES `productsubcategory` (`id`),
  ADD CONSTRAINT `product_purchaseinvoiceid_foreign` FOREIGN KEY (`purchaseInvoiceId`) REFERENCES `purchaseinvoice` (`id`);

--
-- Constraints for table `productcolor`
--
ALTER TABLE `productcolor`
  ADD CONSTRAINT `productcolor_colorid_foreign` FOREIGN KEY (`colorId`) REFERENCES `colors` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `productcolor_productid_foreign` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `productsubcategory`
--
ALTER TABLE `productsubcategory`
  ADD CONSTRAINT `productsubcategory_productcategoryid_foreign` FOREIGN KEY (`productCategoryId`) REFERENCES `productcategory` (`id`);

--
-- Constraints for table `purchaseinvoice`
--
ALTER TABLE `purchaseinvoice`
  ADD CONSTRAINT `purchaseinvoice_supplierid_foreign` FOREIGN KEY (`supplierId`) REFERENCES `supplier` (`id`);

--
-- Constraints for table `purchaseinvoiceproduct`
--
ALTER TABLE `purchaseinvoiceproduct`
  ADD CONSTRAINT `purchaseinvoiceproduct_invoiceid_foreign` FOREIGN KEY (`invoiceId`) REFERENCES `purchaseinvoice` (`id`),
  ADD CONSTRAINT `purchaseinvoiceproduct_productid_foreign` FOREIGN KEY (`productId`) REFERENCES `product` (`id`);

--
-- Constraints for table `purchasereorderinvoice`
--
ALTER TABLE `purchasereorderinvoice`
  ADD CONSTRAINT `purchasereorderinvoice_productid_foreign` FOREIGN KEY (`productId`) REFERENCES `product` (`id`);

--
-- Constraints for table `quote`
--
ALTER TABLE `quote`
  ADD CONSTRAINT `quote_quoteownerid_foreign` FOREIGN KEY (`quoteOwnerId`) REFERENCES `users` (`id`);

--
-- Constraints for table `quoteproduct`
--
ALTER TABLE `quoteproduct`
  ADD CONSTRAINT `quoteproduct_productid_foreign` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `quoteproduct_quoteid_foreign` FOREIGN KEY (`quoteId`) REFERENCES `quote` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `returnpurchaseinvoice`
--
ALTER TABLE `returnpurchaseinvoice`
  ADD CONSTRAINT `returnpurchaseinvoice_purchaseinvoiceid_foreign` FOREIGN KEY (`purchaseInvoiceId`) REFERENCES `purchaseinvoice` (`id`);

--
-- Constraints for table `returnpurchaseinvoiceproduct`
--
ALTER TABLE `returnpurchaseinvoiceproduct`
  ADD CONSTRAINT `returnpurchaseinvoiceproduct_invoiceid_foreign` FOREIGN KEY (`invoiceId`) REFERENCES `returnpurchaseinvoice` (`id`),
  ADD CONSTRAINT `returnpurchaseinvoiceproduct_productid_foreign` FOREIGN KEY (`productId`) REFERENCES `product` (`id`);

--
-- Constraints for table `returnsaleinvoice`
--
ALTER TABLE `returnsaleinvoice`
  ADD CONSTRAINT `returnsaleinvoice_saleinvoiceid_foreign` FOREIGN KEY (`saleInvoiceId`) REFERENCES `saleinvoice` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `returnsaleinvoiceproduct`
--
ALTER TABLE `returnsaleinvoiceproduct`
  ADD CONSTRAINT `returnsaleinvoiceproduct_invoiceid_foreign` FOREIGN KEY (`invoiceId`) REFERENCES `returnsaleinvoice` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `returnsaleinvoiceproduct_productid_foreign` FOREIGN KEY (`productId`) REFERENCES `product` (`id`);

--
-- Constraints for table `reviewrating`
--
ALTER TABLE `reviewrating`
  ADD CONSTRAINT `reviewrating_customerid_foreign` FOREIGN KEY (`customerId`) REFERENCES `customer` (`id`),
  ADD CONSTRAINT `reviewrating_productid_foreign` FOREIGN KEY (`productId`) REFERENCES `product` (`id`);

--
-- Constraints for table `rolepermission`
--
ALTER TABLE `rolepermission`
  ADD CONSTRAINT `rolepermission_permissionid_foreign` FOREIGN KEY (`permissionId`) REFERENCES `permission` (`id`),
  ADD CONSTRAINT `rolepermission_roleid_foreign` FOREIGN KEY (`roleId`) REFERENCES `role` (`id`);

--
-- Constraints for table `saleinvoice`
--
ALTER TABLE `saleinvoice`
  ADD CONSTRAINT `saleinvoice_customerid_foreign` FOREIGN KEY (`customerId`) REFERENCES `customer` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `saleinvoice_userid_foreign` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `saleinvoiceproduct`
--
ALTER TABLE `saleinvoiceproduct`
  ADD CONSTRAINT `saleinvoiceproduct_invoiceid_foreign` FOREIGN KEY (`invoiceId`) REFERENCES `saleinvoice` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `saleinvoiceproduct_productid_foreign` FOREIGN KEY (`productId`) REFERENCES `product` (`id`);

--
-- Constraints for table `saleinvoicevat`
--
ALTER TABLE `saleinvoicevat`
  ADD CONSTRAINT `saleinvoicevat_invoiceid_foreign` FOREIGN KEY (`invoiceId`) REFERENCES `saleinvoice` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `saleinvoicevat_productvatid_foreign` FOREIGN KEY (`productVatId`) REFERENCES `productvat` (`id`);

--
-- Constraints for table `subaccount`
--
ALTER TABLE `subaccount`
  ADD CONSTRAINT `subaccount_accountid_foreign` FOREIGN KEY (`accountId`) REFERENCES `account` (`id`);

--
-- Constraints for table `transaction`
--
ALTER TABLE `transaction`
  ADD CONSTRAINT `transaction_creditid_foreign` FOREIGN KEY (`creditId`) REFERENCES `subaccount` (`id`),
  ADD CONSTRAINT `transaction_debitid_foreign` FOREIGN KEY (`debitId`) REFERENCES `subaccount` (`id`);

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
