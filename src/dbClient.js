import 'dotenv/config';
// eslint-disable-next-line object-curly-spacing
import { MongoClient } from 'mongodb';

const uri = process.env.MONGO_URI;

const mongoClient = new MongoClient(uri);

export default mongoClient;
