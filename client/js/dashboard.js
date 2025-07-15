// document.getElementById("toggleMode").addEventListener("click", () => {
//   document.body.classList.toggle("dark-mode");
//   localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
// });

// window.onload = () => {
//   if (localStorage.getItem("theme") === "dark") {
//     document.body.classList.add("dark-mode");
//   }
// };

// let donations = [];
// let expenses = [];

// document.getElementById("donationForm").addEventListener("submit", function (e) {
//   e.preventDefault();
//   const name = document.getElementById("donorName").value;
//   const amount = parseFloat(document.getElementById("donationAmount").value);
//   const month = document.getElementById("donationMonth").value;
//   const date = new Date().toLocaleString();

//   donations.push({ name, amount, month, date });
//   alert("Donation added!");
//   this.reset();
// });

// document.getElementById("expenseForm").addEventListener("submit", function (e) {
//   e.preventDefault();
//   const reason = document.getElementById("expenseReason").value;
//   const amount = parseFloat(document.getElementById("expenseAmount").value);
//   const month = document.getElementById("expenseMonth").value;
//   const date = new Date().toLocaleString();

//   expenses.push({ reason, amount, month, date });
//   alert("Expense added!");
//   this.reset();
// });

// document.getElementById("filterBtn").addEventListener("click", () => {
//   const selectedMonth = document.getElementById("filterMonth").value;
//   const summaryBody = document.querySelector("#summaryTable tbody");
//   summaryBody.innerHTML = "";

//   let totalDonation = 0;
//   let totalExpense = 0;

//   donations.filter(d => d.month === selectedMonth).forEach(d => {
//     totalDonation += d.amount;
//     summaryBody.innerHTML += `
//       <tr>
//         <td>Donation</td>
//         <td>${d.name}</td>
//         <td>৳${d.amount}</td>
//         <td>${d.date}</td>
//       </tr>`;
//   });

//   expenses.filter(e => e.month === selectedMonth).forEach(e => {
//     totalExpense += e.amount;
//     summaryBody.innerHTML += `
//       <tr>
//         <td>Expense</td>
//         <td>${e.reason}</td>
//         <td>৳${e.amount}</td>
//         <td>${e.date}</td>
//       </tr>`;
//   });

//   document.getElementById("totalCollection").innerText = `৳${totalDonation}`;
//   document.getElementById("totalExpense").innerText = `৳${totalExpense}`;
//   document.getElementById("currentCash").innerText = `৳${totalDonation - totalExpense}`;
// });

// // PDF Download (html2canvas + jsPDF needed in next step)
// document.getElementById("downloadPdfBtn").addEventListener("click", () => {
//   alert("PDF export will be added in the next step!");
// });

// document.getElementById("downloadPdfBtn").addEventListener("click", () => {
//   const { jsPDF } = window.jspdf;
//   html2canvas(document.querySelector("#summarySection")).then(canvas => {
//     const imgData = canvas.toDataURL("image/png");
//     const pdf = new jsPDF();
//     pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
//     pdf.save("summary.pdf");
//   });
// });


// Toggle dark/light mode
document.getElementById("toggleMode").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
});

// Load saved theme
window.onload = () => {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
  }
};

// API Base URL
const API_BASE = "http://localhost:5000/api";

// Handle Donation Submit
document.getElementById("donationForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  const name = document.getElementById("donorName").value;
  const amount = parseFloat(document.getElementById("donationAmount").value);
  const month = document.getElementById("donationMonth").value;

  const res = await fetch(`${API_BASE}/donations`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, amount, month })
  });

  const data = await res.json();
  alert(data.message || "Donation added!");
  this.reset();
});

// Handle Expense Submit
document.getElementById("expenseForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  const reason = document.getElementById("expenseReason").value;
  const amount = parseFloat(document.getElementById("expenseAmount").value);
  const month = document.getElementById("expenseMonth").value;

  const res = await fetch(`${API_BASE}/expenses`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ reason, amount, month })
  });

  const data = await res.json();
  alert(data.message || "Expense added!");
  this.reset();
});

// Filter Summary by Month
document.getElementById("filterBtn").addEventListener("click", async () => {
  const month = document.getElementById("filterMonth").value;
  if (!month) return alert("Please select a month.");

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
});

// PDF Export
document.getElementById("downloadPdfBtn").addEventListener("click", () => {
  const { jsPDF } = window.jspdf;
  html2canvas(document.querySelector("#summarySection")).then(canvas => {
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, "PNG", 0, 10, pdfWidth, pdfHeight);
    pdf.save("monthly-summary.pdf");
  });
});

// Logout button (optional)
document.getElementById("logoutBtn").addEventListener("click", () => {
  alert("Logout feature will be handled with sessions in future.");
  location.href = "login.html";
});
