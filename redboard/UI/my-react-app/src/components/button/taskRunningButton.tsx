import React, { useState, useRef } from 'react';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import Fade from '@mui/material/Fade';
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

function RunningTasksButton({ taskIds }) {
  const [open, setOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [taskStatus, setTaskStatus] = useState(null);
  const anchorRef = useRef(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTaskStatus(null); // Clear status when closing
  };

  async function fetchTaskStatus(taskId) {
    try {
      const response = await fetch(`http://127.0.0.1:5174/tasks/get_status?task_id=${taskId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const taskStatus = await response.json();
      return taskStatus;
    } catch (error) {
      console.error('Error fetching task status:', error);
      return 'Error fetching status';
    }
  }

  const handleTaskClick = async (taskId) => {
    setTaskStatus('Loading...');
    setSelectedTaskId(taskId);
    const status = await fetchTaskStatus(taskId);
    setTaskStatus(status);
  };

  return (
    <div>
      <Button 
        variant="contained" 
        onClick={handleOpen} 
        startIcon={<StyledHourglassEmptyIcon />} 
        className="button-running-tasks"
        ref={anchorRef}
        style={{ textAlign: 'center' }} 
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
        TransitionComponent={Fade} 
        transitionDuration={500}
        PaperProps={{ style: { width: '200px', padding: '10px' } }} 
      >
        <List dense>
          <ListItem button onClick={() => setTaskStatus('Coming soon')}>
            <ListItemText primary="Health Monitoring Task" style={{ textAlign: 'center', fontSize: '0.9em' }} /> 
          </ListItem>
          {taskIds.map((taskId, index) => (
            <ListItem button key={index} onClick={() => handleTaskClick(taskId)}>
              <ListItemText primary={`Task: ${taskId.substring(0, 10)}...`} style={{ textAlign: 'center', fontSize: '0.9em' }} /> 
            </ListItem>
          ))}
        </List>
        {taskStatus && (
          <div style={{ textAlign: 'center', borderTop: '1px solid black', paddingTop: '10px' }}> 
            <p style={{ color: 'black', fontSize: '0.9em' }}>Status: {taskStatus}</p>
          </div>
        )}
      </Popover>
    </div>
  );
}

export default RunningTasksButton;