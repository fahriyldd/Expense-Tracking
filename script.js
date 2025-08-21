// HTML öğelerini seçiyoruz
const amountInput = document.getElementById("amountInput");
const categoryInput = document.getElementById("categoryInput");
const descriptionInput = document.getElementById("descriptionInput");
const addExpenseBtn = document.getElementById("addExpenseBtn");
const expenseList = document.getElementById("expenseList");
const totalAmountDisplay = document.getElementById("totalAmount");

// Harcama ekleme fonksiyonu
function addExpense() {
  const amount = parseFloat(amountInput.value);
  const category = categoryInput.value.trim();
  const description = descriptionInput.value.trim();

  if (isNaN(amount) || amount <= 0) {
    alert("Lütfen geçerli bir harcama miktarı girin!");
    return;
  }
  if (category === "") {
    alert("Lütfen bir kategori seçin!");
    return;
  }
  if (description === "") {
    alert("Açıklama boş bırakılamaz!");
    return;
  }

  const newExpense = { amount, category, description };

  // Harcamayı listeye ekle
  displayExpense(newExpense);

  // Harcamayı localStorage'a kaydet
  saveExpense(newExpense);

  // Inputları sıfırla
  amountInput.value = "";
  categoryInput.value = "";
  descriptionInput.value = "";

  // Toplam harcamayı güncelle
  updateTotalAmount();
}

// Harcamayı localStorage'a kaydetme fonksiyonu
function saveExpense(expense) {
  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  expenses.push(expense);
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

// Harcamayı listede gösterme fonksiyonu
function displayExpense(expense, index) {
  const li = document.createElement("li");
  li.innerHTML = `
    <span class="expense-info">
      <strong>${expense.category}</strong> - 
      <span class="amount">${expense.amount} TL</span> - 
      <span class="description">${expense.description}</span>
    </span>
    <button class="delete-btn" onclick="deleteExpense(${index})">Sil</button>
  `;
  expenseList.appendChild(li);
}

// Harcamayı silme fonksiyonu
function deleteExpense(index) {
  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  expenses.splice(index, 1); // localStorage'tan sil
  localStorage.setItem("expenses", JSON.stringify(expenses));
  loadExpenses(); // listeyi yeniden yükle
  updateTotalAmount();
}

// Toplam harcama hesaplama fonksiyonu
function updateTotalAmount() {
  const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);
  totalAmountDisplay.textContent = total.toFixed(2);
}

// Harcamaları sayfada göstermek için
function loadExpenses() {
  expenseList.innerHTML = ""; // öncekileri temizle
  const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  expenses.forEach((expense, index) => displayExpense(expense, index));
}

// Event listener
addExpenseBtn.addEventListener("click", addExpense);

// Enter tuşu ile harcama ekleme
descriptionInput.addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    addExpense();
  }
});

// Sayfa yüklendiğinde harcamaları yükle ve toplamı göster
window.addEventListener("DOMContentLoaded", () => {
  loadExpenses();
  updateTotalAmount();
});
