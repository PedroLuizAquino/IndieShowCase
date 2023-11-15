import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../Components/Input/Input';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Box, Container, Paper, TextField, Typography, Button, Link } from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';





export const LoginUsuario = () => {

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const navigate = useNavigate();


    const LoginUserFormSchema = z.object({
        email: z.string(),
        password: z.string()

    })
    type LoginFormData = z.infer<typeof LoginUserFormSchema>

    const { register, handleSubmit } = useForm<LoginFormData>({
        resolver: zodResolver(LoginUserFormSchema)
    });


    const loginUser = (data: LoginFormData) => {
        axios
            .post('http://localhost:8000/usuarios/login', {
                email: data.email,
                senha: data.password,
            })
            .then((response) => {
                //setMensagemErro(true);
                navigate('/');
            }).catch((error) => {
                toast.error('email ou senha incorretos')
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
                //sx={{ backgroundColor: "#BA5AFA" }}
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
                    onSubmit={handleSubmit(loginUser)}
                >

                    <Typography
                        variant="h4"
                        align="center"
                    >
                        Login
                    </Typography>

                    <TextField
                        label="Email"
                        {...register('email')}

                    />

                    <TextField
                        label="Senha"
                        {...register('password')}

                    />
                    <Box
                        display={'flex'}
                        justifyContent={'end'}
                    >
                        <Link href='/cadastroUsuario'>
                            Esqueceu a Senha ?
                        </Link>
                    </Box>

                    <Box width={'100%'} display={'flex'} justifyContent={'center'} marginTop={2}>
                        <Box>
                            <Button
                                variant="contained"
                                color="primary"
                                size='large'
                                type='submit'
                            >Login</Button>
                        </Box>
                    </Box>
                </Box>
            </Box>


        </Container>
    )

}