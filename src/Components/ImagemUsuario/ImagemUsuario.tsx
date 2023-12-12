import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";




export const ImagemUsuario = () => {

    const token = localStorage.getItem('token'); // exemplo de onde você pode armazenar o token
    const [isLoading, setIsLoading] = useState(false)

    const createUserPicFormSchema = z.object({
        foto: z.instanceof(FileList).transform(list => list.item(0)!)
    });


    const navigate = useNavigate();

    type createPostFormData = z.infer<typeof createUserPicFormSchema>

    const { register, handleSubmit, reset, formState: { errors } } = useForm<createPostFormData>({
        resolver: zodResolver(createUserPicFormSchema)
    });

    const createFoto = async (data: createPostFormData) => {
        setIsLoading(true)
        try {
            const formData = new FormData();
            formData.append('foto', data.foto);


            await axios.post('http://localhost:8000/usuarios/adicionar-nova-foto', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });
            setIsLoading(false)
            console.log('File uploaded successfully');
            toast.success('Foto Alterada')
            window.location.reload()
        } catch (error) {
            setIsLoading(false)
            console.error('Error uploading file:', error);
            toast.error('Erro ao alterar a foto')
        }

        console.log(data)
    }

    return (
        <Box component="form" onSubmit={handleSubmit(createFoto)}>
            <Box display={"flex"} flexDirection={"row"} gap={2}>
                <TextField
                    {...register("foto")}
                    variant="standard"
                    color="pedro"
                    type='file'
                    disabled={isLoading}
                />
            </Box>
            <Box display={"flex"} justifyContent={"end"} paddingTop={2} gap={2}>
                <Button color="secondary" variant="contained" size="small" onClick={() => { reset() }}>
                    Cancelar
                </Button>
                <Button color="secondary" variant="contained" size="small" type="submit">
                    Salvar
                </Button>
            </Box>
        </Box>
    );

}