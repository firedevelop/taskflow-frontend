import { Link, Navigate, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Logo from "../components/Logo";
import NavMenu from "../components/NavMenu";
import { useAuth } from "../hooks/useAuth";

const AppLayout = () => {
    const {data, isError, isLoading} = useAuth();
    if(isLoading) return '';

    if(isError) {
        return <Navigate to='/auth/login'/>
    }

    if(data) return (
        <>
            <header className="bg-gray-800 py-5">
                <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-between items-center">
                    {/* Logotipo */}
                    <Link to="/" className="w-64">
                        <Logo />
                    </Link>

                    {/* Menú */}
                    <NavMenu 
                        data={data}
                    />
                </div>
            </header>

            <main className="max-w-screen-2xl mx-auto mt-10 p-5">
                <Outlet />
            </main>

            <footer className="py-5">
                <p className="text-center">
                    Todos los derechos reservados. Gonzalo Sanz Rubio &copy;{new Date().getFullYear()}
                </p>
            </footer>

            <ToastContainer 
                pauseOnHover={false}
                pauseOnFocusLoss={false}
            />
        </>
    )
}

export default AppLayout;