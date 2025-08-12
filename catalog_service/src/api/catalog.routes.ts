import express, { NextFunction, Request, Response } from "express";
import { CatalogRepository } from "../repository/catalog.repository";
import { CatalogService } from "../services/catelog.service";

const router = express.Router();
export const catalogService = new CatalogService(new CatalogRepository());
router.post(
  "/products",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const product = req.body;
      // Assuming catalogService is already defined and imported
      const createdProduct = await catalogService.createProduct(product);
      res.status(201).json(createdProduct);
    } catch (error) {
      next(error);
    }
  }
);
router.get(
  "/products",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const limit = Number(req.query.limit);
      const offset = Number(req.query.offset);
      const products = await catalogService.getProducts(limit, offset);
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/products/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const product = await catalogService.getProduct(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }
);
router.put(
  "/products/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const product = req.body;
      const updatedProduct = await catalogService.updateProduct(id, product);
      res.status(200).json(updatedProduct);
    } catch (error) {
      next(error);
    }
  }
);
router.delete(
  "/products/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const response = await catalogService.deleteProduct(id);
      res.status(204).json(response);
    } catch (error) {
      next(error);
    }
  }
);
export default router;
