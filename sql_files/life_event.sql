CREATE TABLE `life_event` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `person_ID` int(11) NOT NULL,
  `description` varchar(255) NOT NULL,
  `date` datetime DEFAULT NULL,
  `type` int(11) NOT NULL,
  `visable` tinyint(4) DEFAULT 1,
  PRIMARY KEY (`ID`),
  KEY `le_person_ID_idx` (`person_ID`),
  KEY `le_type_idx` (`type`),
  CONSTRAINT `le_person_ID` FOREIGN KEY (`person_ID`) REFERENCES `person` (`ID`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `le_type` FOREIGN KEY (`type`) REFERENCES `valid_value` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
