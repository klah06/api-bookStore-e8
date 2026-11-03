import express from "express";
import type { Request, Response } from "express";

export interface Livro {
    id: number;
    title: string;
    author: string;
    ano_pub: number;
    classificacao: number;
    num_paginas: number;
    sinopse: string;
}

const app = express();
app.use(express.json());

const livros: Livro[] = [
    {
        id: 1,
        title: "No Fundo é Amor",
        author: "Ali Hazelwood",
        ano_pub: 2025,
        classificacao: 18,
        num_paginas: 364,
        sinopse:
    },

    {
        id: 2,
        title: "Belo Veneno",
        author: "Rina Kent",
        ano_pub: 2026,
        classificacao: 18,
        num_paginas: 352,
        sinopse:
        
    }

    {
        id: 3,
        title: "Minha Melhor Parte",
        author: "Hannah Bonam-Young",
        ano_pub: 2024,
        classificacao: 18,
        num_paginas: 352,
        sinopse:
        
    }

    {
        id: 4,
        title: "Sua Faca, Meu Coração",
        author: "K. M. Moronova",
        ano_pub: 2026,
        classificacao: 18,
        num_paginas: 288,
        sinopse:
    }
]

//FUNÇÕES
function buscaLivro(id: string | number): number {
    return livros.findIndex(livro => {
        return livro.id === Number(id);
    });
}

//REQUISIÇÕES
app.get("/", (req: Request, res: Response) => {
    res.status(200).send("Codificação BackEnd");
});

app.get("/livros", (req: Request, res: Response) => {
    res.status(200).json(livros);
});

//REQUISIÇÃO POST (CADASTRAR NOVO LIVRO)
app.post("/livros", (req: Request, res: Response) => {
    const { id, title, author, ano_pub } = req.body;

    const novoLivro: Livro = {
        id: Number(id),
        title,
        author,
        ano_pub: Number(ano_pub),
        classificacao,
        num_paginas,
        sinopse
    };

    livros.push(novoLivro);

    res.status(201).json({
        mensagem: "Livro cadastrado com sucesso!",
        livro: novoLivro
    });
});

//REQUISIÇÃO PUT (ATUALIZAR DADOS)
app.put("/livros/:id", (req, res) => {
    const index = buscaLivro(req.params.id);

    const { title, author, ano_pub } = req.body;

    livros[index] = {
        ...livros[index],
        title,
        author,
        ano_pub
    };

    res.status(200).json({
        mensagem: "Livro atualizado com sucesso!",
        livro: livros[index]
    });
});

export default app;