import React, { useEffect, useState, useRef } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import Button from "@mui/material/Button";

import "./CoworkersPage.css";

function CoworkersPage() {
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
        setWorkspaces(data); // Assuming the response is an array of workspaces
        boxRef.current.scrollTop = boxRef.current.scrollHeight; // Set the scroll position to the bottom
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
            overflowY: "scroll", // Add overflowY: scroll to enable scrolling
          }}
        >
          
            
              {workspaces.map((workspace) => (
                <div className="display-container">
                <Container maxWidth="md">
                <Box sx={{ bgcolor: '#cfe8fc' }} >
                  <h2>{workspace.name}</h2>
                  <TableContainer sx={{ width: 750 }} component={Paper}>
                    <Table
                      sx={{ minWidth: 250 }}
                      size="small"
                      aria-label="a dense table"
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell align="center">Number Of Seats</TableCell>
                          <TableCell align="center">Price</TableCell>
                          <TableCell align="center">Lease Term in Days</TableCell>
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
                          <TableCell align="center">{workspace.price}</TableCell>
                          <TableCell align="center">{workspace.lease_term}</TableCell>
                          <TableCell align="center">{workspace.available}</TableCell>
                          <TableCell align="center">{workspace.size}</TableCell>
                          <TableCell align="center">{workspace.type}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <div className="submit-container">
                    <Button type="submit" variant="contained">
                      Get Owner Info
                    </Button>
                  </div>
                  <pre>{JSON.stringify(workspace, null, 2)}</pre>
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
