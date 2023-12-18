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
  const [workspaceToEdit, setWorkspaceToEdit] = useState({});
  const [availableChecked, setAvailableChecked] = useState(false);

  useEffect(() => {
    document.title = "Edit Workspace";
    const fetchWorkspace = async () => {
      try {
        const workspace_name = window.location.pathname.split("/").pop();
        const res = await axios.get(
          `/localhost:5544/workspace/${workspace_name}`
        );
        if (!res.data.ok) {
          throw new Error("Workspace not found");
        }
        const workspace = await res.json();
        console.log(workspace);
        setWorkspaceToEdit(workspace);
        setAvailableChecked(!!workspace[0]?.available||false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchWorkspace();
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
  } = useForm();
  
  const navigate = useNavigate();

  const [nameValue, setNameValue] = useState("");
  const [name_error, setNameError] = useState(false);

  const handleNameChange = (event) => {
    const { value } = event.target;
    setNameValue(value);
    setNameError(value.trim().length < 3);
  };

  useEffect(() => {
    // Set the value of the TextField
    setValue("name", nameValue);
  }, [nameValue, setValue]);

  const [numberOfSeatsValue, setNumberOfSeatsValue] = useState("");
  const [number_of_seats_error, setNumberOfSeatsError] = useState(false);

  const handleNumberOfSeatsChange = (event) => {
    const { value } = event.target;
    const numericValue = value.replace(/[^1-9]/g, "");
    setNumberOfSeatsValue(numericValue);
    setNumberOfSeatsError(value !== numericValue);
  };

  useEffect(() => {
    // Set the value of the TextField
    setValue("number_of_seats", numberOfSeatsValue);
  }, [numberOfSeatsValue, setValue]);

  const [priceValue, setPriceValue] = useState("");
  const [price_error, setPriceError] = useState(false);

  const handlePriceChange = (event) => {
    const { value } = event.target;
    const numericValue = value.replace(/[^1-9]/g, "");
    setPriceValue(numericValue);
    setPriceError(value !== numericValue);
  };

  useEffect(() => {
    // Set the value of the TextField
    setValue("price", priceValue);
  }, [priceValue, setValue]);

  const [leaseTermValue, setLeaseTermValue] = useState("");
  const [lease_term_error, setLeaseTermError] = useState(false);

  const handleLeaseTermChange = (event) => {
    const { value } = event.target;
    const numericValue = value.replace(/[^1-9]/g, "");
    setLeaseTermValue(numericValue);
    setLeaseTermError(value !== numericValue);
  };

  useEffect(() => {
    // Set the value of the TextField
    setValue("lease_term", leaseTermValue);
  }, [leaseTermValue, setValue]);

  // const [availableValue, setAvailableValue] = useState("");
  // const [available_error, setAvailableError] = useState(false);

  // Handle checkbox changes
  const handleCheckboxChange = (event, checkboxStateSetter) => {
    checkboxStateSetter(event.target.checked);
  };

  // Render a checkbox
  const renderCheckbox = (label, state, stateSetter) => {
    return (
      <div className="checkbox-container">
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
        "number_of_seats",
        "price",
        "lease_term",
        ]; 
        
        for (const fieldName of fieldsToUpdate) {
           if (!formData[fieldName]) {
              formData[fieldName] = workspaceToEdit[0]?.[fieldName] || "";
           }
        }

        return formData;
    }

    const onSubmit = async (data) => {
        try{
        data.available = availableChecked ? 1 : 0;

        updateFormData(data, workspaceToEdit);

        const workspace_name = window.location.pathname.split("/").pop();

        const res = await axios.put(
            `/localhost:5544/workspace/${workspaceToEdit[0]?.building_name}`,
        );
        if (res.status === 200) {
            location.reload(navigate(-1));
        }

        } catch (err) { 
            console.log(err);
        }
    };
  return (
    <div>
      <h1>Edit Workspace</h1>
    </div>
  );
};

export default EditWorkspace;
