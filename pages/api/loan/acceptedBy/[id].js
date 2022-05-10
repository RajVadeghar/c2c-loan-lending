import User from '../../../../models/User'
import { errorHandler, responseHandler } from '../../../../utils/common'
import dbConnect from '../../../../utils/mongo'
import { getSession } from 'next-auth/react'
import Loan from '../../../../models/Loan'
import { ObjectId } from 'mongodb'

export default async function handler(req, res) {
  const {
    method,
    query: { id },
  } = req
  const session = await getSession({ req })

  dbConnect()

  if (method === 'GET') {
    try {
      const loansByUser = await Loan.find({
        'postedBy.userid': ObjectId(id),
      })

      responseHandler(loansByUser, res)
    } catch (error) {
      errorHandler(error, res)
    }
  } else {
    errorHandler('Invalid request type', res)
  }
}
