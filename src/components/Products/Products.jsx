import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { useLocation } from 'react-router-dom';

import Product from './Product/Product';
import useStyles from './styles';

const Products = ({ loc, onAddToCart }) => {
  const classes = useStyles();
  const [products, setProducts] = useState([]);
  const location = useLocation();

  const fetchProducts = async () => {
    const body = {
        "latitude":12.9,
        "longitude":77.6306,
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
    }).catch((error) => {
      console.log("err: ", error);
    })
  }

  const fetchMenu = () => {
    const body = {
      "restaurantId":1
    }
    fetch('https://fooddelivery-app-1.herokuapp.com/getItems', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    }).then((response) => response.json())
    .then((data) => {
      setProducts(data.listOfRestaurant)
    }).catch((error) => {
      console.log("err: ", error);
    })
  }

  useEffect(() => {
    if (location.pathname === '/menu') {
      console.log('getting menu')
      console.log(this.props.location.state.resatrauntId);
    } else {
      console.log('fetching products');
      fetchProducts();
    }
  }, []);

  if (!products.length) return <p>Loading...</p>;

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Grid container justify="center" spacing={4}>
        {products.map((product) => (
          <Grid key={product.restaurantId} item xs={12} sm={6} md={4} lg={3}>
            <Product product={product} onAddToCart={onAddToCart} />
          </Grid>
        ))}
      </Grid>
    </main>
  );
};

export default Products;

