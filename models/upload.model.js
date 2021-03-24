const sql = require("./db.js");
const path = require("path");
const defaultImage = "default.png";
// Constructor
const Upload = function() {}

Upload.uploadImage = (req, result) => {
    const myFile = req.files.file;
    const person_ID = req.query.person_ID;
    const family_ID = req.query.family_ID;
    let entity;
    let entity_ID;
    
    if(person_ID == null && family_ID != null) {
        entity = "family";
        entity_ID = family_ID;
    }
    else if (person_ID != null && family_ID == null) {
        entity = "person";
        entity_ID = person_ID;
    }
    else {
        result({msg: "provide an ID for either person or family"}, null);
        return;
    }

    const prevImage = getImageFor(entity, entity_ID);
    if(prevImage == null) {
        result({msg: "Error getting old image in backend - this should never happen (theoretically)"}, null);
        return;
    }

    if(prevImage != defaultImage)
        deleteOldImage(entity, entity_ID);

    

    let imagePromise = new Promise(function (imageResolve, imageReject) {
        //  mv() method places the file inside public directory
        let filePath = path.resolve("public/images/", myFile.name);
        myFile.mv(filePath, function (err) {
            if(err)
                imageReject(err)
            else
                imageResolve(null)
            
        });
    })
    imagePromise.then(
        function(response) {
            console.log("resolve");
            sql.query(`UPDATE "${entity}" SET image = "${myFile.name}" WHERE ID = "${entity_ID}"`, (err, res) => {
                if (err) {
                  console.log("error: ", err);
                  result({msg: err}, null);
                  return;
                }
                result(null, {name: myFile.name, path: `/${myFile.name}`});
            })
        },
        function(error) {
            console.log("reject");
            console.log(error);
            result({ msg: error }, null);
        }
    )
};

function getImageFor(entity, entity_ID)
{
    let result;
    let getPromise = new Promise(function(getResolve, getReject) {
        sql.query(`SELECT image FROM "${entity}" WHERE image = "${entity_ID}"`, (err, res) => {
            if (err) {
              console.log("error: ", err);
              getReject(err)
            }
            getResolve(res);
        })

    });
    getPromise.then(
        function(response) {
            result = response;
        },
        function(error) {
            result = null;
        }
    );
    return result;
};

function deleteOldImage(entity, entity_ID)
{
    //IMPLEMENT ME
}

module.exports = Upload;