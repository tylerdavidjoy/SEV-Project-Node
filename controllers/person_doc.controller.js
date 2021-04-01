const Person_Doc = require("../models/person_doc.model.js");
const Routes = require("../routes/church.routes.js");

exports.find = (req, res) => {
    const id = req.query.id;
    const person_ID = req.query.person_ID;

    // if this is a GET ALL call
    if (id == null && person_ID == null)
        Person_Doc.findAll((err, data) => {
            if (err)
                res.status(500).send({
                    message:
                        err.message || "Internal server error - get person_doc."
                });
            else res.send(data);
        });

    // if this is a GET by Id call
    else if (id != null && person_ID == null)
        Person_Doc.findById(id, (err, data) => {
            if (err) {
                res.status(500).send({
                    message:
                        err.message || "Internal server error - get person_doc."
                });
            }
            else res.send(data);
        });
    else
        Person_Doc.findByPersonId(person_ID, (err, data) => {
            if (err) {
                res.status(500).send({
                    message:
                        err.message || "Internal server error - get person_doc by person id."
                });
            }
            else res.send(data);
        });
}

exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Person_Doc.updateById(req.query.id, new Person_Doc(req.body), (err, data) => {
        if (err) {
            res.status(500).send({
                message: "Error updating person_doc with id " + req.query.id
            });
        } else res.send(data);
    });
}