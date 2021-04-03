const Event = require("../models/event.model.js");
const Routes = require("../routes/church.routes.js");

// Create and save a new event
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const event = new Event({
        date: req.body.date,
        leader: req.body.leader,
        location: req.body.location,
        description: req.body.description,
        recurring: req.body.recurring
    });

    const group_ID = req.query.group_ID;

    Event.create(event, group_ID, (err, data) => {
        if (err)
            if (err.kind == "not_found_room") {
                res.status(400).send({
                    message:
                        err.message || "Could not find room for room_ID."
                });
            } else if (err.kind == "not_found_person") {
                res.status(400).send({
                    message:
                        err.message || "Could not find person for person_ID."
                });
            } else if (err.kind == "not_found_group") {
                res.status(400).send({
                    message:
                        err.message || "Could not find group for group_ID."
                });
            } else {
                res.status(500).send({
                    message:
                        err.message || "Internal server error - create event."
                });
            }
        else res.send(data);
    });
}

exports.find = (req, res) => {
    const id = req.query.id;
    const group_ID = req.query.group_ID;
    const person_ID = req.query.person_ID;
    // if this is a GET ALL call
    if (id == null && group_ID == null && person_ID == null)
        Event.findAll((err, data) => {
            if (err)
                res.status(500).send({
                    message:
                        err.message || "Internal server error - get event."
                });
            else res.send(data);
        });
    // if this is a GET by Id call
    else if (id != null && group_ID == null && person_ID == null)
        Event.findById(id, (err, data) => {
            if (err) {
                if (err.kind == "not_found") {
                    res.status(404).send({
                        message:
                            err.message || "Could not find family for ID " + id + "."
                    });
                } else {
                    res.status(500).send({
                        message:
                            err.message || "Internal server error - get event."
                    });
                }
            }
            else res.send(data);
        });
    // if this is a get by group_ID call
    else if (id == null && group_ID != null && person_ID == null)
        Event.findByGroupId(group_ID, (err, data) => {
            if (err)
                res.status(500).send({
                    message:
                        err.message || "Internal server error - get event."
                });
            else res.send(data);
        })
    // if this is a get by person_ID call
    else
        Event.findByPersonId(person_ID, (err, data) => {
            if (err)
                res.status(500).send({
                    message:
                        err.message || "Internal server error - get event."
                });
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

    Event.updateById(req.query.id, new Event(req.body), (err, data) => {
        if (err) {
            if (err.kind == "not_found") {
                res.status(404).send({
                    message:
                        err.message || "Could not find event for ID " + req.query.id + "."
                });
            } else {
                res.status(500).send({
                    message: "Error updating event with id " + req.query.id
                });
            }

        } else res.send(data);
    });
}

exports.delete = (req, res) => {
    const id = req.query.id;

    Event.remove(id, (err, data) => {
        if (err) {
            if (err.kind == "not_found") {
                res.status(404).send({
                    message:
                        err.message || "Could not find event for ID " + id + "."
                });
            } else {
                res.status(500).send({
                    message: "Could not delete event with id " + id
                });
            }
            
        } else res.send({ message: `event was deleted successfully!` });
    });
}