// src/components/common/Card.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Card = ({ to, image, title }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="group w-full max-w-[192px] h-64 flex flex-col bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-700 ease-out overflow-hidden border border-amber-200/50 hover:border-amber-300/80 max-[448px]:max-w-[160px] max-[448px]:h-56">
      {/* Image container – grows to fill all space above content */}
      <div className="relative flex-grow overflow-hidden border-b border-amber-200/50 bg-gray-200">
        {!imgError ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-600 text-xs">
            Image unavailable
          </div>
        )}
        {/* Subtle overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-amber-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Fine gold line – animates on hover */}
      <div className="h-px bg-gradient-to-r from-amber-300 via-amber-500 to-amber-300 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center" />
      
      {/* Content panel – always at bottom */}
      <div className="p-3 bg-white/80 backdrop-blur-[1px] max-[448px]:p-2">
        <h3 className="font-serif text-base font-light text-amber-950 mb-2 tracking-wide line-clamp-2 group-hover:text-amber-900 transition-colors duration-300 max-[448px]:text-sm">
          {title}
        </h3>
        <Link
          to={to}
          className="inline-block px-4 py-1.5 text-xs font-sans font-medium uppercase tracking-widest text-amber-900 border border-amber-300/50 rounded-none hover:bg-[#fc910e] hover:text-white hover:border-[#fc910e] transition-all duration-500 max-[448px]:px-3 max-[448px]:py-1 max-[448px]:text-[10px]"
        >
          View Recipe
        </Link>
      </div>
    </div>
  );
};

export default Card;