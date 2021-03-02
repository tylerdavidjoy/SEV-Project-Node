const sql = require("./db.js");

// Constructor
const Group = function(group) {
    this.ID = group.ID;
    this.type = group.type;
    this.leader = group.leader;
    this.congregation_ID = group.congregation_ID;
}

Group.create = (group, result) => {
  sql.query(`INSERT INTO church.group VALUES ("",${group.type}, ${group.leader}, ${group.congregation_ID})`, (err, res) => {
      if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
      } else {
          result(null, group);
      }
  })
}

Group.findAll = result => {
    sql.query("SELECT * FROM church.group", (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
        console.log("groups: ", res);
        result(null, res);
    })
}

Group.findById = (id, result) => {
    sql.query(`SELECT * FROM church.group WHERE church.group.ID = "${id}"`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found groups: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found congregation with the id
      result({ kind: "not_found" }, null);
    })
}

Group.findByPerson = (person_ID, result) => {
  sql.query(`SELECT * FROM church.group WHERE church.group.ID IN (SELECT group_ID FROM group_person WHERE person_ID = ${person_ID})`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found groups: ", res);
      result(null, res);
      return;
    }

    // not found groups with the person_id
    result({ kind: "not_found" }, null);
  })
}

Group.findMembers = (id, result) => {
  sql.query(`SELECT * FROM church.person WHERE person.ID IN (SELECT person_ID FROM group_person WHERE group_ID = ${id})`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found groups: ", res);
      result(null, res);
      return;
    }

    // not found group with the id
    result({ kind: "not_found" }, null);
  })
}


Group.updateById = (id, new_group, result) => {
  sql.query(`UPDATE church.group SET type = "${new_group.type}", leader = ${new_group.leader}, congregation_ID = ${new_group.congregation_ID} WHERE ID = "${id}"`,(err, res) => {
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

Group.remove = (id, result) => {
    sql.query(`DELETE FROM church.group WHERE ID = "${id}"`, (err, res) => {
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
  
      console.log("deleted group with id: ", id);
      result(null, res);
    });
  };

module.exports = Group;