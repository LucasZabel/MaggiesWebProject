import "./Menu.css";
import { Link } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { useState } from "react";
import Item from "./components/Item";

const Menu = ({ handleShow, comboState }) => {

    const url = "http://localhost:3000/products";
    const { data: products, loading, error } = useFetch(url);

    const [gourmet, setGourmet] = useState("hide");
    const [tradicional, setTradicional] = useState("hide");
    const [aberto, setAberto] = useState("hide");
    const [combo, setCombo] = useState(comboState);
    const [porcao, setPorcao] = useState("hide");

    const reset = (e) => {
        setGourmet(e);
        setTradicional(e);
        setAberto(e);
        setCombo(e);
        setPorcao(e);
    };


    return (
        <div>
            <div>
                <h3 className="menu_h3">Cardápio</h3>
                <div className="menu_div_btn">
                    <button className="menu_btn" onClick={() => {
                        reset("show")
                    }}>Todos</button>
                    <button className="menu_btn" onClick={() => {
                        reset("hide")
                        setTradicional("show")
                    }}>Tradicionais</button>
                    <button className="menu_btn" onClick={() => {
                        reset("hide")
                        setGourmet("show")
                    }}>Gourmets</button>
                    <button className="menu_btn" onClick={() => {
                        reset("hide")
                        setAberto("show")
                    }}>Aberto</button>
                    <button className="menu_btn" onClick={() => {
                        reset("hide")
                        setCombo("show")
                    }}>Combos</button>
                    <button className="menu_btn" onClick={() => {
                        reset("hide")
                        setPorcao("show")
                    }}>Porções</button>
                </div>
                {error && <p>{error}</p>}
                {loading && <p>Carregando produto...</p>}
                <div className={gourmet}>
                    <h4 className="menu_h4">Gourmets</h4>
                    <Item handleShow={handleShow} type={"gourmet"} />
                </div>
                <div className={tradicional}>
                    <h4 className="menu_h4">Tradicionais</h4>
                    <Item handleShow={handleShow} type={"tradicional"} />
                </div>
                <div className={aberto}>
                    <h4 className="menu_h4">Lanches Abertos</h4>
                    <Item handleShow={handleShow} type={"aberto"} />
                </div>
                <div className={combo}>
                    <h4 className="menu_h4">Combos</h4>
                    <Item handleShow={handleShow} type={"combo"} />
                </div>
                <div className={porcao}>
                    <h4 className="menu_h4">Porções</h4>
                    <Item handleShow={handleShow} type={"porcao"} />
                </div>
            </div>
        </div>
    )
}

export default Menu