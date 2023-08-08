import { FC, useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import RoomsContainer from '@/components/RoomsContainer'
import ChatContainer from '@/components/ChatContainer'

const MainView: FC = () => {
  const [view, setView] = useState<boolean>(false)

  const toggleView = () => {
    setView(!view)
  }

  return (
    <>
      <RoomsContainer
        className={`md:flex ${view ? 'hidden' : 'flex'}`}
        toggleView={toggleView}
      />
      <ChatContainer
        className={`md:flex ${view ? 'flex' : 'hidden'}`}
        toggleView={toggleView}
      />
    </>
  )
}

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Onimo</title>
      </Head>
      <main className="flex min-h-screen items-center justify-center">
        <div className="flex w-full lg:w-3/5">
          <MainView />
        </div>
      </main>
    </>
  )
}

export default Home
