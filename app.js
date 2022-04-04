const bal = document.getElementById('balance')
const moneyPlus = document.getElementById('money-plus')
const moneyMinus = document.getElementById('money-minus')
const form = document.getElementById('form')
const text = document.getElementById('text')
const amount = document.getElementById('amount')

// const dummyTransactions = [
//   { id: 1, text: 'flower', amount: -20 },
//   { id: 2, text: 'salary', amount: 300 },
//   { id: 3, text: 'books', amount: -10 },
//   { id: 4, text: 'camera', amount: 150 },
// ]

const localStorageTransactions = JSON.parse(
  localStorage.getItem('transactions')
)

let transactions =
  localStorage.getItem('transactions') !== null ? localStorageTransactions : []

function addTransaction(e) {
  e.preventDefault()

  if (text.value.trim() === '' || amount.value.trim() === '') {
    alert('Please enter valid data')
  } else {
    const transaction = {
      id: generateId(),
      text: text.value,
      amount: +amount.value,
    }

    transactions.push(transaction)
    addTransactionDom(transaction)

    updateValue()
    updateLocalStorage()
    text.value = ''
    amount.value = ''
  }
}

function generateId() {
  return Math.floor(Math.random() * 1000000)
}

function addTransactionDom(transaction) {
  const sign = transaction.amount < 0 ? '-' : '+'
  const item = document.createElement('li')

  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus')

  item.innerHTML = `${transaction.text} <span>${sign}${Math.abs(
    transaction.amount
  )}</span> <button class="delete-btn" onclick="removeTransaction(${
    transaction.id
  })">X</button>`

  list.appendChild(item)
}

function removeTransaction(id) {
  transactions = transactions.filter((transaction) => transaction.id !== id)

  updateLocalStorage()

  init()
}

function updateLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions))
}

//Update Data
function updateValue() {
  const amounts = transactions.map((transaction) => transaction.amount)
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2)
  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2)
  const expense = (
    amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2)

  balance.innerText = `${total} ₹`
  moneyPlus.innerText = `${income} ₹`
  moneyMinus.innerText = `${expense} ₹`
}
function init() {
  list.innerHTML = ''
  transactions.forEach(addTransactionDom)
  updateValue()
}

init()

form.addEventListener('submit', addTransaction)
