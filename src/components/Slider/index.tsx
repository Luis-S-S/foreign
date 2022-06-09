import React from 'react';

import { displayNumber } from '../../service/functions';

import { Options } from '../../index.d';

interface Props {
    options: Options;
    setOptions: React.Dispatch<React.SetStateAction<Options>>;
}

const Slider: React.FC<Props> = ({ options, setOptions }) => {
  const sliderFunc: React.ChangeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const step = 50000;
    const { min, max, value } = e.target;
    const minNum: number = Number(min);
    const maxNum: number = Number(max);
    const valueNum: number = Number(value);

    const nextToMinCalc = Math.floor((minNum / step)) + 1;
    const nextToMin = nextToMinCalc * step;
    const prevToMaxCalc = Math.floor((maxNum / step));
    const prevToMax = prevToMaxCalc * step;

    if (valueNum < nextToMin) {
      setOptions({ ...options, reportingSalary: minNum });
    }
    if (nextToMin <= valueNum && valueNum <= prevToMax) {
      const nextToStepCal: number = Math.floor((valueNum / step)) + 1;
      const nextToStep: number = nextToStepCal * step;
      const prevToStepCalc: number = Math.floor((valueNum / step));
      const prevToStep: number = prevToStepCalc * step;

      if ((nextToStep - valueNum) > (valueNum - prevToStep)) {
        setOptions({ ...options, reportingSalary: prevToStep });
      } else {
        setOptions({ ...options, reportingSalary: nextToStep });
      }
    }
    if (valueNum > prevToMax) {
      setOptions({ ...options, reportingSalary: maxNum });
    }
  };
  return (
    <>
      <p>{displayNumber(options.reportingSalary)}</p>
      <input
        id="random"
        max={options.monthlyIncomeCOP}
        min={options.monthlyIncomeCOP * 0.4}
        name="random"
        onChange={sliderFunc}
        defaultValue={options.monthlyIncomeCOP}
        style={{ width: '250px' }}
        type="range"
      />
    </>
  );
};

export default Slider;
