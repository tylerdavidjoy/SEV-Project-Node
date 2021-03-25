const sql = require("./db.js");

// Constructor
const Person_Hobby = function (person_hobby) {
    this.person_ID = person_hobby.person_ID;
    this.hobby_ID = person_hobby.hobby_ID;
}

// Create a person_hobby where the hobby already exists
Person_Hobby.createWithExistingHobby = (person_hobby, result) => {
    sql.query(`INSERT INTO person_hobby VALUES (${person_hobby.person_ID}, ${person_hobby.hobby_ID} )`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        } else {
            result(null, person_hobby);
        }
    })
}

// Create a person_hobby and a valid_value for a new hobby
Person_Hobby.createWithNewHobby = (person_ID, newHobby, result) => {
    let hobbyPromise = new Promise(function (hobbyResolve, hobbyReject) {
        sql.query(`INSERT INTO church.valid_value SET value_group = "hobby", value = "${newHobby}"`, (err, res) => {
            if (err) {
                console.log("error: ", err);
                hobbyReject(err);
            } else {
                console.log("created valid_value with id: ", res.insertId);
                hobbyResolve(res.insertId);
            }
        })
    })
    hobbyPromise.then(
        function (response) {
            var p_h;
            sql.query(`INSERT INTO church.person_hobby SET person_ID = "${person_ID}", hobby_ID = "${response}"`, (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                } else {
                    console.log("created person_hobby with person_ID: ", person_ID, " and hobby_ID: ", response);
                    p_h = new Person_Hobby({
                        person_ID: person_ID,
                        hobby_ID: response
                    });
                    result(null, p_h);
                }
            })
        },
        function (error) {
            result(error, null);
        }
    )
}

Person_Hobby.findAll = result => {
    sql.query("SELECT * FROM person_hobby", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("person_hobby: ", res);
        result(null, res);
    })
}

//Find by Person_ID
Person_Hobby.findByPersonId = (person_id, result) => {
    sql.query(`SELECT * FROM person_hobby WHERE person_hobby.person_ID = "${person_id}"`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("found person_ministries: ", res);
        result(null, res);
    })
}

//Find by Hobby_ID
Person_Hobby.findByHobbyId = (hobby_id, result) => {
    sql.query(`SELECT * FROM person_hobby WHERE person_hobby.hobby_ID = "${hobby_id}"`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("found person_hobbies: ", res);
        result(null, res);
    })
}

//Find by Person_ID
Person_Hobby.findByPersonIdAndHobbyId = (person_id, hobby_id, result) => {
    sql.query(`SELECT * FROM person_hobby WHERE person_hobby.person_ID = "${person_id}" AND 
                person_hobby.hobby_ID = "${hobby_id}"`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found person_hobby: ", res);
            result(null, res);
            return;
        }

        // not found person_hobby with the person_id and hobby_id
        result({ kind: "not_found" }, null);
    })
}

Person_Hobby.remove = (person_id, hobby_id, result) => {
    sql.query(`DELETE FROM person_hobby WHERE person_hobby.person_ID = "${person_id}" AND 
                person_hobby.hobby_ID = "${hobby_id}"`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found person_hobby with the person_id and hobby_id
            result({ kind: "not_found" }, null);
            return;
        }

        else {
            console.log("deleted person_hobby(s) with person_ID " + person_id + " hobby_ID " + hobby_id);
            result(null, res);
        }

    });
};

module.exports = Person_Hobby;