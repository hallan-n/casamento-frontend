import Header from '../components/Header'
import { useState } from "react";

export default function ConfirmPresence() {
    const [isOpen, setIsOpen] = useState(false);
    const [inputs, setInputs] = useState([""]);

    const addInput = () => {
        setInputs([...inputs, ""]);
    };

    return (
        <div>
            <Header />

            <div className='flex gap-14 h-screen w-full justify-center items-center p-4'>
                <img src="./src/assets/confirm.jpg" className='hidden md:block max-w-96 rounded-2xl' alt="" />
                <div method='POST' className='max-w-96'>
                    <h1 className='text-4xl font-bold mb-7'>Confirmar presença no casamento</h1>
                    <h2>Por favor, Preencha seus dados</h2>
                    <input
                        type="text"
                        placeholder="Nome completo"
                        className="mt-2 w-full rounded-lg border border-gray-300 bg-white py-2 p-4 text-gray-900 shadow-sm focus:outline-none focus:ring-2" />
                    <input
                        type="email"
                        placeholder="Email"
                        className="mt-2 w-full rounded-lg border border-gray-300 bg-white py-2 p-4 text-gray-900 shadow-sm focus:outline-none focus:ring-2" />
                    <input
                        type="tel"
                        placeholder="Celular"
                        className="mt-2 w-full rounded-lg border border-gray-300 bg-white py-2 p-4 text-gray-900 shadow-sm focus:outline-none focus:ring-2" />
                    <div className='hidden'>
                        <h2 className='font-bold mt-2'>Seus dados</h2>
                        <input
                            type="tel"
                            placeholder="Celular"
                            className="mt-2 w-full rounded-lg border border-gray-300 bg-white py-2 p-4 text-gray-900 shadow-sm focus:outline-none focus:ring-2" />

                    </div>



                    <div className='mt-4 mb-1 transition rounded-md text-white w-full bg-zinc-100'>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="w-full flex justify-between py-2 px-5 bg-zinc-500 hover:bg-zinc-600 rounded-md cursor-pointer"
                        >
                            <span>{isOpen ? "▲" : "▼"}</span>
                            <p>Incluir filhos</p>
                            
                        </button>
                        {isOpen && (
                            <div className='flex gap-4 justify-between my-5 pb-5 mx-4'>
                                <div>
                                    {inputs.map((_, index) => (
                                        <input
                                            key={index}
                                            type="text"
                                            placeholder={`Nome o filho ${index + 1}`}
                                            className="mt-2 w-full rounded-lg border border-gray-300 bg-white py-2 p-4 text-gray-900 shadow-sm focus:outline-none focus:ring-2" />
                                    ))}
                                </div>
                                <button onClick={addInput} className="self-end p-3 pb-2 bg-zinc-500 hover:bg-zinc-600 cursor-pointer rounded-full">
                                    <span class="material-symbols-outlined m-0 p-0 text-white">add</span>
                                </button>
                            </div>
                        )}
                    </div>
                    <button type='submit' className='mt-1 cursor-pointer transition bg-olive-button p-2 rounded-md text-white w-full'>Confirmar presença</button>
                </div>

            </div>
        </div>
    )
}
