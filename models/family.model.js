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
  let familyPromise = new Promise(function (familyResolve, familyReject) {
    sql.query(`INSERT INTO church.family SET congregation_ID = "${family.congregation_ID}", address_ID = "${family.address_ID}", 
    head_ID = "${family.head_ID}", image = "${family.image}"`, (err, res) => {
      if (err) {
        if (err.code == "ER_NO_REFERENCED_ROW_2" && err.sqlMessage.includes("REFERENCES `congregation`")) {
          //result({ kind: "not_found_congregation" }, null);
          //return
          familyReject({ kind: "not_found_congregation" });
        } else if (err.code == "ER_NO_REFERENCED_ROW_2" && err.sqlMessage.includes("REFERENCES `address`")) {
          // result({ kind: "not_found_address" }, null);
          // return;
          familyReject({ kind: "not_found_address" });
        }
        else if (err.code == "ER_NO_REFERENCED_ROW_2" && err.sqlMessage.includes("REFERENCES `person`")) {
          // result({ kind: "not_found_person" }, null);
          // return;
          familyReject({ kind: "not_found_person" });
        }
        else {
          console.log("error: ", err);
          // result(err, null);
          // return;
          familyReject(err);
        }
      } else {
        familyResolve(res.insertId);
      }
    })
  })
  familyPromise.then(
    function (response) {
      sql.query(`UPDATE person SET family_ID = ${response} WHERE person.ID = ${family.head_ID}`, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
        result(null, family);
      });
    },
    function (error) {
      result(error, null);
    }
  )

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
    } else if (res.length > 0) {
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

Family.findHeadOfHouseholdSpouse = (id, result) => {
  // getPersonPromise
  let getPersonPromise = new Promise(function (getPersonResolve, getPersonReject) {
    sql.query(`SELECT * FROM person WHERE person.ID IN (SELECT head_ID FROM family WHERE family.ID = "${id}")`, (err, res) => {
      if (err) {
        console.log("error: ", err)
        getPersonReject(err)
      } else if (res.length > 0) {
        getPersonResolve(res[0])
      } else {
        getPersonReject({ kind: "not_found_head" })
      }
    })
  })
  getPersonPromise.then(
    // getPersonPromise resolve
    function (response) {
      // getVVPromise
      let getVVPromise = new Promise(function (getVVResolve, getVVReject) {
        sql.query(`SELECT * FROM valid_value WHERE valid_value.value_group = "relationship" AND valid_value.value = "spouse"`, (err, res) => {
          if (err) {
            console.log("error: ", err);
            getVVReject(err)
          } else if (res.length > 0) {
            getVVResolve({ person_ID: response.ID, valid_value_ID: res[0].ID })
          } else {
            getVVReject({ kind: "not_found_valid_value" })
          }
        })
      })
      getVVPromise.then(
        // getVVPromise resolve
        function (response) {
          sql.query(`SELECT * FROM person WHERE person.ID IN (SELECT person2_ID FROM relationship 
            WHERE person1_ID = ${response.person_ID} AND type = ${response.valid_value_ID})`, (err, res) => {
            if (err) {
              console.log("error: ", err)
              result(err, null)
            } else if (res.length > 0) {
              result(null, res)
            } else {
              result({ kind: "not_found_spouse" }, null)
            }
            return
          })
        },
        // getVVPromise reject
        function (error) {
          result(error, null)
          return
        }
      )
    },
    // getPersonPromise reject
    function (error) {
      result(error, null)
      return
    }
  )
}

Family.getFamilyReport = result => {
  sql.query(`SELECT DISTINCT fam.image, head.l_name, address, number, head.email, valid_value.value FROM 
        (((((family fam LEFT JOIN address ON fam.address_ID = address.ID)
        LEFT JOIN person head ON fam.head_ID = head.ID)
        LEFT JOIN person_number ON head.ID = person_number.person_ID)
        LEFT JOIN phone_number ON phone_number.ID = person_number.number_ID AND phone_number.can_publish = 1)
        LEFT JOIN valid_value ON phone_number.type = valid_value.ID) GROUP BY fam.ID`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res)
    }
    return;
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
