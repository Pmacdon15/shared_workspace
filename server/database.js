const mysql = require("mysql2");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

module.exports = {
// * Login function
async login(email, password) {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM users WHERE email = ? AND password = ?",
      [email, password]
    );
    if (rows.length === 0) {
      throw new Error("User and/or password incorrect");
    }
    // remove password from result
    delete rows[0].password;
    //console.log("Login result:", rows);
    console.log("Login successful"+ rows[0].email);
    return rows;
  } catch (error) {
    console.error("Error:", error);   
    return null; 
  }
},

// * User Functions
async getUserByEmail(email) {
  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (rows.length === 0) {
      throw new Error("User not found");
    }
    //console.log("User:", rows);
    console.log("User found"+ rows[0].email);
    return rows;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
},

async createUser(email, first_name, password, owner) {
  try {
    const [rows] = await pool.query(
      "INSERT INTO users (email, first_name, password, owner) VALUES (?, ?, ?, ?)",
      [email, first_name, password, owner]
    );
    // This function console logs the result of the query
    const user = await module.exports.getUserByEmail(email);
    delete rows[0].password;    
    
    console.log("Create user result:", email);

    return user;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
},

async deleteUserByEmail(email) {
  try {
    let user = await module.exports.getUserByEmail(email);

    if (user === null) {
      throw new Error("User does not exist");
    }    
    const [rows] = await pool.query("DELETE FROM users WHERE email = ?", [email]);  
    console.log("User:", email, "deleted");
    delete user[0].password;

    return user;
  } catch (error) {
    console.error("Error:", error);   
    return null; 
  } 
},

// * Building functions
async getBuildingsByEmail(email) {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM buildings WHERE user_email = ?",
      [email]
    );
    if (rows.length === 0) {
      throw new Error("Building not found");
    }
    console.log("Buildings from email:", email, "found");
    return rows;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
},

async getBuildingByName(name) {
  try {    
    const [rows] = await pool.query("SELECT * FROM buildings WHERE name = ?", [
      name,
    ]);

    if (rows.length === 0) {
      throw new Error("Building not found");
    }
    console.log("Building named:", name, "found");
    return rows;
  } catch (error) {
    console.error("Error:", error);
    return null;    
  } 
},

async createBuilding(
  email,
  name,
  street,
  street_number,
  city,
  province,
  postal_code,
  location,
  smoking,
  parking,
  public_transport
) {
  try {
    const [rows] = await pool.query(
      "INSERT INTO buildings (user_email, name, street, street_number, city, province, postal_code, location, smoking, parking, public_transport) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        email,
        name,
        street,
        street_number,
        city,
        province,
        postal_code,
        location,
        smoking,
        parking,
        public_transport,
      ]
    );
    if (rows.affectedRows === 0) {
      throw new Error("Building does not exist");
    }
    const building = await module.exports.getBuildingByName(name)
    console.log("Create building: ", name)
    
    // You can return a success message or the newly created building data here
    return building;
  } catch (error) {
    console.error("Error:", error);
    // In case of an error, you can return an error message or null
    return null;
  }
},

//createBuilding("user2@example.com", "The Building1", "St pats", "123","Toronto", "Ontario","M5V 2T6", "Down Town", 1,1);

async updateBuildingByName(
  name,
  street,
  street_number,
  city,
  province,
  postal_code,
  location,
  parking,
  public_transport
) {
  try {
    const [rows] = await pool.query(
      "UPDATE buildings SET street = ?, street_number = ?, city = ?, province = ?, postal_code = ?, location = ?, parking = ?, public_transport = ? WHERE name = ?",
      [
        street,
        street_number,
        city,
        province,
        postal_code,
        location,
        parking,
        public_transport,
        name,
      ]
    );
    if (rows.affectedRows === 0) {
      throw new Error("Building does not exist");
    }
    //console.log("Update building result:", rows);
    const building = await module.exports.getBuildingByName(name);
    return building;
  } catch (error) {
    console.error("Error:", error);
    return null;
  } 
},

async deleteBuildingByName(name) {
  try {
    const building = await module.exports.getBuildingByName(name);
    const [rows] = await pool.query("DELETE FROM buildings WHERE name = ?", [
      name,
    ]);

    if (rows.affectedRows === 0) {
      throw new Error("Building does not exist");
    }
    console.log("Building:", name, "deleted");
    return building;
  } catch (error) {
    console.error("Error:", error);
    return null;
  } 
},

async getWorkspaces() {
  try {   
    const [rows] = await pool.query("SELECT * FROM workspaces");
    if (rows.length === 0) {
      throw new Error("Workspace not found");
    }
    //console.log("Workspace result:", rows);
    console.log("Workspaces found");
    return rows;
  }
  catch (error) {
    console.error("Error:", error);
    return null;
  }
},

async getWorkSpaceByName(name) {
  try {
    const [rows] = await pool.query("SELECT * FROM workspaces WHERE name = ?", [
      name,
    ]);
    if (rows.length === 0) {
      throw new Error("Workspace not found");
    }
    //console.log("Workspace result:", rows);
    console.log(name," found");
    return rows;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
},

async getWorkspaceByName(name) {
  try {
    const [rows] = await pool.query("SELECT * FROM workspaces WHERE name = ?", [
      name,
    ]);
    if (rows.length === 0) {
      throw new Error("Workspace not found");
    }
    console.log(name + " found")
    return rows;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
},

async getWorkspacesByBuildingName(building_name) {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM workspaces WHERE buildings_id = (SELECT id FROM buildings WHERE name = ?)",
      [building_name]
    );
    if (rows.length === 0) {
      throw new Error("Workspace not found");
    }
    console.log("Workspaces from building:", building_name, "found")
    return rows;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
},

async createWorkspace(
  name,
  building_name,  
  number_of_seats,
  price,
  lease_term,
  available,
  size,
  type
) {
  try {
    const [rows] = await pool.query(
      "INSERT INTO workspaces (name, buildings_id, number_of_seats, price, lease_term, available, size, type) VALUES (?, (SELECT id FROM buildings WHERE name = ?), ?, ?, ?, ?, ?, ?)",
      [name, building_name, number_of_seats, price, lease_term, available, size, type]
    );
    if (rows.affectedRows === 0) {
      throw new Error("Workspace not created");
    }
    const workspace = await module.exports.getWorkspaceByName(name);
    console.log("Create workspace result:", name);
    return workspace;
  }
  catch (error) {
    console.error("Error:", error);
    return null;
  }
},  
//createWorkspace(1, "Workspace6901", 1, 1, 1, 1, 1, "Office");

async updateWorkspaceByName(
  name,
  number_of_seats,
  price,
  lease_term,
  available,
  size,
  type
) {
  try {
    const [rows] = await pool.query(
      "UPDATE workspaces SET number_of_seats = ?, price = ?, lease_term = ?, available = ?, size = ?, type = ? WHERE name = ?",
      [number_of_seats, price, lease_term, available, size, type, name]
    );
    if (rows.affectedRows === 0) {
      throw new Error("Workspace does not exist");
    }
    //console.log("Update workspace result:", rows);
    const workspace = await getWorkspaceByName(name);
    return workspace;
  } catch (error) {
    console.error("Error:", error);
  }
},
//updateWorkspaceByName("Workspace6901", 69, 7.99, 2, 0, 2, "Office");

async  deleteWorkspaceByName(name) {
  try {
    const workspace = await getWorkspaceByName(name);
    const [rows] = await pool.query("DELETE FROM workspaces WHERE name = ?", [
      name,
    ]);
    if (rows.affectedRows === 0) {
      throw new Error("Workspace does not exist");
    }
    console.log("Workspace:", name, "deleted");
    return workspace;
  } catch (error) {
    console.error("Error:", error);
  }
}
//deleteWorkspaceByName("Workspace6901");
};