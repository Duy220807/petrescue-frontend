import axios from 'axios';
import { useState, useEffect } from 'react';

const useFetchData = (apiUrl) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(apiUrl)
            .then(response => {
                console.log(`API Response from ${apiUrl}:`, response);
                setData(response.data.data);
            })
            .catch(err => {
                console.error(`Error fetching data from ${apiUrl}:`, err);
                setError(err);
            })
            .finally(() => setLoading(false));
    }, [apiUrl]);

    return { data, loading, error };
};

export default useFetchData;
