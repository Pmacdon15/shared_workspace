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
  // All functions return null if there is an error. You can send error an message on the upper level
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

      console.log("Login successful from user: " + rows[0].email);

      return rows;
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  },
  //* testing
  // Get user by building id
  async getUserByBuildingId(id) {
    try {
      const [rows] = await pool.query(
        "SELECT * FROM users WHERE email = (SELECT user_email FROM buildings WHERE id = ?)",
        [id]
      );

      if (rows.length === 0) {
        throw new Error("User not found");
      }

      console.log("User found: " + rows[0].email);
      delete rows[0].password;

      return rows;
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  },

  //* end testing

  // * User Functions
  async getUserByEmail(email) {
    try {
      const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
        email,
      ]);

      if (rows.length === 0) {
        throw new Error("User not found");
      }

      console.log("User found" + rows[0].email);

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
      const [rows] = await pool.query("DELETE FROM users WHERE email = ?", [
        email,
      ]);

      console.log("User:", email, "deleted");

      // remove password from result
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
      const [rows] = await pool.query(
        "SELECT * FROM buildings WHERE name = ?",
        [name]
      );

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

      const building = await module.exports.getBuildingByName(name);
      console.log("Create building: ", name);

      return building;
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  },

  async updateBuildingByName(
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
        "UPDATE buildings SET street = ?, street_number = ?, city = ?, province = ?, postal_code = ?, location = ?, smoking = ?, parking = ?, public_transport = ? WHERE name = ?",
        [
          street,
          street_number,
          city,
          province,
          postal_code,
          location,
          smoking,
          parking,
          public_transport,
          name,
        ]
      );

      if (rows.affectedRows === 0) {
        throw new Error("Building does not exist");
      }

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

      console.log("Workspaces found");

      return rows;
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  },

  async getWorkspaceByName(name) {
    try {
      const [rows] = await pool.query(
        "SELECT * FROM workspaces WHERE name = ?",
        [name]
      );

      if (rows.length === 0) {
        throw new Error("Workspace not found");
      }

      console.log(name + " found");

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

      console.log("Workspaces from building:", building_name, "found");
      const user_email = await pool.query(
        "SELECT user_email FROM buildings WHERE name = ?",
        [building_name]
      );

      rows.map((row) => {
        row.user_email = user_email[0][0].user_email;
        return row;
      });

      return rows;
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  },
  
  async getWorkspaceByName(name) {
    try {
      const [rows] = await pool.query(
        "SELECT * FROM workspaces WHERE name = ?",
        [name]
      );
      const buildingName = await pool.query(
        "SELECT name FROM buildings WHERE id = (SELECT buildings_id FROM workspaces WHERE name = ?)",
        [name]
      );

      if (rows.length === 0) {
        throw new Error("Workspace not found");
      }

      rows[0].building_name = buildingName[0][0].name;
      console.log(name + " found");

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
        [
          name,
          building_name,
          number_of_seats,
          price,
          lease_term,
          available,
          size,
          type,
        ]
      );
  
      if (rows.affectedRows === 0) {
        throw new Error("Workspace not created");
      }
  
      const workspace = await module.exports.getWorkspaceByName(name);
      console.log("Create workspace result:", name);
  
      return workspace;
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  },

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

      const workspace = await module.exports.getWorkspaceByName(name);

      return workspace;
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  },

  async deleteWorkspaceByName(name) {
    try {
      console.log("Delete workspace: ", name);
      const workspace = await module.exports.getWorkspaceByName(name);
      const [rows] = await pool.query("DELETE FROM workspaces WHERE name = ?", [
        name,
      ]);

      if (rows.affectedRows === 0) {
        throw new Error("Workspace does not exist");
      }

      return workspace;
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  },
};
