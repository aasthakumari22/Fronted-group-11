import React from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton, CardActionArea, Link } from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';
import { useLocation, useNavigate } from 'react-router-dom';

import useStyles from './styles';

const Item = ({ product, onAddToCart }) => {
  const classes = useStyles();
  const location = useLocation();
  const navigate = useNavigate();

  const handleAddToCart = () => onAddToCart(product.id, product, 1);

  return (
    <Card className={classes.root}>
      <CardMedia className={classes.media} image={product.url} title={product.name} />
      <CardContent>
        <div className={classes.cardContent}>
          <Typography gutterBottom variant="h5" component="h2">
            {product.name}
          </Typography>
          <Typography gutterBottom variant="h5" component="h2">
            Rs. {product.price}
          </Typography>
        </div>
        <Typography dangerouslySetInnerHTML={{ __html: product.description }} variant="body2" color="textSecondary" component="p" />
      </CardContent>
      <CardActions disableSpacing className={classes.cardActions}>
        {location.pathname === '/menu' && (
        <IconButton aria-label="Add to Cart" onClick={handleAddToCart}>
          <AddShoppingCart />
        </IconButton>
        )}
      </CardActions>
    </Card>
  );
};

export default Item;

