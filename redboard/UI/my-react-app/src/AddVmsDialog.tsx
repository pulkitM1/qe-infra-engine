import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import IpIcon from '@mui/icons-material/Router'; // Import an icon for IP adornment

interface Props {
  open: boolean;
  handleClose: () => void;
}

const AddVmsDialog: React.FC<Props> = ({ open, handleClose }) => {
  const [ips, setIps] = useState('');
  const [origin, setOrigin] = useState('');
  const [vmName, setVmName] = useState('');
  const [poolId, setPoolId] = useState('');

  const handleIpsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIps(event.target.value);
  };

  const handleOriginChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOrigin(event.target.value);
  };

  const handleVmNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVmName(event.target.value);
  };

  const handlePoolIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPoolId(event.target.value);
  };

  const handleAdd = () => {
    console.log(ips, origin, vmName, poolId);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ color: 'black', textShadow: '1px 1px 2px gray' }}>Add VM Details</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="ips"
          label="IP Addresses (comma separated)"
          type="text"
          fullWidth
          value={ips}
          onChange={handleIpsChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IpIcon />
              </InputAdornment>
            ),
          }}
          sx={{ '& .MuiInputBase-input': { color: 'red' } }}
        />
        <TextField
          margin="dense"
          id="origin"
          label="Origin"
          type="text"
          fullWidth
          value={origin}
          onChange={handleOriginChange}
          inputProps={{ maxLength: 50 }}
          sx={{ '& .MuiInputBase-input': { color: 'green' } }}
        />
        <TextField
        margin="dense"
        id="vm-name"
        label="VM Name"
        type="text"
        fullWidth
        value={vmName}
        onChange={handleVmNameChange}
        inputProps={{ maxLength: 50 }}
    sx={{ '& .MuiInputBase-input': { color: 'orange' } }} // Change 'yellow' to 'orange'
/>
        <TextField
          margin="dense"
          id="pool-id"
          label="Pool ID"
          type="text"
          fullWidth
          value={poolId}
          onChange={handlePoolIdChange}
          inputProps={{ maxLength: 50 }}
          sx={{ '& .MuiInputBase-input': { color: 'purple' } }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleAdd}>Add</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddVmsDialog;
