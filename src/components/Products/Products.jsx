import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { useLocation, useNavigate } from 'react-router-dom';

import Product from './Product/Product';
import useStyles from './styles';

const Products = ({ }) => {
  const classes = useStyles();
  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const fetchProducts = async (loc) => {
    const body = {
        "latitude":loc.latitude,
        "longitude":loc.longitude,
        "token": "c6aab68b-cf01-45e0-9141-01ba8244caf5",
        "email":"atiff@gmail.com"
    }
    fetch('https://fooddelivery-app-1.herokuapp.com/getFeed', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    }).then((response) => response.json())
    .then((data) => {
      setProducts(data.listOfRestaurant)
      setLoading(false);
    }).catch((error) => {
      console.log("err: ", error);
    })
  }

  useEffect(() => {
    let savedLoc = JSON.parse(localStorage.getItem('location'));
    if (!savedLoc) {
      navigate('/', {replace: true});
    }
    if (location.pathname === '/menu') {
      console.log('getting menu')
      console.log(this.props.location.state.resatrauntId);
    } else {
      console.log('fetching products');
      fetchProducts(savedLoc);
    }
  }, []);

  if (isLoading) {
    console.log('isLoading...');
    return (
      <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
        <div justifyContent="center">
          <h2>Loading...</h2>
        </div>
      </div>
    )
  } else {
    if (!products.length) {
      return (
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
          <div justifyContent="center">
            <h2>No Restaurants Found.</h2>
          </div>
        </div>
      );
    }

    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Grid container justify="center" spacing={4}>
          {products.map((product) => (
            <Grid key={product.restaurantId} item xs={12} sm={6} md={4} lg={3}>
              <Product product={product} />
            </Grid>
          ))}
        </Grid>
      </main>
    );
  }

};

export default Products;

