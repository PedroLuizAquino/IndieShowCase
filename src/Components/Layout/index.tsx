import { Outlet } from 'react-router-dom';
import { Box, ThemeProvider } from '@mui/material';
import { DefaultTheme } from '../../Themes';
import { Navbar } from '../Navbar/Navbar';




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
