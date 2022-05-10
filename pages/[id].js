import { PencilIcon, XIcon } from '@heroicons/react/outline'
import { deleteObject, ref } from 'firebase/storage'
import { getSession, signOut, useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AadharModal from '../components/AadharModal'
import Avatar from '../components/Avatar'
import Modal from '../components/Modal'
import Navbar from '../components/Navbar'
import PanModal from '../components/PanModal'
import UserDetails from '../components/UserDetails'
import UserEditForm from '../components/UserEditForm'
import { update } from '../redux/userSlice'
import { storage } from '../utils/firebase'
import {
  deleteuser,
  getLoansByUser,
  getuser,
  updateuser,
} from '../utils/request'

import UserProfileNavigation from '../components/UserProfileNavigation'

function Profile({ userData, loans }) {
  const { data: session } = useSession()
  const [isEditing, setIsEditing] = useState(false)
  const [message, setMessage] = useState(false)
  const [loading, setLoading] = useState(false)
  const userDataFromStore = useSelector((state) => state.userState)

  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribe = async () => {
      dispatch(update(userData))
    }
    return unsubscribe()
  }, [])

  const router = useRouter()

  const user = userDataFromStore?.data
  const loggedInUser = session?.user._id === user?._id

  const updateUser = async (payload) => {
    if (loading) return
    setLoading(true)
    const user = await updateuser({ ...payload })
    dispatch(update(user))
    setLoading(false)
    return user
  }

  const deleteUser = async (id) => {
    if (loading) return
    setLoading(true)

    const deleteRef = ref(
      storage,
      `images/${userData.data._id}/profileImg/${userData.data.email}`
    )

    deleteObject(deleteRef)
      .then(async () => {
        setMessage('')
      })
      .catch((err) => console.log(err))

    const user = await deleteuser(id)
    if (user.hasError) {
      setMessage(user.errorMessage)
    } else {
      setLoading(false)
      await signOut()
      router.replace('/')
    }
    setLoading(false)
  }

  return (
    <div
      className={`min-h-screen w-full select-none bg-slate-50 text-slate-900 antialiased`}
    >
      <Head>
        <title>welcome {session?.user?.email}</title>
        <link rel="icon" href="/1logo.png" />
      </Head>
      <Navbar />
      <Modal />
      <AadharModal />
      <PanModal />
      <div className="mx-auto flex h-full w-screen items-center justify-between px-5 md:max-w-screen-2xl md:px-0 xl:max-w-screen-xl">
        <div className="w-full py-5">
          <section className="relative mx-auto flex w-full max-w-screen-md flex-col items-center gap-y-8 gap-x-16 border-[0.2px] bg-white p-11 shadow-sm md:flex-row md:items-start">
            {message && (
              <p className="mb-5 text-center text-sm font-semibold capitalize text-red-500">
                {message}
              </p>
            )}

            {loggedInUser && (
              <div
                onClick={() => setIsEditing((val) => !val)}
                className="absolute top-3 right-3 h-7 cursor-pointer font-bold text-gray-400"
              >
                {isEditing ? (
                  <XIcon className="h-full" />
                ) : (
                  <PencilIcon className="h-full" />
                )}
              </div>
            )}

            <Avatar src={user?.img} />

            <div className="flex flex-1 flex-col items-start space-y-2">
              {isEditing ? (
                <UserEditForm updateUser={updateUser} />
              ) : (
                <UserDetails />
              )}
              <div className="flex items-center gap-x-4">
                {!isEditing && loggedInUser && (
                  <button
                    onClick={signOut}
                    className="animate-slide-up rounded-md bg-blue-500 p-2 px-3 text-sm uppercase text-white hover:bg-white hover:text-blue-500 hover:ring-2 hover:ring-blue-500"
                  >
                    Sign Out
                  </button>
                )}

                {!isEditing && loggedInUser && (
                  <button
                    onClick={() => deleteUser(user._id)}
                    className="animate-slide-up rounded-md bg-red-500 p-2 px-3 text-sm uppercase text-white hover:bg-white hover:text-red-500 hover:ring-2 hover:ring-red-500"
                  >
                    Delete User
                  </button>
                )}
              </div>
            </div>
          </section>

          {!isEditing && <UserProfileNavigation loans={loans} />}
        </div>
      </div>
    </div>
  )
}

export default Profile

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx)
  const user = await getuser(ctx.query.id)
  const loans = await getLoansByUser(ctx.query.id)

  if (user.hasError) {
    return {
      notFound: true,
    }
  }

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: { session, userData: user, loans },
  }
}
