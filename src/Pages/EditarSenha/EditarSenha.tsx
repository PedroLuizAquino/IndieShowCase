import axios from 'axios';
import { toast } from 'react-toastify';
import { Box, Container, Paper, TextField, Typography, Button } from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useLocation, useNavigate, useParams } from 'react-router-dom';





export const EditarSenha = () => {

    const navigate = useNavigate();

    const { usu_id } = useParams();



    const EditPassowrdUserFormSchema = z.object({
        oldPassword: z.string().nonempty('campo obrigatorio')
            .min(8, 'A senha prescisa de no mínimo 8 caracteres'),
        newPassword: z.string().nonempty('campo obrigatorio')
            .min(8, 'A senha prescisa de no mínimo 8 caracteres'),
        confirmPassword: z.string().nonempty('campo obrigatorio')

    }).refine((fields) => fields.newPassword === fields.confirmPassword, {
        path: ['confirmPassword'],
        message: 'As Senhas prescisam ser iguais'
    })
    type EditarSenhaFormData = z.infer<typeof EditPassowrdUserFormSchema>

    const { register, handleSubmit, formState: { errors } } = useForm<EditarSenhaFormData>({
        resolver: zodResolver(EditPassowrdUserFormSchema)
    });

    const token = localStorage.getItem('token');




    const editarSenha = (data: EditarSenhaFormData) => {
        axios
            .patch(`http://localhost:8000/usuarios/editarsenha/`, {
                senha: data.oldPassword,
                novaSenha: data.newPassword
            },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            .then((response) => {
                toast.success('Senha alterada com sucesso')
                navigate(`/perfil/${usu_id}`)

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
                    onSubmit={handleSubmit(editarSenha)}
                >

                    <Typography
                        variant="h4"
                        align="center"
                    >
                        Alterar Senha
                    </Typography>

                    <TextField
                        label="Senha Antiga"
                        type='password'
                        color='pedro'
                        {...register('oldPassword')}
                        helperText={errors.oldPassword?.message}
                        error={!!errors.oldPassword?.message}

                    />

                    <TextField
                        label="Nova Senha"
                        type='password'
                        color='pedro'
                        {...register('newPassword')}
                        helperText={errors.newPassword?.message}
                        error={!!errors.newPassword?.message}

                    />
                    <TextField
                        label="Confirmação de senha"
                        type='password'
                        color='pedro'
                        {...register('confirmPassword')}
                        helperText={errors.confirmPassword?.message}
                        error={!!errors.confirmPassword?.message}
                    />
                    <Box width={'100%'} display={'flex'} justifyContent={'center'} marginTop={2}>
                        <Box>
                            <Button
                                variant="contained"
                                color="secondary"
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