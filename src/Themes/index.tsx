import { TextField, createTheme } from "@mui/material"
import styled from "styled-components";


export const DefaultTheme = createTheme({
    palette: {
        primary: {
            main: "#FF9900",
            dark: "#DE8500",
            light: "#FFAE00",
            contrastText: "#353535",
        },
        secondary: {
            main: "#465EFF",
            dark: "#3A4FD6",
            light: "#457CFF",
            contrastText: "#FFFFFF",
        },
        background: {
            default: "#E6E6E6",
            paper: "#2E336B",
        },
        text: {
            primary: "#C5C5C9",
            secondary: "#C5C5C5",
            disabled: "#C5C5C9",
        }

    },
});

export const StyledTextField = styled(TextField)({
    "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "#C5C5C5",
    }
});