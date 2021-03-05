const sql = require("./db.js");

// Constructor
const Event_Group = function(event_group) {
    this.group_ID = event_group.group_ID;
    this.event_ID = event_group.event_ID;
}

Event_Group.create = (event_group, result) => {
    sql.query(`INSERT INTO event_group SET group_ID = "${event_group.group_ID}", event_ID = "${event_group.event_ID}"`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        } else {
            result(null, event_group);
        }
    })
}

Event_Group.findAll = result => {
    sql.query("SELECT * FROM event_group", (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
        console.log("event_group: ", res);
        result(null, res);
    })
}

Event_Group.remove = (group_ID, event_ID, result) => {
    sql.query(`DELETE FROM event_group WHERE group_ID = "${group_ID}" AND event_ID = "${event_ID}"`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found event_group with the id
        result({ kind: "not_found" }, null);
        return;
      }

      else {
        console.log("deleted event_group(s) with group_ID: ", group_ID, " and event_ID", event_ID);
        result(null, res);
      }

    });
  };

module.exports = Event_Group;