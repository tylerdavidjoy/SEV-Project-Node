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

Group_Person.createForFamily = (family_ID, group_ID, result) => {
  let verifyGroupPromise = new Promise(function (verifyGroupResolve, verifyGroupReject) {
    sql.query(`SELECT * FROM church.group WHERE church.group.ID = ${group_ID}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        verifyGroupReject(err, null);
      } else if (res.length == 0) {
        verifyGroupReject({ kind: "not_found_group" }, null);
      } else {
        verifyGroupResolve(res);
      }
    })
  })
  verifyGroupPromise.then(
    function (response) {
      let getFamilyPromise = new Promise(function (getFamilyResolve, getFamilyReject) {
        sql.query(`SELECT * FROM person WHERE person.family_ID = ${family_ID}`, (err, res) => {
          if (err) {
            console.log("error: ", err);
            getFamilyReject(err, null);
          } else {
            getFamilyResolve(res);
          }
        })
      })
      getFamilyPromise.then(
        function (response) {
          let errorHolder;
          for (let i = 0; i < response.length && !errorHolder; i++) {
            new Promise(function (addGroupPersonResolve, addGroupPersonReject) {
              sql.query(`INSERT INTO group_person SET person_ID = ${response[i].ID}, group_ID = ${group_ID}`, (err, res) => {
                if (err) {
                  if (err.code == "ER_NO_REFERENCED_ROW_2" && err.sqlMessage.includes("REFERENCES `person`")) {
                    addGroupPersonReject({ kind: "not_found_person" }, null);
                  } else if (err.code == "ER_NO_REFERENCED_ROW_2" && err.sqlMessage.includes("REFERENCES `group`")) {
                    addGroupPersonReject({ kind: "not_found_group" }, null);
                  } else if (err.code == "ER_DUP_ENTRY") {
                    addGroupPersonResolve(null);
                  } else {
                    console.log("error: ", err);
                    addGroupPersonReject(err, null);
                  }
                } else {
                  addGroupPersonResolve(res);
                }
              })
            }).then(
              function (response) { },
              function (error) {
                errorHolder = error;
              }
            )
          }
          if (!errorHolder) {
            result(null, response)
          } else {
            result(errorHolder, null);
          }
        },
        function (error) {
          result(error, null);
          return;
        })
    },
    function (error) {
      result(error, null);
      return;
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