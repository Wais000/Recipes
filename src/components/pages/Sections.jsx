// src/components/pages/Sections.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { API_BASE } from '../../utils/constants';
import Card from '../common/Card';

const Sections = () => {
  const { strCategory } = useParams();
  const { results, loading, error } = useFetch(`${API_BASE}/filter.php?c=${strCategory}`);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#fc910e]" />
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-500 py-8">Error: {error}</p>;
  }

  const meals = results?.meals || [];

  if (meals.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-amber-700 text-lg">No meals found in this category.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-center gap-4 p-8 bg-white/30 rounded-2xl mb-8">
      <div className="w-full text-center mb-8">
        <h2 className="font-serif text-4xl md:text-5xl font-light text-amber-900 mb-2 capitalize tracking-wide">
          {strCategory}
        </h2>
        <p className="font-sans text-amber-700 text-lg">
          {meals.length} {meals.length === 1 ? 'recipe' : 'recipes'} available
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 max-[448px]:gap-3 md:gap-4 justify-items-center">
        {meals.map((meal) => (
          <Card
            key={meal.idMeal}
            to={`/sections/${meal.idMeal}`}
            image={meal.strMealThumb}
            title={meal.strMeal}
          />
        ))}
      </div>
    </div>
  );
};

export default Sections;