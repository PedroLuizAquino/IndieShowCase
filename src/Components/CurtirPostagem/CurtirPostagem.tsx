import { Button } from "@mui/material";
import { IPostagem } from "../../Interface";
import { BiLike } from "react-icons/bi";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";

type CurtirPostagemProps = {
  postagem: IPostagem;
};

export const CurtirPostagem = ({ postagem }: CurtirPostagemProps) => {
  const token = localStorage.getItem("token");
  const [localGostei, setLocalGostei] = useState(postagem.pos_qtdGostei);

  const handleGostei = () => {
    if (token) {

<<<<<<< HEAD
    axios
      .post(
        `http://localhost:8000/postagens/gostei/${postagem.pos_id}/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setLocalGostei(
          (prevGostei) => prevGostei + (response.status === 201 ? 1 : -1)
        );
        if (response.status === 201) {
          toast.success("Postagem marcada como gostei");
        } else if (response.status === 200) {
          toast.success("Postagem removida do gostei");
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
=======
      axios
        .post(
          `http://localhost:8000/postagens/gostei/${postagem.pos_id}/`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          setLocalGostei(
            (prevGostei) => prevGostei + (response.status === 201 ? 1 : -1)
          );
          if (response.status === 201) {
            toast.success("Postagem marcada como gostei");
          } else if (response.status === 200) {
            toast.success("Postagem removida do gostei");
          }
        })
        .catch((error) => {
          toast.error(error.message);
        });
>>>>>>> 17a62a079ef11cfedc81457a9171b0492234f96c
    }
  };

  return (
    <div>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleGostei}
        startIcon={<BiLike />}
      >
        {localGostei}
      </Button>
    </div>
  );
};

/* 
    return (
        <Button variant="contained" color="secondary"
            onClick={handleGostei}
            startIcon={
                <BiLike />
            }
        >
            {postagem.pos_qtdGostei}
        </Button>
    )

}*/
