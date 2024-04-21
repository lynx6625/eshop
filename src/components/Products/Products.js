import React from "react";
import Navbar from "../Navbar/Navbar";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useAuth } from "../../common/AuthContext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Typography } from "@mui/material";
import Box from '@mui/material/Box';
import { AppBar, Card, CardContent, Button, Grid } from '@mui/material';
import axios from 'axios';
import { styled } from '@mui/system';

const Products = () => {
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [sortOrder, setSortOrder] = useState('default');

    const handleBuyClick = (productId) => {       //if use clicks buy button
      navigate(`/product-details/${productId}`);
  };


    useEffect(() => {
        if (!isLoggedIn){            //if use isn't logged in, redirect to login
            navigate("/login");
        } else {        //making axios request to get catgeories and products
          const fetchCategories = async () => {
            try {
              const response = await axios.get('http://localhost:3001/api/v1/products/categories');
              setCategories(response.data);
            } catch (error) {
              console.error('Error fetching categories:', error);
            }
          };
    
          // Function to fetch products
          const fetchProducts = async () => {
            try {
              const response = await axios.get('http://localhost:3001/api/v1/products');
              setProducts(response.data);
            } catch (error) {
              console.error('Error fetching products:', error);
            }
          };
    
          // Calling both fetch functions
          fetchCategories();
          fetchProducts();
        }
      }, [isLoggedIn, navigate]);


      //code for sorting products
      const sortProducts = (products, order) => {
        switch (order) {
          case 'price-high-low':
            return [...products].sort((a, b) => b.price - a.price);
          case 'price-low-high':
            return [...products].sort((a, b) => a.price - b.price);
          case 'newest':
            return [...products].sort((a, b) => new Date(b.added) - new Date(a.added));
          default:
            return products;
        }
      };

      const filteredProducts = selectedCategory
      ? products.filter((product) => product.category === selectedCategory)
      : products;
  
      const sortedProducts = sortProducts(filteredProducts, sortOrder);

      const CategoryToggleButton = styled(ToggleButton)({
        '&.Mui-selected, &.Mui-selected:hover': {
          backgroundColor: '#dedede',
          color: 'black'
        },
        '&:hover': {
          backgroundColor: '#f5f5f5',
        }
      });
      
      const SortButton = styled(Button)({
        margin: '0 8px',
      });
      const ProductsGrid = styled(Grid)({
        marginTop: '20px',
      });
      const StyledAppBar = styled(AppBar)({
        background: 'white', 
        color: 'black',
      });


      return (
        <>
          <Navbar />
          <Box sx={{ flexGrow: 1 }}>
      <StyledAppBar position="static">
        <Box sx={{ display: 'flex', alignItems: 'center', padding: '8px' }}>
          {/* Label for the product categories */}
          <Typography variant="h6" component="div" sx={{ marginRight: '16px' }}>
            Categories:
          </Typography>
          <ToggleButtonGroup
            value={selectedCategory}
            exclusive
            onChange={(event, newCategory) => setSelectedCategory(newCategory)}
            aria-label="product categories"
          >
                {categories.map((category) => (
                  <CategoryToggleButton key={category} value={category} aria-label={category}>
                    {category}
                  </CategoryToggleButton>
                ))}
              </ToggleButtonGroup>
              </Box>
            </StyledAppBar>
            <Box sx={{ padding: '8px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', backgroundColor: '#eeeeee' }}>
        <Typography variant="h6" component="div" sx={{ marginRight: '16px' }}>
          Sort By:
        </Typography>
            <Box>
              <SortButton variant="outlined" onClick={() => setSortOrder('default')}>Default</SortButton>
              <SortButton variant="outlined" onClick={() => setSortOrder('price-low-high')}>Price Low to High</SortButton>
              <SortButton variant="outlined" onClick={() => setSortOrder('price-high-low')}>Price High to Low</SortButton>
              <SortButton variant="outlined" onClick={() => setSortOrder('newest')}>Newest</SortButton>
            </Box>
            </Box>
            <ProductsGrid container spacing={2}>
  {sortedProducts.map((product) => (
    <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
      <Card>
        <CardContent>
          {product.imageURL && (
            <Box
              component="img"
              sx={{
                height: 140,
                width: '100%',
                objectFit: 'cover',
              }}
              alt={product.name}
              src={product.imageURL}
            />
          )}
          <Typography variant="h5" component="div">
            {product.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {product.manufacturer}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.description}
          </Typography>
          <Typography variant="body1" component="div">
            {`$${product.price.toFixed(2)}`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Available Items: {product.availableItems}
          </Typography>
          <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={() => handleBuyClick(product._id) }
                >                  
                  Buy
                </Button>
        </CardContent>
      </Card>
    </Grid>
  ))}
</ProductsGrid>

          </Box>
        </>
      );
    };

export default Products;