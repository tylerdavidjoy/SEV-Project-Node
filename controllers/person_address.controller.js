const Person_Address = require("../models/person_address.model.js");
const Routes = require("../routes/church.routes.js");

// Create and save a new person_address
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const person_address = new Person_Address({
    person_ID: req.body.person_ID,
    address_ID: req.body.address_ID
  });

  Person_Address.create(person_address, (err, data) => {
    if (err) {
      if (err.kind == "not_found_person") {
        res.status(400).send({
          message:
            err.message || "Could not find person for person_ID."
        });
      } else if (err.kind == "not_found_address") {
        res.status(400).send({
          message:
            err.message || "Could not find address for address_ID."
        });
      }
      else {
        res.status(500).send({
          message:
            err.message || "Internal server error - create person_address."
        });
      }
    }
    else res.send(data);
  });
}

exports.find = (req, res) => {

  Person_Address.findAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Internal server error - get person_address."
      });
    else res.send(data);
  })
}

exports.delete = (req, res) => {
  const person_ID = req.query.person_ID;
  const address_ID = req.query.address_ID;

  Person_Address.remove(person_ID, address_ID, (err, data) => {
    if (err) {
      if (err.kind == "not_found") {
        res.status(404).send({
          message: "Could not find person_address to delete with person_ID " + person_ID + " and address_ID " + address_ID
        });
      } else {
        console.log("ERROR:" + err);
        res.status(500).send({
          message: "Could not delete person_address with person_ID " + person_ID + " and address_ID " + address_ID
        });
      }
    } else res.send({ message: `person_address was deleted successfully!` });
  });
}