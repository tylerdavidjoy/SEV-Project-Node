const sql = require("./db.js");

// Constructor
const Congregation = function(congregation) {
    this.ID = congregation.ID;
    this.name = congregation.name;
}

Congregation.create = (congregation, result) => {
    sql.query(`INSERT INTO congregation VALUES ("","${congregation.name}")`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        } else {
            result(null, congregation);
        }
    })
}

Congregation.findAll = result => {
    sql.query("SELECT * FROM congregation", (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
          console.log("congregations: ", res);
          result(null, res);
    })
}

Congregation.findById = (id, result) => {
    sql.query(`SELECT * FROM congregation WHERE congregation.ID = "${id}"`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found congregations: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found congregation with the id
      result({ kind: "not_found" }, null);
    })
}


Congregation.updateById = (id, name, result) => {
  console.log(name);
    sql.query(`UPDATE congregation SET name = "${name.name}" WHERE ID = "${id}"`,(err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
  
        if (res.affectedRows == 0) {
            // not found congregation with the id
            result({ kind: "not_found" }, null);
            return;
        }
        result(null, res);
        }
    );
}

Congregation.remove = (id, result) => {
    sql.query(`DELETE FROM congregation WHERE ID = "${id}"`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found congregation with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted congregation with id: ", id);
      result(null, res);
    });
  };

module.exports = Congregation;