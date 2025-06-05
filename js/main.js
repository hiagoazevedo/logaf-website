document.addEventListener('DOMContentLoaded', function() {
    // UTILITY FUNCTIONS FOR PERFORMANCE
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }

    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    const header = document.querySelector('.header');
    const heroContent = document.querySelector('.hero-content');
    const logoImg = document.querySelector('.logo img');
    const logoBranca = 'assets/Logo-logaf-sfundo.PNG';
    const logoPreta = 'assets/Logo-logaf-sfundo-preto.png';

    // Variável para controlar o estado do scroll
    let isScrolled = false;

    // Garante que o menu está fechado por padrão
    navMenu.classList.remove('active');
    
    // Verifica o estado inicial do scroll
    checkScrollState();

    function isMobile() {
        return window.innerWidth <= 768;
    }

    // Função para verificar e aplicar o estado scrolled
    function checkScrollState() {
        const scrollY = window.scrollY;
        
        if (scrollY > 50) {
            // Estado: header branco, logo preto, menu hambúrguer preto
            if (!isScrolled) {
                isScrolled = true;
                header.classList.add('scrolled');
                if (logoImg) logoImg.src = logoPreta;
            }
        } else {
            // Estado: header transparente, logo branco, menu hambúrguer branco
            if (isScrolled) {
                isScrolled = false;
                header.classList.remove('scrolled');
                if (logoImg) logoImg.src = logoBranca;
            }
        }
    }

    // Função para abrir o menu
    function openMenu() {
        navMenu.classList.add('active');
        mobileMenuBtn.classList.add('active');
        // Remove temporariamente a classe scrolled quando o menu está aberto
        header.classList.remove('scrolled');
        // Força o logo branco quando o menu está aberto
        if (logoImg) logoImg.src = logoBranca;
        // Animação sequencial dos itens
        navMenu.querySelectorAll('li').forEach((li, i) => {
            li.style.transitionDelay = (0.08 * i + 0.1) + 's';
        });
    }
    
    // Função para fechar o menu
    function closeMenu() {
        navMenu.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
        
        // Aplica imediatamente o estado correto baseado na posição do scroll
        checkScrollState();
        
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

    // Services scroll detection for mobile - OPTIMIZED
    const serviceItems = document.querySelectorAll('.service-item');
    let servicesObserver;

    function initServicesScrollDetection() {
        if (serviceItems.length === 0) return;
        
        // Disconnect existing observer
        if (servicesObserver) {
            servicesObserver.disconnect();
        }
        
        // Only initialize on mobile
        if (window.innerWidth <= 768) {
            servicesObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Remove active from all items first
                        serviceItems.forEach(item => item.classList.remove('active'));
                        // Add active to current item
                        entry.target.classList.add('active');
                    }
                });
            }, {
                threshold: 0.6,
                rootMargin: '-20% 0px -20% 0px'
            });

            serviceItems.forEach(item => {
                servicesObserver.observe(item);
            });
        }
    }

    // UNIFIED SCROLL HANDLER - THROTTLED
    const handleScroll = throttle(() => {
        // Só aplica o efeito se o menu não estiver aberto
        if (!navMenu.classList.contains('active')) {
            checkScrollState();
        }
    }, 16); // ~60fps

    // Single scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Optimized resize handler
    const handleResize = debounce(() => {
        closeMenu();
        initServicesScrollDetection();
    }, 250);

    window.addEventListener('resize', handleResize);

    // Initialize services scroll detection
    initServicesScrollDetection();

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
            closeMenu(); // Usa a função principal que já aplica o estado correto
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

    // Projects Carousel (Index)
    function initProjectsCarousel() {
        const track = document.querySelector('.projects-track');
        const originalItems = document.querySelectorAll('.project-item');
        
        if (!track || originalItems.length === 0) {
            return;
        }
        // Remove animação CSS existente
        track.style.animation = 'none';
        // Duplica os itens múltiplas vezes para garantir loop infinito suave
        const duplicateCount = 4; // Aumentado para garantir mais fluidez
        // Adiciona clones no final
        for (let i = 0; i < duplicateCount; i++) {
            originalItems.forEach(item => {
                const clone = item.cloneNode(true);
                clone.classList.add('cloned');
                track.appendChild(clone);
            });
        }
        
        // Adiciona clones no início (para transição suave quando volta)
        const allItems = track.querySelectorAll('.project-item');
        for (let i = originalItems.length - 1; i >= 0; i--) {
            const clone = originalItems[i].cloneNode(true);
            clone.classList.add('cloned-start');
            track.insertBefore(clone, track.firstChild);
        }
        
        // Calcula dimensões
        const itemWidth = originalItems[0].offsetWidth;
        const gap = 5;
        const itemWidthWithGap = itemWidth + gap;
        const totalOriginalWidth = originalItems.length * itemWidthWithGap;
        
        // Posiciona o track no início dos itens originais (após os clones iniciais)
        track.style.transform = `translateX(-${totalOriginalWidth}px)`;
        
        // Velocidade da animação (pixels por segundo)
        const speed = 80; // Ajuste este valor para controlar a velocidade
        const duration = totalOriginalWidth / speed;
        
        // Aplica animação CSS personalizada
        const keyframeName = 'scrollProjectsInfinite';
        
        // Remove keyframe existente se houver
        const existingStyle = document.getElementById('carousel-keyframes');
        if (existingStyle) {
            existingStyle.remove();
        }
        
        // Cria novo keyframe
        const style = document.createElement('style');
        style.id = 'carousel-keyframes';
        style.textContent = `
            @keyframes ${keyframeName} {
                0% {
                    transform: translateX(-${totalOriginalWidth}px);
                }
                100% {
                    transform: translateX(-${totalOriginalWidth * 2}px);
                }
            }
        `;
        document.head.appendChild(style);
        
        // Aplica a animação
        track.style.animation = `${keyframeName} ${duration}s linear infinite`;
        
        // Função para recalcular quando a janela é redimensionada
        function updateAnimation() {
            // Para a animação atual
            track.style.animation = 'none';
            
            // Recalcula dimensões
            const newItemWidth = track.querySelector('.project-item').offsetWidth;
            const newItemWidthWithGap = newItemWidth + gap;
            const newTotalWidth = originalItems.length * newItemWidthWithGap;
            const newDuration = newTotalWidth / speed;
            
            // Reposiciona
            track.style.transform = `translateX(-${newTotalWidth}px)`;
            
            // Atualiza keyframe
            const existingStyle = document.getElementById('carousel-keyframes');
            if (existingStyle) {
                existingStyle.textContent = `
                    @keyframes ${keyframeName} {
                        0% {
                            transform: translateX(-${newTotalWidth}px);
                        }
                        100% {
                            transform: translateX(-${newTotalWidth * 2}px);
                        }
                    }
                `;
            }
            
            // Reaplica animação
            requestAnimationFrame(() => {
                track.style.animation = `${keyframeName} ${newDuration}s linear infinite`;
            });
        }
        
        // Debounce para resize
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(updateAnimation, 250);
        });
    }
    
    // Inicializa o carrossel de projetos
    initProjectsCarousel();
}); 
