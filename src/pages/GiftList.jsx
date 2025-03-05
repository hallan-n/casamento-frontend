import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import Gift from '../components/Gift'

export default function GiftList() {
    const [search, setSearch] = useState("")
    const [priceRange, setPriceRange] = useState(6000)
    const [availability, setAvailability] = useState("")
    const [gifts, setGifts] = useState([]) // Estado para armazenar os presentes

    // Função para buscar os presentes da API
    const fetchGifts = async () => {
        try {
            const response = await fetch('http://localhost:8000/gift') // Substitua pela URL da sua API
            const data = await response.json()
            if (data) console.log(data);
            
            setGifts(data) // Atualiza o estado com os dados recebidos
        } catch (error) {
            console.error('Erro ao buscar os presentes:', error)
        }
    }

    useEffect(() => {
        fetchGifts() // Chama a função quando o componente é montado
    }, [])

    const filteredGifts = gifts.filter(gift =>
        gift.name.toLowerCase().includes(search.toLowerCase()) &&
        gift.price <= priceRange &&
        (availability === "" || gift.available === (availability === "1"))
    )

    return (
        <div>
            <Header />
            <div className="p-4 w-full max-w-6xl mx-auto">
                <h1 className='text-2xl font-bold mb-5 mt-10'>Lista de presentes</h1>
                <h2 className='font-bold mt-10'>Filtros</h2>
                <hr className='border-zinc-200 mt-2 mb-5' />

                <div className='flex flex-wrap gap-4 w-full'>
                    <div className='w-full sm:w-auto'>
                        <p>Pesquisa por nome</p>
                        <input
                            type="text"
                            placeholder="Pesquisar nome"
                            className="mb-4 p-2 border border-gray-300 rounded w-full sm:w-64"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className='w-full sm:w-auto'>
                        <p>Preço: R$ {priceRange.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                        <input
                            className="mb-4 p-2 border border-gray-300 rounded w-full sm:w-64"
                            type="range"
                            min="0"
                            max="6000"
                            step="10"
                            value={priceRange}
                            onChange={(e) => setPriceRange(Number(e.target.value))}
                        />
                    </div>
                    <div className='w-full sm:w-auto'>
                        <p>Disponível</p>
                        <select
                            className="mb-4 p-2 border border-gray-300 rounded w-full sm:w-64"
                            value={availability}
                            onChange={(e) => setAvailability(e.target.value)}
                        >
                            <option value="">Todos</option>
                            <option value="1">Sim</option>
                            <option value="0">Não</option>
                        </select>
                    </div>
                </div>

                <div className='flex flex-wrap gap-4 justify-center max-w-5xl mx-auto mt-10'>
                    {
                        filteredGifts.map((gift) => (
                            <Gift key={gift.id} thumb={gift.thumb} name={gift.name} description={gift.description} price={gift.price} />
                        ))
                    }
                </div>

                {filteredGifts.length === 0 && <p className="text-center text-gray-500 mt-5">Nenhum presente encontrado.</p>}
            </div>
        </div>
    )
}
