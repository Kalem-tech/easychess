// Realistic rain effect for background
(function() {
    const rainContainer = document.getElementById('rain-container');
    if (!rainContainer) return;

    const raindropCount = 200; // More raindrops for realistic heavy rain
    const raindrops = [];
    
    // Wind effect - slight angle for realism
    const windAngle = -8; // Degrees (negative = wind from right)
    const windStrength = Math.random() * 15 + 10; // Variable wind

    // Add lightning effect (inside rain container so it hides with rain when theme changes)
    function createLightning() {
        const lightning = document.createElement('div');
        lightning.className = 'lightning';
        lightning.id = 'lightning-effect';
        rainContainer.appendChild(lightning);
        
        // Random lightning strikes with more variation
        setInterval(() => {
            if (Math.random() > 0.75) { // 25% chance
                const intensity = 0.15 + Math.random() * 0.2;
                lightning.style.opacity = '0';
                setTimeout(() => {
                    lightning.style.opacity = intensity.toString();
                    setTimeout(() => {
                        lightning.style.opacity = (intensity * 0.5).toString();
                        setTimeout(() => {
                            lightning.style.opacity = '0';
                        }, 50);
                    }, 30);
                }, 20);
            }
        }, 2000 + Math.random() * 4000); // Variable timing
    }

    // Create realistic raindrops
    function createRaindrop() {
        const raindrop = document.createElement('div');
        
        // More realistic size distribution
        const sizeRandom = Math.random();
        let className = 'raindrop';
        let width, height;
        
        if (sizeRandom < 0.1) {
            // Small drops (10%)
            className = 'raindrop small';
            width = 1 + Math.random() * 0.5;
            height = 8 + Math.random() * 5;
        } else if (sizeRandom < 0.3) {
            // Fast/thin drops (20%)
            className = 'raindrop fast';
            width = 1.2 + Math.random() * 0.3;
            height = 12 + Math.random() * 6;
        } else if (sizeRandom > 0.85) {
            // Large/heavy drops (15%)
            className = 'raindrop heavy';
            width = 2.5 + Math.random() * 1;
            height = 25 + Math.random() * 10;
        } else {
            // Normal drops (55%)
            width = 1.8 + Math.random() * 0.7;
            height = 18 + Math.random() * 8;
        }
        
        raindrop.className = className;
        raindrop.style.width = width + 'px';
        raindrop.style.height = height + 'px';
        
        // Spawn at random vertical positions so rain feels natural (not all from one line at top)
        // Range: above viewport to below so drops appear mid-fall and at different heights
        const startTop = (Math.random() * 140 - 25); // -25vh to 115vh
        raindrop.style.top = startTop + 'vh';
        const left = Math.random() * 100;
        raindrop.style.left = left + '%';
        
        // Realistic animation duration (faster = more realistic)
        const baseSpeed = height < 15 ? 0.4 : height > 25 ? 0.2 : 0.3;
        const duration = baseSpeed + Math.random() * 0.3;
        raindrop.style.animationDuration = duration + 's';
        
        // Random delay so drops are at different phases (some already falling when they appear)
        const delay = Math.random() * (duration * 0.9); // 0 to ~90% of duration
        raindrop.style.animationDelay = '-' + delay + 's'; // negative = start mid-animation
        
        // Realistic opacity (larger drops more visible)
        const opacity = height > 25 ? 0.7 + Math.random() * 0.2 : 
                       height < 15 ? 0.3 + Math.random() * 0.3 : 
                       0.5 + Math.random() * 0.3;
        raindrop.style.opacity = opacity;
        
        // Wind effect - angle and drift
        const windDrift = windStrength + (Math.random() - 0.5) * 10;
        raindrop.style.setProperty('--wind-angle', windAngle + 'deg');
        raindrop.style.setProperty('--wind-drift', windDrift + 'px');
        
        // Add slight blur for motion effect
        const blur = 0.5 + Math.random() * 0.5;
        raindrop.style.filter = `blur(${blur}px)`;
        
        rainContainer.appendChild(raindrop);
        raindrops.push(raindrop);
        
        // Remove after one full animation cycle and spawn a new drop (delay is negative = phase offset)
        const totalTime = duration * 1000;
        setTimeout(() => {
            if (raindrop.parentNode) {
                raindrop.parentNode.removeChild(raindrop);
                const index = raindrops.indexOf(raindrop);
                if (index > -1) {
                    raindrops.splice(index, 1);
                }
            }
            // Create new raindrop to maintain continuous rain
            createRaindrop();
        }, totalTime);
    }

    // Initialize rain with staggered timing
    for (let i = 0; i < raindropCount; i++) {
        setTimeout(() => {
            createRaindrop();
        }, i * 20); // Faster stagger for more density
    }

    // Initialize lightning
    createLightning();
    
    // Periodically adjust wind for realism
    setInterval(() => {
        const newWindAngle = -8 + (Math.random() - 0.5) * 4;
        const newWindStrength = Math.random() * 15 + 10;
        // Update all existing raindrops
        raindrops.forEach(drop => {
            if (drop && drop.parentNode) {
                drop.style.setProperty('--wind-angle', newWindAngle + 'deg');
                drop.style.setProperty('--wind-drift', (newWindStrength + (Math.random() - 0.5) * 10) + 'px');
            }
        });
    }, 5000);
})();
