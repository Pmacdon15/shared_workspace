import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
//import InputLabel from "@mui/material/InputLabel";
import axios from "axios";

import "./EditBuilding.css";

/**
 * EditBuilding component for editing building information.
 *
 * @returns {JSX.Element} The EditBuilding component.
 */
const EditBuilding = () => {
  const [buildingToEdit, setBuildingToEdit] = useState({});
  const [smokingChecked, setSmokingChecked] = useState(false);
  const [parkingChecked, setParkingChecked] = useState(false);
  const [public_transportChecked, setPublic_transportChecked] = useState(false);

  // Load the building data from the server when the page loads
  useEffect(() => {
    document.title = "Edit Building";
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
        console.log("Fetched Data:", JSON.stringify(data, null, 2));
        setBuildingToEdit(data);
        // The !! operator is used to convert the value to a boolean
        // This is witch craft but works
        setSmokingChecked(!!data[0]?.smoking || false);
        setParkingChecked(!!data[0]?.parking || false);
        setPublic_transportChecked(!!data[0]?.public_transport || false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // The following code is used to validate the postal code and street number fields
  const [numberValue, setNumberValue] = useState("");
  const [postalCodeValue, setPostalCodeValue] = useState("");
  const [numberError, setNumberError] = useState(false);
  const [postalCodeError, setPostalCodeError] = useState(false);

  const handleNumberInputChange = (event) => {
    const { value } = event.target;
    const numericValue = value.replace(/[^0-9]/g, "");
    setNumberValue(numericValue);
    setNumberError(value !== numericValue);
  };

  const handlePostalCodeInputChange = (event) => {
    const { value } = event.target;
    const postalCodeRegex = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
    setPostalCodeValue(value);
    setPostalCodeError(!postalCodeRegex.test(value));
  };

  // Initialize useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  // Handle checkbox changes
  const handleCheckboxChange = (event, checkboxStateSetter) => {
    checkboxStateSetter(event.target.checked);
  };

  // Render a checkbox
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

  // Update the form data with the building information if the user did not enter anything
  function updateFormData(formData, buildingToEdit) {
    const fieldsToUpdate = [
      { name: "street", defaultValue: buildingToEdit[0]?.street },
      { name: "street_number", defaultValue: buildingToEdit[0]?.street_number },
      { name: "city", defaultValue: buildingToEdit[0]?.city },
      { name: "province", defaultValue: buildingToEdit[0]?.province },
      { name: "postal_code", defaultValue: buildingToEdit[0]?.postal_code },
      { name: "location", defaultValue: buildingToEdit[0]?.location },
    ];

    for (const field of fieldsToUpdate) {
      if (formData[field.name] === "") {
        formData[field.name] = field.defaultValue;
      }
    }

    return formData;
  }

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      // Check if the postal code is valid and return if it is not
      if (postalCodeError) {
        console.log("Invalid postal code");
        return;
      }
      // Update the smoking and parking properties in the data object
      data.smoking = smokingChecked ? 1 : 0;
      data.parking = parkingChecked ? 1 : 0;
      data.public_transport = public_transportChecked ? 1 : 0;

      updateFormData(data, buildingToEdit);

      const building_name = window.location.pathname.split("/").pop();
      console.log("Building name:", building_name);

      const response = await axios.put(
        `http://localhost:5544/building/${building_name}`,
        data
      );
      //console.log("Response from the server:", response.data);

      if (response.status === 200) {
        // If the building was successfully updated, redirect to the building page
        const user_email = response.data[0].user_email;
        navigate(`/ownerspage/${user_email}`);
      }
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
          <Container maxWidth="md">
            <Box
              sx={{
                bgcolor: "#90caf9",
                borderRadius: "9px",
                paddingTop: "1px",
              }}
            >
              <form onSubmit={handleSubmit(onSubmit)} className="custom-form">
                <div className="textField-box">
                  <label className="label-width">
                    {buildingToEdit[0]?.street}
                  </label>
                  <TextField
                    sx={{ width: "90%" }}
                    {...register("street", {
                      validate: (value) => {
                        const trimmedValue = value.trim();
                        // If the value is not empty and not at least 3 characters, show an error
                        if (trimmedValue !== "" && trimmedValue.length < 3) {
                          return "Street must be 0 or at least 3 characters";
                        }
                        return true;
                      },
                    })}
                    label="Street"
                    variant="outlined"
                    error={errors.street !== undefined}
                    helperText={errors.street?.message || ""}
                  />
                </div>
                <div className="textField-box">
                  <label className="label-width">
                    {buildingToEdit[0]?.street_number}
                  </label>
                  <TextField
                    sx={{ width: "90%" }}
                    {...register("street_number")}
                    label="Street Number"
                    defaultValue={buildingToEdit[0]?.street_number}
                    variant="outlined"
                    value={numberValue}
                    onChange={handleNumberInputChange}
                    error={numberError}
                    helperText={numberError ? "Please enter numbers only" : ""}
                    inputProps={{
                      inputMode: "numeric",
                      pattern: "[0-9]*",
                      title: "Please enter numbers only",
                    }}
                  />
                </div>
                <div className="textField-box">
                  <label className="label-width">{buildingToEdit[0]?.city}</label>
                  <TextField
                    sx={{ width: "90%" }}
                    {...register("city", {
                      validate: (value) => {
                        const trimmedValue = value.trim();
                        // If the value is not empty and not at least 3 characters, show an error
                        if (trimmedValue !== "" && trimmedValue.length < 3) {
                          return "City must be 0 or at least 3 characters";
                        }
                        return true;
                      },
                    })}
                    label="City"
                    // defaultValue={buildingToEdit[0]?.city}
                    variant="outlined"
                    error={errors.city !== undefined}
                    helperText={errors.city?.message || ""}                    
                  />
                </div>
                <div className="textField-box">
                  <label className="label-width">{buildingToEdit[0]?.province}</label>
                  <TextField
                    sx={{ width: "90%" }}
                    {...register("province", {
                      validate: (value) => {
                        const trimmedValue = value.trim();
                        // If the value is not empty and not at least 2 characters, show an error
                        if (trimmedValue !== "" && trimmedValue.length < 2) {
                          return "Province must be 0 or at least 2 characters";
                        }
                        return true;
                      },
                    })}
                    label="Province"
                    variant="outlined"
                    error={errors.province !== undefined}
                    helperText={errors.province?.message || ""}
                  />
                </div>
                <TextField
                  sx={{ width: "80%" }}
                  {...register("postal_code")}
                  label={buildingToEdit[0]?.postal_code}
                  defaultValue={buildingToEdit[0]?.postal_code}
                  variant="outlined"
                  value={postalCodeValue}
                  onChange={handlePostalCodeInputChange}
                  error={postalCodeError}
                  helperText={
                    postalCodeError ? "Please enter a valid postal code" : ""
                  }
                  inputProps={{
                    pattern: "^[A-Za-z]\\d[A-Za-z][ -]?\\d[A-Za-z]\\d$",
                    title: "Please enter a valid postal code",
                  }}
                />
                <TextField
                  sx={{ width: "80%" }}
                  {...register("location")}
                  label={buildingToEdit[0]?.location}
                  defaultValue={buildingToEdit[0]?.location}
                  variant="outlined"
                />
                <div className="checkbox-container">
                  {renderCheckbox("Smoking", smokingChecked, setSmokingChecked)}
                  {renderCheckbox("Parking", parkingChecked, setParkingChecked)}
                  {renderCheckbox(
                    "Public Transport",
                    public_transportChecked,
                    setPublic_transportChecked
                  )}
                </div>
                <div className="submit-container">
                  <Button type="submit" variant="contained">
                    Edit Building
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

export default EditBuilding;
