import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IPostagem } from "../../Interface";
import axios from "axios";
import { CardPostagem } from "../../Components/CardPostagem/CardPostagem";
import { Box, Button, CardMedia, Container, Grid, Paper, Typography } from "@mui/material";
import logo from '../../assets/logo2.png'
import { AutorPostagem } from "../../Components/AutorPostagem/AutorPostagem";
import { ComentariosPostagem } from "../../Components/ComentariosPostagem/ComentariosPostagem";
import { Comentar } from "../../Components/Comentar/Comentar";


export const DetalhePostagens = () => {


    const { pos_id } = useParams();

    const navigate = useNavigate()

    const [postagem, setPostagem] = useState<IPostagem | null>(null);

    const token = localStorage.getItem('token');


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
        <Container maxWidth={'lg'}
        >
            <Box
                margin={6}
                maxWidth={3000}
                height={1200}
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
                        <Box display={'flex'} justifyContent={'center'}>
                            <br />
                            <br />
                            <Typography>
                                "futuro espaço do arquivo"
                            </Typography>
                            <br />
                            <br />
                            <br />
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box alignItems={'center'} display={'flex'} position={'relative'} gap={2} paddingTop={2}>
                            <AutorPostagem
                                postagem={postagem}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box alignItems={'center'} display={'flex'} position={'relative'} justifyContent={'end'} gap={2} paddingTop={2}>
                            <Button variant="contained" color="secondary">
                                Curtir {postagem.pos_qtdGostei}
                            </Button>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box alignItems={'center'} display={'flex'} justifyContent={'center'}>
                            <Typography margin={1}>
                                Comentários
                            </Typography>
                        </Box>
                        {token ? <Comentar postagem={postagem} />
                            :
                            <Box display={'flex'} justifyContent={'center'} padding={5} gap={1} flexDirection={'column'} alignItems={'center'}>
                                <Typography>Usuario prescisa estar logado para comentar</Typography>
                                <Box display={'flex'} flexDirection={'row'} justifyContent={'center'} alignItems={'center'} gap={2}>
                                    <Button variant="text" color="pedro" onClick={() => navigate('/cadastroUsuario')}>Cadastrar</Button>
                                    <Button variant="text" color="pedro" onClick={() => navigate('/login')}>Logar</Button>
                                </Box>
                            </Box>
                        }
                        <ComentariosPostagem postagem={postagem} />
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}
