// Inicializar partículas
document.addEventListener('DOMContentLoaded', function() {
    // Configuración de partículas
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: "#4A90E2" },
                shape: { type: "circle" },
                opacity: { value: 0.5, random: true },
                size: { value: 3, random: true },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#00D4AA",
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "repulse" },
                    onclick: { enable: true, mode: "push" }
                }
            }
        });
    }

    // Actualizar contador de jugadores (simulado)
    updatePlayerCount();
    setInterval(updatePlayerCount, 30000); // Actualizar cada 30 segundos

    // Configurar countdown para tienda
    setupCountdown();

    // Menú móvil
    document.querySelector('.mobile-menu').addEventListener('click', function() {
        const navLinks = document.querySelector('.nav-links');
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });

    // Smooth scroll para enlaces
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Función para copiar IP
function copyIP() {
    const ipInput = document.getElementById('server-ip');
    ipInput.select();
    ipInput.setSelectionRange(0, 99999); // Para móviles
    
    navigator.clipboard.writeText(ipInput.value)
        .then(() => {
            showToast('IP copiada al portapapeles!');
        })
        .catch(err => {
            console.error('Error al copiar: ', err);
            showToast('Error al copiar la IP', 'error');
        });
}

// Mostrar toast
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastIcon = toast.querySelector('i');
    const toastText = toast.querySelector('span');
    
    // Cambiar ícono según tipo
    if (type === 'error') {
        toastIcon.className = 'fas fa-exclamation-circle';
        toast.style.background = 'var(--danger)';
    } else {
        toastIcon.className = 'fas fa-check-circle';
        toast.style.background = 'var(--success)';
    }
    
    toastText.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Actualizar contador de jugadores (simulación)
function updatePlayerCount() {
    const playerCountElement = document.getElementById('online-players');
    
    // Simular jugadores online aleatorios entre 100-200
    const basePlayers = 120;
    const randomVariation = Math.floor(Math.random() * 41) - 20; // -20 a +20
    const newCount = Math.max(80, basePlayers + randomVariation);
    
    playerCountElement.textContent = newCount;
    
    // Animación
    playerCountElement.style.transform = 'scale(1.2)';
    setTimeout(() => {
        playerCountElement.style.transform = 'scale(1)';
    }, 300);
}

// Countdown para tienda
function setupCountdown() {
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    
    // Fecha objetivo: 7 días desde ahora
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 7);
    
    function updateCountdown() {
        const now = new Date();
        const difference = targetDate - now;
        
        if (difference > 0) {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            
            daysElement.textContent = days.toString().padStart(2, '0');
            hoursElement.textContent = hours.toString().padStart(2, '0');
            minutesElement.textContent = minutes.toString().padStart(2, '0');
        } else {
            daysElement.textContent = '00';
            hoursElement.textContent = '00';
            minutesElement.textContent = '00';
        }
    }
    
    updateCountdown();
    setInterval(updateCountdown, 60000); // Actualizar cada minuto
}

// Cambiar fondo del navbar al hacer scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(15, 15, 26, 0.98)';
        navbar.style.backdropFilter = 'blur(15px)';
    } else {
        navbar.style.background = 'rgba(26, 26, 46, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    }
});