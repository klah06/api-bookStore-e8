import { z } from "zod"

//CRIAR REGRAS PARA CRIAÇÃO (POST) E ATUALIZAÇÃO (PUT)
export const criarLivroValidator = z.object({
    title: z.string().min(3, "O título deve ter pelo menos 3 caracteres."),
    author: z.string().min(3, "O autor deve ter pelo menos 3 caracteres."),
    ano_pub: z.number().int("O ano de publicação deve ser um número inteiro.").max(new Date().getFullYear()),
    classificacao: z.number().min(0, "A classificação deve ser no mínimo 0.").max(10, "A classificação deve ser no máximo 10."),
    num_paginas: z.number().int("O número de páginas deve ser um número inteiro.").min(1, "O livro deve ter pelo menos 1 página."),
    estoque: z.number().int("O estoque deve ser um número inteiro.").min(0, "O estoque não pode ser negativo."),
    genero: z.string().min(3, "O gênero deve ter pelo menos 3 caracteres."),
    preco: z.number().positive("O preço deve ser maior que zero."),
    sku: z.string().min(3, "O SKU deve ter pelo menos 3 caracteres."),
    cover: z.
        .String()
        .url("A capa deve ser uma URL válida")
        .opcional()
        .or(z.literal(""))
        .transformal((val) => (val === "" ? undefined: val)),
});

export const atualizarLivroValidator = criarLivroValidator.partial();
