import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IPostagem } from "../../Interface";
import axios from "axios";
import { CardPostagem } from "../../Components/CardPostagem/CardPostagem";
import {
  Box,
  Button,
  CardMedia,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import logo from "../../assets/logo2.png";
import { AutorPostagem } from "../../Components/AutorPostagem/AutorPostagem";
import { ComentariosPostagem } from "../../Components/ComentariosPostagem/ComentariosPostagem";
import { Comentar } from "../../Components/Comentar/Comentar";
import { CurtirPostagem } from "../../Components/CurtirPostagem/CurtirPostagem";
import { MediaPostagem } from "../../Components/MediaPostagem/MediaPostagem";
import { toast } from "react-toastify";

export const DetalhePostagens = () => {
  const { pos_id } = useParams();
  const navigate = useNavigate();
  const [postagem, setPostagem] = useState<IPostagem | null>(null);
  const token = localStorage.getItem("token");

  const handleDownload = async () => {
    if (token) {
      try {
        const response = await fetch(`http://localhost:8000/postagens/baixar/${pos_id}`, {
          headers: {
            //Authorization: `Bearer ${token}`, // Se necessário para autenticação
          },
        });

        if (!response.ok) {
          console.error('Erro ao baixar o arquivo:', response.statusText);
          return;
        }

        const blob = await response.blob();

        // Cria um URL para o Blob
        const url = URL.createObjectURL(blob);
        const arquivonome = response.headers.get('Content-Disposition')?.split('filename=')[1];
        // Cria um link temporário
        const link = document.createElement('a');
        link.href = url;
        link.download = ''; // Substitua pelo nome desejado


        // Adiciona o link ao DOM e simula um clique
        document.body.appendChild(link);
        link.click();

        // Remove o link do DOM
        document.body.removeChild(link);

        // Libera recursos do Blob
        URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Erro na requisição de download:', error);
      }
    } else {
      toast.error('Necessario estar logado')
    }
  };





  useEffect(() => {
    axios
      .get<{ response: IPostagem[] }>(
        `http://localhost:8000/postagens/${pos_id}/`
      )
      .then(({ data }) => {
        setPostagem(data.response[0]);
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
    postagem && (
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
                image={
                  postagem?.pos_capa
                    ? `http://localhost:8000/${postagem?.pos_capa}`
                    : logo
                }
                sx={{ borderRadius: "5px" }}
              />
            </Grid>
            <Grid item xs={8}>
              <Box
                alignItems={"center"}
                display={"flex"}
                justifyContent={"center"}
              >
                <Typography variant="h3">{postagem?.pos_nome}</Typography>
              </Box>
              <Box
                alignItems={"center"}
                display={"flex"}
                justifyContent={"center"}
                paddingTop={"3rem"}
              >
                <Typography variant="h6">{postagem?.pos_descricao}</Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box display={"flex"} justifyContent={"center"}>
                <MediaPostagem postagem={postagem} />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box
                alignItems={"center"}
                display={"flex"}
                position={"relative"}
                gap={2}
                paddingTop={2}
              >
                <AutorPostagem postagem={postagem} />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box
                alignItems={"center"}
                display={"flex"}
                position={"relative"}
                justifyContent={"end"}
                gap={2}
                paddingTop={2}
              >
                <Button onClick={handleDownload} variant="contained" color="secondary">
                  Baixar
                </Button>
                <CurtirPostagem postagem={postagem} />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box
                alignItems={"center"}
                display={"flex"}
                justifyContent={"center"}
              >
                <Typography margin={1}>Comentários</Typography>
              </Box>
              {token ? (
                <>
                  {" "}
                  <Comentar postagem={postagem} />
                  <ComentariosPostagem postagem={postagem} />
                </>
              ) : (
                <>
                  <Box
                    display={"flex"}
                    justifyContent={"center"}
                    padding={5}
                    gap={1}
                    flexDirection={"column"}
                    alignItems={"center"}
                  >
                    <Typography>
                      Usuario prescisa estar logado para comentar
                    </Typography>
                    <Box
                      display={"flex"}
                      flexDirection={"row"}
                      justifyContent={"center"}
                      alignItems={"center"}
                      gap={2}
                    >
                      <Button
                        variant="text"
                        color="pedro"
                        onClick={() => navigate("/cadastroUsuario")}
                      >
                        Cadastrar
                      </Button>
                      <Button
                        variant="text"
                        color="pedro"
                        onClick={() => navigate("/login")}
                      >
                        Logar
                      </Button>
                    </Box>
                  </Box>
                  <ComentariosPostagem postagem={postagem} />
                </>
              )}
            </Grid>
          </Grid>
        </Box>
      </Container>
    )
  );
};
