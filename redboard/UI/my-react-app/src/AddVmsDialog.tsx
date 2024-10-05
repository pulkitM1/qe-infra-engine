import React, { useState } from 'react';
import { API_ENDPOINTS } from './api';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, InputAdornment, TextField, Box, CircularProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import AccountCircle from '@mui/icons-material/AccountCircle';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import ComputerIcon from '@mui/icons-material/Computer';
import PoolIcon from '@mui/icons-material/Pool';
import LanguageIcon from '@mui/icons-material/Language'; 
import LocationOnIcon from '@mui/icons-material/LocationOn'; 
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

interface VM {
    ips: string;
    username: string;
    password: string;
    vmName: string;
    poolId: string;
    origin: string;
    setTaskIds: React.Dispatch<React.SetStateAction<string[]>>;
}

interface Props {
    open: boolean;
    handleClose: () => void;
}

const AddVmsDialog: React.FC<Props> = ({ open, handleClose, setTaskIds}) => {

    const [openSnackbar, setOpenSnackbar] = useState(false); 
    const [vms, setVms] = useState<VM[]>([{ ips: '', username: '', password: '', vmName: '', poolId: '', origin: '' }]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });


    const handleAddVm = () => {
      setVms([...vms, { ips: '', username: '', password: '', vmName: '', poolId: '', origin: '' }]);
  };

  const resetInput = (callback = () => {}) => {
    setVms([{ ips: '', username: '', password: '', vmName: '', poolId: '', origin: '' }], callback);
  };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
          const data = event.target.result;
          setOpenSnackbar(true);
          setTimeout(handleClose, 3000); 
          resetInput(); 
         
        };
        reader.readAsText(file);
      };

      const handleRemoveVm = (index: number) => {
        const newVms = [...vms];
        newVms.splice(index, 1);
        setVms(newVms);
    };
    

      const handleAddNode = async () => {
        try {
          const vmsData = {
            vms: vms.map(vm => ({
              poolId: [vm.poolId],
              ipaddr: vm.ips,
              ssh_username: vm.username,
              ssh_password: vm.password,
              origin: vm.origin,
              vm_name: vm.vmName,
            })),
          };
          console.log(vmsData)
          setLoading(true);
          const response = await fetch(API_ENDPOINTS.addNodes, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(vmsData),
          });
      
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
      
          const data = await response.json();
          console.log(data);
      
          if (data.task_id) {
            setTaskIds(prevTaskIds => [...prevTaskIds, data.task_id]);
            setMessage({ type: 'success', text: `Task ID: ${data.task_id}` });
            setTimeout(handleClose, 1000); 
            resetInput(() => setTimeout(handleClose, 1000));
          } else {
            throw new Error('No task_id returned');
          }
        } catch (error) {
          setMessage({ type: 'error', text: `Error: ${error.message}` });
        } finally {
          setLoading(false);
        }
      };

      const handleInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const newVms = [...vms];
        newVms[index][event.target.name] = event.target.value;
        setVms(newVms);
    };


    return (
      <Dialog PaperProps={{ style: { borderRadius: '15px', width: '70%', boxShadow: '1px 1px 2px gray' } }} open={open} onClose={handleClose}>
        <DialogTitle sx={{ color: 'black', textShadow: '1px 1px 2px gray', fontSize: '1.6rem', marginTop: '18px', marginLeft: '23px' }}>Add VM Details</DialogTitle>
        <DialogContent sx={{ paddingBottom: '0px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {vms.map((vm, index) => (
            <Box key={index} marginBottom={0} sx={{ paddingBottom: '0px' }}>
              <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                <TextField
                  name="ips"
                  label="IP Addresses"
                  value={vm.ips}
                  onChange={(event) => handleInputChange(index, event)}
                  variant="filled"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationOnIcon />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    backgroundColor: 'white', margin: '0 20px',
                    '& .MuiFilledInput-root': {
                      backgroundColor: 'white',
                    },
                    '& .MuiInputBase-input': {
                      color: 'black',
                    },
                  }}
                />
                <TextField
                  name="username"
                  label="Username"
                  value={vm.username}
                  onChange={(event) => handleInputChange(index, event)}
                  variant="filled"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    backgroundColor: 'white', margin: '0 20px', '& .MuiFilledInput-root': {
                      backgroundColor: 'white',
                    },
                  }}
                />
                <TextField
                  name="password"
                  label="Password"
                  type="password"
                  value={vm.password}
                  onChange={(event) => handleInputChange(index, event)}
                  variant="filled"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <VpnKeyIcon />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    backgroundColor: 'white', margin: '0 20px', '& .MuiFilledInput-root': {
                      backgroundColor: 'white',
                    },
                  }}
                />
                <TextField
                  name="vmName"
                  label="VM Name"
                  value={vm.vmName}
                  onChange={(event) => handleInputChange(index, event)}
                  variant="filled"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <ComputerIcon />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    backgroundColor: 'white', margin: '0 20px', '& .MuiFilledInput-root': {
                      backgroundColor: 'white',
                    },
                  }}
                />
                <TextField
                  name="poolId"
                  label="Pool ID"
                  value={vm.poolId}
                  onChange={(event) => handleInputChange(index, event)}
                  variant="filled"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PoolIcon />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    backgroundColor: 'white', margin: '0 20px', '& .MuiFilledInput-root': {
                      backgroundColor: 'white',
                    },
                  }}
                />
                <TextField
                  name="origin"
                  label="Origin"
                  value={vm.origin}
                  onChange={(event) => handleInputChange(index, event)}
                  variant="filled"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LanguageIcon />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    backgroundColor: 'white', margin: '0 20px', '& .MuiFilledInput-root': {
                      backgroundColor: 'white',
                    },
                  }}
                />
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '13px' }}>
                <IconButton onClick={() => handleRemoveVm(index)} sx={{ fontSize: '0.8rem' }}>
                  <RemoveIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          ))}
          <Button onClick={handleAddVm} sx={{ marginTop: '1px', fontSize: '0.6rem' }}>
            <AddIcon /> Add another set
          </Button>
        </DialogContent>
        <DialogActions sx={{ '& .MuiButton-root': { height: '30px' }, marginRight: '10px', marginTop: '5px', marginBottom: '3px' }}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddNode} disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Add'}
          </Button>
          <input
            accept=".json, .csv"
            style={{ display: 'none' }}
            id="raised-button-file"
            type="file"
            onChange={handleFileUpload}
          />
          <label htmlFor="raised-button-file">
            <Button component="span">Upload JSON/CSV</Button>
          </label>
        </DialogActions>
        <Snackbar open={message.text !== ''} autoHideDuration={3000} onClose={() => setMessage({ type: '', text: '' })}>
          <Alert onClose={() => setMessage({ type: '', text: '' })} severity={message.type} sx={{ width: '100%' }}>
            {message.text}
          </Alert>
        </Snackbar>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={2000}
          onClose={() => setOpenSnackbar(false)}
        >
          <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
            File uploaded successfully!
          </Alert>
        </Snackbar>
      </Dialog>
    );
      };

export default AddVmsDialog;
