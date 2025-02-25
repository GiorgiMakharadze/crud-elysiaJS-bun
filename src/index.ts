import { html } from "@elysiajs/html";
import staticPlugin from "@elysiajs/static";
import { Elysia } from "elysia";
import path from "path";
import { ProductsDatabase } from "./db";
import { IProduct } from "./interfaces/product.interface";

const VIEWS_PATH = import.meta.dir + "../../public/views";

const app = new Elysia()
  .use(html())
  .use(
    staticPlugin({
      prefix: "/",
    }),
  )
  .decorate("db", new ProductsDatabase())
  .get("/fetech-products", ({ db }) => {
    return db.fetchAllProducts();
  })
  .get("/script.js", () => Bun.file(import.meta.dir + "/script.js").text())
  .get("/", () => Bun.file(path.join(VIEWS_PATH, "home.html")))
  .get("/add-product", () =>
    Bun.file(path.join(VIEWS_PATH, "add-product.html")),
  )
  .get("/edit/:id", () => Bun.file(path.join(VIEWS_PATH, "edit-product.html")))

  .post("/add-product", ({ db, body, set }) => {
    db.addProduct(<IProduct>body);
    set.redirect = "/";
  })
  .post("/edit/:id", ({ db, body, set, params }) => {
    const { id } = params;
    db.updateProduct(+id, <IProduct>body);
    set.redirect = "/";
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
