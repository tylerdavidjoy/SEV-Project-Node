const Document = require("../models/document.model.js");
const Routes = require("../routes/church.routes.js");

// Upload a document, create and save a new person_doc or family_doc
exports.uploadDocument = (req, res) => {
    const person_ID = req.query.person_ID;
    const family_ID = req.query.family_ID;
    const myFile = req.files.file;
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    if (person_ID == null && family_ID == null) {
        res.status(400).send({
            message: "Pass either a person or family ID"
        });
    }
    if (myFile == null) {
        res.status(400).send({
            message: "Must pass a file"
        });
    }

    if (person_ID != null) {
        Document.personUpload(myFile, person_ID, (err, data) => {
            if (err)
                res.status(500).send({
                    message:
                        err.message || "Internal server error - upload document."
                });
            else res.send(data);
        });
    } else {
        Document.familyUpload(myFile, family_ID, (err, data) => {
            if (err)
                res.status(500).send({
                    message:
                        err.message || "Internal server error - upload document."
                });
            else res.send(data);
        });
    }
}

// Delete a document, delete a person_doc or family_doc
exports.deleteDocument = (req, res) => {
    const id = req.query.id;
    const isPerson = req.query.is_person;

    if (id == null) {
        res.status(400).send({
            message: "Must pass an id to delete"
        });
    }
    if (isPerson != 0 || isPerson != 1) {
        res.status(400).send({
            message: "is_person must be 0(false) or 1(true)"
        });
    }

    if (isPerson == 1) {
        Document.personRemove(id, (err, data) => {
            if (err) {
                res.status(500).send({
                    message: "Could not delete person_doc with id " + id
                });
            } else res.send(`document was deleted successfully!`);
        });
    }
    else {
        Document.familyRemove(id, (err, data) => {
            if (err) {
                res.status(500).send({
                    message: "Could not delete family_doc with id " + id
                });
            } else res.send(`document was deleted successfully!`);
        });
    }
}