import axios from "axios";
import { useEffect, useState } from "react";
import { ICategorias, IPostagem } from "../Interface";
import { Container, Grid } from "@mui/material";
import { CardPostagem } from "./CardPostagem/CardPostagem";


type HomeCategoriaProps = {
    categoria: ICategorias;
}

export const HomeCategoria = ({ categoria }: HomeCategoriaProps) => {

    const [listaPostagem, setListaPostagem] = useState<IPostagem[]>([]);


    useEffect(() => {
        axios
            .get<{ response: IPostagem[] }>(`http://localhost:8000/postagens/listar/${categoria.cat_id}`)
            .then(({ data }) => {
                console.log("data", data.response);
                console.log("data", data);
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