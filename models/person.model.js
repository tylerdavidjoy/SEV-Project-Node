const sql = require("./db.js");

// Constructor
const Person = function(person) {
    this.congregation_ID = person.congregation_ID;
    this.f_name = person.f_name;
    this.l_name = person.l_name;
    this.occupation = person.occupation;
    this.employer = person.employer;
    this.family_ID = person.family_ID;
    this.email = person.email;
}

Person.create = (person, result) => {
    sql.query(`INSERT INTO person VALUES ("", ${person.congregation_ID}, "${person.f_name}", "${person.l_name}", "${person.occupation}", "${person.employer}", ${person.family_ID}, "${person.email}")`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        } else {
            result(null, person);
        }
    })
}

Person.findAll = result => {
    sql.query("SELECT * FROM person", (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
        console.log("People: ", res);
        result(null, res);
    })
}

//Find by ID
Person.findById = (id, result) => {
    sql.query(`SELECT * FROM person WHERE person.ID = "${id}"`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found person: ", res);
        result(null, res);
        return;
      }
  
      // not found person with the id
      result({ kind: "not_found" }, null);
    })
}

Person.updateById = (id, person, result) => {
  sql.query(`UPDATE person SET congregation_ID = ${person.congregation_ID}, f_name = "${person.f_name}", l_name = "${person.l_name}", occupation = "${person.occupation}", employer = "${person.employer}", family_ID = ${person.family_ID}, email = "${person.email}" WHERE ID = "${id}"`,(err, res) => {
      if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
      }

      if (res.affectedRows == 0) {
          // not found person with the id
          result({ kind: "not_found" }, null);
          return;
      }
      result(null, res);
      }
  );
}

Person.remove = (id, result) => {
    sql.query(`DELETE FROM person WHERE ID = "${id}"`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found person with the id
        result({ kind: "not_found" }, null);
        return;
      }

      else {
        console.log("deleted person(s) with number_ID: ", id);
        result(null, res);
      }

    });
  };

module.exports = Person;