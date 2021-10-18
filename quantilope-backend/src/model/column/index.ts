import mongoose from 'mongoose';

const ColumnSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'must provide name'],
    trim: true,
    maxlength: [20, 'name can not be more than 20 characters'],
  },
  image: {
    type: String,
  },
});

const Column = mongoose.model('Column', ColumnSchema);
export default Column;
export { Column };
