import dotenv from 'dotenv';
dotenv.config();

const required = (key) => {
  if (!process.env[key]) throw new Error(`Missing required env variable: ${key}`);
  return process.env[key];
};

export default {
  port: process.env.PORT || 5000,
  mongoUri: required('MONGO_URI'),
  jwtSecret: required('JWT_SECRET'),
  nodeEnv: process.env.NODE_ENV || 'development',
};
