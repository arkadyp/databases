-- MySQL dump 10.13  Distrib 5.5.20, for osx10.8 (i386)
--
-- Host: localhost    Database: blackopps
-- ------------------------------------------------------
-- Server version	5.5.20

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping data for table `friends`
--

LOCK TABLES `friends` WRITE;
/*!40000 ALTER TABLE `friends` DISABLE KEYS */;
/*!40000 ALTER TABLE `friends` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES (2,1,1,'hello brave world!','2014-01-31 15:50:49'),(3,1,1,'message2','2014-01-31 15:51:33'),(4,1,1,'message3','2014-01-31 15:51:39'),(5,2,2,'im in the house','2014-01-31 17:28:45'),(6,2,2,'coding is fun','2014-01-31 17:28:55'),(7,2,2,'data structures are the best','2014-01-31 17:29:05'),(8,2,3,'data structures are the best','2014-01-31 17:29:11'),(9,2,3,'good times','2014-01-31 17:29:21'),(10,3,3,'message1','2014-01-31 17:29:34'),(11,3,3,'message2','2014-01-31 17:29:36'),(12,3,3,'message3','2014-01-31 17:29:48'),(13,1,3,'message4','2014-01-31 17:29:56'),(14,2,3,'can\'t wait till sunday','2014-01-31 17:30:18'),(15,2,3,'insertion commencing','2014-01-31 20:13:18'),(16,3,3,'insertion commencing','2014-01-31 20:18:51'),(17,3,5,'insertion commencing','2014-01-31 20:20:40'),(18,3,5,'insertion commencing','2014-01-31 20:21:10'),(19,3,5,'THIS IS WOKRING!!!','2014-01-31 20:22:50'),(20,5,5,'awef','2014-01-31 20:48:40'),(21,6,5,'now this will work','2014-01-31 20:51:22'),(22,7,5,'yeaaahhhhhh','2014-01-31 20:52:45'),(23,3,2,'now i\'m inside hackreactor!!','2014-01-31 21:05:04'),(24,9,5,'post this!','2014-01-31 21:24:47'),(25,10,8,'and the wardrobe!','2014-01-31 21:25:22');
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `rooms`
--

LOCK TABLES `rooms` WRITE;
/*!40000 ALTER TABLE `rooms` DISABLE KEYS */;
INSERT INTO `rooms` VALUES (1,'1'),(2,'hackreactor'),(3,'da club'),(4,'da library'),(5,'narnia');
/*!40000 ALTER TABLE `rooms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'test','2014-01-31 12:14:03'),(2,'arkady','2014-01-31 17:25:44'),(3,'adam','2014-01-31 17:25:52'),(4,'chipper','2014-01-31 20:25:08'),(5,'new user','2014-01-31 20:48:13'),(6,'new kid','2014-01-31 20:49:14'),(7,'ricky','2014-01-31 20:52:45'),(8,'ray','2014-01-31 21:05:31'),(9,'jim','2014-01-31 21:23:03'),(10,'the witch','2014-01-31 21:25:22');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2014-01-31 21:47:41
