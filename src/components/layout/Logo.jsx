import React from 'react';
import logo from '../../assets/logo.png';

const Logo = () => {
  return (
    <div className="absolute top-4 left-4 w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-white shadow-lg overflow-hidden bg-white">
      <img src={logo} alt="Logo" className="w-full h-full object-cover" />
    </div>
  );
};

export default Logo;