import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../Components/Input/Input';
import Button from '../../Components/Button/Button';
import axios from 'axios';
import Select from '../../Components/Select/Select';




export const CriarPostagem = () => {

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmaSenha, setConfirmaSenha] = useState('');
    const [categorias, setCategorias] = useState([]);

    const navigate = useNavigate();

    const [selectedOption, setSelectedOption] = useState('1');

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(event.target.value);
    };

    useEffect(() => {
        // axios
        //     .get('http://localhost:3001/categorias/')
        //     .then((response) => {
        //         console.log(response)
        //         //setCategorias(response.data);
        //     });
    }, []);


    const handleSubmit = (event: React.FormEvent) => {
    }

    return (

        <section className='flex items-center min-h-screen bg-violet-200 justify-center	'>
            <div className='flex items-center w-4/12 justify-self-center max-auto '>
                <div className='flex-1 h-full max-w-full  max-auto bg-[#AF54EB] rounded-lg shadow-xl'>
                    <div className='flex flex-col md:flex-row '>
                        <div className='flex items-center justify-center p-6 w-max sm:p-12  grow '>
                            <form action='' onSubmit={handleSubmit} className='flex flex-col'>
                                <h1 className="mb-4 text-5xl font-bold text-center text-black font-roboto">
                                    Publicar
                                </h1>

                                <div className='mt-4'>
                                    <Input
                                        labelTexto="Titulo"
                                        placeholder="Titulo da Postagem"
                                        tipo="text"
                                        nome="titulo"
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                        }}
                                    />
                                </div>


                                <div className='mt-4'>
                                    <Select
                                        labelTexto='Categorias'
                                        options={["1", "2"]}
                                        value={selectedOption}
                                        onChange={handleChange}
                                    />
                                </div>


                                <div className='mt-4'>
                                    <Input
                                        labelTexto="Tags"
                                        placeholder="Tags da Postagem"
                                        tipo="text"
                                        nome="tags"
                                        onChange={(e) => {
                                            setSenha(e.target.value);
                                        }}
                                    />
                                </div>

                                <div className='mt-4'>
                                    <Input
                                        labelTexto="Descrição"
                                        placeholder="Descrição da Postagem"
                                        tipo="text"
                                        nome="descricao"
                                        onChange={(e) => {
                                            setConfirmaSenha(e.target.value);
                                        }}
                                    />
                                </div>
                                {/* Mensagens de Erros proximos */}
                                <div className="flex justify-center mt-8    ">
                                    <Button texto="Publicar" tipo="submit" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )

}