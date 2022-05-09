import React, { useState } from 'react'
import { Tab } from '@headlessui/react'
import TimeAgo from 'timeago-react'
import { deleteloan } from '../utils/request'
import { useSession } from 'next-auth/react'
import { useSelector } from 'react-redux'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function UserProfileNavigation({ loans }) {
  let [tabs] = useState([
    'loans requested by you',
    'Modified Loans',
    'Notifications',
  ])
  const [loading, setLoading] = useState(false)
  const userDataFromStore = useSelector((state) => state.userState)
  const user = userDataFromStore?.data
  const { data: session } = useSession()
  const loggedInUser = session?.user._id === user?._id

  const deleteLoanReq = async (id) => {
    if (loading) return
    setLoading(true)

    const loan = await deleteloan(id)
    if (loan.hasError) {
      setMessage(loan.errorMessage)
    } else {
      setLoading(false)
    }
    setLoading(false)
  }

  return (
    <div className="relative mx-auto mt-3 flex w-full max-w-screen-md flex-col items-center gap-y-8 gap-x-16 border-[0.2px] bg-white shadow-sm md:flex-row md:items-start">
      <div className="w-full p-5">
        <Tab.Group>
          <Tab.List className="flex space-x-1 rounded-xl bg-indigo-500 p-1">
            {tabs.map((tab) => (
              <Tab
                key={tab}
                className={({ selected }) =>
                  classNames(
                    'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 transition-all focus:outline-none focus:ring-2',
                    selected
                      ? 'bg-white shadow'
                      : 'text-blue-100 hover:bg-indigo-700 hover:text-white'
                  )
                }
              >
                {tab}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="mt-2">
            <Tab.Panel className={'rounded-xl bg-white p-3'}>
              <ul>
                {loans.data.map(
                  ({
                    _id,
                    amount,
                    tenure,
                    interest,
                    postedBy,
                    createdAt,
                    status,
                  }) => (
                    <li
                      key={_id}
                      className="relative flex w-full flex-col gap-y-3 rounded-md bg-white p-6 shadow-md ring-1 ring-black/5"
                    >
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
                        <div className="flex flex-col gap-y-1">
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

                        <p className="text-xs text-gray-400">
                          <TimeAgo datetime={createdAt} />
                        </p>
                      </div>

                      <div className="flex space-x-2">
                        {loggedInUser ? (
                          <button
                            onClick={() => deleteLoanReq(_id)}
                            className="rounded-md bg-red-500 p-1 px-3 text-sm uppercase text-white transition-all duration-300 hover:bg-white hover:text-red-500 hover:ring-[1.4px] hover:ring-red-500"
                          >
                            delete
                          </button>
                        ) : (
                          status === 'pending' && (
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
                                {postedBy.userid === session?.user._id
                                  ? 'Delete'
                                  : 'Reject'}
                              </button>
                            </div>
                          )
                        )}
                      </div>
                    </li>
                  )
                )}
              </ul>
            </Tab.Panel>
            <Tab.Panel></Tab.Panel>
            <Tab.Panel></Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  )
}

export default UserProfileNavigation
