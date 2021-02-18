const Family = require("../models/family.model.js");
const Routes = require("../routes/church.routes.js");

// Create and save a new family
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    }

    const family = new Family({
      congregation_ID: req.body.congregation_ID,
        address_ID: req.body.address_ID
    });

    Family.create(family, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Internal server error - create family."
        });
      else res.send(data);
    });
}

exports.find = (req, res) => {
    const id = req.query.id;

    // if this is a GET ALL call
    if(id == null)
      Family.findAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Internal server error - get family."
          });
        else res.send(data);
      });

    // if this is a GET by Id call
    else if(id != null)
    Family.findById(id, (err, data) => {
          if (err)
          {
            res.status(500).send({
              message:
                err.message || "Internal server error - get family."
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
    
    Family.updateById(req.query.id, new Family(req.body), (err, data) => {
        if (err) {
            res.status(500).send({
                message: "Error updating family with id " + req.query.id
            });
        } else res.send(data);
    });
}

exports.delete = (req,res) => {
    const id = req.query.id;
    
    Family.remove(id, (err, data) => {
        if (err) {
            res.status(500).send({
            message: "Could not delete family with id " + id
            });
        } else res.send({ message: `family was deleted successfully!` });
    });
}