import { getSession, useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import LoanItem from '../components/LoanItem'
import Navbar from '../components/Navbar'
import { getLoans } from '../utils/request'

const Home = ({ loans }) => {
  const { data: session } = useSession()
  const router = useRouter()

  return (
    <div className="select-none overflow-hidden bg-slate-50 text-slate-900 antialiased md:min-h-screen">
      <Head>
        <title>C2C Loan Lending App</title>
      </Head>

      <Navbar />

      <main className="mx-auto flex h-full w-screen animate-slide-up items-center justify-between px-2 md:max-w-screen-2xl md:px-0  xl:max-w-screen-xl">
        {loans?.length === 0 ? (
          <div className="grid h-[calc(100vh-5rem)] w-full place-items-center">
            <p className="text-5xl font-thin">No loan requests yet</p>
          </div>
        ) : (
          <ul className="my-5 mx-auto flex w-full max-w-screen-md flex-col">
            {loans?.map((loan) => (
              <LoanItem key={loan._id} loan={loan} />
            ))}
          </ul>
        )}
      </main>
    </div>
  )
}

export default Home

export async function getServerSideProps(context) {
  const loans = await getLoans()
  
  return {
    props: { loans: loans?.data },
  }
}
