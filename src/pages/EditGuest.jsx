import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import AdminMenu from '../components/AdminMenu';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';


export default function EditGuest() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id'); 
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        email: '',
        phone: '',
        description: ''
    });


    useEffect(() => {
        async function fetchGuest() {
            try {
                const response = await fetch(`http://localhost:8000/${id}`); 
                if (!response.ok) throw new Error('Erro ao buscar convidado');
                const data = await response.json();
                setFormData(data);
            } catch (error) {
                window.alert(error.message);
            }
        }
        fetchGuest();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8000/`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (!response.ok) throw new Error('Erro ao atualizar convidado');
            window.alert('Convidado atualizado com sucesso!');
            navigate('/guest-list');
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
                    <img src="/src/assets/addguest.webp" className='hidden md:block max-w-96 rounded-2xl' alt="" />
                    <form onSubmit={handleSubmit} className='flex flex-col gap-2 w-full mx-auto p-4'>
                        <p className='mb-5'>Informações do convidado(a)</p>
                        <div className='flex flex-col gap-5'>
                            <input name='name' type="text" value={formData.name} onChange={handleChange} placeholder="Nome" className="px-4 py-2 w-full rounded-lg border" />
                            <input name='email' type="email" value={formData.email} onChange={handleChange} placeholder="Email" className="px-4 py-2 w-full rounded-lg border" />
                            <input name='phone' type="tel" value={formData.phone} onChange={handleChange} placeholder="Celular" className="px-4 py-2 w-full rounded-lg border" />
                            <input name='description' type="text" value={formData.description} onChange={handleChange} placeholder="Informações adicionais" className="px-4 py-2 w-full rounded-lg border" />
                        </div>
                        <button type='submit' className='mt-6 bg-olive-button p-2 rounded-md text-white w-full'>Salvar</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
