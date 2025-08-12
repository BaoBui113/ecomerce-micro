import { NextFunction, Request, Response } from "express";

export const RequestAuthorizer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const isValidUser = true;
  if (!isValidUser) {
    return res.status(403).json({ error: "Unauthorized due to invalid user!" });
  }
  next();
  //   console.log("RequestAuthorizer called", req.headers.authorization);
  //   try {
  //     if (!req.headers.authorization) {
  //       return res
  //         .status(403)
  //         .json({ error: "Unauthorized due to authorization token missing!" });
  //     }
  //     const userData = await ValidateUser(req.headers.authorization as string);
  //     req.user = userData;
  //     next();
  //   } catch (error) {
  //     console.log("error", error);
  //     return res.status(403).json({ error });
  //   }
};
