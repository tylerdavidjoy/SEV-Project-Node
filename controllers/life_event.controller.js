const Life_Event = require("../models/life_event.model.js");
const Routes = require("../routes/church.routes.js");

// Create and save a new life_event
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    }

    const life_event = new Life_Event({
      person_ID: req.body.person_ID,
      description: req.body.description,
      date: req.body.date,
      type: req.body.type
    });

    Life_Event.create(life_event, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Internal server error - create life_event."
        });
      else res.send(data);
    });
}

exports.find = (req, res) => {
    const id = req.query.id;
    const person_id = req.query.person_id;

    // if this is a GET ALL call
    if(id == null && person_id == null)
    Life_Event.findAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Internal server error - get life_event."
          });
        else res.send(data);
      });

    // if this is a GET by Id call
    else if(id != null)
    Life_Event.findById(id, (err, data) => {
          if (err)
          {
            res.status(500).send({
              message:
                err.message || "Internal server error - get life_event."
            });
          }
          else res.send(data);
      });

    // if this is a GET by person call
    else if(person_id != null)
    Life_Event.findByPerson(person_id, (err, data) => {
          if (err)
          {
            res.status(500).send({
              message:
                err.message || "Internal server error - get life_event."
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
    
    Life_Event.updateById(req.query.id, new Life_Event(req.body), (err, data) => {
        if (err) {
            res.status(500).send({
                message: "Error updating life_event with id " + req.query.id
            });
        } else res.send(data);
    });
}

exports.delete = (req,res) => {
    const id = req.query.id;
    
    Life_Event.remove(id, (err, data) => {
        if (err) {
            res.status(500).send({
            message: "Could not delete life_event with id " + id
            });
        } else res.send({ message: `life_event was deleted successfully!` });
    });
}