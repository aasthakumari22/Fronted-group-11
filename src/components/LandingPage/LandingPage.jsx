import { Button, TextField, InputAdornment } from '@material-ui/core';
import React, { useState } from 'react'

import useStyles from './styles';

const LandingPage = ({ user }) => {
  const [location, setLocation] = useState({ latitude: '', longitude: '' });
  const classes = useStyles();

  function saveLocation() {
    localStorage.setItem('location', location);
  }

  const LeftPane = () => (
    <div>
      <div className={classes.box}>
        <TextField InputProps={{
            disableUnderline: true, startAdornment: <InputAdornment position="start"><p className={classes.locationLabel}>Longitude</p></InputAdornment>,
          }} />
          <TextField InputProps={{
            disableUnderline: true, startAdornment: <InputAdornment position="start"><div className={classes.locationLabel}>Latitude</div></InputAdornment>,
          }} />
      </div>
      <Button variant='contained' disableElevation size='large'>Go</Button>
    </div>
  )

  return (
    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
      <div justifyContent="center">
        <h1 style={{textAlign:'center'}}>F-Delivery</h1>
        <div className={classes.box}> 
          <TextField InputProps={{
            disableUnderline: true, startAdornment: <InputAdornment position="start"><p className={classes.locationLabel}>Longitude</p></InputAdornment>,
          }} />
          <TextField InputProps={{
            disableUnderline: true, startAdornment: <InputAdornment position="start"><div className={classes.locationLabel}>Latitude</div></InputAdornment>,
            endAdornment: <InputAdornment position="end"><Button variant="contained" disableElevation size="large">Go</Button></InputAdornment>
          }} />
       </div>
      </div>
    </div>
  )
}

export default LandingPage