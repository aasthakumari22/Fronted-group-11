import React, { useEffect } from 'react';
import { Container, Typography, Button, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';

import CartItem from './CartItem/CartItem';
import useStyles from './styles';

const Cart = ({ cart, onUpdateCartQty, onRemoveFromCart, onEmptyCart }) => {
  const classes = useStyles();

  const handleEmptyCart = () => onEmptyCart();

  const getCartLength = () => {
    if (!cart) return 0;
    return cart.length;
  }

  useEffect(() => {
    console.log(cart.length);
  }, [])

  const renderEmptyCart = () => (
    <Typography variant="subtitle1">You have no items in your cart,
      <Link className={classes.link} to="/">start adding some</Link>!
    </Typography>
  );

  const renderCart = () => (
    <>
      <Grid container spacing={3}>
        {cart.map((lineItem) => (
          <Grid item xs={12} sm={4} key={lineItem.item.itemId}>
            <CartItem item={lineItem} onUpdateCartQty={onUpdateCartQty} onRemoveFromCart={onRemoveFromCart} />
          </Grid>
        ))}
      </Grid>
      <div className={classes.cardDetails}>
        <Typography variant="h4">Subtotal: </Typography>
        <div>
          <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary" onClick={handleEmptyCart}>Empty cart</Button>
          <Button className={classes.checkoutButton} component={Link} to="/checkout" size="large" type="button" variant="contained" color="primary">Checkout</Button>
        </div>
      </div>
    </>
  );

  return (
    <Container>
      <div className={classes.toolbar} />
      <Typography className={classes.title} variant="h3" gutterBottom>Your Food Cart</Typography>
      { !getCartLength() ? renderEmptyCart() : renderCart() }
    </Container>
  );
};

export default Cart;
