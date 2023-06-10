import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Roboto } from 'next/font/google'

const inter = Roboto({
  weight: ['500', '700'],
  subsets: ['latin']
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={inter.className}>
      <Component {...pageProps} />
    </main>
  )
}
