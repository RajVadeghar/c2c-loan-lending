import { getSession } from 'next-auth/react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { registeruser } from '../utils/request'

function Register() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const registerUser = async (e) => {
    e.preventDefault()

    const payload = {
      username,
      email,
      password,
    }
    setLoading(true)
    const user = await registeruser(payload)

    if (user.hasError) {
      setErrorMessage(user.errorMessage)
    } else {
      setErrorMessage('')
      setUsername('')
      setEmail('')
      setPassword('')
      router.replace('/login')
    }
    setLoading(false)
  }

  return (
    <div className="grid min-h-screen place-items-center overflow-hidden bg-register bg-cover bg-center">
      <Head>
        <title>{loading ? 'Registering...' : 'Student Registration'}</title>
        <link rel="icon" href="/1logo.png" />
      </Head>
      <form
        className="mx-5 flex flex-col space-y-5 rounded-md bg-white p-11 shadow-md md:w-1/2 xl:w-1/3 2xl:w-1/4"
        onSubmit={registerUser}
      >
        <h1 className="mb-5 text-center text-4xl font-thin">Register</h1>
        {errorMessage && (
          <p className="mb-5 text-center text-sm font-semibold capitalize text-red-500">
            {errorMessage}
          </p>
        )}
        <div className="w-full">
          <label htmlFor="rno" className="label">
            Username:
          </label>
          <input
            className="input"
            type="text"
            name="rno"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="w-full">
          <label htmlFor="email" className="label">
            email:
          </label>
          <input
            className="input"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="w-full">
          <label htmlFor="password" className="label">
            password:
          </label>
          <input
            className="input"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="authButton cursor-pointer text-center">
          {loading ? 'Registering...' : 'Register'}
        </button>
        <p>
          Already have an account?{' '}
          <span className="link">
            <Link href="/login">Sign In</Link>
          </span>
        </p>
      </form>
    </div>
  )
}

export default Register

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
