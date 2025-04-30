document.addEventListener('DOMContentLoaded', function() {
    console.log('Página carregada');
    
    // Verificar se os carrosséis existem
    const carousels = document.querySelectorAll('.project-carousel');
    console.log('Número de carrosséis encontrados:', carousels.length);
    
    // Verificar se as imagens existem
    const images = document.querySelectorAll('.carousel-slide img');
    console.log('Número de imagens encontradas:', images.length);
    
    // Verificar se há erros de carregamento de imagem
    images.forEach((img, index) => {
        img.onerror = function() {
            console.error('Erro ao carregar imagem:', img.src);
        };
    });
}); 