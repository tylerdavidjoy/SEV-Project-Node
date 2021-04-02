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
      role: req.body.role,
      image: req.body.image
    });

    Person.create(person, (err, data) => {
      if (err)
      {
        if(err.kind == 'invalid_ids')
            res.status(400).send({
              message:
                err.message || "Invalid data for congregation_id, gender or role."
            });

        else
        res.status(500).send({
          message:
            err.message || "Internal server error - create person."
        });
      }
      else res.send(data);
    });
}

exports.find = (req, res) => {
    const id = req.query.id;
    const email = req.query.email;
    const getInfo = req.query.getInfo;
    const userType = req.query.userType;

    // if this is a GET ALL call
    if(id == null && email == null && getInfo == null && userType == null)
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
            if(err.kind == 'not_found')
            res.status(404).send({
              message:
                err.message || "No data was found for that object."
            });

            else
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
            if(err.kind == 'not_found')
            res.status(404).send({
              message:
                err.message || "No data was found for that object."
            });

            else
            res.status(500).send({
              message:
                err.message || "Internal server error - get person."
            });
          }
          else res.send(data);
      });

    // if this is a GET all related info
    else if(id == null && email == null && getInfo != null)
    Person.findByGetInfo((err, data) => {
          if (err)
          {
            if(err.kind == 'not_found')
            res.status(404).send({
              message:
                err.message || "No data was found for that object."
            });

            else
            res.status(500).send({
              message:
                err.message || "Internal server error - get person."
            });
          }
          else res.send(data);
      });


    // if this is a GET all UserTypes
    else if(id == null && email == null && getInfo == null && userType !=null)
    Person.findAllUserTypes((err, data) => {
          if (err)
          {
            if(err.kind == 'not_found')
            res.status(404).send({
              message:
                err.message || "No data was found for that object."
            });

            else
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
          if(err.kind == 'not_found')
            res.status(404).send({
              message:
                err.message || "No data was found for that object."
            });

            if(err.kind == 'invalid_ids')
            res.status(400).send({
              message:
                err.message || "Invalid data for congregation_id, gender or role."
            });

            else
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
          if(err.kind == 'not_found')
          res.status(404).send({
            message:
              err.message || "No data was found for that object."
          });
          
          else
            res.status(500).send({
            message: "Could not delete person with id " + id
            });
        } else res.send({ message: `person was deleted successfully!` });
    });
}