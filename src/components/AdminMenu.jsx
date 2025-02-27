import React from 'react'
import { Link } from 'react-router-dom'

export default function AdminMenu() {
    return (
        <div className='flex gap-2'>
            <Link to="/add-guest">
            <buton className="flex justify-between gap-2 cursor-pointer hover:bg-zinc-200 transition p-2 px-4 border border-gray-300 rounded">
                <p>Adicionar convidado</p>
                <span className="material-symbols-outlined">add</span>
            </buton>
            </Link>
            <Link to="/guest-list">
            <buton className="flex justify-between gap-2 cursor-pointer hover:bg-zinc-200 transition p-2 px-4 border border-gray-300 rounded">
                <p>Lista de convidados</p>
                <span className="material-symbols-outlined">receipt_long</span>
            </buton>
            </Link>
        </div>
    )
}
