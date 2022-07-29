import React, { useState, useEffect } from 'react'
import { CssBaseline } from '@material-ui/core';
import { BrowserRouter as Router, Routes as Switch, Route } from 'react-router-dom';

import { Products, Navbar, LandingPage, Login, AdminPage, RestaurantPage, Cart, Items } from './components';

const App = () => {
  const [user, setUser] = useState();
  const [location, setLocation] = useState({latitude:12, longitude: 12});
  const [cart, setCart] = useState([]);

  const handleUpdateCartQty = (itemId, quantity) => {
    if (quantity == 0) {
      handleRemoveFromCart(itemId);
      return;
    }
    var existingCart = JSON.parse(localStorage.getItem('cart'));
    var i = existingCart.length;
    while(i--){
      if( existingCart[i] 
          && existingCart[i]['id'] === itemId ) { 

          existingCart[i]['quantity'] = quantity;

      }
   }
    localStorage.setItem('cart', JSON.stringify(existingCart));
    setCart(existingCart);
  };

  const handleRemoveFromCart = (itemId) => {
    console.log('remove from cart for ', itemId);
    var existingCart = JSON.parse(localStorage.getItem('cart'));
    var i = existingCart.length;
    while(i--){
       if( existingCart[i] 
           && existingCart[i]['id'] === itemId ) { 

           existingCart.splice(i,1);

       }
    }
    localStorage.setItem('cart', JSON.stringify(existingCart))
    setCart(existingCart);
  };

  const handleEmptyCart = () => {
    localStorage.removeItem('cart');
    setCart({});
  };

  const handleAddToCart = (productId, product, quantity) => {
    var restaurant = localStorage.getItem('restaurantId');
    console.log('adding to cart');
    var existingCart = JSON.parse(localStorage.getItem('cart'));
    if (existingCart == null) existingCart = [];
    existingCart.push({'id': productId, 'item': product,'quantity': quantity});
    localStorage.setItem('cart', JSON.stringify(existingCart));
    setCart(existingCart);
  };

  const fetchCart = () => {
    setCart(JSON.parse(localStorage.getItem('cart')));
  }


  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }

    const savedLocation = localStorage.getItem('location');
    if (savedLocation) {
      const loc = JSON.parse(savedLocation);
      setLocation(loc);
    }

    fetchCart();
  }, []);

  const getCartSize = () => {
    if (!cart) return 0;
    return cart.length;
  }

  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <CssBaseline />
        <Navbar user={user} loc={location} totalItems={getCartSize()} />
        <Switch>
          <Route exact path="/" element={<Products />} />
          <Route exact path="/login" element={<Login /> } />
          <Route exact path='/menu' element={<Items onAddToCart={handleAddToCart}/>} />
          <Route exact path="/cart" element={<Cart cart={cart} onUpdateCartQty={handleUpdateCartQty} onRemoveFromCart={handleRemoveFromCart} onEmptyCart={handleEmptyCart} />} />
          <Route path="/checkout" exact element={<></>} />
        </Switch>
      </div>
    </Router>
  )
}

export default App