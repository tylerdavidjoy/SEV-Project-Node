const Attendee = require("../models/attendee.model.js");
const Routes = require("../routes/church.routes.js");

// Create and save a new attendee
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    }

    const attendee = new Attendee({
      person_ID: req.body.person_ID,
      event_ID: req.body.event_ID
    });

    Attendee.create(attendee, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Internal server error - create attendee."
        });
      else res.send(data);
    });
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

exports.delete = (req,res) => {
    const person_ID = req.query.person_ID;
    const event_ID = req.query.event_ID;
    
    Attendee.remove(person_ID, event_ID, (err, data) => {
        if (err) {
          console.log("ERROR:" + err);
            res.status(500).send({
            message: "Could not delete attendee with person_ID " + person_ID + " and event_ID " + event_ID
            });
        } else res.send({ message: `attendee was deleted successfully!` });
    });
}