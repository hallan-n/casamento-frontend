export default function Gift({ thumb, name, url, price, isReserved, id }) {
    const handleGift = async () => {
        try {
            const guest = JSON.parse(localStorage.getItem('guest'));
            if (!guest || !guest.id) {
                throw new Error('Verifique se sua presença foi confirmada antes de dar um presente.');
            }
            const confirmGift = window.confirm('Tem certeza de que deseja dar este presente?');

            if (!confirmGift) {
                return;
            }

            const response = await fetch(`http://localhost:8000/give_gift?guest_id=${guest.id}&gift_id=${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if (!response.ok) {
                throw new Error('Erro ao registrar presente');
            }

            alert('Presente registrado com sucesso!');
            window.location.reload();
        } catch (error) {
            console.error(error);
            alert('Erro ao registrar o presente.');
        }
    };
    const handleRevokeGift = async () => {
        try {
            const guest = JSON.parse(localStorage.getItem('guest'));
            if (!guest || !guest.id) {
                throw new Error('Verifique se sua presença foi confirmada antes de dar um presente.');
            }
            const confirmGift = window.confirm('Tem certeza de que deseja cancelar este presente?');

            if (!confirmGift) {
            }

            const response = await fetch(`http://localhost:8000/give_gift?guest_id=${guest.id}&gift_id=${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if (!response.ok) {
                throw new Error('Erro ao cancelar presente');
            }

            alert('Presente cancelado com sucesso!');
            window.location.reload();
        } catch (error) {
            console.error(error);
            alert('Erro ao cancelar o presente. Verifique se sua presença foi confirmada.');
        }
    };

    return (
        <div className='bg-zinc-200 w-80 h-96 rounded-md overflow-hidden flex flex-col p-2'>
            <img className='h-56 w-full object-cover' src={thumb} alt="" />
            <div className='p-3 flex flex-col justify-between flex-grow'>
                <div className="flex flex-col gap-2">
                    <p className='font-bold w-full overflow-hidden text-ellipsis break-words [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical]'>{name}</p>
                    <a className="text-sm text-blue-500 font-bold hover:text-blue-700 transition" href={url} target="_blank" rel="noopener noreferrer">Visitar site do presente.</a>
                </div>
                <div className='flex justify-between items-center mt-2 gap-4'>
                    <div className='flex-nowrap items-center flex gap-1'>
                        <p className='text-sm'>R$</p>
                        <p className='font-bold'>{price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                    </div>
                    {
                        isReserved ?
                            (
                                <div>
                                    <button className='flex bg-zinc-500 p-2 rounded-md text-white w-full'>
                                        Presente já dado
                                        <span className="rounded-md bg-red-800 cursor-pointer ms-2 material-symbols-outlined"
                                            onClick={() => handleRevokeGift()}
                                        >
                                            close
                                        </span>
                                    </button>
                                </div>
                            ) :
                            <button
                                className='cursor-pointer transition bg-olive-button p-2 rounded-md text-white w-full text-center'
                                onClick={() => handleGift()}
                            >
                                Dar presente
                            </button>
                    }
                </div>
            </div>
        </div>
    )
}
