import React from 'react'
import { motion } from 'framer-motion'

export default function App() {
  return (
    <div className='flex flex-col h-screen bg-gray-100'>
      <header className='flex items-center gap-3 bg-white shadow px-6 py-3'>
        <img src='/ISGEC_logo.png' className='h-10' />
        <h1 className='text-xl font-bold bg-gradient-to-r from-blue-700 to-blue-400 bg-clip-text text-transparent'>
          ISGEC – Project Tracking Dashboard
        </h1>
      </header>

      <main className='grid grid-cols-3 gap-4 p-6'>
        <motion.div initial={{opacity:0,scale:0.8}} animate={{opacity:1,scale:1}} className='bg-white p-6 rounded-xl shadow'>
          <h2 className='text-gray-600 text-sm'>Outstanding Billing</h2>
          <p className='text-3xl font-bold text-blue-700'>₹ 2863 L</p>
        </motion.div>

        <motion.div initial={{opacity:0,scale:0.8}} animate={{opacity:1,scale:1}} className='bg-white p-6 rounded-xl shadow'>
          <h2 className='text-gray-600 text-sm'>Billed</h2>
          <p className='text-3xl font-bold text-green-700'>₹ 500 L</p>
        </motion.div>

        <motion.div initial={{opacity:0,scale:0.8}} animate={{opacity:1,scale:1}} className='bg-white p-6 rounded-xl shadow'>
          <h2 className='text-gray-600 text-sm'>Total Projects</h2>
          <p className='text-3xl font-bold text-purple-700'>11</p>
        </motion.div>
      </main>
    </div>
  )
}
