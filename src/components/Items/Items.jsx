import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { useLocation, useNavigate } from 'react-router-dom';

import Item from './Item/Item';
import useStyles from './styles';

const Items = ({ onAddToCart }) => {
  const classes = useStyles();
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const fetchMenu = (id) => {
    const body = {
      "restaurantId":id
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
      console.log(data);
      setProducts(data.allItems);
    }).catch((error) => {
      console.log("err: ", error);
    })
  }

  useEffect(() => {
    console.log('getting menu');
    console.log(location.state);
    if (location.state) {
      console.log('state not null')
      if (location.state.restaurantId) {
        fetchMenu(location.state.restaurantId);
        return;
      }
    }
    navigate('/', {replace: true});
  }, []);

  if (!products.length) return <p>Loading...</p>;

  try {
    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Grid container justify="center" spacing={4}>
          {products.map((product) => (
            <Grid key={product.itemId} item xs={12} sm={6} md={4} lg={3}>
              <Item product={product} onAddToCart={onAddToCart} />
            </Grid>
          ))}
        </Grid>
      </main>
    );
  } catch (err) {
    navigate('/', {replace: true});
  }
};

export default Items;

