import { NextFunction, Request, Response } from "express";
import HttpError from "../models/http-error";

const unHandledRoutes = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  throw new HttpError("Could not find this route.", 404);
};


export default unHandledRoutes;