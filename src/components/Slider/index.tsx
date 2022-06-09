/* eslint-disable max-len */
import React from 'react';

import {
  displayNumber, calculateMaxReport, nextMultipleFrom, prevMultipleFrom,
} from '../../service/functions';

import { Options, Bases } from '../../index.d';

interface Props {
    name: string
    bases: Bases;
    options: Options;
    setOptions: React.Dispatch<React.SetStateAction<Options>>;
}

const Slider: React.FC<Props> = ({
  name, bases, options, setOptions,
}) => {
  const [sliderMax, setSliderMax] = React.useState<number>(0);
  const refIncomeValue = React.useRef<number>(options.income);

  const handlerOnChange: React.ChangeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const step = 50000;
    const { min, max, value } = e.target;
    const minNum: number = Number(min);
    const maxNum: number = Number(max);
    const valueNum: number = Number(value);

    const nextToMin = nextMultipleFrom(minNum, step);
    const prevToMax = prevMultipleFrom(maxNum, step);

    if (valueNum < nextToMin) {
      setOptions({ ...options, [e.target.name]: minNum });
    }
    if (nextToMin <= valueNum && valueNum <= prevToMax) {
      const nextToStep: number = nextMultipleFrom(valueNum, step);
      const prevToStep: number = prevMultipleFrom(valueNum, step);

      if ((nextToStep - valueNum) > (valueNum - prevToStep)) {
        setOptions({ ...options, [e.target.name]: prevToStep });
      } else {
        setOptions({ ...options, [e.target.name]: nextToStep });
      }
    }
    if (valueNum > prevToMax) {
      setOptions({ ...options, [e.target.name]: maxNum });
    }
  };

  React.useEffect(() => {
    const sliderMaxValue: number = calculateMaxReport(bases, options);
    setSliderMax(sliderMaxValue);

    if (refIncomeValue.current !== options.income) {
      refIncomeValue.current = options.income;
      setOptions({ ...options, reportingSalary: sliderMaxValue });
    }
  }, [options]);

  return (
    <>
      <p>{displayNumber(options.reportingSalary)}</p>
      <input
        id={name}
        max={sliderMax}
        min={options.monthlyIncomeCOP * 0.4}
        name={name}
        onChange={handlerOnChange}
        style={{ width: '250px' }}
        type="range"
      />
    </>
  );
};

export default Slider;
