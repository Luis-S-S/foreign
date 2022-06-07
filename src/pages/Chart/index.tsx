import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import PercentageSelect from '../../components/PercentageSelect';

import './Chart.scss';

interface Bases {
  minWage: number;
  transportationAllowance: number;
  comprehensiveWage?: number;
  pensionBreakpoint?: number;
  health: number;
  pension: number;
  familiarCompensation: number;
  cesantias: number,
  interestCesantias: number;
  prima: number;
  vacations: number;
  arl_1: number;
  arl_2: number;
  arl_3: number;
  arl_4: number;
  arl_5: number;
}

const Chart: React.FC = () => {
  const { currency } = useParams();
  const [income] = useState(0);
  const [, setPercentage] = useState<string>('max');
  const bases: Bases = {
    minWage: 1000000,
    transportationAllowance: 117172,
    health: 12.5,
    pension: 16,
    familiarCompensation: 4,
    cesantias: 8.33,
    interestCesantias: 1,
    prima: 8.33,
    vacations: 4.17,
    arl_1: 0.522,
    arl_2: 1.044,
    arl_3: 2.436,
    arl_4: 4.350,
    arl_5: 6.960,
  };
  bases.comprehensiveWage = bases.minWage * 13;
  bases.pensionBreakpoint = bases.minWage * 4;

  const handleOnChange: React.ChangeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Array.from<string>(e.target.value);
    // const valueNum: number = e.target.value
    //   ? parseFloat(parseFloat(e.target.value).toFixed(2))
    //   : 0;
    console.log(e.target.value);
    // setIncome(valueNum);
  };

  useEffect(() => {
    if (currency !== 'COP') {
      console.log('fetching data');
    }
  }, []);

  return (
    <main className="chart-page">
      <Link className="link--default" to="/">Back to home</Link>
      <section>
        <p>{`Currency: ${currency}`}</p>
        <p>{`Conversion rate: ${income}`}</p>
        <label htmlFor="income">
          Income:
          <input type="number" name="income" id="income" step="0.01" onChange={handleOnChange} />
        </label>
      </section>
      <section>2</section>
      <PercentageSelect setPercentage={setPercentage} />
    </main>
  );
};

export default Chart;
