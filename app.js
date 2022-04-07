const bal = document.getElementById('balance')
const moneyPlus = document.getElementById('money-plus')
const moneyMinus = document.getElementById('money-minus')
const form = document.getElementById('form')
const text = document.getElementById('text')
const amount = document.getElementById('amount')

const localStorageTransactions = JSON.parse(
  localStorage.getItem('transactions')
)

// the above Function grabs transactions are parses them in json format for the browser which helps to prevent data loss on refresh

let transactions =
  localStorage.getItem('transactions') !== null ? localStorageTransactions : []
//this is grab the transaction from LocalStorage and check if thats not NuLL, if its null it returns an Empty Array and if not the it returns LocalStorageTransactions

function addTransaction(e) {
  e.preventDefault()

  if (text.value.trim() === '' || amount.value.trim() === '') {
    alert('Please enter valid data')
    // the above alert will be prompted if the data isnt entered and Submit action is taken
  } else {
    const transaction = {
      id: generateId(),
      text: text.value,
      amount: +amount.value,
      // using +amount.value we make sure its not a string
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
  //this functon will create an element in as a li -> give it a classname of + or - depending onthe type -> set the innerHTML of the list to Text entered and display its amount and - or + --> then it build a X button to the left of the li to give an option to delete  and AtLast
  // ---> add The li to the List Box aka UL box
}

function removeTransaction(id) {
  transactions = transactions.filter((transaction) => transaction.id !== id)

  updateLocalStorage()

  init()

  // takes an Id of the transaction and removes it by filtering all the transactions and then updates the Data
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

  rightVisibility()
}
function init() {
  list.innerHTML = ''
  transactions.forEach(addTransactionDom)
  updateValue()
}

//rightSide
const rS = document.querySelector('.rightx')

function rightVisibility() {
  if (transactions.length == 0) {
    rS.classList.add('dissapear')
    rS.classList.remove('BigBox')
  } else if (transactions.length > 0 && transactions.length < 6) {
    rS.classList.remove('dissapear')
    rS.classList.remove('BigBox')
  } else {
    rS.classList.add('BigBox')
  }
}

init()

form.addEventListener('submit', addTransaction)
