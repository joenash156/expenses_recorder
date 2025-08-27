const API_BASE =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1"
    ? "http://localhost:5000/api/expenses"
    : "https://expenses-recorder-n99u.vercel.app/api/expenses";

const messageContainer = document.getElementById("message-container");
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
            <button onClick="
              openUpdateExpenseForm(${expenses[i].id});
            " class='btn btn-edit'>
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
window.openUpdateExpenseForm = openUpdateExpenseForm;

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
    .then(() => {
      messageContainer.innerHTML = `<p class="success-message">Expense added successfully!</p>`;
    })
    .catch((err) => {
      console.error("Failed to insert expenses to database!:", err);
    });
}

// grab elements used neccessary for the update
const updateExpenseFormContainer = document.getElementById(
  "update-expense-form-container"
);
const overlay = document.getElementById("overlay");
// grab the inputs
let updateTypeInput = document.getElementById("update-type-option");
let updateTitleInput = document.getElementById("update-title-input");
let updateDescriptionInput = document.getElementById(
  "update-description-input"
);
let updateAmountInput = document.getElementById("update-amount-input");

let currentUpdateId = null;

// function to open the update form
function openUpdateExpenseForm(id) {
  currentUpdateId = id;

  if (
    updateExpenseFormContainer.classList.contains(
      "update-expense-form-container"
    )
  ) {
    updateExpenseFormContainer.classList.remove(
      "update-expense-form-container"
    );
    updateExpenseFormContainer.classList.add(
      "update-expense-form-container-active"
    );
    overlay.classList.remove("overlay");
    overlay.classList.add("overlay-active");
  }

  fetch(`${API_BASE}/${id}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.success) {
        const expense = data.data;

        updateTypeInput.value = expense.type;
        updateTitleInput.value = expense.title;
        updateDescriptionInput.value = expense.description;
        updateAmountInput.value = expense.amount;

        updateExpense(expense.id);
      }
    });
}

// grab the elements for closing
const closeBtn = document.getElementById("close-btn");

closeBtn.addEventListener("click", closeUpdateExpenseForm);

function closeUpdateExpenseForm() {
  updateExpenseFormContainer.classList.add("update-expense-form-container");
  updateExpenseFormContainer.classList.remove(
    "update-expense-form-container-active"
  );
  overlay.classList.add("overlay");
  overlay.classList.remove("overlay-active");
}

// function to update the expense
function updateExpense(currentUpdateId) {
  const updateExpenseForm = document.getElementById("update-expense-form");

  updateExpenseForm.addEventListener("submit", handleUpdateSubmit);

  function handleUpdateSubmit() {
    //event.preventDefault();

    const updateType = updateTypeInput.value;
    const updateTitle = updateTitleInput.value;
    const updateDescription = updateDescriptionInput.value;
    const updateAmount = updateAmountInput.value;

    const updatedExpense = {
      type: updateType,
      title: updateTitle,
      description: updateDescription,
      amount: updateAmount,
    };

    fetch(`${API_BASE}/${currentUpdateId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedExpense),
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => {
        console.error("Failed to update expense:", err);
      });
  }
}
