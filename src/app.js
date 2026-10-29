import express from "express";

const app = express();
app.use(express.json());

const livros = [
    {
        id: 1,
        title: "capitaes de areia "
    },

    {
        id: 2,
        title: "Recusao"
    }
]

app.get("/", (req, res) => {
    res.status(200).send("Codificação BackEnd");
});

app.get("/livros", (req, res) => {
    res.status(200).json(livros);
});

export default app;