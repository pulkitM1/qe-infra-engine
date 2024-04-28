import React, { useEffect } from 'react';
import SimpleGame from './game';

const GamePage: React.FC = () => {
  useEffect(() => {
   
    const originalStyle = window.getComputedStyle(document.body).overflow;  

   
    document.body.style.overflow = 'hidden';

    return () => {
     
      document.body.style.overflow = originalStyle;
    };
  }, []);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' }}>
      <SimpleGame />
    </div>
  );
};

export default GamePage;
