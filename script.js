const gameOutput = document.getElementById('game-output');
const optionsDiv = document.getElementById('options');
const statusDiv = document.getElementById('status');

let money = 1000;
let round = 1;

function updateStatus() {
    statusDiv.textContent = `Runda: ${round}, Pieniądze: ${money} zł`;
}

function showOptions(options) {
    optionsDiv.innerHTML = '';
    options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option.text;
        button.addEventListener('click', () => {
            money += option.effect;
            gameOutput.textContent += `\n> Wybrałeś: ${option.text}. Zmiana majątku: ${option.effect} zł.`;
            round++;
            if (money >= 1000000) {
                gameOutput.textContent += "\n\nGratulacje! Zostałeś Milionerem z Ełku!";
                optionsDiv.innerHTML = '';
            } else {
                generateRound();
            }
            updateStatus();
        });
        optionsDiv.appendChild(button);
    });
}

function generateRound() {
    const events = [
        { text: "Okazja: Kupno lokalnych akcji (ryzyko +/- 500 zł)", effect: Math.floor(Math.random() * 1001) - 500 },
        { text: "Inwestycja w kurs online (+200 zł)", effect: 200 },
        { text: "Niespodziewany wydatek na naprawę (-300 zł)", effect: -300 },
        { text: "Dobra inwestycja w nieruchomości (+1000 zł)", effect: 1000 },
        { text: "Udział w lokalnym projekcie (+150 zł)", effect: 150 },
        { text: "Pechowy dzień na giełdzie (-400 zł)", effect: -400 },
        { text: "Sprzedaż nieużywanej rzeczy (+100 zł)", effect: 100 },
        { text: "Dostałeś premię w pracy (+250 zł)", effect: 250 },
        { text: "Awaria samochodu (-500 zł)", effect: -500 },
        { text: "Wynajem mieszkania (+800 zł)", effect: 800 }
    ];

    const availableEvents = [];
    if (money < 500) {
        availableEvents.push(events[4], events[6], events[7]); // Dostępne prostsze opcje
    } else if (money < 5000) {
        availableEvents.push(...events.slice(0, 7)); // Więcej opcji
    } else {
        availableEvents.push(...events); // Wszystkie opcje
    }

    // Dodaj opcję "Nic nie robię" z niewielkim ryzykiem
    availableEvents.push({ text: "Nic nie robię (ryzyko +/- 50 zł)", effect: Math.floor(Math.random() * 101) - 50 });

    // Wybierz 2-3 losowe opcje do wyświetlenia
    const shuffledEvents = availableEvents.sort(() => 0.5 - Math.random());
    const currentOptions = shuffledEvents.slice(0, Math.floor(Math.random() * 2) + 2); // 2 lub 3 opcje

    showOptions(currentOptions);
}

// Inicjalizacja gry
gameOutput.textContent = "Witaj w Milionerze z Ełku! Zaczynasz z 1000 zł.";
updateStatus();
generateRound();
