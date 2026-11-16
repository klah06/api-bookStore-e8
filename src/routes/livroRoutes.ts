//IMPORTAR O MÉTODO ROUTER DO EXPREXX (GERENCIAR ROTAS)
import { Router } from "express";

//IMPORTAR O CONTROLER DE LIVROS
import LivroController from "../controllers/livroControler.js";

//INICIALIZAR O GERENCIADOR DE ROTAS DO EXPRESS
const router = Router ();

//CRIAÇÃO DE ROTAS DA ENTIDADE LIVRO
router.get("/livros", LivroController.listar);
router.post("/livros", LivroController.cadastrar);
router.put("/livros/:id", LivroController.atualizar);
router.patch("/livros/:id", LivroController.atualizarParcial);
router.delete("/livros/:id", LivroController.deletar);