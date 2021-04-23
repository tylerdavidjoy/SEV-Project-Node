const sql = require("./db.js");

// Constructor
const Attendee = function (attendee) {
  this.person_ID = attendee.person_ID;
  this.event_ID = attendee.event_ID;
}

Attendee.create = (attendee, result) => {
  sql.query(`INSERT INTO attendee SET person_ID = "${attendee.person_ID}", event_ID = "${attendee.event_ID}"`, (err, res) => {
    if (err) {
      if (err.code == "ER_NO_REFERENCED_ROW_2" && err.sqlMessage.includes("REFERENCES `person`")) {
        result({ kind: "not_found_person" }, null);
        return;
      } else if (err.code == "ER_NO_REFERENCED_ROW_2" && err.sqlMessage.includes("REFERENCES `event`")) {
        result({ kind: "not_found_event" }, null);
        return;
      }
      else {
        console.log("error: ", err);
        result(err, null);
        return;
      }

    } else {
      result(null, attendee);
    }
  })
}

Attendee.createForFamily = (family_ID, event_ID, result) => {
  let verifyEventPromise = new Promise(function (verifyEventResolve, verifyEventReject) {
    sql.query(`SELECT * FROM event WHERE event.ID = ${event_ID}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        verifyEventReject(err, null);
      } else if (res.length == 0) {
        verifyEventReject({ kind: "not_found_event" }, null);
      } else {
        verifyEventResolve(res);
      }
    })
  })
  verifyEventPromise.then(
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
            new Promise(function (addAttendeeResolve, addAttendeeReject) {
              sql.query(`INSERT INTO attendee SET person_ID = ${response[i].ID}, event_ID = ${event_ID}`, (err, res) => {
                if (err) {
                  if (err.code == "ER_NO_REFERENCED_ROW_2" && err.sqlMessage.includes("REFERENCES `person`")) {
                    addAttendeeReject({ kind: "not_found_person" }, null);
                  } else if (err.code == "ER_NO_REFERENCED_ROW_2" && err.sqlMessage.includes("REFERENCES `event`")) {
                    addAttendeeReject({ kind: "not_found_event" }, null);
                  } else if (err.code == "ER_DUP_ENTRY") {
                    addAttendeeResolve(null);
                  } else {
                    console.log("error: ", err);
                    addAttendeeReject(err, null);
                  }
                } else {
                  addAttendeeResolve(res);
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

Attendee.findAll = result => {
  sql.query("SELECT * FROM attendee", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, res);
  })
}

Attendee.findForEvent = (event_ID, result) => {
  sql.query(`SELECT * FROM attendee WHERE attendee.event_ID = ${event_ID}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, res);
  })
}

Attendee.findPeopleForEvent = (event_ID, result) => {
  sql.query(`SELECT * FROM person WHERE person.ID IN (SELECT person_ID 
    FROM attendee WHERE attendee.event_ID = ${event_ID})`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, res);
  })
}

Attendee.findForPerson = (person_ID, result) => {
  sql.query(`SELECT * FROM attendee WHERE attendee.person_ID = ${person_ID}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, res);
  })
}

Attendee.remove = (person_ID, event_ID, result) => {
  sql.query(`DELETE FROM attendee WHERE person_ID = "${person_ID}" AND event_ID = "${event_ID}"`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found attendee with the id
      result({ kind: "not_found" }, null);
      return;
    }

    else {
      console.log("deleted attendee(s) with person_ID: ", person_ID, " and event_ID", event_ID);
      result(null, res);
    }

  });
};

module.exports = Attendee;