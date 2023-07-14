import type { FC } from 'react'
import Header from './Header'
import VoidChat from './VoidChat'
import Footer from './Footer'

const ChatContainer: FC = () => {
  return (
    <div className="flex flex-1 flex-col space-y-5">
      <Header />
      <VoidChat />
      <Footer />
    </div>
  )
}

export default ChatContainer
