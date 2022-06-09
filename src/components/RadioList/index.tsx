import React from 'react';

import { Options, RadioList } from '../../index.d';

import './RadioList.scss';

interface Props {
  options: Options;
  setOptions: React.Dispatch<React.SetStateAction<Options>>;
  name: string
  list: RadioList;
}

const RadioInput: React.FC<Props> = ({
  options, setOptions, name, list,
}) => {
  const handleOnChange: React.ChangeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOptions({
      ...options, [e.target.name]: e.target.value,
    });
  };
  return (
    <div className="radio-list__container">
      {
        list.map((item) => (
          <label key={item.value} htmlFor={name}>
            <input type="radio" name={name} value={item.value} onChange={handleOnChange} defaultChecked={item.defaultChecked} />
            {item.label}
          </label>
        ))
      }
    </div>
  );
};

export default RadioInput;
