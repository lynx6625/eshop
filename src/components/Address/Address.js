import React, { useState } from 'react';
import { Button, TextField, Box, Typography } from '@mui/material';
import axios from 'axios';


const Address = ({ onSave }) => {
  const token = localStorage.getItem('token');
  console.log(token);
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [city, setCity] = useState('');
  const [landmark, setLandmark] = useState('');
  const [street, setStreet] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipcode] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();  // Stops the default form submission
    let fName = name;
    let contVal = contact;
    let cityVal = city;
    let lmVal = landmark;
    let streetVal = street;
    let stateVal = state;
    let zcVal = zipCode;
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You are not logged in. Please log in to add addresses.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:3001/api/v1/addresses', {
        name: fName,
        contact: contVal,
        city: cityVal,
        landmark: lmVal,
        street: streetVal,
        state: stateVal,
        zipCode: zcVal,
      },{
        headers: {
          'x-auth-token': '${token}' ,
          "content-type":"application/json",
        }});
      onSave(response.data);
  } catch (error) {
      console.error('Error adding address:', error);
      alert('Failed to add address: ' + error.response.data);
  }
};


  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <TextField
        required
        fullWidth
        label="Name"
        name="name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
        margin="normal"
      />
      <TextField
        required
        fullWidth
        label="Contact Number"
        name="contact"
        value={contact}
        margin="normal"
        onChange={(e) => {
          setContact(e.target.value);
        }}
      />
      <TextField
        required
        fullWidth
        label="City"
        name="city"
        value={city}
        onChange={(e) => {
          setCity(e.target.value);
        }}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Landmark"
        name="landmark"
        value={landmark}
        onChange={(e) => {
          setLandmark(e.target.value);
        }}
        margin="normal"
      />
      <TextField
        required
        fullWidth
        label="Street"
        name="street"
        value={street}
        onChange={(e) => {
          setStreet(e.target.value);
        }}
        margin="normal"
      />
      <TextField
        required
        fullWidth
        label="State"
        name="state"
        value={state}
        onChange={(e) => {
          setState(e.target.value);
        }}
        margin="normal"
      />
      <TextField
        required
        fullWidth
        label="Zip Code"
        name="zipCode"
        value={zipCode}
        onChange={(e) => {
          setZipcode(e.target.value);
        }}
        margin="normal"
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={handleSubmit}>
        Add Address
      </Button>
    </Box>
  );
};

export default Address;