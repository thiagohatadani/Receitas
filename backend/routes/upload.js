const express = require("express");
const router = express.Router();
const { upload } = require("../config/cloudinary");

router.post("/", upload.single("image"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Nenhum arquivo enviado." });
    }

    res.json({ imageUrl: req.file.path });
  } catch (err) {
    console.error("Erro no upload:", err);
    res.status(500).json({ error: "Erro no upload da imagem." });
  }
});

module.exports = router;
