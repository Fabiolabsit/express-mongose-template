import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
const envPath = path.join(process.cwd(), '/.env');
dotenv.config({ path: envPath });

// Export the configuration object
export default {
  port: process.env.PORT,
  mongoUri: process.env.MONGO_URI,
  dbName: process.env.DB_NAME,
  nodeEnv: process.env.NODE_ENV,
};
