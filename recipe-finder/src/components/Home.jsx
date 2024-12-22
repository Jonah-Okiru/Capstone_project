// Home page: src/components/Home.jsx
import React, {useState} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
function HomePage(){
    const [query, setQuery] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [error, setError] = useState('');
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
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-center mb-6">Recipe Finder</h1>
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
            {error && <p className="text-red-500 text-center">{error}</p>}
            <div className="grid grid-cols-1 md: grid-cols-2 lg:grid-cols-4 gap-3">
                {recipes.map((recipe) =>(
                    <div key={recipe.idMeal} className="border rounded-lg overflow-hidden shadow-lg bg-white">
                        <img src={recipe.strMealThumb} alt={recipe.strMeal} className="w-full h-48 object-cover" />
                        <div className="p-4">
                            <h2 className="text-lg font-bold">{recipe.strMeal}</h2>
                            <p className="text-sm text-gray-600">{recipe.strCategory}</p>
                            <p className="text-sm text-gray-600">Cusine: {recipe.strArea}</p>
                            <Link to={`/recipe/${recipe.idMeal}`} className="text-sm hover: underline mt-2 inline-block">
                                View Details
                            </Link>

                        </div>
                    </div>
                ))}

            </div>

        </div>
    );
}
export default HomePage;