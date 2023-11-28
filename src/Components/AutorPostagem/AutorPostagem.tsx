import { useEffect, useState } from "react";
import { IPostagem, IUsuario } from "../../Interface";
import axios from "axios";
import { Avatar, Box, Typography } from "@mui/material";
import { jwtDecode } from "jwt-decode";


type AutorPostagemProps = {
    postagem: IPostagem;
}


export const AutorPostagem = ({ postagem }: AutorPostagemProps) => {

    const [usuario, setUsuario] = useState<IUsuario | null>(null);



    useEffect(() => {
        axios
            .get<{ response: IUsuario[] }>(`http://localhost:8000/usuarios/${postagem.usu_id}/`)
            .then(({ data }) => {
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


    console.log('postagem detalhada', postagem)
    console.log(`http://localhost:8000/${usuario?.usu_foto}`)

    return (
        <>
            <Avatar
                alt="foto do autor"
                src={`http://localhost:8000/${usuario?.usu_foto}`}
            />
            <Typography variant="body1" >
                {usuario?.usu_nome}
            </Typography>

        </>
    )

}