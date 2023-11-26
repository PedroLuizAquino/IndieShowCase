import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IPostagem } from "../../Interface";
import axios from "axios";
import { CardPostagem } from "../../Components/CardPostagem/CardPostagem";


export const DetalhePostagens = () => {


    const { pos_id } = useParams();


    const [postagem, setPostagem] = useState<IPostagem | null>(null);

    useEffect(() => {
        console.log('pos_id:', pos_id);
        console.log(`http://localhost:8000/postagens/${pos_id}`)
        axios
            .get<{ response: IPostagem[] }>(`http://localhost:8000/postagens/${pos_id}/`)
            .then(({ data }) => {
                console.log("data", data.response);
                console.log("data", data);
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
    return (
        <div>
            <h2>Detalhes da Postagem {pos_id}</h2>
            {postagem &&
                <CardPostagem
                    postagem={postagem}
                />
            }

            {/* Outros conteúdos do componente */}
        </div>
    );
}
