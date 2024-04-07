import express from 'express';
import dbConnect from './utils/dbConnect';

const app = express();

// Connect to MongoDB 
dbConnect();


export default app;