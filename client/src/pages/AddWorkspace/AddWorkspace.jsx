import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";

import api_config from "../../Components/config.js";

const AddWorkspace = () => {
  document.title = "Add Workspace";
  const [availableChecked, setAvailableChecked] = useState(false);

  const { register, handleSubmit, setValue } = useForm();

  const navigate = useNavigate();

  const [nameValue, setNameValue] = useState("");
  const [name_error, setNameError] = useState(false);

  const handleNameChange = (event) => {
    const { value } = event.target;
    setNameValue(value);
    setNameError(value.trim().length < 3);
  };

  useEffect(() => {
    // Set the value of the TextField
    setValue("name", nameValue);
  }, [nameValue, setValue]);

  const [numberOfSeatsValue, setNumberOfSeatsValue] = useState("");
  const [number_of_seats_error, setNumberOfSeatsError] = useState(false);

  const handleNumberOfSeatsChange = (event) => {
    const { value } = event.target;
    const numericValue = value.replace(/[^0-9]/g, "");
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
    const numericValue = value.replace(/[^0-9]/g, "");
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
    const numericValue = value.replace(/[^0-9]/g, "");
    setLeaseTermValue(numericValue);
    setLeaseTermError(value !== numericValue);
  };

  useEffect(() => {
    // Set the value of the TextField
    setValue("lease_term", leaseTermValue);
  }, [leaseTermValue, setValue]);

  // const [availableValue, setAvailableValue] = useState("");
  // const [available_error, setAvailableError] = useState(false);

  // Handle checkbox changes
  const handleCheckboxChange = (event, checkboxStateSetter) => {
    checkboxStateSetter(event.target.checked);
  };

  const renderCheckbox = (label, state, stateSetter) => {
    return (
      <div className="checkbox-container">
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

  const [sizeValue, setSizeValue] = useState("");
  const [size_error, setSizeError] = useState(false);

  const handleSizeChange = (event) => {
    const { value } = event.target;
    const numericValue = value.replace(/[^0-9]/g, "");
    setSizeValue(numericValue);
    setSizeError(value !== numericValue);
  };

  useEffect(() => {
    // Set the value of the TextField
    setValue("size", sizeValue);
  }, [sizeValue, setValue]);

  const [typeValue, setTypeValue] = useState("");
  const [type_error, setTypeError] = useState(false);

  const handleTypeChange = (event) => {
    const { value } = event.target;
    setTypeValue(value);
    setTypeError(value.trim().length < 3);
  };

  const onSubmit = async (data) => {
    try {
      for (const key in data) {
        if (data[key] === "") {
          alert("Please fill out all fields before submitting.");
          return;
        }
      }
      data.available = availableChecked ? 1 : 0;

      const building_name = window.location.pathname.split("/")[2];
      console.log(building_name);
      console.log(data);
      const response = await axios.post(
        `${api_config.API_HOST}:5544/workspace/${building_name}`,
        data
      );

      if (response.status === 200) {
        // alert("Workspace added successfully!");
        navigate(`/workspaces/${building_name}`);
      }
    } catch (err) {
      console.error(err.message);
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
                paddingBottom: "1%",
              }}
            >
              <form onSubmit={handleSubmit(onSubmit)} className="custom-form">
                <TextField
                  sx={{ width: "90%" }}
                  {...register("name")}
                  label="Workspace Name"
                  variant="outlined"
                  value={nameValue}
                  onChange={handleNameChange}
                  error={name_error}
                  helperText={
                    name_error ? "Please enter at least 3 characters" : ""
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
                      ? "Please enter a number"
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
                    price_error ? "Please enter a number" : ""
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
                      ? "Please enter a number"
                      : ""
                  }
                />
                <div className="checkbox-container">
                  {renderCheckbox(
                    "Available",
                    availableChecked,
                    setAvailableChecked
                  )}
                </div>

                <TextField
                  sx={{ width: "90%" }}
                  {...register("size")}
                  label="Square Footage"
                  variant="outlined"
                  value={sizeValue}
                  onChange={handleSizeChange}
                  error={size_error}
                  helperText={
                    size_error ? "Please enter a number" : ""
                  }
                />
                <TextField
                  sx={{ width: "90%" }}
                  {...register("type")}
                  label="Type"
                  variant="outlined"
                  value={typeValue}
                  onChange={handleTypeChange}
                  error={type_error}
                  helperText={
                    type_error ? "Please enter at least 3 characters" : ""
                  }
                />
                <div className="submit-container">
                  <Button type="submit" variant="contained">
                    Add Workspace
                  </Button>
                  <Button variant="contained" onClick={() => navigate(-1)}>
                    Back
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
