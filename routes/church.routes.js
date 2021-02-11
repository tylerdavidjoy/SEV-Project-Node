module.exports = app => {
    const valid_value = require("../controllers/valid_value.controller.js");


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
};