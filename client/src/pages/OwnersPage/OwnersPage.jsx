import React, { useEffect, useState, useRef } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

const OwnersPage = () => {
  const [userBuildings, setUserBuildings] = useState([]);
  const boxRef = useRef(null);

  useEffect(() => {
    document.title = "Owner's Page";
    const fetchData = async () => {
      try {
        const userEmail = window.location.pathname.split("/").pop();
        console.log("user e mail: " + userEmail);
        const response = await fetch(
          `http://localhost:5544/buildings/${userEmail}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setUserBuildings(data);
        boxRef.current.scrollTop = 0; // Set the scroll position to the top
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []); 

  const handleDeleteBuilding = async (buildingName) => {
    try {
      const response = await fetch(
        `http://localhost:5544/building/${buildingName}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Update state to trigger re-render after successful deletion
      setUserBuildings((prevBuildings) =>
        prevBuildings.filter((building) => building.name !== buildingName)
      );
    } catch (error) {
      console.error("Error deleting building:", error);
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container fixed>
        <Box
          ref={boxRef}
          sx={{
            bgcolor: "#cfe8fc",
            height: "90vh",
            marginTop: " 3%",
            borderRadius: "9px",
            paddingTop: "1%",
            overflowY: "scroll",
          }}
        >
          <div className="navButtons">
            <Link
              to={`/addBuilding/${window.location.pathname.split("/").pop()}`}
              style={{ textDecoration: "none" }}
            >
              <Button variant="contained">Add Building</Button>
            </Link>
            <Link
              to={`/`}
              >
            <Button variant="contained">Logout</Button>
            </Link>
          </div>
          {userBuildings.map((building) => (
            // <div key={building.name} className="display-container">
              <Container maxWidth="md" key={building.name}>
                <Box
                  sx={{
                    bgcolor: "#90caf9",
                    borderRadius: "9px",
                    paddingBottom: "1%",
                    paddingLeft: "2%",
                  }}
                >
                  <h2>{building.name}</h2>
                  <TableContainer
                    component={Paper}
                    sx={{
                      overflowY: "auto",
                      maxWidth: 600,
                    }}
                  >
                    <Table
                      sx={{ minWidth: 600 }}
                      size="small"
                      aria-label="a dense table"
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell align="center">Street</TableCell>
                          <TableCell align="center">Street Number</TableCell>
                          <TableCell align="center">City</TableCell>
                          <TableCell align="center">Province</TableCell>
                          <TableCell align="center">Postal Code</TableCell>
                          <TableCell align="center">location</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell align="center" component="th" scope="row">
                            {building.street}
                          </TableCell>
                          <TableCell align="center">
                            {building.street_number}
                          </TableCell>
                          <TableCell align="center">{building.city}</TableCell>
                          <TableCell align="center">
                            {building.province}
                          </TableCell>
                          <TableCell align="center">
                            {building.postal_code}{" "}
                          </TableCell>
                          <TableCell align="center">
                            {building.location}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <TableContainer
                    component={Paper}
                    sx={{
                      marginTop: "1%",
                      overflowY: "auto",
                      maxWidth: 400,
                    }}
                  >
                    <Table
                      sx={{ minWidth: 400 }}
                      size="small"
                      aria-label="a dense table"
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell align="center">Smoking</TableCell>
                          <TableCell align="center">Parking</TableCell>
                          <TableCell align="center">Public Transport</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell align="center" component="th" scope="row">
                            {building.smoking === 1 ? "Yes" : "No"}
                          </TableCell>
                          <TableCell align="center">
                            {building.parking === 1 ? "Yes" : "No"}
                          </TableCell>
                          <TableCell align="center">
                            {building.public_transport === 1 ? "Yes" : "No"}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <div className="options-container">
                    <Link
                      to={`/editbuilding/${building.name}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Button variant="contained">Edit</Button>
                    </Link>
                    <Link
                      to={`/workspaces/${building.name}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Button variant="contained">View Workspaces</Button>
                    </Link>
                    <Button
                      variant="contained"
                      onClick={() => handleDeleteBuilding(building.name)}
                    >
                      Delete
                    </Button>
                  </div>
                </Box>
              </Container>
            // </div>
          ))}
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default OwnersPage;
