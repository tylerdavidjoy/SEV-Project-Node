const Upload = require("../models/upload.model.js");
const Routes = require("../routes/church.routes.js");

exports.uploadImage = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }


  Upload.uploadImage(req, (err, data) => {
    if (err) {
      if (err.kind == "not_found") {
        res.status(400).send({
          message:
            err.message || "Could not find entity"
        });
      } else {
        res.status(500).send({
          message:
            err.message || "Internal server error - upload image."
        });
      }
    }
    else res.send(data);
  });
}
