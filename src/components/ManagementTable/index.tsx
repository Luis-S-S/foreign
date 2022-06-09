/* eslint-disable max-len */
import React from 'react';

import { Bases, Options } from '../../index.d';

import {
  calculateParafiscales,
  calculatePrestaciones,
  calculateSeguridadSocial,
  displayNumber,
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
    <table className="table--default">
      <thead>
        <tr className="title-row">
          <th colSpan={2}>Management of Salary</th>
        </tr>
      </thead>
      <tbody>
        <tr className="odd-row">
          <td>Reportar en &quot;Mi Planilla&quot; o &quot;Pila&quot;</td>
          <td>{displayNumber(salary)}</td>
        </tr>
        <tr className="even-row">
          <td>El pago total de Parafiscales y Seguridad Social</td>
          <td className="error--generic">{displayNumber(parafiscales + seguridadSocial)}</td>
        </tr>
        <tr className="odd-row">
          <td>Separar para Prima, Vacaciones y Cesantías</td>
          <td className="error--generic">{displayNumber(prestaciones)}</td>
        </tr>
        <tr className="even-row">
          <td>Quedan libres para el mes</td>
          <td className="success--generic">
            {displayNumber(opt.monthlyIncomeCOP - (parafiscales + prestaciones + seguridadSocial))}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default ManagementTable;
