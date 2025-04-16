function calculateEarnings() {
    const views = parseFloat(document.getElementById('views').value);
    const cpm = parseFloat(document.getElementById('cpm').value);
    const type = document.getElementById('type').value;

    if (isNaN(views) || isNaN(cpm) || views <= 0 || cpm <= 0) {
        alert('Podaj poprawne wartości dla wyświetleń i CPM.');
        return;
    }

    let earnings = (views / 1000) * cpm;

    if (type === 'music') {
        earnings *= 1.2; // Dodaj 20% dla teledysków
    }

    document.getElementById('result').innerText = `Szacowane zarobki: ${earnings.toFixed(2)} zł`;
}