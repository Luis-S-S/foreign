import React from 'react';

import { Bases, Options } from '../../index.d';

// import { formatNumsToString, formatTwoDecimals } from '../../service/functions';

interface Props {
    bases: Bases;
    opt: Options;
    salary: number;
}
const ManagementTable: React.FC<Props> = ({ bases, opt, salary }) => (
  <table>
    <tr>
      <td>{JSON.stringify(bases, null, 2)}</td>
      <td>{JSON.stringify(opt, null, 2)}</td>
      <td>{salary}</td>
    </tr>
  </table>
);

export default ManagementTable;
