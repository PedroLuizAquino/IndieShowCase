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


const labelCategorias = [
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


export const Navbar = () => {
    const navigate = useNavigate();

    return (
        <Box sx={{ flexGrow: 1 }} bgcolor={"#2E336B"}>
            <AppBar position="static" color='transparent'>
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
                    <Box gap={1} display={'flex'} >
                        <Button color='pedro' variant='text' onClick={() => navigate('/cadastroUsuario')} >Cadastrar</Button>
                        <Button variant='text' color='pedro' onClick={() => navigate('/login')}>Login</Button>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    )
}