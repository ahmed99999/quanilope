import mongoose from 'mongoose';

const connectDB = (url: string) =>
  mongoose.connect(url, (err) => {
    if (err) {
      console.error('DataBase Connection Failed: \n', err.message);
      throw new Error(err.message);
    }

    console.log('DataBase Connection success');

    return {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    };
  });

export default connectDB;
