CREATE TABLE `group` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `type` int(11) NOT NULL,
  `leader` int(11) NOT NULL,
  `congregation_ID` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `name_UNIQUE` (`name`),
  KEY `group_congregation_ID_idx` (`congregation_ID`),
  KEY `group_type_idx` (`type`),
  KEY `group_leader_idx` (`leader`),
  CONSTRAINT `group_congregation_ID` FOREIGN KEY (`congregation_ID`) REFERENCES `congregation` (`ID`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `group_leader` FOREIGN KEY (`leader`) REFERENCES `person` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `group_type` FOREIGN KEY (`type`) REFERENCES `valid_value` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;
