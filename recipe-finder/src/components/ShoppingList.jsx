import React, { useEffect, useState } from "react";

function ShoppingList() {
    // State to manage the shopping list, retrieving initial values from local storage
    const [shoppingList, setShoppingList] = useState(JSON.parse(localStorage.getItem('shoppingList')) || []);
    // Effect to update local storage whenever the shopping list changes
    useEffect(() => {
        localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
    }, [shoppingList]);
    // Function to update the quantity of an item in the shopping list
    const updateQuantity = (index, newQuantity) => {
        const updatedList = shoppingList.map((item, i) =>
            i === index ? { ...item, quantity: Number(newQuantity) } : item
        );
        setShoppingList(updatedList);
    };
    // Function to remove an item from the shopping list
    const removeItem = (index) => {
        const updatedList = shoppingList.filter((_, i) => i !== index);
        setShoppingList(updatedList);
    };
    // Function to trigger the browser's print functionality
    const printList = () => {
        window.print();
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-center mb-4">Shopping List</h1>
            {/* Display the shopping list */}
            <ul>
                {shoppingList.map((item, index) => (
                    <li key={index} className="flex justify-between items-center p-2 border-b">
                        <span>{item.ingredient} - {item.measure}</span>
                        <input 
                            type="number" 
                            value={item.quantity}
                            min="1"
                            onChange={(e) => updateQuantity(index, e.target.value)}
                            className="w-16 text-center border rounded ml-2 bg-blue-600"
                        />
                        {/* Button to remove item from shopping list */}
                        <button
                            onClick={() => removeItem(index)}
                            className="bg-red-500 text-white px-2 py-1 rounded text-sm"
                        >
                            Remove
                        </button>
                    </li>
                ))}
            </ul>
            {/* Button for printing shopping list */}
            <button
                onClick={printList}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
                Print List
            </button>
        </div>
    );
}

export default ShoppingList;
