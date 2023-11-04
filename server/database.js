const mysql = require("mysql2");
const dotenv = require("dotenv");
const path = require("path");
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
    console.log("Login result:", rows);
    return rows;
  } catch (error) {
    console.error("Error:", error);
  } finally {
    pool.end(); // Close the database connection when done
  }
}

// * User Functions
async function getUserByEmail(email) {
  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    console.log("Login result:", rows);
    return rows;
  } catch (error) {
    console.error("Error:", error);
  } finally {
    pool.end(); // Close the database connection when done
  }
}

async function createUser(email, first_name, password, owner) {
    try {
        const [rows] = await pool.query(
        "INSERT INTO users (email, first_name, password, owner) VALUES (?, ?, ?, ?)",
        [email, first_name, password, owner]
        );
        console.log("Create user result:", rows);
        return rows;
    } catch (error) {
        console.error("Error:", error);
    } finally {
        pool.end(); // Close the database connection when done
    }
}

async function deleteUserByEmail(email) {
    try {
        const [rows] = await pool.query("DELETE FROM users WHERE email = ?", [
        email,
        ]);
        console.log("Delete result:", rows);
        return rows;
    } catch (error) {
        console.error("Error:", error);
    } finally {
        pool.end(); // Close the database connection when done
    }
}

// * Building functions
async function getBuildingsByEmail(email) {
    try {
        const [rows] = await pool.query("SELECT * FROM buildings WHERE user_email = ?", [
            email,
        ]);
        console.log("Buildings result:", rows);
        return rows;
    } catch (error) {
        console.error("Error:", error);
    } finally {
        pool.end(); // Close the database connection when done
    }
}

async function createBuilding(email, name, street, street_number, city, province, postal_code, location, parking, public_transport) {
    try {
        const [rows] = await pool.query(
        "INSERT INTO buildings (user_email, name, street, street_number, city, province, postal_code, location, parking, public_transport) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [email, name, street, street_number, city, province, postal_code, location, parking, public_transport]
        );
        console.log("Create building result:", rows);
        return rows;
    } catch (error) {
        console.error("Error:", error);
    } finally {
        pool.end(); // Close the database connection when done
    }
}

async function deleteBuildingByName(name) {
    try {
        const [rows] = await pool.query("DELETE FROM buildings WHERE name = ?", [
        name,
        ]);
        console.log("Delete result:", rows);
        return rows;
    } catch (error) {
        console.error("Error:", error);
    } finally {
        pool.end(); // Close the database connection when done
    }
}

//login("user1@example.com", "password1");
//getUserByEmail("user1@example.com");
//createUser("pat@gmail.com", "bob","password1", 1 );
//deleteUserByEmail("pat@gmail.com");
//getBuildingsByEmail("user1@example.com");
//createBuilding("user1@example.com", "The Building", "St pats", "123","Toronto", "Ontario","M5V 2T6", "Down Town", 1,1);
deleteBuildingByName("The Building");