import { useEffect, useState } from "react";
import { IComentarios, IPostagem } from "../../Interface";
import axios from "axios";
import { Box } from "@mui/material";

type ComentariosPostagemProps = {
    postagem: IPostagem;
}


export const ComentariosPostagem = ({ postagem }: ComentariosPostagemProps) => {

    const [comentarios, setComentarios] = useState<IComentarios[]>([]);


    useEffect(() => {
        console.log('pos_id:', postagem.pos_id);
        console.log('usu_id:', postagem.usu_id);

        axios
            .get<{ response: IComentarios[] }>(`http://localhost:8000/postagens/comentarios/${postagem.pos_id}/`)
            .then(({ data }) => {
                console.log("data comentarios", data.response);
                console.log("data comentarios", data);
                setComentarios(data.response);
            })
            .catch((error) => {
                console.error('Erro ao obter detalhes da postagem:', error);
                if (error.response) {
                    console.log('Resposta do servidor:', error.response.data);
                    console.log('Status do servidor:', error.response.status);
                }
            });

    }, [postagem.pos_id]);

    console.log('postagem detalhada', postagem)

    return (
        <Box>
            {comentarios.map((comentarios, index) => (
                <Box key={index}>
                    {/* <CardPostagem postagem={postagem} /> */}
                </Box>
            ))}

        </Box>
    )
}