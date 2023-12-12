import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo2.png";
import { Avatar, Drawer, TextField } from "@mui/material";
import { MenuDrawer } from "../MenuDrawer";
import { SearchBar } from "../SearchBar/SearchBar";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";


export const Navbar = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [userID, setUserId] = useState<number | null>(null);
  const [usuFoto, setUsuFoto] = useState<string | null>(null);


  useEffect(() => {
    const userToken = localStorage.getItem('token');
    setToken(userToken);

    // Exemplo: obtendo informações do usuário ao fazer login
    if (userToken) {
      const tokenDecodificado = jwtDecode<{ usu_id: number, usu_nome: string, usu_foto: string }>(userToken);
      const userID = tokenDecodificado?.usu_id;  // <-- Renomeie aqui
      const userName = tokenDecodificado?.usu_nome;
      // Suponha que você tenha um endpoint no seu backend para obter as informações do usuário
      fetch(`http://localhost:8000/usuarios/${userID}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${userToken}`
        },
      })
        .then(response => response.json())
        .then(data => {
          const userData = data.response[0];
          setUserName(userData.usu_nome);
          setUserId(userData.usu_id);
          setUsuFoto(userData.usu_foto)

        })
        .catch(error => console.error('Erro ao obter informações do usuário:', error));
    }
  }, []);

  return (
    <Box marginBottom={'100px'}>
      <AppBar position="fixed" color='primary'>
        <Toolbar>
          <Box paddingRight={2} display={'flex'} color={'inherit'}>
            <MenuDrawer />
          </Box>
          <Typography variant="h6" component={Button} onClick={() => navigate('/')} color={'white'}>
            IndieShowCase
          </Typography>
          <Box display={'flex'} justifyContent={'center'} sx={{ flexGrow: 1 }}>
            <SearchBar />
          </Box>
          {token ? (
            <Box gap={1} display={'flex'}>
              <Avatar
                src={`http://localhost:8000/${usuFoto}`}
              />
              <Button color='pedro' variant='text' onClick={() => navigate(`/perfil/${userID}`)}> {userName}  </Button>
              <Button color='pedro' variant='text' onClick={() => navigate('/criarPostagem')}>Publicar</Button>
              <Button variant='text' color='pedro' onClick={() => {
                localStorage.removeItem('token');
                navigate('/');
                window.location.reload();
              }}>Logout</Button>
            </Box>
          ) : (
            <Box gap={1} display={'flex'}>
              <Button color='pedro' variant='text' onClick={() => navigate('/cadastroUsuario')}>Cadastrar</Button>
              <Button variant='text' color='pedro' onClick={() => navigate('/login')}>Login</Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};