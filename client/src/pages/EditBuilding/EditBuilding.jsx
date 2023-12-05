// const EditBuilding = () => {
//     return (
//         <div>
//             <h1>Edit Building</h1>
//         </div>
//     )
// }

// export default EditBuilding

import * as React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"; // Import useForm hook
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import axios from "axios";

import "./EditBuilding.css";

const  EditBuilding = () => {
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
            />
            <TextField
              sx={{ width: "80%" }}
              {...register("street_number")}
              label="Street Number"
              variant="outlined"
              type="password"
            />
            <TextField
              sx={{ width: "80%" }}
              {...register("city")}
              label="City"
              variant="outlined"
              type="password"
            />
            <TextField
              sx={{ width: "80%" }}
              {...register("province")}
              label="Province"
              variant="outlined"
              type="password"
            />
            <TextField
              sx={{ width: "80%" }}
              {...register("postal_code")}
              label="Postal Code"
              variant="outlined"
              type="password"
            />
            <TextField
              sx={{ width: "80%" }}
              {...register("location")}
              label="Location"
              variant="outlined"
              type="password"
            />
            <TextField
              sx={{ width: "80%" }}
              {...register("smoking")}
              label="Smoking"
              variant="outlined"
              type="password"
            />
            <TextField
              sx={{ width: "80%" }}
              {...register("public_transport")}
              label="Public Transport"
              variant="outlined"
              type="password"
            />

            {/* <div className="forgot-password">
              Lost your password? <span>Click Here!</span>
            </div>
            <div className="register">
              Don't have an account? <span>Click Here!</span>
            </div> */}

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
