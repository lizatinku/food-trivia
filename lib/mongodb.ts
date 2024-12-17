import { MongoClient } from 'mongodb';

const uri = 'your-mongodb-connection-string'; // Replace with your MongoDB connection string
const client = new MongoClient(uri);

let db;

export const connectToDatabase = async () => {
  if (db) return { db, client };

  try {
    await client.connect();
    db = client.db('your-database-name'); // Replace with your database name
    console.log('Connected to MongoDB');
    return { db, client };
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
};

export const closeConnection = async () => {
  if (client) {
    await client.close();
    console.log('MongoDB connection closed');
  }
};