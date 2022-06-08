import React from 'react';

import { Options } from '../../index.d';

import './PercentageSelect.scss';

interface Props {
  options: Options;
  setOptions: React.Dispatch<React.SetStateAction<Options>>;
}

const PercentageSelect: React.FC<Props> = ({ options, setOptions }) => {
  const handleOnChange: React.ChangeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOptions({
      ...options, [e.target.name]: e.target.value,
    });
  };
  return (
    <div className="chart__percentage-select">
      <h3>Parafiscales</h3>
      <label htmlFor="percentage">
        <input type="radio" name="percentage" value="40" onChange={handleOnChange} />
        40%
      </label>
      <label htmlFor="percentage">
        <input type="radio" name="percentage" value="50" onChange={handleOnChange} />
        50%
      </label>
      <label htmlFor="percentage">
        <input type="radio" name="percentage" value="60" onChange={handleOnChange} />
        60%
      </label>
      <label htmlFor="percentage">
        <input type="radio" name="percentage" value="max" onChange={handleOnChange} defaultChecked />
        Max
      </label>
    </div>
  );
};

export default PercentageSelect;
