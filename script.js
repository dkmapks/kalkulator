let money = 200000;
let loan = 0;
let properties = [];
let modActive = false;

function updateStats() {
  document.getElementById('money').innerText = money.toFixed(2);
  document.getElementById('loan').innerText = loan.toFixed(2);
}

function generateProperty() {
  const types = ['Mieszkanie', 'Dom'];
  const conditions = ['Stan surowy', 'Gotowy do zamieszkania'];
  const type = types[Math.floor(Math.random() * types.length)];
  const condition = conditions[Math.floor(Math.random() * conditions.length)];
  const area = Math.floor(Math.random() * 100) + 50; // powierzchnia od 50 do 150 m2
  const pricePerM2 = Math.floor(Math.random() * 3000) + 3000; // cena od 3000 do 6000 zł/m2
  const price = area * pricePerM2;

  const property = {
    type,
    condition,
    area,
    price,
  };

  properties.push(property);
  displayProperties();
}

function displayProperties() {
  const propertiesDiv = document.getElementById('properties');
  propertiesDiv.innerHTML = '';
  properties.forEach((property, index) => {
    const propertyDiv = document.createElement('div');
    propertyDiv.className = 'property';
    propertyDiv.innerHTML = `
      <p>Typ: ${property.type}</p>
      <p>Stan: ${property.condition}</p>
      <p>Powierzchnia: ${property.area} m²</p>
      <p>Cena: ${property.price.toFixed(2)} zł</p>
      <button onclick="buyProperty(${index})">Kup</button>
    `;
    propertiesDiv.appendChild(propertyDiv);
  });
}

function buyProperty(index) {
  const property = properties[index];
  if (money >= property.price) {
    money -= property.price;
    alert('Kupiłeś nieruchomość!');
    properties.splice(index, 1);
    displayProperties();
    updateStats();
  } else {
    alert('Nie masz wystarczająco pieniędzy!');
  }
}

function takeLoan() {
  const amount = parseFloat(document.getElementById('loanAmount').value);
  if (amount > 0) {
    loan += amount * 2; // Kredyt do spłaty razy dwa
    money += amount;
    updateStats();
  } else {
    alert('Wprowadź poprawną kwotę kredytu.');
  }
}

function depositSavings() {
  const amount = parseFloat(document.getElementById('savingsAmount').value);
  if (amount > 0 && money >= amount) {
    money -= amount;
    setTimeout(() => {
      money += amount * 1.05; // Oprocentowanie 5%
      updateStats();
      alert('Lokata zakończona!');
    }, 300000); // 5 minut
    updateStats();
  } else {
    alert('Nie masz wystarczająco pieniędzy lub kwota jest niepoprawna.');
  }
}

function activateMod() {
  const code = document.getElementById('modCode').value;
  if (code === '2500') {
    modActive = true;
    money += 1000000; // Dodaj milion złotych
    updateStats();
    alert('Mod Menu Aktywowane!');
  } else {
    alert('Niepoprawny kod.');
  }
}

updateStats();