export interface LivroDTO {
    id?: string;
    title: string;
    author: string;
    ano_pub: number;
    classificacao: string;
    num_paginas: number;
    estoque: number;
    preco?: string;
    sku?: string;
    cover?: string | undefined;
}

export interface FiltroLivroDTO{
    genero?: string;
    titulo?: string;
    autor?: string;
}

export interface ILivroRepository {
    listar(): Promise<any[]>;
    buscarPorId(id: string): Promise<LivroDTO[] | null>;
    buscarPorFiltro(filtros: FiltroLivroDTO): Promise<LivroDTO[]>;
    cadastrar(dados: LivroDTO): Promise<LivroDTO>;
    atualizar(id: string, dados: LivroDTO): Promise<LivroDTO | null>;
    atualizarParcial(id: string, dados: Partial<LivroDTO>): Promise<LivroDTO | null>;
    deletar(id: string): Promise<boolean>;
}