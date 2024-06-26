import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography, Button, TextField } from '@mui/material';



const ProductDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();         
    const [productDetails, setProductDetails] = useState(null);
    const [quantity, setQuantity] = useState(1);       //min quantity is 1
    const handlePlaceOrder = () => {
        navigate('/create-order', { state: { productId: id, quantity } });
      };

useEffect(() => {
    if (id) {
        axios.get(`http://localhost:3001/api/v1/products/${id}`)
            .then(response => {
                setProductDetails(response.data);
            })
            .catch(error => {
                console.error('Error fetching product details:', error); //error handling
            });
    } else {
        console.log("Product ID is undefined.");
    }
}, [id]);

    if (!productDetails) {
        return <Typography>Product details not available</Typography>;       
    }

    return (
        <Box>
            {productDetails.imageURL ? (
                <Box
                    component="img"
                    sx={{
                        maxHeight: '300px',
                        maxWidth: '100%',
                        objectFit: 'contain',
                    }}
                    alt={productDetails.name}
                    src={productDetails.imageURL}
                />
            ) : (
                <Typography variant="body1" color="text.secondary">
                    Image not available
                </Typography>
            )}
            <Typography variant="h4" component="div">
                {productDetails.name}
            </Typography>
            <Typography variant="body1" component="div">
                Quantity:
            </Typography>
            <TextField
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                inputProps={{ min: "1", step: "1" }} // min order quantity
            />
            <Button variant="contained" color="primary" onClick={handlePlaceOrder}>
                Place Order
            </Button>
        </Box>
        
    );
};

export default ProductDetails;