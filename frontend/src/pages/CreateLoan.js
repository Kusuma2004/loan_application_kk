import React, { useState } from 'react';
import './CreateLoan.css';
import { createLoan } from '../api/loanApi';

const CreateLoan = () => {
  const [form, setForm] = useState({
    customer_id: '',
    loan_amount: '',
    loan_period_years: '',
    interest_rate_yearly: ''
  });
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createLoan(form);
      setSuccessMsg(`Loan Created! EMI: ₹${res.data.monthly_emi}`);
    } catch (err) {
      setSuccessMsg("Something went wrong!");
    }
  };

  return (
    <div className="loan-container">
      {/* Floating Particles */}
      <div className="particles-bg">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Form Card */}
      <form onSubmit={handleSubmit} className="loan-form">
        <h2>Create Loan</h2>

        <input
          type="text"
          placeholder="Customer ID"
          value={form.customer_id}
          onChange={e => setForm({ ...form, customer_id: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Loan Amount"
          value={form.loan_amount}
          onChange={e => setForm({ ...form, loan_amount: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Loan Period (Years)"
          value={form.loan_period_years}
          onChange={e => setForm({ ...form, loan_period_years: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Interest Rate (%)"
          value={form.interest_rate_yearly}
          onChange={e => setForm({ ...form, interest_rate_yearly: e.target.value })}
          required
        />

        <button type="submit">Create Loan</button>

        {successMsg && <p className="success-msg">{successMsg}</p>}
      </form>
    </div>
  );
};

export default CreateLoan;
