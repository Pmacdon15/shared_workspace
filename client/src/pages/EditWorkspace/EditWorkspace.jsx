import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
//import InputLabel from "@mui/material/InputLabel";
import axios from "axios";



const EditWorkspace = () => {
    const [available, setAvailable] = useState(false);
    


    return (
        <div>
            <h1>Edit Workspace</h1>
        </div>
    )
}

export default EditWorkspace