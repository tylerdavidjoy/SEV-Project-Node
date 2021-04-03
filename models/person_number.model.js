const sql = require("./db.js");

// Constructor
const Person_Number = function(person_number) {
    this.person_ID = person_number.person_ID;
    this.number_ID = person_number.number_ID;
}

Person_Number.create = (person_number, result) => {
    sql.query(`INSERT INTO person_number VALUES (${person_number.person_ID}, ${person_number.number_ID} )`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        if (!res)
          result({ kind: "invalid_ids" }, null);

        else
          result(err, null);

          sql.query(`DELETE FROM phone_number WHERE ID = "${person_number.number_ID}"`, (err, res));

        return;
        } else {
            result(null, person_number);
        }
    })
}

Person_Number.findAll = result => {
    sql.query("SELECT * FROM person_number", (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
        console.log("person_number: ", res);
        result(null, res);
    })
}

//Find by Person_ID
Person_Number.findById = (id, result) => {
    sql.query(`SELECT * FROM person_number WHERE person_number.person_ID = "${id}"`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found person_numbers: ", res);
        result(null, res);
        return;
      }
  
      // not found person_number with the id
      result({ kind: "not_found" }, null);
    })
}

Person_Number.remove = (id, result) => {
    sql.query(`DELETE FROM person_number WHERE number_ID = "${id}"`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found person_number with the id
        result({ kind: "not_found" }, null);
        return;
      }

      else {
        console.log("deleted person_number(s) with number_ID: ", id);
        result(null, res);
      }

    });
  };

module.exports = Person_Number;