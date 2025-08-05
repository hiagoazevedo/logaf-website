document.addEventListener('DOMContentLoaded', function() {
    // UTILITY FUNCTIONS FOR PERFORMANCE
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

    // CACHE DE ELEMENTOS DOM
    const elements = {
        serviceBlocks: document.querySelectorAll('.service-block')
    };

    // FUNÇÕES UTILITÁRIAS
    const utils = {
        toggleClasses: (element, removeClass, addClass) => {
            if (removeClass) element.classList.remove(removeClass);
            if (addClass) element.classList.add(addClass);
        }
    };

    // SCROLL REVEAL EFFECT - OPTIMIZED
    let scrollObserver;
    let isObserverActive = false;

    function initScrollReveal() {
        // Prevent multiple observers
        if (isObserverActive) return;
        
        if (scrollObserver) {
            scrollObserver.disconnect();
        }

        const isMobile = window.innerWidth <= 768;
        const isTabletDesktop = window.innerWidth > 768 && window.innerWidth < 1440;
        const isLargeScreen = window.innerWidth >= 1440;
        
        let threshold, rootMargin;
        
        if (isMobile) {
            threshold = 0.1;
            rootMargin = '0px 0px -10% 0px';
        } else if (isTabletDesktop) {
            threshold = 0.15; // Threshold intermediário para tablets e desktops médios
            rootMargin = '0px 0px 50px 0px'; // Margem positiva pequena
        } else if (isLargeScreen) {
            threshold = 0.2; // Threshold maior para telas grandes
            rootMargin = '0px 0px 100px 0px'; // Margem positiva para ativar antes
        }
        
        const observerOptions = {
            threshold: threshold,
            rootMargin: rootMargin
        };

        scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const target = entry.target;
                const currentIsMobile = window.innerWidth <= 768;
                
                if (entry.isIntersecting) {
                    if (!target.classList.contains('reveal')) {
                        utils.toggleClasses(target, 'reveal-out', 'reveal');
                    }
                } else if (target.classList.contains('reveal') && currentIsMobile) {
                    // Em desktop, os elementos permanecem visíveis uma vez revelados
                    // Em mobile, mantém o comportamento original
                    utils.toggleClasses(target, 'reveal', 'reveal-out');
                }
            });
        }, observerOptions);

        // Observe all service blocks
        elements.serviceBlocks.forEach(block => {
            scrollObserver.observe(block);
        });

        isObserverActive = true;
    }

    function cleanupScrollReveal() {
        if (scrollObserver) {
            scrollObserver.disconnect();
            scrollObserver = null;
        }
        isObserverActive = false;
    }

    // EVENT LISTENERS
    function setupEventListeners() {
        // Optimized resize handler
        const handleResize = debounce(() => {
            cleanupScrollReveal();
            requestAnimationFrame(() => {
                setTimeout(initScrollReveal, 100);
            });
        }, 300);

        window.addEventListener('resize', handleResize);
    }

    // INICIALIZAÇÃO
    function init() {
        setupEventListeners();
        
        // Initialize scroll reveal with delay for better performance
        requestAnimationFrame(() => {
            setTimeout(initScrollReveal, 100);
        });
    }

    init();
});