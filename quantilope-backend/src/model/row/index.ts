import mongoose from 'mongoose';

const RowSchema = new mongoose.Schema({
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

const Row = mongoose.model('Row', RowSchema);
export default Row;
export { Row };
