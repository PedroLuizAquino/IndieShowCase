import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../Components/Input/Input';
import Button from '../../Components/Button/Button';
import axios from 'axios';




export const LoginUsuario = () => {

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        axios
            .post('http://localhost:8000/usuarios/login', {
                email: email,
                senha: senha,
                //foto: usu_foto
            })
            .then((response) => {
                if (response.data) {
                    // Login bem-sucedido
                    const { token } =
                        response.data;
                    console.log(response.data.message);
                    sessionStorage.setItem('usuarioLogado', 'true');
                    sessionStorage.setItem('token', token);
                    navigate('/');
                    window.location.reload();
                } else {
                    // Login falhou
                    console.log("falhou");
                }
            });


        console.log('submit', {
            email,
            senha,
        });
    };

    return (

        <section className='flex items-center min-h-screen bg-violet-200 justify-center	'>
            <div className='flex items-center justify-self-center max-auto'>
                <div className='flex-1 h-full max-w-4xl max-auto bg-[#AF54EB] rounded-lg shadow-xl'>
                    <div className='flex flex-col md:flex-row '>
                        <div className='flex items-center justify-center p-6 sm:p-12'>
                            <form action='' onSubmit={handleSubmit} >
                                <h1 className="mb-4 text-5xl font-bold text-center text-black font-roboto">
                                    Login
                                </h1>

                                <div className='mt-4'>
                                    <Input
                                        labelTexto="Email"
                                        placeholder="Insira o seu email"
                                        tipo="email"
                                        nome="email"
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                        }}
                                    />
                                </div>

                                <div className='mt-4'>
                                    <Input
                                        labelTexto="Senha"
                                        placeholder="Insira sua senha"
                                        tipo="password"
                                        nome="senha"
                                        onChange={(e) => {
                                            setSenha(e.target.value);
                                        }}
                                    />
                                </div>
                                {/* Mensagens de Erros proximos */}
                                <div className="flex justify-center mt-12">
                                    <Button texto="Login" tipo="submit" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )

}