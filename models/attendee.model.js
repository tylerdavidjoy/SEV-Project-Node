const sql = require("./db.js");

// Constructor
const Attendee = function(attendee) {
    this.person_ID = attendee.person_ID;
    this.event_ID = attendee.event_ID;
}

Attendee.create = (attendee, result) => {
    sql.query(`INSERT INTO attendee SET person_ID = "${attendee.person_ID}", event_ID = "${attendee.event_ID}"`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        } else {
            result(null, attendee);
        }
    })
}

Attendee.findAll = result => {
    sql.query("SELECT * FROM attendee", (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
        console.log("attendee: ", res);
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