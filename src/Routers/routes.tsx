import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../Components/Layout";
import { LoginUsuario } from "../Pages/Login/LoginUsuario";
import Pagina404 from "../Pages/Pagina404/Pagina404";
import { CriarPostagem } from "../Pages/CriarPostagem/CriarPostagem";
import { CadastroUsuario } from "../Pages/CadastroUsuario/CadastroUsuario";
import { RecuperarSenha } from "../Pages/RecuperarSenha/RecuperarSenha";
import { AlterarSenha } from "../Pages/AlterarSenha/AlterarSenha";
import { HomePage } from "../Pages/HomePage/HomePage";
import { DetalhePostagens } from "../Pages/DetalhePostagens/DetalhePostagens";
import { JogosPage } from "../Pages/PaginasDrawer/JogosPage";
import { QuadrinhosPage } from "../Pages/PaginasDrawer/QuadrinhosPage";
import { IlustracaoPage } from "../Pages/PaginasDrawer/IlustracaoPage";
import { AnimacaoPage } from "../Pages/PaginasDrawer/AnimacaoPage";
import { MusicaPage } from "../Pages/PaginasDrawer/MusicaPage";
import { WebFicPage } from "../Pages/PaginasDrawer/WebFicPage";
import { SoftwarePage } from "../Pages/PaginasDrawer/SoftwarePage";
import { HomePesquisa } from "../Components/HomePesquisa/HomePesquisa";
import { UsuarioPage } from "../Pages/UsuarioPage/UsuarioPage";
import { EditarSenha } from "../Pages/EditarSenha/EditarSenha";

export default function AppRouter() {
  const userToken = localStorage.getItem("token"); // exemplo de onde você pode armazenar o token

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />

          {/* Rotas Logadas */}
          <Route path="criarPostagem" element={userToken ? <CriarPostagem /> : <Pagina404 />} />
          <Route path="/perfil/:usu_id" element={userToken ? <UsuarioPage /> : <Pagina404 />} />
          <Route path="/editarSenha/:usu_id" element={userToken ? <EditarSenha /> : <Pagina404 />} />

          {/* Rotas do Gerais */}
          <Route path="/cadastroUsuario" element={<CadastroUsuario />} />
          <Route path="login" element={<LoginUsuario />} />
          <Route path="recuperarSenha" element={<RecuperarSenha />} />
          <Route path="alterarSenha" element={<AlterarSenha />} />
          <Route path="/postagem/:pos_id" element={<DetalhePostagens />} />
          <Route path="*" element={<Pagina404 />} />
          <Route path="/jogos" element={<JogosPage />} />
          <Route path="/quadrinhos" element={<QuadrinhosPage />} />
          <Route path="/ilustracao" element={<IlustracaoPage />} />
          <Route path="/animacao" element={<AnimacaoPage />} />
          <Route path="/musica" element={<MusicaPage />} />
          <Route path="/webficiton" element={<WebFicPage />} />
          <Route path="/software" element={<SoftwarePage />} />
          <Route path="/query/:query" element={<HomePesquisa />} />
        </Route>
      </Routes>
    </Router>
  );
}
