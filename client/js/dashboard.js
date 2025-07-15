
// Toggle dark/light mode
document.getElementById("toggleMode").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
});

// Load saved theme on page load
window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.remove("dark-mode");
  }
});


// API Base URL
const API_BASE = "http://localhost:5000/api";


// Handle Donation Submit
document.getElementById("donationForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  const name = document.getElementById("donorName").value;
  const amount = parseFloat(document.getElementById("donationAmount").value);
  const month = document.getElementById("donationMonth").value;
  try {
    const res = await fetch(`${API_BASE}/donations`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, amount, month })
    });
    const data = await res.json();
    alert(data.message || "Donation added!");
    this.reset();
  } catch (err) {
    alert("Failed to add donation. Please try again.");
  }
});


// Handle Expense Submit
document.getElementById("expenseForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  const reason = document.getElementById("expenseReason").value;
  const amount = parseFloat(document.getElementById("expenseAmount").value);
  const month = document.getElementById("expenseMonth").value;
  try {
    const res = await fetch(`${API_BASE}/expenses`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reason, amount, month })
    });
    const data = await res.json();
    alert(data.message || "Expense added!");
    this.reset();
  } catch (err) {
    alert("Failed to add expense. Please try again.");
  }
});


// Filter Summary by Month
document.getElementById("filterBtn").addEventListener("click", async () => {
  const month = document.getElementById("filterMonth").value;
  if (!month) return alert("Please select a month.");
  try {
    const donationRes = await fetch(`${API_BASE}/donations?month=${month}`);
    const expenseRes = await fetch(`${API_BASE}/expenses?month=${month}`);
    const donations = await donationRes.json();
    const expenses = await expenseRes.json();
    const summaryBody = document.querySelector("#summaryTable tbody");
    summaryBody.innerHTML = "";
    let totalDonation = 0;
    let totalExpense = 0;
    donations.forEach(d => {
      totalDonation += d.amount;
      summaryBody.innerHTML += `
        <tr>
          <td>Donation</td>
          <td>${d.name}</td>
          <td>৳${d.amount}</td>
          <td>${new Date(d.date).toLocaleString()}</td>
        </tr>`;
    });
    expenses.forEach(e => {
      totalExpense += e.amount;
      summaryBody.innerHTML += `
        <tr>
          <td>Expense</td>
          <td>${e.reason}</td>
          <td>৳${e.amount}</td>
          <td>${new Date(e.date).toLocaleString()}</td>
        </tr>`;
    });
    document.getElementById("totalCollection").innerText = `৳${totalDonation}`;
    document.getElementById("totalExpense").innerText = `৳${totalExpense}`;
    document.getElementById("currentCash").innerText = `৳${totalDonation - totalExpense}`;
  } catch (err) {
    alert("Failed to fetch summary. Please try again.");
  }
});


// PDF Export
document.getElementById("downloadPdfBtn").addEventListener("click", () => {
  const { jsPDF } = window.jspdf;
  html2canvas(document.querySelector("#summarySection")).then(canvas => {
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    // Fit image to page
    pdf.addImage(imgData, "PNG", 0, 10, pdfWidth, pdfHeight - 20);
    pdf.save("monthly-summary.pdf");
  });
});


// Logout button
document.getElementById("logoutBtn").addEventListener("click", () => {
  // In future, clear session/cookie here
  location.href = "login.html";
});
