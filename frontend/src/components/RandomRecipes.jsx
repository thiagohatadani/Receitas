import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "./Modal";

export default function RandomRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchRandomRecipes = async () => {
    setIsLoading(true);
    try {
      const promises = Array.from({ length: 6 }, () =>
        axios.get("https://www.themealdb.com/api/json/v1/1/random.php")
      );
      const results = await Promise.all(promises);
      const meals = results.map((res) => res.data.meals[0]);
      setRecipes(meals);
    } catch (err) {
      console.error("Erro ao buscar receitas aleatórias:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomRecipes();
  }, []);

  const getIngredients = (meal) => {
    return Array.from({ length: 20 }, (_, i) => {
      const ingredient = meal[`strIngredient${i + 1}`];
      const measure = meal[`strMeasure${i + 1}`];
      return ingredient && measure ? `${measure} ${ingredient}` : null;
    }).filter((item) => item);
  };

  const handleCardClick = (meal) => {
    setSelectedMeal(meal);
  };

  const closeModal = () => {
    setSelectedMeal(null);
  };

  return (
    <div className=" p-4 bg-amber-100">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold"> Receitas Aleatórias</h3>
        <button
          onClick={fetchRandomRecipes}
          disabled={isLoading}
          className="bg-red-800 text-white px-4 py-2 rounded hover:bg-red-900 transition flex items-center gap-2"
        > Carregar outras receitas
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {recipes.map((meal) => (
          <div
            key={meal.idMeal}
            className="text-center cursor-pointer 	bg-gray-100 shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow pb-2"
            onClick={() => handleCardClick(meal)}
          >
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className="w-full h-32 object-cover rounded-lg shadow"
            />
            <p className="mt-2 text-sm font-medium">{meal.strMeal}</p>
          </div>
        ))}
      </div>

      <Modal isOpen={!!selectedMeal} onClose={closeModal}>
        {selectedMeal && (
          <div className="p-4 max-h-[80vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">{selectedMeal.strMeal}</h2>
            <img
              src={selectedMeal.strMealThumb}
              alt={selectedMeal.strMeal}
              className="w-full h-48 object-cover rounded mb-4"
            />

            <div className="mb-4">
              <h3 className="font-semibold mb-2"> Ingredientes</h3>
              <ul className="list-disc list-inside grid grid-cols-2 gap-2">
                {getIngredients(selectedMeal).map((item, i) => (
                  <li key={i} className="text-sm">{item}</li>
                ))}
              </ul>
            </div>

            <div className="mb-4">
              <h3 className="font-semibold mb-2"> Modo de Preparo</h3>
              <p className="text-sm whitespace-pre-line">
                {selectedMeal.strInstructions}
              </p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}