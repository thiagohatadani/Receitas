const express = require("express");
const router = express.Router();
const Recipe = require("../models/Recipe");

// GET todas as receitas
router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Erro ao buscar receitas", details: err.message });
  }
});

// POST nova receita
router.post("/", async (req, res) => {
  try {
    const newRecipe = new Recipe(req.body);
    const saved = await newRecipe.save();
    res.status(201).json(saved);
  } catch (err) {
    res
      .status(400)
      .json({ error: "Erro ao salvar a receita", details: err.message });
  }
});

// GET receita por ID
router.get("/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe)
      return res.status(404).json({ error: "Receita não encontrada" });
    res.json(recipe);
  } catch (err) {
    res.status(400).json({
      error: "ID inválido ou erro ao buscar receita",
      details: err.message,
    });
  }
});

// PUT atualizar receita
router.put("/:id", async (req, res) => {
  try {
    const updated = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated)
      return res
        .status(404)
        .json({ error: "Receita não encontrada para atualizar" });
    res.json(updated);
  } catch (err) {
    res
      .status(400)
      .json({ error: "Erro ao atualizar a receita", details: err.message });
  }
});

// DELETE receita
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Recipe.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res
        .status(404)
        .json({ error: "Receita não encontrada para deletar" });
    res.json({ message: "Receita deletada com sucesso" });
  } catch (err) {
    res
      .status(400)
      .json({ error: "Erro ao deletar a receita", details: err.message });
  }
});

module.exports = router;
