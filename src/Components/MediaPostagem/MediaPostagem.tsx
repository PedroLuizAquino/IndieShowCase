import { useEffect, useState } from "react";
import { IArquivo, IPostagem } from "../../Interface";
import axios from "axios";
import { Box } from "@mui/material";



type MediaPostageProps = {
    postagem: IPostagem;
}

export const MediaPostagem = ({ postagem }: MediaPostageProps) => {
    const [arquivo, setArquivo] = useState<IArquivo | null>(null);

    useEffect(() => {

        axios
            .get<{ response: IArquivo[] }>(`http://localhost:8000/postagens/arquivos/${postagem.pos_id}/`)
            .then(({ data }) => {
                console.log("data", data.response);
                setArquivo(data.response[0]);
                console.log(arquivo)
            })
            .catch((error) => {
                console.error('Erro ao obter postagens:', error);
            });
    }, []);

    const renderizarTag = (arquivo: IArquivo | null) => {
        if (!arquivo || !arquivo.arq_caminho) {
            return <p>Arquivo inválido</p>;
        }
        console.log('arquivo', arquivo)
        const extensao = arquivo.arq_caminho.split('.').pop()?.toLocaleString();

        console.log('extensão', extensao)
        if (extensao === 'jpg' || extensao === 'jpeg' || extensao === 'png') {
            return <img src={`http://localhost:8000/${arquivo.arq_caminho}`} alt="Imagem" />;
        } else if (extensao === 'mp4' || extensao === 'webm' || extensao === 'ogg') {
            return <video controls src={`http://localhost:8000/${arquivo.arq_caminho}`} />;
        } else if (extensao === 'mp3' || extensao === 'ogg' || extensao === 'wav' || extensao === 'm4a') {
            return <audio controls src={`http://localhost:8000/${arquivo.arq_caminho}`} />;
        } else {
            return <p>Formato de arquivo não suportado para reprodução no navegado</p>;
        }
    };


    return (
        <div>
            {arquivo && (
                <Box>
                    {renderizarTag(arquivo)}
                    {/* <p>{arquivo.}</p> */}
                </Box>
            )}
        </div>
    );
};

