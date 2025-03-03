import React, { useState } from 'react';


import { Link } from "react-router-dom";


export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className='sticky top-0 z-10'>
            <header className='bg-olive-3 p-4 flex'>
                <div className='w-full max-w-6xl mx-auto flex justify-between items-center'>
                    <Link to="/">
                        <img src="/src/assets/logo.svg" className='h-7' />
                    </Link>
                    <ul className='hidden md:flex text-white'>
                        <span className='flex justify-between me-8'>
                            <li className='cursor-pointer px-2 hover:text-zinc-400 transition-all'><Link to="/admin-login">Administração</Link></li>
                            <p className='px-4 text-zinc-300'>|</p>
                        </span>
                        <li className='cursor-pointer px-2 hover:text-zinc-400 transition-all'><Link to="/">Início</Link></li>
                        <li className='cursor-pointer px-2 hover:text-zinc-400 transition-all'><Link to="/gift-list">Lista de presentes</Link></li>
                    </ul>
                    <div className='flex md:hidden'>
                        <div className="relative">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="material-symbols-outlined text-white cursor-pointer"
                            >
                                menu
                            </button>
                            <div
                                onClick={() => setIsOpen(false)}
                                className={`absolute top-full -left-36 mt-2 w-43 bg-white shadow-lg rounded-md transition-all ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none "
                                    }`}
                            >
                                <ul className="p-2 space-y-2">
                                    <span >
                                        <li className='p-2 hover:bg-gray-100 cursor-pointer'><Link to="/admin-login">Administração</Link></li>
                                        <hr className='m-2 mt-3 border-zinc-400'/>

                                    </span>
                                    <li className="p-2 hover:bg-gray-100 cursor-pointer">Início</li>
                                    <li className="p-2 hover:bg-gray-100 cursor-pointer">Lista de presentes</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
}
