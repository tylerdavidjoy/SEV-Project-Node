const Group = require("../models/group.model.js");
const Routes = require("../routes/church.routes.js");

// Create and save a new group
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    }

    const group = new Group({
      type: req.body.type,
      leader: req.body.leader,
      congregation_ID: req.body.congregation_ID,
      name: req.body.name
    });

    Group.create(group, (err, data) => {
      if (err)
      {
        if(err.kind == 'invalid_ids')
        res.status(400).send({
          message:
            err.message || "Invalid data for type, leader or congregation_id."
        });

        else
          res.status(500).send({
            message:
              err.message || "Internal server error - create group."
          });
      }
      else res.send(data);
    });
}

exports.find = (req, res) => {
    const id = req.query.id;
    const person_ID = req.query.person_ID;
    const get_members = req.query.get_members;
    const name = req.query.name;
    const report = req.query.report;

    // if this is a GET ALL call
    if(id == null && person_ID == null && name == null && report == null)
    Group.findAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Internal server error - get group."
          });
        else res.send(data);
      });

    // if this is a GET by Id call
    else if(id != null && get_members == null)
    Group.findById(id, (err, data) => {
          if (err)
          {
            if(err.kind == 'not_found')
            res.status(404).send({
              message:
                err.message || "No data was found for that object."
            });

            else
            res.status(500).send({
              message:
                err.message || "Internal server error - get group."
            });
          }
          else res.send(data);
      });

      // if this is a GET by name call
      else if(id == null && get_members == null && name != null)
      Group.findByName(name, (err, data) => {
            if (err)
            {
              if(err.kind == 'not_found')
            res.status(404).send({
              message:
                err.message || "No data was found for that object."
            });

            else
              res.status(500).send({
                message:
                  err.message || "Internal server error - get group."
              });
            }
            else res.send(data);
        });

    // if this is a GET by Person call
    else if(person_ID != null)
    Group.findByPerson(person_ID, (err, data) => {
          if (err)
          {
            res.status(500).send({
              message:
                err.message || "Internal server error - get group."
            });
          }
          else res.send(data);
      });

    // if this is a GET by Id call
    else if(id != null && get_members != null)
    Group.findMembers(id, (err, data) => {
          if (err)
          {
            res.status(500).send({
              message:
                err.message || "Internal server error - get group."
            });
          }
          else res.send(data);
      });

    // if this is a GET for Report call
    if(id == null && person_ID == null && name == null && report != null)
    Group.findReport((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Internal server error - get group."
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
    
    
    Group.updateById(req.query.id, new Group(req.body), (err, data) => {
        if (err) {
          if(err.kind == 'not_found')
            res.status(404).send({
              message:
                err.message || "No data was found for that object."
            });

            else
            res.status(500).send({
                message: "Error updating group with id " + req.query.id
            });
        } else res.send(data);
    });
}

exports.delete = (req,res) => {
    const id = req.query.id;
    
    Group.remove(id, (err, data) => {
        if (err) {
          if(err.kind == 'not_found')
            res.status(404).send({
              message:
                err.message || "No data was found for that object."
            });

            else
            res.status(500).send({
            message: "Could not delete group with id " + id
            });
        } else res.send({ message: `group was deleted successfully!` });
    });
}