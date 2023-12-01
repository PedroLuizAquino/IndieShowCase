import React, { ChangeEvent } from 'react';
import { ICategorias } from '../../Interface';
import { MenuItem, Select } from '@mui/material';

interface SelectCategoriaProps {
    categorias: ICategorias[];
    onCategoriaSelonecionado?: (categoria: ICategorias) => void;
}


const SelectCategoria: React.FC<SelectCategoriaProps> = ({ categorias, onCategoriaSelonecionado }) => {
    return (
        <Select
            placeholder='Categorias'
        >
            {categorias.map((categoria) => (
                <MenuItem
                    key={categoria.cat_id}
                    value={categoria.cat_id}
                //style={getStyles(name, personName, theme)}
                >
                    {categoria.cat_nome}
                </MenuItem>
            ))}
        </Select>
    );
};

export default SelectCategoria;


