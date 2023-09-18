import financialData from '../models/financialData';
import { fetchStockData } from './api'; // Importa la función de consulta de la API

async function calcularInversion(amount, years) {
    //const symbols = ["SPY", "QQQ", "MDY"];
    const symbols = ["SPY", "QQQ"];
    const thisYear = new Date().getFullYear()
    const listaFinancialData = [
        { ...financialData },
        { ...financialData },
        { ...financialData }
      ];
    // Recorre cada año y símbolo y realiza la consulta
    for (let i = 0; i < symbols.length; i++) {
        listaFinancialData[i].symbol = symbols[i]
        try {
            // Inversion año inicial
            listaFinancialData[i].yearStart = thisYear - years
            let data  = await fetchStockData(symbols[i], (thisYear - years));
            listaFinancialData[i].closePricesStart = data['Time Series (60min)'][Object.keys(data['Time Series (60min)'])[0]]['4. close']
            listaFinancialData[i].ETFAmount = ((amount/symbols.length)/listaFinancialData[i].closePricesStart)
            
            // Inversion en año actual
            listaFinancialData[i].yearEnd = thisYear
            data  = await fetchStockData(symbols[i], (thisYear));
            listaFinancialData[i].closePricesEnd = data['Time Series (60min)'][Object.keys(data['Time Series (60min)'])[0]]['4. close']

            listaFinancialData[i].yield = ((listaFinancialData[i].closePricesEnd - listaFinancialData[i].closePricesStart) / listaFinancialData[i].closePricesStart) * 100;
        } catch (error) {
            console.error(`Error en la consulta para ${symbols[i]}`, error);
        }
    }
  return listaFinancialData;
}

export { calcularInversion };
