import React from 'react';
import { QueryClientProvider, queryClient } from './utils/api'; // Importa QueryClientProvider y queryClient
import Calculator from './components/Calculator.js';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Calculator />
      </div>
    </QueryClientProvider>
  );
}

export default App;
