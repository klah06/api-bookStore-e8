import express from "express";
import type { Request, Response } from "express";

export interface Livro {
    id: number;
    title: string;
    author: string;
    ano_pub: number;
    classificacao: number;
    num_paginas: number;
    sinopse: string;
}

const app = express();
app.use(express.json());

const livros: Livro[] = [
    {
        id: 1,
        title: "No Fundo é Amor",
        author: "Ali Hazelwood",
        ano_pub: 2025,
        classificacao: 18,
        num_paginas: 364,
        sinopse: "Na superfície, Scarlett e Lukas têm pouco em comum. No entanto, após um segredo vir à tona e uma dinâmica inesperada envolvendo seus círculos de relacionamento, eles fazem um acordo temporário: um romance casual e secreto para aliviar a alta pressão e o estresse dos treinos pré-Olimpíadas"
        
    },

    {
        id: 2,
        title: "Belo Veneno",
        author: "Rina Kent",
        ano_pub: 2026,
        classificacao: 18,
        num_paginas: 352,
        sinopse:"A história acompanha uma jovem decidida a buscar vingança após sua família (sua irmã) ser gravemente ferida por membros de uma poderosa sociedade secreta chamada Vencor. Sem conseguir rastrear diretamente os chefes por trás da tragédia, sua única pista é o Vipers, um time de hóquei universitário de elite que domina tanto o gelo quanto as sombras da cidade. Para se infiltrar nesse círculo perigoso, ela decide se aproximar do capitão do time, Kane Davenport. No entanto, o que parecia ser apenas uma estratégia de retaliação e espionagem se transforma em uma armadilha: a fachada simpática e carismática de Kane esconde um anti-herói predador, frio e obsessivo, arrastando os dois para um jogo letal e de atração mútua do qual ela não consegue mais escapar."
    }

    {
        id: 3,
        title: "Minha Melhor Parte",
        author: "Hannah Bonam-Young",
        ano_pub: 2024,
        classificacao: 18,
        num_paginas: 352,
        sinopse: "Bo e Win se conhecem em uma festa de halloween e após sentir uma forte atração, passam uma noite inesquecível, mas algumas semanas depois, descobrem que vão ter um filho."
        
    }

    {
        id: 4,
        title: "Sua Faca, Meu Coração",
        author: "K. M. Moronova",
        ano_pub: 2026,
        classificacao: 18,
        num_paginas: 288,
        sinopse: "dark militar que acompanha Cameron Mortem (um soldado letal e instável, viciado em matar seus parceiros de campo por conta de uma droga experimental) e Emery Maves (uma jovem que escapa por pouco de uma sentença de morte e é forçada a ser a nova dupla dele)"
    }

    {
        id: 5,
        title: "O risco",
        author: "S. T.Abby",
        ano_pub: 2026,
        classificacao: 18,
        num_paginas: 184,
        sinopse: "Lana Myers perdeu tudo, e agora só lhe resta ir em busca daqueles que destruíram sua vida e sua família. Depois de anos planejando, decide levar adiante sua vingança. Porém, um encontro inesperado com Logan Bennett, um agente do FBI especializado em serial killers, pode arruinar tudo. Talentoso e dedicado, Logan sempre foi ótimo em decifrar as pessoas, mas Lana é um mistério irresistível."
    }
]

//FUNÇÕES
function buscaLivro(id: string | number): number {
    return livros.findIndex(livro => {
        return livro.id === Number(id);
    });
}

//REQUISIÇÕES
app.get("/", (req: Request, res: Response) => {
    res.status(200).send("Codificação BackEnd");
});

app.get("/livros", (req: Request, res: Response) => {
    res.status(200).json(livros);
});

//REQUISIÇÃO POST (CADASTRAR NOVO LIVRO)
app.post("/livros", (req: Request, res: Response) => {
    const { id, title, author, ano_pub, classificacao, num_paginas, sinopse } = req.body;

    const novoLivro: Livro = {
        id: Number(id),
        title,
        author,
        ano_pub: Number(ano_pub),
        classificacao,
        num_paginas,
        sinopse
    };

    livros.push(novoLivro);

    res.status(201).json({
        mensagem: "Livro cadastrado com sucesso!",
        livro: novoLivro
    });
});

//REQUISIÇÃO PUT (ATUALIZAR DADOS)
app.put("/livros/:id", (req: Request, res: Response) => {
    const index = buscaLivro(String(req.params.id));
{
    if(index === -1){
        res.status(404).json({mensagem: "Livro não encontrado!"});
        return;
    }

    const { title, author, ano_pub, classificacao, num_paginas, sinopse } = req.body;

    livros[index] = {

        ...livros[index]!,
        title,
        author,
        ano_pub: Number(ano_pub),
        classificacao,
        num_paginas,
        sinopse
    };

    res.status(200).json({
        mensagem: "Livro atualizado com sucesso!",
        livro: livros[index]
    });
});

app.delete("/livros/:id", (req:Request, res: Response) => {
    const index = buscaLivro(String(req.params.id));

    if (index === -1){
        res.status(404).json({mensagem: "Livros não encontrado!" });
    }

  //Remove o Livro do array base (livros) com base no índice (id)
    livros.slice(index,1);

    res.status(200).json({
    mensagem: "Livro removido com sucesso",
});
})

export default app;

