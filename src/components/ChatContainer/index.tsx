import type { FC } from 'react'
import Header from './Header'
import Chat from './Chat'
import Footer from './Footer'

const ChatContainer: FC = () => {
  return (
    <div className="flex flex-1 flex-col space-y-5">
      <Header />
      <Chat />
      <Footer />
    </div>
  )
}

export default ChatContainer
