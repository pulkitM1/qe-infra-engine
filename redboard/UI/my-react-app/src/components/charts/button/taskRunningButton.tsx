import React, { useState, useRef } from 'react';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import { styled, keyframes } from '@mui/system';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const StyledHourglassEmptyIcon = styled(HourglassEmptyIcon)`
  animation: ${spin} 15s linear infinite;
`;

function RunningTasksButton() {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

 
  const tasks = [
    { name: 'Health Monitoring', status: 'Running' },
    { name: 'Node Addition', status: '30 nodes addition task failed' },
  ];

  return (
    <div>
     <Button 
        variant="contained" 
        onClick={handleOpen} 
        startIcon={<StyledHourglassEmptyIcon />} 
        className="button-running-tasks"
        ref={anchorRef}
      >
        Tasks
      </Button>
      <Popover
        open={open}
        anchorEl={anchorRef.current}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transitionDuration={500}
      >
        <List>
          {tasks.map((task, index) => (
            <ListItem button key={index}>
              <ListItemText primary={task.name} secondary={task.status} />
            </ListItem>
          ))}
        </List>
      </Popover>
    </div>
  );
}

export default RunningTasksButton;
