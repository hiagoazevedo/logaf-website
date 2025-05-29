document.addEventListener('DOMContentLoaded', function() {
    // Dados dos projetos
    const projectsData = {
        'reserva-golf': {
            title: 'Ipanema',
            architect: 'Duda Porto',
            location: 'Barra da Tijuca, RJ',
            area: '400 m²',
            year: '2024',
            description: 'Um apartamento de 400 m² no Condomínio Reserva Golf, um dos mais nobres da Barra da Tijuca, recebeu o projeto arquitetônico de Duda Porto com muita elegância. O material predominante é o laminado natural freijó, além de lacas coloridas nos quartos infantis e laca preto proporcionando sofisticação ao escritório. Outro destaque é o uso de material ripado proporcionando modernidade e aconchego nos ambientes.',
            images: [
                { src: 'assets/projects/reserva-golf/01.jpg', alt: 'Sala de estar' },
                { src: 'assets/projects/reserva-golf/02.jpg', alt: 'Sala de estar' },
                { src: 'assets/projects/reserva-golf/03.jpg', alt: 'Sala de estar' },
                { src: 'assets/projects/reserva-golf/04.jpg', alt: 'Sala íntima' },
                { src: 'assets/projects/reserva-golf/05.jpg', alt: 'Quarto menina' },
                { src: 'assets/projects/reserva-golf/06.jpg', alt: 'Sala de estar' },
                { src: 'assets/projects/reserva-golf/07.jpg', alt: 'Quarto do casal' },
                { src: 'assets/projects/reserva-golf/08.jpg', alt: 'Quarto do casal' },
                { src: 'assets/projects/reserva-golf/09.jpg', alt: 'Quarto do casal' },
                { src: 'assets/projects/reserva-golf/10.jpg', alt: 'Quarto do casal' },
                { src: 'assets/projects/reserva-golf/11.jpg', alt: 'Escritório' },
                { src: 'assets/projects/reserva-golf/12.jpg', alt: 'Escritório' }
            ]
        },
        'golden-green': {
            title: 'Condomínio Golden Green',
            architect: 'Duda Porto',
            location: 'Barra da Tijuca, RJ',
            area: '400 m²',
            year: '2024',
            description: 'Em parceria com arquiteto Duda Porto, este imóvel apresenta móveis construídos com laca fendi, laminado natural freijó e um painel brise no hall social, deixando o ambiente ainda mais acolhedor. Localizado no Golden Green, na Barra da Tijuca, o apartamento possui uma copa toda em laca preta, onde é servido o café da manhã e também é o espaço em que o casal recebe seus amigos, um dos ambientes preferidos dos moradores.',
            images: [
                { src: 'assets/projects/golden-green/01.jpg', alt: 'Sala de estar' },
                { src: 'assets/projects/golden-green/02.jpg', alt: 'Sala de jantar' },
                { src: 'assets/projects/golden-green/03.jpg', alt: 'Home theater' },
                { src: 'assets/projects/golden-green/04.jpg', alt: 'Escritório' },
                { src: 'assets/projects/golden-green/05.jpg', alt: 'Quarto' },
                { src: 'assets/projects/golden-green/06.jpg', alt: 'Banheiro' },
                { src: 'assets/projects/golden-green/07.jpg', alt: 'Sala de estar' },
                { src: 'assets/projects/golden-green/08.jpg', alt: 'Sala de estar' },
                { src: 'assets/projects/golden-green/09.jpg', alt: 'Sala de estar' },
                { src: 'assets/projects/golden-green/10.jpg', alt: 'Sala de estar' }
            ]
        },
        'casa-teresopolis': {
            title: 'Casa Teresópolis',
            architect: 'Mas Arquitetura',
            location: 'Teresópolis, RJ',
            area: '400 m²',
            year: '2024',
            description: 'Localizada em um condomínio de alto padrão em Teresópolis, essa casa foi trabalhada com material Ipê Champagne, Laminado Cumaru e madeiras de demolição na cozinha gourmet. Com projeto da Mas Arquitetura, executado por Cristina Afonso, os quartos infantis e banheiros receberam lacas brancas e diferentes tonalidades de verde.',
            images: [
                { src: 'assets/projects/casa-teresopolis/01.jpg', alt: 'Área de lazer' },
                { src: 'assets/projects/casa-teresopolis/02.jpg', alt: 'Área gourmet' },
                { src: 'assets/projects/casa-teresopolis/03.jpg', alt: 'Área gourmet' },
                { src: 'assets/projects/casa-teresopolis/04.jpg', alt: 'Área gourmet' },
                { src: 'assets/projects/casa-teresopolis/05.jpg', alt: 'Área gourmet' },
                { src: 'assets/projects/casa-teresopolis/06.jpg', alt: 'Área gourmet' },
                { src: 'assets/projects/casa-teresopolis/07.jpg', alt: 'Sala de estar' },
                { src: 'assets/projects/casa-teresopolis/08.jpg', alt: 'Banheiro' },
                { src: 'assets/projects/casa-teresopolis/09.jpg', alt: 'Quarto casal' },
                { src: 'assets/projects/casa-teresopolis/10.jpg', alt: 'Quarto visita' },
                { src: 'assets/projects/casa-teresopolis/11.jpg', alt: 'Quarto visita' },
                { src: 'assets/projects/casa-teresopolis/12.jpg', alt: 'Cozinha' }
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
        setTimeout(initScrollReveal, 100);
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
            const cardArchitect = card.getAttribute('data-architect');
            const shouldShow = filterValue === 'all' || cardArchitect === filterValue;
            
            utils.toggleClasses(card, shouldShow ? 'hidden' : 'show', shouldShow ? 'show' : 'hidden');
        });
    }

    // SCROLL REVEAL EFFECT
    let scrollObserver;

    function initScrollReveal() {
        if (scrollObserver) scrollObserver.disconnect();

        const isMobile = window.innerWidth <= 768;
        const observerOptions = {
            threshold: isMobile ? 0.05 : 0.1,
            rootMargin: isMobile ? '0px 0px -30px 0px' : '0px 0px -50px 0px'
        };

        scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const target = entry.target;
                
                if (entry.isIntersecting) {
                    utils.toggleClasses(target, 'reveal-out', 'reveal');
                } else if (target.classList.contains('reveal')) {
                    utils.toggleClasses(target, 'reveal', 'reveal-out');
                    
                    setTimeout(() => {
                        if (!entry.isIntersecting) target.classList.remove('reveal-out');
                    }, isMobile ? 400 : 600);
                }
            });
        }, observerOptions);

        elements.projectCards.forEach(card => {
            if (!card.classList.contains('hidden')) {
                scrollObserver.observe(card);
            }
        });
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
                
                setTimeout(() => initScrollReveal(), 100);
            });
        });

        // Browser navigation
        window.addEventListener('popstate', () => {
            const projetoId = utils.getUrlParameter('projeto');
            projetoId && projectsData[projetoId] ? showProjectDetail(projetoId) : showProjectsList();
        });

        // Responsive scroll reveal
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(initScrollReveal, 250);
        });
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
            initScrollReveal();
        }
    }

    init();
}); 