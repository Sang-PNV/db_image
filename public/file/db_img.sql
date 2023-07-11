/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE TABLE `comments` (
  `cmt_id` int NOT NULL AUTO_INCREMENT,
  `cmt_date` date NOT NULL,
  `content` varchar(250) NOT NULL,
  `user_id` int NOT NULL,
  `img_id` int NOT NULL,
  PRIMARY KEY (`cmt_id`),
  KEY `user_id` (`user_id`),
  KEY `img_id` (`img_id`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`img_id`) REFERENCES `images` (`img_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `images` (
  `img_id` int NOT NULL AUTO_INCREMENT,
  `img_name` varchar(250) NOT NULL,
  `url` varchar(250) NOT NULL,
  `img_desc` varchar(250) NOT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`img_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `images_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `save` (
  `save_date` date NOT NULL,
  `user_id` int NOT NULL,
  `img_id` int NOT NULL,
  PRIMARY KEY (`user_id`,`img_id`),
  KEY `img_id` (`img_id`),
  CONSTRAINT `save_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `save_ibfk_2` FOREIGN KEY (`img_id`) REFERENCES `images` (`img_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `full_name` varchar(250) NOT NULL,
  `email` varchar(250) NOT NULL,
  `avatar` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `password` varchar(100) NOT NULL,
  `first_name` varchar(100) DEFAULT 'NULL',
  `last_name` varchar(100) DEFAULT 'NULL',
  `desc` varchar(500) DEFAULT NULL,
  `web` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `comments` (`cmt_id`, `cmt_date`, `content`, `user_id`, `img_id`) VALUES
(1, '2022-12-05', 'may', 3, 2);
INSERT INTO `comments` (`cmt_id`, `cmt_date`, `content`, `user_id`, `img_id`) VALUES
(2, '2022-12-05', 'tao', 4, 2);
INSERT INTO `comments` (`cmt_id`, `cmt_date`, `content`, `user_id`, `img_id`) VALUES
(4, '2022-01-01', 'chúng ta của hôm qua', 3, 2);
INSERT INTO `comments` (`cmt_id`, `cmt_date`, `content`, `user_id`, `img_id`) VALUES
(5, '2022-01-01', 'chúng ta của hôm qua', 3, 2),
(6, '2022-01-01', 'chúng ta của hôm qua', 3, 2),
(7, '2022-01-01', 'chúng ta của hôm qua', 3, 2),
(8, '2022-01-01', 'chúng ta của hôm qua', 5, 3);

INSERT INTO `images` (`img_id`, `img_name`, `url`, `img_desc`, `user_id`) VALUES
(2, 'tao', 'may', 'chung ta', 3);
INSERT INTO `images` (`img_id`, `img_name`, `url`, `img_desc`, `user_id`) VALUES
(3, 'may', 'tao', 'chung ta', 4);
INSERT INTO `images` (`img_id`, `img_name`, `url`, `img_desc`, `user_id`) VALUES
(4, 'chung tao', 'chung may', 'chung ta', 4);
INSERT INTO `images` (`img_id`, `img_name`, `url`, `img_desc`, `user_id`) VALUES
(8, 'hình nè', '1688896743292Sang.jpg', 'hình đẹp', 5);

INSERT INTO `save` (`save_date`, `user_id`, `img_id`) VALUES
('2020-12-05', 3, 2);
INSERT INTO `save` (`save_date`, `user_id`, `img_id`) VALUES
('2020-12-05', 4, 2);
INSERT INTO `save` (`save_date`, `user_id`, `img_id`) VALUES
('2020-12-05', 4, 3);

INSERT INTO `users` (`user_id`, `full_name`, `email`, `avatar`, `password`, `first_name`, `last_name`, `desc`, `web`) VALUES
(1, 'David Beckham', 'David@gmail.com', '1688897040900Sang.jpg', '123', 'Beckham', 'David', 'mô tả', 'web nè');
INSERT INTO `users` (`user_id`, `full_name`, `email`, `avatar`, `password`, `first_name`, `last_name`, `desc`, `web`) VALUES
(3, 'Tom', 'Tom@gmail.com', NULL, '123', 'NULL', 'NULL', NULL, NULL);
INSERT INTO `users` (`user_id`, `full_name`, `email`, `avatar`, `password`, `first_name`, `last_name`, `desc`, `web`) VALUES
(4, 'Sue', 'Sue@gmail.com', NULL, '123', 'NULL', 'NULL', NULL, NULL);
INSERT INTO `users` (`user_id`, `full_name`, `email`, `avatar`, `password`, `first_name`, `last_name`, `desc`, `web`) VALUES
(5, 'Mie', 'Mie@gmail.com', 'NULL', '123', 'NULL', 'NULL', NULL, NULL),
(6, 'John', 'john@gmail.com', NULL, '123', 'NULL', 'NULL', NULL, NULL),
(7, 'wick', 'wick@gmail.com', NULL, '$2b$10$0MMik.NKt536n1kK91veEOG9OWlHfpwuK7ri1IU6XMtDfZqSatOXG', 'NULL', 'NULL', NULL, NULL),
(8, 'troc', 'troc@gmail.com', NULL, '$2b$10$re1owUcKhm3J/J/uQUevWO3n.I2QwmueKewNgH1AEOXZeehhcBvGi', 'NULL', 'NULL', NULL, NULL),
(9, 'quen', 'quen@gmail.com', NULL, '$2b$10$SWje9EAI4sfGGWhVgFdS5OJJ3OD9j30JHsdgilfGijKVXSy/AjnKK', 'NULL', 'NULL', NULL, NULL),
(10, 'wick', 'wick@gmail.comm', NULL, '$2b$10$rcRO5FH/7BRo5kT63GyBUu3kRV4SRJ9zOAoAMH2buTH45P2WUSN.u', 'NULL', 'NULL', NULL, NULL),
(11, 'dick', 'dick@gmail.com', NULL, '$2b$10$FnOaJZn/JDdwOFf7zMc46.uTKdE.vmsQoXTRmms9KQgCnuOaLmF/W', 'NULL', 'NULL', NULL, NULL);


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;