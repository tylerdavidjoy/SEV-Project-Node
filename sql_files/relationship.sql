CREATE TABLE `relationship` (
  `person1_ID` int(11) NOT NULL,
  `person2_ID` int(11) NOT NULL,
  `type` int(11) DEFAULT NULL,
  PRIMARY KEY (`person1_ID`,`person2_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
