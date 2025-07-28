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

  // Geçerli girişler yapıldığından emin olalım
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

  const newExpense = {
    amount: amount,
    category: category,
    description: description,
  };

  // Harcamayı listeye ekle
  displayExpense(newExpense);

  // Harcamayı localStorage'a kaydet
  saveExpense(newExpense);

  // Inputları sıfırlayalım
  amountInput.value = "";
  categoryInput.value = "";
  descriptionInput.value = "";

  // Toplam harcamayı güncelle
  updateTotalAmount(amount);
}

// Harcamayı listede gösterme fonksiyonu
function displayExpense(expense) {
  const li = document.createElement("li");
  li.innerHTML = `${expense.category} - ${expense.amount} TL - ${expense.description} 
                  <button onclick="deleteExpense(this, ${expense.amount})">Sil</button>`;
  expenseList.appendChild(li);
}

// Harcamayı silme fonksiyonu
function deleteExpense(button, amount) {
  const li = button.parentElement;
  expenseList.removeChild(li);

  // Silinen harcamayı toplamdan çıkaralım
  updateTotalAmount(amount, "subtract");
}

// Toplam harcama hesaplama fonksiyonu
function updateTotalAmount(amount = 0, action = "add") {
  let totalAmount = parseFloat(localStorage.getItem("totalAmount") || "0");

  if (action === "subtract") {
    totalAmount -= amount;
  } else {
    totalAmount += amount;
  }

  totalAmountDisplay.textContent = totalAmount;
  localStorage.setItem("totalAmount", totalAmount);
}

// Harcamaları localStorage'a kaydetme fonksiyonu
function saveExpense(expense) {
  const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  expenses.push(expense);
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

// Harcamaları sayfada göstermek için
function loadExpenses() {
  const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  expenses.forEach(displayExpense);
}

// Event listener
addExpenseBtn.addEventListener("click", addExpense);

// Sayfa yüklendiğinde harcamaları yükle
window.addEventListener("DOMContentLoaded", loadExpenses);
