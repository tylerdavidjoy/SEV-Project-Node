const Relationship = require("../models/relationship.model.js");
const Routes = require("../routes/church.routes.js");

// Create and save a new relationship
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    }

    const relationship = new Relationship({
      person1_ID: req.body.person1_ID,
      person2_ID: req.body.person2_ID,
      type: req.body.type
    });

    Relationship.create(relationship, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Internal server error - create relationship."
        });
      else res.send(data);
    });
}

exports.find = (req, res) => {
    const id = req.query.id;
    const person1_ID = req.query.person1_ID;
    const person2_ID = req.query.person2_ID;
    
    // if this is a GET ALL call
    if(person1_ID == null)
    Relationship.findAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Internal server error - get relationship."
          });
        else res.send(data);
      });

    // if this is a GET by Id call
    else if(person1_ID != null && person2_ID == null)
    Relationship.findByPerson(person1_ID, (err, data) => {
          if (err)
          {
            res.status(500).send({
              message:
                err.message || "Internal server error - get relationship."
            });
          }
          else res.send(data);
      });

          // if this is a GET ALL call
    if(person1_ID != null && person2_ID != null)
    Relationship.findRelation(person1_ID, person2_ID, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Internal server error - get relationship."
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
    
    Relationship.updateById(req.query.person1_ID, req.query.person2_ID, req.query.type, (err, data) => {
        if (err) {
            res.status(500).send({
                message: "Error updating relationship with id " + req.query.id
            });
        } else res.send(data);
    });
}

exports.delete = (req,res) => {
    const id = req.query.id;
    
    Relationship.remove(req.query.person1_ID, req.query.person2_ID, (err, data) => {
        if (err) {
            res.status(500).send({
            message: "Could not delete relationship with person1_ID " + req.query.person1_ID 
            });
        } else res.send({ message: `relationship was deleted successfully!` });
    });
}
