import jwt from "jsonwebtoken";
import User from "../models/userModal.js";
import createHttpError from "http-errors";

export const authenticateUser = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
  } catch (error) {
    next(createHttpError(500, "Internal Server Error"));
  }
};
