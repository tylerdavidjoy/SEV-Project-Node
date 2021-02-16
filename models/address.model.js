const sql = require("./db.js");

// Constructor
const Address = function(address) {
    this.ID = address.ID;
    this.address = address.address;
    this.type = address.type;
}

Address.create = (address, person_ID, result) => {
    let addressPromise = new Promise(function(addressResolve, addressReject)
    {
        sql.query(`INSERT INTO church.address SET address = "${address.address}", type = "${address.type}"`, (err, res) => {
            if (err) {
                console.log("error: ", err);
                addressReject(err);
            } else {
                console.log("created address with id: ", res.insertId);
                addressResolve(res.insertId);
            }
        })

    })
    addressPromise.then(
        function(response) {
            if(person_ID != null)
            {
                sql.query(`INSERT INTO church.person_address SET person_ID = "${person_ID}", address_ID = "${response}"`, (err, res) => {
                    if(err) {
                        console.log("error: ", err);
                        result(err, null);
                    } else {
                        console.log("created person_address with person_ID: ", person_ID, " and address_ID: ", response);
                        result(null, address);
                    }
                })
            } else {
                result(null, address);
            }
        },
        function(error) {
            result(error, null);
        }
    )
}

Address.findAll = result => {
    sql.query("SELECT * FROM address", (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
        console.log("addresses: ", res);
        result(null, res);
    })
}

Address.findById = (id, result) => {
    sql.query(`SELECT * FROM address WHERE address.ID = "${id}"`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found address: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found address with the id
      result({ kind: "not_found" }, null);
    })
}

Address.findByPersonID = (person_ID, result) => {
    sql.query(`SELECT * FROM address WHERE address.ID IN (SELECT address_ID FROM person_address WHERE person_address.person_ID = "${person_ID}")`, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
    
        if (res.length) {
          console.log("found addresses: ", res);
          result(null, res);
          return;
        }
    
        // not found address with value_group
        result({ kind: "not_found" }, null);
    })
}


Address.updateById = (id, address, result) => {
    sql.query(`UPDATE address SET address = "${address.address}", type = "${address.type}" WHERE ID = "${id}"`,(err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
  
        if (res.affectedRows == 0) {
            // not found address with the id
            result({ kind: "not_found" }, null);
            return;
        }
        result(null, res);
        }
    );
}

Address.remove = (id, result) => {
    sql.query(`DELETE FROM address WHERE ID = "${id}"`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found address with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted address with id: ", id);
      result(null, res);
    });
  };

module.exports = Address;