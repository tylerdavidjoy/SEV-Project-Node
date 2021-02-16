const sql = require("./db.js");

// Constructor
const Person_Address = function(person_address) {
    this.person_ID = person_address.person_ID;
    this.address_ID = person_address.address_ID;
}

Person_Address.create = (person_address, result) => {
    sql.query(`INSERT INTO person_address VALUES (${person_address.person_ID}, ${person_address.address_ID} )`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        } else {
            result(null, person_address);
        }
    })
}

Person_Address.findAll = result => {
    sql.query("SELECT * FROM person_address", (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
        console.log("person_address: ", res);
        result(null, res);
    })
}

Person_Address.remove = (id, result) => {
    sql.query(`DELETE FROM person_address WHERE address_ID = "${id}"`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found person_address with the id
        result({ kind: "not_found" }, null);
        return;
      }

      else {
        console.log("deleted person_address(s) with address_ID: ", id);
        result(null, res);
      }

    });
  };

module.exports = Person_Address;