import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    require: true
  },
  role: {
    type: String,
    default: 'admin'
  }
}, { timestamps: true })

const User = mongoose.model('User', userSchema)

export default User


