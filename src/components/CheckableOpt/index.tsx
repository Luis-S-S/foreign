import React from 'react';
import { Options } from '../../index.d';

interface Props {
  options: Options;
  setOptions: React.Dispatch<React.SetStateAction<Options>>;
  name: string;
  text: string;
}

const CheckableOpt: React.FC<Props> = ({
  options, setOptions, name, text,
}) => {
  const handlerOnChecked: React.ChangeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOptions({
      ...options,
      [e.target.name]: e.target.checked,
    });
  };
  return (
    <label htmlFor="random">
      {`${text} `}
      <input type="checkbox" name={name} id={name} defaultChecked onChange={handlerOnChecked} />
    </label>

  );
};

export default CheckableOpt;
