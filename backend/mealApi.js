const axios = require("axios");
const mongoose = require("mongoose");
const Recipe = require("./models/Recipe");
require("dotenv").config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("🟢 Conectado ao MongoDB");
    importarReceitas();
  })
  .catch((err) => console.error("Erro ao conectar:", err));

async function importarReceitas() {
  try {
    const res = await axios.get("https://www.themealdb.com/api/json/v1/1/search.php?s=");
    const receitas = res.data.meals;

    for (const r of receitas) {
      const novaReceita = new Recipe({
        title: r.strMeal,
        ingredients: [
          r.strIngredient1, r.strIngredient2, r.strIngredient3,
          r.strIngredient4, r.strIngredient5,
        ].filter(Boolean),
        instructions: r.strInstructions,
        image: r.strMealThumb,
      });

      await novaReceita.save();
    }

    console.log("✅ Importação concluída.");
    process.exit(); // encerra o script
  } catch (err) {
    console.error("❌ Erro ao importar receitas:", err.message);
    process.exit(1);
  }
}
