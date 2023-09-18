import React, { useState } from 'react';
import { calcularInversion } from '../utils/calculations';
import MyChartComponent  from './MyChartComponent'; 

function Calculator() {
  const [amount, setAmount] = useState(0); // Inicializa amount como un número entero (0)
  const [years, setYears] = useState(1);  // Inicializa years como un número entero (1)
  const [investmentData, setInvestmentData] = useState([{}, {}, {}]);
  const [errorVisible, setErrorVisible] = useState(false);
  const [calculationComplete, setCalculationComplete] = useState(false);

  async function handleCalculateAsync() {
    try {
      const amountValue = parseFloat(amount);
      const yearsValue = parseFloat(years);
  
      if (isNaN(amountValue) || isNaN(yearsValue) || amountValue <= 0) {
        setErrorVisible(true); // Mostrar el mensaje de error
        return;
      }
  
      // Restablecer el estado de error
      setErrorVisible(false);
  
      //console.log('a la función calcularInversion va esto:', amountValue, yearsValue);
      const investmentData = await calcularInversion(amountValue, yearsValue);
      setInvestmentData(investmentData);
      //console.log('le pasé a investmentData esto:', investmentData);
      setCalculationComplete(true);
      
      return;
    } catch (error) {
      console.error('Error al calcular la inversión:', error);
      throw error;
    }
  }
  let newAmount = 0
      for (let i = 0; i < investmentData.length; i++) {
          console.log("newamount: ", amount, investmentData.length, investmentData[i].yield)
          newAmount = newAmount + ((amount/investmentData.length) * (investmentData[i].yield / 100)) 
      }
  const chartData = {
    labels: [investmentData[0].yearStart, new Date().getFullYear()], // Etiquetas de los ejes X
    datasets: [
      {
        label: 'Posible Inversion',
        data: [amount, newAmount],
      },
      // Agrega más conjuntos de datos según tus necesidades
    ],
  };
  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-semibold mb-4">Simulador de Inversión</h1>
      <div className="flex space-x-4">
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
            Cantidad de dinero invertido (en USD):  
          </label>
          <input
            type="number"
            id="amount"
            placeholder="Ingrese la cantidad"
            className="border p-2"
            value={amount}
            onChange={(e) => {
              const newValue = parseFloat(e.target.value);
              if (!isNaN(newValue) && newValue > 0) {
                setAmount(newValue);
              }
            }}
          />
          {errorVisible && (
            <p className="text-danger">La cantidad ingresada debe ser mayor que 0.</p>
          )}
        </div>
        <div>
          <label htmlFor="years" className="block text-sm font-medium text-gray-700">
            Si hubiera invertido hace:
          </label>
          <select
            id="years"
            className="border p-2"
            value={years}
            onChange={(e) => setYears(e.target.value)}
          >
            <option value="1">1 año</option>
            <option value="2">2 años</option>
            <option value="3">3 años</option>
            <option value="4">4 años</option>
            <option value="5">5 años</option>
            <option value="6">6 años</option>
            <option value="7">7 años</option>
            <option value="8">8 años</option>
            <option value="9">9 años</option>
            <option value="10">10 años</option>
            <option value="11">11 años</option>
            <option value="12">12 años</option>
            <option value="13">13 años</option>
            <option value="14">14 años</option>
            <option value="15">15 años</option>
            <option value="16">16 años</option>
            <option value="17">17 años</option>
            <option value="18">18 años</option>
            <option value="19">19 años</option>
            <option value="20">20 años</option>
          </select>
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleCalculateAsync}>
          Calcular
          </button>
      </div>
      {calculationComplete && (
        <>
          {investmentData.map((data, index) => (
            <div key={index}>
              <h2 className="text-xl font-semibold mt-6">Datos de Inversión - {data.symbol}</h2>
              <table className="border-collapse w-full border">
                <thead>
                  <tr>
                    <th className="py-2 px-4 bg-gray-200 text-center border">Precio año {data.yearStart}</th>
                    <th className="py-2 px-4 bg-gray-200 text-center border">Precio actual</th>
                    <th className="py-2 px-4 bg-gray-200 text-center border">Cantidad de Tokens ETF</th>
                    <th className="py-2 px-4 bg-gray-200 text-center border">Rendimiento (%)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2 px-4 text-center border">{data.closePricesStart}</td>
                    <td className="py-2 px-4 text-center border">{data.closePricesEnd}</td>
                    <td className="py-2 px-4 text-center border">{data.ETFAmount}</td>
                    <td className="py-2 px-4 text-center border">{data.yield}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
        </>
      )}

      <div className="container">
        <div className="card">
          {calculationComplete && (
            <MyChartComponent data={chartData} />
          )}
        </div>
      </div>


    </div>
  );
}

export default Calculator;
