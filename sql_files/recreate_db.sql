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
  CONSTRAINT `type` FOREIGN KEY (`type`) REFERENCES `valid_value` (`ID`) ON DELETE SET NULL ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;

CREATE TABLE `phone_number` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `number` char(10) NOT NULL,
  `can_publish` tinyint(4) NOT NULL,
  `type` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `phone_number_type_idx` (`type`),
  CONSTRAINT `phone_number_type` FOREIGN KEY (`type`) REFERENCES `valid_value` (`ID`) ON DELETE SET NULL ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;

CREATE TABLE `family` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `congregation_ID` int(11) NOT NULL,
  `address_ID` int(11) DEFAULT NULL,
  `image` varchar(255) NOT NULL DEFAULT 'default.jpg',
  PRIMARY KEY (`ID`),
  KEY `congregation_ID_idx` (`congregation_ID`),
  KEY `address_ID_idx` (`address_ID`),
  CONSTRAINT `addr_ID` FOREIGN KEY (`address_ID`) REFERENCES `address` (`ID`) ON DELETE SET NULL ON UPDATE NO ACTION,
  CONSTRAINT `congregation_ID` FOREIGN KEY (`congregation_ID`) REFERENCES `congregation` (`ID`) ON DELETE CASCADE ON UPDATE NO ACTION
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
  `gender` enum('male','female','other') NOT NULL DEFAULT 'other',
  `preferred_name` varchar(45) DEFAULT NULL,
  `role` int(11) DEFAULT NULL,
  `image` varchar(255) NOT NULL DEFAULT 'default.jpg',
  PRIMARY KEY (`ID`),
  KEY `person_congregation_ID_idx` (`congregation_ID`),
  KEY `person_family_ID_idx` (`family_ID`),
  KEY `person_role_idx` (`role`),
  CONSTRAINT `person_congregation_ID` FOREIGN KEY (`congregation_ID`) REFERENCES `congregation` (`ID`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `person_family_ID` FOREIGN KEY (`family_ID`) REFERENCES `family` (`ID`) ON DELETE SET NULL ON UPDATE NO ACTION,
  CONSTRAINT `person_role` FOREIGN KEY (`role`) REFERENCES `valid_value` (`ID`) ON DELETE SET NULL ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;

ALTER TABLE `church`.`family` 
ADD COLUMN `head_ID` INT NULL AFTER `address_ID`,
ADD INDEX `head_ID_idx` (`head_ID`);
;
ALTER TABLE `church`.`family` 
ADD CONSTRAINT `head_ID`
  FOREIGN KEY (`head_ID`)
  REFERENCES `church`.`person` (`ID`)
  ON DELETE SET NULL
  ON UPDATE NO ACTION;

CREATE TABLE `person_address` (
  `person_ID` int(11) NOT NULL,
  `address_ID` int(11) NOT NULL,
  KEY `pa_address_ID_idx` (`address_ID`),
  KEY `pa_person_ID_idx` (`person_ID`),
  CONSTRAINT `pa_address_ID` FOREIGN KEY (`address_ID`) REFERENCES `address` (`ID`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `pa_person_ID` FOREIGN KEY (`person_ID`) REFERENCES `person` (`ID`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `person_number` (
  `person_ID` int(11) NOT NULL,
  `number_ID` int(11) NOT NULL,
  KEY `pn_person_id_idx` (`person_ID`),
  KEY `pn_number_id_idx` (`number_ID`),
  CONSTRAINT `pn_number_id` FOREIGN KEY (`number_ID`) REFERENCES `phone_number` (`ID`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `pn_person_id` FOREIGN KEY (`person_ID`) REFERENCES `person` (`ID`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `life_event` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `person_ID` int(11) NOT NULL,
  `description` varchar(255) NOT NULL,
  `date` datetime DEFAULT NULL,
  `type` int(11) NOT NULL,
  `visible` tinyint(4) DEFAULT 1,
  PRIMARY KEY (`ID`),
  KEY `le_person_ID_idx` (`person_ID`),
  KEY `le_type_idx` (`type`),
  CONSTRAINT `le_person_ID` FOREIGN KEY (`person_ID`) REFERENCES `person` (`ID`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `le_type` FOREIGN KEY (`type`) REFERENCES `valid_value` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;

CREATE TABLE `group` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `type` int(11) NOT NULL,
  `leader` int(11) NOT NULL,
  `congregation_ID` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `image` varchar(255) NOT NULL DEFAULT 'default.jpg',
  PRIMARY KEY (`ID`),
  UNIQUE KEY `name_UNIQUE` (`name`),
  KEY `group_congregation_ID_idx` (`congregation_ID`),
  KEY `group_type_idx` (`type`),
  KEY `group_leader_idx` (`leader`),
  CONSTRAINT `group_congregation_ID` FOREIGN KEY (`congregation_ID`) REFERENCES `congregation` (`ID`) ON DELETE CASCADE,
  CONSTRAINT `group_leader` FOREIGN KEY (`leader`) REFERENCES `person` (`ID`),
  CONSTRAINT `group_type` FOREIGN KEY (`type`) REFERENCES `valid_value` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;


CREATE TABLE `group_person` (
  `group_ID` int(11) NOT NULL,
  `person_ID` int(11) NOT NULL,
  PRIMARY KEY (`group_ID`,`person_ID`),
  KEY `gp_group_ID_idx` (`group_ID`),
  KEY `gp_person_ID_idx` (`person_ID`),
  CONSTRAINT `gp_group_ID` FOREIGN KEY (`group_ID`) REFERENCES `group` (`ID`) ON DELETE CASCADE,
  CONSTRAINT `gp_person_ID` FOREIGN KEY (`person_ID`) REFERENCES `person` (`ID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `room` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `room_number` varchar(255) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;

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
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;

CREATE TABLE `attendee` (
  `person_ID` int(11) NOT NULL,
  `event_ID` int(11) NOT NULL,
  PRIMARY KEY (`person_ID`,`event_ID`),
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
  PRIMARY KEY (`person1_ID`,`person2_ID`),
  KEY `relationship_type_idx` (`type`),
  KEY `person_one_relationship_idx` (`person1_ID`),
  KEY `person_two_relationship_idx` (`person2_ID`),
  CONSTRAINT `person_one_relationship` FOREIGN KEY (`person1_ID`) REFERENCES `person` (`ID`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `person_two_relationship` FOREIGN KEY (`person2_ID`) REFERENCES `person` (`ID`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `relationship_type` FOREIGN KEY (`type`) REFERENCES `valid_value` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT = 0 DEFAULT CHARSET=latin1;

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

CREATE TABLE `person_hobby` (
  `person_ID` int(11) NOT NULL,
  `hobby_ID` int(11) NOT NULL,
  KEY `ph_person_ID_idx` (`person_ID`),
  KEY `ph_hobby_ID_idx` (`hobby_ID`),
  CONSTRAINT `ph_hobby_ID` FOREIGN KEY (`hobby_ID`) REFERENCES `valid_value` (`ID`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `ph_person_ID` FOREIGN KEY (`person_ID`) REFERENCES `person` (`ID`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `person_involvement` (
  `person_ID` int(11) NOT NULL,
  `involvement_ID` int(11) NOT NULL,
  KEY `pi_person_ID_idx` (`person_ID`),
  KEY `pi_involvement_ID_idx` (`involvement_ID`),
  CONSTRAINT `pi_involvement_ID` FOREIGN KEY (`involvement_ID`) REFERENCES `valid_value` (`ID`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `pi_person_ID` FOREIGN KEY (`person_ID`) REFERENCES `person` (`ID`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `person_ministry` (
  `person_ID` int(11) NOT NULL,
  `ministry_ID` int(11) NOT NULL,
  KEY `pm_person_ID_idx` (`person_ID`),
  KEY `pm_ministry_ID_idx` (`ministry_ID`),
  CONSTRAINT `pm_ministry_ID` FOREIGN KEY (`ministry_ID`) REFERENCES `valid_value` (`ID`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `pm_person_ID` FOREIGN KEY (`person_ID`) REFERENCES `person` (`ID`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `person_doc` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `person_ID` int(11) NOT NULL,
  `doc_name` varchar(255) CHARACTER SET utf8mb4 NOT NULL,
  `display_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `person_ID_idx` (`person_ID`),
  CONSTRAINT `person_ID` FOREIGN KEY (`person_ID`) REFERENCES `person` (`ID`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;

CREATE TABLE `family_doc` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `family_ID` int(11) NOT NULL,
  `doc_name` varchar(255) CHARACTER SET utf8mb4 NOT NULL,
  `display_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `family_ID_idx` (`family_ID`),
  CONSTRAINT `family_ID` FOREIGN KEY (`family_ID`) REFERENCES `family` (`ID`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;

INSERT INTO `church`.`congregation` SET `name` = "Wilshire Church of Christ";

INSERT INTO `church`.`valid_value` SET `value_group` = "address", `value` = "current";
INSERT INTO `church`.`valid_value` SET `value_group` = "address", `value` = "old";

INSERT INTO `church`.`valid_value` SET `value_group` = "phone", `value` = "mobile";
INSERT INTO `church`.`valid_value` SET `value_group` = "phone", `value` = "work";
INSERT INTO `church`.`valid_value` SET `value_group` = "phone", `value` = "home";

INSERT INTO `church`.`valid_value` SET `value_group` = "relationship", `value` = "spouse";
INSERT INTO `church`.`valid_value` SET `value_group` = "relationship", `value` = "sibling";

INSERT INTO `church`.`valid_value` SET `value_group` = "ministry", `value` = "men's ministry";
INSERT INTO `church`.`valid_value` SET `value_group` = "ministry", `value` = "women's ministry";
INSERT INTO `church`.`valid_value` SET `value_group` = "ministry", `value` = "college ministry";
INSERT INTO `church`.`valid_value` SET `value_group` = "ministry", `value` = "youth ministry";
INSERT INTO `church`.`valid_value` SET `value_group` = "ministry", `value` = "personal evangelism";
INSERT INTO `church`.`valid_value` SET `value_group` = "ministry", `value` = "world bible school";
INSERT INTO `church`.`valid_value` SET `value_group` = "ministry", `value` = "radio ministry";
INSERT INTO `church`.`valid_value` SET `value_group` = "ministry", `value` = "transportation";
INSERT INTO `church`.`valid_value` SET `value_group` = "ministry", `value` = "building and grounds";
INSERT INTO `church`.`valid_value` SET `value_group` = "ministry", `value` = "advertising";
INSERT INTO `church`.`valid_value` SET `value_group` = "ministry", `value` = "door greeters";
INSERT INTO `church`.`valid_value` SET `value_group` = "involvement", `value` = "adult education";
INSERT INTO `church`.`valid_value` SET `value_group` = "involvement", `value` = "college education";
INSERT INTO `church`.`valid_value` SET `value_group` = "involvement", `value` = "youth group";
INSERT INTO `church`.`valid_value` SET `value_group` = "involvement", `value` = "primary education";
INSERT INTO `church`.`valid_value` SET `value_group` = "involvement", `value` = "children's education";
INSERT INTO `church`.`valid_value` SET `value_group` = "involvement", `value` = "rainbow village";
INSERT INTO `church`.`valid_value` SET `value_group` = "involvement", `value` = "vacation bible school";
INSERT INTO `church`.`valid_value` SET `value_group` = "involvement", `value` = "family life groups";
INSERT INTO `church`.`valid_value` SET `value_group` = "involvement", `value` = "visitation";
INSERT INTO `church`.`valid_value` SET `value_group` = "involvement", `value` = "communion preparation";
INSERT INTO `church`.`valid_value` SET `value_group` = "involvement", `value` = "worship leadership";
