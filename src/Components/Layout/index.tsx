import { Outlet } from 'react-router-dom';
import { Navbar } from '../Navbar/Navbar';
import { ThemeProvider } from '@mui/material';
import { DefaultTheme } from '../../Themes';




const Layout = ({ children }: { children?: React.ReactNode }) => {


    return (
        <ThemeProvider theme={DefaultTheme}>
            <Navbar />
            <div>
                <Outlet />
                {children}
            </div>

        </ThemeProvider>

    )
};

export default Layout;
