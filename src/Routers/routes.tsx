import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom';
import Layout from '../Components/Layout';


export default function AppRouter() {




    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<></>} />


                    {/* Padrão de Rotas do cliente
                    <Route
                        path="perfilCliente"
                        element={usuarioTipo === 'C' ? <PerfilCliente /> : <Pagina404 />}
                    /> */}




                    {/* Rotas do Gerais */}
                    {/* <Route path="cadastroUsuario" element={<CadastroUsuario />} />
                    <Route path="agendamento" element={<Agendamento />} />
                    <Route path="login" element={<Login />} />
                    <Route path="sobre" element={<Sobre />} />
                    <Route path="*" element={<Pagina404 />} /> */}

                </Route>
            </Routes>
        </Router>





    );



}