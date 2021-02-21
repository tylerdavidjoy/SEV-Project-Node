CREATE TABLE `group` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `type` int(11) NOT NULL,
  `leader` int(11) NOT NULL,
  `congregation_ID` int(11) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
