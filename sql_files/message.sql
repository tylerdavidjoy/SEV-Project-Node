CREATE TABLE `message` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `subject` varchar(45) NOT NULL,
  `message` varchar(3000) CHARACTER SET utf8mb4 NOT NULL,
  `type` int(11) NOT NULL,
  `time_sent` datetime NOT NULL,
  `receipient` int(11) NOT NULL,
  `receipient_type` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `message_type_idx` (`type`),
  CONSTRAINT `message_type` FOREIGN KEY (`type`) REFERENCES `valid_value` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;
