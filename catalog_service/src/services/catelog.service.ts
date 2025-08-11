import { Catalog } from "../interface/catalog.interface";
import { Product } from "../models/product.model";

export class CatalogService {
  private _repository: Catalog;
  constructor(repository: Catalog) {
    this._repository = repository;
  }
  createProduct(product: Product) {}
  findAllProducts(limit: number, offset: number) {}
  findProductById(id: number) {}
  updateProduct(id: number, product: Product) {}
  deleteProduct(id: number) {}
}
