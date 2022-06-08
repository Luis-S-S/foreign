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
    <table>
      <thead>
        <tr>
          <th>Management of Salary</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Reportar en &quot;Mi Planilla&quot; o &quot;Pila&quot;</td>
          <td>{displayNumber(salary)}</td>
        </tr>
        <tr>
          <td>El pago total de Parafiscales y Seguridad Social</td>
          <td>{displayNumber(parafiscales + seguridadSocial)}</td>
        </tr>
        <tr>
          <td>Separar para Prima, Vacaciones y Cesantías</td>
          <td>{displayNumber(prestaciones)}</td>
        </tr>
        <tr>
          <td>Quedan libres para el mes</td>
          <td>
            {displayNumber(opt.monthlyIncomeCOP - (parafiscales + prestaciones + seguridadSocial))}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default ManagementTable;
