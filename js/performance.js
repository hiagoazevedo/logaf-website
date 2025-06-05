// Performance optimizations script
(function() {
    'use strict';

    // Optimize image loading
    function optimizeImages() {
        const images = document.querySelectorAll('img[loading="lazy"]');
        
        // Use native lazy loading if supported, otherwise use Intersection Observer
        if ('loading' in HTMLImageElement.prototype) {
            return; // Native lazy loading is supported
        }
        
        // Fallback for browsers without native lazy loading
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });

        images.forEach(img => {
            if (img.dataset.src) {
                imageObserver.observe(img);
            }
        });
    }

    // Preload critical resources
    function preloadCriticalResources() {
        // Hero section agora tem preload no HTML
        // Outros recursos críticos podem ser adicionados aqui se necessário
    }

    // Optimize font loading
    function optimizeFonts() {
        // Add font-display: swap to improve perceived performance
        const style = document.createElement('style');
        style.textContent = `
            @font-face {
                font-family: 'Inter';
                font-display: swap;
            }
            @font-face {
                font-family: 'Montserrat';
                font-display: swap;
            }
            @font-face {
                font-family: 'Raleway';
                font-display: swap;
            }
            @font-face {
                font-family: 'Tangerine';
                font-display: swap;
            }
            @font-face {
                font-family: 'Tenor Sans';
                font-display: swap;
            }
        `;
        document.head.appendChild(style);
    }

    // Reduce layout shifts
    function preventLayoutShifts() {
        // Add dimensions to images without explicit width/height
        const images = document.querySelectorAll('img:not([width]):not([height])');
        images.forEach(img => {
            img.style.aspectRatio = '16/9'; // Default aspect ratio
        });
    }

    // Initialize optimizations
    function init() {
        // Run immediately for critical optimizations
        preloadCriticalResources();
        optimizeFonts();
        
        // Run after DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                optimizeImages();
                preventLayoutShifts();
            });
        } else {
            optimizeImages();
            preventLayoutShifts();
        }
    }

    // Start optimizations
    init();

    // Export for debugging
    window.LogafPerformance = {
        optimizeImages,
        preloadCriticalResources,
        optimizeFonts,
        preventLayoutShifts
    };
})(); 