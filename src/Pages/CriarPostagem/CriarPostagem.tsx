import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Container, Grid, Paper, Typography, Button, Select, TextField } from '@mui/material';
import { ICategorias } from '../../Interface';
import { StyledTextField } from '../../Themes';
import { toast } from 'react-toastify';




export const CriarPostagem = () => {

    const navigate = useNavigate();

    const [categorias, setCategorias] = useState<ICategorias[]>()


    useEffect(() => {
        axios
            .get('http://localhost:3001/categorias/')
            .then((response) => {
                console.log(response)
                setCategorias(response.data);
            }).catch((error) => {
                toast.error('falha ao cadastrar')
            });
    }, []);


    const handleSubmit = (event: React.FormEvent) => {
    }

    return (

        <Container fixed>
            <Box
                margin={6}
                maxWidth={'1500px'}
                height={700}
                maxHeight={900}
                //sx={{ backgroundColor: "#BA5AFA" }}
                display={'flex'}
                gap={1}
                flexDirection={'column'}
                justifyItems={'center'}
                alignItems={'center'}
                borderRadius={'15px'}
                component={Paper}
                padding={5}
                boxShadow={2}
            >

                <Grid container>
                    <Grid item xs={6}>
                        <Typography variant='h4' color={'white'}>
                            Criar Postagem
                        </Typography>
                        <Box
                            display={'flex'}
                            justifyContent={'center'}
                            flexDirection={'column'}
                            width={'400px'}
                            padding={5}
                            gap={5}
                        >
                            <TextField
                                label={'Titulo'}
                            />
                            <TextField
                                label={'Categoria'}
                            />
                            <Select
                                value={categorias}
                            />
                            <TextField
                                label={'Tags'}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box
                            display={'flex'}
                            justifyContent={'center'}
                            flexDirection={'column'}
                            width={'400px'}
                            padding={5}
                            gap={5}
                        >
                            <StyledTextField
                                multiline
                                label={'Descrição'}
                                maxRows={6}
                                rows={6}
                            />
                        </Box>

                        <Box
                            display={'flex'}
                            flexDirection={'row'}
                            padding={2}
                            justifyContent={'center'}
                            gap={2}
                        >
                            <Button>
                                Descartar
                            </Button>
                            <Button>
                                Publicar
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )

}