import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
// import InputLabel from "@mui/material/InputLabel";
import axios from "axios";

const AddBuilding = () => {
  // Initialize useForm
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const handleCheckboxChange = (event, checkboxStateSetter) => {
    checkboxStateSetter(event.target.checked);
  };

  const renderCheckbox = (label) => {
    return (
      <div>
        <label>{label}</label>
        <Checkbox
          {...register(label.toLowerCase())}
          //   checked={state}
          //   onChange={(event) => handleCheckboxChange(event, stateSetter)}
          sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
        />
      </div>
    );
  };

  const onSubmit = async (data) => {
    try {
      // Check for null values and return if any are found
      for (const [key, value] of Object.entries(data)) {
        if (value === "") {
          alert("Please fill in all fields");
          return;
        }
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
