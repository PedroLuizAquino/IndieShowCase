import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo2.png'


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


export const Navbar = () => {
    const navigate = useNavigate();

    return (
        <Box sx={{ flexGrow: 1 }} bgcolor={"#9B4BD0"}>
            <AppBar position="static" color='transparent'>
                <Toolbar >
                    <Box paddingRight={2} component={Button} onClick={() => navigate('/')} display={'flex'} color={'inherit'}>
                        <img src={logo} width={"50px"} alt='Logo IndieShowCase' />
                    </Box>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        IndieShowCase
                    </Typography>
                    <Box gap={1} display={'flex'}>
                        <Button color='inherit' onClick={() => navigate('/cadastroUsuario')} >Cadastrar</Button>
                        <Button color='inherit' onClick={() => navigate('/login')}>Login</Button>
                    </Box>
                </Toolbar>
            </AppBar>
            <Box display={'flex'}
                flexDirection={'row'}
                justifyContent={'space-around'}
                paddingTop={1}
                paddingBottom={1}
                boxShadow={2}
                bgcolor={"#8942B8"}
            >
                {categorias.map((categorias, index) => (
                    <Box display={'flex'} key={index} component={Button} onClick={() => navigate(categorias.to)} color={'inherit'} size={'small'} style={{ textTransform: 'none' }}>
                        <Typography >
                            {categorias.label}
                        </Typography>
                    </Box>
                ))}
            </Box>
        </Box>
    )
}