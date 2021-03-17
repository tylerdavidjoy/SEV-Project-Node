const Person_Involvement = require("../models/person_involvement.model.js");
const Routes = require("../routes/church.routes.js");

// Create and save a new person_involvement
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const person_involvement = new Person_Involvement({
        person_ID: req.body.person_ID,
        involvement_ID: req.body.involvement_ID
    });

    Person_Involvement.create(person_involvement, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Internal server error - create person_involvement."
            });
        else res.send(data);
    });
}

exports.find = (req, res) => {
    const person_id = req.query.person_id;
    const involvement_id = req.query.involvement_id;

    // if this is a GET ALL call
    if (person_id == null && involvement_id == null)
        Person_Involvement.findAll((err, data) => {
            if (err)
                res.status(500).send({
                    message:
                        err.message || "Internal server error - get person_involvement."
                });
            else res.send(data);
        });

    // if this is a GET by person id call
    else if (person_id != null && involvement_id == null)
        Person_Involvement.findByPersonId(person_id, (err, data) => {
            if (err) {
                res.status(500).send({
                    message:
                        err.message || "Internal server error - get person_involvement."
                });
            }
            else res.send(data);
        });
    // if this is a GET by involvement id call
    else if (person_id == null && involvement_id != null)
        Person_Involvement.findByInvolvementId(involvement_id, (err, data) => {
            if (err) {
                res.status(500).send({
                    message:
                        err.message || "Internal server error - get person_involvement."
                });
            }
            else res.send(data);
        });
    else
        Person_Involvement.findByPersonIdAndInvolvementId(person_id, involvement_id, (err, data) => {
            if (err) {
                res.status(500).send({
                    message:
                        err.message || "Internal server error - get person_involvement."
                });
            }
            else res.send(data);
        });
}

exports.delete = (req, res) => {
    const person_id = req.query.person_id;
    const involvement_id = req.query.involvement_id;

    Person_Involvement.remove(person_id, involvement_id, (err, data) => {
        if (err) {
            console.log("ERROR:" + err);
            res.status(500).send({
                message: "Could not delete person_involvement with person_id " + person_id + " and involvement_id " + involvement_id
            });
        } else res.send({ message: `person_involvement was deleted successfully!` });
    });
}