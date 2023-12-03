import axios from 'axios';
import { toast } from 'react-toastify';
import { Box, Container, Paper, Typography, Button, TextField } from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { StyledTextField } from '../../Themes';





export const RecuperarSenha = () => {


    const ForgotPassowrdUserFormSchema = z.object({
        email: z.string().nonempty('campo obrigatorio')
            .email('Formato de email inválido'),

    })
    type RecuperarSenhaFormData = z.infer<typeof ForgotPassowrdUserFormSchema>

    const { register, handleSubmit, formState: { errors } } = useForm<RecuperarSenhaFormData>({
        resolver: zodResolver(ForgotPassowrdUserFormSchema)
    });


    const recuperaSenha = (data: RecuperarSenhaFormData) => {
        axios
            .post('http://localhost:8000/usuarios/esqueci-senha', {
                email: data.email,
            })
            .then((response) => {
                //setMensagemErro(true);
                toast.success('Email Enviado')
            }).catch((error) => {
                toast.error('Email não encontrado')
            });

    }



    return (

        <Container
            maxWidth={'md'}
        >
            <Box
                margin={6}
                maxWidth={800}
                height={400}
                maxHeight={900}
                //sx={{ backgroundColor: "#BA5AFA" }}
                display={'flex'}
                gap={3}
                flexDirection={'column'}
                alignItems={'center'}
                justifyContent={'center'}
                borderRadius={'15px'}
                component={Paper}
                marginTop={10}
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
                        color={'white'}
                    >
                        Recuperar Senha
                    </Typography>

                    <TextField
                        label="Email"
                        margin='dense'
                        {...register('email')}
                        helperText={errors.email?.message}
                        error={!!errors.email?.message}
                        type='email'

                    />

                    <Box width={'100%'} display={'flex'} justifyContent={'center'} marginTop={2}>
                        <Box>
                            <Button
                                variant="contained"
                                color="primary"
                                size='large'
                                type='submit'
                            >Enviar</Button>
                        </Box>
                    </Box>
                </Box>
            </Box>


        </Container>
    )

}