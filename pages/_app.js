import '../styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import { Provider } from 'react-redux'
import store from '../redux/store'

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session} refetchInterval={5 * 60}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </SessionProvider>
  )
}

export default MyApp
