import mongoose, { Document, Model, Schema } from 'mongoose';
import { User } from './users.interface';

const userSchema = new Schema<User>(
  {
    userName: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Users: Model<Document & User> = mongoose.model('users', userSchema);
export default Users;
