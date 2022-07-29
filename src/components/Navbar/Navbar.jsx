import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography, Button, Box } from '@material-ui/core';
import { ShoppingCart, AccountBox } from '@material-ui/icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import BasicPopover from './BasicPopover';

import useStyles from './styles';

const logo = "https://cdn.pixabay.com/photo/2016/12/26/17/28/spaghetti-1932466_1280.jpg";

const PrimarySearchAppBar = ({ user, loc, totalItems }) => {
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const classes = useStyles();
  const location = useLocation();
  const navigate = useNavigate();

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => setMobileMoreAnchorEl(null);

  const mobileMenuId = 'primary-search-account-menu-mobile';

  const renderMobileMenu = (
    <Menu anchorEl={mobileMoreAnchorEl} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} id={mobileMenuId} keepMounted transformOrigin={{ vertical: 'top', horizontal: 'right' }} open={isMobileMenuOpen} onClose={handleMobileMenuClose}>
      <MenuItem>
        <IconButton component={Link} to="/cart" aria-label="Show cart items" color="inherit">
          <Badge badgeContent={totalItems} color="secondary">
            <ShoppingCart />
          </Badge>
        </IconButton>
        <p>Cart</p>
      </MenuItem>
    </Menu>
  );

  const loginButtonClick = () => {
    navigate('/login');
  }

  const renderButton = () => {
    if(user) {
      console.log('render user')
      return (
        <Button variant='outlined' startIcon={<AccountBox/>}>
          {user.name.split(' ')[0]}
        </Button>
      )
    } else {
      return (<Button variant='outlined' onClick={loginButtonClick}>Login/SignUp</Button>)
    }
  }

  return (
    <>
      <AppBar position="fixed" className={classes.appBar} color="inherit">
        <Toolbar>
          <Typography component={Link} to="/" variant="h6" className={classes.title} color="inherit">
            <img src={logo} alt="commerce.js" height="25px" className={classes.image} /> F-Delivery
          </Typography>
          <BasicPopover loc={loc}/>
          <div className={classes.grow} />
          {renderButton()}
          {(location.pathname === '/' || location.pathname === '/menu') && (
          <div className={classes.button}>
            <IconButton component={Link} to="/cart" aria-label="Show cart items" color="inherit">
              <Badge badgeContent={totalItems} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>
          </div>
          )}
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </>
  );
};

export default PrimarySearchAppBar;
