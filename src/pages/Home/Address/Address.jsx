
const Address = () => {

    const redirectToGoogleMaps = () => {
        window.location.href = 'https://maps.app.goo.gl/Zhh9wkKD3yZEVVYZ9';
    };

    return (
        <div className="address">
            <div className="address_info">
                <h2><i className="bi bi-geo-alt-fill"></i> Onde Estamos?</h2>
                <p>Rua Olinda Heffelmann, 54 - Lageado Baixo, Guabiruba - SC </p>
                <p> 8360-000, Brasil</p>
                <button onClick={redirectToGoogleMaps}>Google Maps</button>
            </div>
        </div>
    );
};

export default Address;