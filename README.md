# Libras nas Comunidades – UFAL

Sistema web (CMS) do projeto de extensão **Libras nas Comunidades**, vinculado à Universidade Federal de Alagoas (UFAL), Faculdade de Letras (FALE) e Pró-Reitoria de Extensão e Cultura (PROEXC).

## 🌐 Sobre o Projeto
O site tem como objetivo difundir a Língua Brasileira de Sinais (Libras), promover a acessibilidade e gerenciar as inscrições, aulas e cronogramas das turmas do curso.

## 🏗️ Arquitetura
O sistema foi construído de forma **100% estática** (via GitHub Pages), utilizando JavaScript puro (Vanilla JS) para consumir bancos de dados em formato JSON.
O gerenciamento de conteúdo (CMS) é feito pelo arquivo `admin.html`, que se comunica com a API do GitHub para atualizar os arquivos, e com o Google Apps Script para ler a lista de alunos (Google Drive).

### Arquivos Principais:
- `index.html`: Página inicial.
- `pagina.html`: Renderizador de textos (Sobre, Curso, Equipe).
- `calendario.html`: Cronograma de aulas.
- `aulas.html`: Mural de vídeos e PDFs.
- `inscricoes.html`: Status das turmas e links de inscrição.
- `admin.html`: Painel de Controle (Secretaria Digital).
- `estilo.css`: Design System global.
- `*.json`: Bancos de dados do sistema.

## 🔐 Segurança e Privacidade
- O painel administrativo é bloqueado para motores de busca (`robots.txt`).
- Os dados dos alunos **não** são salvos no GitHub (LGPD). Eles ficam armazenados com segurança no Google Drive e são lidos em tempo real pelo painel.
- O Token de acesso ao GitHub é armazenado apenas na memória temporária do navegador do administrador.

## 👨‍💻 Desenvolvedor
Desenvolvido por **Adeilton Olimpio**.
