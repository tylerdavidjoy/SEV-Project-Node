const Room = require("../models/room.model.js");
const Routes = require("../routes/church.routes.js");

// Create and save a new room
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    }

    const room = new Room({
      room_number: req.body.room_number
    });

    Room.create(room, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Internal server error - create room."
        });
      else res.send(data);
    });
}

exports.find = (req, res) => {
    const id = req.query.id;

    // if this is a GET ALL call
    if(id == null)
      Room.findAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Internal server error - get room."
          });
        else res.send(data);
      });

    // if this is a GET by Id call
    else if(id != null)
    Room.findById(id, (err, data) => {
          if (err)
          {
            res.status(500).send({
              message:
                err.message || "Internal server error - get room."
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
    
    Room.updateById(req.query.id, new Room(req.body), (err, data) => {
        if (err) {
            res.status(500).send({
                message: "Error updating room with id " + req.query.id
            });
        } else res.send(data);
    });
}

exports.delete = (req,res) => {
    const id = req.query.id;
    
    Room.remove(id, (err, data) => {
        if (err) {
            res.status(500).send({
            message: "Could not delete room with id " + id
            });
        } else res.send({ message: `room was deleted successfully!` });
    });
}