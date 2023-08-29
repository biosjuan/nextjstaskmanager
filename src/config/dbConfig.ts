import mongoose from 'mongoose';

export const connectMongoDB = async () => {
  try {
    const url = process.env.mongo_url || '';
    await mongoose.connect(url);
    console.log('Mongo DB connected');
  } catch (error) {
    console.log(error);
  }
};
