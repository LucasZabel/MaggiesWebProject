import './AdmModal.css';
import React from 'react';
import { useFetch } from '../../../hooks/useFetch';
import { useState, useEffect } from 'react';

const AdmModal = ({ idToShowAdm }) => {

    const url = "http://localhost:3000/products";
    const { data: items, httpConfig, loading, error } = useFetch(url);

    const [id, setId] = useState("")
    const [name, setName] = useState("");
    const [img, setImg] = useState("");
    const [price, setPrice] = useState("");
    const [type, setType] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        if (idToShowAdm) {
            setId(idToShowAdm.id)
            setName(idToShowAdm.name);
            setImg(idToShowAdm.img);
            setPrice(idToShowAdm.price);
            setType(idToShowAdm.type);
            setDescription(idToShowAdm.description);
        }
    }, [idToShowAdm]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const product = {
            id,
            name,
            img,
            price,
            type,
            description,
        };

        httpConfig(product, "PUT");

    };

    const closeModal = (e) => {
        e.preventDefault();
        document.querySelector("#adm_modal").classList.add("hide");
    };


    return (
        <div id="adm_modal" className='hide'>
            <div className='fade' onClick={closeModal}></div>
            <div className='modal'>
                {idToShowAdm && (
                    <>
                        <div className="formulary">
                            <h2>Editar item: {idToShowAdm.name}</h2>
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
                                        placeholder="Ex: 28"
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
                                {loading && (
                                    <div className="btn">
                                        <input className="btn" type="submit" value="Aguarde" disabled />
                                    </div>
                                )}
                                {!loading && (
                                    <div className="btn">
                                        <input className="btn" type="submit" value="Atualizar" />
                                    </div>
                                )}
                            </form>
                        </div>
                        {/* 
                        <div>
                            <h2 className='h2'>{idToShowAdm.name}</h2>
                            <div className="div_separate">
                                <div>
                                    <img className="img" src={`/src/img/${idToShowAdm.img}`} />
                                </div>
                                <div className="div_description">
                                    <p>
                                        <b className="old_price">R${Number(idToShowAdm.price)},00</b><br /> <b className="price">R${Number(idToShowAdm.price - 1)},00</b>
                                        <br />
                                        <br />
                                        {idToShowAdm.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <button className='modal_btn' onClick={() => handleAddPromotion(idToShowAdm)}>Adicionar ao carrinho</button> */}
                    </>
                )}
            </div>
        </div>
    );
};

export default AdmModal;