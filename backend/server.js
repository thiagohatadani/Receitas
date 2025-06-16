require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const recipeRoutes = require("./routes/recipes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/recipes", recipeRoutes);

const uploadRoute = require("./routes/upload");
app.use("/api/upload", uploadRoute);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("🟢 Conectado ao MongoDB");
    app.listen(3001, () => {
      console.log("🚀 Servidor rodando em http://localhost:3001");
    });
  })
  .catch((err) => console.error("Erro na conexão MongoDB:", err));
