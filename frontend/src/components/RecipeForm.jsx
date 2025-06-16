import { useState } from "react";
import axios from "axios";

export default function RecipeForm({ onRecipeAdded }) {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = "";

      if (image) {
        const formData = new FormData();
        formData.append("image", image);

        const uploadRes = await axios.post(
          "http://localhost:3001/api/upload",
          formData
        );
        imageUrl = uploadRes.data.imageUrl;
      }

      const newRecipe = {
        title,
        ingredients: ingredients.split(",").map((i) => i.trim()),
        instructions,
        image: imageUrl,
      };

      const res = await axios.post(
        "http://localhost:3001/api/recipes",
        newRecipe
      );
      console.log("Receita adicionada:", res.data);
      onRecipeAdded();

      setTitle("");
      setIngredients("");
      setInstructions("");
      setImage(null);
    } catch (err) {
      console.error("Erro ao adicionar receita:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-2xl shadow mb-6"
    >
      <h2 className="text-xl font-semibold mb-4"> Adicionar Receita</h2>

      <div className="mb-4">
        <label className="block font-medium">Título</label>
        <input
          type="text"
          className="w-full border rounded px-3 py-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium">
          Ingredientes (separados por vírgula)
        </label>
        <input
          type="text"
          className="w-full border rounded px-3 py-2"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium">Instruções</label>
        <textarea
          className="w-full border rounded px-3 py-2"
          rows="3"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium">Imagem</label>
        <input
          type="file"
          accept="image/*"
          className="w-full border rounded px-3 py-2"
          onChange={(e) => setImage(e.target.files[0])}
        />
      </div>

      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
      >
        Salvar Receita
      </button>
    </form>
  );
}
