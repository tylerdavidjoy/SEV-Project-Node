const Group = require("../models/group.model.js");
const Routes = require("../routes/church.routes.js");

// Create and save a new group
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    }

    const group = new Group({
      type: req.body.type,
      leader: req.body.leader,
      congregation_ID: req.body.congregation_ID
    });

    Group.create(group, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Internal server error - create group."
        });
      else res.send(data);
    });
}

exports.find = (req, res) => {
    const id = req.query.id;
    const person_ID = req.query.person_ID;

    // if this is a GET ALL call
    if(id == null && person_ID == null)
    Group.findAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Internal server error - get group."
          });
        else res.send(data);
      });

    // if this is a GET by Id call
    else if(id != null)
    Group.findById(id, (err, data) => {
          if (err)
          {
            res.status(500).send({
              message:
                err.message || "Internal server error - get group."
            });
          }
          else res.send(data);
      });

    // if this is a GET by Person call
    else if(person_ID != null)
    Group.findByPerson(person_ID, (err, data) => {
          if (err)
          {
            res.status(500).send({
              message:
                err.message || "Internal server error - get group."
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
    
    Group.updateById(req.query.id, new Group(req.body), (err, data) => {
        if (err) {
            res.status(500).send({
                message: "Error updating group with id " + req.query.id
            });
        } else res.send(data);
    });
}

exports.delete = (req,res) => {
    const id = req.query.id;
    
    Group.remove(id, (err, data) => {
        if (err) {
            res.status(500).send({
            message: "Could not delete group with id " + id
            });
        } else res.send({ message: `group was deleted successfully!` });
    });
}