import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

const Nav = () => {
  return (
    <div className="absolute top-4 right-4 md:top-6 md:right-6">
      <Link to="/" className="block p-2 bg-white bg-opacity-20 rounded-full backdrop-blur-sm hover:bg-opacity-30 transition">
        <FontAwesomeIcon icon={faHome} className="text-white text-xl" />
      </Link>
    </div>
  );
};

export default Nav;