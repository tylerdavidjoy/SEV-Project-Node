const Person = require("../models/person.model.js");
const Routes = require("../routes/church.routes.js");

// Create and save a new person
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    }

    const person = new Person({
      congregation_ID: req.body.congregation_ID,
      f_name: req.body.f_name,
      l_name: req.body.l_name,
      occupation: req.body.occupation,
      employer: req.body.employer,
      family_ID: req.body.family_ID,
      email: req.body.email,
      gender: req.body.gender,
      preferred_name: req.body.preferred_name,
      role: req.body.role
    });

    Person.create(person, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Internal server error - create person."
        });
      else res.send(data);
    });
}

exports.find = (req, res) => {
    const id = req.query.id;
    const email = req.query.email;

    // if this is a GET ALL call
    if(id == null && email == null)
    Person.findAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Internal server error - get person."
          });
        else res.send(data);
      });

    // if this is a GET by Id call
    else if(id != null && email == null)
    Person.findById(id, (err, data) => {
          if (err)
          {
            res.status(500).send({
              message:
                err.message || "Internal server error - get person."
            });
          }
          else res.send(data);
      });

    // if this is a GET by email call
    else if(id == null && email != null)
    Person.findByEmail(email, (err, data) => {
          if (err)
          {
            res.status(500).send({
              message:
                err.message || "Internal server error - get person."
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
    
    Person.updateById(req.query.id, new Person(req.body), (err, data) => {
        if (err) {
            res.status(500).send({
                message: "Error updating person with id " + req.query.id
            });
        } else res.send(data);
    });
}

exports.delete = (req,res) => {
    const id = req.query.id;

    Person.remove(id, (err, data) => {
        if (err) {
          console.log("ERROR:" + err);
            res.status(500).send({
            message: "Could not delete person with id " + id
            });
        } else res.send({ message: `person was deleted successfully!` });
    });
}