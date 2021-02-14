const Congregation = require("../models/congregation.model.js");
const Routes = require("../routes/church.routes.js");

// Create and save a new congregation
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    }

    const congregation = new Congregation({
      name: req.body.name
    });

    Congregation.create(congregation, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Internal server error - create congregation."
        });
      else res.send(data);
    });
}

exports.find = (req, res) => {
    const id = req.query.id;

    // if this is a GET ALL call
    if(id == null)
      Congregation.findAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Internal server error - get congregation."
          });
        else res.send(data);
      });

    // if this is a GET by Id call
    else if(id != null)
    Congregation.findById(id, (err, data) => {
          if (err)
          {
            res.status(500).send({
              message:
                err.message || "Internal server error - get congregation."
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
    
    Congregation.updateById(req.query.id, new Congregation(req.body), (err, data) => {
        if (err) {
            res.status(500).send({
                message: "Error updating congragation with id " + req.query.id
            });
        } else res.send(data);
    });
}

exports.delete = (req,res) => {
    const id = req.query.id;
    
    Congregation.remove(id, (err, data) => {
        if (err) {
            res.status(500).send({
            message: "Could not delete congregation with id " + id
            });
        } else res.send({ message: `congregation was deleted successfully!` });
    });
}