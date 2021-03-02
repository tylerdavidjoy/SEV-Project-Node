const sql = require("./db.js");

// Constructor
const Relationship = function(relationship) {
    this.person1_ID = relationship.person1_ID;
    this.person2_ID = relationship.person2_ID;
    this.type = relationship.type;
}

Relationship.create = (relationship, result) => {
    sql.query(`INSERT INTO relationship VALUES (${relationship.person1_ID}, ${relationship.person2_ID}, ${relationship.type})`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
    })

    sql.query(`INSERT INTO relationship VALUES (${relationship.person2_ID}, ${relationship.person1_ID}, ${relationship.type})`, (err, res) => {
      if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
      } else {
          result(null, relationship);
      }
  })
}

Relationship.findAll = result => {
    sql.query("SELECT * FROM relationship", (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
        console.log("relationship: ", res);
        result(null, res);
    })
}

Relationship.findByPerson = (id, result) => {
    sql.query(`SELECT * FROM relationship WHERE relationship.person1_ID = "${id}"`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found relationships: ", res);
        result(null, res);
        return;
      }
  
      // not found congregation with the id
      result({ kind: "not_found" }, null);
    })
}


Relationship.updateById = (person1_ID,person2_ID, type, result) => {
    sql.query(`UPDATE relationship SET person1_ID = ${person1_ID}, person2_ID = ${person2_ID}, type = ${type} WHERE (person1_ID = ${person1_ID} AND person2_ID = ${person2_ID}) OR (person2_ID = ${person2_ID} AND person1_ID = ${person1_ID})`,(err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
  
        if (res.affectedRows == 0) {
            // not found relationship with the id
            result({ kind: "not_found" }, null);
            return;
        }
        result(null, res);
        }
    );
}

Relationship.remove = (person1_ID, person2_ID, result) => {
    sql.query(`DELETE FROM church.relationship WHERE (person1_ID = ${person1_ID} AND person2_ID = ${person2_ID}) OR (person2_ID = ${person1_ID} AND person1_ID = ${person2_ID})`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found relationship with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted relationship with person1_id: " + person1_ID + " and person2_ID " + person2_ID, );
      result(null, res);
    });
  };

module.exports = Relationship;