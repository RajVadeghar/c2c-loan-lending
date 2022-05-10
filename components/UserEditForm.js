import { DocumentAddIcon } from '@heroicons/react/outline'
import { useSession } from 'next-auth/react'
import { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleAadhar } from '../redux/aadharModalSlice'
import { togglePan } from '../redux/panModalSlice'

function UserEditForm({ updateUser }) {
  const user = useSelector((state) => state.userState.data)
  const { data: session } = useSession()
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [accNum, setAccNum] = useState(user.accnum)
  const [ctc, setCtc] = useState(user.ctc)
  const dispatch = useDispatch()

  const update = async (e) => {
    e.preventDefault()

    const payload = { id: session.user._id, accnum: accNum, ctc }

    const user = await updateUser(payload)

    if (user.hasError) {
      setErrorMessage(user.errorMessage)
    } else {
      setSuccessMessage('Updated user successfully! Cheers :)')
    }
  }

  const uploadAadhar = () => {
    dispatch(toggleAadhar())
  }

  const uploadPan = () => {
    dispatch(togglePan())
  }

  const uploadSalSlip = () => {
    // TODO:
    alert('To be implemented')
  }

  return (
    <form
      onSubmit={update}
      className="flex w-full animate-slide-up flex-col items-start space-y-4"
    >
      {errorMessage && (
        <p className="text center mb-5 text-center text-sm font-semibold capitalize text-red-500">
          {errorMessage}
        </p>
      )}
      {successMessage && (
        <p className="text center w-full text-center text-sm font-semibold capitalize text-green-500">
          {successMessage}
        </p>
      )}

      <div className="w-full">
        <label htmlFor="accnum" className="label">
          Account Number:
        </label>
        <input
          value={accNum}
          onChange={(e) => setAccNum(e.target.value)}
          name="accnum"
          className="input"
        />
      </div>

      <div className="w-full">
        <label htmlFor="ctc" className="label">
          CTC:
        </label>
        <input
          value={ctc}
          onChange={(e) => setCtc(e.target.value)}
          name="ctc"
          className="input"
        />
      </div>

      {user.aadhar ? (
        <div
          onClick={uploadAadhar}
          className={`group relative grid h-12 w-full cursor-pointer place-items-center overflow-hidden rounded-md border-2 bg-slate-50 hover:shadow-md`}
        >
          <div className="absolute inset-0 z-10  hidden place-items-center text-xl font-bold text-black group-hover:grid">
            Aadhar
          </div>
          <img
            className="h-full object-cover object-bottom brightness-110 group-hover:opacity-60"
            src={user.aadhar}
            alt=""
          />
        </div>
      ) : (
        <div className="w-full">
          <label className="label">Aadhar Card:</label>
          <div
            onClick={uploadAadhar}
            className="group grid h-12 w-full cursor-pointer place-items-center rounded-md border-2 bg-slate-50 transition-all hover:shadow-md"
          >
            <div className="flex items-center gap-x-2">
              <p className="text-xl font-thin">Upload Aadhar</p>
              <DocumentAddIcon className="h-7 w-7 text-gray-700 group-hover:text-gray-600" />
            </div>
          </div>
        </div>
      )}

      {user.pan ? (
        <div
          onClick={uploadPan}
          className={`group relative grid h-12 w-full cursor-pointer place-items-center overflow-hidden rounded-md border-2 bg-slate-50 hover:shadow-md`}
        >
          <div className="absolute inset-0 z-10  hidden place-items-center text-xl font-bold text-black group-hover:grid">
            Pan Card
          </div>
          <img
            className="h-full object-cover object-bottom brightness-110 group-hover:opacity-60"
            src={user.pan}
            alt=""
          />
        </div>
      ) : (
        <div className="w-full">
          <label className="label">Pan Card:</label>
          <div
            onClick={uploadPan}
            className="group grid h-12 w-full cursor-pointer place-items-center rounded-md border-2 bg-slate-50 transition-all hover:shadow-md"
          >
            <div className="flex items-center gap-x-2">
              <p className="text-xl font-thin">Upload PanCard</p>
              <DocumentAddIcon className="h-7 w-7 text-gray-700 group-hover:text-gray-600" />
            </div>
          </div>
        </div>
      )}

      {user.salaryslips.length > 0 ? (
        <div
          onClick={() => window.open(user.salaryslips[0])}
          className={`group relative grid h-12 w-full cursor-pointer place-items-center overflow-hidden rounded-md border-2 bg-slate-50 hover:shadow-md`}
        >
          <div className="absolute inset-0 z-10  hidden place-items-center text-xl font-bold text-black group-hover:grid">
            SalarySlip
          </div>
          <img
            className="h-full object-cover object-bottom brightness-110 group-hover:opacity-60"
            src={user.salaryslips[0]}
            alt=""
          />
        </div>
      ) : (
        <div className="w-full">
          <label className="label">Salary Slips:</label>
          <div
            onClick={uploadSalSlip}
            className="group grid h-12 w-full cursor-pointer place-items-center rounded-md border-2 bg-slate-50 transition-all hover:shadow-md"
          >
            <div className="flex items-center gap-x-2">
              <p className="text-xl font-thin">Upload Salary Slips</p>
              <DocumentAddIcon className="h-7 w-7 text-gray-700 group-hover:text-gray-600" />
            </div>
          </div>
        </div>
      )}

      {/* Bank Account details */}

      <button
        type="submit"
        className="rounded-md bg-blue-500 p-2 px-3 text-sm uppercase text-white hover:bg-white hover:text-blue-500 hover:ring-2 hover:ring-blue-500"
      >
        Update Details
      </button>
    </form>
  )
}

export default UserEditForm
