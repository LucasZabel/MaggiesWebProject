import { useState } from "react";
import "./Admin.css";
import { useFetch } from "../../hooks/useFetch";
import AdmModal from "./components/AdmModal";

const Admin = ({ handleShowAdm, idToShowAdm }) => {

    const url = "http://localhost:3000/products";
    const { data: items, httpConfig, loading, error } = useFetch(url);

    const [name, setName] = useState("");
    const [img, setImg] = useState("");
    const [price, setPrice] = useState("");
    const [type, setType] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const product = {
            name,
            img,
            price,
            type,
            description,
        };

        httpConfig(product, "POST");

        setName("");
        setImg("");
        setPrice("");
        setType("");
        setDescription("");
    };

    const handleDelete = (id) => {
        httpConfig(id, "DELETE");
    };

    return (
        <div>
            <AdmModal idToShowAdm={idToShowAdm} />
            <div className="formulary border_bottom">
                <h2>Adicionar novo item:</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        <span>Nome:</span><br />
                        <input type="text"
                            value={name}
                            name='name'
                            placeholder="Ex: Big Maggie's"
                            required
                            onChange={(e) => setName(e.target.value)} />
                    </label>
                    <label>
                        <span>Imagem:</span><br />
                        <input type="text"
                            value={img}
                            name='img'
                            placeholder="Ex: big_maggies.webp"
                            required
                            onChange={(e) => setImg(e.target.value)} />
                    </label>
                    <label>
                        <span>Price: R$</span><br />
                        <input type="number"
                            value={price}
                            name='price'
                            placeholder="Ex: 26"
                            required
                            onChange={(e) => setPrice(e.target.value)} />
                    </label>
                    <label>
                        <span>Tipo:</span><br />
                        <input type="text"
                            value={type}
                            name='type'
                            placeholder="Ex: gourmet"
                            required
                            onChange={(e) => setType(e.target.value)} />
                    </label>
                    <label>
                        <span>Ingredientes:</span><br />
                        <input type="text"
                            value={description}
                            name='description'
                            placeholder="Ex: Pão, Hamburguer 160g"
                            required
                            onChange={(e) => setDescription(e.target.value)} />
                    </label>
                    {/* Bloquando o button enquanto está POSTANDO */}
                    {loading && <input className="btn" type="submit" disabled value="Aguarde" />}
                    {!loading && (
                        <div className="btn">
                            <input className="btn" type="submit" value="Criar" />
                        </div>
                    )}
                </form>
            </div >
            <div className="list">
                <>
                    <h2>Lista de Produtos</h2>
                    <ul>
                        {/* items && é para que só seja chamado se existir objetos, assim ele nao via chamar o mapeamento enquanto a resposta for null */}
                        {items && items
                            .map((product) => (
                                <div key={product.id}>
                                    <p><b>{product.name}</b></p>
                                    <div key={product.id} className="admin_item_list">
                                        <div className="admin_div">
                                            <div className="admin_div_img">
                                                <img className="admin_img" src={`/src/img/${product.img}`} />
                                                <div>
                                                    "{product.img}""
                                                </div>
                                            </div>
                                        </div>
                                        <div className="admin_div_P_T">
                                            <div className="admin_div">
                                                R${product.price},00
                                            </div>
                                            <div className="admin_div">
                                                {product.type}
                                            </div>
                                        </div>
                                        <div className="admin_description admin_div">
                                            {product.description}
                                        </div>
                                        <div>
                                            <div className="btn">
                                                <input className="btn" type="submit" onClick={() => handleShowAdm(product)} value="Editar" />
                                            </div>
                                            <div className="btn_red">
                                                <input className="btn_red" type="submit" onClick={() => handleDelete(product.id)} value="Excluir" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </ul>
                </>
            </div>
        </div >
    );
};

export default Admin;