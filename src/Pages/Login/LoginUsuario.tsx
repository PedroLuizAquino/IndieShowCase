import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  Link,
  TextField,
  CircularProgress,
} from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { StyledTextField } from "../../Themes";
import { useState } from "react";

export const LoginUsuario = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const LoginUserFormSchema = z.object({
    email: z
      .string()
      .nonempty("campo obrigatorio")
      .email("Formato de email inválido"),
    password: z.string().nonempty("campo obrigatorio"),
  });
  type LoginFormData = z.infer<typeof LoginUserFormSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginUserFormSchema),
  });

  const loginUser = (data: LoginFormData) => {
    setIsLoading(true);
    axios
      .post("http://localhost:8000/usuarios/login", {
        email: data.email,
        senha: data.password,
      })
      .then((response) => {
        //setMensagemErro(true);
        setIsLoading(false);
        if (response.status === 200) {
          setIsLoading(false)
          localStorage.setItem("token", response.data.token);
          navigate("/");
          window.location.reload();
        }
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error("email ou senha incorretos");
      });
  };

  return (
    <Container maxWidth={"md"}>
      <Box
        margin={6}
        maxWidth={800}
        height={550}
        maxHeight={900}
        //sx={{ backgroundColor: "#BA5AFA" }}
        display={"flex"}
        gap={1}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        borderRadius={"15px"}
        component={Paper}
        boxShadow={2}
      >
        <Box
          display={"flex"}
          flexDirection={"column"}
          gap={3}
          width={400}
          component="form"
          onSubmit={handleSubmit(loginUser)}
        >
          <Typography variant="h4" align="center" color={"white"}>
            Login
          </Typography>

          <TextField
            label="Email"
            {...register("email")}
            helperText={errors.email?.message}
            disabled={isLoading}
            error={!!errors.email?.message}
            color="pedro"
            type="email"
          />

          <TextField
            label="Senha"
            {...register("password")}
            type="password"
            helperText={errors.password?.message}
            disabled={isLoading}
            error={!!errors.password?.message}
            color="pedro"
          />
          <Box display={"flex"} justifyContent={"end"}>
            <Link href="/recuperarSenha" color={"#fff"}>
              Esqueceu a Senha?
            </Link>
          </Box>

          <Box
            width={"100%"}
            display={"flex"}
            justifyContent={"center"}
            marginTop={2}
          >
            <Box>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                type="submit"
                endIcon={
                  isLoading ? (
                    <CircularProgress
                      variant="indeterminate"
                      color="inherit"
                      size={20}
                    />
                  ) : undefined
                }
              >
                Login
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};
