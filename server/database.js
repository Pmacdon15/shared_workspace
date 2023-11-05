const mysql = require("mysql2");
const dotenv = require("dotenv");
const path = require("path");
const { get } = require("http");
//const { get } = require("http");

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

// * Login function
async function login(email, password) {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM users WHERE email = ? AND password = ?",
      [email, password]
    );
    if (rows.length === 0) {
      throw new Error("User and/or password incorrect");
    }
    console.log("Login result:", rows);
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}
//login("user2@example.com", "password");

// * User Functions
async function getUserByEmail(email) {
  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (rows.length === 0) {
      throw new Error("User not found");
    }
    console.log("Login result:", rows);
    return rows;
  } catch (error) {
    console.error("Error:", error);
  }
}
//getUserByEmail("user2@example.com");

async function createUser(email, first_name, password, owner) {
  try {
    const [rows] = await pool.query(
      "INSERT INTO users (email, first_name, password, owner) VALUES (?, ?, ?, ?)",
      [email, first_name, password, owner]
    );
    const user = await getUserByEmail(email);
    console.log("Create user result:", user);
    return user;
  } catch (error) {
    console.error("Error:", error);
  }
}
//createUser("pat4@gmail.com", "bob", "password1", 1);

async function deleteUserByEmail(email) {
  try {
    const [rows] = await pool.query("DELETE FROM users WHERE email = ?", [email]);
    if (rows.affectedRows === 0) {
      console.log("User does not exist");
      throw new Error("User does not exist");
    }
    console.log("User:", email, "deleted");
    return rows;
  } catch (error) {
    console.error("Error:", error);
  } finally {
    pool.end(); // Close the database connection when done
  }
}
//deleteUserByEmail("pat4@gmail.com");

// * Building functions
async function getBuildingsByEmail(email) {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM buildings WHERE user_email = ?",
      [email]
    );
    if (rows.length === 0) {
      throw new Error("Building not found");
    }
    console.log("Buildings result:", rows);
    return rows;
  } catch (error) {
    console.error("Error:", error);
  }
}
//getBuildingsByEmail("user2@example.com");

async function getBuildingByName(name) {
  try {    
    const [rows] = await pool.query("SELECT * FROM buildings WHERE name = ?", [
      name,
    ]);

    if (rows.length === 0) {
      throw new Error("Building not found");
    }
    console.log("Building result:", rows);
    return rows;
  } catch (error) {
    console.error("Error:", error);
    
  } 
}
//getBuildingByName("Building2");

async function createBuilding(
  email,
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
      "INSERT INTO buildings (user_email, name, street, street_number, city, province, postal_code, location, parking, public_transport) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        email,
        name,
        street,
        street_number,
        city,
        province,
        postal_code,
        location,
        parking,
        public_transport,
      ]
    );
    console.log("Create building result:", rows);
    const building = await getBuildingByName(name);
    return building;
  } catch (error) {
    console.error("Error:", error);
  } 
}
//createBuilding("user2@example.com", "The Building1", "St pats", "123","Toronto", "Ontario","M5V 2T6", "Down Town", 1,1);

async function updateBuildingByName(
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
    const building = await getBuildingByName(name);
    return building;
  } catch (error) {
    console.error("Error:", error);
  } 
}
//updateBuildingByName("Building2", "St pats", "124", "Hell Street", "New York aha", "Alberta", "M5V 2T6", 1, 1);

async function deleteBuildingByName(name) {
  try {
    const building = await getBuildingByName(name);
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
  } 
}
//deleteBuildingByName("Building2");

async function getWorkspacesByBuildingIdAndWorkspaceName(building_id, name) {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM workspaces WHERE buildings_id = ? AND name = ?",
      [building_id, name]
    );
    if (rows.length === 0) {
      throw new Error("Workspace not found");
    }
   
    console.log("Workspace result:", rows);
    return rows;
  } catch (error) {
    console.error("Error:", error);
  }
}
//getWorkspacesByBuildingIdAndWorkspaceName(3, "Workspace");

async function getWorkspacesByBuildingId(building_id) {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM workspaces WHERE buildings_id = ?",
      [building_id]
    );
    if (rows.length === 0) {
      throw new Error("Workspace not found");
    }
    console.log("Workspace result:", rows);
    return rows;
  } catch (error) {
    console.error("Error:", error);
  }
}
//getWorkspacesByBuildingId(0);

async function getWorkspaceByName(name) {
  try {
    const [rows] = await pool.query("SELECT * FROM workspaces WHERE name = ?", [
      name,
    ]);
    if (rows.length === 0) {
      throw new Error("Workspace not found");
    }
    console.log("Workspace result:", rows);
    return rows;
  } catch (error) {
    console.error("Error:", error);
  }
}
//getWorkspaceByName("Workspace");

async function createWorkspace(
  building_id,
  name,
  number_of_seats,
  price,
  lease_term,
  available,
  size,type
) {
  try {
    const [rows] = await pool.query(
      "INSERT INTO workspaces (buildings_id, name, number_of_seats, price, lease_term, available, size, type) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [building_id, name, number_of_seats, price, lease_term, available, size, type]
    );
    //console.log("Create workspace result:", rows);
    const workspace = await getWorkspaceByName(name);
    return workspace;
  } catch (error) {
    console.error("Error:", error);
  }
}
//createWorkspace(1, "Workspace6901", 1, 1, 1, 1, 1, "Office");

async function updateWorkspaceByName(
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
}
//updateWorkspaceByName("Workspace6901", 69, 7.99, 2, 0, 2, "Office");

async function deleteWorkspaceByName(name) {
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
deleteWorkspaceByName("Workspace6901");