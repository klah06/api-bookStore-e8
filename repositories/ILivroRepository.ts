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
    buscarPorId(id: string): Promise<any[] | null>;
    buscarPorFiltro(filtros: FiltroLivroDTO): Promise<any[]>;
    cadastrar(dados: LivroDTO): Promise<any>;
    atualizar(id: string, dados: LivroDTO): Promise<any[]>;
    atualizarParcial(id: string, dados: Partial<LivroDTO>): Promise<any[] | null>;
    deletar(id: string): Promise<boolean>;
}