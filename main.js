
// State
let allBrands = [];
let currentIndex = 0;
let isNameVisible = true;
let isCountryVisible = true;

// DOM Elements
const elements = {
    loading: document.getElementById('loading'),
    card: document.getElementById('brand-card'),
    logo: document.getElementById('brand-logo'),
    name: document.getElementById('brand-name'),
    country: document.getElementById('brand-country'),
    prevBtn: document.getElementById('prev-btn'),
    nextBtn: document.getElementById('next-btn'),
    counter: document.getElementById('counter'),
    toggleNameBtn: document.getElementById('toggle-name'),
    toggleCountryBtn: document.getElementById('toggle-country')
};

// Initialization
function init() {
    // Check if carBrands data is available (from data.js)
    if (typeof carBrands === 'undefined') {
        elements.loading.textContent = 'Error: no se encontraron datos de marcas.';
        return;
    }

    allBrands = carBrands;

    // Initial State
    elements.loading.classList.add('hidden');
    elements.card.classList.remove('hidden');

    updateUI();
    setupListeners();
}

function updateUI() {
    if (allBrands.length === 0) return;

    const brand = allBrands[currentIndex];

    elements.logo.src = brand.logo;
    elements.logo.alt = `Logo de ${brand.name}`;

    elements.name.textContent = brand.name;
    elements.country.textContent = brand.country || 'Desconocido';

    elements.counter.textContent = `${currentIndex + 1} / ${allBrands.length}`;

    // Update Visibility States
    updateVisibilityClass(elements.name, isNameVisible);
    updateVisibilityClass(elements.country, isCountryVisible);

    // Update Toggle Button States
    toggleButtonState(elements.toggleNameBtn, isNameVisible);
    toggleButtonState(elements.toggleCountryBtn, isCountryVisible);
}

function updateVisibilityClass(element, isVisible) {
    if (isVisible) {
        element.classList.remove('blurred-text');
    } else {
        element.classList.add('blurred-text');
    }
}

function toggleButtonState(btn, isActive) {
    if (isActive) {
        btn.classList.add('active');
        btn.style.opacity = '1';
    } else {
        btn.classList.remove('active');
        btn.style.opacity = '0.5';
    }
}

function setupListeners() {
    elements.prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = allBrands.length - 1; // Loop back
        }
        updateUI();
    });

    elements.nextBtn.addEventListener('click', () => {
        if (currentIndex < allBrands.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0; // Loop start
        }
        updateUI();
    });

    elements.toggleNameBtn.addEventListener('click', () => {
        isNameVisible = !isNameVisible;
        updateUI();
    });

    elements.toggleCountryBtn.addEventListener('click', () => {
        isCountryVisible = !isCountryVisible;
        updateUI();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') elements.prevBtn.click();
        if (e.key === 'ArrowRight') elements.nextBtn.click();
    });
}

// Start
init();

// Register Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(registration => {
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
            })
            .catch(error => {
                console.log('ServiceWorker registration failed: ', error);
            });
    });
}
