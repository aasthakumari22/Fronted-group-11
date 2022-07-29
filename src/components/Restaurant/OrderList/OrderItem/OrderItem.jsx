import React from 'react'
import { Card, Box, Typography, Button } from '@material-ui/core'

import useStyles from './styles';

const OrderItem = ({ order }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <div>
          <Box className={classes.content}>
              <Typography variant='h6' gutterBottom noWrap>
                  Order#{order.orderId}
              </Typography>
              {order.items.map((item) => <li style={{listStyleType: 'none'}}>{item.quantity} X {item.name}</li>)}
              <div style={{height: '10px'}}/>
              <Button variant='contained' disableElevation color="secondary" >Move</Button>
          </Box>
      </div>
    </Card>
  )
}

export default OrderItem