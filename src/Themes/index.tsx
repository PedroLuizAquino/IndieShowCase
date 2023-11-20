import { TextField, createTheme } from "@mui/material"
import styled from "styled-components";


declare module '@mui/material/styles' {
    interface Palette {
        pedro: Palette['primary'];
    }

    interface PaletteOptions {
        pedro?: PaletteOptions['primary'];
    }
}

declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
        pedro: true;
    }
}

declare module '@mui/material/IconButton' {
    interface IconButtonPropsColorOverrides {
        pedro: true;
    }
}

declare module '@mui/material/TextField' {
    interface TextFieldPropsColorOverrides {
        pedro: true;
    }
}


export const DefaultTheme = createTheme({
    palette: {
        primary: {
            main: "#673ab7", //"#FF9900"
            dark: "#512da8",
            light: "#9575cd",
            contrastText: "#ede7f6",
        },

        // primary: {
        //     main: "#FF9900", //"#FF9900"
        //     dark: "#DE8500",
        //     light: "#FFAE00",
        //     contrastText: "#353535",
        // },
        secondary: {
            main: "#3f51b5",
            dark: "#303f9f",
            light: "#7986cb",
            contrastText: "#e8eaf6",
        },
        // secondary: {
        //     main: "#465EFF",
        //     dark: "#3A4FD6",
        //     light: "#457CFF",
        //     contrastText: "#FFFFFF",
        // },
        background: {
            default: "#121212",
            paper: "#2E336B",
        },
        pedro: {
            main: '#fff',
            dark: 'rgba(255, 255, 255, 0.08)',
            light: 'rgba(255, 255, 255, 0.16)',
            contrastText: 'rgba(255, 255, 255, 0.7)',
        },
        // text: {
        //     primary: "#C5C5C9",
        //     secondary: "#C5C5C5",
        //     disabled: "#C5C5C9",
        // },
        mode: 'dark'
    },
});

export const StyledTextField = styled(TextField)({
    "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "#C5C5C5",
    }
});