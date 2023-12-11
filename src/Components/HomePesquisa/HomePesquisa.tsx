import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Grid } from "@mui/material";
import { CardPostagem } from "../CardPostagem/CardPostagem";
import { IPostagem } from "../../Interface";
import { useParams } from "react-router-dom";


type HomePesquisaProps = {
    query: string;
}

export const HomePesquisa = () => {

    const { query } = useParams();
    const [listaPostagem, setListaPostagem] = useState<IPostagem[]>([]);


    useEffect(() => {
        axios
            .get<{ response: IPostagem[] }>(`http://localhost:8000/postagens/procurar/${query}`)
            .then(({ data }) => {
                setListaPostagem(data.response);
            })
            .catch((error) => {
                console.error('Erro ao obter categorias:', error);
            });
    }, []);



    return (
        <Container maxWidth={'lg'}>

            <Grid container spacing={5} >
                {listaPostagem.map((postagem, index) => (
                    <Grid item xs={12} sm={4} key={index}>
                        <CardPostagem postagem={postagem} />

                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}