import React from 'react';
import Button from '@mui/material/Button';
import DownloadIcon from '@mui/icons-material/Download';
import { styled, keyframes } from '@mui/system';


const download = keyframes`
  0% { transform: translateY(0); }
  20% { transform: translateY(3px); }
  100% { transform: translateY(0); }
`;


const StyledDownloadIcon = styled(DownloadIcon)`
  animation: ${download} 3s ease-in-out infinite;
`;

const ExportButton = ({ onClick }) => {
  return (
    <Button 
      variant="contained" 
      color="primary" 
      startIcon={<StyledDownloadIcon />} 
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
