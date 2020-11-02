import dotenv from "dotenv";

dotenv.config();

const {
  REDIS_HOST,
  REDIS_PORT,
  NODE_ENV,
  PORT,
} = process.env;

export default {
  NODE_ENV,
  PORT,
  REDIS_HOST,
  REDIS_PORT,
};