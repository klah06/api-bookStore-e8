
import express from "express";
import type { Request, Response } from "express";
import livroRoutes from "./routes/livroRoutes.js";
import { swaggerDocument } from "./docs/swagger.js";
import swaggerUi from "swagger-ui-express";

const app = express();
app.use(express.json());

//MIDDLEWARE
app.use(express.json());
app.set("json spaces", 2)

//ROTAS DA DOCUMENTAÇÃO INTERATiva (SWAGGER)
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))

// ROTA BASE
app.get("/", (req: Request, res: Response) => {
    res.status(200).send("BookStore - Smart Library");
});

//REGISTRAR AS ROTAS DE "LIVROS" NA APLICAÇÃO.
app.use(livroRoutes);

export default app;
