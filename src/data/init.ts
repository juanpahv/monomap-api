import mongoose from "mongoose";

interface ConnectionOptions {
  mongoUrl: string;
  dbName: string;
}

export class MongoDatabase {
  static async connect(options: ConnectionOptions) {
    try {
      await mongoose.connect(options.mongoUrl, {
        dbName:options.dbName
      });
      console.log('Connected to MongoDB');
    }
    catch (error) {
      console.error('Error connecting to MongoDB:', error);
      process.exit(1);
    }
  }
}