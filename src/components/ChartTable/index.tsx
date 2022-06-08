import React from 'react';

import { Bases, Options } from '../../index.d';

interface Props {
    bases: Bases;
    options: Options;
}

const ChartTable: React.FC<Props> = () => {
  const num: number = 32;
  return (
    <div>
      ChartTable
      {' '}
      {num}
    </div>
  );
};

export default ChartTable;
