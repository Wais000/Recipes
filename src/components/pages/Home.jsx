// src/components/pages/Home.jsx
import React from 'react';
import useFetch from '../../hooks/useFetch';
import { API_BASE } from '../../utils/constants';
import Card from '../common/Card';

const Home = () => {
  const { results, loading, error } = useFetch(`${API_BASE}/categories.php`);

  if (loading) return <p className="text-center text-white">Loading categories...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  const categories = results?.categories || [];

  return (
    <div className="flex flex-wrap justify-center gap-4 p-8 bg-white/30 rounded-2xl mb-8">
      <div className="w-full text-center mb-8">
        <h2 className="font-serif text-4xl md:text-5xl font-light text-amber-900 mb-2 capitalize tracking-wide">
          Categories
        </h2>
        <p className="font-sans text-amber-700 text-lg">
          {categories.length} {categories.length === 1 ? 'category' : 'categories'} available
        </p>
      </div>

      {/* Responsive grid: 2 columns on mobile, up to 5 on large screens */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8 justify-items-center">
        {categories.map((category) => (
          <Card
            key={category.idCategory}
            to={`/home/${category.strCategory}`}
            image={category.strCategoryThumb}
            title={category.strCategory}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;