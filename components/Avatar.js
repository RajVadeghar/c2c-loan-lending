import { CameraIcon, UserCircleIcon } from '@heroicons/react/solid'
import { useSession } from 'next-auth/react'
import { useDispatch, useSelector } from 'react-redux'
import { toggle } from '../redux/modalSlice'

function Avatar({ src = null }) {
  const { data: session } = useSession()
  const userDataFromStore = useSelector((state) => state.userState)
  const user = userDataFromStore?.data
  const loggedInUser = session?.user._id === user?._id

  const dispatch = useDispatch()
  const isOpen = useSelector((state) => state.modalState.isOpen)

  const uploadPhoto = () => {
    loggedInUser && dispatch(toggle())
  }

  return (
    <div
      className={`group relative grid h-40 w-40 place-items-center overflow-hidden rounded-full bg-white ring-4 ring-indigo-500`}
    >
      {src ? (
        <img
          className="h-full rounded-full object-cover object-top brightness-110"
          src={src}
          alt=""
        />
      ) : (
        <UserCircleIcon className="h-full" />
      )}
      {/* <div className="absolute inset-0 backdrop-blur-sm z-0">
        <img
          className="h-full object-cover object-center"
          src={src || "/avatar.png"}
          alt=""
        />
      </div> */}
      <div
        onClick={uploadPhoto}
        className={`absolute inset-0 grid place-items-center bg-black/50 opacity-0 ${
          loggedInUser && 'group-hover:cursor-pointer group-hover:opacity-100'
        }`}
      >
        <div className="h-16 rounded-full bg-black/10 p-3">
          <CameraIcon className="h-full text-white" />
        </div>
      </div>
    </div>
  )
}

export default Avatar
