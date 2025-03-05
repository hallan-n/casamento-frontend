import React from 'react'
import { Link } from 'react-router-dom'

export default function AdminMenu() {
    return (
        <div className='flex flex-wrap gap-2 mt-10'>
            <Link to="/add-guest" className='w-full md:w-auto'>
                <buton className="flex justify-between gap-2 cursor-pointer hover:bg-zinc-200 transition p-2 px-4 border border-gray-300 rounded">
                    <p className='text-nowrap'>Adicionar convidado</p>
                    <span className="material-symbols-outlined">add</span>
                </buton>
            </Link>
            <Link to="/guest-list" className='w-full md:w-auto'>
                <buton className="flex justify-between gap-2 cursor-pointer hover:bg-zinc-200 transition p-2 px-4 border border-gray-300 rounded">
                    <p className='text-nowrap'>Lista de convidados</p>
                    <span className="material-symbols-outlined">receipt_long</span>
                </buton>
            </Link>
            <Link to="/gift-list" className='w-full md:w-auto'>
                <buton className="flex justify-between gap-2 cursor-pointer hover:bg-zinc-200 transition p-2 px-4 border border-gray-300 rounded">
                    <p className='text-nowrap'>Lista de presentes</p>
                    <span className="material-symbols-outlined">featured_seasonal_and_gifts</span>
                </buton>
            </Link>
            <Link to="/add-gift" className='w-full md:w-auto'>
                <buton className="flex justify-between gap-2 cursor-pointer hover:bg-zinc-200 transition p-2 px-4 border border-gray-300 rounded">
                    <p className='text-nowrap'>Adicionar presebte</p>
                    <span className="material-symbols-outlined">add</span>
                </buton>
            </Link>
        </div>
    )
}
