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

    // Dados dos projetos
    const projectsData = {
        'casa-o-bom': {
            title: 'Casa O Bom',
            architect: 'Duda Porto',
            location: 'Rio de Janeiro, RJ',
            area: '400 m²',
            year: '2024',
            description: 'Projeto residencial desenvolvido pela arquiteta Duda Porto, apresentando soluções inovadoras em marcenaria e design de interiores. O projeto combina funcionalidade e estética, criando ambientes únicos e acolhedores com acabamentos de alta qualidade.',
            images: [
                { src: 'assets/optimized/projetos-temp/casa-o-bom/01.webp', alt: 'Vista geral' },
                { src: 'assets/optimized/projetos-temp/casa-o-bom/02.webp', alt: 'Sala de estar' },
                { src: 'assets/optimized/projetos-temp/casa-o-bom/03.webp', alt: 'Cozinha' },
                { src: 'assets/optimized/projetos-temp/casa-o-bom/04.webp', alt: 'Quarto principal' },
                { src: 'assets/optimized/projetos-temp/casa-o-bom/05.webp', alt: 'Banheiro' },
                { src: 'assets/optimized/projetos-temp/casa-o-bom/06.webp', alt: 'Área de lazer' },
                { src: 'assets/optimized/projetos-temp/casa-o-bom/07.webp', alt: 'Escritório' },
                { src: 'assets/optimized/projetos-temp/casa-o-bom/08.webp', alt: 'Sala de jantar' },
                { src: 'assets/optimized/projetos-temp/casa-o-bom/09.webp', alt: 'Varanda' },
                { src: 'assets/optimized/projetos-temp/casa-o-bom/10.webp', alt: 'Detalhes' }
            ]
        },
        'casa-renato-augusto': {
            title: 'Casa Renato Augusto',
            architect: 'Paola Ribeiro e Duda Porto',
            location: 'Rio de Janeiro, RJ',
            area: '500 m²',
            year: '2024',
            description: 'Projeto desenvolvido em parceria entre as arquitetas Paola Ribeiro e Duda Porto. Esta residência apresenta um conceito moderno e sofisticado, com móveis sob medida que maximizam o aproveitamento dos espaços e proporcionam conforto e elegância aos ambientes.',
            images: [
                { src: 'assets/optimized/projetos-temp/casa-renato-augusto/01.webp', alt: 'Fachada' },
                { src: 'assets/optimized/projetos-temp/casa-renato-augusto/02.webp', alt: 'Sala de estar' },
                { src: 'assets/optimized/projetos-temp/casa-renato-augusto/03.webp', alt: 'Cozinha gourmet' },
                { src: 'assets/optimized/projetos-temp/casa-renato-augusto/04.webp', alt: 'Sala de jantar' },
                { src: 'assets/optimized/projetos-temp/casa-renato-augusto/05.webp', alt: 'Quarto principal' },
                { src: 'assets/optimized/projetos-temp/casa-renato-augusto/06.webp', alt: 'Banheiro suite' },
                { src: 'assets/optimized/projetos-temp/casa-renato-augusto/07.webp', alt: 'Home office' },
                { src: 'assets/optimized/projetos-temp/casa-renato-augusto/08.webp', alt: 'Área de lazer' },
                { src: 'assets/optimized/projetos-temp/casa-renato-augusto/09.webp', alt: 'Piscina' },
                { src: 'assets/optimized/projetos-temp/casa-renato-augusto/10.webp', alt: 'Jardim' },
                { src: 'assets/optimized/projetos-temp/casa-renato-augusto/11.webp', alt: 'Vista noturna' }
            ]
        },
        'casa-flavio': {
            title: 'Casa Flavio',
            architect: 'Arquitetura Essencial',
            location: 'Rio de Janeiro, RJ',
            area: '350 m²',
            year: '2024',
            description: 'Projeto assinado pelo escritório Arquitetura Essencial, esta residência destaca-se pela integração harmoniosa entre arquitetura e marcenaria. Os ambientes foram pensados para proporcionar máximo conforto e funcionalidade, com soluções criativas em móveis planejados.',
            images: [
                { src: 'assets/optimized/projetos-temp/casa-flavio/01.webp', alt: 'Vista externa' },
                { src: 'assets/optimized/projetos-temp/casa-flavio/02.webp', alt: 'Sala principal' },
                { src: 'assets/optimized/projetos-temp/casa-flavio/03.webp', alt: 'Cozinha integrada' },
                { src: 'assets/optimized/projetos-temp/casa-flavio/04.webp', alt: 'Quarto casal' },
                { src: 'assets/optimized/projetos-temp/casa-flavio/05.webp', alt: 'Banheiro principal' },
                { src: 'assets/optimized/projetos-temp/casa-flavio/06.webp', alt: 'Área gourmet' }
            ]
        }
    };

    // CACHE DE ELEMENTOS DOM
    const elements = {
        projectsList: document.getElementById('projects-list'),
        projectDetailView: document.getElementById('project-detail-view'),
        backBtn: document.getElementById('back-btn'),
        dropdownBtn: document.getElementById('dropdown-btn'),
        dropdownMenu: document.getElementById('dropdown-menu'),
        dropdownText: document.querySelector('.dropdown-text'),
        dropdownItems: document.querySelectorAll('.dropdown-item'),
        projectCards: document.querySelectorAll('.project-item-minimal'),
        projectTitle: document.getElementById('project-title'),
        projectArchitect: document.getElementById('project-architect-detail'),
        projectLocation: document.getElementById('project-location-detail'),
        projectDescription: document.getElementById('project-description'),
        projectGallery: document.getElementById('project-gallery-detail')
    };

    // FUNÇÕES UTILITÁRIAS
    const utils = {
        getUrlParameter: (name) => {
            const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
            const results = regex.exec(location.search);
            return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
        },

        updateURL: (param = '') => {
            const newURL = param ? `${window.location.pathname}?projeto=${param}` : window.location.pathname;
            window.history.pushState({ path: newURL }, '', newURL);
        },

        scrollToTop: () => window.scrollTo({ top: 0, behavior: 'smooth' }),

        toggleClasses: (element, removeClass, addClass) => {
            if (removeClass) element.classList.remove(removeClass);
            if (addClass) element.classList.add(addClass);
        },

        toggleDropdown: (show = null) => {
            const action = show === null ? 'toggle' : (show ? 'add' : 'remove');
            elements.dropdownMenu.classList[action]('show');
            elements.dropdownBtn.classList[action]('active');
        }
    };

    // NAVEGAÇÃO ENTRE VIEWS
    function showProjectsList() {
        elements.projectsList.style.display = 'block';
        elements.projectDetailView.style.display = 'none';
        utils.updateURL();
        utils.scrollToTop();
        // Use requestAnimationFrame for better performance
        requestAnimationFrame(() => {
            setTimeout(initScrollReveal, 50);
        });
    }

    function showProjectDetail(projectId) {
        const project = projectsData[projectId];
        if (!project) return;

        // Atualizar conteúdo do projeto
        elements.projectTitle.textContent = project.title;
        elements.projectArchitect.textContent = project.architect;
        elements.projectLocation.textContent = project.location;
        elements.projectDescription.innerHTML = `<p>${project.description}</p>`;

        // Gerar galeria
        const galleryHTML = project.images.map(image => 
            `<div class="gallery-item-dynamic">
                <img src="${image.src}" alt="${image.alt}" loading="lazy">
            </div>`
        ).join('');
        
        elements.projectGallery.innerHTML = `<div class="gallery-masonry">${galleryHTML}</div>`;

        // Alternar views
        elements.projectsList.style.display = 'none';
        elements.projectDetailView.style.display = 'block';
        utils.updateURL(projectId);
        utils.scrollToTop();
    }

    // SISTEMA DE FILTROS
    function handleFilter(filterValue) {
        elements.projectCards.forEach(card => {
            const cardArchitects = card.getAttribute('data-architect').split(' ');
            const shouldShow = filterValue === 'all' || cardArchitects.includes(filterValue);
            
            utils.toggleClasses(card, shouldShow ? 'hidden' : 'show', shouldShow ? 'show' : 'hidden');
        });
    }

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
        const observerOptions = {
            threshold: isMobile ? 0.1 : 0.15,
            rootMargin: isMobile ? '0px 0px -10% 0px' : '0px 0px -15% 0px'
        };

        scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const target = entry.target;
                
                if (entry.isIntersecting) {
                    if (!target.classList.contains('reveal')) {
                        utils.toggleClasses(target, 'reveal-out', 'reveal');
                    }
                } else if (target.classList.contains('reveal')) {
                    utils.toggleClasses(target, 'reveal', 'reveal-out');
                }
            });
        }, observerOptions);

        // Only observe visible cards
        const visibleCards = Array.from(elements.projectCards).filter(card => 
            !card.classList.contains('hidden')
        );

        visibleCards.forEach(card => {
            scrollObserver.observe(card);
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
        // Dropdown functionality
        if (elements.dropdownBtn && elements.dropdownMenu) {
            elements.dropdownBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                utils.toggleDropdown();
            });

            document.addEventListener('click', () => utils.toggleDropdown(false));
            elements.dropdownMenu.addEventListener('click', (e) => e.stopPropagation());
        }

        // Project cards
        elements.projectCards.forEach(card => {
            card.addEventListener('click', () => {
                showProjectDetail(card.getAttribute('data-project-id'));
            });
        });

        // Back button
        if (elements.backBtn) {
            elements.backBtn.addEventListener('click', showProjectsList);
        }

        // Filter dropdown items
        elements.dropdownItems.forEach(item => {
            item.addEventListener('click', () => {
                // Update active state
                elements.dropdownItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');

                // Update dropdown text
                if (elements.dropdownText) {
                    elements.dropdownText.textContent = item.textContent;
                }

                // Close dropdown and apply filter
                utils.toggleDropdown(false);
                handleFilter(item.getAttribute('data-filter'));
                
                // Reinitialize observer after filter
                cleanupScrollReveal();
                requestAnimationFrame(() => {
                    setTimeout(initScrollReveal, 100);
                });
            });
        });

        // Browser navigation
        window.addEventListener('popstate', () => {
            const projetoId = utils.getUrlParameter('projeto');
            projetoId && projectsData[projetoId] ? showProjectDetail(projetoId) : showProjectsList();
        });

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
        
        // Show all projects initially
        elements.projectCards.forEach(card => card.classList.add('show'));
        
        // Check for specific project in URL
        const projetoId = utils.getUrlParameter('projeto');
        if (projetoId && projectsData[projetoId]) {
            showProjectDetail(projetoId);
        } else {
            // Initialize scroll reveal with delay for better performance
            requestAnimationFrame(() => {
                setTimeout(initScrollReveal, 100);
            });
        }
    }

    init();
}); 