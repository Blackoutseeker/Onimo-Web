import type { NextPage } from 'next'
import Head from 'next/head'
import RoomsContainer from '@/components/RoomsContainer'
import ChatContainer from '@/components/ChatContainer'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Onimo</title>
        <meta
          name="description"
          content="Onimo é um chat anônimo, onde você pode criar salas de chat públicas ou privadas."
        />
      </Head>
      <main className="flex min-h-screen items-center justify-center">
        <div className="flex w-3/5">
          <RoomsContainer />
          <ChatContainer />
        </div>
      </main>
    </>
  )
}

export default Home
