import React, { useState } from 'react';
import CurrencySelect from './components/CurrencySelect/CurrencySelect';

import './App.scss';

const App: React.FC = () => {
  const [currency, setCurrency] = useState<string>();
  return (
    <div className="app">
      Hello World!
      <CurrencySelect setCurrency={setCurrency} />
      <p>{currency}</p>
    </div>
  );
};

export default App;
