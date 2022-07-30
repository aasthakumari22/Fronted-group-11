import React, { useRef } from 'react';
import { TextField, InputAdornment, Button, Popover } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

export default function BasicPopover({ loc }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const lat = useRef();
  const lon = useRef();
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const saveLocation = () => {
    if (lat.current.value && !isNaN(lat.current.value) && lon.current.value && !isNaN(lon.current.value)) {
      localStorage.setItem('location', JSON.stringify({
        latitude: lat.current.value,
        longitude: lon.current.value
      }))
      handleClose();
      navigate('/', {replace: true});
    } else {
      alert("Enter valid location")
    }
  }

  return (
    <div>
      <Button aria-describedby={id} variant="text" onClick={handleClick}>
        {loc.latitude},{loc.longitude}
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <TextField inputRef={lat} defaultValue={loc.latitude} InputProps={{
            disableUnderline: true, startAdornment: <InputAdornment position="start"><p>Latitude</p></InputAdornment>,
          }} />
          <TextField inputRef={lon} defaultValue={loc.longitude} InputProps={{
            disableUnderline: true, startAdornment: <InputAdornment position="start"><div>Longitude</div></InputAdornment>,
            endAdornment: <InputAdornment position="end"><Button variant="contained" disableElevation size="large" onClick={saveLocation}>Go</Button></InputAdornment>
          }} />
      </Popover>
    </div>
  );
}