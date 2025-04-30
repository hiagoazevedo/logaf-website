# Documentação Técnica - Site Logaf

## 1. Estrutura do Projeto

### 1.1 Páginas Principais
- [index.html](cci:7://file:///c:/Users/Hiago/OneDrive/%C3%81rea%20de%20Trabalho/Dev/Projetos%20pessoais/Logaf%202/index.html:0:0-0:0): Página inicial
- [sobre.html](cci:7://file:///c:/Users/Hiago/OneDrive/%C3%81rea%20de%20Trabalho/Dev/Projetos%20pessoais/Logaf%202/sobre.html:0:0-0:0): Sobre a empresa
- [projetos.html](cci:7://file:///c:/Users/Hiago/OneDrive/%C3%81rea%20de%20Trabalho/Dev/Projetos%20pessoais/Logaf%202/projetos.html:0:0-0:0): Portfólio de projetos
- [eventos.html](cci:7://file:///c:/Users/Hiago/OneDrive/%C3%81rea%20de%20Trabalho/Dev/Projetos%20pessoais/Logaf%202/eventos.html:0:0-0:0): Eventos e notícias

### 1.2 Estrutura de Diretórios
logaf-website/
├── index.html
├── sobre.html
├── projetos.html
├── eventos.html
├── assets/
│   ├── projects/
│   ├── events/
│   ├── team/
│   └── optimized/
├── css/
│   ├── components/
│   ├── pages/
│   ├── style.css
├── js/
│   ├── main.js
│   ├── projects.js
│   ├── events.js
│   ├── contact.js
│   ├── debug.js
│   └── testimonials.js
└── docs/
   ├── checklist.md
   ├── documentation.md
   └── template_registration.md

## 2. Tecnologias Utilizadas

### 2.1 Frontend
- HTML5
- CSS3
- JavaScript
- Font Awesome (ícones)

### 2.2 Integrações
- EmailJS (para formulário de contato)
- CDN para bibliotecas externas

## 3. Recursos Principais

### 3.1 Funcionalidades
- Formulário de contato integrado com EmailJS
- Galeria de projetos com lightbox
- Menu responsivo
- Carrossel de projetos
- Integração com redes sociais

### 3.2 Otimizações
- Imagens otimizadas em WebP
- Lazy loading para imagens
- CSS e JavaScript organizados
- Meta tags SEO
- Responsividade completa

## 4. Procedimentos de Manutenção

### 4.1 Atualização de Conteúdo
1. Atualize o conteúdo no arquivo HTML correspondente
2. Opcionalmente, crie um backup antes da alteração
3. Verifique a responsividade
4. Teste os links e formulários

### 4.2 Atualização de Imagens
1. Otimizar imagens usando ferramentas como TinyPNG ou Squoosh
2. Converter para WebP quando possível
3. Manter nomes descritivos
4. Atualizar caminhos no HTML

### 4.3 Atualização de Código
1. Faça um backup do arquivo original
2. Faça as alterações necessárias
3. Teste em ambiente local
4. Faça o deploy
5. Verifique em diferentes dispositivos

## 5. Histórico de Versões

### Versão 1.0.0 (2025-04-30)
- Primeira versão do site
- Implementação da estrutura básica
- Otimização de imagens
- Configuração de SEO
- Integração com redes sociais