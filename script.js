const balance = document.getElementById(
  "balance"
);
const money_plus = document.getElementById(
  "money-plus"
);
const money_minus = document.getElementById(
  "money-minus"
);
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");
// const dummyTransactions = [
//   { id: 1, text: "Flower", amount: -20 },
//   { id: 2, text: "Salary", amount: 300 },
//   { id: 3, text: "Book", amount: -10 },
//   { id: 4, text: "Camera", amount: 150 },
// ];

// let transactions = dummyTransactions;

//last 
const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));

let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];


async function addTransaction(e){
try{
  e.preventDefault();
  if(text.value.trim() === '' || amount.value.trim() === ''){
    alert('please add text and amount')
  }else{
    const transaction = await {
      id:generateID(),
      text:text.value,
      amount:+amount.value
    }

    transactions.push(transaction);

    addTransactionDOM(transaction);
    updateValues();
    updateLocalStorage();
    text.value='';
    amount.value='';
  }
}catch(err){
  console.log(err);
}   
}


//5.5
//Generate Random ID
function generateID(){
return  Math.floor(Math.random()*1000000000);
}

//2

//Add Trasactions to DOM list
async  function addTransactionDOM(transaction) {
  //GET sign
  try{
    const sign = await  transaction.amount < 0 ? "-" : "+";
    const item =  await  document.createElement("li");
  
    //Add Class Based on Value
    item.classList.add(
      transaction.amount < 0 ? "minus" : "plus"
    );
  
    item.innerHTML = `
      ${transaction.text} <span>${sign}${Math.abs(
      transaction.amount
      )}</span>
      <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
      `;
    list.appendChild(item);
  } catch (err){
    console.log(err);
  }
}

//4

//Update the balance income and expence
async function updateValues() {
try{
  const amounts = await transactions.map(
    (transaction) => transaction.amount
  );
  const total = await amounts
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
  const income = await  amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
    const expense = (amounts
      .filter((item) => item < 0)
      .reduce((acc, item) => (acc += item), 0) *
    -1).toFixed(2);

    balance.innerText=`$${total}`;
    money_plus.innerText = `$${income}`;
    money_minus.innerText = `$${expense}`;
} catch (e) {
  console.log(e);
  }
}


//6 
//Remove Transaction by ID
async function removeTransaction(id){
  try{
    transactions = transactions.filter(transaction => transaction.id !== id);
    updateLocalStorage();
    Init();
  } catch (e){
    console.log(e)
  }
   
  }
  //last
  //update Local Storage Transaction
   function updateLocalStorage(){
     localStorage.setItem('transactions',JSON.stringify(transactions));
  }
  
  //3
  
  //Init App
  async function Init() {
  try{
    list.innerHTML = "";
    await transactions.forEach(addTransactionDOM);
     updateValues();
  } catch (err) {
    console.log(err);
}
 
}

Init();

form.addEventListener('submit',addTransaction);