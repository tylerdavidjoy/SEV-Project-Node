const Family = require("../models/family.model.js");
const Routes = require("../routes/church.routes.js");

// Create and save a new family
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const family = new Family({
    congregation_ID: req.body.congregation_ID,
    address_ID: req.body.address_ID,
    head_ID: req.body.head_ID
  });

  Family.create(family, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Internal server error - create family."
      });
    else res.send(data);
  });
}

exports.find = (req, res) => {
  const id = req.query.id;
  const person_ID = req.query.person_ID;
  const isGetPersons = req.query.isGetPersons;
  const isGetHeadOfFamily = req.query.isGetHeadOfFamily;
  const isGetNameList = req.query.isGetNameList;

  // if this is a GET ALL call
  if (id == null && person_ID == null)
    Family.findAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Internal server error - get family."
        });
      else res.send(data);
    });

  // if this is a GET by Id call
  else if (id != null && isGetPersons == 0 && isGetHeadOfFamily == 0)
    Family.findById(id, (err, data) => {
      if (err) {
        res.status(500).send({
          message:
            err.message || "Internal server error - get family."
        });
      }
      else res.send(data);
    });
  else if (id != null && isGetPersons == 1 && isGetHeadOfFamily == 0)
    Family.findPersonsInFamily(id, (err, data) => {
      if (err) {
        res.status(500).send({
          message:
            err.message || "Internal server error - get persons in family."
        });
      }
      else res.send(data);
    })
  else if (id != null && isGetPersons == 0 && isGetHeadOfFamily == 1)
    Family.findHeadOfFamily(id, (err, data) => {
      if (err) {
        res.status(500).send({
          message:
            err.message || "Internal server error - get head of family."
        });
      }
      else res.send(data);
    })
  else if (isGetNameList != null) {
    Family.findNameList((err, data) => {
      if (err) {
        res.status(500).send({
          message:
            err.message || "Internal server error - get head of family."
        });
      }
      else res.send(data);
    })
  }
  else
    Family.findFamilyForPerson(person_ID, (err, data) => {
      if (err) {
        res.status(500).send({
          message:
            err.message || "Internal server error - get family for person."
        });
      }
      else res.send(data);
    })
}

exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Family.updateById(req.query.id, new Family(req.body), (err, data) => {
    if (err) {
      res.status(500).send({
        message: "Error updating family with id " + req.query.id
      });
    } else res.send(data);
  });
}

exports.delete = (req, res) => {
  const id = req.query.id;

  Family.remove(id, (err, data) => {
    if (err) {
      res.status(500).send({
        message: "Could not delete family with id " + id
      });
    } else res.send({ message: `family was deleted successfully!` });
  });
}