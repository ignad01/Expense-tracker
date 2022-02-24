const balance = document.getElementById('balance');
const income = document.getElementById('income');
const expense = document.getElementById('expense');
const list = document.getElementById('list');
const text = document.getElementById('text');
const amount = document.getElementById('amount');
const form = document.getElementById('form');


// let dummyTransaction = [
//     {
//         id: 1,
//         text : "Flower",
//         amount : -200
//     },
//     {
//         id: 2,
//         text : "Camera",
//         amount : -3000
//     },
//     {
//         id: 3,
//         text : "Salary",
//         amount : 20000
//     }
// ]

const localStorageTransaction = JSON.parse(localStorage.getItem('transactions'));
let transactions  = localStorage.getItem('transactions') !== null ? localStorageTransaction : [];


// Add transaction to DOM History
function addTransactions(){
    list.innerHTML = transactions.map(transaction =>
        `
            <li class="${transaction.amount < 0 ? `money_minus` : `money_pluse`}">
                ${transaction.text} <span>${transaction.amount < 0 ? `-` : `+`}₹${Math.abs(transaction.amount)}</span><button class="delete-btn" onclick="removeTransaction(${transaction.id})" >x</button>
            </li>
        `).join('');
        
    updateBalance();
}

// update income, expense and balance
function updateBalance(){
    const amount = transactions.map(transaction => transaction.amount);
    let toatlExpense = amount.filter(iteam => iteam < 0);
    let totalIncome = amount.filter(iteam => iteam > 0);
    
    balance.innerText = `₹` + amount.reduce((acc, iteam) => (acc += iteam), 0);
    income.innerHTML = `₹${totalIncome.reduce((acc, iteam) => (acc += iteam), 0)*1}`;
    expense.innerHTML = `₹${toatlExpense.reduce((acc,iteam) => (acc += iteam), 0)*-1}`; 
}

// remove transaction
function removeTransaction(id){
    transactions = transactions.filter(transaction => transaction.id !== id);

    addTransactions();
    updateLocalStorage();
}

addTransactions();

function updateTransaction(e){
    e.preventDefault();
    
    if( text.value === '' || amount.value === ''){
        alert("Please add some text and amount");
    }else{
        transactions.push({
            id : getRandomID(),
            text : text.value,
            amount : +amount.value
        });

        addTransactions();
        updateLocalStorage();
        text.value = '';
        amount.value = '';
    }
}

// Update Local Storage 
function updateLocalStorage(){
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Generate Random ID 
function getRandomID(){
    return Math.floor(Math.random() * 100000000);
}
// Add event listener
form.addEventListener('submit',updateTransaction);