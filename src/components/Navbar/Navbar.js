import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import { useAuth } from '../../common/AuthContext';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));



export default function Navbar() {
  const navigate = useNavigate();
  const { isLoggedIn, logOut } = useAuth(); // Using Auth Context to see if logged in
  const isAdmin = localStorage.getItem('userRole') === 'ADMIN';
  const handleLogOut = () => {
    logOut();
    navigate("/Login");
  };

  return (
    
    <Box sx={{ flexGrow: 1 }}>
      
      <AppBar position="static" sx={{ bgcolor: "#3f51b5" }}>
        <Toolbar>
        <ShoppingCartIcon/>
        <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
           UPGRAD-eSHOP
          </Typography>
          {isLoggedIn ? (
            <>
             
          
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}></Box>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Button color="inherit"  onClick={handleLogOut}>
            Sign Out
          </Button>
          {isAdmin && (
          <Button color="inherit" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
            Add Products
          </Button>
            )}
              </>
          ) : (
            <>
          <Button color="inherit"
          sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          onClick={() => {navigate('/Login')}}>

            Login

          </Button>
          <Button color="inherit"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            onClick={() => {navigate('/Signup')}}>
            Sign Up

          </Button>
          </>
          )}
          
          

        </Toolbar>
      </AppBar>
    </Box>
  );
}

