document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');

    mobileMenuBtn.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        this.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.nav-container')) {
            navMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Newsletter Form Submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            // Aqui você pode adicionar a lógica para enviar o email para seu backend
            alert('Obrigado por se inscrever!');
            this.reset();
        });
    }

    // Animate statistics when in viewport
    const stats = document.querySelectorAll('.stat-item h3');
    const animateStats = () => {
        stats.forEach(stat => {
            const rect = stat.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom >= 0) {
                stat.style.opacity = '1';
                stat.style.transform = 'translateY(0)';
            }
        });
    };

    // Initial styles for stats
    stats.forEach(stat => {
        stat.style.opacity = '0';
        stat.style.transform = 'translateY(20px)';
        stat.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    // Check stats on scroll
    window.addEventListener('scroll', animateStats);
    // Check stats on load
    animateStats();

    // Rolagem suave para links internos na página inicial
    if (window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/')) {
        // Função para rolagem suave
        function smoothScroll(target) {
            const targetElement = document.querySelector(target);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }

        // Função para fechar o menu móvel
        function closeMobileMenu() {
            const navMenu = document.querySelector('.nav-menu');
            const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
            
            if (navMenu && mobileMenuBtn) {
                navMenu.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            }
        }

        // Adiciona eventos para links de navegação
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Se for um link interno na mesma página
                if (href === 'index.html' || href === 'index.html#contact') {
                    e.preventDefault();
                    
                    // Fecha o menu móvel
                    closeMobileMenu();
                    
                    if (href === 'index.html') {
                        // Rolagem para o topo
                        window.scrollTo({
                            top: 0,
                            behavior: 'smooth'
                        });
                    } else if (href === 'index.html#contact') {
                        // Rolagem para a seção de contato
                        smoothScroll('#contact');
                    }
                }
            });
        });
    }
}); 