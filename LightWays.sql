-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 14, 2020 at 03:08 AM
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
-- Database: `lightWays`
--

-- --------------------------------------------------------

--
-- Table structure for table `CARDS`
--

CREATE TABLE `CARDS` (
  `CARD_ID` int(10) NOT NULL,
  `CARD_NAME` varchar(30) NOT NULL,
  `CARD_IP` varchar(30) NOT NULL,
  `USER_LOGIN` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `DEVICES`
--

CREATE TABLE `DEVICES` (
  `DEVICE_ID` int(10) NOT NULL,
  `DEVICE_PIN` int(2) NOT NULL,
  `DEVICE_TYPE` varchar(20) NOT NULL,
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
  `FLOOR_NAME` varchar(30) NOT NULL,
  `USER_LOGIN` varchar(30) NOT NULL
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
  `HISTORY_ID` int(100) NOT NULL,
  `HISTORY_TYPE` enum('CONNECT','DISCONNECT','TURNON','TURNOFF','ADD','EDIT','DELETE') NOT NULL,
  `HISTORY_DATE` date NOT NULL,
  `HISTORY_TIME` time NOT NULL,
  `HISTORY_OPTION` varchar(30) DEFAULT NULL,
  `HISTORY_USER` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `PERMISSIONS`
--

CREATE TABLE `PERMISSIONS` (
  `PERMISSION_ID` int(10) NOT NULL,
  `PERMISSION_TYPE` enum('FLOOR','ROOM','GROUP','DEVICE') NOT NULL,
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
-- Table structure for table `USERS`
--

CREATE TABLE `USERS` (
  `USER_LOGIN` varchar(30) NOT NULL,
  `USER_PASSWORD` varchar(50) NOT NULL,
  `USER_FNAME` varchar(30) NOT NULL,
  `USER_LNAME` varchar(30) NOT NULL,
  `USER_TYPE` enum('SUPER','ADMIN','USER') NOT NULL,
  `USER_BOSS` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `USERS`
--

INSERT INTO `USERS` (`USER_LOGIN`, `USER_PASSWORD`, `USER_FNAME`, `USER_LNAME`, `USER_TYPE`, `USER_BOSS`) VALUES
('super', 'super', 'LightWays', 'Administrator', 'SUPER', 'super');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `CARDS`
--
ALTER TABLE `CARDS`
  ADD PRIMARY KEY (`CARD_ID`),
  ADD KEY `fk_user_card` (`USER_LOGIN`);

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
  ADD PRIMARY KEY (`FLOOR_ID`),
  ADD KEY `fk_user_floor` (`USER_LOGIN`);

--
-- Indexes for table `GROUPS`
--
ALTER TABLE `GROUPS`
  ADD PRIMARY KEY (`GROUP_ID`),
  ADD KEY `fk_room_group` (`ROOM_ID`);

--
-- Indexes for table `HISTORY`
--
ALTER TABLE `HISTORY`
  ADD PRIMARY KEY (`HISTORY_ID`);

--
-- Indexes for table `PERMISSIONS`
--
ALTER TABLE `PERMISSIONS`
  ADD PRIMARY KEY (`PERMISSION_ID`,`PERMISSION_TYPE`,`USER_LOGIN`);

--
-- Indexes for table `ROOMS`
--
ALTER TABLE `ROOMS`
  ADD PRIMARY KEY (`ROOM_ID`),
  ADD KEY `fk_floor_room` (`FLOOR_ID`);

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
-- AUTO_INCREMENT for table `HISTORY`
--
ALTER TABLE `HISTORY`
  MODIFY `HISTORY_ID` int(100) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ROOMS`
--
ALTER TABLE `ROOMS`
  MODIFY `ROOM_ID` int(10) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `CARDS`
--
ALTER TABLE `CARDS`
  ADD CONSTRAINT `fk_user_card` FOREIGN KEY (`USER_LOGIN`) REFERENCES `USERS` (`USER_LOGIN`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `DEVICES`
--
ALTER TABLE `DEVICES`
  ADD CONSTRAINT `fk_card_device` FOREIGN KEY (`CARD_ID`) REFERENCES `CARDS` (`CARD_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_room_device` FOREIGN KEY (`ROOM_ID`) REFERENCES `ROOMS` (`ROOM_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_group_device` FOREIGN KEY (`GROUP_ID`) REFERENCES `GROUPS` (`GROUP_ID`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `FLOORS`
--
ALTER TABLE `FLOORS`
  ADD CONSTRAINT `fk_user_floor` FOREIGN KEY (`USER_LOGIN`) REFERENCES `USERS` (`USER_LOGIN`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `GROUPS`
--
ALTER TABLE `GROUPS`
  ADD CONSTRAINT `fk_room_group` FOREIGN KEY (`ROOM_ID`) REFERENCES `ROOMS` (`ROOM_ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `ROOMS`
--
ALTER TABLE `ROOMS`
  ADD CONSTRAINT `fk_floor_room` FOREIGN KEY (`FLOOR_ID`) REFERENCES `FLOORS` (`FLOOR_ID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
