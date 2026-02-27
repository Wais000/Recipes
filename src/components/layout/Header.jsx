// src/components/layout/Header.jsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import useFetch from '../../hooks/useFetch';
import { API_BASE } from '../../utils/constants';
import logoImg from '../../pictures/logo/logo.png';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';

  // Dropdown state
  const [dropdownItems, setDropdownItems] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState('');

  // ---------- Dropdown fetch ----------
  useEffect(() => {
    let isMounted = true;
    const fetchItems = async () => {
      try {
        let response, data;
        if (isHome) {
          response = await fetch(`${API_BASE}/categories.php`);
          data = await response.json();
          if (isMounted) setDropdownItems(data.categories.map(cat => ({ name: cat.strCategory, id: cat.idCategory })));
        } else if (location.pathname.startsWith('/home/')) {
          const category = decodeURIComponent(location.pathname.replace('/home/', ''));
          response = await fetch(`${API_BASE}/filter.php?c=${category}`);
          data = await response.json();
          if (isMounted) setDropdownItems(data.meals ? data.meals.map(meal => ({ name: meal.strMeal, id: meal.idMeal })) : []);
        } else {
          response = await fetch(`${API_BASE}/categories.php`);
          data = await response.json();
          if (isMounted) setDropdownItems(data.categories.map(cat => ({ name: cat.strCategory, id: cat.idCategory })));
        }
        if (isMounted) setSelectedItemId('');
      } catch (error) {
        console.error('Dropdown fetch failed:', error);
        if (isMounted) setDropdownItems([]);
      }
    };
    fetchItems();
    return () => { isMounted = false; };
  }, [location.pathname, isHome]);

  const handleDropdownChange = useCallback((e) => {
    const selectedId = e.target.value;
    setSelectedItemId(selectedId);
    const selectedItem = dropdownItems.find(item => item.id === selectedId);
    if (!selectedItem) return;

    if (location.pathname.startsWith('/home/') && !isHome) {
      navigate(`/sections/${selectedItem.id}`);
    } else {
      navigate(`/home/${selectedItem.name}`);
    }
  }, [dropdownItems, location.pathname, isHome, navigate]);

  // ---------- Search form ----------
  const [searchInput, setSearchInput] = useState('');
  const searchRef = useRef();
  const { results, loading, error } = useFetch(
    searchInput ? `${API_BASE}/search.php?s=${searchInput}` : null
  );

  useEffect(() => {
    if (results && searchInput) {
      navigate('/search-results', { state: { results, loading, error } });
      setSearchInput('');
    }
  }, [results, searchInput, navigate, loading, error]);

  useEffect(() => {
    if (isHome) setSearchInput('');
  }, [isHome]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const value = searchRef.current.value.trim();
    if (value) {
      setSearchInput(value);
      searchRef.current.value = '';
    }
  };

  const goBack = useCallback(() => navigate(-1), [navigate]);
  const goForward = useCallback(() => navigate(1), [navigate]);

  return (
    <header className="relative w-full h-96 mb-8 overflow-hidden rounded-b-3xl shadow-xl">
      {/* Banner animation (preserved) */}
      <div className="absolute inset-0 banner" />

      {/* Professional mask – combines radial vignette and warm gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-amber-900/70 via-amber-700/30 to-amber-500/10 z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_20%,_rgba(0,0,0,0.3)_80%)] z-10" />

      {/* ===== TOP NAVIGATION BAR – 5‑Star Hotel Style ===== */}
      <div className="absolute top-4 left-4 right-4 z-30 flex items-center justify-between">
        {/* Left group: Home + Back + Forward + Dropdown */}
        <div className="flex items-center gap-3 bg-gradient-to-br from-amber-50/95 to-amber-100/95 backdrop-blur-md rounded-full pl-1 pr-3 py-1 shadow-xl border border-amber-300/40 hover:border-amber-300/60 transition-colors duration-300">
          {/* Home button (replaces logo) */}
          <Link
            to="/"
            className="p-2 text-amber-800 hover:text-amber-950 bg-amber-200/20 rounded-full backdrop-blur-sm hover:bg-amber-300/30 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#fc910e]/50 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center"
            aria-label="Home"
          >
            <FontAwesomeIcon icon={faHome} className="text-lg md:text-xl" />
          </Link>

          {/* Back button (only if not home) */}
          {!isHome && (
            <button
              onClick={goBack}
              className="p-2 text-amber-800 hover:text-amber-950 bg-amber-200/20 rounded-full backdrop-blur-sm hover:bg-amber-300/30 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#fc910e]/50"
              aria-label="Go back"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="text-lg md:text-xl" />
            </button>
          )}

          {/* Forward button */}
          <button
            onClick={goForward}
            className="p-2 text-amber-800 hover:text-amber-950 bg-amber-200/20 rounded-full backdrop-blur-sm hover:bg-amber-300/30 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#fc910e]/50"
            aria-label="Go forward"
          >
            <FontAwesomeIcon icon={faArrowRight} className="text-lg md:text-xl" />
          </button>

          {/* Dropdown */}
          {dropdownItems.length > 0 && (
            <div className="relative">
              <select
                value={selectedItemId}
                onChange={handleDropdownChange}
                className="appearance-none bg-amber-50/90 backdrop-blur-sm border border-amber-300/40 rounded-full pl-4 pr-8 py-2 text-sm font-sans text-amber-900 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#fc910e] focus:border-transparent transition-all duration-300 w-40 md:w-48 truncate cursor-pointer"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20' stroke='%23fc910e'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
                  backgroundPosition: 'right 1rem center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '1.2rem',
                }}
              >
                <option value="" className="text-amber-500">Browse</option>
                {dropdownItems.map(item => (
                  <option key={item.id} value={item.id} className="text-amber-900">
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Right side: Logo (replaces home button) */}
        <Link
          to="/"
          className="block w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-amber-400/80 shadow-lg overflow-hidden bg-amber-50 hover:scale-105 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-[#fc910e]/50"
          aria-label="Home"
        >
          <img src={logoImg} alt="Logo" className="w-full h-full object-cover" />
        </Link>
      </div>

      {/* Hero content (centered) */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4 text-center">
        <h1 className="font-serif text-5xl md:text-6xl font-light text-amber-50 mb-3 tracking-wide drop-shadow-lg">
          Discover Delicious Recipes
        </h1>
        <p className="font-sans text-lg md:text-xl text-amber-100 mb-6 max-w-2xl drop-shadow">
          Explore thousands of recipes from around the world
        </p>

        <form onSubmit={handleSearchSubmit} className="w-full max-w-md flex">
          <input
            type="text"
            ref={searchRef}
            placeholder="Search for a recipe..."
            className="flex-grow px-5 py-3 rounded-l-full border border-amber-300/50 bg-amber-50/90 backdrop-blur-sm text-amber-900 placeholder-amber-500/70 outline-none focus:ring-2 focus:ring-[#fc910e]"
          />
          <button
            type="submit"
            className="px-6 py-3 font-sans text-xs font-medium uppercase tracking-widest text-amber-900 bg-amber-50/90 border border-amber-300/50 rounded-r-full hover:bg-[#fc910e] hover:text-white hover:border-[#fc910e] transition-all duration-500"
          >
            Search
          </button>
        </form>
      </div>
    </header>
  );
};

export default Header;