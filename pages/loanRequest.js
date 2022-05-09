import React, { useState } from 'react'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import { getSession, useSession } from 'next-auth/react'
import { requestALoan } from '../utils/request'
import { useRouter } from 'next/router'

function LoanRequest() {
  const [errorMessage, setErrorMessage] = useState('')
  const [amount, setAmount] = useState('')
  const [tenure, setTenure] = useState('')
  const [interest, setInterest] = useState('')
  const [loading, setLoading] = useState('')
  const { data: session } = useSession()
  const router = useRouter()

  const requestLoan = async (e) => {
    e.preventDefault()

    const payload = {
      postedBy: {
        userid: session.user._id,
        username: session.user.username,
        email: session.user.email,
      },
      amount,
      tenure,
      interest,
    }
    setLoading(true)

    const loanRequest = await requestALoan(payload)

    if (loanRequest.hasError) {
      setErrorMessage(loanRequest.errorMessage)
    } else {
      console.log(loanRequest)
      setErrorMessage('')
      setAmount('')
      setTenure('')
      setInterest('')
      router.replace('/')
    }
    setLoading(false)
  }

  return (
    <div className="overflow-hidden bg-slate-50 text-slate-900 antialiased md:min-h-screen">
      <Head>
        <title>Request a loan</title>
      </Head>

      <Navbar />

      <main className="grid min-h-screen w-full place-items-center">
        <form
          onSubmit={requestLoan}
          className="mx-5 flex flex-col space-y-5 rounded-md bg-white p-11 shadow-md md:w-1/2 xl:w-1/3 2xl:w-1/4"
        >
          <h1 className="mb-5 text-center text-4xl font-thin">
            Request A Loan
          </h1>
          {errorMessage && (
            <p className="mb-5 text-center text-sm font-semibold capitalize text-red-500">
              {errorMessage}
            </p>
          )}
          <div className="w-full">
            <label htmlFor="amt" className="label">
              Loan Amount required:
            </label>
            <input
              className="input"
              type="text"
              name="amt"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="w-full">
            <label htmlFor="tenure" className="label">
              Tenure (in months):
            </label>
            <input
              className="input"
              type="text"
              name="tenure"
              value={tenure}
              onChange={(e) => setTenure(e.target.value)}
            />
          </div>
          <div className="w-full">
            <label htmlFor="interest" className="label">
              Interest Rate:
            </label>
            <input
              className="input"
              type="text"
              name="interest"
              value={interest}
              onChange={(e) => setInterest(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className={`authButton cursor-pointer text-center ${
              loading && 'opacity-80'
            }`}
            disabled={loading}
          >
            {loading ? 'Hold on...' : 'Make loan request'}
          </button>
        </form>
      </main>
    </div>
  )
}

export default LoanRequest

export async function getServerSideProps(context) {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  return {
    props: { session },
  }
}
