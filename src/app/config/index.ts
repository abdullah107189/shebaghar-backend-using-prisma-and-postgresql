import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), ".env") });

const config = {
  port: process.env.port,
  database: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
  saltRound: process.env.SALT_ROUND,
};
