import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="w-full py-4 bg-gradient-to-r from-orange-400 to-orange-600 text-white text-center font-sans">
      <p>© {currentYear} By Wais. All rights reserved.</p>
    </footer>
  );
};

export default Footer;