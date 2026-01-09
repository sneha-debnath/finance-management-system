let budgetPieChart, sipChart, riskRewardChart;

// Show selected tab and deactivate others
function showTab(id) {
  const tabs = document.querySelectorAll('.tab');
  const contents = document.querySelectorAll('.tab-content');
  contents.forEach(c => c.classList.add('hidden'));
  tabs.forEach(t => t.classList.remove('active'));
  document.getElementById(id).classList.remove('hidden');
  event.target.classList.add('active');
}

// Add new expense input fields
let expenseCount = 0;
function addExpense() {
  expenseCount++;
  const container = document.getElementById('expense-list');
  const div = document.createElement('div');
  div.className = "flex flex-col sm:flex-row gap-2";
  div.innerHTML = `
    <input type="text" placeholder="Expense Label" class="border p-2 w-full sm:w-auto" id="label${expenseCount}">
    <input type="number" placeholder="Amount" class="border p-2 w-full sm:w-auto" id="amount${expenseCount}">
  `;
  container.appendChild(div);
}

// Calculate budget and show result + pie chart
function calculateBudget() {
  const income = parseFloat(document.getElementById('income').value) || 0;
  let total = 0;
  for (let i = 1; i <= expenseCount; i++) {
    const amt = parseFloat(document.getElementById(`amount${i}`)?.value) || 0;
    total += amt;
  }
  const remaining = income - total;
  document.getElementById('budget-result').textContent = 
    `Total Expenses: $${total.toFixed(2)} | Remaining: $${remaining.toFixed(2)}`;

  // Handle pie chart
  const ctx = document.getElementById('budgetPieChart').getContext('2d');
  if (budgetPieChart) budgetPieChart.destroy();
  budgetPieChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Expenses', 'Remaining'],
      datasets: [{
        data: [total, remaining >= 0 ? remaining : 0],
        backgroundColor: ['#EF4444', '#10B981']
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });
}

// Investment advice based on amount
function getInvestmentAdvice() {
  const amount = parseFloat(document.getElementById('invest-amount').value);
  let msg = '';
  if (isNaN(amount)) {
    msg = 'Please enter a valid amount.';
  } else if (amount < 500) {
    msg = 'Use high-yield savings accounts or micro-investing apps like Acorns or Stash.';
  } else if (amount < 5000) {
    msg = 'Try index funds, ETFs, or robo-advisors like Betterment.';
  } else {
    msg = 'Consider diversified portfolios, real estate, or individual stocks.';
  }
  document.getElementById('investment-advice').textContent = msg;
}

// SIP calculation and line chart
function calculateSIP() {
  const sipAmount = parseFloat(document.getElementById('sip-amount').value);
  if (isNaN(sipAmount) || sipAmount <= 0) return;

  const labels = ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'];
  const data = [
    sipAmount * 12,
    sipAmount * 12 * 1.15,
    sipAmount * 12 * 1.32,
    sipAmount * 12 * 1.5,
    sipAmount * 12 * 1.75
  ];

  const ctx = document.getElementById('sipChart').getContext('2d');
  if (sipChart) sipChart.destroy();
  sipChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'SIP Growth Over 5 Years',
        data: data,
        borderColor: '#6366F1',
        fill: false,
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });
}

// Net Worth calculation
function calculateNetWorth() {
  const assets = parseFloat(document.getElementById('assets').value) || 0;
  const liabilities = parseFloat(document.getElementById('liabilities').value) || 0;
  const netWorth = assets - liabilities;
  document.getElementById('networth-result').textContent = 
    `Net Worth: $${netWorth.toFixed(2)}`;
}

// Optional: Risk vs Reward scatter plot (example dataset)
window.addEventListener('DOMContentLoaded', () => {
  const ctx = document.getElementById('riskRewardChart').getContext('2d');
  riskRewardChart = new Chart(ctx, {
    type: 'scatter',
    data: {
      datasets: [
        {
          label: 'Investment Options',
          data: [
            { x: 2, y: 5 },
            { x: 4, y: 8 },
            { x: 3, y: 7 },
            { x: 1, y: 3 },
            { x: 5, y: 10 }
          ],
          backgroundColor: '#F59E0B'
        }
      ]
    },
    options: {
      scales: {
        x: {
          title: {
            display: true,
            text: 'Risk Level'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Expected Return (%)'
          }
        }
      },
      responsive: true,
      maintainAspectRatio: false
    }
  });
});
