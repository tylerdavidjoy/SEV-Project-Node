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
    head_ID: req.body.head_ID,
    image: req.body.image
  });

  Family.create(family, (err, data) => {
    if (err) {
      if (err.kind == "not_found_congregation") {
        res.status(400).send({
          message:
            err.message || "Could not find congregation for congregation_ID."
        });
      } else if (err.kind == "not_found_address") {
        res.status(400).send({
          message:
            err.message || "Could not find address for address_ID."
        });
      }
      else if (err.kind == "not_found_person") {
        res.status(400).send({
          message:
            err.message || "Could not find person for person_ID."
        });
      }
      else {
        res.status(500).send({
          message:
            err.message || "Internal server error - create family."
        });
      }
    }
    else res.send(data);
  });
}

exports.find = (req, res) => {
  const id = req.query.id;
  const person_ID = req.query.person_ID;
  const isGetPersons = req.query.isGetPersons;
  const isGetHeadOfFamily = req.query.isGetHeadOfFamily;
  const isGetNameList = req.query.isGetNameList;
  const isGetSpouse = req.query.isGetSpouse;
  const isGetFamilyReport = req.query.isGetFamilyReport;

  // if this is a GET ALL call
  if (id == null && person_ID == null && isGetNameList == null && isGetSpouse == null && isGetFamilyReport == null)
    Family.findAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Internal server error - get family."
        });
      else res.send(data);
    });

  // if this is a GET by Id call
  else if (id != null && isGetPersons == 0 && isGetHeadOfFamily == 0 && isGetSpouse == null && isGetFamilyReport == null)
    Family.findById(id, (err, data) => {
      if (err) {
        if (err.kind == "not_found") {
          res.status(404).send({
            message:
              err.message || "Could not find family for ID " + id + "."
          });
        } else {
          res.status(500).send({
            message:
              err.message || "Internal server error - get family."
          });
        }
      }
      else res.send(data);
    });
  else if (id != null && isGetPersons == 1 && isGetHeadOfFamily == 0 && isGetSpouse == null && isGetFamilyReport == null)
    Family.findPersonsInFamily(id, (err, data) => {
      if (err) {
        res.status(500).send({
          message:
            err.message || "Internal server error - get persons in family."
        });
      }
      else res.send(data);
    })
  else if (id != null && isGetPersons == 0 && isGetHeadOfFamily == 1 && isGetSpouse == null && isGetFamilyReport == null)
    Family.findHeadOfFamily(id, (err, data) => {
      if (err) {
        if (err.kind == "not_found")
          res.status(404).send({
            message:
              err.message || "Could not find family for ID " + id + "."
          });

        else
          res.status(500).send({
            message:
              err.message || "Internal server error - get head of family."
          });
      }
      else res.send(data);
    })

  else if (isGetNameList == 1 && isGetSpouse == null && isGetFamilyReport == null) {
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
  else if (isGetSpouse == 1 && isGetFamilyReport == null) {
    Family.findHeadOfHouseholdSpouse(id, (err, data) => {
      if (err) {
        if (err.kind == "not_found_head") {
          res.status(404).send({
            message:
              err.message || "Could not find head of household for family id: " + id
          });
        } else if (err.kind == "not_found_valid_value") {
          res.status(404).send({
            message:
              err.message || "Could not find valid_value with value_group 'relationship' and value 'spouse'"
          });
        }
        else if (err.kind == "not_found_spouse") {
          res.status(404).send({
            message:
              err.message || "Either spouse is not set for head of household or ID held for spouse does not exist"
          });
        }
        else {
          res.status(500).send({
            message:
              err.message || "Internal server error - get spouse of head of household."
          });
        }
      }
      else res.send(data);
    })
  }
  else if(isGetFamilyReport == 1) {
    Family.getFamilyReport((err, data) => {
      if (err) {
        res.status(500).send({
          message:
            err.message || "Internal server error - get family report."
        });
      }
      else res.send(data);
    })
  }
  else
    Family.findFamilyForPerson(person_ID, (err, data) => {
      if (err) {
        if (err.kind == "not_found") {
          res.status(404).send({
            message:
              err.message || "Could not find family for person with ID " + person_ID + "."
          });
        } else {
          res.status(500).send({
            message:
              err.message || "Internal server error - get family for person."
          });
        }
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
      if (err.kind == "not_found") {
        res.status(404).send({
          message:
            err.message || "Could not find family for ID " + req.query.id + "."
        });
      } else {
        res.status(500).send({
          message: "Error updating family with id " + req.query.id
        });
      }

    } else res.send(data);
  });
}

exports.delete = (req, res) => {
  const id = req.query.id;

  Family.remove(id, (err, data) => {
    if (err) {
      if (err.kind == "not_found") {
        res.status(404).send({
          message:
            err.message || "Could not find family for ID " + id + "."
        });
      } else {
        res.status(500).send({
          message: "Could not delete family with id " + id
        });
      }

    } else res.send({ message: `family was deleted successfully!` });
  });
}