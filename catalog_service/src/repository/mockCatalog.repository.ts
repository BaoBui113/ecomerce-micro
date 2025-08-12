import { Catalog } from "../interface/catalog.interface";
import { Product } from "../models/product.model";

export class MockCatalogRepository implements Catalog {
  create(data: Product): Promise<Product> {
    const mockProduct = {
      id: 123,
      ...data,
    } as Product;
    return Promise.resolve(mockProduct);
  }
  findAll(): Promise<Product[]> {
    throw new Error("Method not implemented.");
  }
  findById(id: number): Promise<Product> {
    throw new Error("Method not implemented.");
  }
  update(id: number, data: Product): Promise<Product> {
    throw new Error("Method not implemented.");
  }
  delete(id: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
