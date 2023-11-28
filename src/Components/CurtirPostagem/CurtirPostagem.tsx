import { Button } from "@mui/material";
import { IPostagem } from "../../Interface"
import { BiLike } from "react-icons/bi";
import axios from "axios";
import { toast } from "react-toastify";


type CurtirPostagemProps = {
    postagem: IPostagem;
}

export const CurtirPostagem = ({ postagem }: CurtirPostagemProps) => {

    const token = localStorage.getItem('token');


    const handleGostei = () => {
        axios
            .post(`http://localhost:8000/postagens/gostei/${postagem.pos_id}/`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            .then((response) => {
                if (response.status === 201) {
                    toast.success('Postagem Marcada como gostei')
                    window.location.reload();
                }
                if (response.status === 200) {
                    toast.success('Postagem removida do gostei')
                    window.location.reload();

                }
            }).catch((error) => {
                toast.error(error)
            });
    }

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

}