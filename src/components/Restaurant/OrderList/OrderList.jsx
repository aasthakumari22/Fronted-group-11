import React, { useEffect } from 'react'
import { Grid } from '@material-ui/core';
import OrderItem from './OrderItem/OrderItem';

const OrderList = ({ orders }) => {

  useEffect(() => {
    console.log('rendering orders: ', orders);
  }, []);

  return (
    <div style={{margin: '5px'}}>
      <Grid container direction='column' spacing={2} >
        {orders.map((order) => (
          <Grid item key={order.orderId} p={2}>
              <OrderItem order={order} />
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default OrderList