import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/outline'
import { useSession } from 'next-auth/react'
import { useDispatch, useSelector } from 'react-redux'
import TimeAgo from 'timeago-react'
import { toggleDetails } from '../redux/detailsSlice'

function UserDetails({ loans }) {
  const user = useSelector((state) => state.userState.data)
  const { data: session } = useSession()

  const loggedInUser = session?.user._id === user?._id

  const isOpen = useSelector((state) => state.detailsState.isOpen)
  const { email, username, createdAt, salarySlips, accnum, ctc } = user

  const dispatch = useDispatch()

  const showDetails = () => {
    dispatch(toggleDetails())
  }

  return (
    <div className="animate-slide-up">
      <div className="mb-3 flex flex-col space-y-2">
        <p className="flex flex-col space-y-2 text-4xl font-thin">
          {username}{' '}
        </p>
        <p className="font-Dongle text-2xl text-gray-500">
          Joined <TimeAgo datetime={createdAt} />
        </p>
      </div>
      <p className="">
        <span className="mr-2 text-sm font-semibold uppercase text-gray-600">
          Email:
        </span>{' '}
        {email}
      </p>
      {accnum && (
        <p className="">
          <span className="mr-2 text-sm font-semibold uppercase text-gray-600">
            Account Number:
          </span>{' '}
          {accnum}
        </p>
      )}
      {ctc && (
        <p className="">
          <span className="mr-2 text-sm font-semibold uppercase text-gray-600">
            CTC:
          </span>{' '}
          {ctc}
        </p>
      )}

      {/* <p className="uppercase">
        <span className="text-sm font-semibold text-gray-600">Roll No:</span>{' '}
        {uid}
      </p>  */}
      <div
        onClick={showDetails}
        className="link group my-3 flex items-center gap-x-1"
      >
        <p className="text-xs">
          {isOpen ? 'Show less details' : 'Show more details'}
        </p>
        {isOpen ? (
          <ChevronUpIcon className="h-5 w-5 group-hover:opacity-70" />
        ) : (
          <ChevronDownIcon className="h-5 w-5 group-hover:opacity-70" />
        )}
      </div>

      {isOpen && (
        <section className="relative my-8 mx-auto flex w-full animate-slide-up flex-col gap-y-3 shadow-sm transition-all">
          <details
            className="w-full rounded-lg open:bg-white open:p-6 open:shadow-lg open:ring-1 open:ring-black/5"
            open
          >
            <summary className="cursor-pointer select-none text-sm font-semibold capitalize leading-6 text-slate-900">
              Aadhar Card
            </summary>
            <div className="mt-3 flex items-start justify-between gap-x-4 text-sm leading-6 text-slate-600">
              <div
                onClick={() => window.open(user.aadhar)}
                className="group relative col-span-1 aspect-square w-full cursor-pointer overflow-hidden rounded-lg border-2 shadow-md"
              >
                <div className="absolute inset-0 hidden bg-black/10 group-hover:block" />
                <div className="absolute inset-0 hidden place-items-center bg-black/60 group-hover:grid">
                  <p className="z-10 text-3xl font-light capitalize text-white">
                    Open in new tab
                  </p>
                </div>
                <img
                  className="h-full w-full object-cover object-center"
                  src={user.aadhar}
                  alt=""
                />
              </div>
            </div>
          </details>

          <details
            className="w-full rounded-lg open:bg-white open:p-6 open:shadow-lg open:ring-1 open:ring-black/5"
            open
          >
            <summary className="cursor-pointer select-none text-sm font-semibold capitalize leading-6 text-slate-900">
              Pan Card
            </summary>
            <div className="mt-3 flex items-start justify-between gap-x-4 text-sm leading-6 text-slate-600">
              <div
                onClick={() => window.open(user.pan)}
                className="group relative col-span-1 aspect-square w-full cursor-pointer overflow-hidden rounded-lg border-2 shadow-md"
              >
                <div className="absolute inset-0 hidden bg-black/10 group-hover:block" />
                <div className="absolute inset-0 hidden place-items-center bg-black/60 group-hover:grid">
                  <p className="z-10 text-3xl font-light capitalize text-white">
                    Open in new tab
                  </p>
                </div>
                <img
                  className="h-full w-full object-cover object-center"
                  src={user.pan}
                  alt=""
                />
              </div>
            </div>
          </details>

          <details
            className="w-full rounded-lg open:bg-white open:p-6 open:shadow-lg open:ring-1 open:ring-black/5"
            open
          >
            <summary className="cursor-pointer select-none text-sm font-semibold capitalize leading-6 text-slate-900">
              Salary Slips
            </summary>
            <div className="mt-3 flex items-start justify-between gap-x-4 text-sm leading-6 text-slate-600">
              <div className="grid grid-cols-3 gap-3">
                {Array.apply(null, new Array(3)).map((i) => (
                  <div
                    key={i}
                    onClick={() => window.open(user.pan)}
                    className="group relative col-span-1 aspect-square w-full cursor-pointer overflow-hidden rounded-lg border-2 shadow-md"
                  >
                    <div className="absolute inset-0 hidden bg-black/10 group-hover:block" />
                    <div className="absolute inset-0 hidden place-items-center bg-black/60 group-hover:grid">
                      <p className="z-10 text-sm font-light capitalize text-white">
                        Open in new tab
                      </p>
                    </div>
                    <img
                      className="h-full w-full object-cover object-center"
                      src={user.aadhar}
                      alt=""
                    />
                  </div>
                ))}
              </div>
            </div>
          </details>
        </section>
      )}
    </div>
  )
}

export default UserDetails
