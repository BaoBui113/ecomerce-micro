import { Product } from "../models/product.model";

export interface Catalog {
  create(data: Product): Promise<Product>;
  findAll(limit: number, offset: number): Promise<Product[]>;
  findById(id: number): Promise<Product | null>;
  update(id: number, data: Product): Promise<Product>;
  delete(id: number): Promise<void>;
}
