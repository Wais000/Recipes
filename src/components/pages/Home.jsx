// src/components/pages/Home.jsx
import React from 'react';
import useFetch from '../../hooks/useFetch';
import { API_BASE } from '../../utils/constants';
import Card from '../common/Card';

const Home = () => {
  const { results, loading, error } = useFetch(`${API_BASE}/categories.php`);

  if (loading) return <p className="text-center text-white">Loading categories...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="flex flex-wrap justify-center gap-4 p-8 bg-white/30 rounded-2xl mb-8">
      {results?.categories?.map((category) => (
        <Card
          key={category.idCategory}
          to={`/home/${category.strCategory}`}
          image={category.strCategoryThumb}
          title={category.strCategory}
        />
      ))}
    </div>
  );
};

export default Home;