const Valid_Value = require("../models/valid_value.model.js");
const Routes = require("../routes/church.routes.js");

// Create and save a new valid_value
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    }

    const valid_value = new Valid_Value({
      value_group: req.body.value_group,
      value: req.body.value
    });

    Valid_Value.create(valid_value, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Internal server error - create valid_value."
        });
      else res.send(data);
    });
}

exports.find = (req, res) => {
    const id = req.query.id;
    const value_group = req.query.value_group;
    // if this is a GET ALL call
    if(id == null && value_group == null)
      Valid_Value.findAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Internal server error - get valid_value."
          });
        else res.send(data);
      });
    // if this is a GET by Id call
    else if(id != null)
      Valid_Value.findById(id, (err, data) => {
          if (err)
          {
            res.status(500).send({
              message:
                err.message || "Internal server error - get valid_value."
            });
          }
          else res.send(data);
      });
    // if this is a get by value_group call
    else 
      Valid_Value.findByValueGroup(value_group, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Internal server error - get valid_value."
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

    Valid_Value.updateById(req.query.id, new Valid_Value(req.body), (err, data) => {
        if (err) {
            res.status(500).send({
                message: "Error updating valid_value with id " + req.query.id
            });
        } else res.send(data);
    });
}

exports.delete = (req,res) => {
    const id = req.query.id;
    
    Valid_Value.remove(id, (err, data) => {
        if (err) {
            res.status(500).send({
            message: "Could not delete valid_value with id " + id
            });
        } else res.send({ message: `valid_value was deleted successfully!` });
    });
}