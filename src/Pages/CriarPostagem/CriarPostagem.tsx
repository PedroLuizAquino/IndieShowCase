import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Container, Grid, Paper, Typography, Button, Select, TextField, OutlinedInput, MenuItem, Autocomplete } from '@mui/material';
import { ICategorias } from '../../Interface';
import { StyledTextField } from '../../Themes';
import { SelectChangeEvent } from '@mui/material-next';
import SelectCategoria from '../../Components/Select/Select';




export const CriarPostagem = () => {

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false)

    const [listaCategorias, setListaCategorias] = useState<ICategorias[]>([]);
    const [categoriaSelecionado, setCategoriaSelecionado] = useState<ICategorias | null>(
        null
    );


    useEffect(() => {
        axios
            .get<{ response: ICategorias[] }>('http://localhost:8000/categorias/')
            .then(({ data }) => {
                console.log("data", data.response);
                console.log("data", data);
                setListaCategorias(data.response);
            })
            .catch((error) => {
                console.error('Erro ao obter categorias:', error);
            });
    }, []);


    console.log('categorias 2', listaCategorias)


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
                            {/* <Select
                                placeholder='Categorias'
                            >
                                {listaCategorias.map((categoria) => (
                                    <MenuItem
                                        key={categoria.cat_id}
                                        value={categoria.cat_id}
                                    //style={getStyles(name, personName, theme)}
                                    >
                                        {categoria.cat_nome}
                                    </MenuItem>
                                ))}
                            </Select> */}
                            <SelectCategoria
                                categorias={listaCategorias}
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
                            <Button
                                variant='text'
                                color='pedro'
                                size='large'
                                onClick={() => navigate('/')}
                            >
                                Descartar
                            </Button>
                            <Button
                                variant="contained"
                                color="secondary"
                                size='large'
                                type='submit'
                            >
                                Publicar
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )

}