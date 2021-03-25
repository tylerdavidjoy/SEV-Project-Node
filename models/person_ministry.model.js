const sql = require("./db.js");

// Constructor
const Person_Ministry = function (person_ministry) {
    this.person_ID = person_ministry.person_ID;
    this.ministry_ID = person_ministry.ministry_ID;
}

Person_Ministry.create = (person_ministry, result) => {
    sql.query(`INSERT INTO person_ministry VALUES (${person_ministry.person_ID}, ${person_ministry.ministry_ID} )`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        } else {
            result(null, person_ministry);
        }
    })
}

Person_Ministry.findAll = result => {
    sql.query("SELECT * FROM person_ministry", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("person_ministry: ", res);
        result(null, res);
    })
}

//Find by Person_ID
Person_Ministry.findByPersonId = (person_id, result) => {
    sql.query(`SELECT * FROM person_ministry WHERE person_ministry.person_ID = "${person_id}"`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("found person_ministries: ", res);
        result(null, res);
    })
}

//Find by Ministry_ID
Person_Ministry.findByMinistryId = (ministry_id, result) => {
    sql.query(`SELECT * FROM person_ministry WHERE person_ministry.ministry_ID = "${ministry_id}"`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("found person_ministries: ", res);
        result(null, res);
    })
}

//Find by Person_ID
Person_Ministry.findByPersonIdAndMinistryId = (person_id, ministry_id, result) => {
    sql.query(`SELECT * FROM person_ministry WHERE person_ministry.person_ID = "${person_id}" AND 
                person_ministry.ministry_ID = "${ministry_id}"`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found person_ministry: ", res);
            result(null, res);
            return;
        }

        // not found person_ministry with the person_id and ministry_id
        result({ kind: "not_found" }, null);
    })
}

Person_Ministry.remove = (person_id, ministry_id, result) => {
    sql.query(`DELETE FROM person_ministry WHERE person_ministry.person_ID = "${person_id}" AND 
                person_ministry.ministry_ID = "${ministry_id}"`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found person_ministry with the person_id and ministry_id
            result({ kind: "not_found" }, null);
            return;
        }

        else {
            console.log("deleted person_ministry(s) with person_ID " + person_id + " ministry_ID " + ministry_id);
            result(null, res);
        }

    });
};

module.exports = Person_Ministry;