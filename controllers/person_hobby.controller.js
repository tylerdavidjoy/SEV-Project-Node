const Person = require("../models/person.model.js");
const Person_Hobby = require("../models/person_hobby.model.js");
const Routes = require("../routes/church.routes.js");

// Create and save a new person_hobby
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const isNewHobby = req.query.isNewHobby;

    if (isNewHobby == 0) {
        const person_hobby = new Person_Hobby({
            person_ID: req.body.person_ID,
            hobby_ID: req.body.hobby_ID
        });

        Person_Hobby.createWithExistingHobby(person_hobby, (err, data) => {
            if (err)
                res.status(500).send({
                    message:
                        err.message || "Internal server error - create person_hobby."
                });
            else res.send(data);
        });
    } else if (isNewHobby == 1) {
        Person_Hobby.createWithNewHobby(req.body.person_ID, req.body.hobby, (err, data) => {
            if (err)
                res.status(500).send({
                    message:
                        err.message || "Internal server error - create person_hobby."
                });
            else res.send(data);
        })
    } else {
        res.status(400).send({
            message: "isNewHobby must be 0 or 1"
        });
    }
}

exports.find = (req, res) => {
    const person_id = req.query.person_id;
    const hobby_id = req.query.hobby_id;

    // if this is a GET ALL call
    if (person_id == null && hobby_id == null)
        Person_Hobby.findAll((err, data) => {
            if (err)
                res.status(500).send({
                    message:
                        err.message || "Internal server error - get person_hobby."
                });
            else res.send(data);
        });

    // if this is a GET by person id call
    else if (person_id != null && hobby_id == null)
        Person_Hobby.findByPersonId(person_id, (err, data) => {
            if (err) {
                res.status(500).send({
                    message:
                        err.message || "Internal server error - get person_hobby."
                });
            }
            else res.send(data);
        });
    // if this is a GET by hobby id call
    else if (person_id == null && hobby_id != null)
        Person_Hobby.findByHobbyId(hobby_id, (err, data) => {
            if (err) {
                res.status(500).send({
                    message:
                        err.message || "Internal server error - get person_hobby."
                });
            }
            else res.send(data);
        });
    else
        Person_Hobby.findByPersonIdAndHobbyId(person_id, hobby_id, (err, data) => {
            if (err) {
                res.status(500).send({
                    message:
                        err.message || "Internal server error - get person_hobby."
                });
            }
            else res.send(data);
        });
}

exports.delete = (req, res) => {
    const person_id = req.query.person_id;
    const hobby_id = req.query.hobby_id;

    Person_Hobby.remove(person_id, hobby_id, (err, data) => {
        if (err) {
            console.log("ERROR:" + err);
            res.status(500).send({
                message: "Could not delete person_hobby with person_id " + person_id + " and hobby_id " + hobby_id
            });
        } else res.send({ message: `person_hobby was deleted successfully!` });
    });
}