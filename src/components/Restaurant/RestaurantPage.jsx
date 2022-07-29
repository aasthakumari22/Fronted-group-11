import React, { useEffect, useState } from 'react'
import useStyles from './styles';

import { Card, Grid, CardActionArea, Typography, CardMedia, CardContent, Box } from '@material-ui/core';
import OrderList from './OrderList/OrderList';

const RestaurantPage = ({ user }) => {
  const classes = useStyles();
  const [orderData, setOrderData] = useState({});

  const columns = {
    'placed': {
      name: 'Accepted Order',
      orders: []
    },
    'preparing':{
      name: 'Preparing Order',
      orders: [],
    },
    'completed': {
      name: 'Completed Order',
      orders: [],
    }
  }

  const fetchOrders = () => {
    const body = {
      "restaurantId": user.restaurantId
    }
    fetch('https://fooddelivery-app-1.herokuapp.com/getOrdersManager', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    }).then((response) => response.json())
    .then((data) => {
      if (!data.success) {
        return (<h2>{data.message}</h2>)
      }
      for(let order of data.orderDetailsList) {
        columns[order.status].orders.push({
          orderId: order.orderId,
          items: order.itemDetailsList
        })
      }
      console.log(data);
    }).catch((error) => {
      console.log("err: ", error);
    })
  }

  useEffect(() => {
    fetchOrders();
  }, [])

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", height: '100vh'}}>
    <div className={classes.column}>
      <div className={classes.heading}>{columns['placed'].name}</div>
      <OrderList orders={columns['placed'].orders} />
    </div>
    <div className={classes.column}>
      <div className={classes.heading}>{columns['preparing'].name}</div>
      <OrderList orders={columns['placed'].orders} />
    </div>
    <div className={classes.column}>
      <div className={classes.heading}>{columns['completed'].name}</div>
      <OrderList orders={columns['placed'].orders} />
    </div>
  </div>
  )
}

export default RestaurantPage