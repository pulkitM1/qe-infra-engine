import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

interface Props {
  open: boolean;
  handleClose: () => void;
}

const ReserveVmsDialog: React.FC<Props> = ({ open, handleClose }) => {
  const [numVms, setNumVms] = useState('');
  const [time, setTime] = useState('');
  const [username, setUsername] = useState('');
  const [os, setOs] = useState('');

  const osOptions = ['Debian', 'Centos', 'Kali', 'Redhat']; // Dummy data

  const handleOsChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setOs(event.target.value as string);
  };

  const handleNumVmsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNumVms(event.target.value);
  };

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTime(event.target.value);
  };

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleReserve = () => {
    console.log(numVms, time, username, os);
    handleClose();
  };


  return (
    <Dialog PaperProps={{ style: { borderRadius: '15px', width: '70%'  } }} open={open} onClose={handleClose}>
    <DialogTitle sx={{ color: 'black', textShadow: '1px 1px 2px gray' , fontSize: '1.6rem', marginLeft: '18px',  marginTop: '20px', paddingBottom: '0px'}}>Enter Details</DialogTitle>
    <DialogContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <TextField
          autoFocus
          margin="dense"
          id="num-vms"
          label="Number of VMs"
          type="number"
          fullWidth
          value={numVms}
          onChange={handleNumVmsChange}
          variant="standard"
          sx={{ 
            '& .MuiInputBase-input': { color: 'red', height: '30px' } ,
            width: '90%',
            margin: '0 20px'
          }}
          InputLabelProps={{ style: { fontSize: '0.9rem' } }}
        />
        <TextField
        autoFocus
          margin="dense"
          id="time"
          label="Time"
          type="number"
          fullWidth
          value={time}
          onChange={handleTimeChange}
          variant="standard"
          inputProps={{ min: 1, max: 24 }} 
          sx={{ '& .MuiInputBase-input': { color: 'green', height: '30px'},
          margin: '0 20px' ,
          marginTop: '15px' ,
          width: '90%' }}
          InputLabelProps={{ style: { fontSize: '0.9rem' } }}
        />
        <TextField
          margin="dense"
          id="username"
          label="Username"
          type="text"
          fullWidth
          value={username}
          onChange={handleUsernameChange}
          variant="standard"
          sx={{ '& .MuiInputBase-input': { color: 'orange', height: '30px' },
          margin: '0 20px' ,
          marginTop: '15px' ,
          marginBottom: '15px' ,
          width: '90%',
          paddingBottom: '10px' }} 
          InputLabelProps={{ style: { fontSize: '0.9rem' } }}
        />
        <Select
          value={os}
          onChange={handleOsChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
          sx={{ 
            '& .MuiSelect-select': { padding: '5px 10px', color: '#676767', height: '20px' },
            marginTop: '15px' ,
            margin: '0 20px' ,
            width: '20%', 
          }}
        >
          <MenuItem value="" disabled sx={{ fontSize: '0.9rem' , marginTop: '0px'}}>
            Select OS
          </MenuItem>
          {osOptions.map((option) => (
            <MenuItem key={option} value={option} sx={{ fontSize: '0.9rem', marginTop: '10px' }}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </DialogContent>
      <DialogActions sx={{ marginBottom: '18px', marginTop: '3px', height: '3px' , marginRight:'20px'}}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleReserve}>Reserve</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReserveVmsDialog;
