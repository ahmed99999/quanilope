import mongoose from 'mongoose';

const ColumnSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'must provide name'],
    trim: true,
    maxlength: [8, 'name can not be more than 8 characters'],
  },
  image: {
    type: String,
  },
});

export default ColumnSchema;
export { ColumnSchema };
