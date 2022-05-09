import { signOut, useSession } from 'next-auth/react'
import { LogoutIcon, UserCircleIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import { useState } from 'react'

function Navbar() {
  const { data: session } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const logout = async () => {
    setLoading(true)
    await signOut()
    setLoading(false)
  }

  return (
    <div
      className={`h-20 border-b-2 shadow-md ${loading && 'animate-pulse'} z-50`}
    >
      <div className="mx-auto flex h-full w-screen items-center justify-between px-5 md:max-w-screen-2xl md:px-0 xl:max-w-screen-xl">
        <div>
          <h1
            onClick={() => router.push(`/${session?.user._id}`)}
            className="relative hidden font-Dongle text-4xl before:absolute before:-inset-1 before:block before:-skew-y-3 before:bg-indigo-500 hover:cursor-pointer md:inline-block"
          >
            <span className="relative font-bold text-white">
              Hieee, {session?.user.username || session?.user.email || ''}
            </span>
          </h1>
        </div>
        <ul className="flex items-center space-x-4 sm:space-x-7">
          <li
            onClick={() => router.push('/')}
            className={`link text-sm text-slate-800 sm:text-base ${
              router.pathname === '/' && 'active'
            }`}
          >
            Home
          </li>
          <li
            onClick={() => router.push('/loanRequest')}
            className={`link text-sm text-slate-800 sm:text-base ${
              router.pathname === '/loanRequest' && 'active'
            }`}
          >
            Request a loan
          </li>
          <li
            onClick={() => router.push(`/${session?.user._id}`)}
            className={`link text-slate-800 ${
              router.pathname === '/profile' && 'active'
            }`}
          >
            <div className="h-11 w-11 overflow-hidden rounded-full">
              {session?.user.img ? (
                <img
                  className="h-full rounded-full object-cover object-center brightness-110"
                  src={session?.user.img}
                />
              ) : (
                <UserCircleIcon className="h-full" />
              )}
            </div>
          </li>
          <li onClick={logout} className="link text-slate-800">
            <div className="h-9">
              <LogoutIcon className="h-full" />
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar
