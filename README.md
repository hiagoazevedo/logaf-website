# Logaf - Website Responsivo

Este é o repositório do website responsivo da Logaf, uma empresa de engenharia e arquitetura.

## Estrutura do Projeto

```
logaf-website/
├── index.html
├── sobre.html
├── projetos.html
├── eventos.html
├── css/
│   ├── style.css
│   ├── about.css
│   ├── projects.css
│   ├── events.css
│   ├── contact.css
│   ├── testimonials.css
│   ├── services.css
│   ├── index-projects.css
│   ├── sections.css
│   ├── hero.css
│   ├── header.css
│   ├── footer.css
│   └── statistics.css
├── js/
│   ├── main.js
│   ├── projects.js
│   ├── events.js
│   ├── contact.js
│   ├── debug.js
│   └── testimonials.js
├── assets/
│   ├── events/
│   ├── optimized/
│   ├── projects/
│   └── team/
└── docs/
   ├── checklist.md
   ├── documentation.md
   └── template_registration.md
```

## Tecnologias Utilizadas

- HTML5
- CSS3 (Grid e Flexbox)
- JavaScript (ES6+)
- Font Awesome (ícones)
- Google Maps API (mapa de contato)
- EmailJS (formulário de contato)
- Fancybox (galeria de imagens)
- Intersection Observer API (animações)
- CSS Variables (tema consistente)

## Características

- Design responsivo para todos os dispositivos
- Interface moderna e profissional
- Paleta de cores corporativa (#1a1a1a, #ffffff)
- Formulários com validação em tempo real
- Animações suaves e interativas
- Otimizado para performance
- Acessível (WCAG 2.1)
- Integração com serviço de email
- Galeria de imagens com lightbox
- Animações baseadas em scroll

## Páginas

1. **Home (index.html)**
   - Hero section com animação
   - Serviços com cards interativos
   - Projetos em destaque com galeria
   - Depoimentos com slider
   - Estatísticas animadas
   - Formulário de contato integrado com EmailJS
   - Newsletter

2. **Sobre (sobre.html)**
   - História da empresa
   - Missão e valores
   - Equipe com cards animados
   - Parceiros
   - Timeline interativa

3. **Projetos (projetos.html)**
   - Galeria de projetos com Fancybox
   - Filtros por categoria
   - Animações de entrada
   - Layout responsivo em grid

4. **Eventos (eventos.html)**
   - Galeria de eventos com Fancybox
   - Eventos passados
   - Layout responsivo
   - Animações de scroll

## Funcionalidades Principais

1. **Formulário de Contato**
   - Integração com EmailJS
   - Validação em tempo real
   - Máscara para campo de telefone
   - Feedback visual de envio
   - Template de email personalizado

2. **Galeria de Imagens**
   - Lightbox com Fancybox
   - Navegação por teclado
   - Zoom em imagens
   - Carregamento otimizado

3. **Animações**
   - Baseadas em scroll
   - Entrada de elementos
   - Transições suaves
   - Performance otimizada

## Como Executar

1. Clone o repositório
2. Configure o EmailJS:
   - Crie uma conta em https://www.emailjs.com/
   - Configure o serviço de email
   - Crie um template de email
   - Substitua as credenciais em `js/contact.js`
3. Abra o arquivo `index.html` em seu navegador
4. Para desenvolvimento, recomenda-se usar um servidor local (ex: Live Server do VS Code)

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## Contato

Para mais informações, entre em contato através do email: comercial@logaf.com.br 