import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  // Add other fields as necessary
});

const User = mongoose.model('User', userSchema);

export default User;