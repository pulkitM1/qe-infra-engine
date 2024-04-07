import React from 'react';
import Button from '@mui/material/Button';
import DownloadIcon from '@mui/icons-material/Download';

const ExportButton = ({ onClick }) => {
  return (
    <Button 
      variant="contained" 
      color="primary" 
      startIcon={<DownloadIcon />} 
      onClick={onClick}
      sx={{
        backgroundColor: '#303030',
        color: 'white',
        '&:hover': {
          backgroundColor: 'darkgray',
        },
      }}
    >
      Export
    </Button>
  );
};

export default ExportButton;
