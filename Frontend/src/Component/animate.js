// JavaScript function to generate random letters
function getRandomLetter() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789' +
    '!@#$%^&*()-_=+[]{}|;:",.<>?~`' + // Symbols and punctuation
        'αδεθικλνοπστυω'     // Greek letters
        'ΔΘΛΞΠΣΦΨΩ'                  // Greek uppercase letters
        // '∞∑√π≈≠≤≥±×÷∂∫∇Ω≡'
    return chars[Math.floor(Math.random() * chars.length)];
  }
  
  // Apply the random letter cycling on hover
  const letters = document.querySelectorAll('.glitch-letter');
  
  letters.forEach(letter => {
    let originalText = letter.innerText;
    let interval;
  
    letter.addEventListener('mouseenter', () => {
      interval = setInterval(() => {
        letter.innerText = getRandomLetter();
      }, 50); // Change letter every 50ms (adjust for speed)
    });
  
    letter.addEventListener('mouseleave', () => {
      clearInterval(interval);
      letter.innerText = originalText; // Revert to original letter
    });
  });

let index = 0;

function typeLetter() {
  if (index < letters.length) {
    letters[index].classList.add('show'); // Add 'show' class to reveal letter
    index++;
    setTimeout(typeLetter, 300); // Adjust delay as needed
  }
}

window.onload = () => {
  typeLetter(); // Start typing animation when window loads
};