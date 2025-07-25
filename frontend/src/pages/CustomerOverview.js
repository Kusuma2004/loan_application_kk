import React, { useState, useEffect } from 'react';
import './CustomerOverview.css';
import { getCustomerOverview } from '../api/loanApi';

const CustomerOverview = () => {
  const [customerId, setCustomerId] = useState('');
  const [overview, setOverview] = useState(null);

  const fetchOverview = async () => {
    try {
      const res = await getCustomerOverview(customerId);
      setOverview(res.data);
    } catch (err) {
      console.error(err);
      setOverview(null);
    }
  };

  useEffect(() => {
    // optional: auto-fetch when ID changes
  }, [customerId]);

  return (
    <div className="overview-container">
      <div className="particles-bg">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="particle-small"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <div className="overview-card">
        <h2>Customer Overview</h2>
        <div className="input-group">
          <input
            type="text"
            placeholder="Enter Customer ID"
            value={customerId}
            onChange={e => setCustomerId(e.target.value)}
          />
          <button onClick={fetchOverview}>View</button>
        </div>

        {overview && (
          <div className="result fade-in">
            <p><strong>Total Loans:</strong> {overview.total_loans}</p>
            <ul>
              {overview.loans.map(loan => (
                <li key={loan.loan_id} className="loan-item">
                  Loan #{loan.loan_id} — Paid ₹{loan.amount_paid} / ₹{loan.total_amount}
                  — EMIs Left: {loan.emis_left}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerOverview;
