document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM carregado');
    
    // Verificar se o Fancybox está disponível
    if (typeof Fancybox === 'undefined') {
        console.error('Fancybox não está carregado!');
        return;
    }
    
    console.log('Inicializando Fancybox...');
    
    // Configuração do Fancybox para a galeria de imagens
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
    
    console.log('Fancybox inicializado com sucesso!');
}); 