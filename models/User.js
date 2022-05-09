import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    img: {
      type: String,
      trim: true,
    },
    aadhar: {
      type: String,
      trim: true,
    },
    pan: {
      type: String,
      trim: true,
    },
    salaryslips: {
      type: [String],
    },
    ctc: {
      type: Number,
      min: 5,
    },
    accnum: {
      type: Number,
      min: 5,
    },
  },
  {
    timestamps: true,
  }
)

mongoose.models = {}

export default mongoose.model('User', UserSchema)
