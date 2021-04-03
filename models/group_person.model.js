const sql = require("./db.js");

// Constructor
const Group_Person = function(group_person) {
    this.group_ID = group_person.group_ID;
    this.person_ID = group_person.person_ID;
}

Group_Person.create = (group_person, result) => {
    sql.query(`INSERT INTO group_person VALUES (${group_person.group_ID}, ${group_person.person_ID})`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            if (!res)
              result({ kind: "invalid_ids" }, null);

            else
              result(err, null);

            return;
        } else {
            result(null, group_person);
        }
    })
}

Group_Person.findAll = result => {
    sql.query("SELECT * FROM group_person", (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
        console.log("group_persons: ", res);
        result(null, res);
    })
}

//All members of a group
Group_Person.findById = (id, result) => {
    sql.query(`SELECT * FROM group_person WHERE group_person.group_ID = "${id}"`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
        console.log("found group_persons: ", res);
        result(null, res);
        return;
    })
}

//All groups for a person
Group_Person.findByPerson = (person_ID, result) => {
  sql.query(`SELECT * FROM group_person WHERE group_person.person_ID = ${person_ID}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
      console.log("found group_persons: ", res);
      result(null, res);
      return;
  })
}

Group_Person.remove = (group_ID, person_ID, result) => {
    sql.query(`DELETE FROM group_person WHERE group_ID = ${group_ID} AND person_ID = ${person_ID} `, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found group with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted group with id: ", group_ID);
      result(null, res);
    });
  };

module.exports = Group_Person;