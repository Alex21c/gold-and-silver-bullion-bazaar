import bcrypt from "bcrypt";
import { json } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";
const genPasswordHash = async (passwordPlainText) => {
  const salRounds = 10;
  return await bcrypt.hash(passwordPlainText, salRounds);
};

const genJwtToken = (doc) => {
  return (
    "Bearer " +
    jwt.sign(
      {
        _id: doc._id,
        role: doc.role,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: process.env.JWT_TOKEN_EXPIRES_AFTER }
    )
  );
};

const isPasswordValid = async (plainTextPassword, hashedPasswordFromDB) => {
  return await bcrypt.compare(plainTextPassword, hashedPasswordFromDB);
};
const helperFxns = {
  genPasswordHash,
  genJwtToken,
  isPasswordValid,
};

export default helperFxns;
