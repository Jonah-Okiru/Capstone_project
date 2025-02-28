import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './components/Home';
import RecipeDetails from './components/RecipeDetails';
import ShoppingList from './components/ShoppingList';

function App() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('darkMode') === 'true'
  );

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black-800'}`}>
      <div className="flex justify-end p-4">
        <button 
          onClick={() => setDarkMode(!darkMode)} 
          className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
        >
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
        <Route path="/shopping-list" element={<ShoppingList />} />
      </Routes>
    </div>
  );
}

export default App;
