const Person_Ministry = require("../models/person_ministry.model.js");
const Routes = require("../routes/church.routes.js");

// Create and save a new person_ministry
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const person_ministry = new Person_Ministry({
        person_ID: req.body.person_ID,
        ministry_ID: req.body.ministry_ID
    });

    Person_Ministry.create(person_ministry, (err, data) => {
        if (err) {
            if (err.kind == "not_found_person") {
                res.status(400).send({
                    message:
                        err.message || "Could not find person for person_ID."
                });
            } else if (err.kind == "not_found_valid_value") {
                res.status(400).send({
                    message:
                        err.message || "Could not find valid_value for valid_value_ID."
                });
            }
            else {
                res.status(500).send({
                    message:
                        err.message || "Internal server error - create person_involvement."
                });
            }
        }
        else res.send(data);
    });
}

exports.find = (req, res) => {
    const person_id = req.query.person_id;
    const ministry_id = req.query.ministry_id;

    // if this is a GET ALL call
    if (person_id == null && ministry_id == null)
        Person_Ministry.findAll((err, data) => {
            if (err)
                res.status(500).send({
                    message:
                        err.message || "Internal server error - get person_ministry."
                });
            else res.send(data);
        });

    // if this is a GET by person id call
    else if (person_id != null && ministry_id == null)
        Person_Ministry.findByPersonId(person_id, (err, data) => {
            if (err) {
                res.status(500).send({
                    message:
                        err.message || "Internal server error - get person_ministry."
                });
            }
            else res.send(data);
        });
    // if this is a GET by ministry id call
    else if (person_id == null && ministry_id != null)
        Person_Ministry.findByMinistryId(ministry_id, (err, data) => {
            if (err) {
                res.status(500).send({
                    message:
                        err.message || "Internal server error - get person_ministry."
                });
            }
            else res.send(data);
        });
    else
        Person_Ministry.findByPersonIdAndMinistryId(person_id, ministry_id, (err, data) => {
            if (err) {
                if (err.kind == "not_found") {
                    res.status(404).send({
                        message:
                            err.message || "Could not find person_ministry for person_ID " + person_id + " and ministry_ID " + ministry_id
                    });
                } else {
                    res.status(500).send({
                        message:
                            err.message || "Internal server error - get person_ministry."
                    });
                }
                
            }
            else res.send(data);
        });
}

exports.delete = (req, res) => {
    const person_id = req.query.person_id;
    const ministry_id = req.query.ministry_id;

    Person_Ministry.remove(person_id, ministry_id, (err, data) => {
        if (err) {
            if (err.kind == "not_found") {
                res.status(404).send({
                    message:
                        err.message || "Could not find person_ministry to delete for person_ID " + person_id + " and ministry_ID " + ministry_id
                });
            } else {
                console.log("ERROR:" + err);
            res.status(500).send({
                message: "Could not delete person_ministry with person_id " + person_id + " and ministry_id " + ministry_id
            });
            }
            
        } else res.send({ message: `person_ministry was deleted successfully!` });
    });
}