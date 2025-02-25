import { html } from "@elysiajs/html";
import staticPlugin from "@elysiajs/static";
import { Elysia } from "elysia";
import { ProductsDatabase } from "./db";
import { IProduct } from "./interfaces/product.interfaces";

const VIEWS_PATH = import.meta.dir + "/../public/views";

const app = new Elysia()
  .use(html())
  .use(
    staticPlugin({
      prefix: "/",
    }),
  )
  .decorate("db", new ProductsDatabase())
  .get("/fetch-products", ({ db }) => db.fetchAllProducts())
  .get("/script.js", () => Bun.file(import.meta.dir + "/script.js").text())
  .get("/", () => Bun.file(VIEWS_PATH + "/home.html"))
  .get("/add-product", () => Bun.file(VIEWS_PATH + "/add-product.html"))
  .get("/edit/:id", () => Bun.file(VIEWS_PATH + "/edit-product.html"))
  .get("/delete/:id", ({ params, db, set }) => {
    db.deleteproduct(parseInt(params.id));
    set.redirect = "/";
  })

  .post("/add-product", ({ db, body, set }) => {
    db.addproduct(<IProduct>body);
    set.redirect = "/";
  })
  .patch("/edit/:id", ({ db, body, set, params }) => {
    db.updateproduct(parseInt(params.id), <IProduct>body);
    set.redirect = "/";
  })

  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
