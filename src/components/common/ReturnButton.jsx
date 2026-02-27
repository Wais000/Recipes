import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const ReturnButton = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(-1)}
      className="fixed bottom-6 left-6 z-50 bg-orange-500 text-white p-3 rounded-full shadow-lg hover:bg-orange-600 transition transform hover:scale-110 focus:outline-none"
      aria-label="Go back"
    >
      <FontAwesomeIcon icon={faArrowLeft} className="text-xl" />
    </button>
  );
};

export default ReturnButton;