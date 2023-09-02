const express = require("express");
const { Client } = require("pg");
const cors = require("cors");

const app = express();

const client = new Client({
  host: "dpg-cjothim1208c738hvtlg-a.oregon-postgres.render.com",
  port: 5432,
  database: "my_portfolio_fmzg",
  user: "phantoxe",
  password: "tR0ievJUi1dUNjX9Fu5wcLrMN8oGkBvt",
  ssl: { rejectUnauthorized: false },
});

client
  .connect()
  .then(() => console.log("Conectado !"))
  .catch((err) => console.error("Erro de conexão", err));

app.use(cors());
app.use(express.json());

app.post("/users", async (req, res) => {
  //   res.status(200).json({ message: "Entrei na minha rota" });
  // });
  const { id, name, address } = req.body;
  const newUser = await client.query(
    "INSERT INTO users (id, name, address) VALUES ($1,$2,$3) RETURNING *",
    [id, name, address]
  );
  res.status(200).json({ message: "Entrou no Users!", user: newUser.rows[0] });
});

app.get("/users", async (req, res) => {
  const allUsers = await client.query("SELECT * FROM users");
  res.status(200).json({ message: "Entrei no meu GET!", users: allUsers.rows });
});

// app.delete("/users/:id", async (req, res) => {
//   const id = req.params.id;
//   try {
//     await client.query("DELETE FROM users WHERE id = $1", [id]);
//     res.status(204).send();
//   } catch (error) {
//     res.status(500).send();
//   }
// });

// app.patch("/users/:id", async (req, res) => {
//   const { name, address } = req.body;
//   const id = req.params.id;
//   try {
//     await client.query("PATCH FROM users WHERE id = $1", [id]);
//     res.status(200).send();
//   } catch (error) {
//     res.status(204).send();
//   }
// });

app.listen(5000, () => {
  console.log("Servidor Rodando");
});
