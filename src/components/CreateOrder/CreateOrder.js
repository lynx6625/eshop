import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Stepper, Step, StepLabel, Button, Typography } from '@mui/material';
import axios from 'axios';
import Address from '../Address/Address';


const steps = ['Select Address', 'Confirm Order'];

const CreateOrder = () => {
  const token = localStorage.getItem('token');
  console.log(token);
  const navigate = useNavigate();
  const { state } = useLocation();
  const [activeStep, setActiveStep] = useState(0);
  const [address, setAddress] = useState(null);

  const handleNext = () => {
    
    if (activeStep === 0 && address === null) {
      alert('Please select an address to proceed.');
      return;
    }
    let userID = localStorage.getItem('userId')
    if (activeStep === 1) {
      axios.post('http://localhost:3001/api/v1/orders', {
        product: state.productId,
        quantity: state.quantity,
        address: address._id,
        user:userID
      }, {
          headers: { 'x-auth-token': `${token}`,"Content-Type": "application/json" },
        }
      .then(res => {
        alert('Your order is confirmed.');
        navigate('/Products');
      })
      .catch(error => {
        alert('Error placing order: ' + error);
      }));
    }
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleAddressSelect = (selectedAddress) => {
    setAddress(selectedAddress);
  };

  return (
    <div>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === 0 && (
          <Address/>
        )}
        {activeStep === 1 && (
          <Typography component="div">Review your order and confirm.</Typography>
        )}
        <Button onClick={handleBack} disabled={activeStep === 0}>
          Back
        </Button>
        <Button variant="contained" color="primary" onClick={handleNext}>
          {activeStep === steps.length - 1 ? 'Place Order' : 'Next'}
        </Button>
      </div>
    </div>
  );
};

export default CreateOrder;
