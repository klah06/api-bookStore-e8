import Livro from "../src/models/Livro.js";
import type { ILivroRepository, LivroDTO, FiltroLivroDTO } from "./ILivroRepository.js";

export class MongoLivroRepository implements ILivroRepository{

    async listar() {
                return await Livro.find({});
            }

    async buscarPorId(id: string) {
                return await Livro.findById(id);
    }

    async buscarPorFiltro(filtros: FiltroLivroDTO){
            const filtro: Record<string, any> = {};

            if (filtros.genero) filtro.genero = filtros.genero;
            if (filtros.autor) {
                filtro.author = { $regex: filtros.autor, $options: "i" };
            }
            if (filtros.titulo) {
                filtro.title = { $regex: filtros.titulo, $options: "i" };
            }
            return await Livro.find(filtro);
    }
    
    async cadastrar(dados: LivroDTO) {
    return await Livro.create({
        title: dados.title,
        author: dados.author,
        ano_pub: dados.ano_pub,
        classificacao: dados.classificacao,
        num_paginas: dados.num_paginas,
        estoque: dados.estoque,
        genero: dados.genero,
        preco: dados.preco,
        sku: dados.sku,
        cover: dados.cover
    });
}

    async atualizar(id: string, dados: LivroDTO){
        return await Livro.findByIdAndUpdate(
            id,
            {$set: dados},
            {new: true}
        );
    }

    async atualizarParcial(id: string, dados: Partial<LivroDTO>){
        return await Livro.findByIdAndUpdate(
            id,
            {$set: dados},
            {new: true}
        );
    }

        async deletar (id: string) {
    const livroDeletado = await Livro.findByIdAndDelete(id);
    return Boolean(livroDeletado);
}

}