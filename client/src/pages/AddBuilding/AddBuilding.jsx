import React, { useState } from "react";
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
  document.title = "Add Building";
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

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
  
  const onSubmit = async (data) => {
    try {
      // If there are validation errors, the form won't submit
      if (
        errors.street_number ||
        errors.postal_code ||
        errors.name ||
        errors.street ||
        errors.city ||
        errors.province ||
        errors.location
      ) {
        console.log("Invalid Field");
        
        return;
      }

      const user_email = window.location.pathname.split("/").pop();
      console.log("User Email: ", user_email);

      const response = await axios.post(
        `http://localhost:5544/building/${user_email}`,
        data
      );

      if (response.status === 200) {
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
            marginTop: "3%",
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
                  {...register("name", {
                    required: "Building Name is required",
                    minLength: {
                      value: 3,
                      message: "Building Name must be at least 3 characters",
                    },
                  })}
                  label="Building Name"
                  variant="outlined"
                  error={errors.name !== undefined}
                  helperText={errors.name?.message || ""}
                />
                <TextField
                  sx={{ width: "80%" }}
                  {...register("street", {
                    required: "Street is required",
                    minLength: {
                      value: 3,
                      message: "Street must be at least 3 characters",
                    },
                  })}
                  label="Street"
                  variant="outlined"
                  error={errors.street !== undefined}
                  helperText={errors.street?.message || ""}
                />
                <TextField
                  sx={{ width: "80%" }}
                  {...register("street_number", {
                    required: "Street Number is required",
                    validate: (value) => {
                      const numericValue = value.replace(/[^0-9]/g, "");
                      if (value !== numericValue) {
                        return "Please enter numbers only";
                      }
                      return true;
                    },
                  })}
                  label="Street Number"
                  variant="outlined"
                  error={errors.street_number !== undefined}
                  helperText={errors.street_number?.message || ""}
                  inputProps={{
                    inputMode: "numeric",
                    pattern: "[0-9]*",
                    title: "Please enter numbers only",
                  }}
                />
                <TextField
                  sx={{ width: "80%" }}
                  {...register("city", {
                    required: "City is required",
                    minLength: {
                      value: 3,
                      message: "City must be at least 3 characters",
                    },
                  })}
                  label="City"
                  variant="outlined"
                  error={errors.city !== undefined}
                  helperText={errors.city?.message || ""}
                />
                <TextField
                  sx={{ width: "80%" }}
                  {...register("province", {
                    required: "Province is required",
                    minLength: {
                      value: 2,
                      message: "Province must be at least 3 characters",
                    },
                  })}
                  label="Province"
                  variant="outlined"
                  error={errors.province !== undefined}
                  helperText={errors.province?.message || ""}
                />
                <TextField
                  sx={{ width: "80%" }}
                  {...register("postal_code", {
                    required: "Postal Code is required",
                    pattern: {
                      value: /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/,
                      message: "Please enter a valid postal code",
                    },
                  })}
                  label="Postal Code"
                  variant="outlined"
                  error={errors.postal_code !== undefined}
                  helperText={errors.postal_code?.message || ""}
                  inputProps={{
                    pattern: "^[A-Za-z]\\d[A-Za-z][ -]?\\d[A-Za-z]\\d$",
                    title: "Please enter a valid postal code",
                  }}
                />
                <TextField
                  sx={{ width: "80%" }}
                  {...register("location", {
                    required: "Location is required",
                    minLength: {
                      value: 3,
                      message: "Location must be at least 3 characters",
                    },
                  })}
                  label="Location"
                  variant="outlined"
                  error={errors.location !== undefined}
                  helperText={errors.location?.message || ""}
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
