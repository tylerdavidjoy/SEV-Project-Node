module.exports = app => {
    const valid_value = require("../controllers/valid_value.controller.js");
    const congregation = require("../controllers/congregation.controller.js");
    const phone_number = require("../controllers/phone_number.controller.js");
    const person_number = require("../controllers/person_number.controller.js");
    const address = require("../controllers/address.controller.js");
    const person_address = require("../controllers/person_address.controller.js");
    const person = require("../controllers/person.controller.js");
    const family = require("../controllers/family.controller.js");

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
    app.put("/person", family.update);

    // Delete a family
    app.delete("/family", family.delete);
};