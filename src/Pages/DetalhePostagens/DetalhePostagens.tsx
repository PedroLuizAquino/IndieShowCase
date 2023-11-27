import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IPostagem } from "../../Interface";
import axios from "axios";
import { CardPostagem } from "../../Components/CardPostagem/CardPostagem";
import { Box, CardMedia, Container, Grid, Paper, Typography } from "@mui/material";
import logo from '../../assets/logo2.png'
import { AutorPostagem } from "../../Components/AutorPostagem/AutorPostagem";
import { ComentariosPostagem } from "../../Components/ComentariosPostagem/ComentariosPostagem";


export const DetalhePostagens = () => {


    const { pos_id } = useParams();

    const navigate = useNavigate()

    const [postagem, setPostagem] = useState<IPostagem | null>(null);

    useEffect(() => {
        console.log('pos_id:', pos_id);
        axios
            .get<{ response: IPostagem[] }>(`http://localhost:8000/postagens/${pos_id}/`)
            .then(({ data }) => {
                console.log("data", data.response);
                console.log("data", data);
                console.log('achou')
                setPostagem(data.response[0]);
            })
            .catch((error) => {
                console.error('Erro ao obter detalhes da postagem:', error);
                if (error.response) {
                    console.log('Resposta do servidor:', error.response.data);
                    console.log('Status do servidor:', error.response.status);
                }
            });

    }, [pos_id]);
    console.log('postagem detalhada', postagem)

    // Faça algo com o ID (por exemplo, renderize os detalhes da postagem com base no ID)
    return postagem && (
        <Container maxWidth={'lg'}>
            {/* <Box
                margin={6}
                maxWidth={3000}
                height={700}
                maxHeight={900}
                display={'flex'}
                gap={1}
                flexDirection={'column'}
                justifyItems={'center'}
                alignItems={'center'}
                borderRadius={'15px'}
                component={Paper}
                padding={5}
                boxShadow={2}
            >
                <Typography>
                    {postagem?.pos_nome}
                </Typography>


            </Box> */}
            <Box
                margin={6}
                maxWidth={3000}
                height={1000}
                maxHeight={900}
                display={'flex'}
                gap={1}
                flexDirection={'column'}
                justifyItems={'center'}
                alignItems={'center'}
                borderRadius={'15px'}
                component={Paper}
                padding={5}
                boxShadow={2}
            >
                <Grid container spacing={5} >

                    <Grid item xs={8} sm={4} >
                        {/* <Box>
                            <img
                                //alt={postagem?.pos_capa ? `http://localhost:8000/${postagem?.pos_capa}` : logo}
                                src={postagem?.pos_capa ? `http://localhost:8000/${postagem?.pos_capa}` : logo}
                                alt={`Imagem da postagem ${postagem?.pos_id}`}
                            />
                        </Box> */}
                        <CardMedia
                            component='img'
                            height='140'
                            image={postagem?.pos_capa ? `http://localhost:8000/${postagem?.pos_capa}` : logo}
                            sx={{ borderRadius: '5px' }}
                        />

                    </Grid>
                    <Grid item xs={8}>
                        <Box alignItems={'center'} display={'flex'} justifyContent={'center'}>
                            <Typography variant="h3">
                                {postagem?.pos_nome}
                            </Typography>
                        </Box>
                        <Box alignItems={'center'} display={'flex'} justifyContent={'center'} paddingTop={'3rem'}>
                            <Typography variant="h6">
                                {postagem?.pos_descricao}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />

                    </Grid>
                    <Grid item xs={4}>
                        <Box alignItems={'center'} display={'flex'} justifyContent={'center'}>

                            <Typography>
                                Sobre o autor
                            </Typography>


                        </Box>
                        <AutorPostagem
                            postagem={postagem}
                        />
                    </Grid>
                    <Grid item xs={8}>
                        <Box alignItems={'center'} display={'flex'} justifyContent={'center'}>
                            <Typography>
                                Comentarios
                            </Typography>
                        </Box>
                        <ComentariosPostagem postagem={postagem} />
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}
