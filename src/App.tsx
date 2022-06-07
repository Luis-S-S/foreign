import React, { useState } from 'react';
import CurrencySelect from './components/CurrencySelect/CurrencySelect';
import PercentageSelect from './components/PercentageSelect/PercentageSelect';

import './App.scss';

const App: React.FC = () => {
  const [currency, setCurrency] = useState<string>('USD');
  const [percentage, setPercentage] = useState<string>('max');
  return (
    <div className="app">
      Hello World!
      <CurrencySelect setCurrency={setCurrency} />
      <PercentageSelect setPercentage={setPercentage} />
      <p>{currency}</p>
      <p>{percentage}</p>
    </div>
  );
};

export default App;
