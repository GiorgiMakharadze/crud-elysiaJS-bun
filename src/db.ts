import Database from "bun:sqlite";
import { IProduct } from "./interfaces/product.interfaces";

export class ProductsDatabase {
  private db: Database;

  constructor() {
    this.db = new Database("Products.sqlite");
    this.createTable();
  }

  fetchAllProducts() {
    return this.db.query(`SELECT * FROM products`).all();
  }

  addproduct(product: IProduct) {
    return this.db
      .query(
        `INSERT INTO products(name, price, image) VALUES(?,?,?) RETURNING id`,
      )
      .get(product.name, product.price, product.image) as IProduct;
  }

  updateproduct(id: number, product: IProduct) {
    return this.db.run(
      `UPDATE products SET name='${product.name}', price='${product.price}', image='${product.image}' WHERE id=${id}`,
    );
  }

  deleteproduct(id: number) {
    return this.db.run(`DELETE FROM products WHERE id=${id}`);
  }

  createTable() {
    return this.db.run(
      "CREATE TABLE IF NOT EXISTS products(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, price NUM, image TEXT)",
    );
  }
}
