const sql = require("./db.js");
const nodemailer = require('nodemailer');

// Constructor
const Message = function (message) {
  this.message = message.message,
  this.subject = message.subject,
  this.type = message.type,
  this.timesent = message.timesent,
  this.receipient = message.receipient
  this.receipient_type = message.receipient_type
}

Message.create = (message, result) => {
  sql.query(`INSERT INTO message VALUES ("", "${message.suject}", "${message.message}", ${message.type}, "${message.timesent}", ${message.receipient}, ${message.receipient_type} )`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    } 
    
    else {
      sendEmail(message);
      result(null, message);
    }
  })
}

Message.findAll = result => {
  sql.query("SELECT * FROM message", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("Messages: ", res);
    result(null, res);
  })
}

//Find by ID
Message.findById = (id, result) => {
  sql.query(`SELECT * FROM message WHERE message.ID = "${id}"`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found message: ", res);
      result(null, res);
      return;
    }

    // not found message with the id
    result({ kind: "not_found" }, null);
  })
}

Message.findByType = (type, result) => {
  sql.query(`SELECT * FROM message WHERE message.type = ${type}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found message(s): ", res);
      result(null, res);
      return;
    }

    // not found message with the id
    result({ kind: "not_found" }, null);
  })
}

Message.findByTime = (time_start, time_end, result) => {
  sql.query(`SELECT * FROM message WHERE DAYOFYEAR(message.time_sent) BETWEEN DAYOFYEAR("${time_start}") AND DAYOFYEAR("${time_end}")`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found message(s): ", res);
      result(null, res);
      return;
    }

    // not found message with the id
    result({ kind: "not_found" }, null);
  })
}

Message.findByTypeTime = (type, time_start, time_end, result) => {
  sql.query(`SELECT * FROM message WHERE message.type = ${type} AND (DAYOFYEAR(message.time_sent) BETWEEN DAYOFYEAR("${time_start}") AND DAYOFYEAR("${time_end}")) `, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found message(s): ", res);
      result(null, res);
      return;
    }

    // not found message with the id
    result({ kind: "not_found" }, null);
  })
}

Message.updateById = (id, message, result) => {
  sql.query(`UPDATE message SET message.subject = "${message.subject}", message.message = "${message.message}", message.time_sent = "${new Date().toISOString()}" WHERE ID = "${id}"`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.affectedRows == 0) {
      // not found message with the id
      result({ kind: "not_found" }, null);
      return;
    }
    result(null, res);
  }
  );
}

Message.remove = (id, result) => {
    sql.query(`DELETE FROM message WHERE ID = "${id}"`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      }

      if (res.affectedRows == 0) {
        // not found message with the id
        result({ kind: "not_found" }, null);
      }

      else {
        console.log("deleted message(s) with number_ID: ", id);
        result(null, res);
      }
    })
}

module.exports = Message;


//Email
function sendEmail(message) {

  //Test email for sending emails
  var sender_email = "sevtestmail@gmail.com";
  var sender_pass = "Eagles123!";

  //List of emails
  var recipients_emails = ["tyler.david.joy@eagles.oc.edu"];

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: sender_email,
      pass: sender_pass
    },
    pool: true
  });
  
  var emails = []
  //Create emails list
  for(var i = 0; i < recipients_emails.length; i++)
  {
    emails.push(
      {
        from: sender_email,
        to: recipients_emails[i],
        subject: message.subject,
        text: message.message
      }
    )
  }

  //Pools emails to allow thousands to be sent without being blacklisted as a bot
  while (transporter.isIdle() && emails.length){
    transporter.sendMail(emails.shift(), function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }
}
