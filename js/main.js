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
    const indicators = document.querySelectorAll('.hero-indicator');
    const prevBtn = document.querySelector('.hero-prev');
    const nextBtn = document.querySelector('.hero-next');
    let currentSlide = 0;
    let isTransitioning = false;
    let autoSlideInterval;

    function updateSlider() {
        // Remove active class from all slides and indicators
        slides.forEach(slide => slide.classList.remove('active', 'next'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Add active class to current slide and indicator
        slides[currentSlide].classList.add('active');
        indicators[currentSlide].classList.add('active');
    }

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
            
            // Atualiza indicadores
            indicators[currentSlide].classList.remove('active');
            indicators[nextSlideIndex].classList.add('active');
            
            currentSlide = nextSlideIndex;
            
            setTimeout(() => {
                isTransitioning = false;
            }, 1500);
        }, 50);
    }

    function prevSlide() {
        if (isTransitioning) return;
        isTransitioning = true;

        const prevSlideIndex = (currentSlide - 1 + slides.length) % slides.length;
        
        // Prepara a imagem anterior
        slides[prevSlideIndex].classList.add('next');
        
        // Inicia a transição
        setTimeout(() => {
            slides[currentSlide].classList.remove('active');
            slides[prevSlideIndex].classList.remove('next');
            slides[prevSlideIndex].classList.add('active');
            
            // Atualiza indicadores
            indicators[currentSlide].classList.remove('active');
            indicators[prevSlideIndex].classList.add('active');
            
            currentSlide = prevSlideIndex;
            
            setTimeout(() => {
                isTransitioning = false;
            }, 1500);
        }, 50);
    }

    function goToSlide(slideIndex) {
        if (isTransitioning || slideIndex === currentSlide) return;
        isTransitioning = true;

        // Prepara o slide de destino
        slides[slideIndex].classList.add('next');
        
        // Inicia a transição
        setTimeout(() => {
            slides[currentSlide].classList.remove('active');
            slides[slideIndex].classList.remove('next');
            slides[slideIndex].classList.add('active');
            
            // Atualiza indicadores
            indicators[currentSlide].classList.remove('active');
            indicators[slideIndex].classList.add('active');
            
            currentSlide = slideIndex;
            
            setTimeout(() => {
                isTransitioning = false;
            }, 1500);
        }, 50);
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    // Inicializa o primeiro slide
    if (slides.length > 0) {
        updateSlider();
        
        // Event listeners para os botões de navegação
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                stopAutoSlide();
                prevSlide();
                startAutoSlide(); // Reinicia o auto-slide após interação manual
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                stopAutoSlide();
                nextSlide();
                startAutoSlide(); // Reinicia o auto-slide após interação manual
            });
        }
        
        // Event listeners para os indicadores
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                stopAutoSlide();
                goToSlide(index);
                startAutoSlide(); // Reinicia o auto-slide após interação manual
            });
        });
        
        // Inicia o auto-slide
        startAutoSlide();
        
        // Pausa o auto-slide quando o mouse está sobre o hero
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            heroSection.addEventListener('mouseenter', stopAutoSlide);
            heroSection.addEventListener('mouseleave', startAutoSlide);
        }
        
        // Suporte para navegação por teclado
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                stopAutoSlide();
                prevSlide();
                startAutoSlide();
            } else if (e.key === 'ArrowRight') {
                stopAutoSlide();
                nextSlide();
                startAutoSlide();
            }
        });
    }

    // Services scroll detection for mobile
    function initServicesScrollDetection() {
        const serviceItems = document.querySelectorAll('.service-item');
        
        if (serviceItems.length === 0) return;
        
        function checkServiceInView() {
            // Only run on mobile
            if (window.innerWidth > 768) return;
            
            const viewportCenter = window.innerHeight / 2;
            let activeItem = null;
            let minDistance = Infinity;
            
            serviceItems.forEach(item => {
                const rect = item.getBoundingClientRect();
                const itemCenter = rect.top + rect.height / 2;
                const distance = Math.abs(viewportCenter - itemCenter);
                
                // Remove active class from all items
                item.classList.remove('active');
                
                // Find the item closest to viewport center
                if (distance < minDistance && rect.top < viewportCenter && rect.bottom > viewportCenter) {
                    minDistance = distance;
                    activeItem = item;
                }
            });
            
            // Add active class to the closest item
            if (activeItem) {
                activeItem.classList.add('active');
            }
        }
        
        // Check on scroll
        window.addEventListener('scroll', checkServiceInView);
        
        // Check on resize
        window.addEventListener('resize', checkServiceInView);
        
        // Initial check
        checkServiceInView();
    }
    
    // Initialize services scroll detection
    initServicesScrollDetection();

    // Projects Carousel (Index) - Rolagem contínua e suave
    function initProjectsCarousel() {
        const track = document.querySelector('.projects-track');
        const originalItems = document.querySelectorAll('.project-item');
        
        if (!track || originalItems.length === 0) {
            return;
        }
        
        // Duplica os itens múltiplas vezes para criar efeito infinito suave
        const duplicateCount = 3; // Duplica 3 vezes para garantir fluidez
        for (let i = 0; i < duplicateCount; i++) {
            originalItems.forEach(item => {
                const clone = item.cloneNode(true);
                track.appendChild(clone);
            });
        }
        
        // Calcula a largura total dos itens originais
        const itemWidth = originalItems[0].offsetWidth;
        const gap = 5;
        const totalOriginalWidth = originalItems.length * (itemWidth + gap);
        
        // Aplica animação CSS contínua (velocidade ajustada para ser suave)
        track.style.animation = `scrollProjects ${totalOriginalWidth / 220}s linear infinite`;
        
        // Função para recalcular a animação quando a janela é redimensionada
        function updateAnimation() {
            const newItemWidth = originalItems[0].offsetWidth;
            const newTotalWidth = originalItems.length * (newItemWidth + gap);
            track.style.animation = `scrollProjects ${newTotalWidth / 220}s linear infinite`;
        }
        
        // Atualiza a animação quando a janela é redimensionada
        window.addEventListener('resize', updateAnimation);
    }
    
    // Inicializa o carrossel de projetos
    initProjectsCarousel();
}); 
