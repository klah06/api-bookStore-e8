
import express from "express";
import type { Request, Response } from "express";
import Livro, { type InterfaceLivro } from "../models/Livro.js";

const app = express();
app.use(express.json());

// REQUISIÇÃO GET - ROTA INICIAL
app.get("/", (req: Request, res: Response) => {
    res.status(200).send("Codificação BackEnd");
});

// REQUISIÇÃO GET - LISTAR LIVROS
app.get("/livros", (req: Request, res: Response) => {
    try{
        const listaLivros = Livro.find({});
        res.status(200).json(listaLivros);
    }catch (error){
        res.status(500).json({ mensagem: "Erro ao buscar livro."});
    }
    
});

// REQUISIÇÃO POST - CADASTRAR NOVO LIVRO
app.post("/livros", async (req: Request<{}, {}, InterfaceLivro>, res: Response) => {
    try {
        const { title, author, ano_pub, classificacao, num_paginas, estoque, genero, preco, sku } = req.body;

        const novoLivro = await Livro.create({
            title,
            author,
            ano_pub: Number(ano_pub),
            classificacao: Number(classificacao),
            num_paginas: Number(num_paginas),
            estoque: Number(estoque),
            genero,
            preco: Number(preco),
            sku,
        });

        res.status(201).json({
            mensagem: "Livro cadastrado com sucesso!",
            livro: novoLivro
        });

    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao cadastrar livro." });
    }
});

//REQUISIÇÃO PUT (ATUALIZAR DADOS)
app.put("/livros/:id", async (req: Request<{id: string}, {}, InterfaceLivro>, res: Response) => {
    try {
        const { id } = req.params;

        const { title, author, ano_pub, classificacao, num_paginas, estoque, genero, preco, sku } = req.body;

        const livroAtualizado = await Livro.findByIdAndUpdate(
            id,
            {
                title,
            author,
            ano_pub: Number(ano_pub),
            classificacao: Number(classificacao),
            num_paginas: Number(num_paginas),
            estoque,
            genero,
            preco: Number(preco),
            sku
            },
            { new: true }
        );

        if(!livroAtualizado){
            res.status(404).json({mensagem: "Livro não encontrado!"});
            return;
        }

        res.status(200).json({
            mensagem: "Livro atualizado com sucesso!",
            livro: livroAtualizado
        });

    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao atualizar livro."
        });
    }
});

    res.status(200).json({
        mensagem: "Livro atualizado com sucesso!",
        livro: livros[index]
    });

// REQUISIÇÃO PATCH - ATUALIZAÇÃO PARCIAL DO LIVRS
app.patch("/livros/:id", (req: Request, res: Response) => {
    const index = buscaLivro(String(req.params.id));

    if (index === -1) {
        res.status(404).json({
            mensagem: "Livro não encontrado!"
        });
        return;
    }

    const {
        title,
        author,
        ano_pub,
        classificacao,
        num_paginas,
        estoque,
        genero,
        preco,
        sku
    } = req.body;


    livros[index] = {
        ...livros[index]!,
    ...(title !== undefined && { title }),
    ...(author !== undefined && { author }),
    ...(ano_pub !== undefined && { ano_pub: Number(ano_pub) }),
    ...(classificacao !== undefined && { classificacao: Number(classificacao) }),
    ...(num_paginas !== undefined && { num_paginas: Number(num_paginas) }),
    ...(estoque !== undefined && { estoque: Number(estoque) }),
    ...(genero !== undefined && { genero }),
    ...(preco !== undefined && { preco: Number(preco) }),
    ...(sku !== undefined && { sku }),
    };

    res.status(200).json({
        mensagem: "Livro atualizado parcialmente com sucesso!",
        livro: livros[index]
    });
});

// REQUISIÇÃO DELETE - EXCLUIR LIVRO
app.delete("/livros/:id", (req: Request, res: Response) => {
    const index = buscaLivro(String(req.params.id));

    if (index === -1) {
        res.status(404).json({
            mensagem: "Livro não encontrado!"
        });
        return;
    }

    // Remove o livro do array com base no índice
    livros.splice(index, 1);

    res.status(200).json({
        mensagem: "Livro removido com sucesso!"
    });
});

export default app;
