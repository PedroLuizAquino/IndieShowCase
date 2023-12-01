import { useEffect, useState } from "react";
import { IComentarios, IPostagem, IUsuario } from "../../Interface";
import axios from "axios";
import { Avatar, Box, Typography } from "@mui/material";
import { AutorComentario } from "../AutorComentario/AutorComentario";

type ComentariosPostagemProps = {
  postagem: IPostagem;
};

export const ComentariosPostagem = ({ postagem }: ComentariosPostagemProps) => {
  const [comentarios, setComentarios] = useState<IComentarios[]>([]);
  const [usuario, setUsuario] = useState<IUsuario | null>(null);

  useEffect(() => {
    axios
      .get<{ response: IComentarios[] }>(
        `http://localhost:8000/postagens/comentarios/${postagem.pos_id}/`
      )
      .then(({ data }) => {
        setComentarios(data.response);
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
    <Box height={"420px"} maxHeight={"600px"} marginTop={5} overflow={"auto"}>
      {comentarios.map((comentarios, index) => (
        <Box
          key={index}
          display={"flex"}
          flexDirection={"row"}
          gap={2}
          paddingBottom={4}
        >
          {/* <Avatar />
                    <Box display={'flex'} flexDirection={'column'}>
                        <Typography>
                            nome do usuario que comentou
                        </Typography>
                        <Typography>
                            {comentarios.com_texto}
                        </Typography>
                    </Box> */}
          <AutorComentario comentario={comentarios} />
        </Box>
      ))}
    </Box>
  );
};
