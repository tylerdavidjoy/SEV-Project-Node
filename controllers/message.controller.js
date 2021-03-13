const Message = require("../models/message.model.js");
const Routes = require("../routes/church.routes.js");

// Create and save a new message
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    }

    const message = new Message({
      message: req.body.message,
      subject: req.body.subject,
      type: req.body.type,
      timesent: new Date().toISOString(),
      receipient: req.body.receipient,
      receipient_type: req.body.receipient_type
    });

    Message.create(message, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Internal server error - create message."
        });
      else res.send(data);
    });
}

exports.find = (req, res) => {
    const id = req.query.id;
    const type = req.query.type;
    const time_start = req.query.time_start;
    const time_end = req.query.time_end;
    const resend_message = req.query.resend_message;

    // if this is a GET ALL call
    if(id == null && type == null && time_start == null && time_end == null)
    Message.findAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Internal server error - get message."
          });
        else res.send(data);
      });

    // if this is a GET by Id call
    else if(id != null && type == null && time_start == null && time_end == null)
    Message.findById(id, (err, data) => {
          if (err)
          {
            res.status(500).send({
              message:
                err.message || "Internal server error - get message."
            });
          }
          else res.send(data);
      });

    // if this is a GET by type call
    else if(id == null && type != null && time_start == null && time_end == null)
    Message.findByType(type, (err, data) => {
          if (err)
          {
            res.status(500).send({
              message:
                err.message || "Internal server error - get message."
            });
          }
          else res.send(data);
      });

    // if this is a GET by time call
    else if(id == null && type == null && time_start != null && time_end != null)
    Message.findByTime(time_start,time_end, (err, data) => {
          if (err)
          {
            res.status(500).send({
              message:
                err.message || "Internal server error - get message."
            });
          }
          else res.send(data);
      });

    // if this is a GET by time & type call
    else if(id == null && type != null && time_start != null && time_end != null)
    Message.findByTypeTime(type, time_start, time_end, (err, data) => {
          if (err)
          {
            res.status(500).send({
              message:
                err.message || "Internal server error - get message."
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
    
    Message.updateById(req.query.id, new Message(req.body), (err, data) => {
        if (err) {
            res.status(500).send({
                message: "Error updating message with id " + req.query.id
            });
        } else {
          if(resend_message) //add something to determine if its an email or text
          {
            Message.sendEmail(new Message(req.body))
          }
          res.send(data);
        }
    });
}

exports.delete = (req,res) => {
    const id = req.query.id;

    Message.remove(id, (err, data) => {
        if (err) {
          console.log("ERROR:" + err);
            res.status(500).send({
            message: "Could not delete message with id " + id
            });
        } else res.send({ message: `message was deleted successfully!` });
    });
}