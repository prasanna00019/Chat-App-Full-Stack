import React from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import MessageContainer from '../../components/messages/MessageContainer'

const Home = () => {
  return (
    <div className='flex flex-col sm:flex  sm:h-[450px] md:h-[550px] rounded-lg overflow-auto bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
     <Sidebar/>
     <MessageContainer/>     
    </div>
  )
}

export default Home
