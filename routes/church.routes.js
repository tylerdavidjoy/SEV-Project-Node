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
    const person_involvement = require("../controllers/person_involvement.controller.js");
    const person_hobby = require("../controllers/person_hobby.controller.js");

    // ----------------------------------
    // valid_value Table API
    // ----------------------------------

    //Create a new valid_value
    app.post("/valid_value", valid_value.create);

    // Find valid_value(s) by a parameter
    app.get("/valid_value", valid_value.find);

    // Update a valid_value
    app.put("/valid_value", valid_value.update);

    // Delete a valid_value
    app.delete("/valid_value", valid_value.delete);


    // ----------------------------------
    // congregation Table API
    // ----------------------------------

    //Create a new congregation
    app.post("/congregation", congregation.create);

    // Find congregation(s) by a parameter
    app.get("/congregation", congregation.find);

    // Update a congregation
    app.put("/congregation", congregation.update);

    // Delete a congregation
    app.delete("/congregation", congregation.delete);

    
    // ----------------------------------
    // phone_number Table API
    // ----------------------------------

    //Create a new phone_number
    app.post("/phone_number", phone_number.create);

    // Find phone_number(s) by a parameter
    app.get("/phone_number", phone_number.find);

    // Update a phone_number
    app.put("/phone_number", phone_number.update);

    // Delete a phone_number
    app.delete("/phone_number", phone_number.delete);

    
    // ----------------------------------
    // person_number Table API
    // ----------------------------------

    //Create a new person_number
    app.post("/person_number", person_number.create);

    // Find person_number(s) by a parameter
    app.get("/person_number", person_number.find);

    // Update a person_number
    app.put("/person_number", person_number.update);

    // Delete a person_number
    app.delete("/person_number", person_number.delete);

    // ----------------------------------
    // address Table API
    // ----------------------------------

    // Create a new address
    app.post("/address", address.create);

    // Find address(s) by a parameter
    app.get("/address", address.find);

    // Update a address
    app.put("/address", address.update);

    // Delete a address
    app.delete("/address", address.delete);

    // ----------------------------------
    // person_address Table API
    // ----------------------------------

    // Create a new person_address
    app.post("/person_address", person_address.create);

    // Find person_address(s) by a parameter
    app.get("/person_address", person_address.find);

    // Delete a address
    app.delete("/person_address", person_address.delete);

    // ----------------------------------
    // person Table API
    // ----------------------------------

    //Create a new person
    app.post("/person", person.create);

    // Find person(s) by a parameter
    app.get("/person", person.find);

    // Update a person
    app.put("/person", person.update);

    // Delete a person
    app.delete("/person", person.delete);

    // ----------------------------------
    // family Table API
    // ----------------------------------

    //Create a new family
    app.post("/family", family.create);

    // Find family(s) by a parameter
    app.get("/family", family.find);

    // Update a family
    app.put("/family", family.update);

    // Delete a family
    app.delete("/family", family.delete);


    // ----------------------------------
    // group Table API
    // ----------------------------------

    //Create a new group
    app.post("/group", group.create);

    // Find group(s) by a parameter
    app.get("/group", group.find);

    // Update a group
    app.put("/group", group.update);

    // Delete a group
    app.delete("/group", group.delete);

    // ----------------------------------
    // group_person Table API
    // ----------------------------------

    //Create a new group_person
    app.post("/group_person", group_person.create);

    // Find group_person(s) by a parameter
    app.get("/group_person", group_person.find);

    // Delete a group_person
    app.delete("/group_person", group_person.delete);

    // ----------------------------------
    // life_event Table API
    // ----------------------------------

    //Create a new life_event
    app.post("/life_event", life_event.create);

    // Find life_event(s) by a parameter
    app.get("/life_event", life_event.find);

    // Update a life_event
    app.put("/life_event", life_event.update);

    // Delete a life_event
    app.delete("/life_event", life_event.delete);

    // ----------------------------------
    // event Table API
    // ----------------------------------

    //Create a new event
    app.post("/event", event.create);

    // Find event(s) by a parameter
    app.get("/event", event.find);

    // Update a life_event
    app.put("/event", event.update);

    // Delete a event
    app.delete("/event", event.delete);

    // ----------------------------------
    // room Table API
    // ----------------------------------

    //Create a new room
    app.post("/room", room.create);

    // Find room(s) by a parameter
    app.get("/room", room.find);

    // Update a room
    app.put("/room", room.update);

    // Delete a room
    app.delete("/room", room.delete);

    // ----------------------------------
    // event_group Table API
    // ----------------------------------

    //Create a new event_group
    app.post("/event_group", event_group.create);

    // Find event_group(s) by a parameter
    app.get("/event_group", event_group.find);

    // Delete a event_group
    app.delete("/event_group", event_group.delete);

    // ----------------------------------
    // attendee Table API
    // ----------------------------------

    //Create a new attendee
    app.post("/attendee", attendee.create);

    // Find attendee(s) by a parameter
    app.get("/attendee", attendee.find);

    // Delete a attendee
    app.delete("/attendee", attendee.delete);

    // ----------------------------------
    // Relationship Table API
    // ----------------------------------

    //Create a new relationship
    app.post("/relationship", relationship.create);

    // Find relationship(s) by a parameter
    app.get("/relationship", relationship.find);

    // Update a relationship
    app.put("/relationship", relationship.update);

    // Delete a relationship
    app.delete("/relationship", relationship.delete);

    // ----------------------------------
    // Message Table API
    // ----------------------------------

    //Create a new message
    app.post("/message", message.create);

    // Find message(s) by a parameter
    app.get("/message", message.find);

    // Update a message
    app.put("/message", message.update);

    // Delete a message
    app.delete("/message", message.delete);

    // ----------------------------------
    // Person_Involvement Table API
    // ----------------------------------

    //Create a new person_involvement
    app.post("/person_involvement", person_involvement.create);

    // Find person_involvement(s) by a parameter
    app.get("/person_involvement", person_involvement.find);

    // Delete a person_involvement
    app.delete("/person_involvement", person_involvement.delete);
  
    // ----------------------------------
    // Person_Hobby Table API
    // ----------------------------------

    //Create a new person_hobby
    app.post("/person_hobby", person_hobby.create);

    // Find person_hobby(s) by a parameter
    app.get("/person_hobby", person_hobby.find);

    // Delete a person_hobby
    app.delete("/person_hobby", person_hobby.delete);
};