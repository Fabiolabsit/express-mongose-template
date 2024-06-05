import app from './app';
import config from './app/config';
import logger from './app/utils/logger';
import dbConnect from './app/utils/dbConnect';

(async () => {
  try {
    // Connect to MongoDB
    dbConnect();
    // Start the server
    app.listen(config.port, () => {
      logger.info(`🌐 Server running on port ${config.port} 🔥`);
    });
  } catch (error) {
    logger.error(error);
  }
})();
