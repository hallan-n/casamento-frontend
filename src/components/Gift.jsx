import React from 'react'

export default function Gift({ thumb, name, description, price }) {
    return (
        <div className='bg-zinc-200 w-80 h-96 rounded-md overflow-hidden flex flex-col p-2'>
            <img className='h-56 w-full object-cover' src={thumb} alt="" />
            <div className='p-3 flex flex-col justify-between flex-grow'>
                <div>
                    <p className='font-bold'>{name}</p>
                    <p className="mt-3 text-sm w-full overflow-hidden text-ellipsis break-words [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical]">
                        {description}
                    </p>
                </div>
                <div className='flex justify-between items-center mt-2 gap-4'>
                    <div className='flex-nowrap items-center flex gap-1'>
                        <p className='text-sm'>R$</p>
                        <p className='font-bold'>{price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                    </div>
                    <button className='cursor-pointer transition bg-olive-button p-2 rounded-md text-white w-full'>Dar presente</button>
                </div>
            </div>
        </div>
    )
}
