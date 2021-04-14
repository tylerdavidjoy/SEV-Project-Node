const Group_Person = require("../models/group_person.model.js");
const Routes = require("../routes/church.routes.js");

// Create and save a new group
exports.create = (req, res) => {
  const fam_ID = req.query.family_ID;
  const group_ID = req.query.group_ID;
  // Validate request
  if (!req.body.person_ID && !req.query.family_ID) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  if (!fam_ID) {
    const group_person = new Group_Person({
      group_ID: req.body.group_ID,
      person_ID: req.body.person_ID
    });

    Group_Person.create(group_person, (err, data) => {
      if (err) {
        if (err.kind == 'invalid_ids')
          res.status(400).send({
            message:
              err.message || "Invalid data for id, group_ID or person_ID."
          });

        else
          res.status(500).send({
            message:
              err.message || "Internal server error - create group_person."
          });
      }
      else res.send(data);
    });
  } else {
    Group_Person.createForFamily(fam_ID, group_ID, (err, data) => {
      if (err) {
        if (err.kind == "not_found_family") {
          res.status(400).send({
            message:
              err.message || "Could not find family for family_ID."
          });
        } else if(err.kind == "not_found_person") {
          res.status(400).send({
            message:
              err.message || "Could not find person for person_ID."
          });
        } else if(err.kind == "not_found_group") {
          res.status(400).send({
            message:
              err.message || "Could not find group for group_ID."
          });
        } 
        else {
          res.status(500).send({
            message:
              err.message || "Internal server error - create group_person."
          });
        }
      }
      else res.send(data);
    })
  }
}

exports.find = (req, res) => {
  const group_ID = req.query.group_ID;
  const person_ID = req.query.person_ID;

  // if this is a GET ALL call
  if (group_ID == null && person_ID == null)
    Group_Person.findAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Internal server error - get group_person."
        });
      else res.send(data);
    });

  // if this is a GET by group_ID call
  else if (group_ID != null)
    Group_Person.findById(group_ID, (err, data) => {
      if (err) {
        res.status(500).send({
          message:
            err.message || "Internal server error - get group_person."
        });
      }
      else res.send(data);
    });

  // if this is a GET by Person_ID call
  else if (person_ID != null)
    Group_Person.findByPerson(person_ID, (err, data) => {
      if (err) {
        res.status(500).send({
          message:
            err.message || "Internal server error - get group_person."
        });
      }
      else res.send(data);
    });
}

exports.delete = (req, res) => {
  const group_ID = req.query.group_ID;
  const person_ID = req.query.person_ID;

  Group_Person.remove(group_ID, person_ID, (err, data) => {
    if (err) {
      if (err.kind == 'not_found')
        res.status(404).send({
          message:
            err.message || "No data was found for that object."
        });

      else
        res.status(500).send({
          message: "Could not delete group with id " + group_ID + " and person id " + person_ID
        });
    } else res.send({ message: `group_person was deleted successfully!` });
  });
}