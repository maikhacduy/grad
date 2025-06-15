document.addEventListener('DOMContentLoaded', function() {
    // Create optimized confetti for mobile
    createConfetti();

    // Handle sound with user interaction
    document.body.addEventListener('click', function handleFirstInteraction() {
        const audio = document.getElementById('confetti-sound');
        audio.volume = 0.2;
        audio.play().catch(e => console.log("Audio play prevented:", e));
        document.body.removeEventListener('click', handleFirstInteraction);
    }, { once: true });
});

function createConfetti() {
    const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', 
                   '#2196f3', '#03a9f4', '#00bcd4', '#4CAF50', '#FFEB3B', 
                   '#FFC107', '#FF9800'];
    const confettiContainer = document.querySelector('.confetti');
    const particleCount = window.innerWidth < 768 ? 60 : 100;
    
    for (let i = 0; i < particleCount; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti-piece');
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = -10 + 'px';
        confetti.style.width = (Math.random() * 8 + 4) + 'px';
        confetti.style.height = (Math.random() * 8 + 4) + 'px';
        
        const animationDuration = Math.random() * 3 + 2;
        const animationName = 'fall-' + i;
        
        const keyframes = `
            @keyframes ${animationName} {
                to {
                    transform: translateY(120vh) rotate(${Math.random() * 360}deg);
                    opacity: ${Math.random()};
                    left: ${Math.random() * 100}vw;
                }
            }
        `;
        
        confetti.style.animation = `${animationName} ${animationDuration}s linear forwards`;
        
        const style = document.createElement('style');
        style.innerHTML = keyframes;
        document.head.appendChild(style);
        
        confettiContainer.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
            style.remove();
        }, animationDuration * 1000);
    }
}

document.addEventListener('dblclick', function(e) {
    e.preventDefault();
}, { passive: false });