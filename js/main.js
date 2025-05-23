document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    const header = document.querySelector('.header');
    const heroContent = document.querySelector('.hero-content');
    const logoImg = document.querySelector('.logo img');
    const logoBranca = 'assets/Logo-logaf-sfundo.PNG';
    const logoPreta = 'assets/Logo-logaf-sfundo-preto.png';

    // Garante que o menu está fechado por padrão
    navMenu.classList.remove('active');

    function isMobile() {
        return window.innerWidth <= 768;
    }

    // Função para abrir o menu
    function openMenu() {
        navMenu.classList.add('active');
        mobileMenuBtn.classList.add('active');
        header.classList.remove('scrolled');
        // Animação sequencial dos itens
        navMenu.querySelectorAll('li').forEach((li, i) => {
            li.style.transitionDelay = (0.08 * i + 0.1) + 's';
        });
    }
    // Função para fechar o menu
    function closeMenu() {
        navMenu.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
        // Remove delays para resetar animação após a transição
        setTimeout(() => {
            navMenu.querySelectorAll('li').forEach(li => {
                li.style.transitionDelay = '';
            });
        }, 400); // tempo igual ao da transição do CSS
    }

    // Toggle menu ao clicar no hambúrguer
    mobileMenuBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        if (navMenu.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    // Fecha menu ao clicar em qualquer link
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            closeMenu();
        });
    });

    // Fecha menu ao clicar fora do overlay
    document.addEventListener('click', function(e) {
        if (navMenu.classList.contains('active') && !navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            closeMenu();
        }
    });

    // Efeito do header ao rolar
    window.addEventListener('scroll', function() {
        if (window.scrollY > 10 && !navMenu.classList.contains('active')) {
            header.classList.add('scrolled');
            if (logoImg) logoImg.src = logoPreta;
        } else {
            header.classList.remove('scrolled');
            if (logoImg) logoImg.src = logoBranca;
        }
    });

    // Garante que o menu fecha ao redimensionar
    window.addEventListener('resize', function() {
        closeMenu();
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
