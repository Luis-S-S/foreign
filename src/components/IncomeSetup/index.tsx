/* eslint-disable max-len */
import React from 'react';
import { Options } from '../../index.d';

interface Props {
    options: Options,
    setOptions: React.Dispatch<React.SetStateAction<Options>>,
    formatTwoDecimals: Function,
    conversionRate: number,
}

const IncomeSetup: React.FC<Props> = ({
  options, setOptions, formatTwoDecimals, conversionRate,
}) => {
  const handleIncomeChange: React.ChangeEventHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    let switchController: string = options.typeOfIncome;
    let { income } = options;
    if (e.target.name === 'income') {
      income = e.target.value ? formatTwoDecimals(e.target.value) : 0;
    } else {
      switchController = e.target.value;
    }
    switch (switchController) {
      case 'hourly':
        setOptions({
          ...options, income, monthlyIncomeCOP: formatTwoDecimals(income * 8 * 5 * 4 * conversionRate), typeOfIncome: 'hourly',
        });
        break;
      case 'weekly':
        setOptions({
          ...options, income, monthlyIncomeCOP: formatTwoDecimals(income * 4 * conversionRate), typeOfIncome: 'weekly',
        });
        break;
      case 'monthly':
        setOptions({
          ...options, income, monthlyIncomeCOP: formatTwoDecimals(income * conversionRate), typeOfIncome: 'monthly',
        });
        break;
      case 'annual':
        setOptions({
          ...options, income, monthlyIncomeCOP: formatTwoDecimals((income * conversionRate) / 12), typeOfIncome: 'annual',
        });
        break;
      default:
        break;
    }
  };

  return (
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
  );
};

export default IncomeSetup;
