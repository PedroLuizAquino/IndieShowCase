import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo2.png'
import { Drawer, TextField } from '@mui/material';
import { MenuDrawer } from '../MenuDrawer';
import { SearchBar } from '../SearchBar/SearchBar';
import { useEffect, useState } from 'react';



export const Navbar = () => {
    const navigate = useNavigate();
    const [token, setToken] = useState<string | null>(null);


    useEffect(() => {
        const userToken = localStorage.getItem('token'); // exemplo de onde você pode armazenar o token
        setToken(userToken);
    }, [0]);


    return (
        <Box marginBottom={'100px'}>
            <AppBar position="fixed" color='primary'>
                <Toolbar >
                    <Box paddingRight={2}
                        display={'flex'}
                        color={'inherit'}>
                        <MenuDrawer />
                    </Box>
                    <Typography variant="h6" component={Button} onClick={() => navigate('/')} color={'white'}>
                        IndieShowCase
                    </Typography>
                    <Box
                        display={'flex'}
                        justifyContent={'center'}
                        sx={{ flexGrow: 1 }}
                    >
                        {/* <TextField
                            type='search'
                            sx={{ width: '400px' }}
                            placeholder="Search..."
                            variant="outlined"
                            size='small'
                            color='secondary'
                        /> */}
                        <SearchBar />
                    </Box>
                    {token ? (<Box gap={1} display={'flex'} >
                        <Button color='pedro' variant='text' onClick={() => navigate('/criarPostagem')} >Criar Anuncio</Button>
                        <Button variant='text' color='pedro' onClick={() => {
                            localStorage.removeItem('token')
                            navigate('/')
                            window.location.reload();
                        }}>Logout</Button>
                    </Box>
                    ) : (
                        <Box gap={1} display={'flex'} >
                            <Button color='pedro' variant='text' onClick={() => navigate('/cadastroUsuario')} >Cadastrar</Button>
                            <Button variant='text' color='pedro' onClick={() => navigate('/login')}>Login</Button>
                        </Box>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    )
}