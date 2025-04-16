function calculateEarnings() {
    const views = parseFloat(document.getElementById('views').value);
    const cpm = parseFloat(document.getElementById('cpm').value);
    const type = document.getElementById('type').value;
    const labelDeal = document.getElementById('label-deal').checked;
    const bonus = parseFloat(document.getElementById('bonus').value);
    const debt = parseFloat(document.getElementById('debt').value);
    const repaymentPercent = parseFloat(document.getElementById('repayment').value);

    if (isNaN(views) || isNaN(cpm) || views <= 0 || cpm <= 0) {
        alert('Podaj poprawne wartości dla wyświetleń i CPM.');
        return;
    }

    if (isNaN(bonus) || bonus < 0) {
        alert('Podaj poprawną wartość premii (nie mniejszą niż 0).');
        return;
    }

    if (isNaN(debt) || debt < 0) {
        alert('Podaj poprawną wartość długu (nie mniejszą niż 0).');
        return;
    }

    if (isNaN(repaymentPercent) || repaymentPercent < 0 || repaymentPercent > 100) {
        alert('Procent spłaty długu musi być liczbą z zakresu 0-100.');
        return;
    }

    let earnings = (views / 1000) * cpm;

    if (type === 'music') {
        earnings *= 1.2; // Dodaj 20% dla teledysków
    }

    if (labelDeal) {
        earnings *= 0.3; // Użytkownik otrzymuje tylko 30% zarobków przy współpracy z wytwórnią
    }

    earnings += bonus; // Dodaj premię

    const repayment = (earnings * repaymentPercent) / 100; // Kwota na spłatę długu
    const remainingDebt = Math.max(debt - repayment, 0); // Aktualny dług po spłacie
    const finalEarnings = earnings - repayment; // Zarobki po odjęciu spłaty długu

    document.getElementById('result').innerText = `
        Szacowane zarobki: ${earnings.toFixed(2)} zł
        Spłata długu: ${repayment.toFixed(2)} zł
        Pozostały dług: ${remainingDebt.toFixed(2)} zł
        Zarobki po spłacie długu: ${finalEarnings.toFixed(2)} zł
    `;
}