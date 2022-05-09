import User from '../../../models/User'
import { errorHandler, responseHandler } from '../../../utils/common'
import dbConnect from '../../../utils/mongo'
import bcrypt from 'bcrypt'
import { getSession } from 'next-auth/react'

export default async function handler(req, res) {
  const {
    method,
    query: { id },
  } = req
  const session = await getSession({ req })

  dbConnect()

  if (method === 'PUT') {
    try {
      if (id === session?.user._id) {
        if (req.body.password) {
          try {
            req.body.password = await bcrypt.hash(req.body.password, 8)
          } catch (error) {
            return errorHandler(error, res)
          }
        }

        const user = await User.findByIdAndUpdate(id, req.body, {
          new: true,
        })

        const userDoc = await user._doc
        delete userDoc.password

        responseHandler(userDoc, res)
      } else {
        errorHandler('You can update only your account', res)
      }
    } catch (error) {
      errorHandler('User not found', res)
    }
  } else if (method === 'GET') {
    try {
      const user = await User.findById(id)
      const userDoc = user._doc
      delete userDoc.password

      responseHandler(userDoc, res)
    } catch (error) {
      errorHandler(error, res)
    }
  } else if (method === 'DELETE') {
    try {
      const user = await User.findByIdAndDelete(id)
      responseHandler('Account has been deleted successfully', res)
    } catch (error) {
      errorHandler(error, res)
    }
  } else {
    errorHandler('Invalid request type', res)
  }
}
