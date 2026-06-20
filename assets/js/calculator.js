/* ============================================================
   SYNERGY LIGHT - Calculadora de Ahorro
   ============================================================ */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  initCalculator();
});

function initCalculator() {
  const form = document.getElementById('calculator-form');
  if (!form) return;

  const currentBill = document.getElementById('current-bill');
  const currentConsumption = document.getElementById('current-consumption');
  const planSelect = document.getElementById('plan-select');
  const resultDiv = document.getElementById('calculator-result');

  const resultSynergy = document.getElementById('result-synergy');
  const resultSavings = document.getElementById('result-savings');
  const resultYearly = document.getElementById('result-yearly');

  // Rate per kWh for each plan
  const rates = {
    'basico': 0.08,
    'estandar': 0.10,
    'premium': 0.12
  };

  function calculate() {
    const bill = parseFloat(currentBill.value) || 0;
    const consumption = parseFloat(currentConsumption.value) || 0;
    const plan = planSelect.value;

    if (bill <= 0 || consumption <= 0 || !plan) {
      resultDiv.classList.add('hidden');
      return;
    }

    const rate = rates[plan];
    const synergyCost = consumption * rate;
    const monthlySavings = bill - synergyCost;
    const yearlySavings = monthlySavings * 12;

    // Format currency
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    });

    resultSynergy.textContent = formatter.format(synergyCost);
    resultSavings.textContent = formatter.format(monthlySavings);
    resultYearly.textContent = formatter.format(yearlySavings);

    // Highlight savings color
    if (monthlySavings > 0) {
      resultSavings.style.color = '#00FF88';
    } else if (monthlySavings < 0) {
      resultSavings.style.color = '#ff4444';
    }

    resultDiv.classList.remove('hidden');

    // Animate the result
    resultDiv.style.animation = 'none';
    resultDiv.offsetHeight; // Trigger reflow
    resultDiv.style.animation = 'fadeInUp 0.5s ease';
  }

  // Event listeners
  currentBill.addEventListener('input', calculate);
  currentConsumption.addEventListener('input', calculate);
  planSelect.addEventListener('change', calculate);

  // Format input to only allow numbers
  function formatNumberInput(e) {
    this.value = this.value.replace(/[^0-9.]/g, '');
  }

  currentBill.addEventListener('keydown', formatNumberInput);
  currentConsumption.addEventListener('keydown', formatNumberInput);
}