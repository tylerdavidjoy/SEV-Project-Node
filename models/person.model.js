const sql = require("./db.js");

// Constructor
const Person = function (person) {
  this.congregation_ID = person.congregation_ID;
  this.f_name = person.f_name;
  this.l_name = person.l_name;
  this.occupation = person.occupation;
  this.employer = person.employer;
  this.family_ID = person.family_ID;
  this.email = person.email;
  this.gender = person.gender;
  this.preferred_name = person.preferred_name;
}

Person.create = (person, result) => {
  if(person.gender != 'male' || person.gender != 'female' || person.gender != 'other' ){
    result("INCORRECT GENDER",null);
    return;
  }

  sql.query(`INSERT INTO person VALUES ("", ${person.congregation_ID}, "${person.f_name}", "${person.l_name}", "${person.occupation}", 
  "${person.employer}", ${person.family_ID}, "${person.email}", "${person.gender}", "${person.preferred_name}")`, (err, res) => {
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

Person.findByEmail = (email, result) => {
  sql.query(`SELECT * FROM person WHERE person.email = "${email}"`, (err, res) => {
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
  sql.query(`UPDATE person SET congregation_ID = ${person.congregation_ID}, f_name = "${person.f_name}", l_name = "${person.l_name}", 
  occupation = "${person.occupation}", employer = "${person.employer}", family_ID = ${person.family_ID}, email = "${person.email}", gender = "${person.gender}", preferred_name = "${person.preferred_name}" 
  WHERE ID = "${id}"`, (err, res) => {
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
  let personPromise = new Promise(function (personResolve, personReject) {
    sql.query(`DELETE FROM person WHERE ID = "${id}"`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        personReject(err);
      }

      if (res.affectedRows == 0) {
        // not found person with the id
        result({ kind: "not_found" }, null);
        personReject({ kind: "not_found" }, null);
      }

      else {
        console.log("deleted person(s) with number_ID: ", id);
        result(null, res);
        personResolve();
      }

    })
  })
  personPromise.then(
    function () {
      garbageCollection();
    },
    function (error) {
      console.log("error: ", error);
    }
  )
}

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
  sql.query(`DELETE FROM phone_number WHERE NOT EXISTS (SELECT * from person_number WHERE person_number.number_ID = phone_number.ID)`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      return;
    }

    if (res.affectedRows == 0) {
      console.log("No deleted phone_number rows");
      return;
    }
  })
}

module.exports = Person;