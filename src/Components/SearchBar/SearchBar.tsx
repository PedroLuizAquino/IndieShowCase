import { MdOutlineSearch, MdOutlineCancel } from "react-icons/md";
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { useState } from 'react';



export const SearchBar = () => {
    const [value, setValue] = useState("");

    return (
        <TextField
            placeholder="Pesquisar"
            type="text"
            variant="outlined"
            sx={{ width: '400px' }}
            color="pedro"
            size="small"
            onChange={(e) => setValue(e.target.value)}
            value={value}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <MdOutlineSearch />
                    </InputAdornment>
                ),

                endAdornment: value && (
                    <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setValue("")}
                    ><MdOutlineCancel /></IconButton>
                )
            }}
        />
    );
}