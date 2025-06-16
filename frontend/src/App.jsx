import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { Header } from "./components/Header";
import { SearchBar } from "./components/SearchBar";
import { Stats } from "./components/Stats";
import RandomRecipes from "./components/RandomRecipes";
import { RecipeModal } from "./components/RecipeModal";
import RecipeList from "./components/RecipeList";
import axios from "axios";
import { AddRecipeButton } from "./components/AddRecipeButton";
import Footer from "./components/Footer";

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recipes, setRecipes] = useState([]); // Estado das receitas
  const [searchTerm, setSearchTerm] = useState(""); // Estado da busca

  // Função para buscar receitas
  const fetchRecipes = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/recipes");
      setRecipes(res.data);
    } catch (err) {
      console.error("Erro ao buscar receitas:", err);
    }
  };

  // Busca inicial
  useEffect(() => {
    fetchRecipes();
  }, []);

  // Filtra as receitas
  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <Header />
      <SearchBar onSearch={setSearchTerm} />
      <AddRecipeButton onRecipeAdded={fetchRecipes} />
      <Stats count={recipes.length} />
      <RecipeModal />
      <RandomRecipes />
      <RecipeList recipes={filteredRecipes} refreshRecipes={fetchRecipes} />
      <Footer/>
    </>
  );
}
