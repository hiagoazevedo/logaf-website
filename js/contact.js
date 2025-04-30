// Inicializa o EmailJS
(function() {
    // TODO: Substitua 'YOUR_PUBLIC_KEY' pela sua chave pública do EmailJS
    emailjs.init('L_43Oebps2zawTPNy');
})();

// Função para mostrar mensagem de sucesso/erro
function showMessage(message, isError = false) {
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    messageDiv.className = `message ${isError ? 'error' : 'success'}`;
    messageDiv.style.position = 'fixed';
    messageDiv.style.top = '20px';
    messageDiv.style.right = '20px';
    messageDiv.style.padding = '15px 25px';
    messageDiv.style.borderRadius = '5px';
    messageDiv.style.backgroundColor = isError ? '#ff4444' : '#4CAF50';
    messageDiv.style.color = 'white';
    messageDiv.style.zIndex = '1000';

    document.body.appendChild(messageDiv);

    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

// Adiciona o evento de submit ao formulário
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const phoneInput = document.getElementById('phone');
    const emailInput = document.getElementById('email');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Mostra um indicador de carregamento
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            submitButton.textContent = 'Enviando...';
            submitButton.disabled = true;
            
            // Coleta os dados do formulário
            const formData = {
                user_name: document.getElementById('user_name').value,
                user_email: document.getElementById('user_email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // Envia o email usando o EmailJS
            emailjs.send('service_46b3rtj', 'template_c5aqkxq', formData)
                .then(function() {
                    showMessage('Mensagem enviada com sucesso! Entraremos em contato em breve.');
                    contactForm.reset();
                })
                .catch(function(error) {
                    console.error('Erro ao enviar email:', error);
                    showMessage('Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente mais tarde.', true);
                })
                .finally(function() {
                    submitButton.textContent = originalButtonText;
                    submitButton.disabled = false;
                });
        });
    }

    // Máscara para o campo de telefone
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 11) value = value.slice(0, 11);
            
            if (value.length > 2) {
                value = `(${value.slice(0,2)}) ${value.slice(2)}`;
            }
            if (value.length > 9) {
                value = `${value.slice(0,9)}-${value.slice(9)}`;
            }
            
            e.target.value = value;
        });
    }

    // Validação de e-mail
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            const email = this.value;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (email && !emailRegex.test(email)) {
                this.setCustomValidity('Por favor, insira um e-mail válido');
            } else {
                this.setCustomValidity('');
            }
        });
    }

    // Animação dos cards de contato
    const contactCards = document.querySelectorAll('.contact-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });

    contactCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });

    // Validação em tempo real dos campos obrigatórios
    if (contactForm) {
        const requiredFields = contactForm.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            field.addEventListener('input', function() {
                if (this.value.trim() === '') {
                    this.setCustomValidity('Este campo é obrigatório');
                } else {
                    this.setCustomValidity('');
                }
            });
        });

        // Validação do tamanho da mensagem
        const messageField = document.getElementById('message');
        if (messageField) {
            messageField.addEventListener('input', function() {
                if (this.value.length < 10) {
                    this.setCustomValidity('A mensagem deve ter pelo menos 10 caracteres');
                } else {
                    this.setCustomValidity('');
                }
            });
        }
    }
}); 