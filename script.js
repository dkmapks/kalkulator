function calculateEarnings() {
    const views = parseFloat(document.getElementById('views').value);
    const cpm = parseFloat(document.getElementById('cpm').value);
    const type = document.getElementById('type').value;
    const labelDeal = document.getElementById('label-deal').checked;
    const bonus = parseFloat(document.getElementById('bonus').value);
    const fixedCosts = parseFloat(document.getElementById('fixed-costs').value);
    const variableCosts = parseFloat(document.getElementById('variable-costs').value);
    const growthRate = parseFloat(document.getElementById('growth-rate').value);
    const months = parseInt(document.getElementById('months').value);
    const sponsoredVideos = parseInt(document.getElementById('sponsored-videos').value);
    const sponsorshipRate = parseFloat(document.getElementById('sponsorship-rate').value);

    if (isNaN(views) || isNaN(cpm) || views <= 0 || cpm <= 0) {
        alert('Podaj poprawne wartości dla wyświetleń i CPM.');
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
    const netEarnings = earnings - fixedCosts - variableCosts; // Zarobki netto po kosztach

    // Oblicz zarobki ze sponsorowanych filmów
    let sponsorshipEarnings = 0;
    if (!isNaN(sponsoredVideos) && !isNaN(sponsorshipRate)) {
        sponsorshipEarnings = sponsoredVideos * sponsorshipRate;
    }

    const totalEarnings = netEarnings + sponsorshipEarnings;

    // Wyświetl wyniki
    let resultText = `
        Szacowane zarobki: ${earnings.toFixed(2)} zł
        Zarobki netto (po kosztach): ${netEarnings.toFixed(2)} zł
        Zarobki ze sponsorowanych filmów: ${sponsorshipEarnings.toFixed(2)} zł
        Całkowite zarobki (netto + sponsorzy): ${totalEarnings.toFixed(2)} zł
    `;

    // Przewidywanie wzrostu kanału
    if (!isNaN(growthRate) && !isNaN(months) && months > 0) {
        const growthData = simulateGrowth(views, growthRate, months);
        resultText += '\nPrzewidywany wzrost wyświetleń:\n';
        growthData.forEach(data => {
            resultText += `Miesiąc ${data.month}: ${data.views} wyświetleń\n`;
        });
    }

    document.getElementById('result').innerText = resultText;
}

function simulateGrowth(initialViews, growthRate, months) {
    let views = initialViews;
    const growthData = [];

    for (let i = 1; i <= months; i++) {
        views += views * (growthRate / 100);
        growthData.push({ month: i, views: Math.round(views) });
    }

    return growthData;
}