
import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './components/Home';
import RecipeDetails from './components/RecipeDetails';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
      </Routes>
    </div>
  );
}

export default App;