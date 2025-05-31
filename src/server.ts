import fastify from "fastify";
import cors from "@fastify/cors";
import { routes } from "./routes/routes";

const app = fastify({ logger: true });

app.register(cors);
app.register(routes);

app.listen({ host: "0.0.0.0", port: 3333 }, () => console.log("rodando"));
