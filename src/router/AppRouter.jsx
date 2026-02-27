import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Home from '../components/pages/Home';
import Sections from '../components/pages/Sections';
import Ingredient from '../components/pages/Ingredient';
import SearchResults from '../components/pages/SearchResults';

const AppRouter = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col background-color">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home/:strCategory" element={<Sections />} />
            <Route path="/sections/:idMeal" element={<Ingredient />} />
            <Route path="/search-results" element={<SearchResults />} />
            {/* Optional: handle old drop-down route */}
            <Route path="/drop-down-lists/:strCategory" element={<Sections />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default AppRouter;