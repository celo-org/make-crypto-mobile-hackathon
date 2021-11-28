CREATE DATABASE `kelvin` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
CREATE USER 'root'@'localhost'IDENTIFIED WITH mysql_native_password BY 'jellynightfatherwheel';
GRANT ALL ON *.* TO 'root'@'localhost';
FLUSH PRIVILEGES;

CREATE TABLE `employees` (
  `id` int NOT NULL auto_increment ,
  `firstName` varchar(14) NOT NULL,
  `lastName` varchar(16) NOT NULL,
  `gender` enum('M','F') NOT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


