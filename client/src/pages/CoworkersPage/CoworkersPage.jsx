import React, { useEffect, useState, useRef } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

function CoworkersPage() {
  const [workspaces, setWorkspaces] = useState([]);
  const boxRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5544/workspaces');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setWorkspaces(data); // Assuming the response is an array of workspaces
        boxRef.current.scrollTop = boxRef.current.scrollHeight; // Set the scroll position to the bottom
      } catch (error) {
        console.error('Error fetching data:', error);
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
            overflowY: "scroll" // Add overflowY: scroll to enable scrolling
          }}
        >
          {workspaces.map((workspace) => (
            <div key={workspace.id}>
              <pre>{JSON.stringify(workspace, null, 2)}</pre>
            </div>
          ))}
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default CoworkersPage;
