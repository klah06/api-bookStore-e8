-- CreateTable
CREATE TABLE "Livro" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "ano_pub" INTEGER NOT NULL,
    "classificacao" TEXT NOT NULL,
    "num_paginas" INTEGER NOT NULL,
    "estoque" INTEGER NOT NULL,
    "genero" TEXT NOT NULL,
    "preco" INTEGER NOT NULL,
    "sku" TEXT NOT NULL,
    "cover" TEXT NOT NULL DEFAULT 'https://placehold.co/300x450?texto=No+Cover',

    CONSTRAINT "Livro_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Livro_sku_key" ON "Livro"("sku");
