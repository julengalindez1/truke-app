/*
SQLyog Community v13.2.1 (64 bit)
MySQL - 10.4.32-MariaDB-1:10.4.32+maria~ubu2004-log : Database - db
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
-- Drop the database if it exists
DROP DATABASE IF EXISTS `db`;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;

USE `db`;

/*Table structure for table `catalogues` */

DROP TABLE IF EXISTS `catalogues`;

CREATE TABLE `catalogues` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `id_catalogue` bigint(20) unsigned NOT NULL,
  `id_product` bigint(20) unsigned NOT NULL,
  `id_provider` bigint(20) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `catalogues_id_product_foreign` (`id_product`),
  KEY `catalogues_id_provider_foreign` (`id_provider`),
  CONSTRAINT `catalogues_id_product_foreign` FOREIGN KEY (`id_product`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  CONSTRAINT `catalogues_id_provider_foreign` FOREIGN KEY (`id_provider`) REFERENCES `providers` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `catalogues` */

/*Table structure for table `categories` */

DROP TABLE IF EXISTS `categories`;

CREATE TABLE `categories` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `categories` */

insert  into `categories`(`id`,`name`,`created_at`,`updated_at`) values
(1,'Frutas',NULL,NULL),
(2,'Verduras',NULL,NULL),
(3,'Legumbres',NULL,NULL),
(4,'Hortalizas',NULL,NULL),
(5,'Cereales',NULL,NULL),
(6,'Lácteos',NULL,NULL),
(7,'Conservas',NULL,NULL),
(8,'Carnes',NULL,NULL),
(9,'Confituras',NULL,NULL);

/*Table structure for table `contacts` */

DROP TABLE IF EXISTS `contacts`;

CREATE TABLE `contacts` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `provider_id` bigint(20) unsigned NOT NULL,
  `name` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `schedule` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `contacts_provider_id_foreign` (`provider_id`),
  CONSTRAINT `contacts_provider_id_foreign` FOREIGN KEY (`provider_id`) REFERENCES `providers` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `contacts` */

insert  into `contacts`(`id`,`provider_id`,`name`,`type`,`schedule`,`created_at`,`updated_at`) values
(1,1,'Iñaki Etxeberria','Gerente','09:00 - 16:00',NULL,NULL),
(2,2,'Amaia Urresti','Gerente','08:00 - 19:00',NULL,NULL),
(3,3,'Mikel Larrañaga','Gerente','09:30 - 17:00',NULL,NULL),
(4,4,'Nerea Zubizarreta','Gerente','08:00 - 17:30',NULL,NULL),
(5,5,'Gorka Agirre','Gerente','08:00 - 17:00',NULL,NULL),
(6,1,'Leire Mendizabal','Comercial','09:00 - 16:30',NULL,NULL),
(7,2,'Asier Goikoetxea','Comercial','08:30 - 15:30',NULL,NULL),
(8,3,'Maite Alberdi','Comercial','08:00 - 17:00',NULL,NULL),
(9,4,'Koldo Ugalde','Comercial','08:00 - 17:00',NULL,NULL),
(10,5,'Izaskun Azkue','Comercial','08:00 - 17:00',NULL,NULL);

/*Table structure for table `failed_jobs` */

DROP TABLE IF EXISTS `failed_jobs`;

CREATE TABLE `failed_jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `failed_jobs` */

/*Table structure for table `formats` */

DROP TABLE IF EXISTS `formats`;

CREATE TABLE `formats` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `size` int(11) NOT NULL,
  `weighable` int(11) NOT NULL,
  `is_divisible` tinyint(1) NOT NULL DEFAULT 0,
  `unit_measure` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `formats` */

insert  into `formats`(`id`,`name`,`size`,`weighable`,`is_divisible`,`unit_measure`,`created_at`,`updated_at`) values
(1,'Tarro vidrio',450,1,0,'gr',NULL,NULL),
(2,'Granel',1,1,1,'kg',NULL,NULL),
(3,'Caja',2,1,0,'kg',NULL,NULL),
(4,'Bandeja',500,1,0,'kg',NULL,NULL),
(5,'Envase de plástico',250,1,0,'gr',NULL,NULL),
(6,'Envase de plástico',500,1,0,'kg',NULL,NULL),
(7,'Tarro vidrio',100,1,0,'gr',NULL,NULL),
(8,'Bolsa de plástico',600,1,0,'kg',NULL,NULL),
(9,'Carton',600,1,0,'ml',NULL,NULL),
(10,'Botella',1000,0,0,'ml',NULL,NULL);

/*Table structure for table `migrations` */

DROP TABLE IF EXISTS `migrations`;

CREATE TABLE `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `migrations` */

insert  into `migrations`(`id`,`migration`,`batch`) values
(1,'2014_10_12_000000_create_users_table',1),
(2,'2014_10_12_100000_create_password_reset_tokens_table',1),
(3,'2019_08_19_000000_create_failed_jobs_table',1),
(4,'2019_12_14_000001_create_personal_access_tokens_table',1),
(5,'2023_11_08_153042_create_providers_table',1),
(6,'2023_11_14_122345_create_contacts_table',1),
(7,'2023_11_25_202444_create_formats_table',1),
(8,'2023_12_08_174614_create_categories_table',1),
(9,'2023_12_09_181100_create_products_table',1),
(10,'2023_12_16_121240_create_catalogues_table',1),
(11,'2023_12_28_103916_create_variants_table',1),
(12,'2024_01_03_195842_add_provider_id_to_users',1);

/*Table structure for table `password_reset_tokens` */

DROP TABLE IF EXISTS `password_reset_tokens`;

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `password_reset_tokens` */

/*Table structure for table `personal_access_tokens` */

DROP TABLE IF EXISTS `personal_access_tokens`;

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) unsigned NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `personal_access_tokens` */

/*Table structure for table `products` */

DROP TABLE IF EXISTS `products`;

CREATE TABLE `products` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description_short` varchar(255) DEFAULT NULL,
  `description_long` varchar(255) DEFAULT NULL,
  `image` varchar(255) NOT NULL,
  `provider_id` bigint(20) unsigned NOT NULL,
  `category_id` bigint(20) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `products_provider_id_foreign` (`provider_id`),
  KEY `products_category_id_foreign` (`category_id`),
  CONSTRAINT `products_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`),
  CONSTRAINT `products_provider_id_foreign` FOREIGN KEY (`provider_id`) REFERENCES `providers` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `products` */

insert  into `products`(`id`,`name`,`description_short`,`description_long`,`image`,`provider_id`,`category_id`,`created_at`,`updated_at`) values
(1,'Lechuga iceberg','Lechuga fresca de calidad, ideal para ensaladas frescas y platos nutritivos.',NULL,'https://delahuertacasa.com/wp-content/uploads/2022/01/lechuga-iceberg-product.jpg',1,4,NULL,NULL),
(2,'Manzana royal','Nuestras manzanas son una deliciosa fusión de sabor y salud',NULL,'https://www.frutality.es/wp-content/uploads/manzana-royal.png',1,1,NULL,NULL),
(3,'Queso roncal','Elaborado con leche de oveja, este queso de textura firme y granulosa ofrece un sabor complejo con notas herbáceas y un carácter distintivo.',NULL,'https://obradorgriful.com/316-product_page_default/roncal-artesa.jpg',1,6,NULL,NULL),
(4,'Queso Idiazábal','Elaborado con leche de oveja, este queso de forma cilíndrica destaca por su textura firme y su sabor inconfundible, ahumado para añadir notas adicionales.',NULL,'https://tresquesitos.com/167-large_default/queso-de-oveja-idiazabal-ahumado-la-vasco-navarra.jpg',2,6,NULL,NULL),
(5,'Vainas','Su textura crujiente y su sabor característico hacen de las vainas un ingrediente nutritivo y delicioso que aporta variedad y frescura a una amplia gama de platos.',NULL,'https://www.gastronomiavasca.net/uploads/image/file/3437/vainas.jpg',3,2,NULL,NULL),
(6,'Miel','La miel no solo es apreciada por su delicioso sabor, sino también por sus propiedades beneficiosas para la salud.',NULL,'https://amenosde1euro.com/159433-large_default/miel-de-flores-en-tarro-de-cristal-100-gr-.jpg',4,9,NULL,NULL),
(7,'Pimiento rojo','Pimientos rojos frescos y jugosos, ideales para asar y añadir a ensaladas.',NULL,'https://www.gastronomiavasca.net/uploads/image/file/3412/pimiento_rojo.jpg',2,4,NULL,NULL),
(8,'Calabaza','Calabazas frescas y saludables, perfectas para sopas y guisos.',NULL,'https://www.efectofruta.com/images/thumbs/Calabaza-Cacahuete-5-0009225_300.png',3,4,NULL,NULL),
(9,'Acelga','Acelgas frescas y de hojas verdes, ricas en nutrientes y versátiles en la cocina.',NULL,'https://www.atida.com/es-es/blog/wp-content/uploads/2021/09/31-nuevo-blog.png',4,2,NULL,NULL),
(10,'Cebolla','Cebollas frescas y aromáticas, esenciales en una variedad de platos.',NULL,'https://camarasafruits.es/wp-content/uploads/2020/06/Enid-retrat-79-1.jpg',5,4,NULL,NULL),
(11,'Pepino','Pepinos crujientes y refrescantes, ideales para ensaladas y refrigerios.',NULL,'https://sgfm.elcorteingles.es/SGFM/dctm/MEDIA03/201811/26/00118109100018____2__600x600.jpg',6,2,NULL,NULL),
(12,'Miel de lavanda','Miel de lavanda con un aroma distintivo y un sabor dulce y floral.',NULL,'https://mejorconsalud.as.com/wp-content/uploads/2022/10/miel-lavanda.jpg',7,9,NULL,NULL),
(13,'Uva de mesa','Uvas frescas y jugosas, perfectas como snack saludable.',NULL,'https://gardencenterejea.com/8067-medium_default/uva-de-mesa-cardinal.webp',8,1,NULL,NULL),
(14,'Zanahoria morada','Zanahorias moradas cultivadas de forma orgánica, llenas de antioxidantes.',NULL,'https://rgnutricion.com/wp-content/uploads/2017/05/zanahoria-morada.webp',9,2,NULL,NULL),
(15,'Huevo de gallina ecológico','Huevos frescos de gallinas criadas de forma ecológica, ricos en proteínas y nutrientes.',NULL,'https://s1.eestatic.com/2019/04/22/cocinillas/actualidad-gastronomica/huevo-actualidad_gastronomica_392971737_121043356_1706x960.jpg',10,6,NULL,NULL),
(16,'Patata violeta','Patatas violetas de textura suave y sabor delicado, ideales para purés y guarniciones.',NULL,'https://matundy.es/wp-content/uploads/2021/11/Patata.Violeta.MELENDEZ.01-scaled-2.jpg',11,3,NULL,NULL);


/*Table structure for table `providers` */

DROP TABLE IF EXISTS `providers`;

CREATE TABLE `providers` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `providers` */

insert  into `providers`(`id`,`name`,`created_at`,`updated_at`) values
(1,'Aberekin',NULL,NULL),
(2,'Agribea',NULL,NULL),
(3,'Astoreka rural',NULL,NULL),
(4,'Goikotze',NULL,NULL),
(5,'Itxurritxu',NULL,NULL),
(6,'Mendiolagoitia',NULL,NULL),
(7,'Ontañon',NULL,NULL),
(8,'Talotokia',NULL,NULL),
(9,'Txoriherri',NULL,NULL),
(10,'Zaldiarri',NULL,NULL);

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `provider_id` bigint(20) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`),
  KEY `users_provider_id_foreign` (`provider_id`),
  CONSTRAINT `users_provider_id_foreign` FOREIGN KEY (`provider_id`) REFERENCES `providers` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `users` */

/*Table structure for table `variants` */

DROP TABLE IF EXISTS `variants`;

CREATE TABLE `variants` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `product_id` bigint(20) unsigned NOT NULL,
  `format_id` bigint(20) unsigned NOT NULL,
  `pvp` decimal(10,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `variants_product_id_foreign` (`product_id`),
  KEY `variants_format_id_foreign` (`format_id`),
  CONSTRAINT `variants_format_id_foreign` FOREIGN KEY (`format_id`) REFERENCES `formats` (`id`),
  CONSTRAINT `variants_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `variants` */

insert  into `variants`(`id`,`product_id`,`format_id`,`pvp`,`created_at`,`updated_at`) values
(1,1,8,2.20,NULL,NULL),
(2,5,1,5.50,NULL,NULL),
(3,5,4,7.50,NULL,NULL),
(4,2,2,2.30,NULL,NULL),
(5,3,6,18.00,NULL,NULL),
(6,4,6,23.00,NULL,NULL),
(7,6,7,8.00,NULL,NULL),
(8,6,1,12.00,NULL,NULL),
(9,7,3,2.50,NULL,NULL),
(10,8,5,4.20,NULL,NULL),
(11,9,4,3.00,NULL,NULL),
(12,10,1,1.80,NULL,NULL),
(13,11,6,5.00,NULL,NULL),
(14,12,8,6.80,NULL,NULL),
(15,13,2,2.30,NULL,NULL),
(16,14,7,3.50,NULL,NULL),
(17,15,9,7.50,NULL,NULL),
(18,16,10,4.00,NULL,NULL);

UPDATE `products` SET `provider_id` = 1 WHERE `id` IN (1, 2, 3, 4, 5, 6);
UPDATE `products` SET `provider_id` = 2 WHERE `id` IN (7, 8, 9, 10, 11);
UPDATE `products` SET `provider_id` = 3 WHERE `id` IN (12, 13, 14, 15, 16);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
