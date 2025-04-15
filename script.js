// script.js

// Global variables
let contracts = [];
let selectedContract = null;
let channelName = "";
let cpm = 0;
let views = 0;
let subs = 0;
let cash = 0;
let isVerified = false;

// Initialize the game
function initGame() {
    generateContracts();
    updateStats();
    setupEventListeners();
}

// Generate random contracts
function generateContracts() {
    const companies = ["RapBeats Inc.", "Flow Records", "StreetKings Music", "HypeStudio"];
    const contractsContainer = document.getElementById("contracts");

    companies.forEach(company => {
        const offer = {
            company,
            advance: getRandomInt(1000, 10000),
            repaymentMultiplier: 2
        };
        contracts.push(offer);

        const contractElement = document.createElement("div");
        contractElement.className = "contract";
        contractElement.innerHTML = `
            <p><strong>${offer.company}</strong></p>
            <p>Advance: $${offer.advance}</p>
            <p>Repayment: x${offer.repaymentMultiplier}</p>
            <button onclick="chooseContract('${offer.company}')">Wybierz</button>
        `;
        contractsContainer.appendChild(contractElement);
    });
}

// Choose a contract
function chooseContract(companyName) {
    selectedContract = contracts.find(contract => contract.company === companyName);
    cash += selectedContract.advance;
    alert(`Wybrałeś kontrakt z ${selectedContract.company}. Otrzymałeś $${selectedContract.advance}!`);
    document.getElementById("contract-selection").style.display = "none";
    updateStats();
}

// Update game stats
function updateStats() {
    document.getElementById("cpm").innerText = cpm.toFixed(2);
    document.getElementById("views").innerText = views;
    document.getElementById("subs").innerText = subs;
    document.getElementById("cash").innerText = `$${cash.toFixed(2)}`;
    if (subs >= 1000000 && !isVerified) {
        isVerified = true;
        alert("Gratulacje! Twój kanał został zweryfikowany!");
    }
}

// Confirm channel name
function confirmChannelName() {
    const input = document.getElementById("channel-name");
    if (input.value.trim() === "") {
        alert("Nazwa kanału nie może być pusta!");
        return;
    }
    channelName = input.value.trim();
    cpm = getRandomInt(1, 10);
    alert(`Kanał "${channelName}" został utworzony! Twój CPM to $${cpm.toFixed(2)}.`);
    updateStats();
}

// Random integer generator
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Mod Menu activation
function activateModMenu() {
    const code = prompt("Podaj kod:");
    if (code === "7432") {
        document.getElementById("mod-menu").style.display = "block";
        alert("Mod Menu zostało odblokowane!");
    } else {
        alert("Nieprawidłowy kod!");
    }
}

// Add cash in Mod Menu
function addCash() {
    const amount = parseFloat(prompt("Ile gotówki dodać?"));
    if (!isNaN(amount) && amount > 0) {
        cash += amount;
        alert(`Dodano $${amount.toFixed(2)} do twojego konta!`);
        updateStats();
    } else {
        alert("Nieprawidłowa kwota!");
    }
}

// Become a star in Mod Menu
function becomeStar() {
    subs = 10000000; // 10 million subs
    views = 500000000; // 500 million views
    alert("Twój raper stał się gwiazdą! Gratulacje!");
    updateStats();
}

// Setup event listeners
function setupEventListeners() {
    document.getElementById("confirm-channel").addEventListener("click", confirmChannelName);
    document.getElementById("add-cash").addEventListener("click", addCash);
    document.getElementById("become-star").addEventListener("click", becomeStar);
}

// Start the game
window.onload = initGame;