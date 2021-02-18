CREATE TABLE `valid_value` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `value_group` varchar(255) NOT NULL,
  `value` varchar(255) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

CREATE TABLE `congregation` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

CREATE TABLE `address` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `address` varchar(255) NOT NULL,
  `type` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `type_idx` (`type`),
  CONSTRAINT `type` FOREIGN KEY (`type`) REFERENCES `valid_value` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `family` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `congregation_ID` int(11) NOT NULL,
  `address_ID` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `congregation_ID_idx` (`congregation_ID`),
  KEY `address_ID_idx` (`address_ID`),
  CONSTRAINT `addr_ID` FOREIGN KEY (`address_ID`) REFERENCES `address` (`ID`),
  CONSTRAINT `congregation_ID` FOREIGN KEY (`congregation_ID`) REFERENCES `congregation` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

CREATE TABLE `person` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `congregation_ID` int(11) NOT NULL,
  `f_name` varchar(45) NOT NULL,
  `l_name` varchar(45) NOT NULL,
  `occupation` varchar(255) DEFAULT NULL,
  `employer` varchar(255) DEFAULT NULL,
  `family_ID` int(11) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `person_congregation_ID_idx` (`congregation_ID`),
  KEY `person_family_ID_idx` (`family_ID`),
  CONSTRAINT `person_congregation_ID` FOREIGN KEY (`congregation_ID`) REFERENCES `congregation` (`ID`),
  CONSTRAINT `person_family_ID` FOREIGN KEY (`family_ID`) REFERENCES `family` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;


CREATE TABLE `person_address` (
  `person_ID` int(11) NOT NULL,
  `address_ID` int(11) NOT NULL,
  KEY `pa_address_ID_idx` (`address_ID`),
  KEY `pa_person_ID_idx` (`person_ID`),
  CONSTRAINT `pa_address_ID` FOREIGN KEY (`address_ID`) REFERENCES `address` (`ID`) ON DELETE CASCADE,
  CONSTRAINT `pa_person_ID` FOREIGN KEY (`person_ID`) REFERENCES `person` (`ID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


CREATE TABLE `phone_number` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `number` char(10) NOT NULL,
  `can_publish` tinyint(4) NOT NULL,
  `type` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `type_idx` (`type`),
  KEY `phone_number_type_idx` (`type`),
  CONSTRAINT `phone_number_type` FOREIGN KEY (`type`) REFERENCES `valid_value` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

CREATE TABLE `person_number` (
  `person_ID` int(11) NOT NULL,
  `number_ID` int(11) NOT NULL,
  PRIMARY KEY (`person_ID`,`number_ID`),
  KEY `pn_person_id_idx` (`person_ID`),
  KEY `pn_number_id_idx` (`number_ID`),
  CONSTRAINT `pn_number_id` FOREIGN KEY (`number_ID`) REFERENCES `phone_number` (`ID`) ON DELETE CASCADE,
  CONSTRAINT `pn_person_id` FOREIGN KEY (`person_ID`) REFERENCES `person` (`ID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;