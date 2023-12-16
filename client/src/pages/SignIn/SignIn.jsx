import * as React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"; // Import useForm hook
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import axios from "axios";

// import "./SignIn.css";

const SignIn = () => {
  document.title = "Sign In";
  const { register, handleSubmit, reset } = useForm(); // Initialize useForm
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:5544/login", data);

      //console.log("Response from the server:", response.data);

      if (response.status === 200) {
        //console.log("Login successful. User data:", response.data);

        // Check if the user is an owner based on the server response
        if (response.data[0].owner === 1 ) {
          // User is an owner, handle accordingly (redirect or other actions)
          console.log("User is an owner");
          
          navigate("/ownerspage/" + response.data[0].email);
        } else {
          // User is not an owner, redirect to CoworkersPage
          console.log("User is not an owner. Redirecting to CoworkersPage.");
          navigate("/coworkerspage");
        }

        reset(); // Reset the form
      }
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
            height: "60vh",
            margin: "10%",
            marginTop: "20%",
            borderRadius: "9px",
          }}
        >
          <div className="header">
            <div className="text">Sign In</div>
            <div className="underline"></div>
          </div>
          <br></br>
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
            <div className="register">              
              Don't have an account? <span>Click Here!</span>
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
