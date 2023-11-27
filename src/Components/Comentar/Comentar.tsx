import { useEffect, useState } from "react";
import { IComentarios, IPostagem } from "../../Interface";
import axios from "axios";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";


type ComentariosPostagemProps = {
    postagem: IPostagem;
}


export const Comentar = ({ postagem }: ComentariosPostagemProps) => {

    //const [comentarios, setComentarios] = useState<IComentarios[]>([]);


    const navigate = useNavigate();


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
            })
            .then((response) => {
                //setMensagemErro(true);
                toast.error('Comentario enviado')
                window.location.reload();
            }).catch((error) => {
                toast.error('Erro ao Comentar')
            });

    }

    const handleComent = () => {


    }

}