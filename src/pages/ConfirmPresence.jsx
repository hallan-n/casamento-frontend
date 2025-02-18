import Header from '../components/Header';
import { useState } from "react";

export default function ConfirmPresence() {
    const [isOpen, setIsOpen] = useState(false);
    const [inputs, setInputs] = useState([""]);
    const [formData, setFormData] = useState({ name: "", email: "", phone: "", children: [""] });

    const addInput = () => {
        setInputs([...inputs, ""]);
        setFormData({ ...formData, children: [...formData.children, ""] });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleChildChange = (index, value) => {

        const updatedChildren = [...formData.children];
        updatedChildren[index] = value;
        setFormData({ ...formData, children: updatedChildren });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(JSON.stringify(formData));
    };

    return (
        <div>
            <Header />

            <div className='flex gap-14 h-screen w-full justify-center items-center p-4'>
                <img src="./src/assets/confirm.jpg" className='hidden md:block max-w-96 rounded-2xl' alt="" />
                <form className='max-w-96' onSubmit={handleSubmit}>
                    <h1 className='text-4xl font-bold mb-7'>Confirmar presença no casamento</h1>
                    <h2>Por favor, Preencha seus dados</h2>
                    <input
                        name='name'
                        type="text"
                        placeholder="Nome completo"
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-2 w-full rounded-lg border border-gray-300 bg-white py-2 p-4 text-gray-900 shadow-sm focus:outline-none focus:ring-2" />
                    <input
                        name='email'
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-2 w-full rounded-lg border border-gray-300 bg-white py-2 p-4 text-gray-900 shadow-sm focus:outline-none focus:ring-2" />
                    <input
                        name='phone'
                        type="tel"
                        placeholder="Celular"
                        value={formData.phone}
                        onChange={handleChange}
                        className="mt-2 w-full rounded-lg border border-gray-300 bg-white py-2 p-4 text-gray-900 shadow-sm focus:outline-none focus:ring-2" />

                    <div className='mt-4 mb-1 transition rounded-md text-white w-full bg-zinc-100'>
                        <button
                            type="button"
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
                                            name={`children-${index}`}
                                            type="text"
                                            placeholder={`Nome do filho ${index + 1}`}
                                            value={formData.children[index]}
                                            onChange={(e) => handleChildChange(index, e.target.value)}
                                            className="mt-2 w-full rounded-lg border border-gray-300 bg-white py-2 p-4 text-gray-900 shadow-sm focus:outline-none focus:ring-2" />
                                    ))}
                                </div>
                                <button type="button" onClick={addInput} className="self-end p-3 pb-2 bg-zinc-500 hover:bg-zinc-600 cursor-pointer rounded-full">
                                    <span className="material-symbols-outlined m-0 p-0 text-white">add</span>
                                </button>
                            </div>
                        )}
                    </div>
                    <button type='submit' className='mt-1 cursor-pointer transition bg-olive-button p-2 rounded-md text-white w-full'>Confirmar presença</button>
                </form>
            </div>
        </div>
    );
}
