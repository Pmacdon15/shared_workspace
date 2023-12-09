import React, { useState } from "react"; // Import useState hook
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";

const AddBuilding = () => {
  document.title = 'Add Building';
  const { register, handleSubmit } = useForm(); // Initialize useForm
  const navigate = useNavigate();

  const renderCheckbox = (label) => {
    const labelWithOutUnderScore = label.replace("_", " ");
    return (
      <div>        
        <label>{labelWithOutUnderScore}</label>
        <Checkbox
          {...register(label.toLowerCase())}          
          sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
        />
      </div>
    );
  };

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
  

  const onSubmit = async (data) => {
    try {  
      // If there are null values in the form data, return and do not submit the form
      if (Object.values(data).includes("")) {
        console.log("Please fill out all the fields");
        alert("Please fill out all the fields");
        return;
      }
      
      if (postalCodeError) {
        console.log("Invalid postal code");
        return;
      }
      const user_email = window.location.pathname.split("/").pop();
      console.log("User Email: ", user_email);

      const response = await axios.post(
        `http://localhost:5544/building/${user_email}`,
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
            <div className="text">Add Building information</div>
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
              <TextField
                  sx={{ width: "80%" }}
                  {...register("name")}
                  label="Building Name"
                  variant="outlined"
                />
                <TextField
                  sx={{ width: "80%" }}
                  {...register("street")}
                  label="Street"
                  variant="outlined"
                />
                <TextField
                  sx={{ width: "80%" }}
                  {...register("street_number")}
                  label="Street Number"
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
                <TextField
                  sx={{ width: "80%" }}
                  {...register("city")}
                  label="City"
                  variant="outlined"
                />
                <TextField
                  sx={{ width: "80%" }}
                  {...register("province")}
                  label="Province"
                  variant="outlined"
                />
                <TextField
                  sx={{ width: "80%" }}
                  {...register("postal_code")}
                  label="Postal Code"
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
                  label="Location"
                  variant="outlined"
                />
                <div className="checkbox-container">
                  {renderCheckbox("Smoking")}
                  {renderCheckbox("Parking")}
                  {renderCheckbox("Public_Transport")}
                </div>
                <div className="submit-container">
                  <Button type="submit" variant="contained">
                    Add Building
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

export default AddBuilding;
