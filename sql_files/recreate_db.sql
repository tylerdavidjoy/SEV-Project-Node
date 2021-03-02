CREATE TABLE `valid_value` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `value_group` varchar(255) NOT NULL,
  `value` varchar(255) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;

CREATE TABLE `congregation` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;

CREATE TABLE `address` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `address` varchar(255) NOT NULL,
  `type` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `type_idx` (`type`),
  CONSTRAINT `type` FOREIGN KEY (`type`) REFERENCES `valid_value` (`ID`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;

CREATE TABLE `phone_number` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `number` char(10) NOT NULL,
  `can_publish` tinyint(4) NOT NULL,
  `type` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `type_idx` (`type`),
  KEY `phone_number_type_idx` (`type`),
  CONSTRAINT `phone_number_type` FOREIGN KEY (`type`) REFERENCES `valid_value` (`ID`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;

CREATE TABLE `family` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `congregation_ID` int(11) NOT NULL,
  `address_ID` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `congregation_ID_idx` (`congregation_ID`),
  KEY `address_ID_idx` (`address_ID`),
  CONSTRAINT `addr_ID` FOREIGN KEY (`address_ID`) REFERENCES `address` (`ID`),
  CONSTRAINT `congregation_ID` FOREIGN KEY (`congregation_ID`) REFERENCES `congregation` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;

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
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;

CREATE TABLE `person_address` (
  `person_ID` int(11) NOT NULL,
  `address_ID` int(11) NOT NULL,
  KEY `pa_address_ID_idx` (`address_ID`),
  KEY `pa_person_ID_idx` (`person_ID`),
  CONSTRAINT `pa_address_ID` FOREIGN KEY (`address_ID`) REFERENCES `address` (`ID`) ON DELETE CASCADE,
  CONSTRAINT `pa_person_ID` FOREIGN KEY (`person_ID`) REFERENCES `person` (`ID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `person_number` (
  `person_ID` int(11) NOT NULL,
  `number_ID` int(11) NOT NULL,
  KEY `pn_person_id_idx` (`person_ID`),
  KEY `pn_number_id_idx` (`number_ID`),
  CONSTRAINT `pn_number_id` FOREIGN KEY (`number_ID`) REFERENCES `phone_number` (`ID`) ON DELETE CASCADE,
  CONSTRAINT `pn_person_id` FOREIGN KEY (`person_ID`) REFERENCES `person` (`ID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `life_event` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `person_ID` int(11) NOT NULL,
  `description` varchar(255) NOT NULL,
  `date` datetime DEFAULT NULL,
  `type` int(11) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `group` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `type` int(11) NOT NULL,
  `leader` int(11) NOT NULL,
  `congregation_ID` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `group_congregation_ID_idx` (`congregation_ID`),
  KEY `group_type_idx` (`type`),
  KEY `group_leader_idx` (`leader`),
  CONSTRAINT `group_congregation_ID` FOREIGN KEY (`congregation_ID`) REFERENCES `congregation` (`ID`),
  CONSTRAINT `group_leader` FOREIGN KEY (`leader`) REFERENCES `person` (`ID`),
  CONSTRAINT `group_type` FOREIGN KEY (`type`) REFERENCES `valid_value` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;

CREATE TABLE `group_person` (
  `group_ID` int(11) NOT NULL,
  `person_ID` int(11) NOT NULL,
  KEY `gp_group_ID_idx` (`group_ID`),
  KEY `gp_person_ID_idx` (`person_ID`),
  CONSTRAINT `gp_group_ID` FOREIGN KEY (`group_ID`) REFERENCES `group` (`ID`) ON DELETE CASCADE,
  CONSTRAINT `gp_person_ID` FOREIGN KEY (`person_ID`) REFERENCES `person` (`ID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `room` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `room_number` varchar(255) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `event` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `date` datetime DEFAULT NULL,
  `leader` int(11) DEFAULT NULL,
  `location` int(11) DEFAULT NULL,
  `description` varchar(1000) CHARACTER SET utf8mb4 DEFAULT NULL,
  `recurring` tinyint(4) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `event_leader_idx` (`leader`),
  KEY `event_location_idx` (`location`),
  CONSTRAINT `event_leader` FOREIGN KEY (`leader`) REFERENCES `person` (`ID`) ON DELETE SET NULL ON UPDATE NO ACTION,
  CONSTRAINT `event_location` FOREIGN KEY (`location`) REFERENCES `room` (`ID`) ON DELETE SET NULL ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `attendee` (
  `person_ID` int(11) NOT NULL,
  `event_ID` int(11) NOT NULL,
  KEY `attendee_person_ID_idx` (`person_ID`),
  KEY `attendee_event_ID_idx` (`event_ID`),
  CONSTRAINT `attendee_event_ID` FOREIGN KEY (`event_ID`) REFERENCES `event` (`ID`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `attendee_person_ID` FOREIGN KEY (`person_ID`) REFERENCES `person` (`ID`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `event_group` (
  `event_ID` int(11) NOT NULL,
  `group_ID` int(11) NOT NULL,
  KEY `eg_event_ID_idx` (`event_ID`),
  KEY `eg_group_ID_idx` (`group_ID`),
  CONSTRAINT `eg_event_ID` FOREIGN KEY (`event_ID`) REFERENCES `event` (`ID`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `eg_group_ID` FOREIGN KEY (`group_ID`) REFERENCES `group` (`ID`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `relationship` (
  `person1_ID` int(11) NOT NULL,
  `person2_ID` int(11) NOT NULL,
  `type` int(11) DEFAULT NULL,
  PRIMARY KEY (`person1_ID`,`person2_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
