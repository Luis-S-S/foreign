import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import { useParams, Link } from 'react-router-dom';

import {
  Bases, Options, RadioList,
} from '../../index.d';
import data from '../../service/data.json';
import { displayNumber, calculateSalary } from '../../service/functions';
// import fetchConversionRate from '../../service/currencies';

import IncomeSetup from '../../components/IncomeSetup';
import RadioListInput from '../../components/RadioList';
import CheckableOpt from '../../components/CheckableOpt';
import ChartTable from '../../components/ChartTable';
import ManagementTable from '../../components/ManagementTable';

import './Chart.scss';
import SelectList from '../../components/SelectList';

const Chart: React.FC = () => {
  const { currency } = useParams();
  const [bases] = useState<Bases>(data.bases);
  const [conversionRate, setConversionRate] = useState<number>(1);
  const [error, setError] = useState<string>('');
  const [options, setOptions] = useState<Options>({ ...data.initialOptions, typeOfArl: 1 });
  const [salary, setSalary] = useState<number>(0);

  const percentageRadioList: RadioList = [
    { value: '40', label: '40%' },
    { value: '50', label: '50%' },
    { value: '60', label: '60%' },
    { value: 'max', label: 'Max', defaultChecked: true },
  ];

  useEffect(() => {
    setSalary(calculateSalary(bases, options));
  }, [options]);

  useEffect(() => {
    if (currency && currency !== 'COP') {
      setConversionRate(3970);
      setError('');
      // fetchConversionRate(currency)
      //   .then((response: CurrencyApiResponse) => {
      //     if (response.rates) {
      //       setConversionRate(response.rates.COP);
      //     }
      //   })
      //   .catch(() => { setError('Error al llamar la API, utiliza'); });
    }
  }, []);

  return (
    <main className="chart-page">
      <h1>Foreign Salary</h1>
      {error && <p className="error">{error}</p>}
      <div className="chart-page__container">
        <div className="chart__section-container">
          <section className="section-info__container">
            <h2 className="text--title">Information</h2>
            <div className="top-section__grid">
              <p>Currency:</p>
              <p className="align-r">{currency}</p>
            </div>
            <div className="top-section__grid">
              <p>Conversion rate:</p>
              <p className="align-r">{`$1 ${currency} = ${displayNumber(conversionRate)} COP`}</p>
            </div>
            <div className="top-section__grid">
              <p>Monthly income:</p>
              <p className="align-r">{`${displayNumber(options.monthlyIncomeCOP)} COP`}</p>
            </div>
            <IncomeSetup
              options={options}
              setOptions={setOptions}
              conversionRate={conversionRate}
            />
          </section>
          <section className="chart__options-section section-info__container">
            <h2 className="text--title">Options</h2>
            <div className="options-section__radios">
              <p className="text--body align-c">Seleccionar porcentaje para cálculos</p>
              <RadioListInput options={options} setOptions={setOptions} name="percentage" list={percentageRadioList} />
            </div>
            <p className="text--body align-c">Seleccionar factores a incluir en el cálculo</p>
            <div className="options-section__checkboxes">
              <CheckableOpt options={options} setOptions={setOptions} name="familiarCompensation" text="Caja de Compensación" />
              <div>
                <CheckableOpt options={options} setOptions={setOptions} name="arl" text="ARL" />
                <span>{' '}</span>
                <SelectList options={options} setOptions={setOptions} name="typeOfArl" list={[1, 2, 3, 4, 5]} defaultValue={1} />
              </div>
              <CheckableOpt options={options} setOptions={setOptions} name="biannualCompensation" text="Prima" />
              <CheckableOpt options={options} setOptions={setOptions} name="vacations" text="Vacations" />
              <CheckableOpt options={options} setOptions={setOptions} name="cesantias" text="Cesantías" />
            </div>
          </section>
        </div>
        <section className="chart__table-section">
          <ChartTable bases={bases} opt={options} salary={salary} />
        </section>
        <section className="chart__table-section">
          <ManagementTable bases={bases} opt={options} salary={salary} />
        </section>
      </div>
    </main>
  );
};

export default Chart;
