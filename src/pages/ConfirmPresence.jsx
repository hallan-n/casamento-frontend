import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function ConfirmPresence() {
    const navigate = useNavigate();
    const { uuid } = useParams();
    const [isOpen, setIsOpen] = useState(false);
    const [inputs, setInputs] = useState([""]);
    const [formData, setFormData] = useState(
        {
            id: "",
            name: "",
            email: "",
            phone: "",
            is_confirmed: false,
            children: [""]
        });

    useEffect(() => {
        const fetchGuestData = async () => {
            try {
                const response = await fetch(`http://localhost:8000/${uuid}`);

                if (!response.ok) throw new Error("Convidado não encontrado");
                const data = await response.json();
                const children = Object.keys(data)
                    .filter(key => key.startsWith("child_") && data[key].trim() !== "")
                    .map(key => data[key]);

                setFormData({
                    id: data.id || "",
                    name: data.name || "",
                    email: data.email || "",
                    phone: data.phone || "",
                    children: children,
                });
                setInputs(children.length ? children.map(() => "") : [""]);

            } catch (error) {
                console.error("Erro ao buscar convidado:", error);
            }
        };

        if (uuid) fetchGuestData();
    }, [uuid]);


    const addInput = () => {
        if (inputs.length < 10) {
            setInputs([...inputs, ""]);
            setFormData({ ...formData, children: [...formData.children, ""] });
        }
    };

    const removeInput = (index) => {
        const updatedInputs = inputs.filter((_, i) => i !== index);
        const updatedChildren = formData.children.filter((_, i) => i !== index);
        setInputs(updatedInputs);
        setFormData({ ...formData, children: updatedChildren });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleChildChange = (index, value) => {
        const updatedChildren = [...formData.children];
        updatedChildren[index] = value;
        setFormData({ ...formData, children: updatedChildren });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        setFormData((prev) => {
            const updatedFormData = { ...prev, is_confirmed: true };
            return updatedFormData;
        });
    };

    useEffect(() => {
        if (formData.is_confirmed) {

            const transformed = {
                id: formData.id,
                name: formData.name,
                phone: formData.phone,
                email: formData.email,
                is_confirmed: formData.is_confirmed,
            };

            for (let i = 1; i <= 10; i++) {
                transformed[`child_${i}`] = formData.children[i - 1] || "";
            }

            fetch("http://localhost:8000/", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(transformed),
            }).then(() => {
                localStorage.setItem("guest", JSON.stringify(transformed));
                window.alert("Presença confirmada com sucesso!");
                navigate('/');
            }).catch((error) => {
                window.alert(`Erro ao enviar dados: ${error}`)
            });
        }
    }, [formData.is_confirmed]);

    return (
        <div>
            <Header />

            <div className='flex gap-14 h-screen w-full justify-center items-center p-4'>
                <img src="/src/assets/confirm.jpg" className='hidden md:block max-w-96 rounded-2xl' alt="" />
                <form className='max-w-96' onSubmit={handleSubmit}>
                    <h1 className='text-4xl font-bold mb-7'>Confirmar presença no casamento</h1>
                    <h2>Verifique se seu nome está correto. Se não, preencha-o corretamente.</h2>
                    <input
                        name='name'
                        type="text"
                        placeholder="Nome completo"
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-2 w-full rounded-lg border border-gray-300 bg-white py-2 p-4 text-gray-900 shadow-sm focus:outline-none focus:ring-2" />
                    <input
                        name='email'
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-2 w-full rounded-lg border border-gray-300 bg-white py-2 p-4 text-gray-900 shadow-sm focus:outline-none focus:ring-2" />
                    <input
                        name='phone'
                        type="tel"
                        placeholder="Celular"
                        value={formData.phone}
                        onChange={handleChange}
                        className="mt-2 w-full rounded-lg border border-gray-300 bg-white py-2 p-4 text-gray-900 shadow-sm focus:outline-none focus:ring-2" />

                    <div className='mt-4 mb-1 transition rounded-md text-white w-full bg-zinc-100'>
                        <button
                            type="button"
                            onClick={() => setIsOpen(!isOpen)}
                            className="w-full flex justify-between py-2 px-5 bg-zinc-500 hover:bg-zinc-600 rounded-md cursor-pointer"
                        >
                            <span>{isOpen ? "▲" : "▼"}</span>
                            <p>Incluir filhos</p>
                        </button>
                        {isOpen && (
                            <div className='flex flex-col gap-4 justify-between my-5 pb-5 mx-4'>
                                {inputs.map((_, index) => (
                                    <div key={index} className='flex items-center gap-2'>
                                        <input
                                            name={`child-${index}`}
                                            type="text"
                                            placeholder={`Nome do filho ${index + 1}`}
                                            value={formData.children[index]}
                                            onChange={(e) => handleChildChange(index, e.target.value)}
                                            className="w-full rounded-lg border border-gray-300 bg-white py-2 p-4 text-gray-900 shadow-sm focus:outline-none focus:ring-2" />
                                        <button type="button" onClick={() => removeInput(index)} className="px-2 pt-2 pb-1 cursor-pointer rounded-md bg-zinc-500 hover:bg-zinc-600">
                                            <span className="material-symbols-outlined">delete</span>
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={addInput}
                                    disabled={inputs.length >= 10}
                                    className={`cursor-pointer text-white p-2 px-4 rounded-md flex items-center gap-2 justify-between
                                        ${inputs.length >= 10 ? "bg-gray-400 cursor-not-allowed" : "bg-zinc-500 hover:bg-zinc-600"}`}
                                >
                                    <span className="material-symbols-outlined">add</span> <p>Adicionar</p>
                                </button>
                            </div>
                        )}
                    </div>
                    <button type='submit' className='mt-1 cursor-pointer transition bg-olive-button p-2 rounded-md text-white w-full'>Confirmar presença</button>
                </form>
            </div>
        </div>
    );
}
