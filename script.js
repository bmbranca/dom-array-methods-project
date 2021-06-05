const addUserBtn = document.getElementById('add-user');
const main = document.getElementById('main');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

//Fetches random person from API and adds money
async function getRandomUser() {
  const res = await fetch('https://randomuser.me/api');
  const data = await res.json();

  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000)
  };

  addData(newUser);
}

//MAP
function doubleMoney() {
  data = data.map(user => {
    return {
      ...user,
      money: user.money * 2
    };
  });
  updateDOM();
}

//SORT
function sortByRichest() {
  data.sort((a, b) => b.money - a.money);

  updateDOM();
}

//FILTER
function showMillionaires() {
  data = data.filter(user => user.money > 1000000);

  updateDOM();
}

//REDUCE
function calculateWealth() {
  const wealth = data.reduce((acc, user) => (acc += user.money), 0);

  const wealthEl = document.createElement('div');
  wealthEl.innerHTML = `<h3>Wealth: <strong>${formatMoney(
    wealth
  )}</strong></h3>`;
  main.appendChild(wealthEl);
}

//Adds a new object to the data array
function addData(obj) {
  data.push(obj);
  updateDOM();
}

//FOR EACH
function updateDOM(providedData = data) {
  //clear main
  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';
  //For each: loops thru data array, creates a new div FOR EACH person
  providedData.forEach(item => {
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(
      item.money
    )}`;
    main.appendChild(element);
  });
}

function formatMoney(number) {
  return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// Event Listeners
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);

//Array methods: Run functions on each item in array

//For each does the same as a for loop, only cleaner
//Map() does the same as forEach BUT it RETURNS a new array with the results of the callback function
