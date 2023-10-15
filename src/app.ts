import fastify from "fastify";
import { routes } from "./routes";


export const app = fastify()

app.register(routes)


