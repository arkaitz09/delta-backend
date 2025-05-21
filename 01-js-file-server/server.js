const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.post("/api/reservas", (req, res) => {
  const { preferencia, fecha } = req.body;

  if (!preferencia || !fecha) {
    return res.status(400).json({ error: "Faltan datos" });
  }

  const contenido = `🪵 Reserva realizada

🌟 Galería elegida: ${preferencia}
📅 Fecha seleccionada: ${fecha}

Gracias por confiar en nosotros ✨
`;

  const fileName = `reserva_${preferencia}_${fecha}.txt`;
  const filePath = path.join(__dirname, "reservas", fileName);

  fs.mkdirSync(path.dirname(filePath), { recursive: true });

  fs.writeFile(filePath, contenido, (err) => {
    if (err) {
      console.error("Error al guardar el archivo:", err);
      return res.status(500).json({ error: "No se pudo guardar el archivo" });
    }

    res.status(200).json({ message: "Reserva guardada correctamente" });
  });
});

app.listen(PORT, () => {
  console.log(`🟢 Servidor escuchando en http://localhost:${PORT}`);
});
