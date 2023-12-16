import React, { useState, useEffect } from "react";
import { set, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";

// import "./AddWorkspace.css";

const AddWorkspace = () => {
  document.title = "Add Workspace";
  const [availableChecked, setAvailableChecked] = useState(false);

  const { register, handleSubmit, setValue } = useForm();

  const navigate = useNavigate();

  const [workspaceNameValue, setWorkspaceNameValue] = useState("");
  const [workspace_name_error, setWorkspaceNameError] = useState(false);

  const handleWorkspaceNameChange = (event) => {
    const { value } = event.target;
    setWorkspaceNameValue(value);
    setWorkspaceNameError(value.trim().length < 3);
  };

  useEffect(() => {
    // Set the value of the TextField
    setValue("workspace_name", workspaceNameValue);
  }, [workspaceNameValue, setValue]);

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

  const [priceValue, setPriceValue] = useState("");
  const [price_error, setPriceError] = useState(false);

  const handlePriceChange = (event) => {
    const { value } = event.target;
    const numericValue = value.replace(/[^1-9]/g, "");
    setPriceValue(numericValue);
    setPriceError(value !== numericValue);
  };

  useEffect(() => {
    // Set the value of the TextField
    setValue("price", priceValue);
  }, [priceValue, setValue]);

  const [leaseTermValue, setLeaseTermValue] = useState("");
  const [lease_term_error, setLeaseTermError] = useState(false);

  const handleLeaseTermChange = (event) => {
    const { value } = event.target;
    const numericValue = value.replace(/[^1-9]/g, "");
    setLeaseTermValue(numericValue);
    setLeaseTermError(value !== numericValue);
  };

  useEffect(() => {
    // Set the value of the TextField
    setValue("lease_term", leaseTermValue);
  }, [leaseTermValue, setValue]);

  const [availableValue, setAvailableValue] = useState("");
  const [available_error, setAvailableError] = useState(false);

  // Handle checkbox changes
  const handleCheckboxChange = (event, checkboxStateSetter) => {
    checkboxStateSetter(event.target.checked);
  };

  const renderCheckbox = (label, state, stateSetter) => {
    return (
      <div>
        <label>{label}</label>
        <Checkbox
          {...register(label.toLowerCase())}
          checked={state}
          onChange={(event) => handleCheckboxChange(event, stateSetter)}
          sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
        />
      </div>
    );
  };

  useEffect(() => {
    // Set the value of the TextField
    setValue("available", availableValue);
  }
  , [availableValue, setValue]);

  const [squareFootageValue, setSquareFootageValue] = useState("");
  const [square_footage_error, setSquareFootageError] = useState(false);

  const handleSquareFootageChange = (event) => {
    const { value } = event.target;
    const numericValue = value.replace(/[^1-9]/g, "");
    setSquareFootageValue(numericValue);
    setSquareFootageError(value !== numericValue);
  };

  useEffect(() => {
    // Set the value of the TextField
    setValue("square_footage", squareFootageValue);
  }
  , [squareFootageValue, setValue]);



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
            <br></br>
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
                  sx={{ width: "90%" }}
                  {...register("workspace_name")}
                  label="Workspace Name"
                  variant="outlined"
                  value={workspaceNameValue}
                  onChange={handleWorkspaceNameChange}
                  error={workspace_name_error}
                  helperText={
                    workspace_name_error
                      ? "Please enter at least 3 characters"
                      : ""
                  }
                />

                <TextField
                  sx={{ width: "90%" }}
                  {...register("number_of_seats")}
                  label="Number of Seats"
                  variant="outlined"
                  value={numberOfSeatsValue}
                  onChange={handleNumberOfSeatsChange}
                  error={number_of_seats_error}
                  helperText={
                    number_of_seats_error
                      ? "Please enter a number starting from 1"
                      : ""
                  }
                />
                <TextField
                  sx={{ width: "90%" }}
                  {...register("price")}
                  label="Price"
                  variant="outlined"
                  value={priceValue}
                  onChange={handlePriceChange}
                  error={price_error}
                  helperText={
                    price_error ? "Please enter a number starting from 0" : ""
                  }
                />
                <TextField
                  sx={{ width: "90%" }}
                  {...register("lease_term")}
                  label="Lease Term"
                  variant="outlined"
                  value={leaseTermValue}
                  onChange={handleLeaseTermChange}
                  error={lease_term_error}
                  helperText={
                    lease_term_error
                      ? "Please enter a number starting from 1"
                      : ""
                  }
                />
                <div className="checkbox-container">
                  {renderCheckbox("Available", availableChecked, setAvailableChecked)}
                </div>

                <TextField
                  sx={{ width: "90%" }}
                  {...register("square_footage")}
                  label="Square Footage"
                  variant="outlined"
                  value={squareFootageValue}
                  onChange={handleSquareFootageChange}
                  error={square_footage_error}
                  helperText={
                    square_footage_error
                      ? "Please enter a number starting from 1"
                      : ""
                  } 
                />


                <div className="submit-container">
                  <Button type="submit" variant="contained">
                    Add Workspace
                  </Button>
                </div>
              </form>
            </Box>
          </Container>
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default AddWorkspace;
