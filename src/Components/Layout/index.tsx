import { Outlet } from 'react-router-dom';
import { Navbar } from '../Navbar/Navbar';
import { Box, ThemeProvider } from '@mui/material';
import { DefaultTheme } from '../../Themes';




const Layout = ({ children }: { children?: React.ReactNode }) => {


    return (
        <ThemeProvider theme={DefaultTheme}>
            <Navbar />
            <Box>
                <Outlet />
                {children}
            </Box>

        </ThemeProvider>

    )
};

export default Layout;
