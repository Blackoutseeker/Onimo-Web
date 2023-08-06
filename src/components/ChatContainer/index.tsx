import type { HTMLAttributes, FC } from 'react'
import Header from './Header'
import Chat from './Chat'
import Footer from './Footer'

interface ChatContainerProps {
  className?: HTMLAttributes<HTMLDivElement>['className']
  toggleView: () => void
}

const ChatContainer: FC<ChatContainerProps> = ({ className, toggleView }) => {
  return (
    <div className={`flex flex-grow flex-col space-y-5 ${className}`}>
      <Header toggleView={toggleView} />
      <Chat />
      <Footer />
    </div>
  )
}

export default ChatContainer
