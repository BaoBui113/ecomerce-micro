import express, { NextFunction, Request, Response } from "express";

const router = express.Router();

router.post(
  "/orders",
  async (req: Request, res: Response, next: NextFunction) => {
    return res
      .status(200)
      .json({ message: "orders route is not implemented yet" });
  }
);

router.get(
  "/orders",
  async (req: Request, res: Response, next: NextFunction) => {
    return res
      .status(200)
      .json({ message: "orders route is not implemented yet" });
  }
);

router.delete(
  "/orders/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    return res
      .status(200)
      .json({ message: "orders route is not implemented yet" });
  }
);

router.put(
  "/orders/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    return res
      .status(200)
      .json({ message: "orders route is not implemented yet" });
  }
);

export default router;
