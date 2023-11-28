import { Avatar, Box, Typography } from "@mui/material"
import { IComentarios, IUsuario } from "../../Interface";
import { useEffect, useState } from "react";
import axios from "axios";

type AutorComentarioProps = {
    comentario: IComentarios;
}

export const AutorComentario = ({ comentario }: AutorComentarioProps) => {

    const [usuario, setUsuario] = useState<IUsuario | null>(null);


    useEffect(() => {
        console.log('usu_id:', comentario.usu_id);

        axios
            .get<{ response: IUsuario[] }>(`http://localhost:8000/usuarios/${comentario.usu_id}/`)
            .then(({ data }) => {
                console.log("data usu_id", data.response);
                console.log("data usu_id", data);
                console.log('achou')
                setUsuario(data.response[0]);
            })
            .catch((error) => {
                console.error('Erro ao obter detalhes da postagem:', error);
                if (error.response) {
                    console.log('Resposta do servidor:', error.response.data);
                    console.log('Status do servidor:', error.response.status);
                }
            });

    }, []);
    return (
        <>
            <Avatar
                alt="foto do autor o comentario"
                src={`http://localhost:8000/${usuario?.usu_foto}`}
            />
            <Box display={'flex'} flexDirection={'column'}>
                <Typography variant="body2">
                    {usuario?.usu_nome}
                </Typography>
                <Typography variant="body1">
                    {comentario.com_texto}
                </Typography>
            </Box>
        </>
    )
}