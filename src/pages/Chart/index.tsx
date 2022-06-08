import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import { Bases, Options } from '../../index.d';
import data from '../../service/data.json';
import { formatNumsToString } from '../../service/functions';

import IncomeSetup from '../../components/IncomeSetup';
import PercentageSelect from '../../components/PercentageSelect';

import './Chart.scss';

const Chart: React.FC = () => {
  const { currency } = useParams();
  const [bases] = useState<Bases>(data.bases);
  const [conversionRate, setConversionRate] = useState(1);
  const [options, setOptions] = useState<Options>({ income: 0, monthlyIncomeCOP: 0, typeOfIncome: 'monthly' });

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
        <pre>{JSON.stringify(bases, null, 2)}</pre>
        <p>{`Currency: ${currency}`}</p>
        <p>{`Conversion rate: ${formatNumsToString(conversionRate)}`}</p>
        <p>{`Income monthly: ${formatNumsToString(options.monthlyIncomeCOP)} COP`}</p>
        <IncomeSetup
          options={options}
          setOptions={setOptions}
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
