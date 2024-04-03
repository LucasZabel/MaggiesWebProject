import { useState } from 'react';
import { useAuthValue } from '../../context/AuthContext';
import { useAuthentication } from '../../hooks/useAuthentication';
import './NavBar.css';
import { NavLink } from "react-router-dom";

const NavBar = ({ showCart }) => {

    const { user } = useAuthValue();
    const { logout } = useAuthentication();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const redirectToInstagram = () => {
        window.location.href = 'https://www.instagram.com/maggieslanches/';
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleCart = () => {
        showCart();
        toggleMenu();
    };

    const handleLogout = () => {
        toggleMenu(); // Fechar o menu ao fazer logout
        logout();
    };

    return (
        <nav className='space'>
            <div className='topbar'>
                <button className='btn_topbar' onClick={redirectToInstagram}>
                    <i className="bi bi-instagram"></i>
                </button>
            </div>
            <div className='navbar'>
                <NavLink to="/">
                    <img className="logo_img" src={"/src/img/logo.webp"} />
                </NavLink>
                <div className={`menu-icon ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
                    <div className="menu-line"></div>
                    <div className="menu-line"></div>
                    <div className="menu-line"></div>
                </div>
                <div className={`div_navbar ${isMenuOpen ? 'open' : ''}`}>
                    <NavLink onClick={toggleMenu} className={({ isActive }) => (isActive ? "button active" : "button")} to="/">
                        <i className="bi bi-house"></i> Início
                    </NavLink>
                    <NavLink onClick={toggleMenu} className={({ isActive }) => (isActive ? "button active" : "button")} to="/menu">
                        <i className="bi bi-card-list"></i> Cardápio
                    </NavLink>
                    {!user && (
                        <>
                            <NavLink onClick={toggleMenu} className={({ isActive }) => (isActive ? "button active" : "button")} to="/login">
                                <i className="bi bi-file-earmark-person"></i> Login
                            </NavLink>
                            <NavLink onClick={toggleMenu} className={({ isActive }) => (isActive ? "button active" : "button")} to="/register">
                                <i className="bi bi-file-earmark-person"></i> Registrar
                            </NavLink>
                        </>
                    )}
                    <button className='button' onClick={() => handleCart()}                    >
                        <i className="bi bi-cart3"></i> Carrinho
                    </button>
                    {user && (
                        <>
                            <NavLink onClick={toggleMenu} className={({ isActive }) => (isActive ? "button active" : "button")} to="/admin">
                                <i className="bi bi-file-earmark-person"></i> Admin
                            </NavLink>
                            <button className='button' onClick={handleLogout}>
                                <i className="bi bi-box-arrow-right"></i> Sair
                            </button>
                        </>
                    )}
                </div>
            </div>
        </nav >
    );
};

export default NavBar;