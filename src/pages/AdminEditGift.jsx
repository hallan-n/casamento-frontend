import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import AdminMenu from '../components/AdminMenu';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import addguest from '../assets/addguest.webp'
import { API_URL } from "../config.js";


export default function AdminEditGift() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');
    const [formData, setFormData] = useState({
        id: 0,
        thumb: '',
        name: '',
        url: '',
        price: 0
    });


    useEffect(() => {
        async function fetchGift() {
            try {
                const response = await fetch(`${API_URL}/gift/${id}`);
                if (!response.ok) throw new Error('Erro ao buscar presente');
                const data = await response.json();
                setFormData(data);
            } catch (error) {
                window.alert(error.message);
            }
        }
        fetchGift();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_URL}/gift`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'token': localStorage.getItem('jwt')
                },
                body: JSON.stringify(formData),
            });
            if (!response.ok) throw new Error('Erro ao atualizar presente');
            window.alert('presente atualizado com sucesso!');
            navigate('/gift-list');
        } catch (error) {
            window.alert(error.message);
        }
    };

    return (
        <div>
            <Header />
            <div className="p-4 w-full max-w-6xl mx-auto">
                <AdminMenu />
                <h1 className='text-2xl font-bold mb-5 mt-10'>Editar um convidado</h1>
                <hr className='border-zinc-200 mt-2 mb-5' />

                <div className='flex gap-5 mt-10'>
                    <img src={addguest} className='hidden md:block max-w-96 rounded-2xl' alt="" />
                    <form onSubmit={handleSubmit} className='flex flex-col gap-2 w-full mx-auto p-4'>
                        <p className='mb-5'>Informações do convidado(a)</p>
                        <div className='flex flex-col gap-5'>

                            <input minLength={4} maxLength={255} name='thumb' type="url" placeholder="URL da Thumb" value={formData.thumb} onChange={handleChange} className="px-4 py-2 w-full rounded-lg border border-gray-300 bg-white text-gray-900 shadow-sm focus:outline-none focus:ring-2" />
                            <input minLength={4} maxLength={255} name='name' type="text" placeholder="Nome" value={formData.name} onChange={handleChange} className="px-4 py-2 w-full rounded-lg border border-gray-300 bg-white text-gray-900 shadow-sm focus:outline-none focus:ring-2" />
                            <input minLength={4} maxLength={255} name='url' type="url" placeholder="URL" value={formData.url} onChange={handleChange} className="px-4 py-2 w-full rounded-lg border border-gray-300 bg-white text-gray-900 shadow-sm focus:outline-none focus:ring-2" />
                            <input name='price' type="number" placeholder="Valor" value={formData.price} onChange={handleChange} className="px-4 py-2 w-full rounded-lg border border-gray-300 bg-white text-gray-900 shadow-sm focus:outline-none focus:ring-2" />

                        </div>
                        <button type='submit' className='mt-6 bg-olive-button p-2 rounded-md text-white w-full'>Salvar</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
