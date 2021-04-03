const Family_Doc = require("../models/family_doc.model.js");
const Routes = require("../routes/church.routes.js");

exports.find = (req, res) => {
    const id = req.query.id;
    const family_ID = req.query.family_ID;

    // if this is a GET ALL call
    if (id == null && family_ID == null)
        Family_Doc.findAll((err, data) => {
            if (err)
                res.status(500).send({
                    message:
                        err.message || "Internal server error - get family_doc."
                });
            else res.send(data);
        });

    // if this is a GET by Id call
    else if (id != null && family_ID == null)
        Family_Doc.findById(id, (err, data) => {
            if (err) {
                if (err.kind == "not_found") {
                    res.status(404).send({
                        message:
                            err.message || "Could not find family_doc for ID " + id + "."
                    });
                } else {
                    res.status(500).send({
                        message:
                            err.message || "Internal server error - get family_doc."
                    });
                }

            }
            else res.send(data);
        });
    else
        Family_Doc.findByFamilyId(family_ID, (err, data) => {
            if (err) {
                res.status(500).send({
                    message:
                        err.message || "Internal server error - get family_doc by family id."
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

    Family_Doc.updateById(req.query.id, new Family_Doc(req.body), (err, data) => {
        if (err) {
            if (err.kind == "not_found") {
                res.status(404).send({
                    message:
                        err.message || "Could not find family_doc for ID " + req.query.id + "."
                });
            } else {
                res.status(500).send({
                    message: "Error updating family_doc with id " + req.query.id
                });
            }

        } else res.send(data);
    });
}