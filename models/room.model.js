const sql = require("./db.js");

// Constructor
const Room = function(room) {
    this.ID = room.ID;
    this.room_number = room.room_number;
}

Room.create = (room, result) => {
    sql.query(`INSERT INTO room VALUES ("","${room.room_number}")`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        } else {
            result(null, room);
        }
    })
}

Room.findAll = result => {
    sql.query("SELECT * FROM room", (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
        console.log("rooms: ", res);
        result(null, res);
    })
}

Room.findById = (id, result) => {
    sql.query(`SELECT * FROM room WHERE room.ID = "${id}"`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found rooms: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found room with the id
      result({ kind: "not_found" }, null);
    })
}


Room.updateById = (id, room_number, result) => {
  console.log(room_number);
    sql.query(`UPDATE room SET room_number = "${room_number.room_number}" WHERE ID = "${id}"`,(err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
  
        if (res.affectedRows == 0) {
            // not found room with the id
            result({ kind: "not_found" }, null);
            return;
        }
        result(null, res);
        }
    );
}

Room.remove = (id, result) => {
    sql.query(`DELETE FROM room WHERE ID = "${id}"`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found room with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted room with id: ", id);
      result(null, res);
    });
  };

module.exports = Room;