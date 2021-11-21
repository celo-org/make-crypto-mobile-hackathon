import express from "express";
import { routes } from "./routes";
import { connect1 } from "./services/db";

const PORT = process.env.PORT || 3000;

const app = express();

// Ler JSON
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.use("/v1", routes);

connect1()
  .then(() => {
    // TODO: Colocar essa conexão em outro lugar
    // Ou colocar dentro de uma função assincrona
    app.listen(PORT, () => {
      console.log("Servidor iniciado locaohost:3000" + PORT)

    });
    console.log('Aplicação no Ar!')
    // Porta para acesso
  })
  .catch((err) => console.log(err));
