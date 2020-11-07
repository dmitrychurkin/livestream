import dotenv from "dotenv";

dotenv.config();

const {
  REDIS_HOST,
  REDIS_PORT,
  NODE_ENV,
  PORT,
  APP_TYPE
} = process.env;

export default {
  NODE_ENV,
  PORT,
  REDIS_HOST,
  REDIS_PORT,
  APP_TYPE
};