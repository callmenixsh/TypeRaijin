document.addEventListener('mousemove', (event) => {
    createTrailLetter(event.clientX, event.clientY);
  });
  
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
  function createTrailLetter(x, y) {
    const letter = document.createElement('div');
    letter.className = 'trail-letter';
    letter.textContent = getRandomLetter();
    letter.style.left = `${x}px`;
    letter.style.top = `${y}px`;
    
    document.body.appendChild(letter);

    setTimeout(() => {
      letter.style.opacity = '0';
      letter.style.transform = `translate(${Math.random() * 80 - 40}px, ${Math.random() * 80 - 40}px)`;

      setTimeout(() => {
        letter.remove();
      }, 1000); 
    }, 0);
  }
  
  function getRandomLetter() {
    return letters.charAt(Math.floor(Math.random() * letters.length));
  }
  