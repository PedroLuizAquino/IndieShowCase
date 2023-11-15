import { Outlet } from 'react-router-dom';
import { Navbar } from '../Navbar/Navbar';



const Layout = ({ children }: { children?: React.ReactNode }) => {


    return (
        <>
            <Navbar />
            <div>
                <Outlet />
                {children}
            </div>

        </>
    )
};

export default Layout;
