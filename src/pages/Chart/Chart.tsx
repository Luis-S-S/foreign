import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PercentageSelect from '../../components/PercentageSelect/PercentageSelect';

const Chart: React.FC = () => {
  const [, setPercentage] = useState<string>('max');
  return (
    <main>
      <Link className="link--default" to="/">Back to home</Link>
      <PercentageSelect setPercentage={setPercentage} />
    </main>
  );
};

export default Chart;
