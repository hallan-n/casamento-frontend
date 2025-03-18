import React from 'react'
import Header from '../components/Header'
import casal from '../assets/casal.png'
import divider from '../assets/divider.svg'
import logo_full from '../assets/logo_full.svg'

export default function Home() {
  return (
    <div>
      <Header />
      <main className="h-screen" style={{ background: "radial-gradient(circle, rgba(103, 114, 84), rgba(57, 64, 48))" }}>
        <img className='hidden lg:block absolute top-0 left-0 h-screen w-auto' src={casal} alt="Casal" />
        <div className='max-w-6xl mx-auto'>
          <div className='flex justify-center lg:justify-end h-screen'>
            <div className='text-white text-center flex flex-col justify-center items-center max-w-2xl p-4'>
              <img class="w-96" src={logo_full} alt="Casal" />
              <img class="w-96 my-8" src={divider} alt="Casal" />
              <p className='font-caviar font-bold text-6xl'>Save the Date</p>
              <p className='font-caviar font-bold mt-8 text-2xl'>Sábado, 04 de Outubro!</p>
              <p className='font-caviar text-2xl mt-2'>Gostariamos de convidá-lo(a)</p>
              <p className='font-caviar text-2xl mt-2'>para celebrar conosco este</p>
              <p className='font-caviar text-2xl mt-2'>momento especial de união.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
