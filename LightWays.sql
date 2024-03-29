-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 21, 2020 at 08:42 AM
-- Server version: 10.4.8-MariaDB
-- PHP Version: 7.3.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `LightWays`
--

CREATE DATABASE IF NOT EXISTS `LightWays` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `LightWays`;

-- --------------------------------------------------------

--
-- Table structure for table `CARDS`
--

CREATE TABLE `CARDS` (
  `CARD_ID` int(10) NOT NULL,
  `CARD_NAME` varchar(30) NOT NULL,
  `CARD_IP` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `DEVICES`
--

CREATE TABLE `DEVICES` (
  `DEVICE_ID` int(10) NOT NULL,
  `DEVICE_PIN` int(2) NOT NULL,
  `DEVICE_TYPE` varchar(20) NOT NULL,
  `DEVICE_POWER` int(10) NOT NULL,
  `DEVICE_LINE` int(2) NOT NULL,
  `DEVICE_COLUMN` int(2) NOT NULL,
  `DEVICE_STATUS` enum('ON','OFF') NOT NULL,
  `CARD_ID` int(10) NOT NULL,
  `ROOM_ID` int(10) NOT NULL,
  `GROUP_ID` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `FLOORS`
--

CREATE TABLE `FLOORS` (
  `FLOOR_ID` int(10) NOT NULL,
  `FLOOR_NAME` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `GROUPS`
--

CREATE TABLE `GROUPS` (
  `GROUP_ID` int(10) NOT NULL,
  `GROUP_NAME` varchar(30) NOT NULL,
  `GROUP_COLOR` varchar(7) NOT NULL,
  `GROUP_STATUS` enum('ON','OFF') NOT NULL,
  `ROOM_ID` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `HISTORY`
--

CREATE TABLE `HISTORY` (
  `HISTORY_USER` varchar(30) NOT NULL,
  `HISTORY_TYPE` enum('CONNECT','DISCONNECT','ON','OFF','ADD','EDIT','DELETE','RESET') NOT NULL,
  `HISTORY_DATA_ID` varchar(30) NOT NULL,
  `HISTORY_DATA` enum('USER','CARD','FLOOR','ROOM','GROUP','SCENE','DEVICE') NOT NULL,
  `HISTORY_DATE` date NOT NULL,
  `HISTORY_TIME` time NOT NULL,
  `HISTORY_OPTION` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `PERMISSIONS`
--

CREATE TABLE `PERMISSIONS` (
  `PERMISSION_ID` int(10) NOT NULL,
  `PERMISSION_TYPE` enum('FLOOR','ROOM') NOT NULL,
  `USER_LOGIN` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `ROOMS`
--

CREATE TABLE `ROOMS` (
  `ROOM_ID` int(10) NOT NULL,
  `ROOM_NAME` varchar(30) NOT NULL,
  `ROOM_WIDTH` int(2) NOT NULL,
  `ROOM_HEIGHT` int(2) NOT NULL,
  `FLOOR_ID` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `SCENENING`
--

CREATE TABLE `SCENENING` (
  `SCENE_ID` int(10) NOT NULL,
  `DEVICE_ID` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `SCENES`
--

CREATE TABLE `SCENES` (
  `SCENE_ID` int(10) NOT NULL,
  `SCENE_NAME` varchar(30) NOT NULL,
  `SCENE_START` time NOT NULL,
  `SCENE_END` time NOT NULL,
  `SCENE_DAYS` varchar(7) NOT NULL,
  `SCENE_STATUS` enum('ON','OFF') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `USERS`
--

CREATE TABLE `USERS` (
  `USER_LOGIN` varchar(30) NOT NULL,
  `USER_PASSWORD` varchar(30) NOT NULL,
  `USER_FNAME` varchar(30) NOT NULL,
  `USER_LNAME` varchar(30) NOT NULL,
  `USER_TYPE` enum('ADMIN','USER') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `USERS`
--

INSERT INTO `USERS` (`USER_LOGIN`, `USER_PASSWORD`, `USER_FNAME`, `USER_LNAME`, `USER_TYPE`) VALUES
('admin', 'admin', 'First Name', 'Last Name', 'ADMIN'),
('lightways', 'lightways', 'LightWays', 'Administrator', 'ADMIN');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `CARDS`
--
ALTER TABLE `CARDS`
  ADD PRIMARY KEY (`CARD_ID`);

--
-- Indexes for table `DEVICES`
--
ALTER TABLE `DEVICES`
  ADD PRIMARY KEY (`DEVICE_ID`),
  ADD KEY `fk_card_device` (`CARD_ID`),
  ADD KEY `fk_room_device` (`ROOM_ID`),
  ADD KEY `fk_group_device` (`GROUP_ID`);

--
-- Indexes for table `FLOORS`
--
ALTER TABLE `FLOORS`
  ADD PRIMARY KEY (`FLOOR_ID`);

--
-- Indexes for table `GROUPS`
--
ALTER TABLE `GROUPS`
  ADD PRIMARY KEY (`GROUP_ID`),
  ADD KEY `fk_room_group` (`ROOM_ID`);

--
-- Indexes for table `PERMISSIONS`
--
ALTER TABLE `PERMISSIONS`
  ADD PRIMARY KEY (`PERMISSION_ID`,`PERMISSION_TYPE`,`USER_LOGIN`),
  ADD KEY `fk_user_permission` (`USER_LOGIN`);

--
-- Indexes for table `ROOMS`
--
ALTER TABLE `ROOMS`
  ADD PRIMARY KEY (`ROOM_ID`),
  ADD KEY `fk_floor_room` (`FLOOR_ID`);

--
-- Indexes for table `SCENENING`
--
ALTER TABLE `SCENENING`
  ADD PRIMARY KEY (`SCENE_ID`,`DEVICE_ID`),
  ADD KEY `fk_device_scenening` (`DEVICE_ID`);

--
-- Indexes for table `SCENES`
--
ALTER TABLE `SCENES`
  ADD PRIMARY KEY (`SCENE_ID`);

--
-- Indexes for table `USERS`
--
ALTER TABLE `USERS`
  ADD PRIMARY KEY (`USER_LOGIN`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `CARDS`
--
ALTER TABLE `CARDS`
  MODIFY `CARD_ID` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `DEVICES`
--
ALTER TABLE `DEVICES`
  MODIFY `DEVICE_ID` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `FLOORS`
--
ALTER TABLE `FLOORS`
  MODIFY `FLOOR_ID` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `GROUPS`
--
ALTER TABLE `GROUPS`
  MODIFY `GROUP_ID` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ROOMS`
--
ALTER TABLE `ROOMS`
  MODIFY `ROOM_ID` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `SCENES`
--
ALTER TABLE `SCENES`
  MODIFY `SCENE_ID` int(10) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `DEVICES`
--
ALTER TABLE `DEVICES`
  ADD CONSTRAINT `fk_card_device` FOREIGN KEY (`CARD_ID`) REFERENCES `CARDS` (`CARD_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_group_device` FOREIGN KEY (`GROUP_ID`) REFERENCES `GROUPS` (`GROUP_ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_room_device` FOREIGN KEY (`ROOM_ID`) REFERENCES `ROOMS` (`ROOM_ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `GROUPS`
--
ALTER TABLE `GROUPS`
  ADD CONSTRAINT `fk_room_group` FOREIGN KEY (`ROOM_ID`) REFERENCES `ROOMS` (`ROOM_ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `PERMISSIONS`
--
ALTER TABLE `PERMISSIONS`
  ADD CONSTRAINT `fk_user_permission` FOREIGN KEY (`USER_LOGIN`) REFERENCES `USERS` (`USER_LOGIN`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `ROOMS`
--
ALTER TABLE `ROOMS`
  ADD CONSTRAINT `fk_floor_room` FOREIGN KEY (`FLOOR_ID`) REFERENCES `FLOORS` (`FLOOR_ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `SCENENING`
--
ALTER TABLE `SCENENING`
  ADD CONSTRAINT `fk_device_scenening` FOREIGN KEY (`DEVICE_ID`) REFERENCES `DEVICES` (`DEVICE_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_scene_scenening` FOREIGN KEY (`SCENE_ID`) REFERENCES `SCENES` (`SCENE_ID`) ON DELETE CASCADE ON UPDATE CASCADE;

DELIMITER $$
--
-- Events
--
CREATE DEFINER=`root`@`localhost` EVENT `SYSTEM_STATISTICS_CONFIGURATION` ON SCHEDULE EVERY 1 DAY STARTS '2020-05-05 23:59:55' ON COMPLETION PRESERVE ENABLE COMMENT 'SYSTEM_STATISTICS_CONFIGURATION' DO INSERT INTO HISTORY (HISTORY_USER, HISTORY_TYPE, HISTORY_DATA_ID, HISTORY_DATA, HISTORY_DATE, HISTORY_TIME)
SELECT 'SYSTEM', 'RESET', DEVICE_ID, 'DEVICE', CURRENT_DATE, '23:59:59' FROM DEVICES WHERE DEVICE_STATUS = 'ON'$$

DELIMITER ;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
