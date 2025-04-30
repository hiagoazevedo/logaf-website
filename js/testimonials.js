document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.testimonials-container');
    const slider = document.querySelector('.testimonials-slider');
    const cards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    const dots = document.querySelectorAll('.dot');
    
    let currentIndex = 0;
    const totalCards = cards.length;

    // Função para atualizar a posição do slider
    const updateSlider = () => {
        // Usa a largura do container como base para o slide
        const slideAmount = container.offsetWidth * currentIndex;
        slider.style.transform = `translateX(-${slideAmount}px)`;
        
        // Atualiza os dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    };

    // Event listener para o botão anterior
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + totalCards) % totalCards;
        updateSlider();
    });

    // Event listener para o botão próximo
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % totalCards;
        updateSlider();
    });

    // Event listener para os dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateSlider();
        });
    });

    // Debounce function para melhor performance no resize
    let resizeTimeout;
    const handleResize = () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(updateSlider, 100);
    };

    // Atualiza o slider quando a janela é redimensionada (com debounce)
    window.addEventListener('resize', handleResize);

    // Configuração inicial
    updateSlider();

    // Transição automática a cada 10 segundos
    setInterval(() => {
        currentIndex = (currentIndex + 1) % totalCards;
        updateSlider();
    }, 10000);
}); 