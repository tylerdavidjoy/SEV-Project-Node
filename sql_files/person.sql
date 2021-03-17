CREATE TABLE `person` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `congregation_ID` int(11) NOT NULL,
  `f_name` varchar(45) NOT NULL,
  `l_name` varchar(45) NOT NULL,
  `occupation` varchar(255) DEFAULT NULL,
  `employer` varchar(255) DEFAULT NULL,
  `family_ID` int(11) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `gender` enum('male','female','other') NOT NULL,
  `preferred_name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `person_congregation_ID_idx` (`congregation_ID`),
  KEY `person_family_ID_idx` (`family_ID`),
  CONSTRAINT `person_congregation_ID` FOREIGN KEY (`congregation_ID`) REFERENCES `congregation` (`ID`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `person_family_ID` FOREIGN KEY (`family_ID`) REFERENCES `family` (`ID`) ON DELETE SET NULL ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;
