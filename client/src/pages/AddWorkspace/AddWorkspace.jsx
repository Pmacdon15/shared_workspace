import React, { useState, useEffect } from "react";
import { set, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
//import InputLabel from "@mui/material/InputLabel";
import axios from "axios";

// import "./AddWorkspace.css";

const AddWorkspace = () => {
  document.title = "Add Workspace";
  const [availableChecked, setAvailableChecked] = useState(false);

  const { register, handleSubmit, setValue } = useForm();

  const navigate = useNavigate();

  const [numberOfSeatsValue, setNumberOfSeatsValue] = useState("");
  const [number_of_seats_error, setNumberOfSeatsError] = useState(false);

  const handleNumberOfSeatsChange = (event) => {
    const { value } = event.target;
    const numericValue = value.replace(/[^1-9]/g, "");
    setNumberOfSeatsValue(numericValue);
    setNumberOfSeatsError(value !== numericValue);
  };

  useEffect(() => {
    // Set the value of the TextField
    setValue("number_of_seats", numberOfSeatsValue);
  }, [numberOfSeatsValue, setValue]);

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
            <div className="text">Add Workspace</div>
            <div className="underline"></div>
          </div>
          <Container maxWidth="md">
            <Box
              sx={{
                bgcolor: "#90caf9",
                borderRadius: "9px",
                paddingTop: "1px",
              }}
            >
              <form
                // onSubmit={handleSubmit(onSubmit)}
                className="custom-form"
              >
                <TextField
                sx={{width: "90%"}}
                  {...register("number_of_seats")}
                  label="Number of Seats"
                  variant="outlined"
                  value={numberOfSeatsValue}
                  onChange={handleNumberOfSeatsChange}
                  error={number_of_seats_error}
                  helperText={
                    number_of_seats_error ? "Please enter a number starting from 1" : ""
                  }
                />
              </form>
            </Box>
          </Container>
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default AddWorkspace;
