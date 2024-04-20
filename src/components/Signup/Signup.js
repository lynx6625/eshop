import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import { useState } from "react";

const defaultTheme = createTheme();
const baseURL = "http://localhost:3001/api/v1/users"; //setting endpoint to what was give in backend index.js

export default function SignUp() {
  //Below are states for all input fields
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  
    //Below are handlers for input fields
    const handleFirstName = (e) => {
      setfirstName(e.target.value);
    };
    const handleLastName = (e) => {
      setlastName(e.target.value);
    };
    const handleEmail = (e) => {
      setEmail(e.target.value);
    };
    const handlePassword = (e) => {
      setPassword(e.target.value);
    };
    const handleContactNumber = (e) => {
      setContactNumber(e.target.value);
    };
  
  const navigate = useNavigate();


  const handleSubmit = async (event) => {
    event.preventDefault();
  //storing data in variables to send post request in axios
  // because backend cors config does not allow credentials 
  const fsval = firstName;
  const lsval = lastName;
  const emailval = email;
  const pwval = password;
  const cnval = contactNumber; 

  if (
    firstName === "" ||
    lastName === "" ||
    email === "" ||
    password === "" ||
    contactNumber === ""
  ) {
    console.error("All fields are required.");
    alert("All fields are required.");
    return;
  }

  if (contactNumber.length !== 10) {
    //Phone number should be 10 digits
    alert("Enter valid contact number");
    return;
  } 
  console.log(fsval,lsval,pwval, emailval,cnval);
  const res= await axios.post(baseURL,JSON.stringify( { //sending the axios request
    firstName: fsval,
    lastName: lsval,
    password: pwval,
    email: emailval,
    contactNumber: cnval,
  }), {
    headers: { "Content-Type": "application/json" },
  }).then((res) => {
    console.log(res);
    navigate("/Login");
  }).catch((error) => {
    console.error("Signup error:", error);
    alert(`Signup failed: ${error.message}`);
  });
};

    return (
      <ThemeProvider theme={defaultTheme}>
        <Navbar />
        <Container component="main" maxWidth="xs">
          <CssBaseline />

          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            noValidate
            autoComplete="off"
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    onChange={handleFirstName}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    onChange={handleLastName}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={handleEmail}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    onChange={handlePassword}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="contactNumber"
                    label="Contact Number"
                    type="tel"
                    id="contactNumber"
                    autoComplete="new-contactNumber"
                    onChange={handleContactNumber}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid
                  item
                  onClick={() => {
                    navigate("/Login");
                  }}
                >
                  Already have an account? Sign in
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    );
  }
