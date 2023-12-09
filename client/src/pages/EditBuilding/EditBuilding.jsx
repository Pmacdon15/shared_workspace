import React, { useState, useEffect } from "react";
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

const EditBuilding = () => {
  const [buildingToEdit, setBuildingToEdit] = useState({});
  const [smokingChecked, setSmokingChecked] = useState(false);
  const [parkingChecked, setParkingChecked] = useState(false);
  const [public_transportChecked, setPublic_transportChecked] = useState(false);

  useEffect(() => {
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

  //---------test-----------------
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);

  const handleInputChange = (event) => {
    const { value } = event.target;
    const numericValue = value.replace(/[^0-9]/g, "");
    setValue(numericValue);
    setError(value !== numericValue);
  };

  //------------------------------
  const { register, handleSubmit, reset } = useForm(); // Initialize useForm
  const navigate = useNavigate();

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

  const onSubmit = async (data) => {
    try {
      // Update the smoking and parking properties in the data object
      data.smoking = smokingChecked ? 1 : 0;
      data.parking = parkingChecked ? 1 : 0;
      data.public_transport = public_transportChecked ? 1 : 0;

      const formData = updateFormData(data, buildingToEdit);

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
                <TextField
                  sx={{ width: "80%" }}
                  {...register("street")}
                  label={buildingToEdit[0]?.street}
                  defaultValue={buildingToEdit[0]?.street}
                  variant="outlined"
                />
                <TextField
                  sx={{ width: "80%" }}
                  {...register("street_number")}
                  label={buildingToEdit[0]?.street_number}
                  defaultValue={buildingToEdit[0]?.street_number}
                  variant="outlined"
                  value={value}
                  onChange={handleInputChange}
                  error={error}
                  helperText={error ? "Please enter numbers only" : ""}
                />
                <TextField
                  sx={{ width: "80%" }}
                  {...register("city")}
                  label={buildingToEdit[0]?.city}
                  defaultValue={buildingToEdit[0]?.city}
                  variant="outlined"
                />
                <TextField
                  sx={{ width: "80%" }}
                  {...register("province")}
                  label={buildingToEdit[0]?.province}
                  defaultValue={buildingToEdit[0]?.province}
                  variant="outlined"
                />
                <TextField
                  sx={{ width: "80%" }}
                  {...register("postal_code")}
                  label={buildingToEdit[0]?.postal_code}
                  defaultValue={buildingToEdit[0]?.postal_code}
                  variant="outlined"
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
