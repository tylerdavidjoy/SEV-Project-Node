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
  this.role = person.role;
}

Person.create = (person, result) => {
  if(person.gender != 'male' && person.gender != 'female' && person.gender != 'other' ){
    console.log(person.gender);
    result("INCORRECT GENDER",null);
    return;
  }

  sql.query(`INSERT INTO person VALUES ("", ${person.congregation_ID}, "${person.f_name}", "${person.l_name}", "${person.occupation}", 
  "${person.employer}", ${person.family_ID}, "${person.email}", "${person.gender}", "${person.preferred_name}", ${person.role})`, (err, res) => {
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

Person.findByGetInfo = result => {
  sql.query("SELECT DISTINCT person.ID, congregation_ID, f_name, l_name, occupation, employer, family_ID, email, preferred_name, vrole.value, number, vnum.value, can_publish, address, vadd.value FROM ((((((person JOIN person_number JOIN phone_number) JOIN person_address ON person_address.person_ID) JOIN address ON person_address.address_ID) JOIN valid_value AS vadd ON address.type = vadd.id) JOIN valid_value AS vnum ON phone_number.type = vnum.id) JOIN valid_value AS vrole ON person.role = vrole.id) GROUP BY person.id;", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("People: ", res);
    result(null, res);
  })
}


Person.updateById = (id, person, result) => {
  sql.query(`UPDATE person SET congregation_ID = ${person.congregation_ID}, f_name = "${person.f_name}", l_name = "${person.l_name}", 
  occupation = "${person.occupation}", employer = "${person.employer}", family_ID = ${person.family_ID}, email = "${person.email}", gender = "${person.gender}", preferred_name = "${person.preferred_name}", role = ${person.role} 
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