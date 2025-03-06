import { useState } from 'react';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import { API_URL } from "../config.js";

export default function AdminLogin() {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${API_URL}/admin/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ user, password })
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('jwt', data.access_token);
                alert('Login realizado com sucesso!');
                navigate('/guest-list');
            } else {
                alert(data.message || 'Erro ao fazer login');
            }

        } catch (error) {
            console.error('Erro na requisição:', error);
            alert('Erro ao conectar com o servidor');
        }
    };

    return (
        <div>
            <Header />

            <div className='h-screen w-full'>
                <form onSubmit={handleSubmit} className='max-w-96 flex flex-col gap-2 w-full mx-auto mt-26 p-4'>
                    <h1 className='text-2xl font-bold'>Painel de Administração</h1>
                    <input
                        name='user'
                        type='text'
                        placeholder='Login'
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                        className='px-4 py-2 w-full rounded-lg border border-gray-300 bg-white text-gray-900 shadow-sm focus:outline-none focus:ring-2' />
                    <input
                        name='password'
                        type='password'
                        placeholder='Senha'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='px-4 py-2 w-full rounded-lg border border-gray-300 bg-white text-gray-900 shadow-sm focus:outline-none focus:ring-2' />
                    <div className='flex justify-between'>
                        <div className='flex items-center gap-2'>
                            <input type='checkbox' name='remember' id='remember' />
                            <label className='text-zinc-500' htmlFor='remember'>Lembrar-me</label>
                        </div>
                        <a className='text-blue-700 font-bold' href='#'>Esqueceu a senha?</a>
                    </div>
                    <button type='submit' className='mt-1 cursor-pointer transition bg-olive-button p-2 rounded-md text-white w-full'>Entrar</button>
                </form>
            </div>
        </div>
    );
}