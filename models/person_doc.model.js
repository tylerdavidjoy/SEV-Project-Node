const sql = require("./db.js");

// Constructor
const Person_Doc = function (person_doc) {
    this.display_name = person_doc.display_name;
}

Person_Doc.findAll = result => {
    sql.query("SELECT * FROM person_doc", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("person_docs: ", res);
        result(null, res);
    })
}

Person_Doc.findById = (id, result) => {
    sql.query(`SELECT * FROM person_doc WHERE person_doc.ID = "${id}"`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res[0]);
        return;
    })
}

Person_Doc.findByPersonId = (person_ID, result) => {
    sql.query(`SELECT * FROM person_doc WHERE person_doc.person_ID = "${person_ID}"`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res[0]);
        return;
    })
}

Person_Doc.updateById = (id, person_doc, result) => {
    sql.query(`UPDATE person_doc SET display_name = "${person_doc.display_name}" WHERE ID = "${id}"`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.affectedRows == 0) {
            // not found person_doc with the id
            result({ kind: "not_found" }, null);
            return;
        }
        result(null, res);
    }
    );
}

module.exports = Person_Doc;