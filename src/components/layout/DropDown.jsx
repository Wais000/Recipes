import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { API_BASE } from '../../utils/constants';

const DropDown = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        let response;
        if (location.pathname === '/') {
          // Home page → show categories
          response = await fetch(`${API_BASE}/categories.php`);
          const data = await response.json();
          setItems(data.categories.map(cat => ({ name: cat.strCategory, id: cat.idCategory })));
        } else if (location.pathname.startsWith('/home/')) {
          // Category page → show meals in that category
          const category = decodeURIComponent(location.pathname.replace('/home/', ''));
          response = await fetch(`${API_BASE}/filter.php?c=${category}`);
          const data = await response.json();
          setItems(data.meals.map(meal => ({ name: meal.strMeal, id: meal.idMeal })));
        } else {
          // Any other page (ingredient, search results, etc.) → show categories
          response = await fetch(`${API_BASE}/categories.php`);
          const data = await response.json();
          setItems(data.categories.map(cat => ({ name: cat.strCategory, id: cat.idCategory })));
        }
      } catch (error) {
        console.error('Failed to fetch dropdown items', error);
      }
    };

    fetchItems();
  }, [location.pathname]);

  const handleChange = (e) => {
    const selectedId = e.target.value;
    const selectedItem = items.find(item => item.id === selectedId);
    if (!selectedItem) return;

    if (location.pathname.startsWith('/home/') && location.pathname !== '/') {
      // On a category page → selected item is a meal → go to meal detail
      navigate(`/sections/${selectedItem.id}`);
    } else {
      // On home or any other page → selected item is a category → go to category page
      navigate(`/home/${selectedItem.name}`);
    }
  };

  if (!items.length) return null;

  return (
    <select
      onChange={handleChange}
      className="absolute bottom-4 left-4 bg-white bg-opacity-90 backdrop-blur-sm border border-gray-300 rounded-full px-4 py-2 text-sm shadow-md focus:outline-none focus:ring-2 focus:ring-orange-400"
    >
      <option value="">Browse...</option>
      {items.map(item => (
        <option key={item.id} value={item.id}>
          – {item.name}
        </option>
      ))}
    </select>
  );
};

export default DropDown;