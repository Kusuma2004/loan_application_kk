function calculateEMI(principal, rateAnnual, years) {
  const r = rateAnnual / 12 / 100;
  const n = years * 12;
  const emi = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  return Math.round(emi);
}

module.exports = { calculateEMI };
