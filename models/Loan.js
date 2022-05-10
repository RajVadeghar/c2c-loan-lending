import { ObjectId } from 'mongodb'
import mongoose from 'mongoose'

const LoanSchema = new mongoose.Schema(
  {
    amount: {
      type: String,
      required: true,
    },
    tenure: {
      type: String,
      required: true,
    },
    interest: {
      type: String,
      required: true,
    },
    postedBy: {
      userid: {
        type: String,
        required: true,
      },
      username: { type: String, required: true },
      email: { type: String, required: true },
    },
    status: {
      type: String,
      enum: ['pending', 'accepted'],
      default: 'pending',
    },
    rejectedBy: {
      type: [ObjectId],
      ref: 'User',
    },
    acceptedBy: {
      userid: {
        type: String,
      },
      username: { type: String },
    },
  },
  {
    timestamps: true,
  }
)

mongoose.models = {}

export default mongoose.model('Loan', LoanSchema)
