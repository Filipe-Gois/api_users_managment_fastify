-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "NomeCompleto" TEXT NOT NULL,
    "RG" TEXT NOT NULL,
    "DataNascimento" DATETIME NOT NULL,
    "RegistroFuncionário" TEXT NOT NULL,
    "Telefone" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "Senha" TEXT NOT NULL,
    "Avatar" TEXT NOT NULL,
    "CreatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "User_RG_key" ON "User"("RG");

-- CreateIndex
CREATE UNIQUE INDEX "User_RegistroFuncionário_key" ON "User"("RegistroFuncionário");

-- CreateIndex
CREATE UNIQUE INDEX "User_Telefone_key" ON "User"("Telefone");

-- CreateIndex
CREATE UNIQUE INDEX "User_Email_key" ON "User"("Email");
