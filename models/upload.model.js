const sql = require("./db.js");

// Constructor
const Upload = function() {}

Upload.uploadImage = (req, result) => {
    const myFile = req.files.file;

    let imagePromise = new Promise(function (imageResolve, imageReject) {
        myFile.mv(`${__dirname}/public/${myFile.name}`, function (err) {
            if(err)
                imageReject(err)
            else
                imageResolve(null)
            
        });
    })
    imagePromise.then(
        function(response) {
            result(null, {name: myFile.name, path: `/${myFile.name}`});
            console.log("resolve")

        },
        function(error) {
            console.log("reject")
            console.log(error)
            result({ msg: error }, null);
        }
    )
    //  mv() method places the file inside public directory
    
    console.log("out of function");

}

module.exports = Upload;