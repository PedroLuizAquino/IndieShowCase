import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../Components/Input/Input';
import Button from '../../Components/Button/Button';
import axios from 'axios';




export const CadastroUsuario = () => {

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmaSenha, setConfirmaSenha] = useState('');
    const [foto, setFoto] = useState('');
    const [mensagemErro, setMensagemErro] = useState('');
    const [hasError, setHasError] = useState<Boolean>();

    const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (senha !== confirmaSenha) {
            setHasError(true)
            setMensagemErro("Senha e Confimação de senha não se coicidem");
            return;
        } else {
            axios
                .post('http://localhost:8000/usuarios/cadastro', {
                    nome: nome,
                    email: email,
                    senha: senha,
                    //foto: usu_foto
                })
                .then((response) => {
                    //setMensagemErro(true);
                    navigate('/login');
                });
        }

        console.log('submit', {
            nome,
            email,
            senha,
        });
    };

    return (

        <section className='flex items-center min-h-screen bg-violet-200 justify-center	'>
            <div className='flex items-center w-3/11.5 justify-self-center max-auto '>
                <div className='flex-1 h-full max-w-full  max-auto bg-[#AF54EB] rounded-lg shadow-xl'>
                    <div className='flex flex-col md:flex-row '>
                        <div className='flex items-center justify-center p-6 sm:p-12'>
                            <form action='' onSubmit={handleSubmit} className='flex flex-col pl-2'>
                                <h1 className="mb-4 text-5xl font-bold text-center text-black font-roboto">
                                    Cadastro
                                </h1>

                                <div className='mt-12'>
                                    <Input
                                        labelTexto="Nome de Usuario"
                                        placeholder="Nome de Usuario"
                                        tipo="text"
                                        nome="nome"
                                        onChange={(e) => {
                                            setNome(e.target.value);
                                        }}
                                    />
                                </div>

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

                                <div className='mt-4'>
                                    <Input
                                        labelTexto="Confirmação de senha"
                                        placeholder="Confirmação de senha"
                                        tipo="password"
                                        nome="confirmaSenha"
                                        onChange={(e) => {
                                            setConfirmaSenha(e.target.value);
                                        }}
                                    />
                                </div>
                                {/* Mensagens de Erros proximos */}
                                <div className="flex justify-center mt-8    ">
                                    <Button texto="Cadastrar" tipo="submit" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )

}