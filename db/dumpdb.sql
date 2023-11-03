-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: moeutto
-- ------------------------------------------------------
-- Server version	8.0.33

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
  `id` int NOT NULL,
  `member_id` binary(16) DEFAULT NULL,
  `reg_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ai_check_outfit`
--

LOCK TABLES `ai_check_outfit` WRITE;
/*!40000 ALTER TABLE `ai_check_outfit` DISABLE KEYS */;
INSERT INTO `ai_check_outfit` VALUES (1,_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0','2023-10-30 14:00:14');
/*!40000 ALTER TABLE `ai_check_outfit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ai_rec_outfit`
--

DROP TABLE IF EXISTS `ai_rec_outfit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ai_rec_outfit` (
  `id` int NOT NULL,
  `member_id` binary(16) DEFAULT NULL,
  `rec_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ai_rec_outfit`
--

LOCK TABLES `ai_rec_outfit` WRITE;
/*!40000 ALTER TABLE `ai_rec_outfit` DISABLE KEYS */;
INSERT INTO `ai_rec_outfit` VALUES (1,_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0','2023-10-30 13:24:47');
/*!40000 ALTER TABLE `ai_rec_outfit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `calendar`
--

DROP TABLE IF EXISTS `calendar`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `calendar` (
  `id` int NOT NULL AUTO_INCREMENT,
  `image_url` varchar(255) DEFAULT NULL,
  `like_outfit` int DEFAULT NULL,
  `member_id` binary(255) DEFAULT NULL,
  `reg_date` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `calendar`
--

LOCK TABLES `calendar` WRITE;
/*!40000 ALTER TABLE `calendar` DISABLE KEYS */;
INSERT INTO `calendar` VALUES (1,'\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',1,_binary 'https://image.msscdn.net/images/goods_img/20231023/3647015/3647015_16980338458593_500.jpg\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0','2023-10-30 13:44:46.000000'),(2,'\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',0,_binary 'https://image.msscdn.net/images/goods_img/20231023/3647015/3647015_16980338458593_500.jpg\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0','2023-10-30 13:45:29.000000');
/*!40000 ALTER TABLE `calendar` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clothes`
--

DROP TABLE IF EXISTS `clothes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clothes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `color` varchar(6) NOT NULL,
  `frequency` int DEFAULT '0',
  `name` varchar(50) NOT NULL,
  `price` int DEFAULT NULL,
  `recent_date` date DEFAULT NULL,
  `reg_date` date DEFAULT NULL,
  `season` varchar(4) NOT NULL,
  `shop` varchar(30) DEFAULT NULL,
  `star` int DEFAULT '0',
  `textile` varchar(100) DEFAULT NULL,
  `thickness` int NOT NULL,
  `member_id` binary(16) DEFAULT NULL,
  `middle_category_id` varchar(6) DEFAULT NULL,
  `image_url` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKb31500kvhpwuhmw0uk7rkslgo` (`member_id`),
  KEY `FKqa60ibwj353142d4d9agp4t06` (`middle_category_id`),
  CONSTRAINT `FKb31500kvhpwuhmw0uk7rkslgo` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`),
  CONSTRAINT `FKqa60ibwj353142d4d9agp4t06` FOREIGN KEY (`middle_category_id`) REFERENCES `middle_category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clothes`
--

LOCK TABLES `clothes` WRITE;
/*!40000 ALTER TABLE `clothes` DISABLE KEYS */;
INSERT INTO `clothes` VALUES (1,'BDBDBD',0,'후드티',30000,'2023-10-30','2023-10-30','1011','무신사',0,'면',2,_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0','001001','https://image.msscdn.net/images/goods_img/20231023/3647015/3647015_16980338458593_500.jpg'),(2,'A3A3A3',0,'청바지',45000,'2023-10-30','2023-10-30','1001','무신사',0,'청',3,_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0','001002','https://image.msscdn.net/images/goods_img/20231023/3647015/3647015_16980338458593_500.jpg'),(3,'FFFFFF',0,'여름티',15000,'2023-10-30','2023-10-30','0110','무신사',0,'면',1,_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0','002001','https://image.msscdn.net/images/goods_img/20231023/3647015/3647015_16980338458593_500.jpg'),(4,'000000',0,'겨울코트',120000,'2023-10-30','2023-10-30','0001','무신사',0,'양모',2,_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0','002002','https://image.msscdn.net/images/goods_img/20231023/3647015/3647015_16980338458593_500.jpg'),(5,'ADD8E6',0,'패딩',120000,'2023-10-30','2023-10-30','1000','무신사',0,'면',3,_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0','001001','https://image.msscdn.net/images/goods_img/20231023/3647015/3647015_16980338458593_500.jpg'),(6,'FF4500',0,'맨투맨',32000,'2023-10-30','2023-10-30','1001','무신사',0,'면',2,_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0','002001','https://image.msscdn.net/images/goods_img/20231023/3647015/3647015_16980338458593_500.jpg'),(7,'B0E0E6',0,'청바지',37000,'2023-10-30','2023-10-30','1010','무신사',0,'청',2,_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0','003001','https://image.msscdn.net/images/goods_img/20231023/3647015/3647015_16980338458593_500.jpg'),(8,'4682B4',0,'귀마개',5000,'2023-10-30','2023-10-30','1000','무신사',0,'면',1,_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0','004001','https://image.msscdn.net/images/goods_img/20231023/3647015/3647015_16980338458593_500.jpg'),(9,'ADD8E6',0,'코트',150000,'2023-10-30','2023-10-30','1010','무신사',0,'면',3,_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0','001002','https://image.msscdn.net/images/goods_img/20231023/3647015/3647015_16980338458593_500.jpg'),(10,'FF4500',0,'후드',35000,'2023-10-30','2023-10-30','1011','무신사',0,'면',2,_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0','002002','https://image.msscdn.net/images/goods_img/20231023/3647015/3647015_16980338458593_500.jpg'),(11,'B0E0E6',0,'반바지',20000,'2023-10-30','2023-10-30','0100','무신사',0,'면',1,_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0','003002','https://image.msscdn.net/images/goods_img/20231023/3647015/3647015_16980338458593_500.jpg'),(12,'4682B4',0,'장갑',7000,'2023-10-30','2023-10-30','1000','무신사',0,'가죽',1,_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0','004002','https://image.msscdn.net/images/goods_img/20231023/3647015/3647015_16980338458593_500.jpg'),(13,'DEB887',0,'자켓',80000,'2023-10-30','2023-10-30','1010','무신사',0,'청',2,_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0','001003','https://image.msscdn.net/images/goods_img/20231023/3647015/3647015_16980338458593_500.jpg'),(14,'FA8072',0,'반팔',20000,'2023-10-30','2023-10-30','0110','무신사',0,'면',1,_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0','002003','https://image.msscdn.net/images/goods_img/20231023/3647015/3647015_16980338458593_500.jpg'),(15,'BDB76B',0,'카고팬츠',40000,'2023-10-30','2023-10-30','1100','무신사',0,'면',2,_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0','003003','https://image.msscdn.net/images/goods_img/20231023/3647015/3647015_16980338458593_500.jpg'),(16,'8B008B',0,'목도리',15000,'2023-10-30','2023-10-30','1001','무신사',0,'울',1,_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0','004003','https://image.msscdn.net/images/goods_img/20231023/3647015/3647015_16980338458593_500.jpg'),(17,'FF6347',0,'패딩',130000,'2023-10-30','2023-10-30','1000','무신사',0,'면',3,_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0','001001','https://image.msscdn.net/images/goods_img/20231023/3647015/3647015_16980338458593_500.jpg'),(18,'FFD700',0,'후드',36000,'2023-10-30','2023-10-30','1011','무신사',0,'면',2,_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0','002002','https://image.msscdn.net/images/goods_img/20231023/3647015/3647015_16980338458593_500.jpg'),(19,'20B2AA',0,'청바지',38000,'2023-10-30','2023-10-30','1010','무신사',0,'청',2,_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0','003001','https://image.msscdn.net/images/goods_img/20231023/3647015/3647015_16980338458593_500.jpg'),(20,'FF69B4',0,'귀마개',5500,'2023-10-30','2023-10-30','1000','무신사',0,'면',1,_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0','004001','https://image.msscdn.net/images/goods_img/20231023/3647015/3647015_16980338458593_500.jpg');
/*!40000 ALTER TABLE `clothes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clothes_in_ai_check_outfit`
--

DROP TABLE IF EXISTS `clothes_in_ai_check_outfit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clothes_in_ai_check_outfit` (
  `ai_check_outfit_id` int NOT NULL,
  `clothes_id` int NOT NULL,
  `result` text,
  `fitness_num` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clothes_in_ai_check_outfit`
--

LOCK TABLES `clothes_in_ai_check_outfit` WRITE;
/*!40000 ALTER TABLE `clothes_in_ai_check_outfit` DISABLE KEYS */;
INSERT INTO `clothes_in_ai_check_outfit` VALUES (1,1,'쌀쌀한 날씨에는 후드티가 좋습니다',90),(1,2,'청바지가 따뜻해보여요',90);
/*!40000 ALTER TABLE `clothes_in_ai_check_outfit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clothes_in_ai_outfit`
--

DROP TABLE IF EXISTS `clothes_in_ai_outfit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clothes_in_ai_outfit` (
  `ai_ rec_outfit_id` int NOT NULL,
  `clothes_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clothes_in_ai_outfit`
--

LOCK TABLES `clothes_in_ai_outfit` WRITE;
/*!40000 ALTER TABLE `clothes_in_ai_outfit` DISABLE KEYS */;
INSERT INTO `clothes_in_ai_outfit` VALUES (1,1),(1,2);
/*!40000 ALTER TABLE `clothes_in_ai_outfit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clothes_in_friend_outfit`
--

DROP TABLE IF EXISTS `clothes_in_friend_outfit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clothes_in_friend_outfit` (
  `friend_outfit_id` int NOT NULL,
  `clothes_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clothes_in_friend_outfit`
--

LOCK TABLES `clothes_in_friend_outfit` WRITE;
/*!40000 ALTER TABLE `clothes_in_friend_outfit` DISABLE KEYS */;
INSERT INTO `clothes_in_friend_outfit` VALUES (1,1),(1,2);
/*!40000 ALTER TABLE `clothes_in_friend_outfit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `follower`
--

DROP TABLE IF EXISTS `follower`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `follower` (
  `my_id` binary(16) NOT NULL,
  `follower_id` binary(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `follower`
--

LOCK TABLES `follower` WRITE;
/*!40000 ALTER TABLE `follower` DISABLE KEYS */;
INSERT INTO `follower` VALUES (_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0	'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\n'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\r'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\Z'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0 '),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0	'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\n'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\r'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\Z'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0');
/*!40000 ALTER TABLE `follower` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `following`
--

DROP TABLE IF EXISTS `following`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `following` (
  `my_id` binary(16) NOT NULL,
  `following_id` binary(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `following`
--

LOCK TABLES `following` WRITE;
/*!40000 ALTER TABLE `following` DISABLE KEYS */;
INSERT INTO `following` VALUES (_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0	',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\n',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\r',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\Z',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0	',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\n',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\r',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\Z',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0 ',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0');
/*!40000 ALTER TABLE `following` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `friend_outfit`
--

DROP TABLE IF EXISTS `friend_outfit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `friend_outfit` (
  `id` int NOT NULL,
  `reg_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `friend_outfit`
--

LOCK TABLES `friend_outfit` WRITE;
/*!40000 ALTER TABLE `friend_outfit` DISABLE KEYS */;
INSERT INTO `friend_outfit` VALUES (1,'2023-10-30 13:30:30');
/*!40000 ALTER TABLE `friend_outfit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `guest_book`
--

DROP TABLE IF EXISTS `guest_book`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `guest_book` (
  `id` int NOT NULL,
  `owner_id` binary(16) DEFAULT NULL,
  `writer_id` binary(16) DEFAULT NULL,
  `post` text,
  `reg_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `guest_book`
--

LOCK TABLES `guest_book` WRITE;
/*!40000 ALTER TABLE `guest_book` DISABLE KEYS */;
INSERT INTO `guest_book` VALUES (1,_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0','안녕하세요1','2023-10-30 13:38:42'),(2,_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0','안녕하세요2','2023-10-30 13:38:42'),(3,_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0','안녕하세요3','2023-10-30 13:38:42');
/*!40000 ALTER TABLE `guest_book` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `large_category`
--

LOCK TABLES `large_category` WRITE;
/*!40000 ALTER TABLE `large_category` DISABLE KEYS */;
INSERT INTO `large_category` VALUES ('001','아우터'),('002','상의'),('003','하의'),('004','아이템');
/*!40000 ALTER TABLE `large_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `member`
--

DROP TABLE IF EXISTS `member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member` (
  `id` binary(16) NOT NULL,
  `email` varchar(255) NOT NULL,
  `nickname` varchar(255) NOT NULL,
  `gender` int DEFAULT NULL,
  `age` int DEFAULT NULL,
  `profile_image` varchar(256) DEFAULT 'N/A',
  `name` varchar(5) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member`
--

LOCK TABLES `member` WRITE;
/*!40000 ALTER TABLE `member` DISABLE KEYS */;
INSERT INTO `member` VALUES (_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0','goo.jg.kwon@gmail.com','Jingoo',0,55,'https://edu.ssafy.com/edu/comm/imgDownload.do?userId=8756KsbnGjsbUJRswwvXXw%3D%3D','관리자'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0','goo.jg.kwon@gmail.com','Jingoo',1,26,'https://edu.ssafy.com/edu/comm/imgDownload.do?userId=8756KsbnGjsbUJRswwvXXw%3D%3D','권현우'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0','goo.jg.kwon@gmail.com','Jingoo',1,20,'https://edu.ssafy.com/edu/comm/imgDownload.do?userId=8756KsbnGjsbUJRswwvXXw%3D%3D','강한'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0','hyeon.dh.kim@gmail.com','KDH',0,32,'https://edu.ssafy.com/edu/comm/imgDownload.do?userId=8756KsbnGjsbUJRswwvXXw%3D%3D','김동현'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0','goo.jg.kwon@gmail.com','Jingoo',1,20,'https://edu.ssafy.com/edu/comm/imgDownload.do?userId=8756KsbnGjsbUJRswwvXXw%3D%3D','김솔'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0','goo.jg.kwon@gmail.com','Jingoo',1,20,'https://edu.ssafy.com/edu/comm/imgDownload.do?userId=8756KsbnGjsbUJRswwvXXw%3D%3D','고서영'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0','goo.jg.kwon@gmail.com','Jingoo',1,20,'https://edu.ssafy.com/edu/comm/imgDownload.do?userId=8756KsbnGjsbUJRswwvXXw%3D%3D','유상진'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0','goo.jg.kwon@gmail.com','Jingoo',1,20,'https://edu.ssafy.com/edu/comm/imgDownload.do?userId=8756KsbnGjsbUJRswwvXXw%3D%3D','안희경'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0	','goo.jg.kwon@gmail.com','Jingoo',1,20,'https://edu.ssafy.com/edu/comm/imgDownload.do?userId=8756KsbnGjsbUJRswwvXXw%3D%3D','이동민'),(_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0','goo.jg.kwon@gmail.com','Jingoo',1,20,'https://edu.ssafy.com/edu/comm/imgDownload.do?userId=8756KsbnGjsbUJRswwvXXw%3D%3D','조성환'),(_binary '11\0\0\0\0\0\0\0\0\0\0\0\0\0\0','goo.jg.kwon@gmail.com','Hyunsoo',0,25,'https://edu.ssafy.com/edu/comm/imgDownload.do?userId=8756KsbnGjsbUJRswwvXXw%3D%3D','김현수'),(_binary '12\0\0\0\0\0\0\0\0\0\0\0\0\0\0','goo.jg.kwon@gmail.com','Jiyoung',1,30,'https://edu.ssafy.com/edu/comm/imgDownload.do?userId=8756KsbnGjsbUJRswwvXXw%3D%3D','이지영'),(_binary '13\0\0\0\0\0\0\0\0\0\0\0\0\0\0','goo.jg.kwon@gmail.com','Junho',0,32,'https://edu.ssafy.com/edu/comm/imgDownload.do?userId=8756KsbnGjsbUJRswwvXXw%3D%3D','박준호'),(_binary '14\0\0\0\0\0\0\0\0\0\0\0\0\0\0','goo.jg.kwon@gmail.com','Younghee',1,28,'https://edu.ssafy.com/edu/comm/imgDownload.do?userId=8756KsbnGjsbUJRswwvXXw%3D%3D','최영희'),(_binary '15\0\0\0\0\0\0\0\0\0\0\0\0\0\0','goo.jg.kwon@gmail.com','Minseok',0,35,'https://edu.ssafy.com/edu/comm/imgDownload.do?userId=8756KsbnGjsbUJRswwvXXw%3D%3D','장민석'),(_binary '16\0\0\0\0\0\0\0\0\0\0\0\0\0\0','goo.jg.kwon@gmail.com','Harin',1,29,'https://edu.ssafy.com/edu/comm/imgDownload.do?userId=8756KsbnGjsbUJRswwvXXw%3D%3D','윤하린'),(_binary '17\0\0\0\0\0\0\0\0\0\0\0\0\0\0','goo.jg.kwon@gmail.com','Taejun',0,33,'https://edu.ssafy.com/edu/comm/imgDownload.do?userId=8756KsbnGjsbUJRswwvXXw%3D%3D','송태준'),(_binary '18\0\0\0\0\0\0\0\0\0\0\0\0\0\0','goo.jg.kwon@gmail.com','Nayoung',1,27,'https://edu.ssafy.com/edu/comm/imgDownload.do?userId=8756KsbnGjsbUJRswwvXXw%3D%3D','김나영'),(_binary '19\0\0\0\0\0\0\0\0\0\0\0\0\0\0','goo.jg.kwon@gmail.com','Sanghoon',0,31,'https://edu.ssafy.com/edu/comm/imgDownload.do?userId=8756KsbnGjsbUJRswwvXXw%3D%3D','이상훈'),(_binary '20\0\0\0\0\0\0\0\0\0\0\0\0\0\0','goo.jg.kwon@gmail.com','Jimin',1,26,'https://edu.ssafy.com/edu/comm/imgDownload.do?userId=8756KsbnGjsbUJRswwvXXw%3D%3D','박지민'),(_binary '21\0\0\0\0\0\0\0\0\0\0\0\0\0\0','goo.jg.kwon@gmail.com','Dowon',0,34,'https://edu.ssafy.com/edu/comm/imgDownload.do?userId=8756KsbnGjsbUJRswwvXXw%3D%3D','황도원'),(_binary '22\0\0\0\0\0\0\0\0\0\0\0\0\0\0','goo.jg.kwon@gmail.com','Seoyoon',1,36,'https://edu.ssafy.com/edu/comm/imgDownload.do?userId=8756KsbnGjsbUJRswwvXXw%3D%3D','김서윤'),(_binary '23\0\0\0\0\0\0\0\0\0\0\0\0\0\0','goo.jg.kwon@gmail.com','Hyunwoo',0,28,'https://edu.ssafy.com/edu/comm/imgDownload.do?userId=8756KsbnGjsbUJRswwvXXw%3D%3D','박현우'),(_binary '24\0\0\0\0\0\0\0\0\0\0\0\0\0\0','goo.jg.kwon@gmail.com','Somin',1,29,'https://edu.ssafy.com/edu/comm/imgDownload.do?userId=8756KsbnGjsbUJRswwvXXw%3D%3D','이소민'),(_binary '25\0\0\0\0\0\0\0\0\0\0\0\0\0\0','goo.jg.kwon@gmail.com','Hojun',0,37,'https://edu.ssafy.com/edu/comm/imgDownload.do?userId=8756KsbnGjsbUJRswwvXXw%3D%3D','장호준'),(_binary '26\0\0\0\0\0\0\0\0\0\0\0\0\0\0','goo.jg.kwon@gmail.com','Aram',1,39,'https://edu.ssafy.com/edu/comm/imgDownload.do?userId=8756KsbnGjsbUJRswwvXXw%3D%3D','유아람'),(_binary '27\0\0\0\0\0\0\0\0\0\0\0\0\0\0','goo.jg.kwon@gmail.com','Jinwook',0,40,'https://edu.ssafy.com/edu/comm/imgDownload.do?userId=8756KsbnGjsbUJRswwvXXw%3D%3D','김진욱'),(_binary '28\0\0\0\0\0\0\0\0\0\0\0\0\0\0','goo.jg.kwon@gmail.com','Hana',1,38,'https://edu.ssafy.com/edu/comm/imgDownload.do?userId=8756KsbnGjsbUJRswwvXXw%3D%3D','박하나'),(_binary '29\0\0\0\0\0\0\0\0\0\0\0\0\0\0','goo.jg.kwon@gmail.com','Dohyun',0,32,'https://edu.ssafy.com/edu/comm/imgDownload.do?userId=8756KsbnGjsbUJRswwvXXw%3D%3D','이도현'),(_binary '30\0\0\0\0\0\0\0\0\0\0\0\0\0\0','goo.jg.kwon@gmail.com','Yujin',1,31,'https://edu.ssafy.com/edu/comm/imgDownload.do?userId=8756KsbnGjsbUJRswwvXXw%3D%3D','김유진'),(_binary '31\0\0\0\0\0\0\0\0\0\0\0\0\0\0','goo.jg.kwon@gmail.com','Byungchan',0,33,'https://edu.ssafy.com/edu/comm/imgDownload.do?userId=8756KsbnGjsbUJRswwvXXw%3D%3D','최병찬'),(_binary '32\0\0\0\0\0\0\0\0\0\0\0\0\0\0','goo.jg.kwon@gmail.com','Haneul',1,34,'https://edu.ssafy.com/edu/comm/imgDownload.do?userId=8756KsbnGjsbUJRswwvXXw%3D%3D','이하늘'),(_binary '33\0\0\0\0\0\0\0\0\0\0\0\0\0\0','goo.jg.kwon@gmail.com','Sungmin',0,35,'https://edu.ssafy.com/edu/comm/imgDownload.do?userId=8756KsbnGjsbUJRswwvXXw%3D%3D','박성민'),(_binary '34\0\0\0\0\0\0\0\0\0\0\0\0\0\0','goo.jg.kwon@gmail.com','Yerin',1,28,'https://edu.ssafy.com/edu/comm/imgDownload.do?userId=8756KsbnGjsbUJRswwvXXw%3D%3D','김예린'),(_binary '35\0\0\0\0\0\0\0\0\0\0\0\0\0\0','goo.jg.kwon@gmail.com','Woojin',0,29,'https://edu.ssafy.com/edu/comm/imgDownload.do?userId=8756KsbnGjsbUJRswwvXXw%3D%3D','정우진'),(_binary '36\0\0\0\0\0\0\0\0\0\0\0\0\0\0','goo.jg.kwon@gmail.com','Soyoung',1,30,'https://edu.ssafy.com/edu/comm/imgDownload.do?userId=8756KsbnGjsbUJRswwvXXw%3D%3D','박소영'),(_binary '37\0\0\0\0\0\0\0\0\0\0\0\0\0\0','goo.jg.kwon@gmail.com','Jaehyun',0,31,'https://edu.ssafy.com/edu/comm/imgDownload.do?userId=8756KsbnGjsbUJRswwvXXw%3D%3D','이재현'),(_binary '38\0\0\0\0\0\0\0\0\0\0\0\0\0\0','goo.jg.kwon@gmail.com','Subin',1,32,'https://edu.ssafy.com/edu/comm/imgDownload.do?userId=8756KsbnGjsbUJRswwvXXw%3D%3D','황수빈'),(_binary '39\0\0\0\0\0\0\0\0\0\0\0\0\0\0','goo.jg.kwon@gmail.com','Taeyoung',0,36,'https://edu.ssafy.com/edu/comm/imgDownload.do?userId=8756KsbnGjsbUJRswwvXXw%3D%3D','김태영'),(_binary '40\0\0\0\0\0\0\0\0\0\0\0\0\0\0','goo.jg.kwon@gmail.com','Jia',1,27,'https://edu.ssafy.com/edu/comm/imgDownload.do?userId=8756KsbnGjsbUJRswwvXXw%3D%3D','윤지아');
/*!40000 ALTER TABLE `member` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `middle_category`
--

LOCK TABLES `middle_category` WRITE;
/*!40000 ALTER TABLE `middle_category` DISABLE KEYS */;
INSERT INTO `middle_category` VALUES ('001001','패딩','001'),('001002','코트','001'),('001003','자켓','001'),('002001','맨투맨','002'),('002002','후드','002'),('002003','반팔','002'),('003001','청바지','003'),('003002','반바지','003'),('003003','카고팬츠','003'),('004001','귀마개','004'),('004002','장갑','004'),('004003','목도리','004');
/*!40000 ALTER TABLE `middle_category` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-30 15:30:01
