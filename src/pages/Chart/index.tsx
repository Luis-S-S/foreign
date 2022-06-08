/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import { Bases, Options } from '../../index.d';
import IncomeSetup from '../../components/IncomeSetup';
import PercentageSelect from '../../components/PercentageSelect';

import './Chart.scss';

const Chart: React.FC = () => {
  const { currency } = useParams();
  const [conversionRate, setConversionRate] = useState(1);
  const [options, setOptions] = useState<Options>({ income: 0, monthlyIncomeCOP: 0, typeOfIncome: 'monthly' });

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

  const formatTwoDecimals = (value: string | number): number => {
    const number = Number(value);
    return Math.round(number * 100) / 100;
  };

  useEffect(() => {
    if (currency !== 'COP') {
      setConversionRate(3970);
    }
  }, []);

  return (
    <main className="chart-page">
      <Link className="link--default" to="/">Back to home</Link>
      <section className="chart__top-section">
        <pre>{JSON.stringify(options, null, 2)}</pre>
        <p>{`Currency: ${currency}`}</p>
        <p>{`Conversion rate: ${conversionRate}`}</p>
        <p>{`Income monthly: ${options.monthlyIncomeCOP} COP`}</p>
        <IncomeSetup
          options={options}
          setOptions={setOptions}
          formatTwoDecimals={formatTwoDecimals}
          conversionRate={conversionRate}
        />
      </section>
      <section className="chart__options-section">2</section>
      {/* table goes here */}
      <PercentageSelect options={options} setOptions={setOptions} />
    </main>
  );
};

export default Chart;
