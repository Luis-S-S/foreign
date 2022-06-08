/* eslint-disable max-len */
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

interface Options {
  income: number;
  typeOfIncome: string;
}

const Chart: React.FC = () => {
  const { currency } = useParams();
  const [options, setOptions] = useState<Options>({ income: 0, typeOfIncome: 'monthly' });
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

  const handleIncomeChange: React.ChangeEventHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    let switchController: string = options.typeOfIncome;
    let { income } = options;
    if (e.target.name === 'income') {
      income = e.target.value ? parseFloat(parseFloat(e.target.value).toFixed(2)) : 0;
    } else {
      switchController = e.target.value;
    }
    switch (switchController) {
      case 'hourly':
        setOptions({ ...options, income: income * 8 * 5 * 4, typeOfIncome: 'hourly' });
        break;
      case 'weekly':
        setOptions({ ...options, income: income * 4, typeOfIncome: 'weekly' });
        break;
      case 'monthly':
        setOptions({ ...options, income, typeOfIncome: 'monthly' });
        break;
      case 'annual':
        setOptions({ ...options, income: parseFloat((income / 12).toFixed(2)), typeOfIncome: 'annual' });
        break;
      default:
        break;
    }
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
        <p>{`Conversion rate: ${JSON.stringify(options, null, 2)}`}</p>
        <p>{`Income monthly: ${options.income}`}</p>
        <label htmlFor="income">
          Income:
          <input type="number" name="income" id="income" step="0.01" onChange={handleIncomeChange} />
          <select name="typeOfIncome" id="typeOfIncome" defaultValue="monthly" onChange={handleIncomeChange}>
            <option value="hourly">hourly</option>
            <option value="weekly">weekly</option>
            <option value="monthly">monthly</option>
            <option value="annual">annual</option>
          </select>
        </label>
      </section>
      <section>2</section>
      <PercentageSelect setPercentage={setPercentage} />
    </main>
  );
};

export default Chart;
