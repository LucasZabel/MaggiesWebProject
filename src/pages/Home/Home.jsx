import { useState, useEffect } from "react";
import "./Home.css";
import Promotion01 from "./Promotions/Promotion01";
import Promotion02 from "./Promotions/Promotion02";
import Promotion03 from "./Promotions/Promotion03";
import Promotion04 from "./Promotions/Promotion04";
import Promotion05 from "./Promotions/Promotion05";
import Promotion06 from "./Promotions/Promotion06";
import Promotion07 from "./Promotions/Promotion07";
import Menu from "../Menu/Menu";
import Address from "./Address/Address";

const Home = ({ handleShow }) => {

    const [promotion] = useState([<Promotion01 handleShow={handleShow} />, <Promotion02 handleShow={handleShow} />, <Promotion03 handleShow={handleShow} />, <Promotion04 handleShow={handleShow} />, <Promotion05 handleShow={handleShow} />, <Promotion06 handleShow={handleShow} />, <Promotion07 handleShow={handleShow} />])
    const [currentPromotion, setCurrentPromotion] = useState(promotion[0])
    const currentDay = () => {
        const weekDay = new Date().getDay();
        if (weekDay == 0) { setCurrentPromotion(promotion[0]) } /*Domingo*/
        else if (weekDay == 1) { setCurrentPromotion(promotion[1]) } /*Segunda-Feira*/
        else if (weekDay == 2) { setCurrentPromotion(promotion[2]) } /*Terça-Feira*/
        else if (weekDay == 3) { setCurrentPromotion(promotion[3]) } /*Quarta-Feira*/
        else if (weekDay == 4) { setCurrentPromotion(promotion[4]) } /*Quinta-Feira*/
        else if (weekDay == 5) { setCurrentPromotion(promotion[5]) } /*Sexta-Feira*/
        else { setCurrentPromotion(promotion[6]) }; /*Sábado*/
    };
    useEffect(() => {
        currentDay();
    }, []);

    return (
        <div className="div_home">
            <div className="div_promotion">
                <h3 className="home_h3">Lanche do dia:</h3>
                <p className="home_p">Cada dia um sabor diferente!</p>
                {currentPromotion}
            </div>
            <Address />
            <Menu handleShow={handleShow} comboState={"hide"} />
        </div>
    );
};

export default Home;