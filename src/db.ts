import Database from "bun:sqlite";
import { I } from "elysia/dist/index-3yRrZCrW";

export class ProductsDatabase {
 private db: Database;

 constructor() {
    this.db = new Database("Products.sqlite")
    this.createTable()
 }

 createTable() {
    "CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, price NUM, image TEXT)" }
}