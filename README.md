# 🏥 Sistema de Prontuário Integrado – NUPSS

Sistema completo e funcional para gerenciamento de prontuários de atendimento em saúde, desenvolvido em **HTML, CSS e JavaScript puro** (sem dependências externas).

## 📁 Arquivos

- **index.html** - Estrutura HTML da aplicação
- **styles.css** - Todos os estilos CSS
- **script.js** - Lógica JavaScript completa
- **README.md** - Este arquivo

## 🚀 Como Usar

1. Abra o arquivo `index.html` em qualquer navegador moderno (Chrome, Firefox, Edge, Safari)
2. Faça login com um dos usuários de demonstração abaixo
3. O sistema funciona completamente no navegador sem necessidade de servidor

## 👥 Usuários de Demonstração

Todos com senha: **1234**

| Usuário | Nome | Perfil | Acesso |
|---------|------|--------|--------|
| nupss | Dra. Mariana Souza | NUPSS | Serviço Social, Encaminhamentos |
| fisioterapeuta | Dr. Carlos Lima | Fisioterapia | Prontuários de Fisioterapia |
| odontologia | Dra. Paula Rocha | Odontologia | Prontuários de Odontologia |
| nai | Dr. Fernando Dias | NAI | Acessibilidade e Inclusão |
| nae | Dra. Camila Nunes | NAE | Atendimento ao Estudante |
| nap | Psic. Renata Alves | NAP | Apoio Psicopedagógico |
| supervisor | Prof. Ana Beatriz | Supervisor | Acesso completo |
| recepcao | Juliana Mendes | Recepção | Cadastro e Agendamentos |

## ✨ Funcionalidades

### 📋 Cadastro de Estudantes
- Recepção pode cadastrar novos estudantes
- Coleta dados completos: pessoais, acadêmicos, de contato
- Gera ID único automaticamente

### 📝 Prontuários Multidisciplinares

1. **NUPSS** (Serviço Social)
   - Situação socioeconômica
   - Rede de suporte familiar
   - Identificação de riscos

2. **NAE** (Atendimento ao Estudante)
   - Situação acadêmica
   - Demandas financeiras
   - Bem-estar e permanência

3. **NAI** (Acessibilidade)
   - Condições de deficiência
   - Barreiras no ambiente
   - Recursos e adaptações

4. **NAP** (Psicologia)
   - Histórico psicológico
   - Contexto familiar
   - Objetivos e conduta

5. **Fisioterapia**
   - Avaliação clínica
   - Plano de tratamento
   - Evolução do atendimento

6. **Odontologia**
   - Histórico odontológico
   - Avaliação clínica
   - Necessidades identificadas

### 📅 Agendamentos
- Criar novos agendamentos
- Definir serviço, horário e profissional
- Rastrear status (Confirmado/Pendente/Cancelado)

### 📤 Encaminhamentos
- Encaminhar entre serviços internos ou externos
- Registrar motivo e status
- Histórico completo

### 📋 Evoluções
- Registrar evolução de cada atendimento
- Data, profissional e descrição automática
- Histórico completo por serviço

### 🔍 Auditoria
- Log completo de todas as ações
- Data/hora, usuário, ação e IP
- Rastreabilidade total

### 🔐 Segurança
- Diferentes perfis de acesso
- Cada usuário vê apenas o permitido
- Avisos de confidencialidade LGPD

## 🎯 Fluxos Principais

### Fluxo de Login
```
Login → Validação → Dashboard
         ↓
    Visualizar estudantes
         ↓
    Selecionar prontuário
         ↓
    Editar/Visualizar dados
```

### Fluxo de Cadastro
```
Recepção → Novo Estudante → Preencher Dados
            ↓
        ID Gerado → Salvo
            ↓
        Disponível para atendimento
```

### Fluxo de Atendimento
```
Profissional → Seleciona Estudante
    ↓
Preenche Prontuário → Registra Evolução
    ↓
Realiza Encaminhamento se necessário
    ↓
Sistema registra na auditoria
```

## 📊 Dados de Exemplo

O sistema vem com 2 estudantes pré-cadastrados:

1. **Ana Paula Ferreira** (P001)
   - Fisioterapia, 3º período
   - Com prontuários NUPSS e NAP preenchidos
   - Agendamentos e encaminhamentos

2. **João Carlos Mendes** (P002)
   - Direito, 2º período
   - Com prontuário NAE preenchido
   - Dados socioeconômicos

## 🛠️ Tecnologias

- **HTML5** - Estrutura semântica
- **CSS3** - Estilos responsivos com Flexbox e Grid
- **JavaScript Vanilla** - Lógica pura sem frameworks
- **Fontes Google** - Crimson Pro e DM Sans

## 📱 Responsividade

- Layout adaptável para desktop e tablet
- Mobile-first approach
- Suporta diferentes tamanhos de tela

## 💾 Armazenamento

- **LocalStorage**: Não é usado (dados em memória)
- **Dados**: Carregados ao iniciar, perdidos ao recarregar
- Para persistência: Adicione localStorage ou backend

## 🔧 Customização

### Adicionar novo usuário
Edite `script.js` na seção `USUARIOS`:
```javascript
"novo_user": { nome: "Nome", perfil: "nupss", senha: "1234", cor: "#000000" }
```

### Adicionar novo prontuário
1. Adicione tipo em `ABAS_CONFIG`
2. Crie função `renderForm[Tipo]`
3. Adicione opção em `salvarProntuario`

### Alterar cores
Procure por `PERFIS` em `script.js` e mude os valores `cor`

## ⚠️ Informações de Confidencialidade

O sistema exibe avisos sobre proteção de dados LGPD e sigilo profissional. Implemente protocolo de segurança apropriado em produção.

## 📄 Licença

Sistema educacional - Universidade de Vassouras

## 🤝 Suporte

Para dúvidas ou melhorias, consulte a documentação completa do sistema.

---

**Desenvolvido com ❤️ para gerenciamento integrado de saúde estudantil**
