import { PrismaClient } from "@prisma/client";
import { Catalog } from "../interface/catalog.interface";
import { Product } from "../models/product.model";

export class CatalogRepository implements Catalog {
  _prisma: PrismaClient;
  constructor() {
    this._prisma = new PrismaClient();
  }

  async create(data: Product): Promise<Product> {
    return await this._prisma.product.create({
      data,
    });
  }
  async findAll(limit: number, offset: number): Promise<Product[]> {
    return await this._prisma.product.findMany({
      take: limit,
      skip: offset,
      orderBy: {
        id: "asc",
      },
    });
  }
  async findById(id: number): Promise<Product> {
    return await this._prisma.product.findUnique({
      where: { id },
    });
  }
  async update(id: number, data: Product): Promise<Product> {
    return await this._prisma.product.update({
      where: { id },
      data,
    });
  }
  async delete(id: number): Promise<void> {
    return await this._prisma.product.delete({
      where: { id },
    });
  }
}
