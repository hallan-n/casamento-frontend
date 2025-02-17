import React from 'react'
import Header from '../components/Header'

export default function Home() {
  return (
    <div className='h-screen'>
      <Header/>
      <main className='flex justify-center items-center bg-olive-2 h-full relative  w-full'>
        <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{backgroundImage: "url('src/assets/fundo.webp')"}}></div>
        <div className='text-white'>
          <p className='text-center font-daily text-6xl'>Jocimara & Hállan</p>
          <p className='text-center mt-2 text-2xl'>Estão casando</p>
        </div>
      </main>
    </div>
  )
}
