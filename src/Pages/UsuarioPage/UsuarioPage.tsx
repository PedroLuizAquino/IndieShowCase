import { useNavigate, useParams } from "react-router-dom";
import { IUsuario } from "../../Interface";
import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Container, Paper, Grid, CardMedia, Typography, Button } from "@mui/material";
import { ImagemUsuario } from "../../Components/ImagemUsuario/ImagemUsuario";





export const UsuarioPage = () => {
    const { usu_id } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const [usuario, setUsuario] = useState<IUsuario | null>(null);

    console.log('chegou')

    useEffect(() => {
        axios
            .get<{ response: IUsuario[] }>(
                `http://localhost:8000/usuarios/${usu_id}/`
            )
            .then(({ data }) => {
                setUsuario(data.response[0]);
            })
            .catch((error) => {
                console.error("Erro ao obter detalhes do usuario:", error);
                if (error.response) {
                    console.log("Resposta do servidor:", error.response.data);
                    console.log("Status do servidor:", error.response.status);
                }
            });
    }, []);


    return (
        <Container maxWidth={"lg"}>
            <Box
                margin={6}
                maxWidth={3000}
                height={"auto"}
                display={"flex"}
                gap={1}
                flexDirection={"column"}
                justifyItems={"center"}
                alignItems={"center"}
                borderRadius={"15px"}
                component={Paper}
                padding={5}
                boxShadow={2}
            >
                <Grid container spacing={5}>
                    <Grid item xs={8} sm={4}>
                        <CardMedia
                            component="img"
                            height="140"
                            src={`http://localhost:8000/${usuario?.usu_foto}`}
                            sx={{ borderRadius: "10px", maxHeight: '300px' }}
                        />
                    </Grid>
                    <Grid item xs={8}>
                        <Box
                            alignItems={"center"}
                            display={"flex"}
                            justifyContent={"center"}
                        >
                            <Typography variant="h4">{usuario?.usu_nome}</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={8} sm={4}>
                        <Box width={'300px'} >
                            <ImagemUsuario />
                        </Box>
                    </Grid>
                    <Grid item xs={8} >

                        <Box display={'flex'} justifyContent={'end'} paddingRight={'5px'}>
                            <Button
                                variant="contained"
                                color="secondary"
                                size='large'
                                onClick={() => navigate(`/editarSenha/${usu_id}`)}
                            >
                                Alterar Senha
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )

}