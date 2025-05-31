import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import prisma from "../resources/PrismaClient";

type PostUserProps = {
  NomeCompleto: string;
  RG: string;
  DataNascimento: Date;
  RegistroFuncionário: string;
  Telefone: string;
  Email: string;
  Senha: string;
  Avatar: string;
};
type UserProps = {
  id: string;
  NomeCompleto: string;
  RG: string;
  DataNascimento: Date;
  RegistroFuncionário: string;
  Telefone: string;
  Email: string;
  Senha: string;
  Avatar: string;
  CreatedAt: Date;
};

export function routes(app: FastifyInstance) {
  app.get("/user/:id", async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params as { id: string };

    if (!id) throw new Error("Informe o id!");

    const user = await prisma.user.findFirst({
      where: {
        id: id,
      },
    });

    if (!user) throw new Error("Usuário não encontrado!");

    return reply.status(200).send(user);
  });

  app.get("/user", async (request: FastifyRequest, reply: FastifyReply) => {
    const users = await prisma.user.findMany();

    return reply.status(200).send(users);
  });

  app.post("/user", async (request: FastifyRequest, reply: FastifyReply) => {
    const data = request.body as PostUserProps;

    const user = await prisma.user.create({ data });

    return reply.status(201).send(user);
  });

  app.patch(
    "/user/:id",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { id } = request.params as { id: string };

      if (!id) throw new Error("Informe o id!");

      const { Avatar } = request.body as UserProps;

      await prisma.user.update({
        data: {
          Avatar,
        },
        where: {
          id,
        },
      });

      return reply.status(204).send();
    }
  );

  app.delete(
    "/user/:id",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { id } = request.params as { id: string };

      if (!id) throw Error("Informe o id!");
      const user = await prisma.user.findFirst({ where: { id } });

      if (!user) throw Error("Usuário não encontrado!");

      await prisma.user.delete({
        where: {
          id: user.id,
        },
      });

      return reply
        .status(204)
        .send(`O usuário ${user.NomeCompleto} foi deletado com sucesso!`);
    }
  );

  app.post("/login", async (request: FastifyRequest, reply: FastifyReply) => {
    const { email, senha } = request.body as {
      email: string;
      senha: string;
    };

    const user = await prisma.user.findFirst({
      where: {
        Email: email,
        Senha: senha,
      },
    });

    if (!user) throw new Error("Usuário não encontrado!");

    const token = app.jwt.sign({
      ...user,
    });

    return reply.status(201).send(token);
  });
}
