import Header from '../components/Header';

export default function AdminLogin() {
  
    return (
        <div>
            <Header />

            <div className='h-screen w-full '>
                <form className='max-w-96 flex flex-col gap-2 w-full mx-auto mt-26'>
                    <h1 className='text-2xl font-bold'>Painel de Administração</h1>
                    <input
                        name='login'
                        type="text"
                        placeholder="Login"
                        className="px-4 py-2 w-full rounded-lg border border-gray-300 bg-white text-gray-900 shadow-sm focus:outline-none focus:ring-2" />
                    <input
                        name='password'
                        type="password"
                        placeholder="Senha"
                        className="px-4 py-2 w-full rounded-lg border border-gray-300 bg-white text-gray-900 shadow-sm focus:outline-none focus:ring-2" />
              
                    <button type='submit' className='mt-1 cursor-pointer transition bg-olive-button p-2 rounded-md text-white w-full'>Entrar</button>
                </form>
            </div>
        </div>
    );
}
