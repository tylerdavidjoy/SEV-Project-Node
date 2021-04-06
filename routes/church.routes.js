module.exports = app => {
    const valid_value = require("../controllers/valid_value.controller.js");
    const congregation = require("../controllers/congregation.controller.js");
    const phone_number = require("../controllers/phone_number.controller.js");
    const person_number = require("../controllers/person_number.controller.js");
    const address = require("../controllers/address.controller.js");
    const person_address = require("../controllers/person_address.controller.js");
    const person = require("../controllers/person.controller.js");
    const family = require("../controllers/family.controller.js");
    const group = require("../controllers/group.controller.js");
    const group_person = require("../controllers/group_person.controller.js");
    const life_event = require("../controllers/life_event.controller.js");
    const room = require("../controllers/room.controller.js");
    const event = require("../controllers/event.controller.js");
    const event_group = require("../controllers/event_group.controller.js");
    const attendee = require("../controllers/attendee.controller.js");
    const relationship = require("../controllers/relationship.controller.js");
    const message = require("../controllers/message.controller.js");
    const person_ministry = require("../controllers/person_ministry.controller.js");
    const person_involvement = require("../controllers/person_involvement.controller.js");
    const person_hobby = require("../controllers/person_hobby.controller.js");
    const upload = require("../controllers/upload.controller.js");
    const document = require("../controllers/document.controller.js");
    const person_doc = require("../controllers/person_doc.controller.js");
    const family_doc = require("../controllers/family_doc.controller.js");

    const cors = require('cors');
    var corsOptions = {
      origin: 'http://localhost:8080',
      optionsSuccessStatus: 200 // For legacy browser support
    }
    
    // ----------------------------------
    // valid_value Table API
    // ----------------------------------

    //Create a new valid_value
    app.post("/valid_value",cors(corsOptions),valid_value.create);

    // Find valid_value(s) by a parameter
    app.get("/valid_value",cors(corsOptions), valid_value.find);

    // Update a valid_value
    app.put("/valid_value",cors(corsOptions), valid_value.update);

    // Delete a valid_value
    app.delete("/valid_value",cors(corsOptions), valid_value.delete);


    // ----------------------------------
    // congregation Table API
    // ----------------------------------

    //Create a new congregation
    app.post("/congregation",cors(corsOptions), congregation.create);

    // Find congregation(s) by a parameter
    app.get("/congregation",cors(corsOptions), congregation.find);

    // Update a congregation
    app.put("/congregation",cors(corsOptions), congregation.update);

    // Delete a congregation
    app.delete("/congregation",cors(corsOptions), congregation.delete);

    
    // ----------------------------------
    // phone_number Table API
    // ----------------------------------

    //Create a new phone_number
    app.post("/phone_number",cors(corsOptions), phone_number.create);

    // Find phone_number(s) by a parameter
    app.get("/phone_number",cors(corsOptions), phone_number.find);

    // Update a phone_number
    app.put("/phone_number",cors(corsOptions), phone_number.update);

    // Delete a phone_number
    app.delete("/phone_number",cors(corsOptions), phone_number.delete);

    
    // ----------------------------------
    // person_number Table API
    // ----------------------------------

    //Create a new person_number
    app.post("/person_number",cors(corsOptions), person_number.create);

    // Find person_number(s) by a parameter
    app.get("/person_number",cors(corsOptions), person_number.find);

    // Update a person_number
    app.put("/person_number",cors(corsOptions), person_number.update);

    // Delete a person_number
    app.delete("/person_number",cors(corsOptions), person_number.delete);

    // ----------------------------------
    // address Table API
    // ----------------------------------

    // Create a new address
    app.post("/address",cors(corsOptions), address.create);

    // Find address(s) by a parameter
    app.get("/address",cors(corsOptions), address.find);

    // Update a address
    app.put("/address",cors(corsOptions), address.update);

    // Delete a address
    app.delete("/address",cors(corsOptions), address.delete);

    // ----------------------------------
    // person_address Table API
    // ----------------------------------

    // Create a new person_address
    app.post("/person_address",cors(corsOptions), person_address.create);

    // Find person_address(s) by a parameter
    app.get("/person_address",cors(corsOptions), person_address.find);

    // Delete a address
    app.delete("/person_address",cors(corsOptions), person_address.delete);

    // ----------------------------------
    // person Table API
    // ----------------------------------

    //Create a new person
    app.post("/person",cors(corsOptions), person.create);

    // Find person(s) by a parameter
    app.get("/person",cors(corsOptions), person.find);

    // Update a person
    app.put("/person",cors(corsOptions), person.update);

    // Delete a person
    app.delete("/person",cors(corsOptions), person.delete);

    // ----------------------------------
    // family Table API
    // ----------------------------------

    //Create a new family
    app.post("/family",cors(corsOptions), family.create);

    // Find family(s) by a parameter
    app.get("/family",cors(corsOptions), family.find);

    // Update a family
    app.put("/family",cors(corsOptions), family.update);

    // Delete a family
    app.delete("/family",cors(corsOptions), family.delete);


    // ----------------------------------
    // group Table API
    // ----------------------------------

    //Create a new group
    app.post("/group",cors(corsOptions), group.create);

    // Find group(s) by a parameter
    app.get("/group",cors(corsOptions), group.find);

    // Update a group
    app.put("/group",cors(corsOptions), group.update);

    // Delete a group
    app.delete("/group",cors(corsOptions), group.delete);

    // ----------------------------------
    // group_person Table API
    // ----------------------------------

    //Create a new group_person
    app.post("/group_person",cors(corsOptions), group_person.create);

    // Find group_person(s) by a parameter
    app.get("/group_person",cors(corsOptions), group_person.find);

    // Delete a group_person
    app.delete("/group_person",cors(corsOptions), group_person.delete);

    // ----------------------------------
    // life_event Table API
    // ----------------------------------

    //Create a new life_event
    app.post("/life_event",cors(corsOptions), life_event.create);

    // Find life_event(s) by a parameter
    app.get("/life_event",cors(corsOptions), life_event.find);

    // Update a life_event
    app.put("/life_event",cors(corsOptions), life_event.update);

    // Delete a life_event
    app.delete("/life_event",cors(corsOptions), life_event.delete);

    // ----------------------------------
    // event Table API
    // ----------------------------------

    //Create a new event
    app.post("/event",cors(corsOptions), event.create);

    // Find event(s) by a parameter
    app.get("/event",cors(corsOptions), event.find);

    // Update a life_event
    app.put("/event",cors(corsOptions), event.update);

    // Delete a event
    app.delete("/event",cors(corsOptions), event.delete);

    // ----------------------------------
    // room Table API
    // ----------------------------------

    //Create a new room
    app.post("/room",cors(corsOptions), room.create);

    // Find room(s) by a parameter
    app.get("/room",cors(corsOptions), room.find);

    // Update a room
    app.put("/room",cors(corsOptions), room.update);

    // Delete a room
    app.delete("/room",cors(corsOptions), room.delete);

    // ----------------------------------
    // event_group Table API
    // ----------------------------------

    //Create a new event_group
    app.post("/event_group",cors(corsOptions), event_group.create);

    // Find event_group(s) by a parameter
    app.get("/event_group",cors(corsOptions), event_group.find);

    // Delete a event_group
    app.delete("/event_group",cors(corsOptions), event_group.delete);

    // ----------------------------------
    // attendee Table API
    // ----------------------------------

    //Create a new attendee
    app.post("/attendee",cors(corsOptions), attendee.create);

    // Find attendee(s) by a parameter
    app.get("/attendee",cors(corsOptions), attendee.find);

    // Delete a attendee
    app.delete("/attendee",cors(corsOptions), attendee.delete);

    // ----------------------------------
    // Relationship Table API
    // ----------------------------------

    //Create a new relationship
    app.post("/relationship",cors(corsOptions), relationship.create);

    // Find relationship(s) by a parameter
    app.get("/relationship",cors(corsOptions), relationship.find);

    // Update a relationship
    app.put("/relationship",cors(corsOptions), relationship.update);

    // Delete a relationship
    app.delete("/relationship",cors(corsOptions), relationship.delete);

    // ----------------------------------
    // Message Table API
    // ----------------------------------

    //Create a new message
    app.post("/message",cors(corsOptions), message.create);

    // Find message(s) by a parameter
    app.get("/message",cors(corsOptions), message.find);

    // Update a message
    app.put("/message",cors(corsOptions), message.update);

    // Delete a message
    app.delete("/message",cors(corsOptions), message.delete);

    // ----------------------------------
    // Person_Ministry Table API
    // ----------------------------------

    //Create a new person_ministry
    app.post("/person_ministry",cors(corsOptions), person_ministry.create);

    // Find person_ministry(s) by a parameter
    app.get("/person_ministry",cors(corsOptions), person_ministry.find);

    // Delete a person_ministry
    app.delete("/person_ministry",cors(corsOptions), person_ministry.delete);
    
    // ----------------------------------
    // Person_Involvement Table API
    // ----------------------------------

    //Create a new person_involvement
    app.post("/person_involvement",cors(corsOptions), person_involvement.create);

    // Find person_involvement(s) by a parameter
    app.get("/person_involvement",cors(corsOptions), person_involvement.find);

    // Delete a person_involvement
    app.delete("/person_involvement",cors(corsOptions), person_involvement.delete);
  
    // ----------------------------------
    // Person_Hobby Table API
    // ----------------------------------

    //Create a new person_hobby
    app.post("/person_hobby",cors(corsOptions), person_hobby.create);

    // Find person_hobby(s) by a parameter
    app.get("/person_hobby",cors(corsOptions), person_hobby.find);

    // Delete a person_hobby
    app.delete("/person_hobby",cors(corsOptions), person_hobby.delete);

    // ----------------------------------
    // Upload Table API
    // ----------------------------------

    app.post("/upload",cors(corsOptions), upload.uploadImage);

    // ----------------------------------
    // Document Table API
    // ----------------------------------

    // Create a new document
    app.post("/document",cors(corsOptions), document.uploadDocument);

    // Delete a document
    app.delete("/document",cors(corsOptions), document.deleteDocument);

    // ----------------------------------
    // Person_Doc Table API
    // ----------------------------------

    // Find person_doc(s) by a parameter
    app.get("/person_doc",cors(corsOptions), person_doc.find);

    // Update a person_doc
    app.put("/person_doc",cors(corsOptions), person_doc.update);

    // ----------------------------------
    // Family_Doc Table API
    // ----------------------------------

    // Find family_doc(s) by a parameter
    app.get("/family_doc",cors(corsOptions), family_doc.find);

    // Update a family_doc
    app.put("/family_doc",cors(corsOptions), family_doc.update);
};
