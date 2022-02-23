const balance = document.getElementById('balance');
const moneyPluse = document.getElementById('money-pluse');
const moneyMinus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

// const dummyTransactions = [
//     {id : 1, text: 'Flower', amount: -20},
//     {id : 2, text: 'Salary', amount: 30000},
//     {id : 3, text: 'Book', amount: -200},
//     {id : 4, text: 'Camera', amount: 150}
// ];

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));

let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : []; 

// Add Transitions to DOM list 
function addTransactionDOM(transactions){
    //Get sign
    const sign = transactions.amount < 0 ? '-' : '+';

    // Create iteam
    const iteam = document.createElement('li');

    // Add class based on Valuw
    iteam.classList.add(transactions.amount < 0 ? 'minus' : 'pluse');

    iteam.innerHTML = `
    ${transactions.text} <span>${sign}₹${Math.abs(transactions.amount)}</span><button class="delete-btn" onclick="removeTransation(${transactions.id})">x</button>
    `;

    list.appendChild(iteam);
}

//Update the income, balance and expense
function updateValues(){
    const amount = transactions.map(amnt => amnt.amount);

    const total = amount.reduce((acc,iteam) => (acc += iteam), 0).toFixed(2);
    
    const income = (amount
                        .filter(iteam => iteam > 0)
                        .reduce((acc, iteam) => (acc +=iteam), 0)
                        .toFixed(2)* 1 );
    const expense = (amount
                        .filter(iteam => iteam < 0)
                        .reduce((acc, iteam) => (acc += iteam), 0)
                        .toFixed(2) * -1);
    
    balance.innerText = `₹${total}`;
    moneyPluse.innerText = `₹${income}`;
    moneyMinus.innerText = `₹${expense}`;

    
}
//Remove Transaction by ID
function removeTransation(id){
    transactions = transactions.filter(transaction => transaction.id !== id);

    updateLocalStorage();

    init();
}

// Add Transaction
function addTransaction(e){
    e.preventDefault();

    if(text.value.trim() === '' || amount.value.trim() === ''){
        alert('Please add Text and Amount');
    }else{
        const transaction = {
            id : generateID(),
            text : text.value,
            amount : +amount.value
        }
        transactions.push(transaction);
        addTransactionDOM(transaction);
        updateValues();

        updateLocalStorage();

        text.value ='';
        amount.value = '';
    }
}

// Generate Random ID
function generateID(){
    return Math.floor(Math.random() * 100000000);
}

// Update Local storage Transaction
function updateLocalStorage(){
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Init App
function init(){
    list.innerHTML = '';
    
    transactions.forEach(addTransactionDOM);
    updateValues();
}

init();

// Add event Listener 
form.addEventListener('submit',addTransaction);