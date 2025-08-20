const selectElement = document.getElementById("type-options");
const addBtn = document.getElementById("add-btn");
const titleElement = document.getElementById("title-input");
const descriptionElement = document.getElementById("description-input");
const amountElement = document.getElementById("amount-input");
const expensesContainer = document.getElementById("expenses-container");
const message = document.getElementById("message-container");

const expenses = JSON.parse(localStorage.getItem("expenses")) || [
  {
    type: "expenses",
    title: "test",
    description: "I want to test",
    amount: 100,
  },
  {
    type: "income",
    title: "payment",
    description: "recieved something small",
    amount: 2500,
  },
];

// console.log(JSON.parse(localStorage.getItem("expenses")))

function renderExpenses() {
  expensesContainer.innerHTML = "";

  for (let i = 0; i < expenses.length; i++) {
    //console.log(expenses[i]);

    expensesContainer.innerHTML += `
    <tr>
      <td>${expenses[i]["type"]}</td>
      <td>${expenses[i]["title"]}</td>
      <td><textarea>${expenses[i]["description"]}</textarea></td>
      <td>${expenses[i]["amount"].toFixed(2)}</td>
      <td>
        <button onClick="
          deleteExpense(${i});
        " class="btn btn-danger">
          <i class='fas fa-trash'></i>
          Delete
        </button>
      </td>
    </tr>
    
    `;
  }
}

renderExpenses();

function deleteExpense(index) {
  expenses.splice(index, 1);
  localStorage.setItem("expenses", JSON.stringify(expenses));
  renderExpenses();
}

addBtn.addEventListener("click", addExpense);

function addExpense() {
  if (
    titleElement.value !== "" &&
    descriptionElement.value !== "" &&
    amountElement.value !== ""
  ) {
    let type = selectElement.value;
    const title = titleElement.value;
    const description = descriptionElement.value;
    const amount = parseInt(amountElement.value);

    expenses.push({
      type,
      title,
      description,
      amount,
    });

    localStorage.setItem("expenses", JSON.stringify(expenses));

    titleElement.value = "";
    descriptionElement.value = "";
    amountElement.value = "";

    message.innerHTML =
      "<p class='success-message'>You added an expense successfully!</p>";
    setTimeout(() => {
      message.innerHTML = "";
    }, 2000);

    renderExpenses();
  } else {
    message.innerHTML = "<p class='error-message'>Please input all fields!</p>";

    setTimeout(() => {
      message.innerHTML = "";
    }, 5000);
  }
}
