import React, { useState } from 'react';
import { getLedger } from '../api/loanApi';
import './ViewLedger.css';

const ViewLedger = () => {
  const [loanId, setLoanId] = useState('');
  const [ledger, setLedger] = useState(null);

  const fetchLedger = async () => {
    try {
      const res = await getLedger(loanId);
      setLedger(res.data);
    } catch (err) {
      console.error('Error fetching ledger:', err);
      setLedger(null);
    }
  };

  return (
    <div className="ledger-container">
      {/* Floating Particles */}
      <div className="particles">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="ledger-form">
        <h2>View Loan Ledger</h2>

        <input
          type="text"
          placeholder="Enter Loan ID"
          value={loanId}
          onChange={(e) => setLoanId(e.target.value)}
        />
        <button onClick={fetchLedger}>Get Ledger</button>

        {ledger && (
          <div className="ledger-details">
            <div className="ledger-summary">
              <p><strong>Total Paid:</strong> ₹{ledger.amount_paid}</p>
              <p><strong>Balance:</strong> ₹{ledger.balance_amount}</p>
              <p><strong>EMIs Left:</strong> {ledger.emis_left}</p>
            </div>

            <h3>Transactions</h3>
            <ul className="transaction-list">
              {ledger.transactions.map((txn) => (
                <li key={txn.transaction_id} className="transaction-item">
                  <span className="txn-type">{txn.type}</span>
                  <span className="txn-amount">₹{txn.amount}</span>
                  <span className="txn-date">
                    {new Date(txn.date).toLocaleDateString()}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewLedger;
