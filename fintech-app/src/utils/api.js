import { QueryClient, QueryClientProvider } from 'react-query';
import axios from 'axios';

const queryClient = new QueryClient();

const fetchStockData = async (symbol, yearToFetch) => {
    const apiKey = 'J8XZLA662R3VLAAG' // Reemplaza con tu clave de API de Alpha Vantage
    console.log(`api.js: https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=60min&month=${yearToFetch}-01&outputsize=compact&apikey=${apiKey}`);

    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=60min&month=${yearToFetch}-01&outputsize=compact&apikey=${apiKey}`
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error; // Relanza el error para manejarlo más arriba si es necesario
    }
};

export { queryClient, QueryClientProvider, fetchStockData };
