import { getSession } from 'next-auth/react'
import Loan from '../../../models/Loan'
import { errorHandler, responseHandler } from '../../../utils/common'
import dbConnect from '../../../utils/mongo'

export default async function handler(req, res) {
  const {
    method,
    query: { id },
  } = req
  const session = await getSession({ req })

  dbConnect()

  if (method === 'DELETE') {
    try {
      const loansByUser = await Loan.findByIdAndDelete(id, {
        new: true,
      })

      responseHandler(loansByUser, res)
    } catch (error) {
      errorHandler(error, res)
    }
  } else if (method === 'PUT') {
    try {
      const loansByUser = await Loan.findByIdAndUpdate(id, req.body, {
        new: true,
      })

      responseHandler(loansByUser, res)
    } catch (error) {
      errorHandler(error, res)
    }
  } else {
    errorHandler('Invalid request type', res)
  }
}
