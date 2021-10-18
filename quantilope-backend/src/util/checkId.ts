import mongoose from 'mongoose';

export const validateId = (id: string): boolean =>
  mongoose.Types.ObjectId.isValid(id);
