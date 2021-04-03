const sql = require("./db.js");

// Constructor
const Valid_Value = function (valid_value) {
  this.ID = valid_value.ID;
  this.value_group = valid_value.value_group;
  this.value = valid_value.value;
}

Valid_Value.create = (valid_value, result) => {
  sql.query(`INSERT INTO church.valid_value SET value_group = "${valid_value.value_group}", value = "${valid_value.value}"`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    } else {
      result(null, valid_value);
    }
  })
}

Valid_Value.findAll = result => {
  sql.query("SELECT * FROM valid_value", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("valid_values: ", res);
    result(null, res);
  })
}

Valid_Value.findById = (id, result) => {
  sql.query(`SELECT * FROM valid_value WHERE valid_value.ID = "${id}"`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found valid_value: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found valid_value with the id
    result({ kind: "not_found" }, null);
  })
}

Valid_Value.findByValueGroup = (value_group, result) => {
  sql.query(`SELECT * FROM valid_value WHERE valid_value.value_group = "${value_group}"`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("found valid_values for group " + value_group + ": ", res);
    result(null, res);
    return;

  })
}

Valid_Value.updateById = (id, valid_value, result) => {
  sql.query(`UPDATE valid_value SET value_group = "${valid_value.value_group}", value = "${valid_value.value}" WHERE ID = "${id}"`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.affectedRows == 0) {
      // not found valid_value with the id
      result({ kind: "not_found" }, null);
      return;
    }
    result(null, res);
  });
}

Valid_Value.remove = (id, result) => {
  sql.query(`DELETE FROM valid_value WHERE ID = "${id}"`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err,null);
      return;
    }

    if (res.affectedRows == 0) {
      // not found valid_value with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted valid_value with id: ", id);
    result(null, res);
  });
};

module.exports = Valid_Value;