document.addEventListener('DOMContentLoaded', function() {
    // Função para obter parâmetros da URL
    function getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }

    // Função para atualizar a URL sem recarregar a página
    function updateURL(param = '') {
        if (param) {
            const newURL = `${window.location.pathname}?projeto=${param}`;
            window.history.pushState({ path: newURL }, '', newURL);
        } else {
            window.history.pushState({ path: window.location.pathname }, '', window.location.pathname);
        }
    }

    // Verifica se há um projeto específico na URL
    const projetoId = getUrlParameter('projeto');
    if (projetoId) {
        // Oculta todos os projetos inicialmente
        const todosProjetos = document.querySelectorAll('.project-detail');
        todosProjetos.forEach(projeto => {
            projeto.style.display = 'none';
        });

        // Mostra apenas o projeto selecionado
        const projetoSelecionado = document.querySelector(`.project-detail[data-project-id="${projetoId}"]`);
        if (projetoSelecionado) {
            projetoSelecionado.style.display = 'block';
            // Rola a página até o projeto
            setTimeout(() => {
                projetoSelecionado.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    }

    // Filtros de Projetos
    const filterButtons = document.querySelectorAll('.filter-btn');
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const filterValue = button.getAttribute('data-filter');
                const projectCards = document.querySelectorAll('.project-detail');

                // Se o filtro for "todos", limpa o parâmetro da URL
                if (filterValue === 'all') {
                    updateURL();
                }

                projectCards.forEach(card => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'block';
                        card.style.animation = 'fadeIn 0.5s ease';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // Inicialização dos Carrosséis
    const carousels = document.querySelectorAll('.project-carousel');
    if (carousels.length > 0) {
        carousels.forEach(carousel => {
            const container = carousel.querySelector('.carousel-container');
            const slides = carousel.querySelectorAll('.carousel-slide');
            const dots = carousel.querySelectorAll('.carousel-dot');
            const prevBtn = carousel.querySelector('.carousel-prev');
            const nextBtn = carousel.querySelector('.carousel-next');
            
            if (container && slides.length > 0) {
                let currentSlide = 0;
                const slideCount = slides.length;
                
                function updateCarousel() {
                    container.style.transform = `translateX(-${currentSlide * 100}%)`;
                    
                    dots.forEach((dot, index) => {
                        dot.classList.toggle('active', index === currentSlide);
                    });
                }
                
                if (prevBtn) {
                    prevBtn.addEventListener('click', () => {
                        currentSlide = (currentSlide - 1 + slideCount) % slideCount;
                        updateCarousel();
                    });
                }
                
                if (nextBtn) {
                    nextBtn.addEventListener('click', () => {
                        currentSlide = (currentSlide + 1) % slideCount;
                        updateCarousel();
                    });
                }
                
                dots.forEach((dot, index) => {
                    dot.addEventListener('click', () => {
                        currentSlide = index;
                        updateCarousel();
                    });
                });
                
                updateCarousel();
                
                setInterval(() => {
                    currentSlide = (currentSlide + 1) % slideCount;
                    updateCarousel();
                }, 5000);
            }
        });
    }

    // Inicialização do Fancybox
    if (typeof Fancybox !== 'undefined') {
        Fancybox.bind("[data-fancybox]", {
            // Configuração da barra de ferramentas
            Toolbar: {
                display: {
                    left: ["infobar"],
                    middle: [],
                    right: ["zoomIn", "zoomOut", "slideshow", "thumbs", "close"],
                },
            },
            // Configuração do carrossel
            Carousel: {
                transition: "slide",
                friction: 0.96,
            },
            // Configuração do zoom
            Images: {
                zoom: true,
                Panzoom: {
                    maxScale: 3,
                },
            },
            // Configuração das miniaturas
            Thumbs: {
                showOnStart: false,
                type: "modern",
            },
            // Configuração do slideshow
            Slideshow: {
                autostart: false,
                interval: 3000,
            },
        });
    }

    // Modal de Detalhes do Projeto
    const modal = document.getElementById('projectModal');
    const projectLinks = document.querySelectorAll('.project-link');
    const closeModal = document.querySelector('.close-modal');
    const modalBody = document.querySelector('.modal-body');

    // Dados dos projetos (em um cenário real, isso viria de um backend)
    const projectDetails = {
        'projeto1': {
            title: 'Residência Moderna',
            description: 'Projeto residencial com foco em sustentabilidade e conforto.',
            details: `
                <h2>Residência Moderna</h2>
                <div class="project-details-content">
                    <div class="project-images">
                        <img src="images/projects/project1-detail1.jpg" alt="Detalhe do Projeto">
                        <img src="images/projects/project1-detail2.jpg" alt="Detalhe do Projeto">
                        <img src="images/projects/project1-detail3.jpg" alt="Detalhe do Projeto">
                    </div>
                    <div class="project-info-details">
                        <h3>Detalhes do Projeto</h3>
                        <ul>
                            <li><strong>Localização:</strong> São Paulo, SP</li>
                            <li><strong>Área:</strong> 250m²</li>
                            <li><strong>Ano:</strong> 2023</li>
                            <li><strong>Categoria:</strong> Residencial</li>
                        </ul>
                        <h3>Descrição</h3>
                        <p>Projeto residencial moderno com foco em sustentabilidade e conforto. A residência foi projetada para aproveitar ao máximo a luz natural e a ventilação, reduzindo o consumo de energia. Materiais sustentáveis foram utilizados em toda a construção, e o projeto inclui sistemas de captação de água da chuva e painéis solares.</p>
                        <h3>Características Principais</h3>
                        <ul>
                            <li>Arquitetura bioclimática</li>
                            <li>Sistema de captação de água da chuva</li>
                            <li>Painéis solares para geração de energia</li>
                            <li>Materiais sustentáveis</li>
                            <li>Iluminação LED</li>
                            <li>Automação residencial</li>
                        </ul>
                    </div>
                </div>
            `
        },
        // Adicione mais projetos aqui
    };

    if (modal && projectLinks.length > 0) {
        projectLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const projectId = link.closest('.project-card').getAttribute('data-project-id');
                const projectData = projectDetails[projectId];
                
                if (projectData) {
                    modalBody.innerHTML = projectData.details;
                    modal.style.display = 'block';
                    document.body.style.overflow = 'hidden';
                }
            });
        });

        if (closeModal) {
            closeModal.addEventListener('click', () => {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            });
        }

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Animação de fade in para os projetos
    const fadeInElements = document.querySelectorAll('.project-card');
    if (fadeInElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        });

        fadeInElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            observer.observe(element);
        });
    }
}); 