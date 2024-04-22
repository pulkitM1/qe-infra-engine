import React, { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import AddVmsDialog from '../../../AddVmsDialog'; 
import ReserveVmsDialog from '../../../reserveVmsDialog'; 

interface Props {
  open: boolean;
  toggleDrawer: (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void;
}

const AppDrawer: React.FC<Props> = ({ open, toggleDrawer }) => {
  const [addVmsOpen, setAddVmsOpen] = useState(false);
  const [reserveVmsOpen, setReserveVmsOpen] = useState(false);

  const handleAddVmsOpen = () => {
    setAddVmsOpen(true);
  };

  const handleAddVmsClose = () => {
    setAddVmsOpen(false);
  };

  const handleReserveVmsOpen = () => { 
    setReserveVmsOpen(true);
  };

  const handleReserveVmsClose = () => { 
    setReserveVmsOpen(false);
  };

  const list = () => (
    <div
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Typography variant="h5" component="div" sx={{ padding: '21px', textAlign: 'center', color: 'red', textShadow: '0 0 8px rgba(255, 0, 0, 0.6)' ,transition: 'all 0.4s ease', '&:hover': { textShadow: '0 0 10px red, 0 0 20px red, 0 0 30px red, 0 0 40px red' } }}> 
        Red Tools
      </Typography>
      <List>
        {['Add VMs', 'Reserve VMs'].map((text, index) => (
          <ListItem button key={text} onClick={text === 'Add VMs' ? handleAddVmsOpen : text === 'Reserve VMs' ? handleReserveVmsOpen : undefined}>
            <ListItemText primary={text} style={{ textAlign: 'center' }} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      <Drawer 
        anchor="right" 
        open={open} 
        onClose={toggleDrawer(false)}
        PaperProps={{ style: { width: '20%' } }}
      >
        {list()}
      </Drawer>
      <AddVmsDialog open={addVmsOpen} handleClose={handleAddVmsClose} />
      <ReserveVmsDialog open={reserveVmsOpen} handleClose={handleReserveVmsClose} /> {/* add the ReserveVmsDialog component */}
    </div>
  );
}

export default AppDrawer;
