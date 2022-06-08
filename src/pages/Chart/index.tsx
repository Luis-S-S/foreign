import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import { Bases, Options } from '../../index.d';
import data from '../../service/data.json';
import { formatNumsToString } from '../../service/functions';

import IncomeSetup from '../../components/IncomeSetup';
import PercentageSelect from '../../components/PercentageSelect';
import CheckableOpt from '../../components/CheckableOpt';

import './Chart.scss';

const Chart: React.FC = () => {
  const { currency } = useParams();
  const [bases] = useState<Bases>(data.bases);
  const [conversionRate, setConversionRate] = useState(1);
  const [options, setOptions] = useState<Options>(data.initialOptions);

  useEffect(() => {

  }, [options]);

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
      <section className="chart__options-section">
        <PercentageSelect options={options} setOptions={setOptions} />
        <CheckableOpt options={options} setOptions={setOptions} name="arl" text="ARL" />
        <CheckableOpt options={options} setOptions={setOptions} name="familiarCompensation" text="Caja de Compensación" />
        <CheckableOpt options={options} setOptions={setOptions} name="biannualCompensation" text="Prima" />
        <CheckableOpt options={options} setOptions={setOptions} name="cesantias" text="Cesantías" />
        <CheckableOpt options={options} setOptions={setOptions} name="vacations" text="Vacations" />
      </section>
      {/* table goes here */}
    </main>
  );
};

export default Chart;
