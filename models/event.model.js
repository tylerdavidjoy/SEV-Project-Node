const sql = require("./db.js");

// Constructor
const Event = function (event) {
    this.ID = event.ID;
    this.date = event.date;
    this.leader = event.leader;
    this.location = event.location;
    this.description = event.description;
    this.recurring = event.recurring;
    this.name = event.name;
}

Event.create = (event, group_ID, result) => {
    console.log(event.date)
    var temp = new Date(event.date)
    temp = new Date(event.date).setTime(temp.getTime() + ((6*60*60*1000)))
    event.date = new Date(temp).toISOString()
    console.log(event.date)

    let eventPromise = new Promise(function (eventResolve, eventReject) {
        sql.query(`INSERT INTO church.event SET date = "${event.date}",` +
            (event.leader ? ` leader = "${event.leader}",` : ``) +
            (event.location ? ` location = "${event.location}", ` : ``) + 
            `description = "${event.description}", recurring = "${event.recurring}", name = "${event.name}"`, (err, res) => {
            if (err) {
                if (err.code == "ER_NO_REFERENCED_ROW_2" && err.sqlMessage.includes("REFERENCES `room`")) {
                    result({ kind: "not_found_room" }, null);
                }
                else if (err.code == "ER_NO_REFERENCED_ROW_2" && err.sqlMessage.includes("REFERENCES `person`")) {
                    result({ kind: "not_found_person" }, null);
                }
                else {
                    console.log("error: ", err);
                    eventReject(err);
                }
            } else {
                console.log("created event with id: ", res.insertId);
                eventResolve(res.insertId);
            }
        })
    })
    eventPromise.then(
        function (response) {
            if (event.leader != null && group_ID != null) {
                sql.query(`INSERT INTO church.event_group SET event_ID = "${response}", group_ID = "${group_ID}"`, (err, res) => {
                    if (err) {
                        if (err.code == "ER_NO_REFERENCED_ROW_2") {
                            result({ kind: "not_found_group" }, null);
                        } else {
                            console.log("error: ", err);
                            result(err, null);
                        }
                    } else {
                        console.log("created event_group with event_ID: ", response, " and group_ID: ", group_ID);
                        sql.query(`INSERT INTO church.attendee SET person_ID = ${event.leader}, event_ID = ${response}`, (err, res) => {
                            if (err) {
                                console.log("error: ", err);
                                result(err, null);
                            } else {
                                console.log("created attendee with event_ID: ", response, " and person_ID: ", event.leader);
                                result(null, event);
                            }
                        })
                    }
                })
            }
            else if (group_ID != null) {
                sql.query(`INSERT INTO church.event_group SET event_ID = "${response}", group_ID = "${group_ID}"`, (err, res) => {
                    if (err) {
                        if (err.code == "ER_NO_REFERENCED_ROW_2") {
                            result({ kind: "not_found_group" }, null);
                        } else {
                            console.log("error: ", err);
                            result(err, null);
                        }
                    } else {
                        console.log("created event_group with event_ID: ", response, " and group_ID: ", group_ID);
                        result(null, event);
                    }
                })
            } else if (event.leader != null) {
                sql.query(`INSERT INTO church.attendee SET person_ID = ${event.leader}, event_ID = ${response}`, (err, res) => {
                    if (err) {
                        console.log("error: ", err);
                        result(err, null);
                    } else {
                        console.log("created attendee with event_ID: ", response, " and person_ID: ", event.leader);
                        result(null, event);
                    }
                })
            }
            else {
                result(null, event);
            }
        },
        function (error) {
            result(error, null);
        }
    )
}

Event.findAll = result => {
    sql.query("SELECT * FROM event", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("events: ", res);
        result(null, res);
    })
}

Event.findById = (id, result) => {
    sql.query(`SELECT * FROM event WHERE event.ID = "${id}"`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found event: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found event with the id
        result({ kind: "not_found" }, null);
    })
}

Event.findByGroupId = (group_ID, result) => {
    sql.query(`SELECT * FROM event WHERE event.ID IN (SELECT event_ID FROM event_group WHERE group_ID = "${group_ID}")`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("found events: ", res);
        result(null, res);
        return;
    })
}

Event.getEventReport = result => {
    sql.query(`SELECT DISTINCT name, description, date, leader.f_name, leader.l_name, phone_number.number, leader.email, location.room_number  FROM 
          ((((event LEFT JOIN room location ON event.location = location.ID)
          LEFT JOIN person leader ON event.leader = leader.ID)
          LEFT JOIN person_number ON leader.ID = person_number.person_ID)
          LEFT JOIN phone_number ON phone_number.ID = person_number.number_ID AND phone_number.can_publish = 1) GROUP BY event.ID`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res)
      }
      return;
    })
  }

Event.findByPersonId = (person_ID, result) => {
    sql.query(`SELECT * FROM event WHERE event.ID IN (SELECT event_ID FROM attendee WHERE person_ID = "${person_ID}")`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("found events: ", res);
        result(null, res);
        return;
    })
}

Event.updateById = (id, event, result) => {
    console.log(event.date)
    var temp = new Date(event.date)
    temp = new Date(event.date).setTime(temp.getTime() + ((6*60*60*1000)))
    event.date = new Date(temp).toISOString()
    console.log(event.date)
    
    sql.query(`UPDATE event SET date = "${event.date}", leader = "${event.leader}", location = "${event.location}", 
                description = "${event.description}", recurring = "${event.recurring}", name = "${event.name}" WHERE ID = "${id}"`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.affectedRows == 0) {
            // not found event with the id
            result({ kind: "not_found" }, null);
            return;
        }
        result(null, res);
    }
    );
}

Event.remove = (id, result) => {
    sql.query(`DELETE FROM event WHERE ID = "${id}"`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found event with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted event with id: ", id);
        result(null, res);
    });
};

module.exports = Event;