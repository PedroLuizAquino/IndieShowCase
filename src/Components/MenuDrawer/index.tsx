import { Button, Drawer, Typography, IconButton, Divider } from "@mui/material"
import Box from '@mui/material/Box';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RiMenuFill } from "react-icons/ri";


export const MenuDrawer = () => {

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

    const [isDrawerOpen, setIsDrawerOpen] = useState(false)

    const navigate = useNavigate();

    return (
        <>
            <IconButton
                size="large"
                edge='start'
                color="pedro"
                aria-label="logo"
                onClick={() => setIsDrawerOpen(true)}
            >
                <RiMenuFill />
            </IconButton>
            <Drawer anchor="left" open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
                <Box display={'flex'}
                    flexDirection={'column'}
                    p={2}
                    width={'250px'}
                    gap={2}
                    textAlign={'center'}
                >
                    <Typography variant="h6" component='div' color={'white'}>
                        Categorias
                    </Typography>
                    <Divider />
                    {labelCategorias.map((categorias, index) => (
                        <Box display={'flex'}
                            key={index}
                            padding={2}
                            alignItems={'center'}
                            justifyContent={'center'}
                        >
                            <Button variant="text" color="pedro" style={{ textTransform: 'none' }} size="large" onClick={() => navigate(categorias.to)} >
                                {categorias.label}
                            </Button>
                        </Box>
                    ))}
                </Box>
            </Drawer>
        </>
    )

}