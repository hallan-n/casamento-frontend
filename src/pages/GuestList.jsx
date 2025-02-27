import Header from '../components/Header';
import AdminMenu from '../components/AdminMenu';
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'



export default function GuestList() {

    const [searchTerm, setSearchTerm] = useState('')
    const [convidados, setConvidados] = useState([])
    const [confirmed, setConfirmed] = useState(null)

    useEffect(() => {
        const fetchConvidados = async () => {
            try {
                const response = await fetch(`http://localhost:8000/`)
                const data = await response.json()
                setConvidados(data)
            } catch (error) {
                console.error('Erro ao buscar convidados:', error)
            }
        }
        fetchConvidados()
    }, [])

    const filteredConvidados = convidados.filter(guest =>
        (guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        guest.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        guest.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (confirmed === null || guest.is_confirmed === confirmed))
        
    return (
        <div>
            <Header />
            <div className="p-4 w-full max-w-6xl mx-auto">
                <AdminMenu />
                <h1 className='text-2xl font-bold mb-5 mt-10'>Gerenciador de lista de convidados</h1>
                <h2 className='font-bold mt-10'>Filtros</h2>
                <hr className='border-zinc-200 mt-2 mb-5' />
                <div className='flex flex-col md:flex-row gap-4'>
                    <div>
                        <p>Pesquisa por nome</p>
                        <input
                            type="text"
                            placeholder="Pesquisar nome"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="mb-4 p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div>
                        <p>Confirmou presença</p>
                        <select onChange={(e) => setConfirmed(e.target.value === "1" ? true : e.target.value === "0" ? false : null)} className="mb-4 p-2 border border-gray-300 rounded">
                            <option value="" selected>Todos</option>
                            <option value="1">Sim</option>
                            <option value="0">Não</option>
                        </select>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full bg-white border border-gray-200">
                        <thead>
                            <tr className="w-full bg-gray-100 border-b">
                                <th className="text-left p-4">ID</th>
                                <th className="text-left p-4">Nome</th>
                                <th className="text-left p-4">Email</th>
                                <th className="text-left p-4">Informações adicionais</th>
                                <th className="text-left p-4">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredConvidados.map((guest) => (
                                <tr key={guest.id} className="border-b hover:bg-gray-50">
                                    <td className="p-4">{guest.id}</td>
                                    <td className="p-4">{guest.name}</td>
                                    <td className="p-4">{guest.email}</td>
                                    <td className="p-4">{guest.description}</td>
                                    <td className="p-4">
                                        <Link to={`/edit-guest?id=${guest.id}`}>
                                            <span className="material-symbols-outlined me-2 hover:text-zinc-400">edit</span>
                                        </Link>
                                        <Link to={`/admin-panel/confirm-delete-guest?id=${guest.id}`}>
                                            <span className="material-symbols-outlined hover:text-zinc-400">delete</span>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}