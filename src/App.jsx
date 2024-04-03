// CSS:
import "./App.css";
// Hooks:
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthentication } from "./hooks/useAuthentication";
import { AuthProvider } from "./context/AuthContext";
import { onAuthStateChanged } from 'firebase/auth';
// Pages:
import Home from "./pages/Home/Home";
import Menu from "./pages/Menu/Menu";
import About from "./pages/About/About";
import Admin from "./pages/Admin/Admin";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
//Components:
import NavBar from "./components/NavBar/NavBar";
import Modal from "./components/Modal/Modal";
import Cart from "./components/Cart/Cart";
import Footer from "./components/Footer/Footer";

function App() {

  const [user, setUser] = useState(undefined);
  const [cart, setCart] = useState([]);
  const [itemToShow, setItemToShow] = useState(null);
  const [itemToShowAdmCart, setItemToShowAdmCart] = useState(null);

  const { auth } = useAuthentication();
  const loadingUser = (user === undefined);

  const hideOrShowModal = (display) => {
    const modal = document.querySelector('#modal');
    if (display) {
      modal?.classList.remove("hide");
    } else {
      modal?.classList.add("hide");
    };
  };

  const hideOrShowCart = (display) => {
    const cart = document.querySelector('#cart');
    if (display) {
      cart?.classList.remove("hide");
    } else {
      cart?.classList.add("hide");
    };
  };

  const hideOrShowAdmModal = (display) => {
    const cart = document.querySelector('#adm_modal');
    if (display) {
      cart?.classList.remove("hide");
    } else {
      cart?.classList.add("hide");
    };
  };

  const showModalItem = (item) => {
    hideOrShowModal(true);
    setItemToShow(item);
  };

  const showCart = () => {
    hideOrShowCart(true);
  };

  const showAdmModal = (item) => {
    hideOrShowAdmModal(true);
    setItemToShowAdmCart(item);
  };

  const addToCart = (itemToAdd) => {
    const existingItemIndex = cart.findIndex(item => item.product.id === itemToAdd.id);
    if (existingItemIndex !== -1) {
      const updatedCartItems = [...cart];
      updatedCartItems[existingItemIndex].quantity++;
      setCart(updatedCartItems);
    } else {
      setCart([...cart, { product: itemToAdd, price: itemToAdd.price, quantity: 1 }]);
    };
  };

  const addToCartPromotion = (itemToAdd) => {
    const existingItemIndex = cart.findIndex(item => item.product.id === itemToAdd.id);
    if (existingItemIndex !== -1) {
      const updatedCartItems = [...cart];
      updatedCartItems[existingItemIndex].quantity++;
      setCart(updatedCartItems);
    } else {
      setCart([...cart, { product: itemToAdd, price: itemToAdd.price - 1, quantity: 1 }]);
    };
  };

  const removeFromCart = (itemToRemove) => {
    const updatedCartItems = cart.filter(item => item.product.id !== itemToRemove.product.id);
    setCart(updatedCartItems);
  };

  const updateQuantity = (itemToUpdate, newQuantity) => {
    const updatedCart = cart.map(item => {
      if (item.product.id === itemToUpdate.product.id) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCart(updatedCart);
  };
  useEffect(() => {
    hideOrShowCart(false);
    hideOrShowModal(false);
    hideOrShowAdmModal(false);
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user)
    })
  }, [auth]);

  if (loadingUser) {
    return <p>Carregando...</p>
  };

  return (
    <>
      <AuthProvider value={{ user }}>
        <BrowserRouter>
          <Modal handleAdd={addToCart} handleAddPromotion={addToCartPromotion} idToShow={itemToShow} />
          <Cart itensOnCart={cart} onRemoveFromCart={removeFromCart} onUpdateQuantity={updateQuantity} />
          <NavBar showCart={showCart} />
          <Routes>
            <Route path="/" element={<Home handleShow={showModalItem} />} />
            <Route path="/menu?" element={<Menu handleShow={showModalItem} comboState={"show"} />} />
            <Route path="/about" element={<About />} />
            <Route path="/admin" element={<Admin handleShowAdm={showAdmModal} idToShowAdm={itemToShowAdmCart} />} />
            <Route path='/login' element={!user ? <Login /> : <Navigate to='/' />} />
            <Route path='/register' element={!user ? <Register /> : <Navigate to='/' />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </>
  );
};

export default App;
