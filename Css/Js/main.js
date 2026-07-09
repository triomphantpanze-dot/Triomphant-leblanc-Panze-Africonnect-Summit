// js/main.js - Logique JavaScript globale pour AfriConnect Summit 2026

document.addEventListener('DOMContentLoaded', () => {
    // ==========================================================================
    // 1. GESTION DU THEME (DARK / LIGHT MODE PERSISTANT)
    // ==========================================================================
    const themeToggleBtn = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;
    
    // Vérifier s'il y a un thème enregistré dans le stockage du navigateur
    const savedTheme = localStorage.getItem('theme') || 'light';
    htmlElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    // Écouteur de clic sur le bouton de basculement
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            // Appliquer le nouveau thème
            htmlElement.setAttribute('data-theme', newTheme);
            // Sauvegarder le choix de l'utilisateur
            localStorage.setItem('theme', newTheme);
            // Mettre à jour l'icône visuelle du bouton
            updateThemeIcon(newTheme);
        });
    }

    // Fonction utilitaire pour changer l'icône Bootstrap (Lune / Soleil)
    function updateThemeIcon(theme) {
        if (!themeToggleBtn) return;
        const icon = themeToggleBtn.querySelector('i');
        if (theme === 'dark') {
            icon.className = 'bi bi-sun-fill';
        } else {
            icon.className = 'bi bi-moon-fill';
        }
    }

    // ==========================================================================
    // 2. EFFET DE SOUPLÈSSE NAVBAR & BOUTON RETOUR EN HAUT (SCROLL EFFECTS)
    // ==========================================================================
    const header = document.querySelector('.main-header');
    const scrollTopBtn = document.getElementById('scrollTopBtn');

    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;

        // Effet d'arrière-plan sur la Navbar fixe après 50px de défilement
        if (header) {
            if (scrollPosition > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }

        // Afficher/Masquer le bouton "Retour en haut" après 300px
        if (scrollTopBtn) {
            if (scrollPosition > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        }
    });

    // Action de retour fluide en haut de page lors du clic
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ==========================================================================
    // 3. MENU MOBILE HAMBURGER (OUVERTURE / FERMETURE)
    // ==========================================================================
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            // Changer l'icône du hamburger (menu ou fermeture)
            const icon = hamburger.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.className = 'bi bi-x-lg';
            } else {
                icon.className = 'bi bi-list';
            }
        });

        // Fermer automatiquement le menu si l'on clique sur un lien (utile pour mobile)
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = hamburger.querySelector('i');
                if (icon) icon.className = 'bi bi-list';
            });
        });
    }

    // ==========================================================================
    // 4. MISE À JOUR DE L'ANNÉE DU PIED DE PAGE (FOOTER)
    // ==========================================================================
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
});