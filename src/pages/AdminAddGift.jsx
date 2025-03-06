import React, { useState } from 'react';
import AdminMenu from '../components/AdminMenu';
import Header from '../components/Header';
import addguest from '../assets/addguest.webp'
import { API_URL } from "../config.js";

export default function AdminAddGift() {
    const [formData, setFormData] = useState({
        thumb: '',
        name: '',
        description: '',
        price: 0,
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();


        if (
            formData.thumb.length < 4 || formData.thumb.length > 250 ||
            formData.name.length < 4 || formData.name.length > 100 ||
            formData.description.length < 4 || formData.description.length > 100
        ) {
            alert("Todos os campos devem ter no mínimo 4 caracteres.");
            return;
        }

        try {
            const response = await fetch(`${API_URL}/gift`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'token': localStorage.getItem('jwt')
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Erro ao adicionar presente');
            }

            alert('Presente adicionado com sucesso!');
            setFormData({ thumb: '', name: '', description: '', price: 0 });
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div>
            <Header />
            <div className="p-4 w-full max-w-6xl mx-auto">
                <AdminMenu />
                <h1 className='text-2xl font-bold mb-5 mt-10'>Adicionar um novo presente</h1>
                <hr className='border-zinc-200 mt-2 mb-5' />

                <div className='flex gap-5 mt-10'>
                    <img src={addguest} className='hidden md:block max-w-96 rounded-2xl' alt="" />
                    <form onSubmit={handleSubmit} className='flex flex-col gap-2 w-full mx-auto p-4'>
                        <p className='mb-5'>Informações do presente</p>
                        <div className='flex flex-col gap-5'>
                            <input minLength={4} maxLength={250} name='thumb' type="url" placeholder="URL da Thumb" value={formData.thumb} onChange={handleChange} className="px-4 py-2 w-full rounded-lg border border-gray-300 bg-white text-gray-900 shadow-sm focus:outline-none focus:ring-2" />
                            <input minLength={4} maxLength={100} name='name' type="text" placeholder="Nome" value={formData.name} onChange={handleChange} className="px-4 py-2 w-full rounded-lg border border-gray-300 bg-white text-gray-900 shadow-sm focus:outline-none focus:ring-2" />
                            <input minLength={4} maxLength={100} name='description' type="text" placeholder="Descrição" value={formData.description} onChange={handleChange} className="px-4 py-2 w-full rounded-lg border border-gray-300 bg-white text-gray-900 shadow-sm focus:outline-none focus:ring-2" />
                            <input name='price' type="number" placeholder="Valor" value={formData.price} onChange={handleChange} className="px-4 py-2 w-full rounded-lg border border-gray-300 bg-white text-gray-900 shadow-sm focus:outline-none focus:ring-2" />
                        </div>
                        <button type='submit' className='mt-6 cursor-pointer transition bg-olive-button p-2 rounded-md text-white w-full'>Inserir</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
