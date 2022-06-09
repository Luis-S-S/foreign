import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import CurrencySelect from '../../components/CurrencySelect';

import './Home.scss';

const Home: React.FC = () => {
  const [currency, setCurrency] = useState<string>('USD');
  return (
    <main className="home-page">
      <section className="home__container">
        <h1 className="text--title">Foreign Salary!</h1>
        <p className="text--body align-j">Congratulations on landing a remote job! Our purpose is to help you manage your earnings while complying with Colombian regulations.</p>
        <p className="text--body align-j">Select the currency that applies to you and click the &quot;Go to chart&quot; button.</p>
        <p className="text--body align-j">It will take you to a chart with multiple options. You can input your salary, select how much you want to report for health and pension, whether you are enrolled with an ARL or not, and much more!</p>
        <p className="text--body align-j">*Note: It also helps if your current contract is &quot;Prestación de servicios&quot; you can compare how much you are earning against different contract types</p>
        <CurrencySelect setCurrency={setCurrency} />
        <Link className="link--default" to={`/${currency}`}>Go to chart</Link>
      </section>
    </main>
  );
};

export default Home;
