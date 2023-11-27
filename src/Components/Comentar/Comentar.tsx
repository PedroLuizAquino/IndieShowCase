import { useEffect, useState } from "react";
import { IComentarios, IPostagem } from "../../Interface";
import axios from "axios";
import { Avatar, Box, Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";


type ComentariosPostagemProps = {
    postagem: IPostagem;
}


export const Comentar = ({ postagem }: ComentariosPostagemProps) => {

    //const [comentarios, setComentarios] = useState<IComentarios[]>([]);


    const navigate = useNavigate();


    const token = localStorage.getItem('token');
    if (token) {

        const decode = jwtDecode(token);
        console.log('token', decode)
    }


    const ComentarFormSchema = z.object({
        texto: z.string().nonempty('campo obrigatorio')

    })
    type ComentarFormData = z.infer<typeof ComentarFormSchema>

    const { register, handleSubmit, formState: { errors } } = useForm<ComentarFormData>({
        resolver: zodResolver(ComentarFormSchema)
    });


    const ComentarPostagem = (data: ComentarFormData) => {
        axios
            .post(`http://localhost:8000/postagens/comentar/${postagem.pos_id}/`, {
                texto: data.texto,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            .then((response) => {
                //setMensagemErro(true);
                toast.error('Comentario enviado')
                window.location.reload();
            }).catch((error) => {
                toast.error('Erro ao Comentar')
            });

    }

    return (

        <Box
            component='form'
            onSubmit={handleSubmit(ComentarPostagem)}
        >
            <Box display={'flex'} flexDirection={'row'} gap={2}>
                <Avatar />
                <TextField
                    label="Comentar"
                    {...register('texto')}
                    fullWidth
                    variant="filled"
                    color="pedro"
                />
            </Box>
            <Box display={'flex'} justifyContent={'end'} paddingTop={2}>
                <Button color="secondary" variant="contained" type="submit">
                    Pulbicar
                </Button>
            </Box>
        </Box>
    )

}