import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Chart from './pages/Chart';

const App: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:currency" element={<Chart />} />
    </Routes>
  </BrowserRouter>
);

export default App;
