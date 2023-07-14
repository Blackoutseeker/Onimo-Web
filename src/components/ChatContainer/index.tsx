import type { FC } from 'react'
import Header from './Header'
import VoidChat from './VoidChat'

const ChatContainer: FC = () => {
  return (
    <div className="flex flex-1 flex-col space-y-5">
      <Header />
      <VoidChat />
    </div>
  )
}

export default ChatContainer
