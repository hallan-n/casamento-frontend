import React, { useState } from 'react'
import Header from '../components/Header'
import Gift from '../components/Gift'

export default function GiftList() {
    const [search, setSearch] = useState("")
    const [priceRange, setPriceRange] = useState(6000)
    const [availability, setAvailability] = useState("")

    const gifts = [
        {
            name: "Smartphone X",
            description: "Tela AMOLED de 6.5 polegadas, câmera tripla e bateria de longa duração.",
            price: 2499.90,
            thumb: "https://a-static.mlcdn.com.br/1500x1500/celular-samsung-galaxy-a05s-128gb-6gb-ram-tela-infinita-de-6-7/samsung/5976/d373d4904ff731f8d1386b3155d41b6e.jpeg",
            available: true
        },
        {
            name: "Notebook Ultra",
            description: "Processador Intel i7, 16GB RAM, SSD 512GB, ideal para trabalho e jogos.",
            price: 5299.00,
            thumb: "https://www.havan.com.br/media/catalog/product/cache/73a52df140c4d19dbec2b6c485ea6a50/n/o/notebook-positivo-intel-dual-core-4gb-ram-128gb-tela-de-15-6-w11_854366.webp",
            available: false
        },
        {
            name: "Fone Bluetooth Pro",
            description: "Som imersivo, cancelamento de ruído ativo e bateria de 24 horas.",
            price: 499.99,
            thumb: "https://cdn.awsli.com.br/600x450/1919/1919257/produto/212487764/mme73-jqqyzmb9k5.jpg",
            available: true
        },
        {
            name: "Monitor 4K 27”",
            description: "Resolução Ultra HD, taxa de atualização de 144Hz e tecnologia IPS.",
            price: 1899.00,
            thumb: "https://acerstore.vtexassets.com/arquivos/ids/164450/KG243Y-G0bi--1-.png?v=638634832656100000",
            available: true
        },
        {
            name: "Teclado Mecânico RGB",
            description: "Switches mecânicos, iluminação personalizável e construção ergonômica.",
            price: 349.90,
            thumb: "https://images.kabum.com.br/produtos/fotos/472045/teclado-mecanico-gamer-kbm-gaming-tg600-preto-60-e-abnt2-rgb-switch-gateron-brown-kgtg600ptma_1713282993_gg.jpg",
            available: false
        }
    ]

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
                        filteredGifts.map((gift, index) => (
                            <Gift key={index} thumb={gift.thumb} name={gift.name} description={gift.description} price={gift.price} />
                        ))
                    }
                </div>

                {filteredGifts.length === 0 && <p className="text-center text-gray-500 mt-5">Nenhum presente encontrado.</p>}
            </div>
        </div>
    )
}
