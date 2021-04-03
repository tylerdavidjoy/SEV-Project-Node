const sql = require("./db.js");
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const fs = require("fs");
const defaultImage = "default.jpg";
// Constructor
const Upload = function () { }

Upload.uploadImage = (req, result) => {
    const myFile = req.files.file;
    const person_ID = req.query.person_ID;
    const family_ID = req.query.family_ID;
    let entity;
    let entity_ID;

    if (person_ID == null && family_ID != null) {
        entity = "family";
        entity_ID = family_ID;
    }
    else if (person_ID != null && family_ID == null) {
        entity = "person";
        entity_ID = person_ID;
    }
    else {
        result("provide an ID for either person or family", null);
        return;
    }

    let getImagePromise = new Promise(function (getImageResolve, getImageReject) {
        // Get the previous image
        sql.query(`SELECT image FROM ${entity} WHERE ID = ${entity_ID}`, (err, res) => {
            if (err) {
                console.log("error: ", err);
                getImageReject(err);
            }
            if(!res.length)
            {
                result({ kind: "not_found" }, null);
                return;
            }
            getImageResolve(res[0].image);
        })
    })
    getImagePromise.then(
        function (response) {
            if (response == null) {
                result("Error getting old image in backend - this should never happen (theoretically)", null);
                console.log("Error getting old image in backend - this should never happen (theoretically)");
                return;
            }
            console.log("prev image: " + response);

            // Delete previous image if it is not the default image
            if (response != defaultImage) {
                fs.unlink("public/images/" + response, (err) => {
                    if (err) {
                        console.log(error);
                        result(error, null);
                        return;
                    }
                })
            }

            // Create new image
            let imagePromise = new Promise(function (imageResolve, imageReject) {
                // Generate unique name or new image

                let imageName = uuidv4() + path.extname(myFile.name);
                console.log(imageName);
                //  mv() method places the file inside public/images/ directory
                let filePath = path.resolve("public/images/", imageName);
                myFile.mv(filePath, function (err) {
                    if (err)
                        imageReject(err)
                    else
                        imageResolve(imageName)

                });
            })
            imagePromise.then(
                function (response) {
                    // Update entity image reference to new image
                    sql.query(`UPDATE ${entity} SET image = "${response}" WHERE ID = ${entity_ID}`, (err, res) => {
                        if (err) {
                            console.log("error: ", err);
                            result(err, null);
                            return;
                        }
                        result(null, { name: response, path: `/${response}` });
                    })
                },
                function (error) {
                    console.log(error);
                    result(error, null);
                }
            )
        },
        function (error) { }
    )
};

module.exports = Upload;