import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom';
import Layout from '../Components/Layout';
import { CadastroUsuario } from '../Pages/CadastroUsuario/CadastroUsuario';
import { LoginUsuario } from '../Pages/Login/LoginUsuario';
import Pagina404 from '../Pages/Pagina404/Pagina404';
import { CriarPostagem } from '../Pages/CriarPostagem/CriarPostagem';


export default function AppRouter() {




    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<></>} />

                    <Route path='/criarPostagem' element={<CriarPostagem />} />

                    {/* Rotas do Gerais */}
                    <Route path="cadastroUsuario" element={<CadastroUsuario />} />
                    <Route path="login" element={<LoginUsuario />} />
                    {/*<Route path="agendamento" element={<Agendamento />} />                  
                    <Route path="sobre" element={<Sobre />} />*/}
                    <Route path="*" element={<Pagina404 />} />

                </Route>
            </Routes>
        </Router>





    );



}