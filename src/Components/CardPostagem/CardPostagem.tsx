import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from "@mui/material"
import logo from '../../assets/logo2.png'
import { IPostagem, IUsuario } from "../../Interface";
import { useNavigate } from "react-router-dom";
//import logo2 from '../../../../IndieAPI/postagens/30/32.png';
import { AiOutlineTag } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";


type CardPostagemProps = {
    postagem: IPostagem;
}

export const CardPostagem = ({ postagem }: CardPostagemProps) => {

    console.log(postagem)
    const navigate = useNavigate();

    const [usuario, setUsuario] = useState<IUsuario | null>(null);



    // useEffect(() => {
    //     console.log('pos_id:', postagem.pos_id);
    //     console.log('usu_id:', postagem.usu_id);

    //     axios
    //         .get<{ response: IUsuario[] }>(`http://localhost:8000/usuarios/${postagem.usu_id}/`)
    //         .then(({ data }) => {
    //             console.log("data usu_id", data.response);
    //             console.log("data usu_id", data);
    //             console.log('achou')
    //             setUsuario(data.response[0]);
    //         })
    //         .catch((error) => {
    //             console.error('Erro ao obter detalhes da postagem:', error);
    //             if (error.response) {
    //                 console.log('Resposta do servidor:', error.response.data);
    //                 console.log('Status do servidor:', error.response.status);
    //             }
    //         });

    // }, []);

    return (
        <Box width={'345px'} padding={'10px'}  >
            <Card>
                <CardActionArea onClick={() => navigate(`/postagem/${postagem.pos_id}`)}>
                    <CardMedia
                        component='img'
                        height='140'
                        image={postagem.pos_capa ? `http://localhost:8000/${postagem.pos_capa}` : logo}
                        sx={{ borderRadius: '5px' }}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component='div'>
                            {postagem.pos_nome}
                        </Typography>
                        <Typography variant="body2" color={'text.secondary'}>
                            {postagem.pos_descricao}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Box display={'flex'} gap={2}>
                            <Typography variant="body2"><Box display={'flex'} flexDirection={'row'} gap={1}> <AiOutlineTag size={20} />  {postagem.pos_tags} </Box></Typography>
                            <Typography variant="body2"><Box display={'flex'} flexDirection={'row'} gap={1}> <FaUser size={20} />  {usuario ? usuario.usu_nome : 'Fulano'}  </Box></Typography>
                        </Box>
                    </CardActions>
                </CardActionArea>
            </Card>
        </Box >
    )
}