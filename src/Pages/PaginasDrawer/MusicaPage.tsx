
import { Box, Button, Card, CardActions, CardContent, CardMedia, Container, Grid, Typography } from "@mui/material"
import { CardPostagem } from "../../Components/CardPostagem/CardPostagem"
import logo from '../../assets/logo2.png'
import { useEffect, useState } from "react";
import axios from "axios";
import { ICategorias } from "../../Interface";
import { HomeCategoria } from "../../Components/HomeCategorias";
import Pagina404 from "../Pagina404/Pagina404";





export const MusicaPage = () => {

    const [categoria, setCategoria] = useState<ICategorias | null>(null);


    useEffect(() => {
        axios
            .get<{ response: ICategorias[] }>(`http://localhost:8000/postagens/listarNome/Musica`)
            .then(({ data }) => {
                console.log("data categoria", data.response);
                console.log("data categoria", data);
                setCategoria(data.response[0]);
            })
            .catch((error) => {
                console.error('Erro ao obter categorias:', error);
            });
    }, [1]);

    if (categoria === null) {
        return <p>Carregando...</p>; // ou qualquer indicador de carregamento desejado
    }

    return (
        <HomeCategoria
            categoria={categoria}
        />
    )
}
