const sql = require("./db.js");
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const fs = require("fs");
// Constructor
const Document = function () { }

Document.personUpload = (document, person_ID, result) => {
    let docDisplayName = document.name;
    let documentPromise = new Promise(function (documentResolve, documentReject) {
        // Make sure the passed person_ID is valid
        sql.query(`SELECT COUNT(*) FROM person WHERE person.ID = ${person_ID}`, (err, res) => {
            if (err) {
                console.log("error: ", err);
                documentReject(err);
            } else if (res == 0) {
                console.log("created document with id: ", res.insertId);
                documentReject("invalid person_ID");
            } else {
                documentResolve();
            }
        })
    })
    documentPromise.then(
        function (response) {
            let uploadPromise = new Promise(function (uploadResolve, uploadReject) {
                // Generate unique name for new document
                let docName = uuidv4() + path.extname(document.name);
                //  mv() method places the file inside public/documents/ directory
                let filePath = path.resolve("public/documents/", docName);
                document.mv(filePath, function (err) {
                    if (err)
                        uploadReject(err);
                    else
                        uploadResolve(docName);
                });
            })
            uploadPromise.then(
                function (response) {
                    sql.query(`INSERT INTO person_doc VALUES("", ${person_ID}, "${response}", "${docDisplayName}")`, (err, res) => {
                        if (err) {
                            console.log("error: ", err);
                            result(err, null);
                        } else {
                            result(null, res);
                        }
                    })
                },
                function (error) {
                    result(error, null);
                    return;
                }
            )
        },
        function (error) {
            result(error, null);
            return;
        }
    )
}

Document.familyUpload = (document, family_ID, result) => {
    let docDisplayName = document.name;
    let documentPromise = new Promise(function (documentResolve, documentReject) {
        // Make sure the passed family_ID is valid
        sql.query(`SELECT COUNT(*) FROM family WHERE family.ID = ${family_ID}`, (err, res) => {
            if (err) {
                console.log("error: ", err);
                documentReject(err);
            } else if (res == 0) {
                console.log("created document with id: ", res.insertId);
                documentReject("invalid family_ID");
            } else {
                documentResolve();
            }
        })
    })
    documentPromise.then(
        function (response) {
            let uploadPromise = new Promise(function (uploadResolve, uploadReject) {
                // Generate unique name for new document
                let docName = uuidv4() + path.extname(document.name);
                //  mv() method places the file inside public/documents/ directory
                let filePath = path.resolve("public/documents/", docName);
                document.mv(filePath, function (err) {
                    if (err)
                        uploadReject(err);
                    else
                        uploadResolve(docName);
                });
            })
            uploadPromise.then(
                function (response) {
                    sql.query(`INSERT INTO family_doc VALUES("", ${family_ID}, "${response}", "${docDisplayName}")`, (err, res) => {
                        if (err) {
                            console.log("error: ", err);
                            result(err, null);
                        } else {
                            result(null, res);
                        }
                    })
                },
                function (error) {
                    result(error, null);
                    return;
                }
            )
        },
        function (error) {
            result(error, null);
            return;
        }
    )
}

Document.personRemove = (id, result) => {
    let deletePromise = new Promise(function (deleteResolve, deleteReject) {
        sql.query(`SELECT doc_name FROM person_doc WHERE ID = "${id}"`, (err, res) => {
            if (err) {
                deleteReject(err);
            } else {
                if(res.length > 0)
                    deleteResolve(res[0].doc_name);
                else 
                    deleteReject("No person_doc exists at id: " + id);
            }
        })
    })
    deletePromise.then(
        function (response) {
            sql.query(`DELETE FROM person_doc WHERE ID = "${id}"`, (err, res) => {
                if (err) {
                    result(null, err);
                    return;
                }
                result(null, res);
            })
            fs.unlink("public/documents/" + response, (err) => {
                if (err) {
                    console.log(err);
                    result(err, null);
                    return;
                }
            })
        },
        function (error) {
            result(error, null);
            return;
        }
    )
};

Document.familyRemove = (id, result) => {
    let deletePromise = new Promise(function (deleteResolve, deleteReject) {
        sql.query(`SELECT doc_name FROM family_doc WHERE ID = "${id}"`, (err, res) => {
            if (err) {
                deleteReject(err);
            } else {
                if(res.length > 0)
                    deleteResolve(res[0].doc_name);
                else 
                    deleteReject("No family_doc exists at id: " + id);
            }
        })
    })
    deletePromise.then(
        function (response) {
            sql.query(`DELETE FROM family_doc WHERE ID = "${id}"`, (err, res) => {
                if (err) {
                    result(null, err);
                    return;
                }
                result(null, res);
            })
            fs.unlink("public/documents/" + response, (err) => {
                if (err) {
                    console.log(err);
                    result(err, null);
                    return;
                }
            })
        },
        function (error) {
            result(error, null);
            return;
        }
    )
};

module.exports = Document;