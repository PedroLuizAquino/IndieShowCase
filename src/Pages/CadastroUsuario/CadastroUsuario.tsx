import { Box, Button, CircularProgress, Container, Paper, TextField, Typography } from '@mui/material';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { StyledTextField } from '../../Themes';
import { useState } from 'react';

export const CadastroUsuario = () => {

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);

    const createUserFormSchema = z.object({
        name: z.string().nonempty('campo obrigatorio'),
        email: z.string().nonempty('campo obrigatorio')
            .email('Formato de email inválido'),
        password: z.string().nonempty('campo obrigatorio')
            .min(8, 'A senha prescisa de no mínimo 8 caracteres'),
        confirmPassword: z.string().nonempty('campo obrigatorio')
    })
        .refine((fields) => fields.password === fields.confirmPassword, {
            path: ['confirmPassword'],
            message: 'As Senhas prescisam ser iguais'
        })

    type createUserFormData = z.infer<typeof createUserFormSchema>

    const { register, handleSubmit, formState: { errors } } = useForm<createUserFormData>({
        resolver: zodResolver(createUserFormSchema)
    });


    const createUser = (data: createUserFormData) => {
        console.log(data.name)
        console.log(data.email)
        console.log(data.password)
        setIsLoading(true)

        axios
            .post('http://localhost:8000/usuarios/cadastro', {
                nome: data.name,
                email: data.email,
                senha: data.password,
            })
            .then((response) => {
                //setMensagemErro(true);
                setIsLoading(false)
                toast.success('Usuario Cadastrado')
                navigate('/login');
            }).catch((error) => {
                setIsLoading(false)
                toast.error(error.message)
            });

    }


    return (
        <Container
            maxWidth={'md'}
        >
            <Box
                margin={6}
                maxWidth={800}
                height={550}
                maxHeight={900}
                display={'flex'}
                gap={1}
                flexDirection={'column'}
                alignItems={'center'}
                justifyContent={'center'}
                borderRadius={'15px'}
                component={Paper}
                boxShadow={2}
            >
                <Box
                    display={'flex'}
                    flexDirection={'column'}
                    gap={3}
                    width={400}
                    component='form'
                    onSubmit={handleSubmit(createUser)}
                >

                    <Typography
                        variant="h4"
                        align="center"
                        color={'white'}
                    >
                        Cadastro
                    </Typography>


                    <TextField
                        label="Nome"
                        {...register('name')}
                        color='pedro'
                        helperText={errors.name?.message}
                        disabled={isLoading}
                        variant='outlined'
                        error={!!errors.name?.message}
                    />

                    <TextField
                        label="Email"
                        type='email'
                        {...register('email')}
                        disabled={isLoading}
                        color='pedro'
                        helperText={errors.email?.message}
                        error={!!errors.email?.message}
                    />

                    <TextField
                        label="Senha"
                        type='password'
                        color='pedro'
                        {...register('password')}
                        helperText={errors.password?.message}
                        error={!!errors.password?.message}
                        disabled={isLoading}
                    />
                    <TextField
                        label="Confirmação de senha"
                        type='password'
                        color='pedro'
                        {...register('confirmPassword')}
                        helperText={errors.confirmPassword?.message}
                        error={!!errors.confirmPassword?.message}
                        disabled={isLoading}
                    />
                    <Box width={'100%'} display={'flex'} justifyContent={'center'} marginTop={2}>
                        <Box>
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
                                }>Cadastrar</Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Container >
    )
}