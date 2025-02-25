import { html } from "@elysiajs/html";
import staticPlugin from "@elysiajs/static";
import { Elysia } from "elysia";
import path from "path";
import { ProductsDatabase } from "./db";

const VIEWS_PATH = import.meta.dir + "../../public/views";

const app = new Elysia()
  .use(html())
  .use(staticPlugin({
    prefix: '/',
  }))
  .decorate('db', new ProductsDatabase())
  .get('/', () => Bun.file(path.join(VIEWS_PATH, "home.html")))
  .get('/add-product', ()=> Bun.file(path.join(VIEWS_PATH, "add-product.html")))
  .get('/edit', () => Bun.file(path.join(VIEWS_PATH, "edit-product.html")))
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
