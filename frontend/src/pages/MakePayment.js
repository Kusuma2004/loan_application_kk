import React, { useState } from 'react';
import { makePayment } from '../api/loanApi';
import './MakePayment.css';

const MakePayment = () => {
  const [loanId, setLoanId] = useState('');
  const [form, setForm] = useState({ amount: '', payment_type: 'EMI' });
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await makePayment(loanId, form);
      setMessage(res.data.message);
    } catch (err) {
      setMessage('Payment failed. Please try again.');
    }
  };

  return (
    <div className="payment-container">
      {/* Floating Particles */}
      <div className="particles">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Form Card */}
      <form onSubmit={handleSubmit} className="payment-form">
        <h2>Make a Payment</h2>

        <input
          type="text"
          placeholder="Loan ID"
          value={loanId}
          onChange={(e) => setLoanId(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Amount"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
          required
        />

        <select
          value={form.payment_type}
          onChange={(e) => setForm({ ...form, payment_type: e.target.value })}
        >
          <option value="EMI">EMI</option>
          <option value="LUMP_SUM">LUMP SUM</option>
        </select>

        <button type="submit">Make Payment</button>

        {message && <p className="success-msg">{message}</p>}
      </form>
    </div>
  );
};

export default MakePayment;
