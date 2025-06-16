import { useState } from "react";
import Modal from "./Modal";

export default function RecipeList({ recipes, refreshRecipes }) {
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    title: "",
    ingredients: "",
    instructions: "",
    image: "",
  });
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const handleCardClick = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const closeModal = () => {
    setSelectedRecipe(null);
    setEditingId(null);
  };

  return (
    <div className="p-4 bg-amber-100">
      <h1 className="text-2xl font-bold mb-4">Catálogo de Receitas</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {recipes.map((recipe) => (
          <div
            key={recipe._id}
            className="cursor-pointer 	bg-gray-100 shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            onClick={() => handleCardClick(recipe)}
          >
            <img
              src={recipe.image || "/placeholder-food.jpg"}
              alt={recipe.title}
              className="w-full h-32 object-cover"
            />
            <p className="p-2 text-sm font-medium text-center truncate">
              {recipe.title}
            </p>
          </div>
        ))}
      </div>

      <Modal isOpen={!!selectedRecipe} onClose={closeModal}>
        {selectedRecipe && (
          <div className="p-4 max-h-[80vh] overflow-y-auto">
            {editingId === selectedRecipe._id ? (
              <>
                <input
                  name="title"
                  className="w-full font-semibold text-lg mb-2 border p-1 rounded"
                  value={editData.title}
                  onChange={handleEditChange}
                />
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold mb-4">
                  {selectedRecipe.title}
                </h2>
                <img
                  src={selectedRecipe.image}
                  alt={selectedRecipe.title}
                  className="w-full h-48 object-cover rounded mb-4"
                />

                <div className="mb-4">
                  <h3 className="font-semibold mb-2"> Ingredientes</h3>
                  <ul className="list-disc list-inside grid grid-cols-2 gap-2">
                    {selectedRecipe.ingredients.map((item, i) => (
                      <li key={i} className="text-sm">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-4">
                  <h3 className="font-semibold mb-2"> Modo de Preparo</h3>
                  <p className="text-sm whitespace-pre-line">
                    {selectedRecipe.instructions}
                  </p>
                </div>

                <div className="flex gap-2 justify-end">
                  <button
                    onClick={() => startEditing(selectedRecipe)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(selectedRecipe._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Deletar
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
