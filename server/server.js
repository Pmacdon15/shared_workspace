const express = require("express");
const app = express();
const path = require("path");


app.use(express.json());
app.use(express.urlencoded({ extended: true }))

pp.post("/login", async (req, res) => {
    const { email, password } = req.body;
