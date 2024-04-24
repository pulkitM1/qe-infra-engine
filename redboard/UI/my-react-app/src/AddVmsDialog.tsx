import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, InputAdornment, TextField, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import AccountCircle from '@mui/icons-material/AccountCircle';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import ComputerIcon from '@mui/icons-material/Computer';
import PoolIcon from '@mui/icons-material/Pool';
import PublicIcon from '@mui/icons-material/Public';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

interface VM {
    ips: string;
    username: string;
    password: string;
    vmName: string;
    poolId: string;
    origin: string;
}

interface Props {
    open: boolean;
    handleClose: () => void;
}



const AddVmsDialog: React.FC<Props> = ({ open, handleClose }) => {

    const [openSnackbar, setOpenSnackbar] = useState(false); 
    const [vms, setVms] = useState<VM[]>([{ ips: '', username: '', password: '', vmName: '', poolId: '', origin: '' }]);


    const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = event.target.result;
      setOpenSnackbar(true);
    };
    reader.readAsText(file);
  };
  

    const handleAddVm = () => {
        setVms([...vms, { ips: '', username: '', password: '', vmName: '', poolId: '', origin: '' }]);
    };

    const handleRemoveVm = (index: number) => {
        const newVms = [...vms];
        newVms.splice(index, 1);
        setVms(newVms);
    };

    const handleInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const newVms = [...vms];
        newVms[index][event.target.name] = event.target.value;
        setVms(newVms);
    };

    const handleAdd = () => {
        console.log(vms);
        handleClose();
    };

    return (
        <Dialog PaperProps={{ style: { borderRadius: '15px', width: '70%' } }} open={open} onClose={handleClose}>
    <DialogTitle sx={{ color: 'black', textShadow: '1px 1px 2px gray' , fontSize: '1.6rem',marginTop: '23px', marginLeft: '23px'}}>Add VM Details</DialogTitle>
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
                                    <PublicIcon />
                                </InputAdornment>
                            ),
                        }}
                        sx={{ backgroundColor: 'white', margin: '0 20px' ,
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
                        sx={{ backgroundColor: 'white', margin: '0 20px', '& .MuiFilledInput-root': {
                            backgroundColor: 'white',
                        }, }}
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
                        sx={{ backgroundColor: 'white', margin: '0 20px' ,'& .MuiFilledInput-root': {
                            backgroundColor: 'white',
                        },}}
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
                        sx={{ backgroundColor: 'white', margin: '0 20px','& .MuiFilledInput-root': {
                            backgroundColor: 'white',
                        }, }}
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
                        sx={{ backgroundColor: 'white', margin: '0 20px', '& .MuiFilledInput-root': {
                            backgroundColor: 'white',
                        }, }}
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
                                    <PublicIcon />
                                </InputAdornment>
                            ),
                        }}
                        sx={{ backgroundColor: 'white', margin: '0 20px', '& .MuiFilledInput-root': {
                            backgroundColor: 'white',
                        }, }}
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
    <DialogActions sx={{ '& .MuiButton-root': { height: '30px' },  marginRight:'10px', marginTop: '5px', marginBottom: '3px' }}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleAdd}>Add</Button>
        <input
    accept=".json, .csv"
    style={{ display: 'none' }}
    id="raised-button-file"
    type="file"
    onChange={handleFileUpload} 
  />
  <label htmlFor="raised-button-file">
  <Snackbar
  open={openSnackbar}
  autoHideDuration={6000}
  onClose={() => setOpenSnackbar(false)}
>
  <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
    File uploaded successfully!
  </Alert>
</Snackbar>
    <Button component="span">Upload JSON/CSV</Button>
  </label>
    </DialogActions>
</Dialog>
    );
};

export default AddVmsDialog;
