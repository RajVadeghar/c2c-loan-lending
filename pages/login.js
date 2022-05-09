import Link from 'next/link'
import { getSession, signIn } from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const router = useRouter()

  const loginUser = async (e) => {
    e.preventDefault()

    const payload = { username, password }
    setLoading(true)
    const user = await signIn('credentials', { ...payload, redirect: false })

    if (!user.error) {
      router.replace('/')
    } else {
      setErrorMessage(user.error)
    }
    setLoading(false)
  }

  return (
    <div className="grid min-h-screen place-items-center bg-login bg-cover bg-center">
      <Head>
        <title>{loading ? 'Signing In...' : 'Sign In'}</title>
        <link rel="icon" href="/1logo.png" />
      </Head>
      <form
        onSubmit={loginUser}
        className="mx-5 flex flex-col space-y-5 rounded-md bg-white p-11 shadow-md md:w-1/2 xl:w-1/3 2xl:w-1/4"
      >
        <h1 className="mb-5 text-center text-4xl font-thin">Sign In</h1>
        {errorMessage && (
          <p className="mb-5 text-center text-sm font-semibold capitalize text-red-500">
            {errorMessage}
          </p>
        )}
        <div className="w-full">
          <label htmlFor="uid" className="label">
            Username:
          </label>
          <input
            className="input"
            type="text"
            name="uid"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="w-full">
          <label htmlFor="password" className="label">
            Password:
          </label>
          <input
            className="input"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className={`authButton cursor-pointer text-center ${
            loading && 'opacity-80'
          }`}
          disabled={loading}
        >
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
        <p>
          Haven't registered yet?{' '}
          <span className="link">
            <Link href="/register">Register</Link>
          </span>
        </p>
      </form>
    </div>
  )
}

export default Login

export async function getServerSideProps(context) {
  const session = await getSession(context)

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: { session },
  }
}
