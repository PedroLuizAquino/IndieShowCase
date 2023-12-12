import axios from 'axios';
import { toast } from 'react-toastify';
import { Box, Container, Paper, TextField, Typography, Button } from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useLocation, useParams } from 'react-router-dom';





export const AlterarSenha = () => {


    const ForgotPassowrdUserFormSchema = z.object({
        password: z.string().nonempty('campo obrigatorio')
            .min(8, 'A senha prescisa de no mínimo 8 caracteres'),
        confirmPassword: z.string().nonempty('campo obrigatorio')

    }).refine((fields) => fields.password === fields.confirmPassword, {
        path: ['confirmPassword'],
        message: 'As Senhas prescisam ser iguais'
    })
    type RecuperarSenhaFormData = z.infer<typeof ForgotPassowrdUserFormSchema>

    const { register, handleSubmit, formState: { errors } } = useForm<RecuperarSenhaFormData>({
        resolver: zodResolver(ForgotPassowrdUserFormSchema)
    });

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');




    const recuperaSenha = (data: RecuperarSenhaFormData) => {
        axios
            .post(`http://localhost:8000/usuarios/nova-senha?token=${token}`, {
                senha: data.password,
            })
            .then((response) => {
                toast.success('Senha alterada com sucesso')

            }).catch((error) => {
                toast.error('Senha não pode ser indentica a atual')
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
                    onSubmit={handleSubmit(recuperaSenha)}
                >

                    <Typography
                        variant="h4"
                        align="center"
                    >
                        Alterar Senha
                    </Typography>

                    <TextField
                        label="Senha"
                        type='password'
                        {...register('password')}
                        helperText={errors.password?.message}
                        error={!!errors.password?.message}

                    />
                    <TextField
                        label="Confirmação de senha"
                        type='password'
                        {...register('confirmPassword')}
                        helperText={errors.confirmPassword?.message}
                        error={!!errors.confirmPassword?.message}
                    />
                    <Box width={'100%'} display={'flex'} justifyContent={'center'} marginTop={2}>
                        <Box>
                            <Button
                                variant="contained"
                                color="primary"
                                size='large'
                                type='submit'
                            >Alterar</Button>
                        </Box>
                    </Box>
                </Box>
            </Box>


        </Container>
    )

}