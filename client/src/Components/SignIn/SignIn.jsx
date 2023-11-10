import * as React from "react";
import { useForm } from "react-hook-form"; // Import useForm hook
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import axios from "axios";

import "./SignIn.css";

const SignIn = () => {

  const { register, handleSubmit, reset } = useForm(); // Initialize useForm

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:5544/login", data); // Change this to POST

      console.log("Response from the server:", response.data);
      reset(); // Reset the form
    } catch (error) {
      console.error("Error while submitting the form:", error);
    }
  };
    return (
      <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box
          sx={{
            bgcolor: "#cfe8fc",
            height: "70vh",
            margin: "10%",
            borderRadius: "9px",
          }}
        >
          <div className="header">
            <div className="text">Sign In</div>
            <div className="underline"></div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="custom-form">
            <TextField
              sx={{ width: "80%" }}
              {...register("email")}
              label="Email"
              variant="outlined"
            />
            <TextField
              sx={{ width: "80%" }}
              {...register("password")}
              label="Password"
              variant="outlined"
              type="password"
            />

            <div className="forgot-password">
              Lost your password? <span>Click Here!</span>
            </div>

            <div className="submit-container">
              <Button type="submit" variant="contained">
                Sign In
              </Button>
            </div>
          </form>
        </Box>
      </Container>
    </React.Fragment>
    );
    };  

export default SignIn;