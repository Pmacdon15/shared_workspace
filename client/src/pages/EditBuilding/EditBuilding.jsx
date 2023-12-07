import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import axios from "axios";

const EditBuilding = () => {
  const [buildingToEdit, setBuildingToEdit] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const building_name = window.location.pathname.split("/").pop();
        const response = await fetch(
          `http://localhost:5544/building/${building_name}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        //console.log("Fetched Data:", JSON.stringify(data, null, 2));
        setBuildingToEdit(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const { register, handleSubmit, reset } = useForm(); // Initialize useForm
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:5544/login", data);

      //console.log("Response from the server:", response.data);

      //   if (response.status === 200) {
    } catch (error) {
      console.error("Error while submitting the form:", error);
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container fixed>
        <Box
          sx={{
            bgcolor: "#cfe8fc",
            height: "90vh",
            marginTop: " 3%",
            borderRadius: "9px",
            padding: "1%",
            overflowY: "scroll",
          }}
        >
          <div className="header">
            <div className="text">Edit Building information</div>
            <div className="underline"></div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="custom-form">
            <TextField
              sx={{ width: "80%" }}
              {...register("street")}
              label="Street"
              variant="outlined"
              value={buildingToEdit[0]?.street || ""} // Use optional chaining to prevent errors
            />

            <div className="submit-container">
              <Button type="submit" variant="contained">
                Edit Building
              </Button>
            </div>
          </form>
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default EditBuilding;
