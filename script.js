document.getElementById('loveForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const name1 = document.getElementById('name1').value.trim().toLowerCase();
  const name2 = document.getElementById('name2').value.trim().toLowerCase();

  const specialPairs = [
    { first: "amelia", second: "dominik" },
    { first: "amelka", second: "dominik" },
    { first: "amelcia", second: "dominik" }
  ];

  const badPairs = [
    { first: "amelia", second: "szymon" },
    { first: "amelka", second: "szymon" },
    { first: "amelcia", second: "szymon" }
  ];

  let resultText;
  const resultDiv = document.getElementById('result');

  // Check for bad pairs
  const isBadPair = badPairs.some(pair =>
    (pair.first === name1 && pair.second === name2) ||
    (pair.first === name2 && pair.second === name1)
  );

  if (isBadPair) {
    resultText = `Miłość między ${capitalize(name1)} i ${capitalize(name2)} wynosi 0%! 👎🏻👎🏻👎🏻`;
    resultDiv.classList.add('shake'); // Add shake animation
  } else {
    // Check for special pairs
    const isSpecialPair = specialPairs.some(pair =>
      (pair.first === name1 && pair.second === name2) ||
      (pair.first === name2 && pair.second === name1)
    );

    if (isSpecialPair) {
      resultDiv.classList.remove('shake'); // Remove shake if present
      resultText = `Miłość między ${capitalize(name1)} i ${capitalize(name2)} wynosi 100%! ❤️`;
    } else {
      resultDiv.classList.remove('shake'); // Remove shake if present
      const randomPercentage = Math.floor(Math.random() * 101);
      resultText = `Miłość między ${capitalize(name1)} i ${capitalize(name2)} wynosi ${randomPercentage}%.`;
    }
  }

  resultDiv.textContent = resultText;
});

// Capitalize the first letter of names
function capitalize(name) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}
