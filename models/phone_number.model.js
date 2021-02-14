const sql = require("./db.js");
const Person_Number = require("../models/person_number.model.js");

// Constructor
const Phone_Number = function(phone_number) {
    this.ID = phone_number.ID;
    this.number = phone_number.number;
    this.can_publish = phone_number.can_publish;
    this.type = phone_number.type;
}

Phone_Number.create = (phone_number, result) => {
    sql.query(`INSERT INTO phone_number VALUES ("", "${phone_number.number}", ${phone_number.can_publish}, ${phone_number.type} )`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        } else {
          phone_number.ID = res.insertId;
            result(null, phone_number);
        }
    });

}

Phone_Number.findAll = result => {
    sql.query("SELECT * FROM phone_number", (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
        console.log("phone_numbers: ", res);
        result(null, res);
    })
}

Phone_Number.findById = (id, result) => {
    sql.query(`SELECT * FROM phone_number WHERE phone_number.ID = "${id}"`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found phone_numbers: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found phone_number with the id
      result({ kind: "not_found" }, null);
    })
}


Phone_Number.updateById = (id, phone_number, result) => {
    sql.query(`UPDATE phone_number SET number = "${phone_number.number}", can_publish = ${phone_number.can_publish}, type = ${phone_number.type}  WHERE ID = "${id}"`,(err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
  
        if (res.affectedRows == 0) {
            // not found phone_number with the id
            result({ kind: "not_found" }, null);
            return;
        }
        result(null, res);
        }
    );
}

Phone_Number.remove = (id, result) => {

  sql.query(`DELETE FROM phone_number WHERE ID = "${id}"`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found phone_number with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted phone_number with id: ", id);
    result(null, res);
  });
};

module.exports = Phone_Number;