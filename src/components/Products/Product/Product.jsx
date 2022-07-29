import React from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton, CardActionArea, Link } from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';
import { useLocation, useNavigate } from 'react-router-dom';

import useStyles from './styles';

const Product = ({ product, onAddToCart }) => {
  const classes = useStyles();
  const location = useLocation();
  const navigate = useNavigate();

  const handleAddToCart = () => onAddToCart(product.id, product, 1);

  return (
    <Link onClick={() => {
      navigate('/menu', {
        state: {
          restaurantId: product.restaurantId
        }
      })
    }}>
    <CardActionArea>
    <Card className={classes.root}>
      <CardMedia className={classes.media} image={product.imageUrl} title={product.name} />
      <CardContent>
        <div className={classes.cardContent}>
          <Typography gutterBottom variant="h5" component="h2">
            {product.name}
          </Typography>
        </div>
        <Typography dangerouslySetInnerHTML={{ __html: product.description }} variant="body2" color="textSecondary" component="p" />
      </CardContent>
    </Card>
    </CardActionArea>
    </Link>
  );
};

export default Product;

