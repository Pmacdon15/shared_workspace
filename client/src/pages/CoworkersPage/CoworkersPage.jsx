import React, { useEffect, useState, useRef } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

import TextField from "@mui/material/TextField";

import { useForm } from "react-hook-form";

import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";

import Button from "@mui/material/Button";

import { Link } from "react-router-dom";

// import "./CoworkersPage.css";

function CoworkersPage() {
  const { register, handleSubmit, setValue } = useForm();
  const [workspaces, setWorkspaces] = useState([]);
  const boxRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5544/workspaces");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setWorkspaces(data);
        boxRef.current.scrollTop = 0; // Set the scroll position to the top
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // The empty dependency array ensures that the effect runs only once on mount

  return (
    <React.Fragment>
      <CssBaseline />
      <Container fixed>
        <Box
          ref={boxRef} // Get a reference to the Box element
          sx={{
            bgcolor: "#cfe8fc",
            height: "90vh",
            marginTop: " 3%",
            borderRadius: "9px",
            padding: "1%",
            overflowY: "scroll",
            // overflowX: "scroll",
          }}
        >
          <div className="navButtons">
            <TextField
              sx={{ width: "30%" }}
              {...register("search")}
              label="Search"
              variant="outlined"
            />
            <Button variant="contained">Search</Button>
          </div>
          {workspaces.map((workspace) => (
            <div key={workspace.id} className="display-container">
              <Container maxWidth="md">
                <Box
                  sx={{
                    bgcolor: "#90caf9",
                    borderRadius: "9px",
                    paddingBottom: "1%",
                    paddingLeft: "1%",
                  }}
                >
                  <h2>{workspace.name}</h2>
                  <TableContainer
                    component={Paper}
                    sx={{
                      // maxHeight: "70vh", // Set a maximum height for the table
                      overflowY: "auto", // Enable scrolling for the table if needed
                      maxWidth: 710,
                    }}
                  >
                    <Table
                      sx={{ minWidth: 650 }}
                      size="small"
                      aria-label="a dense table"
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell align="center">Number Of Seats</TableCell>
                          <TableCell align="center">Price</TableCell>
                          <TableCell align="center">Lease Term(Days)</TableCell>
                          <TableCell align="center">Available</TableCell>
                          <TableCell align="center">Size(Sqr Feet):</TableCell>
                          <TableCell align="center">Type</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell align="center" component="th" scope="row">
                            {workspace.number_of_seats}
                          </TableCell>
                          <TableCell align="center">
                            ${workspace.price}
                          </TableCell>
                          <TableCell align="center">
                            {workspace.lease_term}
                          </TableCell>
                          <TableCell align="center">
                            {workspace.available === 1 ? "Yes" : "No"}
                          </TableCell>
                          <TableCell align="center">{workspace.size}</TableCell>
                          <TableCell align="center">{workspace.type}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <div className="options-container">
                    <Link
                      to={`/ownerInfo/${workspace.buildings_id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Button variant="contained">Get Owner Info</Button>
                    </Link>
                    <Button variant="contained">Book</Button>
                  </div>
                </Box>
              </Container>
            </div>
          ))}
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default CoworkersPage;
