import React from 'react';

import { Options } from '../../index.d';

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
    <section>
      <h3>Select percentage for fiscal payments (Health, Pension, etc)</h3>
      <input type="radio" name="percentage" value="40" onChange={handleOnChange} />
      <input type="radio" name="percentage" value="50" onChange={handleOnChange} />
      <input type="radio" name="percentage" value="60" onChange={handleOnChange} />
      <input type="radio" name="percentage" value="max" onChange={handleOnChange} />
    </section>
  );
};

export default PercentageSelect;
