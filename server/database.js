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

async function createUser(email, first_name, password) {
    try {
        const [rows] = await pool.query(
        "INSERT INTO users (email, first_name, password) VALUES (?, ?, ?)",
        [email, first_name, password]
        );
        console.log("Create user result:", rows);
        return rows;
    } catch (error) {
        console.error("Error:", error);
    } finally {
        pool.end(); // Close the database connection when done
    }
}


//login("user1@example.com", "password1");
//getUserByEmail("user1@example.com");
createUser("pat@gmail.com", "bob","password1");
