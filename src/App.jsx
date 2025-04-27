import React, { useEffect, useState, useCallback } from 'react';
import List from './List';

const LOCAL_DATA = {
  fruits: [
    {id: 1, name: "apple", calories: 95},
    {id: 2, name: "orange", calories: 45},
    {id: 3, name: "banana", calories: 105},
    {id: 4, name: "coconut", calories: 159},
    {id: 5, name: "pineapple", calories: 37},
    {id: 31, name: "strawberry", calories: 32},
    {id: 32, name: "blueberry", calories: 57},
    {id: 33, name: "grape", calories: 69},
    {id: 34, name: "mango", calories: 99},
    {id: 35, name: "watermelon", calories: 30},
    {id: 36, name: "peach", calories: 59},
    {id: 37, name: "pear", calories: 57},
    {id: 38, name: "kiwi", calories: 41},
    {id: 39, name: "avocado", calories: 160},
    {id: 40, name: "pomegranate", calories: 83}
  ],
  vegetables: [
    {id: 6, name: "potatoes", calories: 110},
    {id: 7, name: "celery", calories: 15},
    {id: 8, name: "carrots", calories: 25},
    {id: 9, name: "corn", calories: 63},
    {id: 10, name: "broccoli", calories: 50},
    {id: 41, name: "spinach", calories: 23},
    {id: 42, name: "lettuce", calories: 15},
    {id: 43, name: "tomato", calories: 18},
    {id: 44, name: "cucumber", calories: 16},
    {id: 45, name: "onion", calories: 40},
    {id: 46, name: "garlic", calories: 149},
    {id: 47, name: "bell pepper", calories: 31},
    {id: 48, name: "zucchini", calories: 17},
    {id: 49, name: "eggplant", calories: 25},
    {id: 50, name: "mushrooms", calories: 22}
  ],
  proteins: [
    {id: 11, name: "chicken breast", calories: 165},
    {id: 12, name: "salmon", calories: 208},
    {id: 13, name: "eggs", calories: 143},
    {id: 14, name: "tofu", calories: 76},
    {id: 15, name: "beef", calories: 250},
    {id: 51, name: "pork", calories: 242},
    {id: 52, name: "turkey", calories: 135},
    {id: 53, name: "tuna", calories: 144},
    {id: 54, name: "shrimp", calories: 99},
    {id: 55, name: "lentils", calories: 116},
    {id: 56, name: "chickpeas", calories: 164},
    {id: 57, name: "black beans", calories: 132},
    {id: 58, name: "tempeh", calories: 193},
    {id: 59, name: "cod", calories: 82},
    {id: 60, name: "duck", calories: 337}
  ],
  grains: [
    {id: 16, name: "rice", calories: 130},
    {id: 17, name: "quinoa", calories: 120},
    {id: 18, name: "oats", calories: 68},
    {id: 19, name: "whole wheat bread", calories: 69},
    {id: 20, name: "pasta", calories: 131},
    {id: 61, name: "buckwheat", calories: 343},
    {id: 62, name: "barley", calories: 354},
    {id: 63, name: "bulgur", calories: 83},
    {id: 64, name: "millet", calories: 119},
    {id: 65, name: "rye bread", calories: 259},
    {id: 66, name: "couscous", calories: 112},
    {id: 67, name: "spelt", calories: 338},
    {id: 68, name: "cornmeal", calories: 370},
    {id: 69, name: "wild rice", calories: 101},
    {id: 70, name: "sourdough bread", calories: 289}
  ],
  dairy: [
    {id: 21, name: "milk", calories: 103},
    {id: 22, name: "cheese", calories: 113},
    {id: 23, name: "yogurt", calories: 59},
    {id: 24, name: "butter", calories: 102},
    {id: 25, name: "ice cream", calories: 207},
    {id: 71, name: "cottage cheese", calories: 98},
    {id: 72, name: "cream", calories: 340},
    {id: 73, name: "sour cream", calories: 193},
    {id: 74, name: "goat cheese", calories: 364},
    {id: 75, name: "feta", calories: 264},
    {id: 76, name: "parmesan", calories: 431},
    {id: 77, name: "mozzarella", calories: 280},
    {id: 78, name: "kefir", calories: 67},
    {id: 79, name: "condensed milk", calories: 321},
    {id: 80, name: "ghee", calories: 900}
  ],
  snacks: [
    {id: 26, name: "chips", calories: 152},
    {id: 27, name: "chocolate", calories: 546},
    {id: 28, name: "nuts", calories: 607},
    {id: 29, name: "popcorn", calories: 375},
    {id: 30, name: "cookies", calories: 502},
    {id: 81, name: "pretzels", calories: 380},
    {id: 82, name: "granola bar", calories: 471},
    {id: 83, name: "crackers", calories: 502},
    {id: 84, name: "dried fruit", calories: 359},
    {id: 85, name: "trail mix", calories: 462},
    {id: 86, name: "protein bar", calories: 400},
    {id: 87, name: "rice cakes", calories: 35},
    {id: 88, name: "jerky", calories: 410},
    {id: 89, name: "cheese puffs", calories: 563},
    {id: 90, name: "fruit snacks", calories: 350}
  ]
};

function App() {
  const [foodData, setFoodData] = useState(LOCAL_DATA);
  const [apiStatus, setApiStatus] = useState("Loading...");
  const [lastUpdate, setLastUpdate] = useState(new Date().toLocaleTimeString());

  const testApiConnection = useCallback(async () => {
    try {
      const response = await fetch('https://trackapi.nutritionix.com/v2/search/instant?query=apple', {
        headers: {
          'x-app-id': import.meta.env.VITE_NUTRITIONIX_ID,
          'x-app-key': import.meta.env.VITE_NUTRITIONIX_KEY
        }
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("API failure:", error.message);
      throw error;
    }
  }, []);

  const loadData = useCallback(async () => {
    try {
      setApiStatus("Connecting to Nutritionix...");
      
      const apiData = await testApiConnection();
      setApiStatus("Connected - Online Data");
      
      if (apiData.common) {
        setFoodData({
          fruits: apiData.common
            .filter(item => item.nf_calories)
            .slice(0, 15)
            .map(item => ({
              id: item.food_name,
              name: item.food_name,
              calories: Math.round(item.nf_calories)
            })),
          vegetables: LOCAL_DATA.vegetables,
          proteins: LOCAL_DATA.proteins,
          grains: LOCAL_DATA.grains,
          dairy: LOCAL_DATA.dairy,
          snacks: LOCAL_DATA.snacks
        });
      }
    } catch {
      setApiStatus("Offline Mode - Local Data");
      setFoodData(LOCAL_DATA);
    } finally {
      setLastUpdate(new Date().toLocaleTimeString());
    }
  }, [testApiConnection]);

  useEffect(() => {
    loadData();
    
    const interval = setInterval(loadData, 600000);
    return () => clearInterval(interval);
  }, [loadData]);

  return (
    <div className="app-container">
      <h1>Nutrition Information</h1>
      
      <div className="status-bar">
        <span className={`status ${apiStatus.includes("Offline") ? "offline" : "online"}`}>
          {apiStatus}
        </span>
        <span className="update-time">Last updated: {lastUpdate}</span>
      </div>

      <div className="lists-container">
        {Object.entries(foodData).map(([category, items]) => (
          <List 
            key={category} 
            items={items} 
            category={category.charAt(0).toUpperCase() + category.slice(1)} 
          />
        ))}
      </div>
    </div>
  );
}

export default App;