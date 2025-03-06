import React from 'react'
import Header from '../components/Header'
import fundo from '../assets/fundo.webp'
import logo_full from '../assets/logo_full.svg'

export default function Home() {
  return (
    <div className='h-screen'>
      <Header/>
      <main className='flex justify-center items-center bg-olive-2 h-full relative w-full'>
        <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: `url('${fundo}')`}}></div>
        <div className='text-white p-4'>
          <img src={logo_full}/>
          <p className='text-center mt-2 text-2xl'>Estão casando</p>
        </div>
      </main>
    </div>
  )
}
