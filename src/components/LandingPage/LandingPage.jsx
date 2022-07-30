import { Button, TextField, InputAdornment } from '@material-ui/core';
import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import useStyles from './styles';

const LandingPage = () => {
  const classes = useStyles();
  const lat = useRef();
  const lon = useRef();
  const navigate = useNavigate();

  function saveLocation() {
    if (lat.current.value && !isNaN(lat.current.value) && lon.current.value && !isNaN(lon.current.value)) {
      localStorage.setItem('location', JSON.stringify({
        latitude: lat.current.value,
        longitude: lon.current.value
      }))
      navigate('/getFeed', {replace: true});
    } else {
      alert("Enter valid location")
    }
  }

  useEffect(() => {
    if (localStorage.getItem('location')) {
      navigate('/getFeed', {replace: true});
    }
  }, []);

  return (
    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
      <div justifyContent="center">
        <h1 style={{textAlign:'center'}}>F-Delivery</h1>
        <div className={classes.box}> 
          <TextField inputRef={lat} InputProps={{
            disableUnderline: true, startAdornment: <InputAdornment position="start"><p className={classes.locationLabel}>Latitude</p></InputAdornment>,
          }} />
          <TextField inputRef={lon} InputProps={{
            disableUnderline: true, startAdornment: <InputAdornment position="start"><div className={classes.locationLabel}>Longitude</div></InputAdornment>,
            endAdornment: <InputAdornment position="end"><Button variant="contained" disableElevation size="large" onClick={saveLocation}>Go</Button></InputAdornment>
          }} />
       </div>
      </div>
    </div>
  )
}

export default LandingPage