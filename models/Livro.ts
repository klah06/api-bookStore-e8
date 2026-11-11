import mongoose, { Schema, type InferSchemaType } from "mongoose";

//DEFINIÇÃO DO SCHEMA MAPEANDO OS CAMPOS

const livroSchema = new Schema (
    {
        title: { type: String, required: true},
        author: { type: String, required: true},
        ano_pub: { type: Number, required: true},
        classificacao: { type: Number, required: true},
        num_paginas: { type: Number, required: true},
        sinopse: { type: String, required: true},
        genero: { type: String, required: true}
    },
    { versionKey: false }
);

//EXTRAÇÃO AUTOMÁTICA DO TIPO (SUBSTITUIR A CRIAÇÃO MANUAL DA INTERFACE)
export type InterfaceLivro = InferSchemaType<typeof livroSchema>

//CRIAÇÃO DO MODEL (MONGOOSE)
const Livro = mongoose.model("Livro", livroSchema);

//DISPONIBILIZA O MÓDULO PARA SER IMPORTADO EM OUTROS ARQUIVOS
export default Livro;
