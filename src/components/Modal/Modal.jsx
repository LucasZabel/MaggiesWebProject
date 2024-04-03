import './Modal.css';
import React from 'react';
import { useEffect, useState } from 'react';

const Modal = ({ handleAddPromotion, handleAdd, idToShow }) => {

    const [currentPromotion, setCurrentPromotion] = useState("Big Maggie's")
    const currentDay = () => {
        const weekDay = new Date().getDay();
        if (weekDay == 0) { setCurrentPromotion("Big Maggie's") } /*Domingo*/
        else if (weekDay == 1) { setCurrentPromotion("Cheddarzudo") } /*Segunda-Feira*/
        else if (weekDay == 2) { setCurrentPromotion("Maggie's Tasty") } /*Terça-Feira*/
        else if (weekDay == 3) { setCurrentPromotion("Mr. Maggissom") } /*Quarta-Feira*/
        else if (weekDay == 4) { setCurrentPromotion("Red Hot Chicken Pepper") } /*Quinta-Feira*/
        else if (weekDay == 5) { setCurrentPromotion("Big Maggie's") } /*Sexta-Feira*/
        else { setCurrentPromotion("Duplo Maggie's") }; /*Sábado*/
    };
    useEffect(() => {
        currentDay();
    }, []);

    const closeModal = (e) => {
        e.preventDefault();
        document.querySelector("#modal").classList.add("hide");
    };



    return (
        <div id="modal" className='hide'>
            <div className='fade' onClick={closeModal}></div>
            <div className='modal'>
                {idToShow && (idToShow.name === currentPromotion ?
                    <>
                        <div>
                            <h2 className='h2'>{idToShow.name}</h2>
                            <div className="div_separate">
                                <div>
                                    <img className="img" src={`/src/img/${idToShow.img}`} />
                                </div>
                                <div className="div_description">
                                    <p>
                                        <b className="old_price">R${Number(idToShow.price)},00</b><br /> <b className="price">R${Number(idToShow.price - 1)},00</b>
                                        <br />
                                        <br />
                                        {idToShow.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <button className='modal_btn' onClick={() => handleAddPromotion(idToShow)}>Adicionar ao carrinho</button>
                    </>
                    :
                    <>
                        <div>
                            <h2 className='h2'>{idToShow.name}</h2>
                            <div className="div_separate">
                                <div>
                                    <img className="img" src={`/src/img/${idToShow.img}`} />
                                </div>
                                <div className="div_description">
                                    <p>
                                        <b className="price">R${Number(idToShow.price)},00</b>
                                        <br />
                                        <br />
                                        {idToShow.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <button className='modal_btn' onClick={() => handleAdd(idToShow)}>Adicionar ao carrinho</button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Modal;