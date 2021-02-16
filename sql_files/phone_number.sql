CREATE TABLE `phone_number` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `number` char(10) NOT NULL,
  `can_publish` tinyint(4) NOT NULL,
  `type` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `type_idx` (`type`),
  KEY `phone_number_type_idx` (`type`),
  CONSTRAINT `phone_number_type` FOREIGN KEY (`type`) REFERENCES `valid_value` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;