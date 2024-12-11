import mongoose from 'mongoose';

const db = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bootcamp');
    console.log('Database connected.');
    if (mongoose.connection.host) {console.log(mongoose.connection.host)};
    return mongoose.connection;
  } catch (error) {
    console.error('Database connection error:', error);
    throw new Error('Database connection failed.');
  }
}

export default db;