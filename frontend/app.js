const API_BASE = "http://localhost:5000/api/expenses";
const outputElement = document.getElementById("output-container");
const expensesContainer = document.getElementById("expenses-container");

// function to fetch expenses from database
function fetchExpenses() {
  // expensesContainer.innerHTML = "";

  fetch(API_BASE, { cache: "no-store" })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const expenses = data.data;
      for (let i = 0; i < expenses.length; i++) {
        expensesContainer.innerHTML += `
      <tr id = "expense-${expenses[i]["id"]}">
        <td>${expenses[i]["type"]}</td>
        <td>${expenses[i]["title"]}</td>
        <td><textarea>${expenses[i]["description"]}</textarea></td>
        <td>${expenses[i]["amount"].toFixed(2)}</td>
        <td class='action-btn-container'>
          <button onClick="
            deleteExpense(${expenses[i].id});
          " class="btn btn-danger">
            <i class='fas fa-trash'></i>
          </button>
            <button onClick="" class='btn btn-edit'>
              <i class='fas fa-edit'></i>
            </button>
        </td>
      </tr>
    `;
      }
    })
    .catch((err) => {
      console.error("Error fetching expenses:", err);
    });
}

fetchExpenses();

// function to delete expense from database
function deleteExpense(id) {
  fetch(`${API_BASE}/${id}`, { method: "DELETE" })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.success) {
        const row = document.getElementById(`expense-${id}`);
        if (row) {
          row.remove();
        } else {
          console.log("Failed to delete:", data.message || "Unknown error");
        }
      }
    })
    .catch((err) => {
      console.error("Error deleting expense:", err);
    });
}

// make the delete funciton a global variable
window.deleteExpense = deleteExpense;

// grab the form
const expenseForm = document.getElementById("expense-form");

// add event listener to the form to handle submit
expenseForm.addEventListener("submit", handleFormSubmit);

// function to handle the form submit
function handleFormSubmit() {
  //event.preventDefault();

  // grab values of inputs in form

  let titleInput = document.getElementById("title-input");
  let descriptionInput = document.getElementById("description-input");
  let amountInput = document.getElementById("amount-input");

  const type = document.getElementById("type-options").value;
  const title = titleInput.value;
  const description = descriptionInput.value;
  const amount = amountInput.value;

  const expense = {
    type,
    title,
    description,
    amount,
  };

  fetch(API_BASE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(expense),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.error("Failed to insert expenses to database!:", err);
    });
}

// function to update the database
function updateExpense(id) {}
