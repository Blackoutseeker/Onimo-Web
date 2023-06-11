import type { NextPage } from 'next'
import Head from 'next/head'
import RoomsContainer from '@/components/RoomsContainer'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Onimo</title>
      </Head>
      <main className="flex items-center justify-center min-h-screen">
        <RoomsContainer />
      </main>
    </>
  )
}

export default Home
