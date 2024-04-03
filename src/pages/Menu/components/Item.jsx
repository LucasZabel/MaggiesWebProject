import "../Menu.css";
import { useFetch } from "../../../hooks/useFetch";
import { useEffect } from "react";

const Item = ({ handleShow, type }) => {

    const url = "http://localhost:3000/products";
    const { data: products } = useFetch(url);


    useEffect(() => {
        return
    }, [products])


    return (
        <div className="menu_items">
            {products && products.map((item) => (item.type.toUpperCase() === type.toUpperCase() ?
                <div key={item.id} onClick={() => { handleShow(item) }} className="menu_box">
                    <div className="menu_div">
                        <div>
                            <img className="menu_img" src={`/src/img/${item.img}`} />
                        </div>
                        <div>

                        </div>
                        <div className="menu_div_description">
                            <h3>
                                {item.name}
                            </h3>
                            <p>
                                <b className="menu_price">
                                    R${item.price},00
                                </b>
                            </p>
                            <p>
                                Clique aqui para ver os ingredientes
                            </p>
                        </div>
                    </div>
                </div>
                : undefined))}
        </div>
    );
};

export default Item;