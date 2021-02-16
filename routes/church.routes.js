module.exports = app => {
    const valid_value = require("../controllers/valid_value.controller.js");
    const congregation = require("../controllers/congregation.controller.js");
    const phone_number = require("../controllers/phone_number.controller.js");
    const person_number = require("../controllers/person_number.controller.js");
    const person = require("../controllers/person.controller.js");

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
    // person Table API
    // ----------------------------------

    //Create a new person
    app.post("/person", person.create);

    // Find person_number(s) by a parameter
    app.get("/person", person.find);

    // Update a person_number
    app.put("/person", person.update);

    // Delete a person_number
    app.delete("/person", person.delete);
};