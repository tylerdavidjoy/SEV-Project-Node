const sql = require("./db.js");

// Constructor
const Family = function (family) {
  this.ID = family.ID;
  this.congregation_ID = family.congregation_ID;
  this.address_ID = family.address_ID;
  this.head_ID = family.head_ID;
  this.image = family.image;
}

Family.create = (family, result) => {
  sql.query(`INSERT INTO church.family SET congregation_ID = "${family.congregation_ID}", address_ID = "${family.address_ID}", 
            head_ID = "${family.head_ID}", image = "${family.image}"`, (err, res) => {
    if (err) {
      if (err.code == "ER_NO_REFERENCED_ROW_2" && err.sqlMessage.includes("REFERENCES `congregation`")) {
        result({ kind: "not_found_congregation" }, null);
        return;
      } else if (err.code == "ER_NO_REFERENCED_ROW_2" && err.sqlMessage.includes("REFERENCES `address`")) {
        result({ kind: "not_found_address" }, null);
        return;
      }
      else if (err.code == "ER_NO_REFERENCED_ROW_2" && err.sqlMessage.includes("REFERENCES `person`")) {
        result({ kind: "not_found_person" }, null);
        return;
      }
      else {
        console.log("error: ", err);
        result(err, null);
        return;
      }
    } else {
      result(null, family);
    }
  })
}

Family.findAll = result => {
  sql.query("SELECT * FROM family", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("families: ", res);
    result(null, res);
  })
}

Family.findById = (id, result) => {
  sql.query(`SELECT * FROM family WHERE family.ID = "${id}"`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res) {
      console.log("found family: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found family with the id
    result({ kind: "not_found" }, null);
  })
}

Family.findPersonsInFamily = (id, result) => {
  sql.query(`SELECT * FROM person WHERE person.family_ID = "${id}"`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("persons: ", res);
    result(null, res);
  })
}

Family.findHeadOfFamily = (id, result) => {
  sql.query(`SELECT * FROM person WHERE person.ID IN (SELECT head_ID FROM family WHERE ID = "${id}")`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res) {
      console.log("person: ", res);
      result(null, res);
      return;
    }
    
    // not found family with the id
    result({ kind: "not_found" }, null);
  })
}

Family.findNameList = result => {
  sql.query(`SELECT family.ID, person.l_name, family.image FROM family INNER JOIN person ON family.head_ID=person.ID`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, res);
  })
}

Family.findFamilyForPerson = (person_ID, result) => {
  sql.query(`SELECT * FROM family WHERE family.ID IN (SELECT family_ID FROM person WHERE person.ID = "${person_ID}")`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res) {
      console.log("found family: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found family for person
    result({ kind: "not_found" }, null);
  })
}


Family.updateById = (id, family, result) => {
  sql.query(`UPDATE family SET congregation_ID = "${family.congregation_ID}", address_ID = "${family.address_ID}", 
            head_ID = "${family.head_ID}" WHERE family.ID = "${id}"`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.affectedRows == 0) {
      // not found family with the id
      result({ kind: "not_found" }, null);
      return;
    }
    result(null, res);
  });
}

Family.remove = (id, result) => {
  let familyPromise = new Promise(function (familyResolve, familyReject) {
    sql.query(`DELETE FROM family WHERE ID = "${id}"`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        familyReject(err);
      }

      if (res.affectedRows == 0) {
        // not found family with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("deleted family with id: ", id);
      result(null, res);
      familyResolve();
    });
  })
  familyPromise.then(
    function () {
      garbageCollection();
    },
    function (error) {
      console.log("error: ", error);
    }
  )
};

function garbageCollection() {
  sql.query(`DELETE FROM address WHERE NOT EXISTS (SELECT * from person_address WHERE person_address.address_ID = address.ID)
    AND NOT EXISTS (SELECT * FROM family WHERE family.address_ID = address.ID)`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      return;
    }

    if (res.affectedRows == 0) {
      console.log("No deleted address rows");
      return;
    }
  })
}
module.exports = Family;
