const express = require("express");
const app = express();
const path = require("path");


app.use(express.json());
app.use(express.urlencoded({ extended: true }))

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
    getWorkspaceByName,
    createWorkspace,
    updateWorkspaceByName,
    deleteWorkspaceByName
} = require("./database");


pp.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.login(email, password);

