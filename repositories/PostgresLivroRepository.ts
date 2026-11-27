import { randomUUID } from "node:crypto";
import prisma from "../config/dbConnectPostgres.js";
import type { Livro as PrismaLivro } from "../generated/prisma/client.js";
import type { ILivroRepository, LivroDTO, FiltroLivroDTO } from "./ILivroRepository.js";

export class PostgresLivroRepository implements ILivroRepository {
    /**
     * Converte o registro retornado pelo Prisma para o formato esperado pelo LivroDTO,
     * tratando a diferença de tipagem do campo `classificacao` (String no banco -> number no DTO).
     */
    private toDTO(livro: PrismaLivro): LivroDTO {
        return {
            id: livro.id,
            title: livro.title,
            author: livro.author,
            ano_pub: livro.ano_pub,
            classificacao: Number(livro.classificacao),
            num_paginas: livro.num_paginas,
            estoque: livro.estoque,
            genero: livro.genero,
            preco: livro.preco,
            sku: livro.sku,
            cover: livro.cover,
        };
    }

    /**
     * Verifica se o erro lançado pelo Prisma corresponde a registro não encontrado (P2025).
     */
    private isRecordNotFoundError(error: unknown): boolean {
        return (
            typeof error === "object" &&
            error !== null &&
            "code" in error &&
            (error as { code?: string }).code === "P2025"
        );
    }

    async listar(): Promise<LivroDTO[]> {
        const livros = await prisma.livro.findMany();
        return livros.map((livro) => this.toDTO(livro));
    }

    async buscarPorId(id: string): Promise<LivroDTO | null> {
        const livro = await prisma.livro.findUnique({
            where: { id },
        });

        return livro ? this.toDTO(livro) : null;
    }

    async buscarPorFiltro(filtros: FiltroLivroDTO): Promise<LivroDTO[]> {
        const livros = await prisma.livro.findMany({
            where: {
                ...(filtros.genero && { genero: filtros.genero }),
                ...(filtros.autor && {
                    author: {
                        contains: filtros.autor,
                        mode: "insensitive",
                    },
                }),
                ...(filtros.titulo && {
                    title: {
                        contains: filtros.titulo,
                        mode: "insensitive",
                    },
                }),
            },
        });

        return livros.map((livro) => this.toDTO(livro));
    }

    async cadastrar(dados: LivroDTO): Promise<LivroDTO> {
        const livroCriado = await prisma.livro.create({
            data: {
                ...(dados.id && { id: dados.id }),
                title: dados.title,
                author: dados.author,
                ano_pub: dados.ano_pub,
                classificacao: String(dados.classificacao),
                num_paginas: dados.num_paginas,
                estoque: dados.estoque,
                genero: dados.genero,
                preco: dados.preco ?? 0,
                sku: dados.sku ?? randomUUID(),
                // Quando undefined, o Prisma aplica automaticamente o @default do schema
                cover: dados.cover ?? undefined,
            },
        });

        return this.toDTO(livroCriado);
    }

    async atualizar(id: string, dados: LivroDTO): Promise<LivroDTO | null> {
        try {
            const livroAtualizado = await prisma.livro.update({
                where: { id },
                data: {
                    title: dados.title,
                    author: dados.author,
                    ano_pub: dados.ano_pub,
                    classificacao: String(dados.classificacao),
                    num_paginas: dados.num_paginas,
                    estoque: dados.estoque,
                    genero: dados.genero,
                    ...(dados.preco !== undefined && { preco: dados.preco }),
                    ...(dados.sku !== undefined && { sku: dados.sku ?? randomUUID() }),
                    ...(dados.cover !== undefined && { cover: dados.cover }),
                },
            });

            return this.toDTO(livroAtualizado);
        } catch (error) {
            if (this.isRecordNotFoundError(error)) {
                return null;
            }
            throw error;
        }
    }

    async atualizarParcial(
        id: string,
        dados: Partial<LivroDTO>
    ): Promise<LivroDTO | null> {
        try {
            const livroAtualizado = await prisma.livro.update({
                where: { id },
                data: {
                    ...(dados.title !== undefined && { title: dados.title }),
                    ...(dados.author !== undefined && { author: dados.author }),
                    ...(dados.ano_pub !== undefined && { ano_pub: dados.ano_pub }),
                    ...(dados.classificacao !== undefined && {
                        classificacao: String(dados.classificacao),
                    }),
                    ...(dados.num_paginas !== undefined && {
                        num_paginas: dados.num_paginas,
                    }),
                    ...(dados.estoque !== undefined && { estoque: dados.estoque }),
                    ...(dados.genero !== undefined && { genero: dados.genero }),
                    ...(dados.preco !== undefined && { preco: dados.preco }),
                    ...(dados.sku !== undefined && { sku: dados.sku ?? randomUUID() }),
                    ...(dados.cover !== undefined && { cover: dados.cover }),
                },
            });

            return this.toDTO(livroAtualizado);
        } catch (error) {
            if (this.isRecordNotFoundError(error)) {
                return null;
            }
            throw error;
        }
    }

    async deletar(id: string): Promise<boolean> {
        try {
            await prisma.livro.delete({
                where: { id },
            });
            return true;
        } catch (error) {
            if (this.isRecordNotFoundError(error)) {
                return false;
            }
            throw error;
        }
    }
}