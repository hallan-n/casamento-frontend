import Header from '../components/Header';
import AdminMenu from '../components/AdminMenu';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from "../config.js";

export default function AdminGiftList() {
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState('');
    const [presentes, setPresentes] = useState([]);
    const [confirmed, setConfirmed] = useState(null);
    const [giftsGiven, setGiftsGiven] = useState([]);
    const [guests, setGuests] = useState([]);

    useEffect(() => {
        const fetchPresentes = async () => {
            try {
                const response = await fetch(`${API_URL}/gift`, {
                    headers: { 'token': localStorage.getItem('jwt') },
                });
                if (!response.ok) {
                    if (response.status === 401) navigate('/');
                    throw new Error('Erro ao buscar os presentes');
                }
                const data = await response.json();
                setPresentes(data);
            } catch (error) {
                console.error('Erro ao buscar presentes:', error);
            }
        };

        const fetchGivenGifts = async () => {
            try {
                const response = await fetch(`${API_URL}/give_gift`, {
                    headers: { 'token': localStorage.getItem('jwt') },
                });
                if (!response.ok) throw new Error('Erro ao buscar os presentes dados');
                const data = await response.json();
                setGiftsGiven(data);
            } catch (error) {
                console.error('Erro ao buscar os presentes dados:', error);
            }
        };

        const fetchGuests = async () => {
            try {
                const response = await fetch(`${API_URL}/guest`, {
                    headers: { 'token': localStorage.getItem('jwt') },
                });
                if (!response.ok) throw new Error('Erro ao buscar os convidados');
                const data = await response.json();
                setGuests(data);
            } catch (error) {
                console.error('Erro ao buscar convidados:', error);
            }
        };

        fetchPresentes();
        fetchGivenGifts();
        fetchGuests();
    }, [navigate]);

    const deletePresente = async (id) => {
        if (!window.confirm('Tem certeza que deseja deletar este presente?')) return;
        try {
            const response = await fetch(`${API_URL}/gift?id=${id}`, {
                method: 'DELETE',
                headers: { 'token': localStorage.getItem('jwt') },
            });
            if (!response.ok) throw new Error('Erro ao deletar o item');
            setPresentes(presentes.filter((gift) => gift.id !== id));
            alert('Presente deletado com sucesso!');
        } catch (error) {
            alert('Falha ao deletar o presente', error);
        }
    };

    const filteredPresentes = presentes.filter((gift) => {
        const matchesSearch = gift.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesGiven = confirmed === null
            ? true
            : (confirmed === true
                ? giftsGiven.some(g => g.gift_id === gift.id)
                : !giftsGiven.some(g => g.gift_id === gift.id));
        return matchesSearch && matchesGiven;
    });

    const getPresenteadorName = (giftId) => {
        const givenGift = giftsGiven.find(g => g.gift_id === giftId);
        if (!givenGift) return 'Desconhecido';
        const guest = guests.find(guest => guest.id === givenGift.guest_id);
        return guest ? guest.name : 'Desconhecido';
    };

    return (
        <div>
            <Header />
            <div className="p-4 w-full max-w-6xl mx-auto">
                <AdminMenu />
                <h1 className="text-2xl font-bold mb-5 mt-10">Gerenciador de lista de presentes</h1>
                <h2 className="font-bold mt-10">Filtros</h2>
                <hr className="border-zinc-200 mt-2 mb-5" />
                <div className="flex flex-col md:flex-row gap-4">
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
                        <p>Alguém deu?</p>
                        <select
                            onChange={(e) => setConfirmed(e.target.value === '1' ? true : e.target.value === '0' ? false : null)}
                            className="mb-4 p-2 border border-gray-300 rounded"
                            value={confirmed === null ? '' : confirmed ? '1' : '0'}
                        >
                            <option value="">Todos</option>
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
                                <th className="text-left p-4">Thumb</th>
                                <th className="text-left p-4">Nome</th>
                                <th className="text-left p-4">Descrição</th>
                                <th className="text-left p-4">Preço</th>
                                <th className="text-left p-4">Presenteador</th>
                                <th className="text-left p-4">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPresentes.map((gift) => (
                                <tr key={gift.id} className="border-b hover:bg-gray-50">
                                    <td className="p-4">{gift.id}</td>
                                    <td className="p-4">
                                        <img className="h-20 hover:h-48 transition-all rounded-lg" src={gift.thumb} alt="" />
                                    </td>
                                    <td className="p-4">{gift.name}</td>
                                    <td className="p-4">{gift.description}</td>
                                    <td className="p-4">R$ {gift.price?.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) ?? '0,00'}</td>
                                    <td className="p-4">{getPresenteadorName(gift.id)}</td>
                                    <td className="p-4">
                                        <Link to={`/edit-gift?id=${gift.id}`}>
                                            <span className="material-symbols-outlined me-2 hover:text-zinc-400">edit</span>
                                        </Link>
                                        <span className="cursor-pointer material-symbols-outlined hover:text-zinc-400" onClick={() => deletePresente(gift.id)}>delete</span>
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
