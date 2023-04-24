/*
  Warnings:

  - A unique constraint covering the columns `[questionId]` on the table `Options` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Options_questionId_key" ON "Options"("questionId");
