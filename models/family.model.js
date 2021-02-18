const sql = require("./db.js");

// Constructor
const Family = function(family) {
    this.ID = family.ID;
    this.congregation_ID = family.congregation_ID;
    this.address_ID = family.address_ID;
}

Family.create = (family, result) => {
    sql.query(`INSERT INTO church.family SET congregation_ID = "${family.congregation_ID}", address_ID = "${family.address_ID}"`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
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
  
      if (res.length) {
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

Family.findFamilyForPerson = (person_ID, result) => {
  sql.query(`SELECT * FROM family WHERE family.ID IN (SELECT family_ID FROM person WHERE person.ID = "${person_ID}")`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("persons: ", res);
    result(null, res);
})
}


Family.updateById = (id, family, result) => {
    sql.query(`UPDATE family SET congregation_ID = "${family.congregation_ID}", address_ID = "${family.address_ID}" WHERE family.ID = "${id}"`,(err, res) => {
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
        }
    );
}

Family.remove = (id, result) => {
    sql.query(`DELETE FROM family WHERE ID = "${id}"`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found family with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted family with id: ", id);
      result(null, res);
    });
  };

module.exports = Family;