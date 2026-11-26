
import type { Request, Response } from "express";
import Livro from "../models/Livro.js";
import type { ILivroRepository, LivroDTO, FiltroLivroDTO } from "../../repositories/ILivroRepository.js";

class LivroController {

    private livroRepository: ILivroRepository;

        constructor (livroRepository: ILivroRepository){
            this.livroRepository = livroRepository;
    }

    // GET - LISTAR TODOS OS LIVROS
    async listar(req: Request, res: Response) {


        try {
            const listaLivros = await this.livroRepository.listar();
            res.status(200).json(listaLivros);

        } catch (error) {
            res.status(500).json({
                mensagem: "Erro ao buscar livros."
            });
        }
    }

    // GET - BUSCAR LIVRO PELO ID
    async buscarPorId(req: Request<{ id: string }>, res: Response) {
        try {
            const { id } = req.params;

            const livroEncontrado = await this.livroRepository.buscarPorId(id);

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
    async buscarPorFiltro(req: Request, res: Response) {
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

            const livrosEncontrados = await this.livroRepository.buscarPorFiltro(filtro);

            res.status(200).json(livrosEncontrados);

        } catch (error) {
            res.status(500).json({
                mensagem: "Erro ao filtrar livros."
            });
        }
    }

    // POST - CADASTRAR LIVRO
    async cadastrar(req: Request, res: Response) {
        try {

            const novoLivro = await this.livroRepository.cadastrar(req.body);

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
    async atualizar(req: Request<{ id: string }>, res: Response) {
        try {
            const { id } = req.params;
            const livroAtualizado = await this.livroRepository.atualizar(id, req.body);

            if (!livroAtualizado) {
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

    // PATCH - ATUALIZAR PARCIALMENTE O LIVRO
    async atualizarParcial(req: Request<{ id: string }>, res: Response) {
        try {
            const { id } = req.params;

            const livroAtualizado = await this.livroRepository.atualizar(id, req.body);

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

    // DELETE - EXCLUIR LIVRO//
    async deletar(req: Request<{ id: string }>, res: Response) {
        try {
            const { id } = req.params;

            const livroDeletado = await this.livroRepository.deletar(id);

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
