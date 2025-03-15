import React from 'react'
import Header from '../components/Header'
import canto from '../assets/canto.png'
import flores from '../assets/flores.png'
import teste from '../assets/teste.png'

export default function Home() {
  return (
    <div className=''>
      <Header />
      <main className='flex justify-center items-center bg-olive-2 relative h-screen' style={{ background: "radial-gradient(circle, rgba(103, 114, 84), rgba(57, 64, 48))" }}>
        <img src={canto} alt="Imagem" class="absolute bottom-0 left-0 w-60 h-60" />

        <div className='text-white p-4 max-w-4xl'>
          <div className='flex items-center gap-5'>
            <img src={teste} alt="Imagem" className='w-2xl' />
            <div>
              <h1 className='font-bold text-5xl mb-4'>Love Wedding</h1>
              <p>simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's</p>
            </div>
          </div>
          <div className='mx-auto mb-4 flex gap-4 justify-between absolute bottom-16'>
            <div className='w-40 h-72 rounded-md bg-white'></div>
            <div className='w-40 h-72 rounded-md bg-white'></div>
            <div className='w-40 h-72 rounded-md bg-white'></div>
            <div className='w-40 h-72 rounded-md bg-white'></div>
          </div>
        </div>
      </main>
    </div>
  )
}
