import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo2.png'
import Button from '../Button/Button';
import { useEffect, useState } from 'react';
import { PiUserCircle } from "react-icons/pi";
import { MdAdd } from "react-icons/md";
import jwt_decode, { JwtPayload } from 'jsonwebtoken';
import IconButton from '../IconButton/IconButton';


const Navbar = () => {

    const usuarioLogado = sessionStorage.getItem('usuarioLogado') === 'true';

    const navigate = useNavigate();
    const [userName, setUserName] = useState<string | null>(null); // Defina o tipo do nome de usuário como string ou nulo


    const categorias = [
        {
            label: 'Jogos',
            to: '/jogos',
        },
        {
            label: 'Quadrinhos',
            to: '/quadrinhos',
        },
        {
            label: 'Ilustrações',
            to: '/ilustracao',
        },
        {
            label: 'Animações',
            to: '/animacao'
        },
        {
            label: 'Musica/Audio',
            to: '/musica'
        },
        {
            label: 'WebFiction',
            to: '/webficiton'
        }
    ];

    const handleLogout = () => {
        // Limpar dados de sessão ou estado relacionados ao login
        sessionStorage.removeItem('usuarioLogado');
        sessionStorage.removeItem('token');


        // Redirecionar para a página de login ou qualquer outra página desejada após o logout
        navigate('/');
    };


    return (
        <>
            <nav className="flex items-center justify-between py-2 px-3 bg-[#9B4BD0]">
                <Link to="/">
                    <div className="flex items-center justify-start text-white">
                        <img src={logo} alt="logo da IndieShowCase" className='w-20' />
                        <p className="ml-7 font-face-playlist font-normal text-4xl text-slate-950">
                            IndieShowCase
                        </p>
                    </div>
                </Link>

                {/*Colocar a barra de pesquisa aqui*/}

                <ul className="flex items-center justify-end">
                    {usuarioLogado ? (
                        <li className="list-none flex gap-3 items-center">
                            <IconButton
                                icon={<MdAdd />}
                                onClick={() => navigate("/criarPostagem")}
                            >
                                <p>Publicar</p>
                            </IconButton>

                            {/* foto de perfil que eu irei mudar logo logo */}

                            <PiUserCircle
                                className="text-black text-5xl font-medium font-face-montserrat"
                            />
                            <Button texto="Sair" onClick={handleLogout} />
                        </li>
                    ) : (
                        <li className="list-none flex items-center">
                            <Link to="/cadastroUsuario">
                                <button className="bg-[#C9A5F6] text-slate-950 font-medium text-2xl py-2 px-4 rounded-[20px] hover:bg-[#B278FF] mr-2 font-face-roboto">
                                    Cadastrar
                                </button>
                            </Link>
                            <Link to="/login">
                                <button className="bg-[#C9A5F6] text-slate-950 font-medium text-2xl py-2 px-4 rounded-[20px] mr-2 font-roboto hover:bg-[#B278FF]">
                                    Login
                                </button>
                            </Link>
                        </li>
                    )}
                </ul>
            </nav >

            <nav className="flex justify-evenly gap-10  py-1  shadow-md bg-[#C9A5F6] divide-x-4 divide-[#9B4BD0]">
                {categorias.map((categoria, index) => (
                    <div key={index} className='pl-20 pr-10'>
                        <li className="list-none mr-6 ml-6 divide-x-0" >
                            <Link to={categoria.to}
                            >
                                <text className='font-roboto'>{categoria.label}</text>
                            </Link>
                        </li>
                    </div>
                ))}
            </nav >
        </>

    );

};

export default Navbar;