import { Product } from "../models/product.model";

export interface Catalog {
  create(data: Product): Promise<Product>;
  findAll(): Promise<Product[]>;
  findById(id: number): Promise<Product>;
  update(id: number, data: Product): Promise<Product>;
  delete(id: number): Promise<void>;
}
