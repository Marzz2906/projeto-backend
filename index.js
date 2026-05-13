require('dotenv').config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => { res.send("Backend TODO App está rodando!"); });
app.get("/api/debug", (req, res) => { res.json({ instance: process.pid, time: new Date() }); });

app.use((req, res, next) => { res.setHeader("Cache-Control", "no-store"); next(); });

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, id-token"
  );
  next();
});

// Rotas
const routes = require("./routes/routes");
app.use("/api", routes);

// Porta (Railway usa automaticamente)
const PORT = process.env.PORT || 3000;

// Conexão com MongoDB
const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
  console.error("ERRO: MONGO_URI não definida no arquivo .env");
  process.exit(1);
}

mongoose.connect(mongoURI);

const db = mongoose.connection;

db.on("error", (error) => {
  console.error("Erro na conexão:", error);
});

db.once("open", () => {
  console.log("Banco conectado com sucesso");
});

// Inicializar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});