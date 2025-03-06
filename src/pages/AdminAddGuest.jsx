import React, { useState } from 'react';
import AdminMenu from '../components/AdminMenu';
import Header from '../components/Header';

export default function AdminAddGuest() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        description: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8000/guest', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'token': localStorage.getItem('jwt')
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {              
                throw new Error('Erro ao adicionar convidado');
            }

            alert('Convidado adicionado com sucesso!');
            setFormData({ name: '', email: '', phone: '', description: '' });
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div>
            <Header />
            <div className="p-4 w-full max-w-6xl mx-auto">
                <AdminMenu />
                <h1 className='text-2xl font-bold mb-5 mt-10'>Adicionar um novo convidado</h1>
                <hr className='border-zinc-200 mt-2 mb-5' />

                <div className='flex gap-5 mt-10'>
                    <img src="/src/assets/addguest.webp" className='hidden md:block max-w-96 rounded-2xl' alt="" />
                    <form onSubmit={handleSubmit} className='flex flex-col gap-2 w-full mx-auto p-4'>
                        <p className='mb-5'>Informações do convidado(a)</p>
                        <div className='flex flex-col gap-5'>
                            <input name='name' type="text" placeholder="Nome" value={formData.name} onChange={handleChange} className="px-4 py-2 w-full rounded-lg border border-gray-300 bg-white text-gray-900 shadow-sm focus:outline-none focus:ring-2" />
                            <input name='email' type="email" placeholder="Email" value={formData.email} onChange={handleChange} className="px-4 py-2 w-full rounded-lg border border-gray-300 bg-white text-gray-900 shadow-sm focus:outline-none focus:ring-2" />
                            <input name='phone' type="tel" placeholder="Celular" value={formData.phone} onChange={handleChange} className="px-4 py-2 w-full rounded-lg border border-gray-300 bg-white text-gray-900 shadow-sm focus:outline-none focus:ring-2" />
                            <input name='description' type="text" placeholder="Informações adicionais" value={formData.description} onChange={handleChange} className="px-4 py-2 w-full rounded-lg border border-gray-300 bg-white text-gray-900 shadow-sm focus:outline-none focus:ring-2" />
                        </div>
                        <button type='submit' className='mt-6 cursor-pointer transition bg-olive-button p-2 rounded-md text-white w-full'>Inserir</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
