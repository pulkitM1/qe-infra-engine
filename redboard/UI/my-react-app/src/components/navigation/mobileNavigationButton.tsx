import React from 'react';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

interface Props {
  toggleDrawer: (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void;
}

const MobileNavigationButton: React.FC<Props> = ({ toggleDrawer }) => {
  return (
    <IconButton
      edge="start"
      color="inherit"
      aria-label="menu"
      onClick={toggleDrawer(true)}
      style={{ color: 'black', alignSelf: 'flex-start' }} 
    >
       <MenuIcon fontSize="large" />
    </IconButton>
  );
}

export default MobileNavigationButton;
