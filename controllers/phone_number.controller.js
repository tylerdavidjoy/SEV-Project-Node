const Phone_Number = require("../models/phone_number.model.js");
const Person_Number_Controller = require("./person_number.controller.js");
const Routes = require("../routes/church.routes.js");

// Create and save a new phone_number
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    }

    const phone_number = new Phone_Number({
      number: req.body.number,
      can_publish: req.body.can_publish,
      type: req.body.type
    });

    var temp;
    Phone_Number.create(phone_number, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Internal server error - create phone_number."
        });

      else
        {
          req.body = {"person_ID":req.query.id, "number_ID": data.ID};
          Person_Number_Controller.create(req,res);
        }
    });

}

exports.find = (req, res) => {
    const id = req.query.id;
    const person_ID =  req.query.person_ID;
    // if this is a GET ALL call
    if(id == null && person_ID == null)
      Phone_Number.findAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Internal server error - get phone_number."
          });
        else res.send(data);
      });

    // if this is a GET by Id call
    else if(id != null)
    Phone_Number.findById(id, (err, data) => {
          if (err)
          {
            res.status(500).send({
              message:
                err.message || "Internal server error - get phone_number."
            });
          }
          else res.send(data);
      });
    
    //Get all phone numbers for a person
    else if(person_ID != null)
    Phone_Number.findbyPerson(person_ID, (err, data) => {
          if (err)
          {
            res.status(500).send({
              message:
                err.message || "Internal server error - get phone_number."
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
    
    Phone_Number.updateById(req.query.id, new Phone_Number(req.body), (err, data) => {
        if (err) {
            res.status(500).send({
                message: "Error updating phone_number with id " + req.query.id
            });
        } else res.send(data);
    });
}

exports.delete = (req,res) => {
    const id = req.query.id;
    
    Phone_Number.remove(id, (err, data) => {
        if (err) {
            console.log("ERROR: " + err);
            res.status(500).send({
            message: "Could not delete phone_number with id " + id
            });
        } 
        else res.send({ message: `phone_number was deleted successfully!` });
    });
}