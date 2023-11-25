
export interface ICategorias {
    cat_id: number;
    cat_nome: string;
}


export interface IPostagem {
    pos_id: number;
    pos_nome: string;
    pos_descricao: string;
    pos_ativo: boolean;
    pos_tags: string;
    pos_qtdGostei: number;
    pos_data: Date;
    usu_id: number;
    cat_id: number;
    pos_download: boolean;
    pos_capa: string;
}