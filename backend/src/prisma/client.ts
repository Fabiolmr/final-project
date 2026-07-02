import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

//Toda vez que quiser usar as classes definidas
//dentro de schema.prisma, preciso criar um objeto
// do tipo PrismaClient para fazer a conexão com o BD.
// Mas para não criar várias conexoes em vários arquivos, 
// centralizo uma conexão dentro desse arquivo e exporto para quem for usar.