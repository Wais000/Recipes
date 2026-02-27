// src/components/pages/SearchResults.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Card from '../common/Card';

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state || {};
  const { results = null, loading = false, error = null } = state;

  if (!location.state) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center max-w-md bg-white/30 p-8 rounded-2xl backdrop-blur-sm">
          <h2 className="font-serif text-3xl font-light text-amber-900 mb-4">No Search Active</h2>
          <p className="text-amber-700 mb-6">Use the search bar above to find recipes.</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 text-xs font-sans font-medium uppercase tracking-widest text-amber-900 border border-amber-300/50 rounded-none hover:bg-[#fc910e] hover:text-white hover:border-[#fc910e] transition-all duration-500"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#fc910e]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center max-w-md bg-white/30 p-8 rounded-2xl backdrop-blur-sm">
          <p className="text-red-500 text-lg mb-4">Error: {error}</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 text-xs font-sans font-medium uppercase tracking-widest text-amber-900 border border-amber-300/50 rounded-none hover:bg-[#fc910e] hover:text-white hover:border-[#fc910e] transition-all duration-500"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const meals = results?.meals;

  return (
    <div className="flex flex-wrap justify-center gap-4 p-8 bg-white/30 rounded-2xl mb-8">
      <div className="w-full text-center mb-8">
        <h2 className="font-serif text-4xl md:text-5xl font-light text-amber-900 mb-3 tracking-wide">
          Search Results
        </h2>
        <p className="font-sans text-amber-700 text-lg">
          {meals
            ? `Found ${meals.length} recipe${meals.length > 1 ? 's' : ''}`
            : 'No recipes found'}
        </p>
      </div>

      {meals ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
          {meals.map((meal) => (
            <Card
              key={meal.idMeal}
              to={`/sections/${meal.idMeal}`}
              image={meal.strMealThumb}
              title={meal.strMeal}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-8 bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg border border-amber-200/50 max-w-2xl mx-auto">
          <p className="font-serif text-2xl text-amber-900 mb-4">No recipes match your search.</p>
          <p className="text-amber-700 mb-6">Try different keywords or browse categories.</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 text-xs font-sans font-medium uppercase tracking-widest text-amber-900 border border-amber-300/50 rounded-none hover:bg-[#fc910e] hover:text-white hover:border-[#fc910e] transition-all duration-500"
          >
            Browse Categories
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchResults;