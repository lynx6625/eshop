import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Stack } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import Navbar from '../Navbar/Navbar';
import { useState } from 'react';
import axios from 'axios';
import Alert from '@mui/material/Alert';
// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();
const baseURL = "http://localhost:3001/api/v1/auth";
export default function Login() {
  const navigate = useNavigate();
  //states for input fields
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [alert, setAlert] = useState({ open: false, message: '', severity: 'info' });  //initializing setAlert
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
 
  const handleSubmit = async (event) => {
    event.preventDefault();
    const emailval = email;
    const pwval = password;
    if (
      email === "" ||
      password === ""
    ) {
      console.error("All fields are required.");
      setAlert({ open: true, message: "All fields are required.", severity: 'warning' });
      return;
    }
    console.log(emailval, pwval);
    const res= await axios.post(baseURL,JSON.stringify( { //sending the axios request
      email: emailval,
      password: pwval,
    }), {
      headers: { "Content-Type": "application/json" },
    }).then((res) => {
      console.log(res);
      navigate("/Login");
      setAlert({ open: true, message: "Signup successful!", severity: 'success' });
    }).catch((error) => {
      console.error("Signup error:", error);
      setAlert({ open: true, message: `Signup failed: ${error.message}`, severity: 'error' });
    });
  };


  return (
    
    <ThemeProvider theme={defaultTheme}>
      <Navbar/>    
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          {alert.open && (         //alert from material ui
            <Stack sx={{ width: '100%', mt: 2 }} spacing={2}>
              <Alert severity={alert.severity} onClose={() => setAlert({ ...alert, open: false })}>
                {alert.message}
              </Alert>
            </Stack>
          )}
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={handleEmail}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handlePassword}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            
            <Grid container>
              <Grid item onClick={() => {navigate('/Signup')}}>
                  {"Don't have an account? Sign Up"}
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}