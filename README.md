# Logaf - Website Corporativo

Site institucional da Logaf, empresa especializada em marcenaria e projetos arquitetônicos.

## 📋 Versões

### 🎨 Versão 2.2 - Redesign Completo da Página de Projetos (Janeiro 2025)

#### Reformulação Visual Minimalista
- **Design Inspirado no Estúdio Maré**: Layout minimalista com foco nas imagens
- **Imagens Panorâmicas**: Formato wide ocupando 85% da largura da tela
- **Texto Sobreposto**: Títulos e arquitetos posicionados sobre as imagens
- **Tipografia Unificada**: Fonte Inter em toda a página com pesos variados
- **Paleta Neutra**: Fundo cinza claro com elementos em tons suaves

#### Sistema de Filtros Redesenhado
- **Lista Horizontal de Arquitetos**: "DUDA PORTO | PAOLA RIBEIRO | MAS ARQUITETURA"
- **Dropdown Minimalista**: Sistema "Filtrar por:" com menu suspenso elegante
- **Funcionalidade Preservada**: Todos os filtros mantendo scroll reveal
- **Responsividade Otimizada**: Layout adaptativo para mobile e tablet

#### Página Individual dos Projetos
- **Layout Estilo Estúdio Maré**: Header centralizado com informações minimalistas
- **Galeria Dinâmica**: Grid masonry com 12 colunas (desktop) e 4 colunas (mobile)
- **Tamanhos Variados**: Diferentes dimensões de imagem para layout interessante
- **Largura Limitada**: Máximo 800px para melhor foco no conteúdo
- **Navegação Simplificada**: Botão "Voltar" redesenhado com seta e texto

#### Scroll Reveal Effect Avançado
- **Animações Suaves**: Projetos aparecem com translateY(60px → 0)
- **Efeito de Saída**: Elementos desaparecem com translateY(-30px) ao rolar para cima
- **Intersection Observer**: API moderna para detecção de viewport
- **Configurações Responsivas**: Thresholds diferentes para mobile (0.05) e desktop (0.1)
- **Cubic-Bezier**: Transições naturais com curvas de animação otimizadas

#### Otimização Massiva de Código

##### CSS Refatorado (944 → ~550 linhas | 42% redução)
- **Duplicações Eliminadas**:
  - Font-family Inter: 15+ repetições → 1 variável
  - Transition all 0.3s ease: 8+ repetições → 1 variável
  - Color text-color-light: 10+ repetições → 1 variável
- **Media Queries Organizados**: Apenas 2 breakpoints (tablet e mobile) por seções
- **Grid Patterns Condensados**: 26 linhas nth-child → 13 linhas inline

##### JavaScript Otimizado (314 → ~250 linhas | 20% redução)
- **Cache de Elementos DOM**: Objeto `elements` centralizando todas as referências
- **Funções Utilitárias**: Objeto `utils` com helpers reutilizáveis
- **Event Listeners Centralizados**: Função `setupEventListeners()` unificada
- **Observer Management**: Cleanup adequado com `disconnect()`
- **Duplicações Removidas**:
  - Scroll to top repetido → `utils.scrollToTop()`
  - Class toggles repetidos → `utils.toggleClasses()`
  - Dropdown logic duplicado → `utils.toggleDropdown()`

#### Melhorias de Performance
- **Memory Leaks Prevenidos**: Gestão adequada de event listeners
- **Code Splitting**: Organização em módulos lógicos
- **Intersection Observer**: Substituição de scroll events por API moderna
- **Event Delegation**: Centralização para melhor performance

#### Problemas Resolvidos
- ✅ **Container Overflow**: Corrigido em telas pequenas
- ✅ **Dropdown Centralização**: Posicionamento correto em mobile
- ✅ **Scroll Reveal**: Re-inicialização adequada após filtros
- ✅ **Responsividade**: Layout perfeito em todos os dispositivos

#### Funcionalidades Mantidas 100%
- **URLs Dinâmicas**: `projetos.html?projeto=nome-do-projeto`
- **Navegação Browser**: Suporte completo ao botão voltar/avançar
- **Filtros por Arquiteto**: Sistema funcional preservado
- **Galeria Individual**: Visualização completa de projetos
- **Scroll to Top**: Transições suaves mantidas

#### Arquivos Modificados
```
projetos.html - Estrutura HTML reformulada com layout minimalista
css/pages/projects.css - CSS completamente reescrito e otimizado
js/projects.js - JavaScript refatorado com padrões modernos
```

---

### 🔥 Versão 2.1 - Otimizações e Reestruturação (Janeiro 2025)

#### Carrossel de Projetos - Animação CSS Pura
- **Performance Otimizada**: Substituição do JavaScript por animação CSS nativa
- **Rolagem Contínua**: Movimento suave e ininterrupto sem pausas
- **Velocidade Ajustável**: Controle simples através de divisor numérico (padrão: 30)
- **Efeito Infinito**: Duplicação inteligente de itens para loop perfeito
- **Sem Interrupções**: Removida pausa no hover para experiência fluida

#### Limpeza e Simplificação
- **Remoção de Seções Obsoletas**:
  - Seção de depoimentos (testimonials) removida completamente
  - Seção de estatísticas removida do index
  - Arquivos CSS e JavaScript relacionados deletados
- **Código Otimizado**: Remoção de imports e scripts desnecessários
- **Performance Melhorada**: Redução do tamanho total dos arquivos

#### Página Sobre - Nova Seção Principal
- **Design Baseado em Referência**: Layout inspirado em mockup fornecido
- **Navegação de Processos**: Três botões (PROJETO, ESTRATÉGIA, EXECUÇÃO)
- **Layout Responsivo Avançado**:
  - Desktop: Imagem no topo + duas colunas (títulos | parágrafos)
  - Mobile: Sequência alternada com CSS order inteligente
- **Tipografia Profissional**:
  - Títulos: Tenor Sans com cor primária e uppercase
  - Parágrafos: Inter com line-height otimizado (1.7)
- **Fundo Light-Gray**: Seção destacada com cor de fundo suave

#### Melhorias Técnicas
- **CSS Modular**: Organização aprimorada dos estilos por componente
- **Responsividade Refinada**: Breakpoints específicos para tablet (1024px)
- **Animações Suaves**: Transições CSS otimizadas
- **Código Limpo**: Remoção de estilos obsoletos (MVV, about-text antigo)

#### Arquivos Removidos
```
css/components/testimonials.css
css/components/statistics.css
js/testimonials.js
```

#### Arquivos Modificados
```
index.html - Remoção de seções e otimização do carrossel
sobre.html - Nova estrutura da seção principal
css/pages/about.css - Estilos completos para nova seção
css/components/index-projects.css - Animação CSS do carrossel
js/main.js - Substituição do carrossel JavaScript por CSS
css/style.css - Remoção de imports obsoletos
```

---

### 🆕 Versão 2.0 - Redesign e Melhorias (2025)

#### Hero Section - Controles Personalizados
- **Indicadores Customizados**: Substituição dos pontos tradicionais pelo ícone da Logaf
- **Navegação Simplificada**: Removidos botões laterais, mantidos apenas indicadores
- **Responsividade Aprimorada**: Tamanhos adaptativos (40px desktop, 28px mobile)

#### Sistema de Fontes Profissional
- **Adobe Fonts Integration**: Implementação das fontes originais do projeto
  - **TT Commons Pro**: Fonte corporativa principal
  - **The Seasons**: Fonte display para títulos especiais
- **Tenor Sans**: Mantida do Google Fonts para títulos
- **Fallbacks Inteligentes**: Sistema de fontes alternativas para compatibilidade

#### Seção "Quem Somos" - Nova Implementação
- **Layout Duas Colunas**: Título à esquerda, conteúdo à direita
- **Design Minimalista**: Fundo tertiary-color com tipografia branca
- **Link Interativo**: Botão animado para página "Sobre"
- **Altura Viewport**: Seção ocupa 100vh para impacto visual

#### Seção Serviços - Reformulação Completa
- **Layout Horizontal**: Grid 1x4 substituindo cards tradicionais
- **Efeitos Interativos**: 
  - Desktop: Hover para colorir imagens
  - Mobile: Scroll detection inteligente
- **Imagens Específicas**: 4 serviços com imagens dedicadas
- **Responsividade Avançada**: Empilhamento vertical no mobile

#### Seção Projetos - Carrossel Infinito
- **Auto-scroll Suave**: Rotação automática a cada 3 segundos
- **Efeito Infinito**: Loop contínuo sem quebras visuais
- **Controle Inteligente**: Pausa no hover, retoma automaticamente
- **Design Minimalista**: Imagens maiores sem bordas arredondadas
- **Link de Ação**: Botão "Conhecer projetos" com animação

#### Melhorias Técnicas
- **JavaScript Otimizado**: Funções modulares e performance melhorada
- **CSS Limpo**: Remoção de código obsoleto e organização
- **Responsividade Aprimorada**: Breakpoints refinados
- **Acessibilidade**: Melhor suporte a navegação por teclado

---

## 🚀 Funcionalidades

### Hero Slider Interativo
- **Navegação Automática**: As imagens mudam automaticamente a cada 5 segundos
- **Controles Manuais**: 
  - Indicadores personalizados na parte inferior usando o ícone da Logaf
  - Navegação por teclado (setas esquerda/direita)
- **Pausa Inteligente**: O slider pausa automaticamente quando o mouse está sobre a área
- **Design Responsivo**: Adapta-se perfeitamente a diferentes tamanhos de tela

### 🔤 Sistema de Fontes
- **Tenor Sans**: Fonte serif display para títulos e destaques
- **Inter**: Fonte sans-serif moderna para textos corporais (alternativa ao TT Commons Pro)
- **Playfair Display**: Fonte serif elegante para títulos principais (alternativa ao The Seasons)
- **Raleway & Montserrat**: Fontes originais mantidas para compatibilidade

### Outras Funcionalidades
- Design responsivo e moderno
- Galeria de projetos com carrossel animado CSS
- Formulário de contato
- Integração com redes sociais
- Otimizado para SEO

## 🛠️ Tecnologias Utilizadas

- HTML5
- CSS3 (com variáveis CSS e Flexbox/Grid)
- JavaScript (ES6+)
- Font Awesome (ícones)
- Fancybox (lightbox para imagens)

## 📱 Responsividade

O site é totalmente responsivo e funciona perfeitamente em:
- Desktop
- Tablets
- Smartphones

## 🎨 Personalização

### Cores Principais
- Verde Primário: `#5e8a66`
- Marrom Secundário: `#9d5c36`
- Cinza Escuro: `#333333`

### Fontes
- Raleway (texto principal)
- Montserrat (títulos e hero section)

## 📂 Estrutura do Projeto

```
├── index.html          # Página principal
├── sobre.html          # Página sobre a empresa
├── projetos.html       # Portfólio de projetos
├── eventos.html        # Página de eventos
├── css/
│   ├── style.css       # Arquivo principal de estilos
│   ├── components/     # Componentes CSS
│   │   ├── index-projects.css  # Carrossel de projetos
│   │   └── ...         # Outros componentes
│   └── pages/          # Estilos específicos de páginas
│       ├── about.css   # Estilos da página sobre
│       └── ...         # Outras páginas
├── js/
│   ├── main.js         # JavaScript principal
│   ├── projects.js     # Funcionalidades dos projetos
│   └── events.js       # Funcionalidades dos eventos
└── assets/             # Imagens e recursos
```

## 🚀 Como Usar

1. Clone o repositório
2. Abra o arquivo `index.html` em um navegador
3. Navegue pelas diferentes seções do site

## 📞 Contato

Para mais informações sobre a Logaf:
- Website: [logaf.com.br](http://logaf.com.br)
- Instagram: [@logafmarcenaria](https://www.instagram.com/logafmarcenaria/)
- Facebook: [Logaf Marcenaria](https://www.facebook.com/logafmarcenaria/)

---

Desenvolvido com ❤️ para a Logaf 