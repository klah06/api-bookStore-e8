
import express from "express";
import type { Request, Response } from "express";
import Livro, { type InterfaceLivro } from "../models/Livro.js"
const app = express();
app.use(express.json());

// REQUISIÇÃO GET - ROTA INICIAL
app.get("/", (req: Request, res: Response) => {
    res.status(200).send("Codificação BackEnd");
});

// REQUISIÇÃO GET - LISTAR LIVROS
app.get("/livros", (req: Request, res: Response) => {
    
    
});

// REQUISIÇÃO POST - CADASTRAR NOVO LIVRO
app.post("/livros", async (req: Request<{}, {}, InterfaceLivro>, res: Response) =>{

});
//REQUISIÇÃO PUT (ATUALIZAR DADOS)
app.put("/livros/:id", async (req: Request<{id: string}, {}, InterfaceLivro>, res: Response) => {
    
});

// REQUISIÇÃO PATCH - ATUALIZAÇÃO PARCIAL DO LIVRS
app.patch("/livros/:id", async (req: Request<{id: string}, {}, InterfaceLivro>, res: Response) => {
    
    });

// REQUISIÇÃO DELETE - EXCLUIR LIVRO
app.delete("/livros/:id", async (req: Request<{id: string}>, res: Response) => {
    

});

export default app;
