const bal = document.getElementById('balance')
const moneyPlus = document.getElementById('money-plus')
const moneyMinus = document.getElementById('money-minus')
const form = document.getElementById('form')
const text = document.getElementById('text')
const amount = document.getElementById('amount')

const dummyTransactions = [
  { id: 1, text: 'flower', amount: -20 },
  { id: 2, text: 'salary', amount: 300 },
  { id: 3, text: 'books', amount: -10 },
  { id: 4, text: 'camera', amount: 150 },
]

let transactions = dummyTransactions

function addTransactionDom(transaction) {
  const sign = transaction.amount < 0 ? '-' : '+'
  const item = document.createElement('li')

  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus')

  item.innerHTML = `${transaction.text} <span>${sign}${Math.abs(
    transaction.amount
  )}</span> <button class="delete-btn"></button>`

  list.appendChild(item)
}

function init() {
  list.innerHTML = ''
  transactions.forEach(addTransactionDom)
  updateValue()
}

init()

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
