CREATE TABLE `phone_number` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `number` char(10) NOT NULL,
  `can_publish` tinyint(4) NOT NULL,
  `type` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;