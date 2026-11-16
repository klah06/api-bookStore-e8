import type { Request, Response } from "express";
import Livro from "../../models/Livro.js";

class LivroController{

    //GET - LISTAR TODOS OS LIVROS DO BANCO
    static async listar (req: Request, res: Response) {
        try{
        const listaLivros = Livro.find({});
        res.status(200).json(listaLivros);
    }catch (error){
        res.status(500).json({ mensagem: "Erro ao buscar livro."});
    }
    }

//POST - CADASTRAR LIVRO NOVO
static async cadastrar (req: Request, res: Response) {
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
}

//PUT - ATUALIZAR DADOS
static async atualizar (req: Request, res: Response) {
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
}

//PATCH - ATUALIZAR PARCIAL DOS LIVROS
static async atualizarParcial (req: Request, res: Response) {
    try{
        const { id } = req.params;

        const livroAtualizado = await Livro.findByIdAndUpdate(
        id,
        { $set: req.body },
        { returnDocument: 'after' }
        );

        if(!livroAtualizado){
                res.status(404).json({mensagem: "Livro não encontrado!"});
                return;
            }

        res.status(200).json({
            mensagem: "Livro atualizado parcialmente com sucesso!",
            livro: livroAtualizado
        });
    }catch(error){
        res.status(500).json({mensagem: "Erro ao atualizar pacialmente o livro"})
    }
    };

    //DELETE - EXCLUIR LIVRO
    static async deletar (req: Request, res: Response) {
        try{
    const { id } = req.params;

    const livroDeletado = await Livro.findByIdAndDelete(id);

    if (!livroDeletado) {
        res.status(404).json({
            mensagem: "Livro não encontrado!"
    });
        return;
    }

    res.status(200).json({
        mensagem: "Livro removido com sucesso!"
});
}catch(error){
    res.status(500).json({mensagem: "Erro ao remover livros"});
}
    }

}

export default LivroController; 