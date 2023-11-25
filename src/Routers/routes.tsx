import {
    BrowserRouter as Router,
    Routes,
    Route,
} from 'react-router-dom';
import Layout from '../Components/Layout';
import { LoginUsuario } from '../Pages/Login/LoginUsuario';
import Pagina404 from '../Pages/Pagina404/Pagina404';
import { CriarPostagem } from '../Pages/CriarPostagem/CriarPostagem';
import { CadastroUsuario } from '../Pages/CadastroUsuario/CadastroUsuario';
import { RecuperarSenha } from '../Pages/RecuperarSenha/RecuperarSenha';
import { AlterarSenha } from '../Pages/AlterarSenha/AlterarSenha';
import { HomePage } from '../Pages/HomePage/HomePage';
import { DetalhePostagens } from '../Pages/Postagens/Postagens';


export default function AppRouter() {

    const userToken = localStorage.getItem('token'); // exemplo de onde você pode armazenar o token


    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<HomePage />} />


                    {/* Rotas do Gerais */}
                    <Route path="criarPostagem" element={userToken ? <CriarPostagem /> : <Pagina404 />} />
                    <Route path='/cadastroUsuario' element={<CadastroUsuario />} />
                    <Route path="login" element={<LoginUsuario />} />
                    <Route path="recuperarSenha" element={<RecuperarSenha />} />
                    <Route path="alterarSenha" element={<AlterarSenha />} />
                    <Route path="/postagem/:pos_id" element={<DetalhePostagens />} />
                    <Route path="*" element={<Pagina404 />} />

                </Route>
            </Routes>
        </Router>





    );



}