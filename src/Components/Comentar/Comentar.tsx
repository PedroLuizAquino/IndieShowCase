import { IComentarios, IPostagem } from "../../Interface";
import axios from "axios";
import { Avatar, Box, Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import eventBus from "../../EventBus/eventBus";

type ComentariosPostagemProps = {
  postagem: IPostagem;
};

export const Comentar = ({ postagem }: ComentariosPostagemProps) => {
  //const [comentarios, setComentarios] = useState<IComentarios[]>([]);

  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [usuFoto, setUsuFoto] = useState<string | null>(null);


  useEffect(() => {
    const userToken = localStorage.getItem('token');
    setToken(userToken);

    // Exemplo: obtendo informações do usuário ao fazer login
    if (userToken) {
      const tokenDecodificado = jwtDecode<{ usu_id: number, usu_foto: string }>(userToken);
      const userID = tokenDecodificado?.usu_id;  // <-- Renomeie aqui
      const userName = tokenDecodificado?.usu_foto;
      // Suponha que você tenha um endpoint no seu backend para obter as informações do usuário
      fetch(`http://localhost:8000/usuarios/${userID}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${userToken}`
        },
      })
        .then(response => response.json())
        .then(data => {
          console.log('Dados recebidos no frontend:', data);
          const userData = data.response[0];
          setUsuFoto(userData.usu_foto);

        })
        .catch(error => console.error('Erro ao obter informações do usuário:', error));
      console.log(usuFoto)
    }
  }, []);

  const ComentarFormSchema = z.object({
    com_texto: z.string().nonempty("campo obrigatorio"),
  });
  type ComentarFormData = z.infer<typeof ComentarFormSchema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ComentarFormData>({
    resolver: zodResolver(ComentarFormSchema),
  });

  const ComentarPostagem = (data: ComentarFormData) => {
    axios
      .post(
        `http://localhost:8000/postagens/comentar/${postagem.pos_id}/`,
        {
          com_texto: data.com_texto,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        //setMensagemErro(true);
        //toast.success("Comentario enviado");
        console.log("comentarios criado ", response.data.postagemcriada)
        //window.location.reload()
        eventBus.emit('novoComentario', response.data.postagemcriada);
        reset();
      })
      .catch((error) => {
        toast.error("Erro ao Comentar");
      });
  };

  return (
    <Box component="form" onSubmit={handleSubmit(ComentarPostagem)}>
      <Box display={"flex"} flexDirection={"row"} gap={2}>
        <Avatar
          src={`http://localhost:8000/${usuFoto}`}

        />
        <TextField
          label="Comentar"
          {...register("com_texto")}
          fullWidth
          variant="filled"
          color="pedro"
        />
      </Box>
      <Box display={"flex"} justifyContent={"end"} paddingTop={2}>
        <Button color="secondary" variant="contained" type="submit">
          Pulbicar
        </Button>
      </Box>
    </Box>
  );
};
