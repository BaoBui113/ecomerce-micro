import { Catalog } from "../interface/catalog.interface";
import { Product } from "../models/product.model";

export class CatalogService {
  private _repository: Catalog;

  constructor(repository: Catalog) {
    this._repository = repository;
  }

  async createProduct(input: any) {
    const data = await this._repository.create(input);
    if (!data.id) {
      throw new Error("unable to create product");
    }
    return data;
  }

  async updateProduct(id: number, input: Product) {
    const data = await this._repository.update(id, input);

    return data;
  }

  // instead of this we will get product from Elastic search
  async getProducts(limit: number, offset: number) {
    const products = await this._repository.findAll(limit, offset);

    return products;
  }

  async getProduct(id: number) {
    const product = await this._repository.findById(id);
    return product;
  }

  async deleteProduct(id: number) {
    const response = await this._repository.delete(id);
    // delete record from Elastic search
    return response;
  }
}
