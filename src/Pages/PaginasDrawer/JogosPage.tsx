
import { Box, Button, Card, CardActions, CardContent, CardMedia, Container, Grid, Typography } from "@mui/material"
import { CardPostagem } from "../../Components/CardPostagem/CardPostagem"
import logo from '../../assets/logo2.png'
import { useEffect, useState } from "react";
import axios from "axios";
import { IPostagem } from "../../Interface";





export const JogosPage = () => {

    const [listaPostagem, setListaPostagem] = useState<IPostagem[]>([]);


    useEffect(() => {
        axios
            .get<{ response: IPostagem[] }>('http://localhost:8000/postagens/')
            .then(({ data }) => {
                console.log("data", data.response);
                console.log("data", data);
                setListaPostagem(data.response);
            })
            .catch((error) => {
                console.error('Erro ao obter categorias:', error);
            });
    }, [1]);

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
