import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import TimeAgo from 'timeago-react'
import { deleteloan, updateloan } from '../utils/request'
import { deleteLoanReq } from './UserProfileNavigation'

function LoanItem({ loan }) {
  const { _id, amount, tenure, interest, postedBy, createdAt, status } = loan
  const { data: session } = useSession()
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const acceptLoanRequest = async (id) => {
    if (loading) return
    setLoading(true)

    const payload = {
      id: _id,
      acceptedBy: session.user._id,
      status: 'Accepted',
    }

    const loan = await updateloan(payload)

    if (loan.hasError) {
      setMessage(loan.errorMessage)
    } else {
      setLoading(false)
      router.push('/')
    }
    setLoading(false)
  }

  const rejectLoan = async (id) => {
    if (loading) return
    setLoading(true)
    // TODO: Complete this using accept loan func
    const payload = {
      id: _id,
      acceptedBy: session.user._id,
      status: 'Accepted',
    }

    const loan = await updateloan(payload)

    if (loan.hasError) {
      setMessage(loan.errorMessage)
    } else {
      setLoading(false)
      router.push('/')
    }
    setLoading(false)
  }

  const deleteLoan = async (id) => {
    if (loading) return
    setLoading(true)

    const loan = await deleteloan(id)
    if (loan.hasError) {
      setMessage(loan.errorMessage)
    } else {
      setLoading(false)
      router.push('/')
    }
    setLoading(false)
  }

  return (
    <li className="relative flex w-full flex-col gap-y-3 rounded-md bg-white p-6 shadow-md ring-1 ring-black/5">
      {status === 'pending' ? (
        <span className="absolute bottom-6 right-6 mr-2 rounded bg-indigo-600 px-2.5 py-0.5 text-xs font-semibold text-white">
          pending
        </span>
      ) : (
        <span className="absolute bottom-6 right-6 mr-2 rounded bg-green-600 px-2.5 py-0.5 text-xs font-semibold text-white">
          accepted
        </span>
      )}

      <div className="flex items-start justify-between">
        <div className="flex flex-col">
          <p className="text-2xl font-light">Loan Request made by:</p>{' '}
          <p className="text-sm font-semibold capitalize leading-6 text-slate-900">
            {postedBy.username}
          </p>
        </div>
        <p className="text-xs text-gray-400">
          <TimeAgo datetime={createdAt} />
        </p>
      </div>

      <div className="ml-5 flex flex-col gap-y-1">
        <p className="text-sm">
          Amount:{' '}
          <span className="font-semibold capitalize leading-6 text-slate-900">
            {amount}
          </span>
        </p>
        <p className="text-sm">
          Tenure (in months):{' '}
          <span className="font-semibold capitalize leading-6 text-slate-900">
            {tenure}
          </span>
        </p>
        <p className="text-sm">
          Interest:{' '}
          <span className="font-semibold capitalize leading-6 text-slate-900">
            {interest}
          </span>
        </p>
      </div>

      <div className="flex space-x-2">
        {!(postedBy.userid === session?.user._id) && (
          <button
            onClick={() => acceptLoanRequest(_id)}
            className="rounded-md bg-blue-500 p-1 px-3 text-sm uppercase text-white transition-all duration-300 hover:bg-white hover:text-blue-500 hover:ring-[1.4px] hover:ring-blue-500"
          >
            Accept
          </button>
        )}
        {!(postedBy.userid === session?.user._id) && (
          <button
            onClick={() => router.push(`/`)}
            className="rounded-md bg-blue-500 p-1 px-3 text-sm uppercase text-white transition-all duration-300 hover:bg-white hover:text-blue-500 hover:ring-[1.4px] hover:ring-blue-500"
          >
            Modify
          </button>
        )}
        <button
          onClick={() =>
            postedBy.userid === session?.user._id
              ? deleteLoan(_id)
              : rejectLoan()
          }
          className="rounded-md bg-red-500 p-1 px-3 text-sm uppercase text-white transition-all duration-300 hover:bg-white hover:text-red-500 hover:ring-[1.4px] hover:ring-red-500"
        >
          {postedBy.userid === session?.user._id ? 'Delete' : 'Reject'}
        </button>
      </div>
    </li>
  )
}

export default LoanItem
