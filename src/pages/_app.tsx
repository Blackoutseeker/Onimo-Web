import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Roboto } from 'next/font/google'
import { useEffect } from 'react'
import { initializeFirebaseAppCheck } from '@/utils/firebase'
import { Provider as ReduxProvider } from 'react-redux'
import { store } from '@/services/store'
import UserProvider from '@/components/UserProvider'

const roboto = Roboto({
  weight: ['300', '500', '700'],
  subsets: ['latin']
})

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    initializeFirebaseAppCheck()
  }, [])

  return (
    <ReduxProvider store={store}>
      <UserProvider>
        <main className={roboto.className}>
          <Component {...pageProps} />
        </main>
      </UserProvider>
    </ReduxProvider>
  )
}
