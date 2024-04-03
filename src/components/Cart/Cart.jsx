import { useEffect, useState } from "react";
import "./Cart.css";

const Cart = ({ itensOnCart, onRemoveFromCart, onUpdateQuantity }) => {

    const closeCart = (e) => {
        e?.preventDefault();
        document.querySelector("#cart").classList.add("hide");
    };
    const totalPrice = (cart) => {
        let total = 0;
        cart.forEach(item => {
            total += item.price * item.quantity;
        });
        return total;
    };
    const total = totalPrice(itensOnCart);

    useEffect(() => {
        closeCart();
    }, []);

    return (
        <div id="cart">
            <div className='fade' onClick={closeCart}></div>
            <div className='cart'>
                <h2>Carrinho</h2>
                <button className="close_cart" onClick={closeCart}>Fechar carrinho</button>
                {itensOnCart && itensOnCart.map((item) => (
                    <div key={item.product.id} className="cart_item_div">
                        <div>
                            <img className="cart_img" src={`/src/img/${item.product.img}`} />
                        </div>
                        <div>
                            <p>Produto:</p>
                            <p>{item.product.name}</p>
                        </div>
                        <div>
                            <p>Preço unitário:</p>
                            <p>R${item.price},00</p>
                        </div>
                        <div>
                            <p>Quandidade:</p>
                            <p>{item.quantity}</p>
                        </div>
                        <div className="cart_button_div">
                            <button className="cart_button" onClick={() => onUpdateQuantity(item, item.quantity + 1)}><i className="bi bi-plus-circle"></i></button>
                            <button className="cart_button" onClick={() => onUpdateQuantity(item, item.quantity - 1)}><i className="bi bi-dash-circle"></i></button>
                            <button className="cart_button" onClick={() => onRemoveFromCart(item)}><i className="bi bi-trash"></i></button>
                        </div>
                    </div>
                ))}
                <div>
                    <h3>Valor total: R${total},00</h3>
                </div>
            </div>
        </div >
    );
};

export default Cart;