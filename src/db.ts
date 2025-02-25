import Database from "bun:sqlite";
import { I } from "elysia/dist/index-3yRrZCrW";
import { IProduct } from "./interfaces/product.interface";

export class ProductsDatabase {
  private db: Database;

  constructor() {
    this.db = new Database("Products.sqlite");
    this.createTable();
  }

  fetchAllProducts() {
    return this.db.query("SELECT * FROM products").all() as IProduct[];
  }

  updateProduct(id: number, product: IProduct) {
    return this.db
      .query("UPDATE products SET name = ?, price = ?, image = ? WHERE id = ?")
      .run(product.name, product.price, product.image, id);
  }

  createTable() {
    "CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, price NUM, image TEXT)";
  }

  addProduct(product: IProduct) {
    return this.db
      .query(
        `INSERT INTO products (name, price, image) VALUES (?, ?, ?) RETURNING id`,
      )
      .get(product.name, product.price, product.image) as IProduct;
  }
}
