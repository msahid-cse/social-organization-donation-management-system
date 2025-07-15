document.getElementById("toggleMode").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
});

window.onload = () => {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
  }
};

let donations = [];
let expenses = [];

document.getElementById("donationForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("donorName").value;
  const amount = parseFloat(document.getElementById("donationAmount").value);
  const month = document.getElementById("donationMonth").value;
  const date = new Date().toLocaleString();

  donations.push({ name, amount, month, date });
  alert("Donation added!");
  this.reset();
});

document.getElementById("expenseForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const reason = document.getElementById("expenseReason").value;
  const amount = parseFloat(document.getElementById("expenseAmount").value);
  const month = document.getElementById("expenseMonth").value;
  const date = new Date().toLocaleString();

  expenses.push({ reason, amount, month, date });
  alert("Expense added!");
  this.reset();
});

document.getElementById("filterBtn").addEventListener("click", () => {
  const selectedMonth = document.getElementById("filterMonth").value;
  const summaryBody = document.querySelector("#summaryTable tbody");
  summaryBody.innerHTML = "";

  let totalDonation = 0;
  let totalExpense = 0;

  donations.filter(d => d.month === selectedMonth).forEach(d => {
    totalDonation += d.amount;
    summaryBody.innerHTML += `
      <tr>
        <td>Donation</td>
        <td>${d.name}</td>
        <td>৳${d.amount}</td>
        <td>${d.date}</td>
      </tr>`;
  });

  expenses.filter(e => e.month === selectedMonth).forEach(e => {
    totalExpense += e.amount;
    summaryBody.innerHTML += `
      <tr>
        <td>Expense</td>
        <td>${e.reason}</td>
        <td>৳${e.amount}</td>
        <td>${e.date}</td>
      </tr>`;
  });

  document.getElementById("totalCollection").innerText = `৳${totalDonation}`;
  document.getElementById("totalExpense").innerText = `৳${totalExpense}`;
  document.getElementById("currentCash").innerText = `৳${totalDonation - totalExpense}`;
});

// PDF Download (html2canvas + jsPDF needed in next step)
document.getElementById("downloadPdfBtn").addEventListener("click", () => {
  alert("PDF export will be added in the next step!");
});
