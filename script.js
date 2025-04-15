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
let upgrades = {
    betterEquipment: { level: 0, cost: 500, boost: 1.2 },
    marketingCampaign: { level: 0, cost: 1000, boost: 1.5 },
};

// Initialize the game
function initGame() {
    generateContracts();
    updateStats();
    setupEventListeners();
    renderUpgrades();
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

// Render upgrades
function renderUpgrades() {
    const upgradesContainer = document.getElementById("upgrade-options");
    upgradesContainer.innerHTML = "";

    for (const [key, upgrade] of Object.entries(upgrades)) {
        const upgradeElement = document.createElement("div");
        upgradeElement.className = "upgrade";
        upgradeElement.innerHTML = `
            <p><strong>${key}</strong> - Poziom: ${upgrade.level}</p>
            <p>Koszt: $${upgrade.cost}</p>
            <button onclick="buyUpgrade('${key}')">Kup</button>
        `;
        upgradesContainer.appendChild(upgradeElement);
    }
}

// Buy an upgrade
function buyUpgrade(upgradeName) {
    const upgrade = upgrades[upgradeName];
    if (cash >= upgrade.cost) {
        cash -= upgrade.cost;
        upgrade.level++;
        upgrade.cost = Math.floor(upgrade.cost * 1.5);
        alert(`Ulepszyłeś ${upgradeName} do poziomu ${upgrade.level}!`);
        updateStats();
        renderUpgrades();
    } else {
        alert("Nie masz wystarczająco gotówki!");
    }
}

// Record a song
function recordSong() {
    const recordingCost = 200;
    if (cash < recordingCost) {
        alert("Nie masz wystarczająco gotówki, aby nagrać utwór!");
        return;
    }

    cash -= recordingCost;

    // Calculate views and subs based on upgrades
    let songViews = getRandomInt(10000, 50000);
    let boostMultiplier = 1;

    for (const upgrade of Object.values(upgrades)) {
        boostMultiplier *= upgrade.boost ** upgrade.level;
    }

    songViews = Math.floor(songViews * boostMultiplier);
    const songSubs = Math.floor(songViews / 10);

    views += songViews;
    subs += songSubs;

    alert(`Nagrałeś nowy utwór! Zdobyłeś ${songViews} wyświetleń i ${songSubs} subskrypcji!`);
    updateStats();
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
    document.getElementById("record-song").addEventListener("click", recordSong);
}

// Start the game
window.onload = initGame;