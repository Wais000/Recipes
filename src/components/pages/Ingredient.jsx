// src/components/pages/Ingredient.jsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { API_BASE } from '../../utils/constants';

const Ingredient = () => {
  const { idMeal } = useParams();
  const { results, loading, error } = useFetch(`${API_BASE}/lookup.php?i=${idMeal}`);
  const [activeTab, setActiveTab] = useState('instructions');

  if (loading) return <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500" /></div>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  const meal = results?.meals?.[0];
  if (!meal) return <p className="text-center text-gray-600">No recipe found</p>;

  // Extract ingredients
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ing = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ing && ing.trim()) {
      ingredients.push({ ingredient: ing, measure });
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg shadow-xl border border-amber-200/50 overflow-hidden">
        {/* Hero image with title */}
        <div className="relative h-64 md:h-80 border-b border-amber-200/50">
          <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <h1 className="absolute bottom-4 left-4 text-3xl md:text-4xl font-serif font-light text-white tracking-wide drop-shadow-lg">
            {meal.strMeal}
          </h1>
        </div>

        {/* YouTube button – now outside the absolute overlay, centered on mobile */}
        {meal.strYoutube && (
          <div className="flex justify-end px-6 pt-4">
            <a
              href={meal.strYoutube}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-sans text-sm font-medium uppercase tracking-wider rounded-full shadow-md transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
              Watch on YouTube
            </a>
          </div>
        )}

        {/* Tabs */}
        <div className="flex border-b border-amber-200/50 mt-2">
          <button
            onClick={() => setActiveTab('instructions')}
            className={`flex-1 py-3 text-center font-serif text-lg font-light tracking-wide transition-colors duration-300 ${
              activeTab === 'instructions'
                ? 'text-amber-900 border-b-2 border-[#fc910e]'
                : 'text-amber-700 hover:text-amber-900'
            }`}
          >
            Instructions
          </button>
          <button
            onClick={() => setActiveTab('ingredients')}
            className={`flex-1 py-3 text-center font-serif text-lg font-light tracking-wide transition-colors duration-300 ${
              activeTab === 'ingredients'
                ? 'text-amber-900 border-b-2 border-[#fc910e]'
                : 'text-amber-700 hover:text-amber-900'
            }`}
          >
            Ingredients
          </button>
        </div>

        {/* Tab content – unified container */}
        <div className="p-6 bg-white/80 backdrop-blur-[1px] min-h-[300px]">
          {activeTab === 'instructions' ? (
            <div>
              <h2 className="font-serif text-xl font-light text-amber-900 mb-4 tracking-wide">Instructions</h2>
              <p className="text-amber-800 whitespace-pre-line leading-relaxed font-sans">
                {meal.strInstructions}
              </p>
            </div>
          ) : (
            <div>
              <h2 className="font-serif text-xl font-light text-amber-900 mb-4 tracking-wide">Ingredients</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {ingredients.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 p-2 bg-amber-50/50 border border-amber-200/30 rounded">
                    <span className="w-2 h-2 bg-[#fc910e] rounded-full" />
                    <span className="font-serif text-amber-900">{item.ingredient}</span>
                    <span className="text-amber-600 text-sm ml-auto">{item.measure}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Fine gold line at bottom */}
        <div className="h-px bg-gradient-to-r from-amber-300 via-amber-500 to-amber-300" />
      </div>
    </div>
  );
};

export default Ingredient;