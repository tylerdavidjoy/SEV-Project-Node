const sql = require("./db.js");

// Constructor
const Person_Involvement = function (person_involvement) {
    this.person_ID = person_involvement.person_ID;
    this.involvement_ID = person_involvement.involvement_ID;
}

Person_Involvement.create = (person_involvement, result) => {
    sql.query(`INSERT INTO person_involvement VALUES (${person_involvement.person_ID}, ${person_involvement.involvement_ID} )`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        } else {
            result(null, person_involvement);
        }
    })
}

Person_Involvement.findAll = result => {
    sql.query("SELECT * FROM person_involvement", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("person_involvement: ", res);
        result(null, res);
    })
}

//Find by Person_ID
Person_Involvement.findByPersonId = (person_id, result) => {
    sql.query(`SELECT * FROM person_involvement WHERE person_involvement.person_ID = "${person_id}"`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("found person_involvements: ", res);
        result(null, res);

    })
}

//Find by Involvement_ID
Person_Involvement.findByInvolvementId = (involvement_id, result) => {
    sql.query(`SELECT * FROM person_involvement WHERE person_involvement.involvement_ID = "${involvement_id}"`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("found person_involvements: ", res);
        result(null, res);
    })
}

//Find by Person_ID
Person_Involvement.findByPersonIdAndInvolvementId = (person_id, involvement_id, result) => {
    sql.query(`SELECT * FROM person_involvement WHERE person_involvement.person_ID = "${person_id}" AND 
                person_involvement.involvement_ID = "${involvement_id}"`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found person_involvement: ", res);
            result(null, res);
            return;
        }

        // not found person_involvement with the person_id and involvement_id
        result({ kind: "not_found" }, null);
    })
}

Person_Involvement.remove = (person_id, involvement_id, result) => {
    sql.query(`DELETE FROM person_involvement WHERE person_involvement.person_ID = "${person_id}" AND 
                person_involvement.involvement_ID = "${involvement_id}"`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found person_involvement with the person_id and involvement_id
            result({ kind: "not_found" }, null);
            return;
        }

        else {
            console.log("deleted person_involvement(s) with person_ID " + person_id + " involvement_ID " + involvement_id);
            result(null, res);
        }

    });
};

module.exports = Person_Involvement;