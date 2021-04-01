const sql = require("./db.js");

// Constructor
const Family_Doc = function (family_doc) {
    this.display_name = family_doc.display_name;
}

Family_Doc.findAll = result => {
    sql.query("SELECT * FROM family_doc", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("family_docs: ", res);
        result(null, res);
    })
}

Family_Doc.findById = (id, result) => {
    sql.query(`SELECT * FROM family_doc WHERE family_doc.ID = "${id}"`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res[0]);
        return;
    })
}

Family_Doc.findByFamilyId = (family_ID, result) => {
    sql.query(`SELECT * FROM family_doc WHERE family_doc.family_ID = "${family_ID}"`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res);
        return;
    })
}

Family_Doc.updateById = (id, family_doc, result) => {
    sql.query(`UPDATE family_doc SET display_name = "${family_doc.display_name}" WHERE ID = "${id}"`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.affectedRows == 0) {
            // not found family_doc with the id
            result({ kind: "not_found" }, null);
            return;
        }
        result(null, res);
    }
    );
}

module.exports = Family_Doc;