import { useEffect, useState } from "react";

export const useFetch = (url) => {

    const [data, setData] = useState(null);
    const [config, setConfig] = useState(null);
    const [method, setMethod] = useState(null);
    const [callFetch, setCallFetch] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [itemId, setItemId] = useState(null);
    const [newData, setNewData] = useState(null);



    //______________________________// Call dos dados: //__________________________________//


    useEffect(() => {
        const fetchData = async () => {

            setLoading(true);

            try {

                const res = await fetch(url);
                const json = await res.json();

                setData(json);
                setMethod(null);
                setError(null);

            } catch (error) {

                console.log(error.message);
                setError("Houve um erro ao carregar os dados!");

            };

            setLoading(false);

        };

        fetchData();

    }, [url, callFetch]);


    //______________________________// Function POST / DELETE: //__________________________________//


    const httpConfig = (data, method) => {

        if (method === "POST") {

            setConfig({
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            setMethod("POST");

        } else if (method === "DELETE") {

            setConfig({
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            setMethod("DELETE");
            setItemId(data);

        } else if (method === "PUT") {


            setConfig({
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            setMethod("PUT");
            setNewData(data);

        };

    };


    useEffect(() => {
        const httpRequest = async () => {
            if (method === "POST") {

                setLoading(true);

                let fetchOptions = [url, config];
                const res = await fetch(...fetchOptions);
                const json = await res.json();

                setCallFetch(json);

            } else if (method === "DELETE") {

                const deleteUrl = `${url}/${itemId}`;
                const res = await fetch(deleteUrl, config);
                const json = await res.json();

                setCallFetch(json);

            } else if (method === "PUT") {

                const toUpdateUrl = `${url}/${newData.id}`;
                const res = await fetch(toUpdateUrl, config);
                const updatedItem = await res.json();
                setData(data.map(item => item.id === updatedItem.id ? updatedItem : item));

                setCallFetch(updatedItem);

            };
        };

        httpRequest();

    }, [config]);


    //______________________________// Retorno: //__________________________________//


    return { data, httpConfig, loading, error };
};