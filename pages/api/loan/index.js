import User from '../../../models/User'
import {
  errorHandler,
  responseHandler,
  validateAllOnce,
} from '../../../utils/common'
import dbConnect from '../../../utils/mongo'
import Loan from '../../../models/Loan'

export default async function handler(req, res) {
  const { method } = req

  dbConnect()

  if (method === 'POST') {
    try {
      const { userid, username, amount, tenure, interest } = req.body
      validateAllOnce({
        userid,
        username,
        amount,
        tenure,
        interest,
      })

      const loan = await Loan.create({ ...req.body })

      responseHandler(loan, res)
    } catch (error) {
      errorHandler(error, res)
    }
  } else if (method === 'GET') {
    try {
      const loans = await Loan.aggregate([
        {
          $match: {},
        },
        { $sort: { createdAt: -1 } },
      ])

      responseHandler(loans, res)
    } catch (error) {
      errorHandler(error, res)
    }
  } else {
    errorHandler('Invalid request type', res)
  }
}
