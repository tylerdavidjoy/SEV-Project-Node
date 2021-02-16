CREATE TABLE `address` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `address` varchar(255) NOT NULL,
  `type` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `type_idx` (`type`),
  CONSTRAINT `type` FOREIGN KEY (`type`) REFERENCES `valid_value` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;