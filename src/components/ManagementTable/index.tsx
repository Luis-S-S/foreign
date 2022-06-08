import React from 'react';

import { Bases, Options } from '../../index.d';

import {
  calculateParafiscales, calculatePrestaciones, calculateSeguridadSocial, displayNumber,
} from '../../service/functions';

interface Props {
    bases: Bases;
    opt: Options;
    salary: number;
}
const ManagementTable: React.FC<Props> = ({ bases, opt, salary }) => {
  const [parafiscales, setParafiscales] = React.useState(0);
  const [prestaciones, setPrestaciones] = React.useState(0);
  const [seguridadSocial, setSeguridadSocial] = React.useState(0);

  React.useEffect(() => {
    setParafiscales(calculateParafiscales(salary, opt, bases));
    setPrestaciones(calculatePrestaciones(salary, opt, bases));
    setSeguridadSocial(calculateSeguridadSocial(salary, opt, bases));
  }, [opt, salary]);
  return (
    <table>
      <tr>
        <td>{displayNumber(parafiscales)}</td>
        <td>{displayNumber(prestaciones)}</td>
        <td>{displayNumber(seguridadSocial)}</td>
        <td>{displayNumber(salary)}</td>
      </tr>
    </table>
  );
};

export default ManagementTable;
