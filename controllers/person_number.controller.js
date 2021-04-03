const Person_Number = require("../models/person_number.model.js");
const Routes = require("../routes/church.routes.js");

// Create and save a new person_number
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    }

    const person_number = new Person_Number({
      person_ID: req.body.person_ID,
      number_ID: req.body.number_ID
    });

    Person_Number.create(person_number, (err, data) => {
      if (err)
      {
        if(err.kind == 'invalid_ids')
            res.status(400).send({
              message:
                err.message || "Invalid data for id, can_publish or type."
            });

        else
        res.status(500).send({
          message:
            err.message || "Internal server error - create person_number."
        });
      }
      else res.send(data);
    });
}

exports.find = (req, res) => {
    const id = req.query.id;

    // if this is a GET ALL call
    if(id == null)
      Person_Number.findAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Internal server error - get person_number."
          });
        else res.send(data);
      });

    // if this is a GET by Id call
    else if(id != null)
    Person_Number.findById(id, (err, data) => {
          if (err)
          {
            res.status(500).send({
              message:
                err.message || "Internal server error - get person_number."
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
    
    Person_Number.updateById(req.query.id, new Person_Number(req.body), (err, data) => {
        if (err) {
            res.status(500).send({
                message: "Error updating person_number with id " + req.query.id
            });
        } else res.send(data);
    });
}

exports.delete = (req,res) => {
    const id = req.query.id;
    
    Person_Number.remove(id, (err, data) => {
        if (err) {
          console.log("ERROR:" + err);
            res.status(500).send({
            message: "Could not delete person_number with id " + id
            });
        } else res.send({ message: `person_number was deleted successfully!` });
    });
}