import React from 'react';

interface Props {
    setPercentage: Function;
}

const PercentageSelect: React.FC<Props> = ({ setPercentage }) => {
  const handleOnChange: React.ChangeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPercentage(e.target.value);
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
