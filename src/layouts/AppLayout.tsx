import { Link, Outlet } from "react-router-dom"
import Logo from "../components/Logo"
import NavMenu from "../components/NavMenu"
import { ToastContainer } from "react-toastify"
import 'react-toastify/ReactToastify.css'

export default function AppLayout() {
    return (
        <>

            <header className="bg-gray-800 py-5">
                <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-between items-center">
                    <div className="w-64">
                        <Link to={'/'}>
                            <Logo></Logo>
                        </Link>
                    </div>
                    <NavMenu />

                </div>

            </header>
            <section className="max-w-screen-2xl mx-auto mt-10 p-5">
                <Outlet></Outlet>
            </section>

            <footer className="py-5">
                <p className="textCenter">

                </p>
            </footer>

            <ToastContainer />

        </>
    )
}
