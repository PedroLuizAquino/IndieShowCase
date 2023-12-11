import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import logo from "../../assets/logo2.png";
import { IPostagem, IUsuario } from "../../Interface";
import { useNavigate } from "react-router-dom";
//import logo2 from '../../../../IndieAPI/postagens/30/32.png';
import { AiOutlineTag } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";

type CardPostagemProps = {
  postagem: IPostagem;
};

export const CardPostagem = ({ postagem }: CardPostagemProps) => {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState<IUsuario | null>(null);

  useEffect(() => {
    axios
      .get<{ response: IUsuario[] }>(
        `http://localhost:8000/usuarios/${postagem.usu_id}/`
      )
      .then(({ data }) => {
        setUsuario(data.response[0]);
      })
      .catch((error) => {
        console.error("Erro ao obter detalhes da postagem:", error);
        if (error.response) {
          console.log("Resposta do servidor:", error.response.data);
          console.log("Status do servidor:", error.response.status);
        }
      });
  }, []);

  return (
    <Box width={"350px"} padding={"10px"}>
      <Card>
        <CardActionArea
          onClick={() => navigate(`/postagem/${postagem.pos_id}`)}
        >
          <CardMedia
            component="img"
            height="200px"
            image={
              postagem.pos_capa
                ? `http://localhost:8000/${postagem.pos_capa}`
                : logo
            }
            sx={{ borderRadius: "5px", maxHeight: "200px" }}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div" overflow={'hidden'} whiteSpace={'nowrap'} textOverflow={'ellipsis'}>
              {postagem.pos_nome}
            </Typography>
            <Typography variant="body2" color={"text.secondary"} overflow={'hidden'} whiteSpace={'nowrap'} textOverflow={'ellipsis'}>
              {postagem.pos_descricao}
            </Typography>
          </CardContent>
          <CardActions>
            <Box display={"flex"} gap={2}>
              <Typography variant="body2">
                <Box display={"flex"} flexDirection={"row"} gap={1}>
                  {" "}
                  <AiOutlineTag size={20} /> {postagem.pos_tags}{" "}
                </Box>
              </Typography>
              <Typography variant="body2">
                <Box display={"flex"} flexDirection={"row"} gap={1}>
                  {" "}
                  <FaUser size={20} /> {usuario ? usuario.usu_nome : "Fulano"}{" "}
                </Box>
              </Typography>
            </Box>
          </CardActions>
        </CardActionArea>
      </Card>
    </Box>
  );
};
