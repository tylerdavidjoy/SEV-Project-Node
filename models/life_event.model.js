const sql = require("./db.js");

// Constructor
const Life_Event = function(life_event) {
    this.person_ID = life_event.person_ID,
    this.description = life_event.description,
    this.date = life_event.date,
    this.type = life_event.type,
    this.visible = life_event.visible
}

Life_Event.create = (life_event, result) => {
    sql.query(`INSERT INTO life_event VALUES ("",${life_event.person_ID}, "${life_event.description}", "${life_event.date}", ${life_event.type}, ${life_event.visible})`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            if (!res)
              result({ kind: "invalid_ids" }, null);

            else
              result(err, null);

            return;
        } else {
            result(null, life_event);
        }
    })
}

Life_Event.findAll = result => {
    sql.query("SELECT * FROM life_event", (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
        console.log("life_events: ", res);
        result(null, res);
    })
}

Life_Event.findById = (id, result) => {
    sql.query(`SELECT * FROM life_event WHERE life_event.ID = "${id}"`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found life_event: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found life_event with the id
      result({ kind: "not_found" }, null);
    })
}

Life_Event.findByPerson = (id, result) => {
  sql.query(`SELECT * FROM life_event WHERE life_event.person_ID = "${id}"`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
      console.log("found life_event: ", res);
      result(null, res);
      return;
  })
}

Life_Event.findByType = (type, result) => {
  sql.query(`SELECT * FROM life_event WHERE life_event.type = "${type}"`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
      console.log("found life_event(s): ", res);
      result(null, res);
  })
}

Life_Event.findbydateType = (type,start,end, result) => {
  sql.query(`SELECT * FROM life_event WHERE life_event.type = "${type}" AND DAYOFYEAR(life_event.date) BETWEEN DAYOFYEAR("${start}") AND DAYOFYEAR("${end}")`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
      console.log("found life_event(s): ", res);
      result(null, res);
      return;
  })
}

Life_Event.generateReport = (type,start,end, result) => {
  sql.query(`SELECT person.f_name, person.l_name, life_event.description, life_event.date FROM (person JOIN life_event ON life_event.person_ID = person.id) WHERE life_event.type = "${type}" AND DAYOFYEAR(life_event.date) BETWEEN DAYOFYEAR("${start}") AND DAYOFYEAR("${end}")`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
      console.log("found life_event(s): ", res);
      result(null, res);
  })
}

Life_Event.findbydate = (start,end, result) => {
  start = String(start);
  end = String(end);
  sql.query(`SELECT * FROM life_event WHERE DAYOFYEAR(life_event.date) BETWEEN DAYOFYEAR("${start}") AND DAYOFYEAR("${end}")`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
      console.log("found life_event(s): ", res);
      result(null, res);
      return;
  })
}


Life_Event.updateById = (id, life_e, result) => {
    sql.query(`UPDATE life_event SET person_ID = "${life_e.person_ID}", description = "${life_e.description}", date = "${life_e.date}", type = ${life_e.type}, visible = ${life_e.visible} WHERE ID = "${id}"`,(err, res) => {
        if (err) {
            console.log("error: ", err);
            if (!res)
              result({ kind: "invalid_ids" }, null);

            else
              result(err, null);

            return;
        }

        
  
        if (res.affectedRows == 0) {
            // not found life_event with the id
            result({ kind: "not_found" }, null);
            return;
        }
        result(null, res);
        }
    );
}

Life_Event.remove = (id, result) => {
    sql.query(`DELETE FROM life_event WHERE ID = "${id}"`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found life_event with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted life_event with id: ", id);
      result(null, res);
    });
  };

module.exports = Life_Event;