const Event_Group = require("../models/event_group.model.js");
const Routes = require("../routes/church.routes.js");

// Create and save a new event_group
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const event_group = new Event_Group({
    group_ID: req.body.group_ID,
    event_ID: req.body.event_ID
  });

  Event_Group.create(event_group, (err, data) => {
    if (err) {
      if (err.kind == "not_found_group") {
        res.status(400).send({
          message:
            err.message || "Could not find group for group_ID."
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
            err.message || "Internal server error - create event_group."
        });
      }
    }

    else res.send(data);
  });
}

exports.find = (req, res) => {
  Event_Group.findAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Internal server error - get event_group."
      });
    else res.send(data);
  })
}

exports.delete = (req, res) => {
  const group_ID = req.query.group_ID;
  const event_ID = req.query.event_ID;

  Event_Group.remove(group_ID, event_ID, (err, data) => {
    if (err) {
      if (err.kind == "not_found") {
        res.status(404).send({
          message:
            err.message || "Could not find event to delete for group_ID " + group_ID + " and event_ID " + event_ID
        });
      } else {
        console.log("ERROR:" + err);
        res.status(500).send({
          message: "Could not delete event_group with group_ID " + group_ID + " and event_ID " + event_ID
        });
      }

    } else res.send({ message: `event_group was deleted successfully!` });
  });
}