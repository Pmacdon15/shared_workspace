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
    const numericValue = value.replace(/[^0-9]/g, "");
    setNumberOfSeatsValue("number_of_seats", numericValue);
    setNumberOfSeatsError(numericValue.length === 0);
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
              <form
                // onSubmit={handleSubmit(onSubmit)}
                className="custom-form"
              ></form>
            </Box>
          </Container>
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default AddWorkspace;
