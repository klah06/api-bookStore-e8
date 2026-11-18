
import type { Request, Response } from "express";
import Livro from "../../models/Livro.js";

class LivroController {

    // GET - LISTAR TODOS OS LIVROS
    static async listar(req: Request, res: Response) {
        try {
            const listaLivros = await Livro.find({});
            res.status(200).json(listaLivros);

        } catch (error) {
            res.status(500).json({
                mensagem: "Erro ao buscar livros."
            });
        }
    }

    // GET - BUSCAR LIVRO PELO ID
    static async buscarPorId(req: Request<{ id: string }>, res: Response) {
        try {
            const { id } = req.params;

            const livroEncontrado = await Livro.findById(id);

            if (!livroEncontrado) {
                res.status(404).json({
                    mensagem: "Livro não encontrado."
                });
                return;
            }

            res.status(200).json(livroEncontrado);

        } catch (error) {
            res.status(500).json({
                mensagem: "Erro ao buscar livro pelo ID."
            });
        }
    }

    // GET - FILTRAR LIVROS POR CRITÉRIOS OPCIONAIS
    static async buscarPorFiltro(req: Request, res: Response) {
        try {
            const { genero, titulo, autor } = req.query;

            const filtro: Record<string, any> = {};

            if (autor) {
                filtro.author = {$regex: String(autor),
                    $options: "i"
                };
            }

            if (titulo) {
                filtro.title = {
                    $regex: String(titulo),
                    $options: "i"
                };
            }

            if (genero) {
                filtro.genero = {
                    $regex: String(genero),
                    $options: "i"
                };
            }

            const livrosEncontrados = await Livro.find(filtro);

            res.status(200).json(livrosEncontrados);

        } catch (error) {
            res.status(500).json({
                mensagem: "Erro ao filtrar livros."
            });
        }
    }

    // POST - CADASTRAR LIVRO
    static async cadastrar(req: Request, res: Response) {
        try {
            const {
                title,
                author,
                ano_pub,
                classificacao,
                num_paginas,
                estoque,
                genero,
                preco,
                sku,
                cover
            } = req.body;

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
                cover
            });

            res.status(201).json({
                mensagem: "Livro cadastrado com sucesso!",
                livro: novoLivro
            });

        } catch (error) {
            res.status(500).json({
                mensagem: "Erro ao cadastrar livro."
            });
        }
    }

    // PUT - ATUALIZAR DADOS DO LIVRO
    static async atualizar(req: Request<{ id: string }>, res: Response) {
        try {
            const { id } = req.params;

            const {
                title,
                author,
                ano_pub,
                classificacao,
                num_paginas,
                estoque,
                genero,
                preco,
                sku,
                cover
            } = req.body;

            const livroAtualizado = await Livro.findByIdAndUpdate(
                id,
                {
                    title,
                    author,
                    ano_pub: Number(ano_pub),
                    classificacao: Number(classificacao),
                    num_paginas: Number(num_paginas),
                    estoque: Number(estoque),
                    genero,
                    preco: Number(preco),
                    sku,
                    cover
                },
                {
                    new: true,
                    runValidators: true
                }
            );

            if (!livroAtualizado) {
                res.status(404).json({
                    mensagem: "Livro não encontrado!"
                });
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

    // PATCH - ATUALIZAR PARCIALMENTE O LIVRO
    static async atualizarParcial(req: Request<{ id: string }>, res: Response) {
        try {
            const { id } = req.params;

            const livroAtualizado = await Livro.findByIdAndUpdate(
                id,
                { $set: req.body },
                {
                    new: true,
                    runValidators: true
                }
            );

            if (!livroAtualizado) {
                res.status(404).json({
                    mensagem: "Livro não encontrado!"
                });
                return;
            }

            res.status(200).json({
                mensagem: "Livro atualizado parcialmente com sucesso!",
                livro: livroAtualizado
            });

        } catch (error) {
            res.status(500).json({
                mensagem: "Erro ao atualizar parcialmente o livro."
            });
        }
    }

    // DELETE - EXCLUIR LIVRO
    static async deletar(req: Request<{ id: string }>, res: Response) {
        try {
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

        } catch (error) {
            res.status(500).json({
                mensagem: "Erro ao remover livro."
            });
        }
    }
}

export default LivroController;
