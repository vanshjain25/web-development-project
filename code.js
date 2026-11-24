const expenseName = document.querySelector("#expenseName");
const expenseAmount = document.querySelector("#expenseAmount");
const expenseCategory = document.querySelector("#expenseCategory");
const filterCategory = document.querySelector("#filterCategory");
const addButton = document.querySelector("#addBtn");
const expenseList = document.querySelector("#expenseList");
const totalAll = document.querySelector("#totalAll");
const totalShown = document.querySelector("#totalShown");
const errorMessage = document.querySelector("#errorMsg");

const expenses = [];

function updateTotals() {
  const selectedCategory = filterCategory.value;
  const allTotal = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const shownExpenses = selectedCategory === "All"
    ? expenses
    : expenses.filter((expense) => expense.category === selectedCategory);
  const shownTotal = shownExpenses.reduce((sum, expense) => sum + expense.amount, 0);

  totalAll.textContent = allTotal;
  totalShown.textContent = shownTotal;
}

function renderExpenses() {
  const selectedCategory = filterCategory.value;
  expenseList.innerHTML = "";

  expenses
    .filter((expense) => selectedCategory === "All" || expense.category === selectedCategory)
    .forEach((expense) => {
      const item = document.createElement("li");
      item.textContent = `${expense.name} - ${expense.category}: ₹${expense.amount}`;
      expenseList.appendChild(item);
    });

  updateTotals();
}

addButton.addEventListener("click", () => {
  const name = expenseName.value.trim();
  const amount = Number(expenseAmount.value);

  if (!name || !expenseAmount.value || amount <= 0) {
    errorMessage.textContent = "Enter an expense name and a valid amount.";
    return;
  }

  expenses.push({
    name,
    amount,
    category: expenseCategory.value
  });

  expenseName.value = "";
  expenseAmount.value = "";
  errorMessage.textContent = "";
  renderExpenses();
});

filterCategory.addEventListener("change", renderExpenses);