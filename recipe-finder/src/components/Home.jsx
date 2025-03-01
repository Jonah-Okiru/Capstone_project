// Home page: src/components/Home.jsx
import React, {useEffect, useState} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
function HomePage(){
    // State variables for search query, fetched recipes, errors, favorites, and categories.
    const [query, setQuery] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [error, setError] = useState('');
    const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || []);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    // Store favorites in local storage whenever they change.
    useEffect(() =>{
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);
    // Fetch available meal categories from API on component mount
    useEffect(() =>{
        const fetchCategories = async () => {
            try {
                const response = await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php');
                setCategories(response.data.categories.map(cat => cat.strCategory));
            } catch (err) {
                console.error('Failed to fetch categories');
            }
        };
        fetchCategories();
    }, []);
    // Fetch recipes based on the search query.
    const fetchRecipes = async () => {
        try {
            setError('');
            const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
            const data = response.data.meals;
            if (data) {
                setRecipes(data);
            } else {
                setError('No recipes found. Try another search.');
            }
        } catch (err) {
            setError('Failed to fetch recipes. Kindly try again later');
        }
    };
    // Fetch recipes based on selected category.
    const fetchRecipesByCategory = async (category) => {
        try {
            setError('');
            const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
            setRecipes(response.data.meals || []);
        } catch (err) {
            setError('Failed to fetch recipes by category. Try again later.');
        }
    }
    // Add or remove a recipe from favorites.
    const toggleFavorite = (recipe) => {
        const updatedFavorites = favorites.some(fave => fave.idMeal === recipe.idMeal)
            ? favorites.filter(fav => fav.idMeal !== recipe.idMeal)
            : [...favorites, recipe];
        setFavorites(updatedFavorites);
    }
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-center mb-6">Recipe Finder</h1>
            {/* Search bar */}
            <div className="flex justify-center">
                <input
                    type="text"
                    placeholder="Search for a recipe"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="border rounded-1-lg p-2 w-2/3 " 
                />
                <button onClick={fetchRecipes} className="bg-blue-500 text-white rounded-r-lg px-4 py-2 hover: bg-blue-600">
                    Search
                </button>
            </div>
            {/* Category selection dropdown */}
            <div className="flex justify-center mt-4">
                <select 
                    onChange={(e) =>{
                        setSelectedCategory(e.target.value)
                        fetchRecipesByCategory(e.target.value)
                    }}
                    value={selectedCategory}
                    className="border rounded p-2 bg-green-300"
                >
                    <option value="">Select a Category</option>
                    {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>
            </div>
            {/* Error message display */}
            {error && <p className="text-red-500 text-center">{error}</p>}
            {/* Recipe list */}
            <div className="bg-pink-400 grid grid-cols-1 md: grid-cols-2 lg:grid-cols-4 gap-3">
                {recipes.map((recipe) =>(
                    <div key={recipe.idMeal} className="border rounded-lg overflow-hidden shadow-lg bg-white">
                        <img src={recipe.strMealThumb} alt={recipe.strMeal} className="w-full h-48 object-cover" />
                        <div className="p-4">
                            <h2 className="text-lg font-bold text-gray-600">{recipe.strMeal}</h2>
                            <p className="text-sm text-gray-600">{recipe.strCategory}</p>
                            <p className="text-sm text-gray-600">Cusine: {recipe.strArea}</p>
                            {/* Favorite button */}
                            <button
                                className={`mt-2 px-3 py-1 rounded ${favorites.some(fav => fav.idMeal === recipe.idMeal) ? 'bg-red-500 text-white' : 'bg-gray-300' }`}
                                onClick={() => toggleFavorite(recipe)}
                            >
                                {favorites.some(fav => fav.idMeal === recipe.idMeal) ? 'Remove from Favorites' : 'Add to Favorites'}
                            </button>
                            {/* View details link */}
                            <Link to={`/recipe/${recipe.idMeal}`} className="text-sm bg-green-300  hover: underline mt-2 inline-block">
                                View Details
                            </Link>

                        </div>
                    </div>
                ))}

            </div>
            {/* Favorite recipes list */}
            <h2 className="text-2xl font-bold text-center mt-6">Favorite list</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
                {favorites.map((recipe) => (
                    <div key={recipe.idMeal} className="border rounded-lg overflow-hidden shadow-lg bg-white">
                        <img src={recipe.strMealThumb} alt={recipe.strMeal} className="w-full h-48 object-cover" />
                        <div className="p-4">
                            <h2 className="text-lg font-bold">{recipe.strMeal}</h2>
                            <button
                                className="mt-2 px-3 py-1 rounded bg-red-500 text-white"
                                onClick={() => toggleFavorite(recipe)}
                            >
                                Remove from Favorites
                            </button>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}
export default HomePage;