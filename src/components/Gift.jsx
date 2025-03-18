import { useState } from "react";
import qrcode from '../assets/qrcode.png'
import { API_URL } from "../config.js";

export default function Gift({ thumb, name, url, price, isReserved, id }) {

    const [isOpen, setIsOpen] = useState(false);
    const handleCopy = () => {
        navigator.clipboard.writeText('00020126580014BR.GOV.BCB.PIX013603925632-85ab-4f9b-a880-958c96299e495204000053039865802BR5925Hallan Guilherme Santos d6009SAO PAULO61080540900062250521J9qnq2ExN7kT3XF17imhq63042D65');
        alert('PIX copiado!');
    };
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

            const response = await fetch(`${API_URL}/give_gift?guest_id=${guest.id}&gift_id=${id}`, {
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

            const response = await fetch(`${API_URL}/give_gift?guest_id=${guest.id}&gift_id=${id}`, {
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
                <div className="flex gap-4 items-center">
                    <div>
                        <p className='font-bold w-full overflow-hidden text-ellipsis break-words [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical]'>{name}</p>
                        <a className="text-sm text-blue-500 font-bold hover:text-blue-700 transition" href={url} target="_blank" rel="noopener noreferrer">Visitar site do presente.</a>
                    </div>
                    <div>
                        <button
                            className='cursor-pointer transition bg-blue-700 hover:bg-blue-900 p-2 rounded-md text-sm text-white w-full text-center'
                            onClick={() => setIsOpen(true)}>Pagar com PIX</button>

                        {isOpen && (
                            <div
                                className="fixed inset-0 flex justify-center items-center"
                                style={{ background: "#00000048" }}
                            >
                                <dialog
                                    open
                                    className="bg-white p-8 rounded-lg shadow-lg mx-auto max-w-96 flex flex-col justify-center gap-4"
                                    onClick={(e) => e.stopPropagation()} // Evita fechar ao clicar dentro
                                >
                                    <h2 className="text-xl font-semibold">Use o QR Code do Pix para pagar</h2>
                                    <p className="mt-2">Abra o app em que vai fazer a transferência, escaneie a imagem ou cole o código do QR Code</p>

                                    <img src={qrcode} alt="pix" className="max-w-72 mx-auto" />
                                    <div>

                                        <button
                                            onClick={handleCopy}
                                            className='cursor-pointer transition bg-olive-button p-2 rounded-md text-white w-full flex gap-4 items-center justify-center'>
                                            <p>Copiar código do QR Code</p>
                                            <span class="material-symbols-outlined">content_copy</span>
                                        </button>
                                        <button
                                            onClick={() => setIsOpen(false)}
                                            className="cursor-pointer mt-4 px-4 py-2 bg-red-500 hover:bg-red-800 transition text-white rounded-md"
                                        >
                                            Fechar
                                        </button>
                                    </div>
                                </dialog>
                            </div>
                        )}
                    </div>
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
