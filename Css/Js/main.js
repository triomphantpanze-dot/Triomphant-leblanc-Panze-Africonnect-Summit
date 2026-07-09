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
// ==========================================================================
    // 5. COMPTE À REBOURS DYNAMIQUE (HERO SECTION)
    // ==========================================================================
    const countdownElement = document.getElementById('countdown');
    if (countdownElement) {
        const targetDateStr = countdownElement.getAttribute('data-date');
        const targetDate = new Date(targetDateStr).getTime();

        const updateCountdown = () => {
            const now = new Date().getTime();
            const difference = targetDate - now;

            if (difference <= 0) {
                countdownElement.innerHTML = "<div class='countdown-live'>Le sommet a commencé !</div>";
                clearInterval(countdownInterval);
                return;
            }

            // Calcul des jours, heures, minutes et secondes
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            // Affichage avec formatage à deux chiffres (ex: 09 au lieu de 9)
            document.getElementById('days').textContent = days.toString().padStart(2, '0');
            document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        };

        // Lancer immédiatement et actualiser chaque seconde
        updateCountdown();
        const countdownInterval = setInterval(updateCountdown, 1000);
    }

    // ==========================================================================
    // 6. ANIMATION PROGRESSIVE DES CHIFFRES CLÉS (COMPTEURS DYNAMIQUES)
    // ==========================================================================
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const animateCounters = (counterElement) => {
        const target = +counterElement.getAttribute('data-target');
        const duration = 2000; // Durée de l'animation en millisecondes
        const stepTime = Math.max(Math.floor(duration / target), 15);
        let currentCount = 0;

        const timer = setInterval(() => {
            currentCount += Math.ceil(target / (duration / stepTime));
            if (currentCount >= target) {
                // Ajouter le symbole '+' pour le design si c'est le nombre de participants
                counterElement.textContent = target === 1200 ? `+${target}` : target;
                clearInterval(timer);
            } else {
                counterElement.textContent = target === 1200 ? `+${currentCount}` : currentCount;
            }
        }, stepTime);
    };

    // Utilisation de l'Intersection Observer pour déclencher l'animation au défilement
    if ('IntersectionObserver' in window && statNumbers.length > 0) {
        const statsObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters(entry.target);
                    observer.unobserve(entry.target); // Annule l'observation une fois animé
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(stat => statsObserver.observe(stat));
    } else {
        // Mode de secours si l'Observer n'est pas supporté par le navigateur
        statNumbers.forEach(stat => {
            const target = stat.getAttribute('data-target');
            stat.textContent = target === '1200' ? `+${target}` : target;
        });
    }

    // ==========================================================================
    // 7. SYSTÈME D'ONGLETS INTERACTIFS (PAGE PROGRAMME.HTML)
    // ==========================================================================
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    if (tabButtons.length > 0 && tabPanels.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetTab = button.getAttribute('data-tab');

                // Désactiver tous les boutons et masquer tous les panneaux
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabPanels.forEach(panel => panel.classList.remove('active'));

                // Activer le bouton cliqué et afficher le panneau correspondant
                button.classList.add('active');
                document.getElementById(targetTab).classList.add('active');
            });
        });
    }

    // ==========================================================================
    // 8. FILTRAGE DYNAMIQUE DES INTERVENANTS (PAGE INTERVENANTS.HTML)
    // ==========================================================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const speakerCards = document.querySelectorAll('.speaker-card-main');

    if (filterButtons.length > 0 && speakerCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filterValue = button.getAttribute('data-filter');

                // Mettre à jour l'état actif des boutons de filtre
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                // Filtrer les cartes avec un effet visuel de transition
                speakerCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');
                    
                    if (filterValue === 'all' || cardCategory === filterValue) {
                        card.style.display = 'block';
                        setTimeout(() => { card.style.opacity = '1'; }, 10);
                    } else {
                        card.style.opacity = '0';
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
    // ==========================================================================
    // 9. VALIDATION DU FORMULAIRE D'INSCRIPTION (PAGE CONTACT.HTML)
    // ==========================================================================
    const registrationForm = document.getElementById('registrationForm');

    if (registrationForm) {
        registrationForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Empêche l'envoi réel du formulaire pour la validation

            // Récupération des champs
            const fullName = document.getElementById('fullName');
            const email = document.getElementById('email');
            const phone = document.getElementById('phone');
            const ticketType = document.getElementById('ticketType');
            const country = document.getElementById('country');
            const motivation = document.getElementById('motivation');
            const successMessage = document.getElementById('successMessage');

            let isValid = true;

            // Fonction utilitaire pour afficher une erreur
            const showError = (inputElement, errorSpanId, message) => {
                const errorSpan = document.getElementById(errorSpanId);
                inputElement.parentElement.classList.add('error');
                inputElement.parentElement.classList.remove('success');
                if (errorSpan) {
                    errorSpan.textContent = message;
                    errorSpan.style.display = 'block';
                }
                isValid = false;
            };

            // Fonction utilitaire pour valider un champ
            const showSuccess = (inputElement, errorSpanId) => {
                const errorSpan = document.getElementById(errorSpanId);
                inputElement.parentElement.classList.add('success');
                inputElement.parentElement.classList.remove('error');
                if (errorSpan) {
                    errorSpan.textContent = '';
                    errorSpan.style.display = 'none';
                }
            };

            // 1. Validation du Nom Complet
            if (fullName.value.trim() === '') {
                showError(fullName, 'nameError', 'Le nom complet est obligatoire.');
            } else {
                showSuccess(fullName, 'nameError');
            }

            // 2. Validation de l'Email (Regex standard)
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value.trim())) {
                showError(email, 'emailError', 'Veuillez entrer une adresse email valide.');
            } else {
                showSuccess(email, 'emailError');
            }

            // 3. Validation du Téléphone (Minimum 8 chiffres)
            const phoneRegex = /^\d{8,}$/;
            if (!phoneRegex.test(phone.value.trim().replace(/\s/g, ''))) {
                showError(phone, 'phoneError', 'Le numéro doit contenir au moins 8 chiffres.');
            } else {
                showSuccess(phone, 'phoneError');
            }

            // 4. Validation du Type de Ticket
            if (ticketType.value === '') {
                showError(ticketType, 'ticketError', 'Veuillez sélectionner un type de ticket.');
            } else {
                showSuccess(ticketType, 'ticketError');
            }

            // 5. Validation du Pays
            if (country.value === '') {
                showError(country, 'countryError', 'Veuillez sélectionner votre pays de résidence.');
            } else {
                showSuccess(country, 'countryError');
            }

            // 6. Validation des Motivations (Minimum 20 caractères)
            if (motivation.value.trim().length < 20) {
                showError(motivation, 'motivationError', 'Votre message doit contenir au moins 20 caractères.');
            } else {
                showSuccess(motivation, 'motivationError');
            }

            // Si tout est valide, on affiche le message de succès global
            if (isValid) {
                successMessage.textContent = `Félicitations ${fullName.value.trim()}, votre demande d'inscription a bien été prise en compte !`;
                successMessage.style.display = 'block';
                
                // Réinitialiser le formulaire après l'envoi réussi
                registrationForm.reset();
                
                // Retirer les classes de succès visuelles après 5 secondes
                setTimeout(() => {
                    const formGroups = registrationForm.querySelectorAll('.form-group');
                    formGroups.forEach(group => group.classList.remove('success'));
                    successMessage.style.display = 'none';
                }, 5000);
            } else {
                successMessage.style.display = 'none';
            }
        });
    }