document.addEventListener('DOMContentLoaded', function() {
    // DADOS DOS SERVIÇOS
    const servicesData = {
        'residenciais': {
            title: 'Projetos<br>Residenciais',
            description: 'Transformamos casas e apartamentos em ambientes únicos, com móveis planejados que aliam funcionalidade, estética e aconchego. Da cozinha à suíte master, cada detalhe é pensado para refletir o estilo de vida dos moradores.',
            imageSrc: 'assets/SERVICOS-RESIDENCIAIS.jpg',
            imageWebp: 'assets/optimized/servicos/SERVICOS-RESIDENCIAIS-SMALL.webp'
        },
        'externas': {
            title: 'Áreas<br>Externas',
            description: 'Criamos soluções resistentes e elegantes para varandas, espaços gourmet, jardins e áreas de lazer — valorizando a integração com a natureza e o conforto no dia a dia.',
            imageSrc: 'assets/SERVICOS-EXTERNAS.jpg',
            imageWebp: 'assets/optimized/servicos/SERVICOS-EXTERNAS-SMALL.webp'
        },
        'corporativos': {
            title: 'Projetos<br>Corporativos',
            description: 'Oferecemos marcenaria inteligente para escritórios, clínicas e ambientes profissionais, sempre com foco em ergonomia, organização e imagem institucional.',
            imageSrc: 'assets/SERVICOS-EXECUTIVOS.jpg',
            imageWebp: 'assets/optimized/servicos/SERVICOS-EXECUTIVOS-SMALL.webp'
        },
        'comerciais': {
            title: 'Projetos<br>Comerciais',
            description: 'Desenvolvemos mobiliário sob medida para lojas, restaurantes, hotéis e outros espaços comerciais, buscando funcionalidade, excelência do cliente e identidade de marca.',
            imageSrc: 'assets/SERVICOS-COMERCIAIS.jpg',
            imageWebp: 'assets/optimized/servicos/SERVICOS-COMERCIAIS-SMALL.webp'
        }
    };

    // CACHE DE ELEMENTOS DOM
    const elements = {
        serviceCards: document.querySelectorAll('.service-card'),
        featuredImage: document.getElementById('featured-image'),
        featuredTitle: document.getElementById('featured-title'),
        featuredDescription: document.getElementById('featured-description'),
        featuredServiceContent: document.querySelector('.featured-service-content')
    };

    // UTILITY FUNCTIONS
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

    // FUNÇÃO PARA OBTER PARÂMETROS DA URL
    function getUrlParameter(name) {
        const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        const results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }

    // MAPEAMENTO DE SERVIÇOS DO INDEX PARA IDS INTERNOS
    const serviceMapping = {
        'executivo': 'residenciais',
        'fabricacao': 'externas', 
        'manutencao': 'corporativos',
        'marcenaria': 'comerciais'
    };

    // FUNÇÃO PARA ATUALIZAR SERVIÇO EM DESTAQUE
    function updateFeaturedService(serviceId) {
        const service = servicesData[serviceId];
        if (!service) return;

        // Adiciona efeito de fade out
        elements.featuredServiceContent.style.opacity = '0.5';
        elements.featuredServiceContent.style.transform = 'translateY(10px)';

        setTimeout(() => {
            // Atualizar conteúdo
            elements.featuredTitle.innerHTML = service.title;
            elements.featuredDescription.textContent = service.description;
            
            // Atualizar imagem
            const picture = elements.featuredImage.parentElement;
            const source = picture.querySelector('source');
            
            source.srcset = service.imageWebp;
            elements.featuredImage.src = service.imageSrc;
            elements.featuredImage.alt = service.title.replace('<br>', ' ');

            // Adiciona efeito de fade in
            elements.featuredServiceContent.style.opacity = '1';
            elements.featuredServiceContent.style.transform = 'translateY(0)';
        }, 200);
    }

    // FUNÇÃO PARA ATUALIZAR ESTADO ATIVO DOS CARDS
    function updateActiveCard(activeServiceId) {
        elements.serviceCards.forEach(card => {
            const serviceId = card.getAttribute('data-service');
            if (serviceId === activeServiceId) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });
    }

    // FUNÇÃO PARA SCROLL SUAVE PARA A SEÇÃO PRINCIPAL
    function scrollToFeaturedService() {
        const featuredService = document.querySelector('.featured-service');
        if (featuredService) {
            // Calcular offset responsivo baseado no tamanho da tela
            const isMobile = window.innerWidth <= 768;
            const headerHeight = document.querySelector('.header')?.offsetHeight || 70;
            const extraMargin = isMobile ? 20 : 50;
            const offsetTop = featuredService.offsetTop - headerHeight - extraMargin;
            
            window.scrollTo({
                top: Math.max(0, offsetTop), // Garantir que não seja negativo
                behavior: 'smooth'
            });
        }
    }

    // FUNÇÃO PRINCIPAL PARA TROCAR SERVIÇO
    function switchService(serviceId, shouldScroll = true) {
        updateFeaturedService(serviceId);
        updateActiveCard(serviceId);
        
        // Scroll para a seção principal se solicitado
        if (shouldScroll) {
            // Pequeno delay para sincronizar com a animação de conteúdo
            setTimeout(() => {
                scrollToFeaturedService();
            }, 100);
        }
    }

    // EVENT LISTENERS
    function setupEventListeners() {
        // Clique nos cards do carrossel
        elements.serviceCards.forEach(card => {
            card.addEventListener('click', function() {
                const serviceId = this.getAttribute('data-service');
                switchService(serviceId);
            });

            // Feedback visual de hover
            card.addEventListener('mouseenter', function() {
                if (!this.classList.contains('active')) {
                    this.style.transform = 'translateY(-5px)';
                }
            });

            card.addEventListener('mouseleave', function() {
                if (!this.classList.contains('active')) {
                    this.style.transform = 'translateY(0)';
                }
            });
        });
    }

    // ANIMAÇÕES DE ENTRADA
    function initEntryAnimations() {
        // Animação para o serviço em destaque
        const featuredService = document.querySelector('.featured-service');
        const servicesCarousel = document.querySelector('.services-carousel');

        // Observer para animações de entrada
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Configurar elementos para animação
        [featuredService, servicesCarousel].forEach(element => {
            if (element) {
                element.style.opacity = '0';
                element.style.transform = 'translateY(30px)';
                element.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                observer.observe(element);
            }
        });
    }

    // RESPONSIVIDADE AVANÇADA
    function handleResponsiveChanges() {
        const handleResize = debounce(() => {
            // Reajustar layout se necessário
            const isMobile = window.innerWidth <= 768;
            
            if (isMobile) {
                // Ajustes específicos para mobile
                elements.featuredServiceContent.style.transition = 'all 0.3s ease';
            } else {
                // Ajustes para desktop
                elements.featuredServiceContent.style.transition = 'all 0.3s ease';
            }
        }, 300);

        window.addEventListener('resize', handleResize);
        handleResize(); // Executar na inicialização
    }

    // INICIALIZAÇÃO
    function init() {
        setupEventListeners();
        initEntryAnimations();
        handleResponsiveChanges();
        
        // Verificar se há um serviço específico na URL
        const serviceParam = getUrlParameter('servico');
        let initialService = 'residenciais'; // padrão
        
        if (serviceParam && serviceMapping[serviceParam]) {
            initialService = serviceMapping[serviceParam];
        } else if (serviceParam && servicesData[serviceParam]) {
            initialService = serviceParam;
        }
        
        // Definir serviço inicial (sem scroll na inicialização)
        switchService(initialService, false);
        
        console.log('Services page initialized successfully with service:', initialService);
    }

    init();
});