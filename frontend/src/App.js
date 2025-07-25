import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateLoan from './pages/CreateLoan';
import MakePayment from './pages/MakePayment';
import ViewLedger from './pages/ViewLedger';
import CustomerOverview from './pages/CustomerOverview';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-loan" element={<CreateLoan />} />
        <Route path="/make-payment" element={<MakePayment />} />
        <Route path="/view-ledger" element={<ViewLedger />} />
        <Route path="/overview" element={<CustomerOverview />} />
      </Routes>
    </Router>
  );
}

export default App;