const Attendee = require("../models/attendee.model.js");
const Routes = require("../routes/church.routes.js");

// Create and save a new attendee
exports.create = (req, res) => {
  const fam_ID = req.query.family_ID;
  const event_ID = req.query.event_ID;
  // Validate request
  if (!req.body && !req.query.family_ID) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  if (!fam_ID) {
    const attendee = new Attendee({
      person_ID: req.body.person_ID,
      event_ID: req.body.event_ID
    });

    Attendee.create(attendee, (err, data) => {
      if (err) {
        if (err.kind == "not_found_person") {
          res.status(400).send({
            message:
              err.message || "Could not find person for person_ID."
          });
        } else if (err.kind == "not_found_event") {
          res.status(400).send({
            message:
              err.message || "Could not find event for event_ID."
          });
        }
        else {
          res.status(500).send({
            message:
              err.message || "Internal server error - create attendee."
          });
        }
      }
      else res.send(data);
    });
  } else {
    Attendee.createForFamily(fam_ID, event_ID, (err, data) => {
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
        } else if(err.kind == "not_found_event") {
          res.status(400).send({
            message:
              err.message || "Could not find event for event_ID."
          });
        } 
        else {
          res.status(500).send({
            message:
              err.message || "Internal server error - create attendee."
          });
        }
      }
      else res.send(data);
    })
  }
}

exports.find = (req, res) => {
  Attendee.findAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Internal server error - get attendee."
      });
    else res.send(data);
  })
}

exports.delete = (req, res) => {
  const person_ID = req.query.person_ID;
  const event_ID = req.query.event_ID;

  Attendee.remove(person_ID, event_ID, (err, data) => {
    if (err) {
      if (err.kind == "not_found") {
        res.status(404).send({
          message:
            err.message || "Could not find event to delete for person_ID " + person_ID + " and event_ID " + event_ID
        });
      } else {
        console.log("ERROR:" + err);
        res.status(500).send({
          message: "Could not delete attendee with person_ID " + person_ID + " and event_ID " + event_ID
        });
      }

    } else res.send({ message: `attendee was deleted successfully!` });
  });
}