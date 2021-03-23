const sql = require("./db.js");

// Constructor
const Upload = function() {}

Upload.uploadImage = (upload, result) => {
    const myFile = req.files.file;

    //  mv() method places the file inside public directory
    myFile.mv(`${__dirname}/public/${myFile.name}`, function (err) {
        if (err) {
            console.log(err)
            return res.status(500).send({ msg: "Error occurred" });
        }
        return res.send({name: myFile.name, path: `/${myFile.name}`});
    });
}

module.exports = Upload;