import { Link } from "react-router-dom";
import { useFetch } from "../../../hooks/useFetch";
import "./Promo.css";

//Promoção de Segunda:
const Promotion02 = ({ handleShow }) => {
    const url = "http://localhost:3000/products";
    const { data: product, loading, error } = useFetch(url);
    const name = "Cheddarzudo";

    return (
        <div>
            {error && <p>{error}</p>}
            <div>
                {product &&
                    product.map((item) => (item.name === name ?
                        <div key={item.id} onClick={() => { handleShow(item) }} className="div_link" to={`/menu/${item.id}`}>
                            <h2 className="h2">{item.name}</h2>
                            <div className="div_separate">
                                <div className="div_description">
                                    <p><b className="old_price">R${Number(item.price)},00</b><br /> <b className="price">R${Number(item.price) - 1},00</b></p>
                                </div>
                                <div>
                                    <img className="img" src={`/src/img/${item.img}`} />
                                </div>
                                <div className="div_description">
                                    <p>Clique para ver os ingredientes</p>
                                </div>
                            </div>
                        </div> : undefined
                    ))
                }
            </div>
        </div >
    );
};

export default Promotion02;