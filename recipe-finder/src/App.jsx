
import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './components/Home';
import RecipeDetails from './components/RecipeDetails';
import ShoppingList from './components/ShoppingList';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
        <Route path="/shopping-list" element={<ShoppingList />} />
      </Routes>
    </div>
  );
}

export default App;