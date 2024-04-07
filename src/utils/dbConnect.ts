import mongoose from 'mongoose';
import configs from '../configs';
import  logger  from './logger';

const dbConnect = async()=> {
    if (!configs.mongoUri) {
        logger.error('❌ No MONGO_URI found in .env file')
        process.exit(1)
    }
    try {
        const connectionInstance = await mongoose.connect(`${configs.mongoUri}/${configs.dbName}`)
        logger.info(`MongoDB Connected: ${connectionInstance.connection.host}`)
    } catch (error : any) {
        logger.error(`❌ Error connecting to database: ${error}`)
        process.exit(1)
    }
}

export default dbConnect;