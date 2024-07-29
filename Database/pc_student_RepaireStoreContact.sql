-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 210.210.210.50    Database: pc_student
-- ------------------------------------------------------
-- Server version	5.7.29-0ubuntu0.18.04.1-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `RepaireStoreContact`
--

DROP TABLE IF EXISTS `RepaireStoreContact`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `RepaireStoreContact` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Email` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Message` text COLLATE utf8mb4_unicode_ci,
  `dateAndTime` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `RepaireStoreContact`
--

LOCK TABLES `RepaireStoreContact` WRITE;
/*!40000 ALTER TABLE `RepaireStoreContact` DISABLE KEYS */;
INSERT INTO `RepaireStoreContact` VALUES (11,'gk','gk@gmail.com','hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....','2024-07-06 13:00:50'),(16,'gdfgfdgfdgdfgfdg','shyamm@gmail.com','uuiuuyyuiyuiyi','2024-07-06 13:00:50'),(17,'akash','gg@gmail.com','hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....','2024-07-06 13:00:50'),(18,'gulshan','rahul@gmail.com','hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....hello I am dome .....','2024-07-06 13:00:50'),(19,'sumi','sumi@gmail.com','sumi','2024-07-06 13:00:50');
/*!40000 ALTER TABLE `RepaireStoreContact` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-07-29 16:32:11
