import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';

const Form = () => {
  const navigate = useNavigate();
  const searchRef = useRef();
  const [searchInput, setSearchInput] = React.useState('');
  const { results, loading, error } = useFetch(
    searchInput ? `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}` : null
  );

  React.useEffect(() => {
    if (results && searchInput) {
      navigate('/search-results', { state: { results, loading, error } });
    }
  }, [results, searchInput, navigate, loading, error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = searchRef.current.value.trim();
    if (value) {
      setSearchInput(value);
      searchRef.current.value = '';
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full">
      <input
        type="text"
        ref={searchRef}
        placeholder="Search for a recipe..."
        className="flex-grow px-5 py-3 rounded-l-full border-none outline-none text-gray-800 placeholder-gray-500"
      />
      <button
        type="submit"
        className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-r-full hover:bg-orange-600 transition transform hover:scale-105"
      >
        Search
      </button>
    </form>
  );
};

export default Form;