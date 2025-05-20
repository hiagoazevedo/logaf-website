document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    const header = document.querySelector('.header');
    const heroContent = document.querySelector('.hero-content');

    // Garante que o menu está fechado por padrão
    navMenu.classList.remove('active');

    function isMobile() {
        return window.innerWidth <= 768;
    }

    mobileMenuBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        navMenu.classList.toggle('active');
        this.classList.toggle('active');
        // Adiciona ou remove a classe scrolled no header ao abrir/fechar menu no mobile
        if (isMobile()) {
            if (navMenu.classList.contains('active')) {
                header.classList.add('scrolled');
                if (heroContent) heroContent.style.display = 'none';
            } else if (window.scrollY === 0) {
                header.classList.remove('scrolled');
                if (heroContent) heroContent.style.display = '';
            } else {
                if (heroContent) heroContent.style.display = '';
            }
        }
    });

    // Fecha o menu ao clicar em qualquer link do menu
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            if (isMobile() && window.scrollY === 0) {
                header.classList.remove('scrolled');
            }
            if (heroContent) heroContent.style.display = '';
        });
    });

    // Fecha o menu ao clicar fora dele
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.nav-container')) {
            navMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            if (isMobile() && window.scrollY === 0) {
                header.classList.remove('scrolled');
            }
            if (heroContent) heroContent.style.display = '';
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

    // Header Scroll Effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll <= 0 && (!isMobile() || !navMenu.classList.contains('active'))) {
            header.classList.remove('scrolled');
            return;
        }
        header.classList.add('scrolled');
        lastScroll = currentScroll;
    });

    // Hero Slider
    const slides = document.querySelectorAll('.hero-slide');
    let currentSlide = 0;
    let isTransitioning = false;

    function nextSlide() {
        if (isTransitioning) return;
        isTransitioning = true;

        const nextSlideIndex = (currentSlide + 1) % slides.length;
        
        // Prepara a próxima imagem
        slides[nextSlideIndex].classList.add('next');
        
        // Inicia a transição
        setTimeout(() => {
            slides[currentSlide].classList.remove('active');
            slides[nextSlideIndex].classList.remove('next');
            slides[nextSlideIndex].classList.add('active');
            currentSlide = nextSlideIndex;
            
            setTimeout(() => {
                isTransitioning = false;
            }, 1500);
        }, 50);
    }

    // Inicializa o primeiro slide
    slides[0].classList.add('active');

    // Change slide every 5 seconds
    setInterval(nextSlide, 5000);

    // Interatividade dos cards de serviço
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('i');
            icon.style.transition = 'all 0.4s ease';
            icon.style.color = '#555';
        });
        
        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('i');
            icon.style.color = '#a3a3a3';
        });
    });
}); 