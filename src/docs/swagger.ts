export const swaggerDocument = {
    openapi: "3.0.0",
    info: {
        title: "API de Gerenciamento de Livros",
        version: "1.0.0",
        description: "Documentação completa da API RESTful para cadastro, consulta, atualização e remoção de livros.",
    },
    servers: [
        {
        url: "http://localhost:3000",
        description: "Servidor de Desenvolvimento",
        },
    ],
    tags: [
        {
        name: "Livros",
        description: "Operações relacionadas ao catálogo de livros",
        },
    ],
    paths: {
        "/livros": {
        get: {
            tags: ["Livros"],
            summary: "Lista todos os livros",
            description: "Retorna uma lista completa com todos os livros cadastrados no banco de dados.",
            responses: {
            "200": {
                description: "Lista de livros retornada com sucesso.",
                content: {
                "application/json": {
                    schema: {
                    type: "array",
                    items: {
                        $ref: "#/components/schemas/Livro",
                    },
                    },
                },
                },
            },
            "500": {
                description: "Erro interno do servidor ao buscar livros.",
                content: {
                "application/json": {
                    schema: {
                    $ref: "#/components/schemas/ErroInterno",
                    },
                    example: {
                    mensagem: "Erro ao buscar livros.",
                    },
                },
                },
            },
            },
        },
        post: {
            tags: ["Livros"],
            summary: "Cadastra um novo livro",
            description: "Valida os dados enviados utilizando o schema Zod (criarLivroValidator) e cria um novo registro de livro.",
            requestBody: {
            required: true,
            content: {
                "application/json": {
                schema: {
                    $ref: "#/components/schemas/CriarLivroInput",
                },
                example: {
                    title: "O Senhor dos Anéis: A Sociedade do Anel",
                    author: "J.R.R. Tolkien",
                    ano_pub: 1954,
                    classificacao: 12,
                    num_paginas: 576,
                    estoque: 25,
                    genero: "Fantasia",
                    preco: 59.9,
                    sku: "LIV-SDA-1954",
                    cover: "https://exemplo.com/capas/sociedade-do-anel.jpg",
                },
                },
            },
            },
            responses: {
            "201": {
                description: "Livro cadastrado com sucesso.",
                content: {
                "application/json": {
                    schema: {
                    type: "object",
                    properties: {
                        mensagem: {
                        type: "string",
                        example: "Livro cadastrado com sucesso!",
                        },
                        livro: {
                        $ref: "#/components/schemas/Livro",
                        },
                    },
                    },
                },
                },
            },
            "400": {
                description: "Erro de validação nos dados enviados (falha no middleware Zod).",
                content: {
                "application/json": {
                    schema: {
                    $ref: "#/components/schemas/ErroValidacao",
                    },
                },
                },
            },
            "500": {
                description: "Erro interno do servidor ao cadastrar livro.",
                content: {
                "application/json": {
                    schema: {
                    $ref: "#/components/schemas/ErroInterno",
                    },
                    example: {
                    mensagem: "Erro ao cadastrar livro.",
                    },
                },
                },
            },
            },
        },
        },
        "/livros/busca": {
        get: {
            tags: ["Livros"],
            summary: "Filtra livros por critérios opcionais",
            description: "Busca livros por gênero, título ou autor utilizando correspondência parcial case-insensitive (regex).",
            parameters: [
            {
                name: "genero",
                in: "query",
                required: false,
                description: "Gênero literário do livro",
                schema: {
                type: "string",
                example: "Fantasia",
                },
            },
            {
                name: "titulo",
                in: "query",
                required: false,
                description: "Título (ou parte do título) do livro",
                schema: {
                type: "string",
                example: "Senhor dos Anéis",
                },
            },
            {
                name: "autor",
                in: "query",
                required: false,
                description: "Nome (ou parte do nome) do autor",
                schema: {
                type: "string",
                example: "Tolkien",
                },
            },
            ],
            responses: {
            "200": {
                description: "Lista de livros filtrados retornada com sucesso.",
                content: {
                "application/json": {
                    schema: {
                    type: "array",
                    items: {
                        $ref: "#/components/schemas/Livro",
                    },
                    },
                },
                },
            },
            "500": {
                description: "Erro interno do servidor ao filtrar livros.",
                content: {
                "application/json": {
                    schema: {
                    $ref: "#/components/schemas/ErroInterno",
                    },
                    example: {
                    mensagem: "Erro ao filtrar livros.",
                    },
                },
                },
            },
            },
        },
        },
        "/livros/{id}": {
        get: {
            tags: ["Livros"],
            summary: "Busca um livro pelo ID",
            description: "Retorna os detalhes de um livro específico a partir do seu ObjectId do MongoDB.",
            parameters: [
            {
                name: "id",
                in: "path",
                required: true,
                description: "ID único do livro (MongoDB ObjectId)",
                schema: {
                type: "string",
                example: "65f1a2b3c4d5e6f7a8b9c0d1",
                },
            },
            ],
            responses: {
            "200": {
                description: "Livro encontrado e retornado com sucesso.",
                content: {
                "application/json": {
                    schema: {
                    $ref: "#/components/schemas/Livro",
                    },
                },
                },
            },
            "404": {
                description: "Livro não encontrado para o ID informado.",
                content: {
                "application/json": {
                    schema: {
                    $ref: "#/components/schemas/ErroNaoEncontrado",
                    },
                    example: {
                    mensagem: "Livro não encontrado.",
                    },
                },
                },
            },
            "500": {
                description: "Erro interno do servidor ao buscar livro pelo ID.",
                content: {
                "application/json": {
                    schema: {
                    $ref: "#/components/schemas/ErroInterno",
                    },
                    example: {
                    mensagem: "Erro ao buscar livro pelo ID.",
                    },
                },
                },
            },
            },
        },
        put: {
            tags: ["Livros"],
            summary: "Atualiza completamente os dados de um livro",
            description: "Valida todos os campos obrigatórios com criarLivroValidator e substitui os dados do livro correspondente ao ID.",
            parameters: [
            {
                name: "id",
                in: "path",
                required: true,
                description: "ID único do livro (MongoDB ObjectId)",
                schema: {
                type: "string",
                example: "65f1a2b3c4d5e6f7a8b9c0d1",
                },
            },
            ],
            requestBody: {
            required: true,
            content: {
                "application/json": {
                schema: {
                    $ref: "#/components/schemas/CriarLivroInput",
                },
                example: {
                    title: "O Senhor dos Anéis: As Duas Torres",
                    author: "J.R.R. Tolkien",
                    ano_pub: 1954,
                    classificacao: 12,
                    num_paginas: 464,
                    estoque: 18,
                    genero: "Fantasia",
                    preco: 62.5,
                    sku: "LIV-ADT-1954",
                    cover: "https://exemplo.com/capas/as-duas-torres.jpg",
                },
                },
            },
            },
            responses: {
            "200": {
                description: "Livro atualizado com sucesso.",
                content: {
                "application/json": {
                    schema: {
                    type: "object",
                    properties: {
                        mensagem: {
                        type: "string",
                        example: "Livro atualizado com sucesso!",
                        },
                        livro: {
                        $ref: "#/components/schemas/Livro",
                        },
                    },
                    },
                },
                },
            },
            "400": {
                description: "Erro de validação nos dados enviados (falha no middleware Zod).",
                content: {
                "application/json": {
                    schema: {
                    $ref: "#/components/schemas/ErroValidacao",
                    },
                },
                },
            },
            "404": {
                description: "Livro não encontrado para o ID informado.",
                content: {
                "application/json": {
                    schema: {
                    $ref: "#/components/schemas/ErroNaoEncontrado",
                    },
                    example: {
                    mensagem: "Livro não encontrado!",
                    },
                },
                },
            },
            "500": {
                description: "Erro interno do servidor ao atualizar livro.",
                content: {
                "application/json": {
                    schema: {
                    $ref: "#/components/schemas/ErroInterno",
                    },
                    example: {
                    mensagem: "Erro ao atualizar livro.",
                    },
                },
                },
            },
            },
        },
        patch: {
            tags: ["Livros"],
            summary: "Atualiza parcialmente os dados de um livro",
            description: "Valida apenas os campos enviados com atualizarLivroValidator e aplica atualização parcial ($set) no registro.",
            parameters: [
            {
                name: "id",
                in: "path",
                required: true,
                description: "ID único do livro (MongoDB ObjectId)",
                schema: {
                type: "string",
                example: "65f1a2b3c4d5e6f7a8b9c0d1",
                },
            },
            ],
            requestBody: {
            required: true,
            content: {
                "application/json": {
                schema: {
                    $ref: "#/components/schemas/AtualizarLivroInput",
                },
                example: {
                    estoque: 40,
                    preco: 54.9,
                },
                },
            },
            },
            responses: {
            "200": {
                description: "Livro atualizado parcialmente com sucesso.",
                content: {
                "application/json": {
                    schema: {
                    type: "object",
                    properties: {
                        mensagem: {
                        type: "string",
                        example: "Livro atualizado parcialmente com sucesso!",
                        },
                        livro: {
                        $ref: "#/components/schemas/Livro",
                        },
                    },
                    },
                },
                },
            },
            "400": {
                description: "Erro de validação nos dados enviados (falha no middleware Zod).",
                content: {
                "application/json": {
                    schema: {
                    $ref: "#/components/schemas/ErroValidacao",
                    },
                },
                },
            },
            "404": {
                description: "Livro não encontrado para o ID informado.",
                content: {
                "application/json": {
                    schema: {
                    $ref: "#/components/schemas/ErroNaoEncontrado",
                    },
                    example: {
                    mensagem: "Livro não encontrado!",
                    },
                },
                },
            },
            "500": {
                description: "Erro interno do servidor ao atualizar parcialmente o livro.",
                content: {
                "application/json": {
                    schema: {
                    $ref: "#/components/schemas/ErroInterno",
                    },
                    example: {
                    mensagem: "Erro ao atualizar parcialmente o livro.",
                    },
                },
                },
            },
            },
        },
        delete: {
            tags: ["Livros"],
            summary: "Remove um livro pelo ID",
            description: "Exclui permanentemente o registro de um livro com base no ID informado.",
            parameters: [
            {
                name: "id",
                in: "path",
                required: true,
                description: "ID único do livro (MongoDB ObjectId)",
                schema: {
                type: "string",
                example: "65f1a2b3c4d5e6f7a8b9c0d1",
                },
            },
            ],
            responses: {
            "200": {
                description: "Livro removido com sucesso.",
                content: {
                "application/json": {
                    schema: {
                    type: "object",
                    properties: {
                        mensagem: {
                        type: "string",
                        example: "Livro removido com sucesso!",
                        },
                    },
                    },
                },
                },
            },
            "404": {
                description: "Livro não encontrado para o ID informado.",
                content: {
                "application/json": {
                    schema: {
                    $ref: "#/components/schemas/ErroNaoEncontrado",
                    },
                    example: {
                    mensagem: "Livro não encontrado!",
                    },
                },
                },
            },
            "500": {
                description: "Erro interno do servidor ao remover livro.",
                content: {
                "application/json": {
                    schema: {
                    $ref: "#/components/schemas/ErroInterno",
                    },
                    example: {
                    mensagem: "Erro ao remover livro.",
                    },
                },
                },
            },
            },
        },
        },
    },
    components: {
        schemas: {
        Livro: {
            type: "object",
            properties: {
            _id: {
                type: "string",
                example: "65f1a2b3c4d5e6f7a8b9c0d1",
            },
            title: {
                type: "string",
                example: "O Senhor dos Anéis: A Sociedade do Anel",
            },
            author: {
                type: "string",
                example: "J.R.R. Tolkien",
            },
            ano_pub: {
                type: "integer",
                example: 1954,
            },
            classificacao: {
                type: "integer",
                example: 12,
            },
            num_paginas: {
                type: "integer",
                example: 576,
            },
            estoque: {
                type: "integer",
                example: 25,
            },
            genero: {
                type: "string",
                example: "Fantasia",
            },
            preco: {
                type: "number",
                format: "float",
                example: 59.9,
            },
            sku: {
                type: "string",
                example: "LIV-SDA-1954",
            },
            cover: {
                type: "string",
                format: "uri",
                example: "https://exemplo.com/capas/sociedade-do-anel.jpg",
            },
            createdAt: {
                type: "string",
                format: "date-time",
                example: "2026-11-19T19:01:00.000Z",
            },
            updatedAt: {
                type: "string",
                format: "date-time",
                example: "2026-11-19T19:01:00.000Z",
            },
            },
        },
        CriarLivroInput: {
            type: "object",
            required: [
            "title",
            "author",
            "ano_pub",
            "classificacao",
            "num_paginas",
            "estoque",
            "genero",
            "preco",
            "sku",
            "cover",
            ],
            properties: {
            title: {
                type: "string",
                minLength: 1,
                description: "Título do livro",
                example: "O Senhor dos Anéis: A Sociedade do Anel",
            },
            author: {
                type: "string",
                minLength: 1,
                description: "Autor do livro",
                example: "J.R.R. Tolkien",
            },
            ano_pub: {
                type: "integer",
                description: "Ano de publicação",
                example: 1954,
            },
            classificacao: {
                type: "integer",
                minimum: 0,
                description: "Classificação indicativa de idade",
                example: 12,
            },
            num_paginas: {
                type: "integer",
                minimum: 1,
                description: "Número total de páginas",
                example: 576,
            },
            estoque: {
                type: "integer",
                minimum: 0,
                description: "Quantidade disponível em estoque",
                example: 25,
            },
            genero: {
                type: "string",
                minLength: 1,
                description: "Gênero literário",
                example: "Fantasia",
            },
            preco: {
                type: "number",
                format: "float",
                minimum: 0,
                description: "Preço unitário do livro",
                example: 59.9,
            },
            sku: {
                type: "string",
                minLength: 1,
                description: "Código identificador único de estoque (SKU)",
                example: "LIV-SDA-1954",
            },
            cover: {
                type: "string",
                format: "uri",
                description: "URL da imagem de capa do livro",
                example: "https://exemplo.com/capas/sociedade-do-anel.jpg",
            },
            },
        },
        AtualizarLivroInput: {
            type: "object",
            description: "Campos opcionais para atualização parcial do livro (schema .partial() do Zod)",
            properties: {
            title: {
                type: "string",
                minLength: 1,
                description: "Título do livro",
                example: "O Senhor dos Anéis: A Sociedade do Anel",
            },
            author: {
                type: "string",
                minLength: 1,
                description: "Autor do livro",
                example: "J.R.R. Tolkien",
            },
            ano_pub: {
                type: "integer",
                description: "Ano de publicação",
                example: 1954,
            },
            classificacao: {
                type: "integer",
                minimum: 0,
                description: "Classificação indicativa de idade",
                example: 12,
            },
            num_paginas: {
                type: "integer",
                minimum: 1,
                description: "Número total de páginas",
                example: 576,
            },
            estoque: {
                type: "integer",
                minimum: 0,
                description: "Quantidade disponível em estoque",
                example: 40,
            },
            genero: {
                type: "string",
                minLength: 1,
                description: "Gênero literário",
                example: "Fantasia",
            },
            preco: {
                type: "number",
                format: "float",
                minimum: 0,
                description: "Preço unitário do livro",
                example: 54.9,
            },
            sku: {
                type: "string",
                minLength: 1,
                description: "Código identificador único de estoque (SKU)",
                example: "LIV-SDA-1954",
            },
            cover: {
                type: "string",
                format: "uri",
                description: "URL da imagem de capa do livro",
                example: "https://exemplo.com/capas/sociedade-do-anel.jpg",
            },
            },
        },
        ErroValidacao: {
            type: "object",
            properties: {
            mensagem: {
                type: "string",
                example: "Erro de validação dos dados.",
            },
            erros: {
                type: "array",
                items: {
                type: "object",
                properties: {
                    campo: {
                    type: "string",
                    example: "preco",
                    },
                    mensagem: {
                    type: "string",
                    example: "Expected number, received string",
                    },
                },
                },
            },
            },
        },
        ErroNaoEncontrado: {
            type: "object",
            properties: {
            mensagem: {
                type: "string",
                example: "Livro não encontrado.",
            },
            },
        },
        ErroInterno: {
            type: "object",
            properties: {
            mensagem: {
                type: "string",
                example: "Erro interno do servidor.",
            },
            },
        },
        },
    },
    } as const;