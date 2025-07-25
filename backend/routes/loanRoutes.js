const express = require('express');
const router = express.Router();
const db = require('../utils/db'); // Your sqlite3 db instance
const { calculateEMI } = require('../utils/helpers');

// Create Loan
router.post('/loans', (req, res) => {
  const { customer_id, loan_amount, loan_period_years, interest_rate_yearly } = req.body;
  const emi = calculateEMI(loan_amount, interest_rate_yearly, loan_period_years);
  const total_payable = emi * loan_period_years * 12;

  db.run(
    `INSERT INTO loans (customer_id, amount, period_years, rate, monthly_emi, total_amount)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [customer_id, loan_amount, loan_period_years, interest_rate_yearly, emi, total_payable],
    function (err) {
      if (err) return res.status(500).json({ message: 'Loan insertion failed', error: err });

      const loan_id = this.lastID;

      db.run(
        `INSERT INTO transactions (loan_id, amount, type, date)
         VALUES (?, ?, ?, ?)`,
        [loan_id, loan_amount, 'DISBURSAL', new Date().toISOString()],
        function (txnErr) {
          if (txnErr) return res.status(500).json({ message: 'Disbursal failed', error: txnErr });

          res.json({ loan_id, monthly_emi: emi });
        }
      );
    }
  );
});

// Record Payment
router.post('/loans/:loanId/payments', (req, res) => {
  const { amount, payment_type } = req.body;
  const loanId = req.params.loanId;

  db.get('SELECT * FROM loans WHERE loan_id = ?', [loanId], (err, loan) => {
    if (err) return res.status(500).json({ message: 'DB error' });
    if (!loan) return res.status(404).json({ message: 'Loan not found' });

    db.run(
      `INSERT INTO transactions (loan_id, amount, type, date)
       VALUES (?, ?, ?, ?)`,
      [loanId, amount, payment_type, new Date().toISOString()],
      function (txnErr) {
        if (txnErr) return res.status(500).json({ message: 'Insert failed', error: txnErr });

        res.json({ message: 'Payment recorded successfully' });
      }
    );
  });
});

// Loan Ledger
router.get('/loans/:loanId/ledger', (req, res) => {
  const loanId = req.params.loanId;

  db.get('SELECT * FROM loans WHERE loan_id = ?', [loanId], (err, loan) => {
    if (err) return res.status(500).json({ message: 'DB error' });
    if (!loan) return res.status(404).json({ message: 'Loan not found' });

    db.all('SELECT * FROM transactions WHERE loan_id = ?', [loanId], (txnErr, txns) => {
      if (txnErr) return res.status(500).json({ message: 'Transaction fetch failed' });

      const amountPaid = txns
        .filter((txn) => txn.type !== 'DISBURSAL')
        .reduce((sum, txn) => sum + txn.amount, 0);

      const balanceAmount = loan.total_amount - amountPaid;
      const emisLeft = Math.ceil(balanceAmount / loan.monthly_emi);

      res.json({
        amount_paid: amountPaid,
        balance_amount: balanceAmount,
        emis_left: emisLeft,
        transactions: txns
      });
    });
  });
});

// Customer Overview
router.get('/customers/:customerId/overview', (req, res) => {
  const customerId = req.params.customerId;

  db.all('SELECT * FROM loans WHERE customer_id = ?', [customerId], (err, loans) => {
    if (err) return res.status(500).json({ message: 'Loan fetch failed' });

    if (loans.length === 0) return res.json({ total_loans: 0, loans: [] });

    let completed = 0;
    const overview = [];

    loans.forEach((loan) => {
      db.all('SELECT * FROM transactions WHERE loan_id = ?', [loan.loan_id], (txnErr, txns) => {
        if (txnErr) return res.status(500).json({ message: 'Transaction fetch failed' });

        const paid = txns.filter((t) => t.type !== 'DISBURSAL').reduce((sum, t) => sum + t.amount, 0);
        const balance = loan.total_amount - paid;

        overview.push({
          loan_id: loan.loan_id,
          amount_paid: paid,
          total_amount: loan.total_amount,
          emis_left: Math.ceil(balance / loan.monthly_emi)
        });

        completed++;
        if (completed === loans.length) {
          res.json({ total_loans: loans.length, loans: overview });
        }
      });
    });
  });
});

module.exports = router;
