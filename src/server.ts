import fastify from "fastify";
import cors from "@fastify/cors";
import { routes } from "./routes/routes";
import jwtPlugin from "./plugins/jwt";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";

const app = fastify({ logger: true });

app.register(cors);
app.register(fastifySwagger, {
  swagger: {
    info: {
      title: "Minha API",
      description: "Documentação da API com Swagger",
      version: "1.0.0",
    },

    schemes: ["http"],
    consumes: ["application/json"],
    produces: ["application/json"],
  },
});

app.register(fastifySwaggerUi, {
  routePrefix: "/",
  uiConfig: {
    docExpansion: "list",
    deepLinking: false,
  },
  //   staticCSP: true,
  transformSpecificationClone: true,
});
app.register(jwtPlugin);
app.register(routes);

app.listen({ port: 3333, host: "0.0.0.0" });
