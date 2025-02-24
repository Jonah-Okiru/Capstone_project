// Recipe Details page: src/components/RecipeDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
function RecipeDetails(){
    const {id} = useParams();
    const [recipe, setRecipes] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || []);
    const [shoppingList, setShoppingList] = useState(JSON.parse(localStorage.getItem('shoppingList')) || []);
    useEffect(() =>{
        const fetchRecipe = async () => {
            try {
                setError('');
                const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
                const data = response.data.meals[0];
                if (data) {
                    setRecipes(data);
                } else {
                    setError('Recipe not found.');
                }
            } catch (err) {
                setError('Failed to fetch recipe details.');
            }
        };
        fetchRecipe();
    }, [id]);
    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);
    const toggleFavorite = () => {
        if (!recipe) return;
        const updatedFavorites = favorites.some(fav => fav.idMeal === recipe.idMeal)
            ? favorites.filter(fav => fav.idMeal !== recipe.idMeal)
            : [...favorites, recipe];
        setFavorites(updatedFavorites);
    };
useEffect(() => {
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
}, [shoppingList]);
const addToShoppingList = (ingredient, measure) => {
    const updatedList = [...shoppingList, {ingredient, measure, quantity: 1}];
    setShoppingList(updatedList);
}
    if (!recipe) {
        return <p className='text-center'>Loading...</p>
    }
    return (
        <div className='container mx-auto p-4'>
            <h1 className='text-3xl font-bold text-center mb-4'>{recipe.strMeal}</h1>
            <img 
                src={recipe.strMealThumb}  
                alt={recipe.strMeal}
                className='w-full max-w-md mx-auto rounded-lg shadow-lg mb-4'
            />
            <button
                onClick={toggleFavorite} className={`px-3 py-2 rounded ${favorites.some(fav => fav.idMeal === recipe.idMeal) ? 'bg-red-500 text-white' : 'bg-gray-300'}`}
            >
                {favorites.some(fav => fav.idMeal === recipe.idMeal) ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
            <button onClick={() => navigate('/')} className='ml-4 px-3 py-2 bg-blue-500 text-white rounded'>Back to Home</button>
            <div className='mb-4'>
                <h2 className='text-xl font-semibold mb-2'>Ingredients</h2>
                <ul className='list-disc list-inside'>
                    {Array.from({ length: 20}, (_, i) => i+1).map((num) => {
                        const ingredient = recipe[`strIngredient${num}`];
                        const measure = recipe[`strMeasure${num}`];
                        return (
                            ingredient && (
                                <li key={num}>
                                    {ingredient} - {measure}
                                    <button
                                        onClick={() => addToShoppingList(ingredient, measure)}
                                        className='bg-green-500 text-white px-2 py-1 rounded text-sm'
                                    >
                                        Add to Shopping List
                                    </button>
                                </li>
                            )
                        );
                    })}
                    
                </ul>
            </div>
            <div className='mb-4'>
                <h2 className='text-xl font-semibold mb-2'>Instructions</h2>
                <p>{recipe.strInstructions}</p>
            </div>
            {recipe.strYoutube && (
                <div className='mb-4'>
                    <h2 className='text-xl font-semibold mb-2'>Video</h2>
                    <iframe
                        width="100%"
                        height="315"
                        src={recipe.strYoutube.replace('watch?v=' ,'embed/')}
                        title={recipe.strMeal}
                        frameBorder = "0"
                        allowFullScreen
                    ></iframe>
                </div>
            )}
            <button onClick={() => navigate('/shopping-list')} className='px-4 py-2 bg-purple-500 text-white rounded'>View Shopping List</button>
        </div>
    );
}
export default RecipeDetails;