import React from 'react';
import { Options } from '../../index.d';

interface Props {
    options: Options;
    setOptions: React.Dispatch<React.SetStateAction<Options>>;
    list: Array<number>;
    name: string;
    defaultValue: number;
}

const SelectList: React.FC<Props> = ({
  options, setOptions, list, name, defaultValue,
}) => {
  const handleOnChange: React.ChangeEventHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOptions({
      ...options, [e.target.name]: Number(e.target.value),
    });
  };
  return (
    <select name={name} id={name} onChange={handleOnChange} defaultValue={defaultValue}>
      {
        list.map((item) => <option key={item} value={item}>{item}</option>)
    }
    </select>
  );
};

export default SelectList;
