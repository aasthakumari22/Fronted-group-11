import React, { useEffect } from 'react';
import { Typography, Button, Card, CardActions, CardContent, CardMedia } from '@material-ui/core';

import useStyles from './styles';

const CartItem = ({ item, onUpdateCartQty, onRemoveFromCart }) => {
  const classes = useStyles();

  const handleUpdateCartQty = (lineItemId, newQuantity) => onUpdateCartQty(lineItemId, newQuantity);

  const handleRemoveFromCart = (lineItemId) => {
      console.log('remove in cart for ', lineItemId);
      onRemoveFromCart(lineItemId);
  }

  return (
    <Card className="cart-item">
      <CardMedia image={item.item.url} alt={item.item.name} className={classes.media} />
      <CardContent className={classes.cardContent}>
        <Typography noWrap variant="h4">{item.item.name}</Typography>
        <Typography noWrap variant="h5">{item.item.price}</Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <div className={classes.buttons}>
          <Button type="button" size="small" onClick={() => handleUpdateCartQty(item.item.itemId, item.quantity - 1)}>-</Button>
          <Typography>&nbsp;{item.quantity}&nbsp;</Typography>
          <Button type="button" size="small" onClick={() => handleUpdateCartQty(item.item.itemId, item.quantity + 1)}>+</Button>
        </div>
        <Button variant="contained" type="button" color="secondary" onClick={() => handleRemoveFromCart(item.item.itemId)}>Remove</Button>
      </CardActions>
    </Card>
  );
};

export default CartItem;
