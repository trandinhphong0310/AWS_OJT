import React from 'react'
import videoHomePage from '../../assets/video-20251020-130204.mp4'

export default function Home() {
  return (
    <div className='relative flex items-center justify-between min-h-screen px-20 bg-white overflow-hidden'>
      <div className='relative w-1/2 flex justify-center'>
        <video autoPlay muted loop width="651" height="651" className='object-cover '>
          <source
            src={videoHomePage}
            type='video/mp4'
          />
        </video>
      </div>
      <div className='text-[#2a222b] w-1/2 space-y-6'>
        <h1 className='text-[72px] font-bold leading-tight'>Get to know your customers with forms worth filling out</h1>
        <p className='text-[20px]'>Collect all the data you need to understand customers with forms designed to be refreshingly different.</p>
        <div>
          <button className='text-[16px] px-6 py-3 text-white bg-[#2a222b] rounded-2xl hover:opacity-70 cursor-pointer hover:scale-90 ease-in-out transition'>Sign up</button>
          <button className='text-[16px] px-6 py-3 underline hover:text-pink-400 cursor-pointer'>Compare plans</button>
        </div>
      </div>
    </div>
  )
}
