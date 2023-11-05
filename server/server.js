const express = require("express");
const app = express();
const path = require("path");


const {
  login,
  getUserByEmail,
  createUser,
  deleteUserByEmail,
  getBuildingsByEmail,
  getBuildingByName,
  createBuilding,
  updateBuildingByName,
  deleteBuildingByName,
  getWorkspaces,
  getWorkspaceByName,
  getWorkspacesByBuildingNameAndWorkSpaceName,
  getWorkspacesByBuildingName,
  createWorkspace,
  updateWorkspaceByName,
  deleteWorkspaceByName,
} = require("./database");

// * Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//* Http requests
// Login
app.get("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await login(email, password);

  if (user === null) {
    res.status(400).send("Wrong email or password");
  } else {
    res.json(user);
}
});

// Get user by email
app.get("/users/:email", async (req, res) => {
  const { email } = req.params;
  const user = await getUserByEmail(email);

  if (user === null) {
    res.status(400).send("User not found");
  }  else {
    res.json(user);
}

});

// Create user
app.post("/users", async (req, res) => {
  const { email, first_name, password, owner } = req.body;
  const user = await createUser(email, first_name, password, owner);

  if (user === null) {
    res.status(400).send("User not created");
  } else {
    res.json(user);
  }
});

// Delete user by e mail
app.delete("/users/:email", async (req, res) => {
  const { email } = req.params;
  const user = await deleteUserByEmail(email);

  if (user === null) {
    res.status(400).send("User not found");
  } else {
    res.json(user);
}
});



app.listen(5544, () => {
  console.log("Server is listening on port 5544");
});


//createUser("pat12@gmail.com", "bob", "password1", 1);