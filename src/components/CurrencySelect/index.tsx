import React, { useState } from 'react';
import './CurrencySelect.scss';

import { Currency } from '../../index.d';
import data from '../../service/data.json';

interface Props {
    setCurrency: Function;
}

const CurrencySelect: React.FC<Props> = ({ setCurrency }) => {
  const [currencyArray] = useState<Array<Currency>>(data.currencyArray);

  const handleChange: React.ChangeEventHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrency(e.target.value);
  };

  return (
    <section>
      <p className="text--subtitle">Select currency</p>
      <select className="select__currency text--body" onChange={handleChange} defaultValue="USD">
        {
        currencyArray.map((currency: Currency) => (
          <option className="text--body" key={currency.code} value={currency.code}>
            {`${currency.code}: ${currency.name}`}
          </option>
        ))
      }
      </select>
    </section>
  );
};

export default CurrencySelect;
