import { Chart } from 'chart.js/auto';
import { useEffect, useRef } from 'react';

function MyChartComponent({ data }) {
  const chartRef = useRef(null);

  useEffect(() => {
    // Si el gráfico anterior existe, destrúyelo antes de crear uno nuevo
    if (chartRef.current) {
      chartRef.current.destroy();
    }
    /*
    // Crea un nuevo gráfico en el lienzo con ID 'myChart'
    chartRef.current = new Chart('myChart', {
      type: 'bar', // Tipo de gráfico (puedes cambiarlo según tus necesidades)
      data: data,
    });
    */

    // Crea un nuevo gráfico en el lienzo con ID 'myChart'
    chartRef.current = new Chart('myChart', {
      type: 'line', // Cambia el tipo de gráfico a 'line' para una gráfica de línea
      data: data,
      options: {
        responsive: true, // Asegura que el gráfico sea responsive
        scales: {
          x: {
            type: 'linear', // Usa una escala lineal para el eje X
          },
          y: {
            beginAtZero: true, // Comienza el eje Y en cero
          },
        },
      },
    });


    // Importante: devuelve una función de limpieza para destruir el gráfico al desmontar el componente
    return () => {
      chartRef.current.destroy();
    };
  }, [data]);

  return <canvas id="myChart" width="25" height="25"></canvas>;
}

export default MyChartComponent;
