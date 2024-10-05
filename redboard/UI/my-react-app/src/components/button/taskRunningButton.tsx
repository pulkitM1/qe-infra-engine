import React, { useState, useEffect, useRef } from 'react';
import { openDB } from 'idb';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import Fade from '@mui/material/Fade';
import { styled, keyframes } from '@mui/system';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const StyledHourglassEmptyIcon = styled(HourglassEmptyIcon)`
  animation: ${spin} 15s linear infinite;
`;

const StyledClearButton = styled(IconButton)`
  position: absolute;
  top: 5px;
  right: 5px;
  z-index: 10;
  background-color: rgba(255, 255, 255, 0.8);
  &:hover {
    background-color: rgba(255, 0, 0, 0.8);
  }
  transition: background-color 0.3s ease;
`;

async function openDatabase() {
  return openDB('my-database', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('tasks')) {
        db.createObjectStore('tasks', { keyPath: 'id' });
      }
    },
  });
}

async function getTaskIdsFromDB() {
  const db = await openDatabase();
  return await db.getAllKeys('tasks');
}

async function clearAllTasksFromDB() {
  const db = await openDatabase();
  const tx = db.transaction('tasks', 'readwrite');
  await tx.objectStore('tasks').clear();
  await tx.done;
}

function RunningTasksButton() {
  const [open, setOpen] = useState(false);
  const [taskIds, setTaskIds] = useState([]);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [taskStatus, setTaskStatus] = useState(null);
  const anchorRef = useRef(null);

  useEffect(() => {
    async function fetchTaskIds() {
      const ids = await getTaskIdsFromDB();
      setTaskIds(ids);
    }
    fetchTaskIds();
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTaskStatus(null);
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

  const handleClearTasks = async () => {
    await clearAllTasksFromDB();
    setTaskIds([]); // Clear the state as well
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
        PaperProps={{ style: { width: '250px', padding: '10px', position: 'relative' } }} 
        // Add spacing between the button and the popover
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        style={{ marginTop: '10px' }} // Add space between button and popover
      >
        <StyledClearButton size="small" onClick={handleClearTasks}>
          <ClearIcon fontSize="small" />
        </StyledClearButton>
        <List dense>
          <ListItem button onClick={() => setTaskStatus('Coming soon')} style={{ padding: '4px 8px' }}>
            <ListItemText primary="Health Monitoring Task" style={{ textAlign: 'center', fontSize: '0.9em' }} /> 
          </ListItem>
          {taskIds.map((taskId, index) => (
            <ListItem button key={index} onClick={() => handleTaskClick(taskId)} style={{ padding: '4px 8px' }}>
              <ListItemText 
                primary={`Task: ${taskId}`} 
                style={{ 
                  textAlign: 'center', 
                  fontSize: '0.9em', 
                  whiteSpace: 'nowrap', 
                  overflow: 'hidden', 
                  textOverflow: 'ellipsis' 
                }} 
              /> 
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