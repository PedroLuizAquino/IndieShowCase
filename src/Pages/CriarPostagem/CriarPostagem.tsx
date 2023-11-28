import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Container, Grid, Paper, Typography, Button, Select, TextField, OutlinedInput, MenuItem, Autocomplete, CircularProgress } from '@mui/material';
import { ICategorias } from '../../Interface';
import { StyledTextField } from '../../Themes';
import { SelectChangeEvent } from '@mui/material-next';
import SelectCategoria from '../../Components/Select/Select';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify';




export const CriarPostagem = () => {

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false)
    const [listaCategorias, setListaCategorias] = useState<ICategorias[]>([]);
    const [token, setToken] = useState<string | null>(null);

    const imagensExtensao = ['jpg', 'jpeg', 'png', 'gif'];

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

        const userToken = localStorage.getItem('token'); // exemplo de onde você pode armazenar o token
        setToken(userToken);
    }, [0]);

    const createPostFormSchema = z.object({
        titulo: z.string().nonempty('campo obrigatorio'),
        categoria: z.coerce.number(),
        tags: z.string(),
        descricao: z.string(),
        arquivo: z.instanceof(FileList).transform(list => list.item(0)!),
        capa: z.instanceof(FileList).transform(list => list.item(0)!)
    });

    type createPostFormData = z.infer<typeof createPostFormSchema>

    const { register, handleSubmit, formState: { errors } } = useForm<createPostFormData>({
        resolver: zodResolver(createPostFormSchema)
    });

    const createPost = async (data: createPostFormData) => {
        setIsLoading(true)
        try {
            const formData = new FormData();
            formData.append('titulo', data.titulo);
            formData.append('descricao', data.descricao);
            formData.append('tags', data.tags);
            formData.append('cat_id', data.categoria.toString());
            formData.append('arquivos', data.arquivo);
            formData.append('capa', data.capa);


            await axios.post('http://localhost:8000/postagens/publicar', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });
            setIsLoading(false)
            console.log('File uploaded successfully');
            toast.success('Postagem Criada')
            navigate('/')
        } catch (error) {
            setIsLoading(false)
            console.error('Error uploading file:', error);
            toast.error('Erro ao criar a postagem')
        }

        console.log(data)
    }

    return (

        <Container fixed>
            <Box
                margin={6}
                maxWidth={'1500px'}
                height={700}
                maxHeight={900}
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
                    <Box
                        display={'flex'}
                        alignItems={'center'}
                        justifyContent={'center'}
                        component='form'
                        onSubmit={handleSubmit(createPost)}
                        paddingLeft={3}
                        gap={8}
                    >


                        <Grid item xs={6}>
                            <Typography variant='h4' color={'white'} marginTop={'-10rem'}>
                                Criar Postagem
                            </Typography>
                            <Box
                                display={'flex'}
                                justifyContent={'center'}
                                flexDirection={'column'}
                                width={'400px'}
                                paddingTop={5}
                                gap={5}
                            >
                                <TextField
                                    label={'Titulo'}
                                    {...register('titulo')}
                                    helperText={errors.titulo?.message}
                                    color='pedro'
                                    error={!!errors.titulo?.message}
                                    disabled={isLoading}
                                />
                                <TextField
                                    label={'Tags'}
                                    {...register('tags')}
                                    color='pedro'
                                    helperText={errors.tags?.message}
                                    error={!!errors.tags?.message}
                                    disabled={isLoading}
                                />

                                <TextField
                                    label={'Categorias'}
                                    select
                                    color='pedro'
                                    //value={categoriaSelecionado}
                                    {...register('categoria')}
                                    disabled={isLoading}
                                //onChange={() => { }}
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
                                </TextField>
                            </Box>
                        </Grid>
                        <Grid item xs={6}>
                            <Box
                                display={'flex'}
                                justifyContent={'center'}
                                flexDirection={'column'}
                                width={'400px'}
                                paddingTop={5}
                                gap={5}
                            >
                                <StyledTextField
                                    multiline
                                    label={'Descrição'}
                                    {...register('descricao')}
                                    maxRows={6}
                                    color='pedro'
                                    rows={6}
                                    helperText={errors.descricao?.message}
                                    error={!!errors.descricao?.message}
                                    disabled={isLoading}
                                />
                                <Box>
                                    <Typography variant='h6' color={'white'}>
                                        Arquivo
                                    </Typography>
                                    <StyledTextField
                                        type='file'
                                        color='pedro'
                                        {...register('arquivo')}
                                        disabled={isLoading}
                                    />
                                </Box>
                                <Box
                                    paddingBottom={2}
                                >
                                    <Typography variant='h6' color={'white'}>
                                        Imagem
                                    </Typography>
                                    <StyledTextField
                                        type='file'
                                        color='pedro'
                                        {...register('capa')}
                                        placeholder='Imagem'
                                        disabled={isLoading}
                                    />
                                </Box>
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
                                    endIcon={
                                        isLoading ?
                                            <CircularProgress
                                                variant='indeterminate'
                                                color='inherit'
                                                size={20}
                                            />
                                            : undefined
                                    }>
                                    Publicar
                                </Button>
                            </Box>
                        </Grid>
                    </Box>
                </Grid>
            </Box >
        </Container >
    )

}