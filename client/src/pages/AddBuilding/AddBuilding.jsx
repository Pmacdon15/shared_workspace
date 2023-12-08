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
  //   const [buildingToAdd, setBuildingToAdd] = useState({});
  //   const [smokingChecked, setSmokingChecked] = useState(false);
  //   const [parkingChecked, setParkingChecked] = useState(false);
  //   const [public_transportChecked, setPublic_transportChecked] = useState(false);

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         const building_name = window.location.pathname.split("/").pop();
  //         const response = await fetch(
  //           `http://localhost:5544/building/${building_name}`
  //         );
  //         if (!response.ok) {
  //           throw new Error("Network response was not ok");
  //         }
  //         const data = await response.json();
  //         console.log("Fetched Data:", JSON.stringify(data, null, 2));
  //         setBuildingToAdd(data);
  //         // The !! operator is used to convert the value to a boolean
  //         // This is witch craft but works
  //         setSmokingChecked(!!data[0]?.smoking || false);
  //         setParkingChecked(!!data[0]?.parking || false);
  //         setPublic_transportChecked(!!data[0]?.public_transport || false);
  //       } catch (error) {
  //         console.error("Error fetching data:", error);
  //       }
  //     };
  //     fetchData();
  //   }, []);

  const { register, handleSubmit } = useForm(); // Initialize useForm
  const navigate = useNavigate();

//   const handleCheckboxChange = (event, checkboxStateSetter) => {
//     checkboxStateSetter(event.target.checked);
//   };



  const renderCheckbox = (label) => {
    const labelWithOutUnderScore = label.replace("_", " ");
    return (
      <div>        
        <label>{labelWithOutUnderScore}</label>
        <Checkbox
          {...register(label.toLowerCase())}
          //   checked={state}
          //   onChange={(event) => handleCheckboxChange(event, stateSetter)}
          sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
        />
      </div>
    );
  };

  //   function updateFormData(formData, buildingToAdd) {
  //     const fieldsToUpdate = [
  //       { name: 'street', defaultValue: buildingToAdd[0]?.street },
  //       { name: 'street_number', defaultValue: buildingToAdd[0]?.street_number },
  //       { name: 'city', defaultValue: buildingToAdd[0]?.city },
  //       { name: 'province', defaultValue: buildingToAdd[0]?.province },
  //       { name: 'postal_code', defaultValue: buildingToAdd[0]?.postal_code },
  //       { name: 'location', defaultValue: buildingToAdd[0]?.location },
  //     ];

  //     for (const field of fieldsToUpdate) {
  //       if (formData[field.name] === '') {
  //         formData[field.name] = field.defaultValue;
  //       }
  //     }

  //     return formData;
  //   }

  const onSubmit = async (data) => {
    try {
      // Update the smoking and parking properties in the data object
      //   data.smoking = smokingChecked ? 1 : 0;
      //   data.parking = parkingChecked ? 1 : 0;
      //   data.public_transport = public_transportChecked ? 1 : 0;

      //const formData = updateFormData(data, buildingToAdd);

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
