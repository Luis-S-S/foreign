/* eslint-disable max-len */
import React from 'react';

import { Bases, Options } from '../../index.d';

import {
  formatNumsToString, calculateTotal, displayNumber,
} from '../../service/functions';

interface Props {
    bases: Bases;
    opt: Options;
    salary: number;
}

const displayZero = `$${(0).toFixed(2)}`;

const MainSection: React.FC<Props> = ({ bases, opt, salary }) => (
  <thead>
    <tr>
      <th colSpan={3}>Salary Description</th>
    </tr>
    <tr>
      <td colSpan={2}>Salario</td>
      <td>{`$${formatNumsToString(salary)}`}</td>
    </tr>
    <tr>
      <td colSpan={2}>Auxilio de Transporte</td>
      <td>
        {opt.monthlyIncomeCOP > bases.transportationAllowanceBreakpoint
          ? displayZero
          : `$${formatNumsToString(bases.transportationAllowance)}`}
      </td>
    </tr>
  </thead>

);

const Parafiscales: React.FC<Props> = ({ bases, opt, salary }) => (
  <>
    <tr>
      <th colSpan={3}>Parafiscales</th>
    </tr>
    <tr>
      <td>Caja de Compensación</td>
      <td>{`${bases.familiarCompensation}%`}</td>
      <td>
        {opt.familiarCompensation
          ? displayNumber((salary * bases.familiarCompensation) / 100)
          : displayZero}
      </td>
    </tr>
  </>
);

const SeguridadSocial: React.FC<Props> = ({ bases, opt, salary }) => (
  <>
    <tr>
      <th colSpan={3}>Seguridad Social</th>
    </tr>
    <tr>
      <td>ARL</td>
      <td>{`${bases.arl[opt.typeOfArl]}%`}</td>
      <td>
        {opt.arl
          ? displayNumber((salary * bases.arl[opt.typeOfArl]) / 100)
          : displayZero}
      </td>
    </tr>
    <tr>
      <td>Salud</td>
      <td>{`${bases.health}%`}</td>
      <td>{displayNumber((salary * bases.health) / 100)}</td>
    </tr>
    <tr>
      <td>Pensión</td>
      <td>
        {`${opt.monthlyIncomeCOP > bases.pensionBreakpoint
          ? bases.pension + 1
          : bases.pension}%`}
      </td>
      <td>
        {displayNumber(opt.monthlyIncomeCOP > bases.pensionBreakpoint
          ? ((salary * (bases.pension + 1)) / 100)
          : ((salary * bases.pension) / 100))}
      </td>
    </tr>
  </>
);

const Prestaciones: React.FC<Props> = ({ bases, opt, salary }) => (
  <>

    <tr>
      <th colSpan={3}>Prestaciones Sociales</th>
    </tr>
    <tr>
      <td>Prima</td>
      <td>{`${bases.biannualCompensation}%`}</td>
      <td>
        {opt.biannualCompensation
          ? displayNumber((salary * bases.biannualCompensation) / 100)
          : displayZero}
      </td>
    </tr>
    <tr>
      <td>Vacaciones</td>
      <td>{`${bases.vacations}%`}</td>
      <td>
        {opt.vacations
          ? displayNumber((salary * bases.vacations) / 100)
          : displayZero}
      </td>
    </tr>
    <tr>
      <td>Cesantias</td>
      <td>{`${bases.cesantias}%`}</td>
      <td>
        {opt.cesantias
          ? displayNumber((salary * bases.cesantias) / 100)
          : displayZero}
      </td>
    </tr>
    <tr>
      <td>Intereses Cesantias</td>
      <td>{`${bases.interestCesantias}%`}</td>
      <td>
        {opt.cesantias
          ? displayNumber((salary * bases.interestCesantias) / 100)
          : displayZero}
      </td>
    </tr>
  </>
);

const ChartTable: React.FC<Props> = ({ bases, opt, salary }) => {
  const [total, setTotal] = React.useState<number>(0);

  React.useEffect(() => {
    setTotal(calculateTotal(salary, opt, bases));
  }, [opt, salary]);

  return (
    <table>
      <MainSection bases={bases} opt={opt} salary={salary} />
      <tbody>
        <Parafiscales bases={bases} opt={opt} salary={salary} />
        <SeguridadSocial bases={bases} opt={opt} salary={salary} />
        <Prestaciones bases={bases} opt={opt} salary={salary} />
        <tr>
          <th colSpan={3}>Cálculos con base en</th>
        </tr>
        <tr>
          <td colSpan={3}>{displayNumber(total)}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default ChartTable;
