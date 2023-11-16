-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: moeutto
-- ------------------------------------------------------
-- Server version	5.7.41-log

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
-- Table structure for table `ai_check_outfit`
--

DROP TABLE IF EXISTS `ai_check_outfit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ai_check_outfit` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `reg_date` date NOT NULL,
  `member_id` binary(16) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKcq81u9rup1j63ed10lsu8l80n` (`member_id`),
  CONSTRAINT `FKcq81u9rup1j63ed10lsu8l80n` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ai_rec_outfit`
--

DROP TABLE IF EXISTS `ai_rec_outfit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ai_rec_outfit` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rec_date` date DEFAULT NULL,
  `member_id` binary(16) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK8e7h7aibmrlfyqqq6kd83pqxy` (`member_id`),
  CONSTRAINT `FK8e7h7aibmrlfyqqq6kd83pqxy` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `calendar`
--

DROP TABLE IF EXISTS `calendar`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `calendar` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `image_url` varchar(255) DEFAULT NULL,
  `like_outfit` int(11) DEFAULT '0',
  `member_id` binary(16) DEFAULT NULL,
  `reg_date` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `clothes`
--

DROP TABLE IF EXISTS `clothes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clothes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `color` varchar(20) NOT NULL,
  `frequency` int(11) DEFAULT '0',
  `image_url` varchar(255) NOT NULL,
  `name` varchar(50) NOT NULL,
  `price` int(11) DEFAULT NULL,
  `recent_date` date DEFAULT NULL,
  `reg_date` date DEFAULT NULL,
  `season` varchar(4) NOT NULL,
  `shop` varchar(30) DEFAULT NULL,
  `star` int(11) DEFAULT '0',
  `textile` varchar(100) DEFAULT NULL,
  `thickness` int(11) NOT NULL,
  `member_id` binary(16) DEFAULT NULL,
  `middle_category_id` varchar(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKb31500kvhpwuhmw0uk7rkslgo` (`member_id`),
  KEY `FKqa60ibwj353142d4d9agp4t06` (`middle_category_id`),
  CONSTRAINT `FKb31500kvhpwuhmw0uk7rkslgo` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`),
  CONSTRAINT `FKqa60ibwj353142d4d9agp4t06` FOREIGN KEY (`middle_category_id`) REFERENCES `middle_category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `clothes_in_ai_check_outfit`
--

DROP TABLE IF EXISTS `clothes_in_ai_check_outfit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clothes_in_ai_check_outfit` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fitness_num` int(11) NOT NULL,
  `result` varchar(255) NOT NULL,
  `ai_check_outfit_id` int(11) DEFAULT NULL,
  `clothes_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKefrmuac3icox3stu8upsx7bad` (`ai_check_outfit_id`),
  KEY `FKjhabtp4r4x51amk78y7kk77lr` (`clothes_id`),
  CONSTRAINT `FKefrmuac3icox3stu8upsx7bad` FOREIGN KEY (`ai_check_outfit_id`) REFERENCES `ai_check_outfit` (`id`),
  CONSTRAINT `FKjhabtp4r4x51amk78y7kk77lr` FOREIGN KEY (`clothes_id`) REFERENCES `clothes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `clothes_in_ai_rec_outfit`
--

DROP TABLE IF EXISTS `clothes_in_ai_rec_outfit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clothes_in_ai_rec_outfit` (
  `ai_rec_outfit_id` int(11) NOT NULL,
  `clothes_id` int(11) NOT NULL,
  PRIMARY KEY (`ai_rec_outfit_id`,`clothes_id`),
  KEY `FKkfw990tj0huutccxsd2b5skqo` (`clothes_id`),
  CONSTRAINT `FK12c02nuftmgifygjxis3bi10m` FOREIGN KEY (`ai_rec_outfit_id`) REFERENCES `ai_rec_outfit` (`id`),
  CONSTRAINT `FKkfw990tj0huutccxsd2b5skqo` FOREIGN KEY (`clothes_id`) REFERENCES `clothes` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `follower`
--

DROP TABLE IF EXISTS `follower`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `follower` (
  `follower_id` binary(16) NOT NULL,
  `my_id` binary(16) NOT NULL,
  PRIMARY KEY (`follower_id`,`my_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `following`
--

DROP TABLE IF EXISTS `following`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `following` (
  `following_id` binary(16) NOT NULL,
  `my_id` binary(16) NOT NULL,
  PRIMARY KEY (`following_id`,`my_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `guest_book`
--

DROP TABLE IF EXISTS `guest_book`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `guest_book` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `post` varchar(255) NOT NULL,
  `reg_date` date DEFAULT NULL,
  `owner_id` binary(16) DEFAULT NULL,
  `writer_id` binary(16) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK20nc3bat82gwvryxc8c6ae61j` (`owner_id`),
  KEY `FKes3md0f4dbh3dfpn20a6hq1fe` (`writer_id`),
  CONSTRAINT `FK20nc3bat82gwvryxc8c6ae61j` FOREIGN KEY (`owner_id`) REFERENCES `member` (`id`),
  CONSTRAINT `FKes3md0f4dbh3dfpn20a6hq1fe` FOREIGN KEY (`writer_id`) REFERENCES `member` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `large_category`
--

DROP TABLE IF EXISTS `large_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `large_category` (
  `id` varchar(3) NOT NULL,
  `name` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `member`
--

DROP TABLE IF EXISTS `member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member` (
  `id` binary(16) NOT NULL,
  `account_find` tinyint(1) NOT NULL DEFAULT '0',
  `closet_find` tinyint(1) NOT NULL DEFAULT '0',
  `email` varchar(255) NOT NULL,
  `nickname` varchar(255) NOT NULL,
  `profile_image` varchar(256) NOT NULL DEFAULT 'https://moeutto-bucket.s3.ap-northeast-2.amazonaws.com/default_image.jpeg',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `middle_category`
--

DROP TABLE IF EXISTS `middle_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `middle_category` (
  `id` varchar(6) NOT NULL,
  `name` varchar(20) NOT NULL,
  `large_category_id` varchar(3) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKo0e4j8vf52n8xd6yt9xhhy313` (`large_category_id`),
  CONSTRAINT `FKo0e4j8vf52n8xd6yt9xhhy313` FOREIGN KEY (`large_category_id`) REFERENCES `large_category` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping events for database 'moeutto'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-17  1:40:24
