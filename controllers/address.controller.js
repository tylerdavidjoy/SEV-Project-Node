const Address = require("../models/address.model.js");
const Routes = require("../routes/church.routes.js");

// Create and save a new address
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    }

    const address = new Address({
      address: req.body.address,
      type: req.body.type
    });

    const person_ID = req.query.person_ID;

    Address.create(address, person_ID, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Internal server error - create address."
        });
      else res.send(data);
    });
}

exports.find = (req, res) => {
    const id = req.query.id;
    const person_ID = req.query.person_ID;
    // if this is a GET ALL call
    if(id == null && person_ID == null)
      Address.findAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Internal server error - get address."
          });
        else res.send(data);
      });
    // if this is a GET by Id call
    else if(id != null && person_ID == null)
      Address.findById(id, (err, data) => {
          if (err)
          {
            res.status(500).send({
              message:
                err.message || "Internal server error - get address."
            });
          }
          else res.send(data);
      });
    // if this is a get by person_ID call
    else 
      Address.findByPersonID(person_ID, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Internal server error - get address."
          });
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

    Address.updateById(req.query.id, new Address(req.body), (err, data) => {
        if (err) {
            res.status(500).send({
                message: "Error updating address with id " + req.query.id
            });
        } else res.send(data);
    });
}

exports.delete = (req,res) => {
    const id = req.query.id;
    
    Address.remove(id, (err, data) => {
        if (err) {
            res.status(500).send({
            message: "Could not delete address with id " + id
            });
        } else res.send({ message: `address was deleted successfully!` });
    });
}