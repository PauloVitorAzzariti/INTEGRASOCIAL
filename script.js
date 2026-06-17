// ─── USUÁRIOS ────────────────────────────────────────────────────────────────
const USUARIOS = {
    admin: { nome: "Administrador", perfil: "admin", senha: "Admin@2026", cor: "#b91c1c" },
    "nupss": { nome: "Assistente Social Marina", perfil: "nupss", senha: "1234", cor: "#2A7F6F" },
    "fisioterapeuta": { nome: "Dr. Carlos Lima", perfil: "fisioterapeuta", senha: "1234", cor: "#1B5E8A" },
    "odontologia": { nome: "Dra. Paula Rocha", perfil: "odontologia", senha: "1234", cor: "#0e7490" },
    "nai": { nome: "Dr. Fernando Dias", perfil: "nai", senha: "1234", cor: "#6B3FA0" },
    "nae": { nome: "Dra. Camila Nunes", perfil: "nae", senha: "1234", cor: "#b45309" },
    "nap": { nome: "Psic. Renata Alves", perfil: "nap", senha: "1234", cor: "#be185d" },
    "supervisor": { nome: "Prof. Ana Beatriz", perfil: "supervisor", senha: "1234", cor: "#374151" },
    "recepcao": { nome: "Juliana Mendes", perfil: "recepcao", senha: "1234", cor: "#b45309" },
};

const PERFIS = {
    admin:         { label: "Administrador", icon: "🛡️", cor: "#b91c1c" },
    nupss:         { label: "NUPSS", icon: "🏠", cor: "#2A7F6F" },
    nae:           { label: "NAE", icon: "🎓", cor: "#b45309" },
    nai:           { label: "NAI", icon: "♿", cor: "#6B3FA0" },
    nap:           { label: "NAPp", icon: "🧠", cor: "#be185d" },
    odontologia:   { label: "Odontologia", icon: "🦷", cor: "#0e7490" },
    fisioterapeuta:{ label: "Fisioterapia", icon: "🦴", cor: "#1B5E8A" },
    nutri:         { label: "Nutrição", icon: "🥗", cor: "#f59e0b" },
    secretaria:    { label: "Secretaria", icon: "🗂️", cor: "#9333ea" },
    recepcao:      { label: "Recepção", icon: "📋", cor: "#b45309" },
    supervisor:    { label: "Coordenação", icon: "🎓", cor: "#374151" },
};

const LOGIN_ORDER = [
    "nupss",
    "nae",
    "nai",
    "nap",
    "odontologia",
    "fisioterapeuta",
    "nutri",
    "secretaria",
    "recepcao",
    "supervisor",
    "admin",
];

// ─── UTILS ────────────────────────────────────────────────────────────────────
function calcIdade(nasc) {
    if(!nasc) return "—";
    const d = new Date(nasc);
    const h = new Date();
    let a = h.getFullYear() - d.getFullYear();
    if(h.getMonth() < d.getMonth() || (h.getMonth() === d.getMonth() && h.getDate() < d.getDate())) a--;
    return a;
}

function fmtData(d) {
    return d ? new Date(d + "T00:00:00").toLocaleDateString("pt-BR") : "—";
}

function agora() {
    const n = new Date();
    return `${n.toLocaleDateString("pt-BR")} ${n.toLocaleTimeString("pt-BR", {hour:"2-digit", minute:"2-digit"})}`;
}

function uid() {
    return Math.random().toString(36).slice(2,8).toUpperCase();
}

// ─── ESTADO INICIAL ───────────────────────────────────────────────────────────
function mkPaciente(id, nome, nasc, curso, periodo, matricula, turno, cpf, rg, emailInst, emailPes, tel, end, tipo = "Estudante") {
    return {
        id, 
        meta: { id, nome, nascimento:nasc, cpf, rg, emailInst, emailPes, telefone:tel, endereco:end, curso, periodo, matricula, turno, status:"Ativo", tipo, ultimoAtendimento:"2026-05-08" },
        agendamentos: [],
        prontuarios: { nupss:null, fisio:null, odonto:null, nai:null, nae:null, nap:null },
        evolucoes: { nupss:[], fisio:[], odonto:[], nai:[], nae:[], nap:[] },
        encaminhamentos: [],
        auditoria: [],
    };
}

const INICIAL_PACIENTES = {
    "P001": (() => {
        const p = mkPaciente("P001","Ana Paula Ferreira","2000-03-15","Fisioterapia","3","2023001","Noturno","***.***.***-01","MG-***","ana.ferreira@aluno.vassouras.edu.br","ana@gmail.com","(24) 99999-1111","Rua das Flores, 123 – Saquarema/RJ");
        p.prontuarios.nupss = { chegada:"espontanea", quemEncaminhou:"", motivoEncaminhamento:"", situacaoPrevidenciaria:"", beneficiosSociais:"", rendaFamiliar:"1,5 SM", numPessoas:"4", moradia:"alugada", situacaoMoradia:"", trabalha:"nao", vinculoEmprego:"", cargaHoraria:"", dificuldadesFinanceiras:"", redesSuporte:"", violenciaSituacaoRisco:"nao", observacoesSociais:"Família em situação de vulnerabilidade.", condutaEncaminhamento:"", observacoesProfissional:"Boa receptividade. Triagem realizada." };
        p.prontuarios.nap = { chegada:"encaminhamento_nupss", quemEncaminhou:"Dra. Mariana Souza", motivoDeclarado:"Ansiedade acadêmica", relato:"Sente muita ansiedade antes das provas.", tempoDificuldade:"6 meses", categorias:["ansiedade"], especificacao:"", escolasAnteriores:"Colégio Estadual NS", anoIngresso:"2023", reprovacoesTrancamentos:"Não", desempenhoAtual:"Regular", disciplinasDificuldade:"Bioestatística", rotina:"2h/dia, em casa", acompPsico:"nao", descAcomp:"", diagnostico:"nenhum", medicacao:"nenhum", especDiagMed:"", historicoSofrimento:"", comQuemReside:"Mãe e pai", situacaoMoradia:"alugada", trabalha:"nao", cargaHoraria:"", relacaoFamiliar:"Boa", redApoio:"Mãe e namorado", situacoesRelevantes:"", objetivosExpectativas:"Diminuir a ansiedade nas provas.", observacoesProfissional:"Estudante ansiosa, colaborativa.", conduta:"acomp_psico", detalheCoduta:"Iniciar acompanhamento semanal." };
        p.evolucoes.nupss = [{ data:"2026-03-10", profissional:"Dra. Mariana Souza", registro:"Triagem socioeconômica realizada. Demanda habitacional identificada." }];
        p.evolucoes.nap = [{ data:"2026-04-02", profissional:"Psic. Renata Alves", registro:"1ª sessão. Rapport estabelecido. Técnicas de respiração introduzidas." }];
        p.encaminhamentos = [{ data:"2026-04-05", origem:"NUPSS", destino:"NAPp", motivo:"Suporte psicológico para ansiedade acadêmica", status:"Concluído" }];
        p.agendamentos = [{ id:"A1", data:"2026-05-14", hora:"09:00", servico:"Fisioterapia", profissional:"Dr. Carlos Lima", status:"Confirmado" }];
        p.auditoria = [{ data:"2026-05-10 14:32", usuario:"fisioterapeuta", acao:"Visualizou prontuário", ip:"192.168.*.*" }];
        return p;
    })(),
    "P002": (() => {
        const p = mkPaciente("P002","João Carlos Mendes","2001-07-22","Direito","2","2023042","Noturno","***.***.***-02","RJ-***","joao.mendes@aluno.vassouras.edu.br","joao@gmail.com","(24) 99999-2222","Av. Central, 500 – Saquarema/RJ");
        p.prontuarios.nae = { chegada:"espontanea", quemEncaminhou:"", contexto:"", ira:"6.5", faltas:"15%", anoIngresso:"2023", trancamentos:"Não", risco:"Não", disciplinasDificuldade:"Direito Penal, Civil", financiamento:"mensalidade", rendaFamiliar:"2 SM", numPessoas:"3", responsavelFinanceiro:"Pai", trabalha:"sim", vinculoEmprego:"CLT", cargaHoraria:"40h", dificuldadesFinanceiras:"Transporte caro", barreiras:["transporte"], relato:"Dificuldade de manter mensalidade.", demanda:["apoio_financeiro"], comQuemReside:"Pais", distancia:"30km", transporte:"Ônibus", vulnerabilidade:"Moderada", conhecePoliticas:"sim", saude:"nao_acomp", obsSaude:"", objetivos:"Conseguir bolsa parcial.", conduta:["enc_nupss"], detalheCoduta:"Encaminhar para análise socioeconômica.", observacoesProfissional:"Estudante comunicativo, situação financeira instável." };
        p.agendamentos = [{ id:"A2", data:"2026-05-16", hora:"10:30", servico:"NAE", profissional:"Dra. Camila Nunes", status:"Confirmado" }];
        return p;
    })(),
};

// ─── APP STATE ────────────────────────────────────────────────────────────────
let appState = {
    usuario: null,
    tela: "lista",
    pidSel: null,
    abaSel: "identificacao",
    busca: "",
    adminBusca: "",
    listaFiltro: "todos",
    pacientes: {...INICIAL_PACIENTES},
    toast: null,
    modal: null,
};

const ABAS_CONFIG = {
    recepcao:      ["identificacao","agendamentos","auditoria"],
    nupss:         ["resumo","nupss","agendamentos"],
    fisioterapeuta:["identificacao","fisio","evolucoes","auditoria"],
    odontologia:   ["identificacao","odonto","evolucoes","auditoria"],
    nai:           ["identificacao","nai","encaminhamentos","evolucoes","auditoria"],
    nae:           ["identificacao","nae","encaminhamentos","evolucoes","auditoria"],
    nap:           ["identificacao","nap","encaminhamentos","evolucoes","auditoria"],
    supervisor:    ["identificacao","nupss","fisio","odonto","nai","nae","nap","encaminhamentos","evolucoes","agendamentos","auditoria"],
};

const ABAS_LABEL = {
    identificacao: { icon:"👤", label:"Identificação" },
    resumo:         { icon:"🧾", label:"Resumo" },
    nupss:         { icon:"🏠", label:"NUPSS" },
    fisio:         { icon:"🦴", label:"Fisioterapia" },
    odonto:        { icon:"🦷", label:"Odontologia" },
    nai:           { icon:"♿", label:"NAI" },
    nae:           { icon:"🎓", label:"NAE" },
    nap:           { icon:"🧠", label:"NAPp" },
    encaminhamentos:{ icon:"📤", label:"Encaminhamentos" },
    evolucoes:     { icon:"📋", label:"Evoluções" },
    agendamentos:  { icon:"📅", label:"Agendamentos" },
    auditoria:     { icon:"🔍", label:"Auditoria" },
};

// ─── RENDER FUNCTIONS ────────────────────────────────────────────────────────
function render() {
    const app = document.getElementById("app");
    
    if (!appState.usuario) {
        app.innerHTML = renderLogin();
        attachLoginEvents();
    } else if (appState.usuario.perfil === "admin") {
        app.innerHTML = renderAdminPanel();
        attachAdminEvents();
    } else if (appState.tela === "lista") {
        app.innerHTML = renderLista();
        attachListaEvents();
    } else if (appState.tela === "prontuario") {
        app.innerHTML = renderProntuario();
        attachProntuarioEvents();
    }
    
    if (appState.modal) {
        app.innerHTML += renderModal();
        attachModalEvents();
    }
    
    if (appState.toast) {
        app.innerHTML += renderToast();
    }
}

function renderLogin() {
    const perfilOptions = LOGIN_ORDER
        .filter(perfil => PERFIS[perfil])
        .map(perfil => `<option value="${perfil}">${PERFIS[perfil].icon} ${PERFIS[perfil].label}</option>`)
        .join('');

    return `
        <div class="login-container">
            <div class="login-card">
                <div class="login-header">
                    <img src="img/Logo IntegraSocial.png" alt="Logo IntegraSocial" class="login-header-logo" style="max-width: 120px; margin-bottom: 12px;" />
                    <div class="login-header-title">Prontuário Integrado – NUPSS</div>
                    <div class="login-header-subtitle">Universidade de Vassouras – Campus Saquarema</div>
                </div>
                <div class="login-body">
                    <div class="field">
                        <label class="field-label">Núcleo / Função</label>
                        <select id="login-perfil" class="select">
                            <option value="">Selecione o núcleo</option>
                            ${perfilOptions}
                        </select>
                    </div>
                    <div class="field">
                        <label class="field-label">Usuário</label>
                        <input type="text" id="login-user" class="input" placeholder="login institucional">
                    </div>
                    <div class="field">
                        <label class="field-label">Senha</label>
                        <input type="password" id="login-pass" class="input" placeholder="••••••••" style="margin-bottom: 4px">
                    </div>
                    <div id="login-error" class="error-msg" style="display:none;"></div>
                    <button class="login-btn" onclick="fazerLogin()">Entrar no Sistema</button>
                    <div class="login-note">
                        <strong>Administrador:</strong> login <code>admin</code> senha <code>Admin@2026</code>.
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderLista() {
    const perfil = PERFIS[appState.usuario.perfil];
    const roleLabel = appState.usuario.perfil === "nupss" ? "NUPSS – Serviço Social" : perfil.label;
    const topbarTitle = appState.usuario.perfil === "nupss" ? "Pacientes & Usuários" : "IntegraSocial · Prontuário Integrado";

    const isAgendadosView = appState.usuario.perfil === "nupss" && appState.listaFiltro === "agendados";
    let listCount = 0;
    let contentHtml = '';

    if (isAgendadosView) {
        const q = appState.busca.toLowerCase();
        const agendaItems = [];

        Object.values(appState.pacientes).forEach(pac => {
            pac.agendamentos.forEach(a => {
                if (a.destino !== 'nupss') return;
                const matchesSearch = pac.meta.nome.toLowerCase().includes(q) || pac.id.toLowerCase().includes(q) || a.servico.toLowerCase().includes(q);
                if (!q || matchesSearch) {
                    agendaItems.push({ ...a, pacienteId: pac.id, pacienteNome: pac.meta.nome });
                }
            });
        });

        listCount = agendaItems.length;
        contentHtml = agendaItems.length === 0
            ? '<div class="list-empty">Nenhum agendamento encontrado.</div>'
            : agendaItems.map(a => {
                const data = new Date(a.data + "T00:00:00");
                const mes = data.toLocaleString("pt-BR", {month:"short"}).toUpperCase();
                const dia = data.getDate();
                const fonte = a.origem ? (a.origem === 'recepcao' ? 'Recepção' : PERFIS[a.origem]?.label || a.origem) : 'Outro núcleo';
                const badgeClass = a.status === "Atendido" ? "badge-green" : a.status === "Faltou" ? "badge-laranja" : "badge-azul";
                return `
                    <div class="appointment-item appointment-card" onclick="selecionarPaciente('${a.pacienteId}')">
                        <div class="appointment-date">
                            <div class="appointment-month">${mes}</div>
                            <div class="appointment-day">${dia}</div>
                        </div>
                        <div class="appointment-info">
                            <div class="appointment-service">${a.pacienteNome}</div>
                            <div class="appointment-time">${a.hora} · ${a.servico}</div>
                            <div class="appointment-source">${fonte}</div>
                        </div>
                        <span class="badge ${badgeClass}">${a.status}</span>
                    </div>
                `;
            }).join('');
    } else {
        const pids = Object.keys(appState.pacientes).filter(id => {
            const m = appState.pacientes[id].meta;
            const matchesSearch = m.nome.toLowerCase().includes(appState.busca.toLowerCase()) || id.includes(appState.busca.toUpperCase());
            if (!matchesSearch) return false;
            if (appState.usuario.perfil !== "nupss") return true;
            if (appState.listaFiltro === "todos") return true;
            return (m.tipo || "Estudante").toLowerCase() === appState.listaFiltro;
        });

        listCount = pids.length;
        contentHtml = pids.map(id => {
            const m = appState.pacientes[id].meta;
            const tipo = (m.tipo || "Estudante");
            const idade = m.nascimento ? calcIdade(m.nascimento) : "—";
            const displayId = tipo.toLowerCase() === "comunidade"
                ? m.id.replace(/^P/, "U")
                : m.id.replace(/^P/, "E");
            return `
                <div class="student-item" onclick="selecionarPaciente('${id}')">
                    <div class="student-left">
                        <div class="student-avatar">${m.nome.charAt(0)}</div>
                        <div class="student-info">
                            <div class="student-name">${m.nome}</div>
                            <div class="student-details">
                                <span>${displayId}</span>
                                <span>•</span>
                                <span>${idade} anos</span>
                            </div>
                        </div>
                    </div>
                    <span class="badge ${tipo === "Comunidade" ? "badge-roxo" : tipo === "Estudante" ? "badge-azul" : m.status === "Ativo" ? "badge-green" : "badge-laranja"}">${tipo}</span>
                </div>
            `;
        }).join('');
    }

    const btnCadastro = appState.usuario.perfil === "recepcao" || appState.usuario.perfil === "nupss"
        ? `<button class="btn btn-primary" onclick="abrirModalCadastro()">+ Cadastrar</button>`
        : '';

    const tabs = appState.usuario.perfil === "nupss" ? `
        <div class="tabs">
            <button class="tab ${appState.listaFiltro === "todos" ? "active" : ""}" onclick="setListaFiltro('todos')">📋 Todos</button>
            <button class="tab ${appState.listaFiltro === "estudante" ? "active" : ""}" onclick="setListaFiltro('estudante')">🎓 Estudante</button>
            <button class="tab ${appState.listaFiltro === "comunidade" ? "active" : ""}" onclick="setListaFiltro('comunidade')">🏘 Comunidade</button>
            <button class="tab ${appState.listaFiltro === "agendados" ? "active" : ""}" onclick="setListaFiltro('agendados')">📅 Agendados</button>
        </div>
    ` : '';

    return `
        <div class="topbar">
            <div class="topbar-brand">
                <img src="img/Icone IntegraSocial.png" alt="Ícone IntegraSocial" class="topbar-logo" />
                <div class="topbar-title">${topbarTitle}</div>
            </div>
            <div class="topbar-user">
                <div class="topbar-avatar" style="background-color: ${perfil.cor}">${perfil.icon}</div>
                <div class="topbar-info">
                    <div class="topbar-info-name">${appState.usuario.nome}</div>
                    <div class="topbar-info-role">${roleLabel}</div>
                </div>
                <button class="topbar-logout" onclick="fazerLogout()">Sair</button>
            </div>
        </div>
        <div class="main-container">
            <div class="list-header">
                <div class="list-title-group">
                    <div class="list-title">Pacientes & Usuários</div>
                    <div class="records-count">${listCount} registros</div>
                </div>
                <div class="list-actions">
                    ${tabs}
                    <div class="list-controls">
                        <input type="text" id="search-input" class="search-input" placeholder="Buscar por nome ou código..." value="${appState.busca}">
                        ${btnCadastro}
                    </div>
                </div>
            </div>
            <div class="list-grid">
                ${contentHtml}
            </div>
        </div>
    `;
}

function renderAdminPanel() {
    const contas = Object.entries(USUARIOS)
        .filter(([login]) => login !== 'admin')
        .filter(([login, usuario]) => {
            const busca = appState.adminBusca.toLowerCase();
            return busca === '' || login.toLowerCase().includes(busca) || usuario.nome.toLowerCase().includes(busca) || usuario.perfil.toLowerCase().includes(busca);
        });

    const linhas = contas.map(([login, usuario]) => {
        const perfil = PERFIS[usuario.perfil] ? PERFIS[usuario.perfil].label : usuario.perfil;
        return `
            <tr>
                <td>${usuario.nome}</td>
                <td>${perfil}</td>
                <td>${login}</td>
                <td>
                    <button class="btn btn-outline btn-small" onclick="abrirModalUsuario('${login}')">Editar</button>
                    <button class="btn btn-outline btn-small" onclick="deletarUsuario('${login}')">Excluir</button>
                </td>
            </tr>
        `;
    }).join('');

    return `
        <div class="topbar">
            <div class="topbar-brand">
                <img src="img/Icone IntegraSocial.png" alt="Ícone IntegraSocial" class="topbar-logo" />
                <div class="topbar-title">IntegraSocial · Administração</div>
            </div>
            <div class="topbar-user">
                <div class="topbar-avatar" style="background-color: ${PERFIS.admin.cor}">${PERFIS.admin.icon}</div>
                <div class="topbar-info">
                    <div class="topbar-info-name">${appState.usuario.nome}</div>
                    <div class="topbar-info-role">${PERFIS.admin.label}</div>
                </div>
                <button class="topbar-logout" onclick="fazerLogout()">Sair</button>
            </div>
        </div>
        <div class="main-container">
            <div class="alert">
                <span class="alert-icon">⚠️</span>
                <span class="alert-strong">Administrar acessos:</span>
                <span>Crie, edite ou exclua os usuários de cada núcleo. O login de administrador é <strong>admin</strong> com senha <strong>Admin@2026</strong>.</span>
            </div>
            <div class="list-header">
                <div class="list-title">Acessos de Núcleos</div>
                <input type="text" id="admin-search" class="search-input" placeholder="Buscar por nome, login ou núcleo..." value="${appState.adminBusca}">
                <button class="btn btn-primary" onclick="abrirModalUsuario()">+ Novo Acesso</button>
            </div>
            <div class="card">
                <div style="overflow-x:auto;">
                    <table class="audit-table">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Função</th>
                                <th>Login</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${linhas || '<tr><td colspan="4">Nenhum usuário encontrado.</td></tr>'}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}

function renderProntuario() {
    const perfil = PERFIS[appState.usuario.perfil];
    const pac = appState.pacientes[appState.pidSel];
    const m = pac.meta;
    const abasVisiveis = (ABAS_CONFIG[appState.usuario.perfil] || []).map(id => ({ id, ...ABAS_LABEL[id] }));

    let tabsHtml = abasVisiveis.map(a => `
        <button class="tab ${appState.abaSel === a.id ? "active" : ""}" onclick="mudarAba('${a.id}')">
            ${a.icon} ${a.label}
        </button>
    `).join('');

    const headerLabel = appState.usuario.perfil === 'nupss' ? 'NUPSS – Serviço Social' : 'IntegraSocial · Prontuário Integrado';
    const backLabel = appState.usuario.perfil === 'nupss' ? '← Pacientes' : '← Voltar';

    const conteudoAba = renderAba();

    return `
        <div class="topbar">
            <button class="topbar-btn-back" onclick="voltarParaLista()">${backLabel}</button>
            <div class="topbar-brand">
                <img src="img/Icone IntegraSocial.png" alt="Ícone IntegraSocial" class="topbar-logo" />
                <div class="topbar-title">${headerLabel}</div>
            </div>
            <div class="topbar-user">
                <div class="topbar-avatar" style="background-color: ${perfil.cor}">${perfil.icon}</div>
                <div class="topbar-info">
                    <div class="topbar-info-name">${appState.usuario.nome}</div>
                    <div class="topbar-info-role">${perfil.label}</div>
                </div>
                <button class="topbar-logout" onclick="fazerLogout()">Sair</button>
            </div>
        </div>
        <div class="main-container">
            <div class="profile-hero card ${appState.usuario.perfil === 'nupss' ? 'profile-hero-nupss' : ''}">
                <div class="profile-hero-left">
                    <div class="profile-hero-avatar">${m.nome.charAt(0)}</div>
                    <div>
                        <div class="profile-hero-name">${m.nome}</div>
                        <div class="profile-hero-meta">${m.id} · ${calcIdade(m.nascimento)} anos · ${fmtData(m.nascimento)}</div>
                    </div>
                </div>
                <div class="profile-hero-badges">
                    <span class="badge ${m.tipo === 'Comunidade' ? 'badge-roxo' : 'badge-azul'}">${m.tipo || 'Estudante'}</span>
                    <span class="badge ${m.status === 'Ativo' ? 'badge-green' : 'badge-laranja'}">${m.status}</span>
                </div>
            </div>
            <div class="tabs tabs-card">${tabsHtml}</div>
            ${conteudoAba}
        </div>
    `;
}

function renderAba() {
    const pac = appState.pacientes[appState.pidSel];
    const m = pac.meta;

    if (appState.abaSel === "resumo") {
        const btnEditarResumo = ["recepcao", "nupss", "admin"].includes(appState.usuario.perfil)
            ? `<button class="btn btn-primary btn-small" onclick="abrirModalEditarId()">✏️ Editar</button>`
            : '';

        return `
            <div class="card">
                <div class="section-title">
                    <span class="section-icon">👤</span>
                    <span class="section-label">Dados Pessoais</span>
                    ${btnEditarResumo}
                </div>
                <div class="info-grid">
                    <div class="info-item">
                        <div class="info-item-label">Nome completo</div>
                        <div class="info-item-value">${m.nome}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-item-label">Tipo</div>
                        <div class="info-item-value">${m.tipo || 'Estudante'}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-item-label">Nascimento</div>
                        <div class="info-item-value">${fmtData(m.nascimento)}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-item-label">Idade</div>
                        <div class="info-item-value">${calcIdade(m.nascimento)} anos</div>
                    </div>
                    <div class="info-item">
                        <div class="info-item-label">CPF</div>
                        <div class="info-item-value">${m.cpf || '—'}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-item-label">RG</div>
                        <div class="info-item-value">${m.rg || '—'}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-item-label">Telefone</div>
                        <div class="info-item-value">${m.telefone || '—'}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-item-label">E-mail</div>
                        <div class="info-item-value">${m.emailPes || m.emailInst || '—'}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-item-label">Endereço</div>
                        <div class="info-item-value">${m.endereco || '—'}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-item-label">Curso / Turno</div>
                        <div class="info-item-value">${m.curso || '—'} · ${m.turno || '—'}</div>
                    </div>
                </div>
            </div>
        `;
    }

    if (appState.abaSel === "identificacao") {
        const btnEditar = appState.usuario.perfil === "recepcao" 
            ? `<button class="btn btn-primary btn-small" onclick="abrirModalEditarId()">✏️ Editar</button>`
            : '';

        let infoHtml = `
            <div class="card">
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 14px; padding-bottom: 10px; border-bottom: 2px solid #0f2342;">
                    <span style="font-size: 17px;">👤</span>
                    <span style="font-family: 'Crimson Pro', Georgia, serif; font-size: 16px; font-weight: 700; color: #0f2342; flex: 1;">Identificação do Estudante</span>
                    ${btnEditar}
                </div>
                <div class="info-grid">
                    <div class="info-item">
                        <div class="info-item-label">Nome Completo</div>
                        <div class="info-item-value">${m.nome}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-item-label">Data de Nascimento</div>
                        <div class="info-item-value">${fmtData(m.nascimento)} (${calcIdade(m.nascimento)} anos)</div>
                    </div>
                    <div class="info-item">
                        <div class="info-item-label">CPF</div>
                        <div class="info-item-value">${m.cpf}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-item-label">RG</div>
                        <div class="info-item-value">${m.rg}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-item-label">Curso</div>
                        <div class="info-item-value">${m.curso}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-item-label">Período</div>
                        <div class="info-item-value">${m.periodo}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-item-label">Matrícula</div>
                        <div class="info-item-value">${m.matricula}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-item-label">Turno</div>
                        <div class="info-item-value">${m.turno}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-item-label">E-mail Institucional</div>
                        <div class="info-item-value">${m.emailInst}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-item-label">E-mail Pessoal</div>
                        <div class="info-item-value">${m.emailPes}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-item-label">Telefone / WhatsApp</div>
                        <div class="info-item-value">${m.telefone}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-item-label">Endereço</div>
                        <div class="info-item-value">${m.endereco}</div>
                    </div>
                </div>
            </div>
        `;
        return infoHtml;
    }

    if (appState.abaSel === "nupss") {
        const info = pac.prontuarios.nupss || {};
        const atendimentos = pac.evolucoes.nupss || [];
        const historyHtml = atendimentos.length > 0 ? atendimentos.map(e => `
            <div class="history-item">
                <div class="history-title">${fmtData(e.data)} · ${e.profissional}</div>
                <div class="history-text">${e.registro}</div>
            </div>
        `).join('') : '<p style="color: #9ca3af; font-size: 13px; margin: 0;">Nenhum registro ainda.</p>';

        return `
            <div class="card">
                <div class="section-title">
                    <span class="section-icon">🏠</span>
                    <span class="section-label">NUPSS – Serviço Social</span>
                    <div class="section-actions">
                        <button class="btn btn-outline btn-small" onclick="abrirModalProntuario('nupss')">Anamnese</button>
                        <button class="btn btn-primary btn-small" style="background: #2A7F6F; border-color: #2A7F6F;" onclick="abrirModalEvolucao('nupss','NUPSS','#2A7F6F')">+ Atendimento</button>
                        <button class="btn btn-primary btn-small" style="background: #0f766e; border-color: #0f766e;" onclick="abrirModalEncaminhamento()">+ Encaminhar</button>
                    </div>
                </div>
                <div class="info-grid">
                    <div class="info-item">
                        <div class="info-item-label">Forma de chegada</div>
                        <div class="info-item-value">${info.chegada || '—'}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-item-label">Quem encaminhou</div>
                        <div class="info-item-value">${info.quemEncaminhou || '—'}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-item-label">Composição familiar</div>
                        <div class="info-item-value">${info.composicaoFamiliar || '—'}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-item-label">Renda familiar</div>
                        <div class="info-item-value">${info.rendaFamiliar || '—'}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-item-label">Situação de moradia</div>
                        <div class="info-item-value">${info.situacaoMoradia || '—'}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-item-label">Benefícios sociais</div>
                        <div class="info-item-value">${info.beneficiosSociais || '—'}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-item-label">Vínculo CRAS/CREAS</div>
                        <div class="info-item-value">${info.vinculoEmprego || '—'}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-item-label">Vulnerabilidade</div>
                        <div class="info-item-value">${info.violenciaSituacaoRisco || '—'}</div>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="section-title">
                    <span class="section-icon">📝</span>
                    <span class="section-label">Histórico de Atendimentos</span>
                </div>
                <div class="history-list">${historyHtml}</div>
            </div>
        `;
    }

    if (["nai","nae","nap"].includes(appState.abaSel)) {
        const tipo = appState.abaSel;
        const info = pac.prontuarios[tipo] || {};
        return `
            <div class="card">
                <div class="section-title">
                    <span class="section-icon">${ABAS_LABEL[tipo].icon}</span>
                    <span class="section-label">${ABAS_LABEL[tipo].label} – Anamnese</span>
                    <div class="section-actions">
                        <button class="btn btn-outline btn-small" onclick="abrirModalProntuario('${tipo}')">Anamnese</button>
                    </div>
                </div>
                ${renderResumoNucleo(tipo, info)}
            </div>
        `;
    }

    if (appState.abaSel === "evolucoes") {
        const mapa = { 
            nupss:["#2A7F6F","NUPSS"], 
            fisio:["#1B5E8A","Fisioterapia"], 
            odonto:["#0e7490","Odontologia"], 
            nai:["#6B3FA0","NAI"], 
            nae:["#b45309","NAE"], 
            nap:["#be185d","NAPp"] 
        };
        const permitidos = appState.usuario.perfil === "supervisor" 
            ? Object.keys(mapa) 
            : [appState.usuario.perfil === "fisioterapeuta" ? "fisio" : appState.usuario.perfil === "odontologia" ? "odonto" : appState.usuario.perfil];

        let html = '';
        permitidos.filter(k => mapa[k]).forEach(k => {
            const [cor, label] = mapa[k];
            const evos = pac.evolucoes[k] || [];
            const icon = ABAS_LABEL[k]?.icon || "📋";

            let evoHtml = evos.map(e => `
                <div class="evolution-item" style="border-left-color: ${cor}; border-left: 2px solid ${cor};">
                    <div class="evolution-item" style="border: none; padding-left: 0; display: none;"></div>
                    <div class="evolution-date">${fmtData(e.data)} · ${e.profissional}</div>
                    <div class="evolution-text">${e.registro}</div>
                </div>
            `).join('');

            if (evos.length === 0) {
                evoHtml = '<p style="color: #9ca3af; font-size: 13px;">Nenhuma evolução registrada.</p>';
            }

            html += `
                <div class="card">
                    <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 14px; padding-bottom: 10px; border-bottom: 2px solid ${cor};">
                        <span style="font-size: 17px;">${icon}</span>
                        <span style="font-family: 'Crimson Pro', Georgia, serif; font-size: 16px; font-weight: 700; color: ${cor}; flex: 1;">Evoluções – ${label}</span>
                        <button class="btn btn-primary btn-small" style="background: ${cor}; border-color: ${cor};" onclick="abrirModalEvolucao('${k}', '${label}', '${cor}')">+ Nova Evolução</button>
                    </div>
                    ${evoHtml}
                </div>
            `;
        });
        return html;
    }

    if (appState.abaSel === "encaminhamentos") {
        let refHtml = pac.encaminhamentos.map(e => `
            <div class="referral-item">
                <div class="referral-info">
                    <div class="referral-title">${e.origem} → ${e.destino}</div>
                    <div class="referral-text">${e.motivo}</div>
                </div>
                <div class="referral-meta">
                    <div class="referral-date">${fmtData(e.data)}</div>
                    <span class="badge ${e.status === "Concluído" ? "badge-green" : e.status === "Em andamento" ? "badge-azul" : "badge-laranja"}">${e.status}</span>
                </div>
            </div>
        `).join('');

        if (pac.encaminhamentos.length === 0) {
            refHtml = '<p style="color: #9ca3af; font-size: 13px;">Nenhum encaminhamento.</p>';
        }

        return `
            <div class="card">
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 14px; padding-bottom: 10px; border-bottom: 2px solid #2A7F6F;">
                    <span style="font-size: 17px;">📤</span>
                    <span style="font-family: 'Crimson Pro', Georgia, serif; font-size: 16px; font-weight: 700; color: #2A7F6F; flex: 1;">Encaminhamentos</span>
                    <button class="btn btn-primary btn-small" style="background: #2A7F6F; border-color: #2A7F6F;" onclick="abrirModalEncaminhamento()">+ Novo Encaminhamento</button>
                </div>
                ${refHtml}
            </div>
        `;
    }

    if (appState.abaSel === "agendamentos") {
        const agendaExibida = appState.usuario.perfil === 'recepcao'
            ? pac.agendamentos
            : pac.agendamentos.filter(a => a.destino === appState.usuario.perfil);

        let agendHtml = agendaExibida.map(a => {
            const data = new Date(a.data + "T00:00:00");
            const mes = data.toLocaleString("pt-BR", {month:"short"}).toUpperCase();
            const dia = data.getDate();
            const fonte = a.origem ? (a.origem === 'recepcao' ? 'Recepção' : PERFIS[a.origem]?.label || a.origem) : 'Outro núcleo';
            return `
                <div class="appointment-item">
                    <div class="appointment-date">
                        <div class="appointment-month">${mes}</div>
                        <div class="appointment-day">${dia}</div>
                    </div>
                    <div class="appointment-info">
                        <div class="appointment-service">${a.servico}</div>
                        <div class="appointment-time">${a.hora} · ${a.profissional}</div>
                        <div class="appointment-source">${fonte}</div>
                        ${a.obs ? `<div class="appointment-obs">${a.obs}</div>` : ''}
                    </div>
                    <span class="badge ${a.status === "Atendido" ? "badge-green" : a.status === "Faltou" ? "badge-laranja" : a.status === "Reagendado" ? "badge-azul" : "badge-laranja"}">${a.status}</span>
                </div>
            `;
        }).join('');

        if (agendaExibida.length === 0) {
            agendHtml = '<p style="color: #9ca3af; font-size: 13px; margin: 0;">Nenhum agendamento recebido para este núcleo.</p>';
        }

        const botaoAgendar = appState.usuario.perfil === 'recepcao'
            ? `<button class="btn btn-primary btn-small" style="background: #b45309; border-color: #b45309;" onclick="abrirModalAgendamento()">+ Novo Agendamento</button>`
            : '';

        return `
            <div class="card">
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 14px; padding-bottom: 10px; border-bottom: 2px solid #b45309;">
                    <span style="font-size: 17px;">📅</span>
                    <span style="font-family: 'Crimson Pro', Georgia, serif; font-size: 16px; font-weight: 700; color: #b45309; flex: 1;">Agendamentos</span>
                    ${botaoAgendar}
                </div>
                ${agendHtml}
            </div>
        `;
    }

    if (appState.abaSel === "auditoria") {
        let auditHtml = [...pac.auditoria].reverse().map(l => `
            <tr>
                <td>${l.data}</td>
                <td>${l.usuario}</td>
                <td>${l.acao}</td>
                <td>${l.ip}</td>
            </tr>
        `).join('');

        return `
            <div class="main-container">
                <div class="alert">
                    <div style="overflow-x: auto;">
                        <table class="audit-table">
                            <thead>
                                <tr style="background: #f8f8f8;">
                                    <th>Data/Hora</th>
                                    <th>Usuário</th>
                                    <th>Ação</th>
                                    <th>IP</th>
                                </tr>
                            </thead>
                            <tbody>${auditHtml}</tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
    }

    return '';
}

function renderResumoNucleo(tipo, info) {
    const hasInfo = info && Object.keys(info).length > 0;
    if (!hasInfo) {
        return '<p style="color: #9ca3af; font-size: 13px; margin: 0;">Nenhuma anamnese registrada.</p>';
    }

    if (tipo === 'nai') {
        return `
            <div class="info-grid">
                <div class="info-item">
                    <div class="info-item-label">Forma de chegada</div>
                    <div class="info-item-value">${info.chegada || '—'}</div>
                </div>
                <div class="info-item">
                    <div class="info-item-label">Quem encaminhou</div>
                    <div class="info-item-value">${info.quemEncaminhou || '—'}</div>
                </div>
                <div class="info-item">
                    <div class="info-item-label">Tipo de condição</div>
                    <div class="info-item-value">${info.tipoCondicao || '—'}</div>
                </div>
                <div class="info-item">
                    <div class="info-item-label">CID</div>
                    <div class="info-item-value">${info.cid || '—'}</div>
                </div>
                <div class="info-item">
                    <div class="info-item-label">Descrição da condição</div>
                    <div class="info-item-value">${info.descricaoCondicao || '—'}</div>
                </div>
                <div class="info-item">
                    <div class="info-item-label">Laudo médico (obs)</div>
                    <div class="info-item-value">${info.laudoMedicoObs || '—'}</div>
                </div>
                <div class="info-item">
                    <div class="info-item-label">Emissor do laudo</div>
                    <div class="info-item-value">${info.emissorLaudo || '—'}</div>
                </div>
                <div class="info-item">
                    <div class="info-item-label">Data do laudo</div>
                    <div class="info-item-value">${info.dataLaudo || '—'}</div>
                </div>
                <div class="info-item">
                    <div class="info-item-label">Barreiras identificadas</div>
                    <div class="info-item-value">${info.barreirasIdentificadas || '—'}</div>
                </div>
                <div class="info-item">
                    <div class="info-item-label">Recursos / Necessidades</div>
                    <div class="info-item-value">${info.recursosSolicitados || '—'}</div>
                </div>
                <div class="info-item">
                    <div class="info-item-label">Tecnologia assistiva</div>
                    <div class="info-item-value">${info.tecnologiaAssistiva || '—'}</div>
                </div>
                <div class="info-item">
                    <div class="info-item-label">Adaptações curriculares</div>
                    <div class="info-item-value">${info.adaptacoesCurriculares || '—'}</div>
                </div>
                <div class="info-item">
                    <div class="info-item-label">Objetivos</div>
                    <div class="info-item-value">${info.objetivos || '—'}</div>
                </div>
                <div class="info-item">
                    <div class="info-item-label">Conduta / PAAE</div>
                    <div class="info-item-value">${info.condutaPaee || '—'}</div>
                </div>
            </div>
        `;
    }

    if (tipo === 'nae') {
        return `
            <div class="info-grid">
                <div class="info-item">
                    <div class="info-item-label">Forma de chegada</div>
                    <div class="info-item-value">${info.chegada || '—'}</div>
                </div>
                <div class="info-item">
                    <div class="info-item-label">Quem encaminhou</div>
                    <div class="info-item-value">${info.quemEncaminhou || '—'}</div>
                </div>
                <div class="info-item">
                    <div class="info-item-label">Curso</div>
                    <div class="info-item-value">${info.curso || '—'}</div>
                </div>
                <div class="info-item">
                    <div class="info-item-label">Período</div>
                    <div class="info-item-value">${info.periodo || '—'}</div>
                </div>
                <div class="info-item">
                    <div class="info-item-label">Matrícula</div>
                    <div class="info-item-value">${info.matricula || '—'}</div>
                </div>
                <div class="info-item">
                    <div class="info-item-label">IRA</div>
                    <div class="info-item-value">${info.ira || '—'}</div>
                </div>
                <div class="info-item">
                    <div class="info-item-label">Ano de ingresso</div>
                    <div class="info-item-value">${info.anoIngresso || '—'}</div>
                </div>
                <div class="info-item">
                    <div class="info-item-label">Trancamentos</div>
                    <div class="info-item-value">${info.trancamentos || '—'}</div>
                </div>
                <div class="info-item">
                    <div class="info-item-label">Risco de jubilamento</div>
                    <div class="info-item-value">${info.riscoJubilamento || '—'}</div>
                </div>
                <div class="info-item">
                    <div class="info-item-label">Financiamento</div>
                    <div class="info-item-value">${info.financiamento || '—'}</div>
                </div>
                <div class="info-item">
                    <div class="info-item-label">Renda familiar</div>
                    <div class="info-item-value">${info.rendaFamiliar || '—'}</div>
                </div>
                <div class="info-item">
                    <div class="info-item-label">Dificuldades financeiras</div>
                    <div class="info-item-value">${info.dificuldadesFinanceiras || '—'}</div>
                </div>
                <div class="info-item">
                    <div class="info-item-label">Situação de moradia</div>
                    <div class="info-item-value">${info.situacaoMoradia || '—'}</div>
                </div>
                <div class="info-item">
                    <div class="info-item-label">Saúde</div>
                    <div class="info-item-value">${info.saude || '—'}</div>
                </div>
                <div class="info-item">
                    <div class="info-item-label">Apoio psicossocial</div>
                    <div class="info-item-value">${info.apoioPsicossocial || '—'}</div>
                </div>
                <div class="info-item">
                    <div class="info-item-label">Demanda</div>
                    <div class="info-item-value">${info.demanda || '—'}</div>
                </div>
                <div class="info-item">
                    <div class="info-item-label">Conduta</div>
                    <div class="info-item-value">${info.conduta || '—'}</div>
                </div>
                <div class="info-item">
                    <div class="info-item-label">Objetivos</div>
                    <div class="info-item-value">${info.objetivos || '—'}</div>
                </div>
            </div>
        `;
    }

    if (tipo === 'nap') {
        const categoriasText = Array.isArray(info.categorias) ? info.categorias.join(', ') : info.categorias || '—';
        const condutaText = info.conduta || '—';
        const detalheCondutaText = info.detalheCoduta || '—';
        return `
            <div class="info-grid">
                <div class="info-item">
                    <div class="info-item-label">Forma de chegada</div>
                    <div class="info-item-value">${info.chegada || '—'}</div>
                </div>
                <div class="info-item">
                    <div class="info-item-label">Quem encaminhou</div>
                    <div class="info-item-value">${info.quemEncaminhou || '—'}</div>
                </div>
                <div class="info-item">
                    <div class="info-item-label">Motivo declarado</div>
                    <div class="info-item-value">${info.motivoDeclarado || '—'}</div>
                </div>
                <div class="info-item">
                    <div class="info-item-label">Relato</div>
                    <div class="info-item-value">${info.relato || '—'}</div>
                </div>
                <div class="info-item">
                    <div class="info-item-label">Tempo de dificuldade</div>
                    <div class="info-item-value">${info.tempoDificuldade || '—'}</div>
                </div>
                <div class="info-item">
                    <div class="info-item-label">Categorias</div>
                    <div class="info-item-value">${categoriasText}</div>
                </div>
                <div class="info-item">
                    <div class="info-item-label">Especificação</div>
                    <div class="info-item-value">${info.especificacao || '—'}</div>
                </div>
                <div class="info-item">
                    <div class="info-item-label">Escolas anteriores</div>
                    <div class="info-item-value">${info.escolasAnteriores || '—'}</div>
                </div>
                <div class="info-item">
                    <div class="info-item-label">Ano de ingresso</div>
                    <div class="info-item-value">${info.anoIngresso || '—'}</div>
                </div>
                <div class="info-item">
                    <div class="info-item-label">Reprovações / Trancamentos</div>
                    <div class="info-item-value">${info.reprovacoesTrancamentos || '—'}</div>
                </div>
                <div class="info-item">
                    <div class="info-item-label">Desempenho atual</div>
                    <div class="info-item-value">${info.desempenhoAtual || '—'}</div>
                </div>
                <div class="info-item">
                    <div class="info-item-label">Disciplinas em dificuldade</div>
                    <div class="info-item-value">${info.disciplinasDificuldade || '—'}</div>
                </div>
                <div class="info-item">
                    <div class="info-item-label">Rotina</div>
                    <div class="info-item-value">${info.rotina || '—'}</div>
                </div>
                <div class="info-item">
                    <div class="info-item-label">Acompanhamento psicológico</div>
                    <div class="info-item-value">${info.acompPsico || '—'}</div>
                </div>
                <div class="info-item">
                    <div class="info-item-label">Descrição do acompanhamento</div>
                    <div class="info-item-value">${info.descAcomp || '—'}</div>
                </div>
                <div class="info-item">
                    <div class="info-item-label">Diagnóstico</div>
                    <div class="info-item-value">${info.diagnostico || '—'}</div>
                </div>
                <div class="info-item">
                    <div class="info-item-label">Medicação</div>
                    <div class="info-item-value">${info.medicacao || '—'}</div>
                </div>
                <div class="info-item">
                    <div class="info-item-label">Especificações do diagnóstico / medicação</div>
                    <div class="info-item-value">${info.especDiagMed || '—'}</div>
                </div>
                <div class="info-item">
                    <div class="info-item-label">Histórico de sofrimento</div>
                    <div class="info-item-value">${info.historicoSofrimento || '—'}</div>
                </div>
                <div class="info-item">
                    <div class="info-item-label">Com quem reside</div>
                    <div class="info-item-value">${info.comQuemReside || '—'}</div>
                </div>
                <div class="info-item">
                    <div class="info-item-label">Situação de moradia</div>
                    <div class="info-item-value">${info.situacaoMoradia || '—'}</div>
                </div>
                <div class="info-item">
                    <div class="info-item-label">Trabalha</div>
                    <div class="info-item-value">${info.trabalha || '—'}</div>
                </div>
                <div class="info-item">
                    <div class="info-item-label">Carga horária</div>
                    <div class="info-item-value">${info.cargaHoraria || '—'}</div>
                </div>
                <div class="info-item">
                    <div class="info-item-label">Relação familiar</div>
                    <div class="info-item-value">${info.relacaoFamiliar || '—'}</div>
                </div>
                <div class="info-item">
                    <div class="info-item-label">Rede de apoio</div>
                    <div class="info-item-value">${info.redApoio || '—'}</div>
                </div>
                <div class="info-item">
                    <div class="info-item-label">Situações relevantes</div>
                    <div class="info-item-value">${info.situacoesRelevantes || '—'}</div>
                </div>
                <div class="info-item">
                    <div class="info-item-label">Objetivos e expectativas</div>
                    <div class="info-item-value">${info.objetivosExpectativas || '—'}</div>
                </div>
                <div class="info-item">
                    <div class="info-item-label">Conduta</div>
                    <div class="info-item-value">${condutaText}</div>
                </div>
                <div class="info-item">
                    <div class="info-item-label">Detalhamento da conduta</div>
                    <div class="info-item-value">${detalheCondutaText}</div>
                </div>
                <div class="info-item">
                    <div class="info-item-label">Observações profissional</div>
                    <div class="info-item-value">${info.observacoesProfissional || '—'}</div>
                </div>
            </div>
        `;
    }

    return '<p style="color: #9ca3af; font-size: 13px; margin: 0;">Nenhuma anamnese registrada.</p>';
}

function renderModal() {
    if (!appState.modal) return '';

    const tipos_pront = ['nupss', 'fisio', 'odonto', 'nai', 'nae', 'nap'];
    let content = '';
    let title = '';
    let wide = false;

    if (appState.modal.tipo === 'cadastro') {
        wide = true;
        title = '📋 Cadastrar Novo Estudante';
        content = renderFormCadastro();
    } else if (appState.modal.tipo === 'agendamento') {
        title = '📅 Novo Agendamento';
        content = renderFormAgendamento();
    } else if (appState.modal.tipo === 'encaminhamento') {
        title = '📤 Novo Encaminhamento';
        content = renderFormEncaminhamento();
    } else if (appState.modal.tipo === 'editar_id') {
        wide = true;
        title = '✏️ Editar Identificação do Estudante';
        content = renderFormEditarId();
    } else if (appState.modal.tipo === 'evolucao') {
        title = `Nova Evolução – ${appState.modal.servico}`;
        content = renderFormEvolucao();
    } else if (appState.modal.tipo === 'usuario') {
        wide = true;
        title = appState.modal.editar ? '✏️ Editar Acesso' : '👤 Novo Acesso de Usuário';
        content = renderFormUsuario();
    } else if (tipos_pront.includes(appState.modal.tipo.replace('pront_', ''))) {
        const tipo = appState.modal.tipo.replace('pront_', '');
        const labels = { nupss: 'NUPSS', fisio: 'Fisioterapia', odonto: 'Odontologia', nai: 'NAI', nae: 'NAE', nap: 'NAPp' };
        wide = true;
        const action = appState.modal.editar ? '✏️ Editar' : '📋 Nova';
        title = `${action} ${labels[tipo]} – Anamnese`;
        content = renderFormProntuario(tipo);
    }

    return `
        <div class="modal-overlay" id="modal-overlay" onclick="if(event.target.id === 'modal-overlay') closeModal()">
            <div class="modal ${wide ? 'modal-wide' : ''}" onclick="event.stopPropagation()">
                <div class="modal-header">
                    <div class="modal-title">${title}</div>
                    <button class="modal-close" onclick="closeModal()">×</button>
                </div>
                <div class="modal-body">${content}</div>
            </div>
        </div>
    `;
}

function renderFormCadastro() {
    return `
        <div class="form-grid">
            <div class="field">
                <label class="field-label">Nome Completo <span class="field-required">*</span></label>
                <input type="text" class="input" id="cad_nome">
            </div>
            <div class="field">
                <label class="field-label">Data de Nascimento <span class="field-required">*</span></label>
                <input type="date" class="input" id="cad_nasc">
            </div>
            <div class="field">
                <label class="field-label">CPF</label>
                <input type="text" class="input" id="cad_cpf" placeholder="000.000.000-00">
            </div>
            <div class="field">
                <label class="field-label">RG</label>
                <input type="text" class="input" id="cad_rg">
            </div>
            <div class="field">
                <label class="field-label">E-mail Institucional</label>
                <input type="email" class="input" id="cad_emailInst" placeholder="nome@aluno.vassouras.edu.br">
            </div>
            <div class="field">
                <label class="field-label">E-mail Pessoal</label>
                <input type="email" class="input" id="cad_emailPes">
            </div>
            <div class="field">
                <label class="field-label">Telefone / WhatsApp</label>
                <input type="tel" class="input" id="cad_tel">
            </div>
            <div class="field">
                <label class="field-label">Matrícula nº</label>
                <input type="text" class="input" id="cad_matricula">
            </div>
            <div class="field">
                <label class="field-label">Curso</label>
                <input type="text" class="input" id="cad_curso">
            </div>
            <div class="field">
                <label class="field-label">Período / Semestre</label>
                <input type="text" class="input" id="cad_periodo">
            </div>
            <div class="field">
                <label class="field-label">Turno</label>
                <select class="select" id="cad_turno">
                    <option>Manhã</option>
                    <option>Tarde</option>
                    <option selected>Noturno</option>
                    <option>Integral</option>
                </select>
            </div>
        </div>
        <div class="field">
            <label class="field-label">Endereço Completo</label>
            <input type="text" class="input" id="cad_endereco">
        </div>
        <div class="form-actions">
            <button class="btn btn-outline" onclick="closeModal()">Cancelar</button>
            <button class="btn btn-primary" onclick="salvarCadastro()">✅ Cadastrar Estudante</button>
        </div>
    `;
}

function renderFormUsuario() {
    const usuario = appState.modal.editar || {};
    const perfilOptions = Object.entries(PERFIS)
        .filter(([perfil]) => perfil !== 'admin')
        .map(([perfil, info]) => `<option value="${perfil}" ${usuario.perfil === perfil ? 'selected' : ''}>${info.icon} ${info.label}</option>`)
        .join('');

    return `
        <div class="form-grid">
            <div class="field">
                <label class="field-label">Login de Acesso <span class="field-required">*</span></label>
                <input type="text" class="input" id="user_login" value="${usuario.login || ''}" ${usuario.login ? 'readonly' : ''} placeholder="ex: fisioterapeuta1">
            </div>
            <div class="field">
                <label class="field-label">Nome Completo <span class="field-required">*</span></label>
                <input type="text" class="input" id="user_nome" value="${usuario.nome || ''}">
            </div>
            <div class="field">
                <label class="field-label">Senha <span class="field-required">*</span></label>
                <input type="text" class="input" id="user_senha" value="${usuario.senha || ''}" placeholder="Senha de acesso">
            </div>
            <div class="field">
                <label class="field-label">Núcleo / Função <span class="field-required">*</span></label>
                <select class="select" id="user_perfil">
                    <option value="">Selecione o núcleo</option>
                    ${perfilOptions}
                </select>
            </div>
        </div>
        <div class="form-actions">
            <button class="btn btn-outline" onclick="closeModal()">Cancelar</button>
            <button class="btn btn-primary" onclick="salvarUsuario()">💾 Salvar Acesso</button>
        </div>
    `;
}

function abrirModalUsuario(login) {
    if (login && USUARIOS[login]) {
        const usuario = USUARIOS[login];
        appState.modal = {
            tipo: 'usuario',
            editar: { login, nome: usuario.nome, senha: usuario.senha, perfil: usuario.perfil }
        };
    } else {
        appState.modal = { tipo: 'usuario' };
    }
    render();
}

function salvarUsuario() {
    const login = document.getElementById('user_login').value.trim();
    const nome = document.getElementById('user_nome').value.trim();
    const senha = document.getElementById('user_senha').value;
    const perfil = document.getElementById('user_perfil').value;

    if (!login || !nome || !senha || !perfil) {
        showToast('Preencha todos os campos antes de salvar.');
        return;
    }

    if (perfil === 'admin') {
        showToast('Não é possível cadastrar um perfil administrador aqui.');
        return;
    }

    if (appState.modal.editar) {
        const original = appState.modal.editar.login;
        USUARIOS[original] = { nome, perfil, senha, cor: PERFIS[perfil]?.cor || '#1B5E8A' };
    } else {
        if (USUARIOS[login]) {
            showToast('Este login já existe. Escolha outro.');
            return;
        }
        USUARIOS[login] = { nome, perfil, senha, cor: PERFIS[perfil]?.cor || '#1B5E8A' };
    }

    closeModal();
    showToast(`Acesso salvo para ${nome}.`);
    render();
}

function deletarUsuario(login) {
    if (!USUARIOS[login]) return;
    if (!window.confirm(`Excluir o acesso de ${login}? Esta ação não pode ser desfeita.`)) return;
    delete USUARIOS[login];
    showToast(`Acesso de usuário ${login} removido.`);
    render();
}

function renderFormAgendamento() {
    const pac = appState.pacientes[appState.pidSel];
    return `
        <div class="form-grid">
            <div class="field">
                <label class="field-label">Data <span class="field-required">*</span></label>
                <input type="date" class="input" id="agend_data">
            </div>
            <div class="field">
                <label class="field-label">Horário</label>
                <input type="time" class="input" id="agend_hora" value="08:00">
            </div>
        </div>
        <div class="form-grid">
            <div class="field">
                <label class="field-label">Paciente</label>
                <input type="text" class="input" value="${pac.meta.nome}" disabled>
            </div>
            <div class="field">
                <label class="field-label">Especialidade / Núcleo</label>
                <select class="select" id="agend_destino">
                    <option value="nupss">NUPSS – Serviço Social</option>
                    <option value="nae">NAE – Atendimento ao Estudante</option>
                    <option value="nai">NAI – Acessibilidade</option>
                    <option value="nap">NAPp – Psicologia</option>
                    <option value="fisioterapeuta">Fisioterapia</option>
                    <option value="odontologia">Odontologia</option>
                    <option value="nutri">Nutrição</option>
                </select>
            </div>
        </div>
        <div class="field">
            <label class="field-label">Status do agendamento</label>
            <select class="select" id="agend_status">
                <option selected>Atendido</option>
                <option>Faltou</option>
                <option>Reagendado</option>
            </select>
        </div>
        <div class="field">
            <label class="field-label">Profissional</label>
            <input type="text" class="input" id="agend_prof" value="${appState.usuario.nome}">
        </div>
        <div class="field">
            <label class="field-label">Observações</label>
            <input type="text" class="input" id="agend_obs">
        </div>
        <div class="form-actions">
            <button class="btn btn-outline" onclick="closeModal()">Cancelar</button>
            <button class="btn btn-primary" style="background: #b45309; border-color: #b45309;" onclick="salvarAgendamento()">💾 Salvar</button>
        </div>
    `;
}

function renderFormEncaminhamento() {
    return `
        <div class="field">
            <label class="field-label">Destino</label>
            <select class="select" id="encam_destino">
                <option>NAPp</option>
                <option>NAE</option>
                <option>NAI</option>
                <option>NUPSS</option>
                <option>Fisioterapia</option>
                <option>Odontologia</option>
                <option>Encaminhamento externo</option>
            </select>
        </div>
        <div class="field">
            <label class="field-label">Motivo <span class="field-required">*</span></label>
            <textarea class="input" id="encam_motivo"></textarea>
        </div>
        <div class="field">
            <label class="field-label">Status</label>
            <div class="radio-group">
                <label class="radio-label">
                    <input type="radio" name="encam_status" value="Pendente" checked>
                    Pendente
                </label>
                <label class="radio-label">
                    <input type="radio" name="encam_status" value="Em andamento">
                    Em andamento
                </label>
                <label class="radio-label">
                    <input type="radio" name="encam_status" value="Concluído">
                    Concluído
                </label>
            </div>
        </div>
        <div class="form-actions">
            <button class="btn btn-outline" onclick="closeModal()">Cancelar</button>
            <button class="btn btn-primary" style="background: #2A7F6F; border-color: #2A7F6F;" onclick="salvarEncaminhamento()">💾 Salvar</button>
        </div>
    `;
}

function renderFormEditarId() {
    const pac = appState.pacientes[appState.pidSel];
    const m = pac.meta;
    return `
        <div class="form-grid">
            <div class="field">
                <label class="field-label">Nome Completo</label>
                <input type="text" class="input" id="edit_nome" value="${m.nome}">
            </div>
            <div class="field">
                <label class="field-label">Data de Nascimento</label>
                <input type="date" class="input" id="edit_nasc" value="${m.nascimento}">
            </div>
            <div class="field">
                <label class="field-label">CPF</label>
                <input type="text" class="input" id="edit_cpf" value="${m.cpf}">
            </div>
            <div class="field">
                <label class="field-label">RG</label>
                <input type="text" class="input" id="edit_rg" value="${m.rg}">
            </div>
            <div class="field">
                <label class="field-label">E-mail Institucional</label>
                <input type="email" class="input" id="edit_emailInst" value="${m.emailInst}">
            </div>
            <div class="field">
                <label class="field-label">E-mail Pessoal</label>
                <input type="email" class="input" id="edit_emailPes" value="${m.emailPes}">
            </div>
            <div class="field">
                <label class="field-label">Telefone / WhatsApp</label>
                <input type="tel" class="input" id="edit_tel" value="${m.telefone}">
            </div>
            <div class="field">
                <label class="field-label">Matrícula</label>
                <input type="text" class="input" id="edit_matricula" value="${m.matricula}">
            </div>
            <div class="field">
                <label class="field-label">Curso</label>
                <input type="text" class="input" id="edit_curso" value="${m.curso}">
            </div>
            <div class="field">
                <label class="field-label">Período</label>
                <input type="text" class="input" id="edit_periodo" value="${m.periodo}">
            </div>
            <div class="field">
                <label class="field-label">Turno</label>
                <select class="select" id="edit_turno">
                    <option ${m.turno === 'Manhã' ? 'selected' : ''}>Manhã</option>
                    <option ${m.turno === 'Tarde' ? 'selected' : ''}>Tarde</option>
                    <option ${m.turno === 'Noturno' ? 'selected' : ''}>Noturno</option>
                    <option ${m.turno === 'Integral' ? 'selected' : ''}>Integral</option>
                </select>
            </div>
            <div class="field">
                <label class="field-label">Status</label>
                <select class="select" id="edit_status">
                    <option ${m.status === 'Ativo' ? 'selected' : ''}>Ativo</option>
                    <option ${m.status === 'Em espera' ? 'selected' : ''}>Em espera</option>
                    <option ${m.status === 'Inativo' ? 'selected' : ''}>Inativo</option>
                    <option ${m.status === 'Concluído' ? 'selected' : ''}>Concluído</option>
                </select>
            </div>
        </div>
        <div class="field">
            <label class="field-label">Endereço Completo</label>
            <input type="text" class="input" id="edit_endereco" value="${m.endereco}">
        </div>
        <div class="form-actions">
            <button class="btn btn-outline" onclick="closeModal()">Cancelar</button>
            <button class="btn btn-primary" onclick="salvarEditarId()">💾 Salvar Alterações</button>
        </div>
    `;
}

function renderFormEvolucao() {
    return `
        <div class="field">
            <label class="field-label">Profissional</label>
            <input type="text" class="input" value="${appState.usuario.nome}" disabled>
        </div>
        <div class="field">
            <label class="field-label">Data</label>
            <input type="text" class="input" value="${new Date().toISOString().slice(0,10)}" disabled>
        </div>
        <div class="field">
            <label class="field-label">Registro <span class="field-required">*</span></label>
            <textarea class="input" id="evol_texto" placeholder="Descreva o atendimento, técnicas, resposta do estudante..."></textarea>
        </div>
        <div class="form-actions">
            <button class="btn btn-outline" onclick="closeModal()">Cancelar</button>
            <button class="btn btn-primary" style="background: ${appState.modal.cor}; border-color: ${appState.modal.cor};" onclick="salvarEvolucao()">💾 Salvar</button>
        </div>
    `;
}

function renderFormProntuario(tipo) {
    const pac = appState.pacientes[appState.pidSel];
    const dados = appState.modal.editar || {};

    // Renderizar forms específicos
    if (tipo === 'nupss') {
        return renderFormNUPSS(dados);
    } else if (tipo === 'nae') {
        return renderFormNAE(dados);
    } else if (tipo === 'nai') {
        return renderFormNAI(dados);
    } else if (tipo === 'nap') {
        return renderFormNAP(dados);
    } else if (tipo === 'fisio') {
        return renderFormFisio(dados);
    } else if (tipo === 'odonto') {
        return renderFormOdonto(dados);
    }
    return '';
}

function renderFormNUPSS(dados) {
    return `
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 14px; padding-bottom: 10px; border-bottom: 2px solid #2A7F6F;">
            <span style="font-size: 17px;">🏠</span>
            <span style="font-family: 'Crimson Pro', Georgia, serif; font-size: 16px; font-weight: 700; color: #2A7F6F; flex: 1;">Prontuário NUPSS – Núcleo de Práticas do Serviço Social</span>
        </div>

        <div class="field">
            <label class="field-label">2. Forma de chegada</label>
            <div class="radio-group">
                <label class="radio-label"><input type="radio" name="nupss_chegada" value="espontanea" ${dados.chegada === 'espontanea' ? 'checked' : ''}>Espontânea</label>
                <label class="radio-label"><input type="radio" name="nupss_chegada" value="enc_coord" ${dados.chegada === 'enc_coord' ? 'checked' : ''}>Encaminhamento da Coordenação</label>
                <label class="radio-label"><input type="radio" name="nupss_chegada" value="enc_nap" ${dados.chegada === 'enc_nap' ? 'checked' : ''}>NAPp</label>
                <label class="radio-label"><input type="radio" name="nupss_chegada" value="enc_nae" ${dados.chegada === 'enc_nae' ? 'checked' : ''}>NAE</label>
                <label class="radio-label"><input type="radio" name="nupss_chegada" value="enc_nai" ${dados.chegada === 'enc_nai' ? 'checked' : ''}>NAI</label>
            </div>
        </div>

        <div class="form-grid">
            <div class="field">
                <label class="field-label">Quem encaminhou</label>
                <input type="text" class="input" id="nupss_quem" value="${dados.quemEncaminhou || ''}">
            </div>
            <div class="field">
                <label class="field-label">Motivo do encaminhamento</label>
                <input type="text" class="input" id="nupss_motivo" value="${dados.motivoEncaminhamento || ''}">
            </div>
        </div>

        <div style="display: flex; align-items: center; gap: 8px; margin: 20px 0 14px; padding-bottom: 10px; border-bottom: 2px solid #2A7F6F;">
            <span style="font-size: 17px;">💼</span>
            <span style="font-family: 'Crimson Pro', Georgia, serif; font-size: 16px; font-weight: 700; color: #2A7F6F;">3. Situação Socioeconômica</span>
        </div>

        <div class="form-grid">
            <div class="field">
                <label class="field-label">Renda familiar mensal (faixa)</label>
                <input type="text" class="input" id="nupss_renda" value="${dados.rendaFamiliar || ''}">
            </div>
            <div class="field">
                <label class="field-label">Nº de pessoas no núcleo familiar</label>
                <input type="text" class="input" id="nupss_pessoas" value="${dados.numPessoas || ''}">
            </div>
        </div>

        <div class="field">
            <label class="field-label">Situação de moradia</label>
            <div class="radio-group">
                <label class="radio-label"><input type="radio" name="nupss_moradia" value="propria" ${dados.moradia === 'propria' ? 'checked' : ''}>Própria</label>
                <label class="radio-label"><input type="radio" name="nupss_moradia" value="alugada" ${dados.moradia === 'alugada' ? 'checked' : ''}>Alugada</label>
                <label class="radio-label"><input type="radio" name="nupss_moradia" value="cedida" ${dados.moradia === 'cedida' ? 'checked' : ''}>Cedida</label>
                <label class="radio-label"><input type="radio" name="nupss_moradia" value="outra" ${dados.moradia === 'outra' ? 'checked' : ''}>Outra</label>
            </div>
        </div>

        <div class="field">
            <label class="field-label">Detalhes sobre a moradia</label>
            <input type="text" class="input" id="nupss_situacao_moradia" value="${dados.situacaoMoradia || ''}">
        </div>

        <div class="form-grid">
            <div class="field">
                <label class="field-label">Trabalha?</label>
                <div class="radio-group">
                    <label class="radio-label"><input type="radio" name="nupss_trabalha" value="sim" ${dados.trabalha === 'sim' ? 'checked' : ''}>Sim</label>
                    <label class="radio-label"><input type="radio" name="nupss_trabalha" value="nao" ${dados.trabalha === 'nao' ? 'checked' : ''}>Não</label>
                </div>
            </div>
            <div class="field">
                <label class="field-label">Vínculo de emprego</label>
                <input type="text" class="input" id="nupss_vinculo" value="${dados.vinculoEmprego || ''}">
            </div>
            <div class="field">
                <label class="field-label">Carga horária semanal</label>
                <input type="text" class="input" id="nupss_carga" value="${dados.cargaHoraria || ''}">
            </div>
        </div>

        <div class="field">
            <label class="field-label">Benefícios sociais que recebe</label>
            <input type="text" class="input" id="nupss_beneficios" placeholder="Ex: BPC, Bolsa Família, LOAS..." value="${dados.beneficiosSociais || ''}">
        </div>

        <div class="field">
            <label class="field-label">Situação previdenciária</label>
            <input type="text" class="input" id="nupss_previdenciaria" value="${dados.situacaoPrevidenciaria || ''}">
        </div>

        <div class="field">
            <label class="field-label">Dificuldades financeiras que impactam os estudos</label>
            <textarea class="input" id="nupss_dificuldades">${dados.dificuldadesFinanceiras || ''}</textarea>
        </div>

        <div style="display: flex; align-items: center; gap: 8px; margin: 20px 0 14px; padding-bottom: 10px; border-bottom: 2px solid #2A7F6F;">
            <span style="font-size: 17px;">🤝</span>
            <span style="font-family: 'Crimson Pro', Georgia, serif; font-size: 16px; font-weight: 700; color: #2A7F6F;">4. Rede de Suporte e Situação de Risco</span>
        </div>

        <div class="field">
            <label class="field-label">Rede de suporte familiar e social</label>
            <textarea class="input" id="nupss_redes" style="min-height: 60px">${dados.redesSuporte || ''}</textarea>
        </div>

        <div class="field">
            <label class="field-label">Situação de violência ou risco identificada?</label>
            <div class="radio-group">
                <label class="radio-label"><input type="radio" name="nupss_violencia" value="sim" ${dados.violenciaSituacaoRisco === 'sim' ? 'checked' : ''}>Sim</label>
                <label class="radio-label"><input type="radio" name="nupss_violencia" value="nao" ${dados.violenciaSituacaoRisco === 'nao' ? 'checked' : ''}>Não</label>
                <label class="radio-label"><input type="radio" name="nupss_violencia" value="suspeita" ${dados.violenciaSituacaoRisco === 'suspeita' ? 'checked' : ''}>Suspeita</label>
            </div>
        </div>

        <div class="field">
            <label class="field-label">Observações sociais relevantes</label>
            <textarea class="input" id="nupss_obs" style="min-height: 80px">${dados.observacoesSociais || ''}</textarea>
        </div>

        <div style="display: flex; align-items: center; gap: 8px; margin: 20px 0 14px; padding-bottom: 10px; border-bottom: 2px solid #2A7F6F;">
            <span style="font-size: 17px;">📤</span>
            <span style="font-family: 'Crimson Pro', Georgia, serif; font-size: 16px; font-weight: 700; color: #2A7F6F;">5. Conduta e Observações do Profissional</span>
        </div>

        <div class="field">
            <label class="field-label">Conduta e encaminhamentos adotados</label>
            <textarea class="input" id="nupss_conduta" style="min-height: 80px">${dados.condutaEncaminhamento || ''}</textarea>
        </div>

        <div class="field">
            <label class="field-label">Observações do profissional na acolhida</label>
            <textarea class="input" id="nupss_obs_prof" style="min-height: 80px">${dados.observacoesProfissional || ''}</textarea>
        </div>

        <div class="form-actions">
            <button class="btn btn-outline" onclick="closeModal()">Cancelar</button>
            <button class="btn btn-primary" style="background: #2A7F6F; border-color: #2A7F6F;" onclick="salvarProntuario('nupss')">💾 Salvar Anamnese NUPSS</button>
        </div>
    `;
}

function renderFormNAE(dados) {
    return `
        <div class="field">
            <label class="field-label">2. Forma de chegada</label>
            <div class="radio-group">
                <label class="radio-label"><input type="radio" name="nae_chegada" value="espontanea" ${dados.chegada === 'espontanea' ? 'checked' : ''}>Espontânea</label>
                <label class="radio-label"><input type="radio" name="nae_chegada" value="enc_coord" ${dados.chegada === 'enc_coord' ? 'checked' : ''}>Coordenação</label>
                <label class="radio-label"><input type="radio" name="nae_chegada" value="enc_nupss" ${dados.chegada === 'enc_nupss' ? 'checked' : ''}>NUPSS</label>
                <label class="radio-label"><input type="radio" name="nae_chegada" value="enc_nap_nai" ${dados.chegada === 'enc_nap_nai' ? 'checked' : ''}>NAPp / NAI</label>
            </div>
        </div>
        <div class="form-grid">
            <div class="field">
                <label class="field-label">Quem encaminhou</label>
                <input type="text" class="input" id="nae_quem" value="${dados.quemEncaminhou || ''}">
            </div>
            <div class="field">
                <label class="field-label">Curso</label>
                <input type="text" class="input" id="nae_curso" value="${dados.curso || ''}">
            </div>
        </div>
        <div class="form-grid">
            <div class="field">
                <label class="field-label">Matrícula</label>
                <input type="text" class="input" id="nae_matricula" value="${dados.matricula || ''}">
            </div>
            <div class="field">
                <label class="field-label">Período</label>
                <input type="text" class="input" id="nae_periodo" value="${dados.periodo || ''}">
            </div>
        </div>
        <div class="form-grid">
            <div class="field">
                <label class="field-label">IRA</label>
                <input type="text" class="input" id="nae_ira" value="${dados.ira || ''}">
            </div>
            <div class="field">
                <label class="field-label">Ano de ingresso</label>
                <input type="text" class="input" id="nae_anoIngresso" value="${dados.anoIngresso || ''}">
            </div>
        </div>
        <div class="form-grid">
            <div class="field">
                <label class="field-label">Trancamentos</label>
                <input type="text" class="input" id="nae_trancamentos" value="${dados.trancamentos || ''}">
            </div>
            <div class="field">
                <label class="field-label">Risco de jubilamento</label>
                <input type="text" class="input" id="nae_riscoJubilamento" value="${dados.riscoJubilamento || ''}">
            </div>
        </div>
        <div class="form-grid">
            <div class="field">
                <label class="field-label">Financiamento</label>
                <input type="text" class="input" id="nae_financiamento" value="${dados.financiamento || ''}">
            </div>
            <div class="field">
                <label class="field-label">Renda familiar</label>
                <input type="text" class="input" id="nae_rendaFamiliar" value="${dados.rendaFamiliar || ''}">
            </div>
        </div>
        <div class="field">
            <label class="field-label">Dificuldades financeiras</label>
            <textarea class="input" id="nae_dificuldadesFinanceiras">${dados.dificuldadesFinanceiras || ''}</textarea>
        </div>
        <div class="form-grid">
            <div class="field">
                <label class="field-label">Situação de moradia</label>
                <input type="text" class="input" id="nae_situacaoMoradia" value="${dados.situacaoMoradia || ''}">
            </div>
            <div class="field">
                <label class="field-label">Saúde</label>
                <input type="text" class="input" id="nae_saude" value="${dados.saude || ''}">
            </div>
        </div>
        <div class="field">
            <label class="field-label">Apoio psicossocial</label>
            <input type="text" class="input" id="nae_apoioPsicossocial" value="${dados.apoioPsicossocial || ''}">
        </div>
        <div class="field">
            <label class="field-label">Demanda</label>
            <textarea class="input" id="nae_demanda">${dados.demanda || ''}</textarea>
        </div>
        <div class="field">
            <label class="field-label">Conduta</label>
            <textarea class="input" id="nae_conduta">${dados.conduta || ''}</textarea>
        </div>
        <div class="field">
            <label class="field-label">Objetivos</label>
            <textarea class="input" id="nae_objetivos">${dados.objetivos || ''}</textarea>
        </div>
        <div class="form-actions">
            <button class="btn btn-outline" onclick="closeModal()">Cancelar</button>
            <button class="btn btn-primary" style="background: #b45309; border-color: #b45309;" onclick="salvarProntuario('nae')">💾 Salvar Anamnese NAE</button>
        </div>
    `;
}

function renderFormNAI(dados) {
    return `
        <div class="field">
            <label class="field-label">2. Forma de chegada</label>
            <div class="radio-group">
                <label class="radio-label"><input type="radio" name="nai_chegada" value="espontanea" ${dados.chegada === 'espontanea' ? 'checked' : ''}>Espontânea</label>
                <label class="radio-label"><input type="radio" name="nai_chegada" value="enc_coord" ${dados.chegada === 'enc_coord' ? 'checked' : ''}>Coordenação</label>
                <label class="radio-label"><input type="radio" name="nai_chegada" value="enc_nupss_nae" ${dados.chegada === 'enc_nupss_nae' ? 'checked' : ''}>NUPSS/NAE</label>
                <label class="radio-label"><input type="radio" name="nai_chegada" value="enc_externo" ${dados.chegada === 'enc_externo' ? 'checked' : ''}>Externo</label>
            </div>
        </div>
        <div class="form-grid">
            <div class="field">
                <label class="field-label">Quem encaminhou</label>
                <input type="text" class="input" id="nai_quem" value="${dados.quemEncaminhou || ''}">
            </div>
            <div class="field">
                <label class="field-label">Tipo de condição</label>
                <input type="text" class="input" id="nai_tipoCondicao" value="${dados.tipoCondicao || ''}">
            </div>
        </div>
        <div class="form-grid">
            <div class="field">
                <label class="field-label">CID</label>
                <input type="text" class="input" id="nai_cid" value="${dados.cid || ''}">
            </div>
            <div class="field">
                <label class="field-label">Descrição da condição</label>
                <textarea class="input" id="nai_descricaoCondicao">${dados.descricaoCondicao || ''}</textarea>
            </div>
        </div>
        <div class="form-grid">
            <div class="field">
                <label class="field-label">Laudo médico (obs)</label>
                <input type="text" class="input" id="nai_laudoMedico" value="${dados.laudoMedicoObs || ''}">
            </div>
            <div class="field">
                <label class="field-label">Emissor do laudo</label>
                <input type="text" class="input" id="nai_emissorLaudo" value="${dados.emissorLaudo || ''}">
            </div>
        </div>
        <div class="form-grid">
            <div class="field">
                <label class="field-label">Data do laudo</label>
                <input type="date" class="input" id="nai_dataLaudo" value="${dados.dataLaudo || ''}">
            </div>
            <div class="field">
                <label class="field-label">Barreiras identificadas</label>
                <input type="text" class="input" id="nai_barreiras" value="${dados.barreirasIdentificadas || ''}">
            </div>
        </div>
        <div class="field">
            <label class="field-label">Recursos / Necessidades solicitadas</label>
            <textarea class="input" id="nai_recursos">${dados.recursosSolicitados || ''}</textarea>
        </div>
        <div class="field">
            <label class="field-label">Tecnologia assistiva</label>
            <textarea class="input" id="nai_tecnologia">${dados.tecnologiaAssistiva || ''}</textarea>
        </div>
        <div class="field">
            <label class="field-label">Adaptações curriculares</label>
            <textarea class="input" id="nai_adaptacoes">${dados.adaptacoesCurriculares || ''}</textarea>
        </div>
        <div class="field">
            <label class="field-label">Objetivos</label>
            <textarea class="input" id="nai_objetivos">${dados.objetivos || ''}</textarea>
        </div>
        <div class="field">
            <label class="field-label">Conduta / PAAE</label>
            <textarea class="input" id="nai_conduta">${dados.condutaPaee || ''}</textarea>
        </div>
        <div class="form-actions">
            <button class="btn btn-outline" onclick="closeModal()">Cancelar</button>
            <button class="btn btn-primary" style="background: #6B3FA0; border-color: #6B3FA0;" onclick="salvarProntuario('nai')">💾 Salvar Anamnese NAI</button>
        </div>
    `;
}

function renderFormNAP(dados) {
    return `
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 14px; padding-bottom: 10px; border-bottom: 2px solid #be185d;">
            <span style="font-size: 17px;">🧠</span>
            <span style="font-family: 'Crimson Pro', Georgia, serif; font-size: 16px; font-weight: 700; color: #be185d; flex: 1;">Prontuário NAPp – Núcleo de Atendimento Psicológico</span>
        </div>

        <div class="field">
            <label class="field-label">2. Forma de chegada</label>
            <div class="radio-group">
                <label class="radio-label"><input type="radio" name="nap_chegada" value="espontanea" ${dados.chegada === 'espontanea' ? 'checked' : ''}>Espontânea</label>
                <label class="radio-label"><input type="radio" name="nap_chegada" value="encaminhamento_nupss" ${dados.chegada === 'encaminhamento_nupss' ? 'checked' : ''}>Encaminhamento NUPSS</label>
                <label class="radio-label"><input type="radio" name="nap_chegada" value="enc_prof_coord" ${dados.chegada === 'enc_prof_coord' ? 'checked' : ''}>Prof./Coord.</label>
                <label class="radio-label"><input type="radio" name="nap_chegada" value="enc_nae" ${dados.chegada === 'enc_nae' ? 'checked' : ''}>NAE</label>
                <label class="radio-label"><input type="radio" name="nap_chegada" value="enc_nai" ${dados.chegada === 'enc_nai' ? 'checked' : ''}>NAI</label>
            </div>
        </div>

        <div class="form-grid">
            <div class="field">
                <label class="field-label">Quem encaminhou</label>
                <input type="text" class="input" id="nap_quem" value="${dados.quemEncaminhou || ''}">
            </div>
            <div class="field">
                <label class="field-label">Motivo declarado</label>
                <input type="text" class="input" id="nap_motivoDeclarado" value="${dados.motivoDeclarado || ''}">
            </div>
        </div>

        <div class="field">
            <label class="field-label">Relato do estudante</label>
            <textarea class="input" id="nap_relato" style="min-height: 80px">${dados.relato || ''}</textarea>
        </div>

        <div class="form-grid">
            <div class="field">
                <label class="field-label">Tempo de dificuldade</label>
                <input type="text" class="input" id="nap_tempoDificuldade" value="${dados.tempoDificuldade || ''}">
            </div>
            <div class="field">
                <label class="field-label">Categorias</label>
                <input type="text" class="input" id="nap_categorias" value="${Array.isArray(dados.categorias) ? dados.categorias.join(', ') : dados.categorias || ''}">
            </div>
        </div>

        <div class="field">
            <label class="field-label">Especificação</label>
            <input type="text" class="input" id="nap_especificacao" value="${dados.especificacao || ''}">
        </div>

        <div class="form-grid">
            <div class="field">
                <label class="field-label">Escolas anteriores</label>
                <input type="text" class="input" id="nap_escolasAnteriores" value="${dados.escolasAnteriores || ''}">
            </div>
            <div class="field">
                <label class="field-label">Ano de ingresso</label>
                <input type="text" class="input" id="nap_anoIngresso" value="${dados.anoIngresso || ''}">
            </div>
        </div>

        <div class="form-grid">
            <div class="field">
                <label class="field-label">Reprovações / Trancamentos</label>
                <input type="text" class="input" id="nap_reprovacoesTrancamentos" value="${dados.reprovacoesTrancamentos || ''}">
            </div>
            <div class="field">
                <label class="field-label">Desempenho atual</label>
                <input type="text" class="input" id="nap_desempenhoAtual" value="${dados.desempenhoAtual || ''}">
            </div>
        </div>

        <div class="field">
            <label class="field-label">Disciplinas em dificuldade</label>
            <textarea class="input" id="nap_disciplinasDificuldade">${dados.disciplinasDificuldade || ''}</textarea>
        </div>

        <div class="field">
            <label class="field-label">Rotina</label>
            <textarea class="input" id="nap_rotina">${dados.rotina || ''}</textarea>
        </div>

        <div class="field">
            <label class="field-label">Acompanhamento psicológico</label>
            <div class="radio-group">
                <label class="radio-label"><input type="radio" name="nap_acompPsico" value="sim" ${dados.acompPsico === 'sim' ? 'checked' : ''}>Sim</label>
                <label class="radio-label"><input type="radio" name="nap_acompPsico" value="nao" ${dados.acompPsico === 'nao' ? 'checked' : ''}>Não</label>
            </div>
        </div>

        <div class="field">
            <label class="field-label">Descrição do acompanhamento</label>
            <textarea class="input" id="nap_descAcomp">${dados.descAcomp || ''}</textarea>
        </div>

        <div class="form-grid">
            <div class="field">
                <label class="field-label">Diagnóstico</label>
                <input type="text" class="input" id="nap_diagnostico" value="${dados.diagnostico || ''}">
            </div>
            <div class="field">
                <label class="field-label">Medicação</label>
                <input type="text" class="input" id="nap_medicacao" value="${dados.medicacao || ''}">
            </div>
        </div>

        <div class="field">
            <label class="field-label">Especificações do diagnóstico / medicação</label>
            <textarea class="input" id="nap_especDiagMed">${dados.especDiagMed || ''}</textarea>
        </div>

        <div class="field">
            <label class="field-label">Histórico de sofrimento</label>
            <textarea class="input" id="nap_historicoSofrimento">${dados.historicoSofrimento || ''}</textarea>
        </div>

        <div class="form-grid">
            <div class="field">
                <label class="field-label">Com quem reside</label>
                <input type="text" class="input" id="nap_comQuemReside" value="${dados.comQuemReside || ''}">
            </div>
            <div class="field">
                <label class="field-label">Situação de moradia</label>
                <input type="text" class="input" id="nap_situacaoMoradia" value="${dados.situacaoMoradia || ''}">
            </div>
        </div>

        <div class="form-grid">
            <div class="field">
                <label class="field-label">Trabalha</label>
                <div class="radio-group">
                    <label class="radio-label"><input type="radio" name="nap_trabalha" value="sim" ${dados.trabalha === 'sim' ? 'checked' : ''}>Sim</label>
                    <label class="radio-label"><input type="radio" name="nap_trabalha" value="nao" ${dados.trabalha === 'nao' ? 'checked' : ''}>Não</label>
                </div>
            </div>
            <div class="field">
                <label class="field-label">Carga horária</label>
                <input type="text" class="input" id="nap_cargaHoraria" value="${dados.cargaHoraria || ''}">
            </div>
        </div>

        <div class="form-grid">
            <div class="field">
                <label class="field-label">Relação familiar</label>
                <input type="text" class="input" id="nap_relacaoFamiliar" value="${dados.relacaoFamiliar || ''}">
            </div>
            <div class="field">
                <label class="field-label">Rede de apoio</label>
                <input type="text" class="input" id="nap_redApoio" value="${dados.redApoio || ''}">
            </div>
        </div>

        <div class="field">
            <label class="field-label">Situações relevantes</label>
            <textarea class="input" id="nap_situacoesRelevantes">${dados.situacoesRelevantes || ''}</textarea>
        </div>

        <div class="field">
            <label class="field-label">Objetivos e expectativas</label>
            <textarea class="input" id="nap_objetivosExpectativas">${dados.objetivosExpectativas || ''}</textarea>
        </div>

        <div class="field">
            <label class="field-label">Conduta</label>
            <input type="text" class="input" id="nap_conduta" value="${dados.conduta || ''}">
        </div>

        <div class="field">
            <label class="field-label">Detalhamento da conduta</label>
            <textarea class="input" id="nap_detalheCoduta">${dados.detalheCoduta || ''}</textarea>
        </div>

        <div class="field">
            <label class="field-label">Observações profissional</label>
            <textarea class="input" id="nap_observacoesProfissional">${dados.observacoesProfissional || ''}</textarea>
        </div>

        <div class="form-actions">
            <button class="btn btn-outline" onclick="closeModal()">Cancelar</button>
            <button class="btn btn-primary" style="background: #be185d; border-color: #be185d;" onclick="salvarProntuario('nap')">💾 Salvar Anamnese NAPp</button>
        </div>
    `;
}

function renderFormFisio(dados) {
    return `
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 14px; padding-bottom: 10px; border-bottom: 2px solid #1B5E8A;">
            <span style="font-size: 17px;">🦴</span>
            <span style="font-family: 'Crimson Pro', Georgia, serif; font-size: 16px; font-weight: 700; color: #1B5E8A; flex: 1;">Prontuário Fisioterapia</span>
        </div>

        <div class="form-grid">
            <div class="field">
                <label class="field-label">Data do Atendimento</label>
                <input type="date" class="input" id="fisio_data" value="${dados.dataAtendimento || new Date().toISOString().slice(0,10)}">
            </div>
            <div class="field">
                <label class="field-label">Profissional</label>
                <input type="text" class="input" id="fisio_profissional" value="${dados.profissional || ''}">
            </div>
        </div>

        <div class="field">
            <label class="field-label">Queixa Principal</label>
            <textarea class="input" id="fisio_queixa" style="min-height: 60px">${dados.queixa || ''}</textarea>
        </div>

        <div class="field">
            <label class="field-label">Histórico Clínico</label>
            <textarea class="input" id="fisio_historico" style="min-height: 80px">${dados.historico || ''}</textarea>
        </div>

        <div class="form-grid-3">
            <div class="field">
                <label class="field-label">Comorbidades</label>
                <input type="text" class="input" id="fisio_comorbidades" value="${dados.comorbidades || ''}">
            </div>
            <div class="field">
                <label class="field-label">Medicamentos em Uso</label>
                <input type="text" class="input" id="fisio_medicamentos" value="${dados.medicamentos || ''}">
            </div>
            <div class="field">
                <label class="field-label">Alergias</label>
                <input type="text" class="input" id="fisio_alergias" value="${dados.alergias || ''}">
            </div>
        </div>

        <div class="field">
            <label class="field-label">Escala de Dor – EVA: ${dados.eva || 5}/10</label>
            <input type="range" min="0" max="10" value="${dados.eva || 5}" id="fisio_eva" class="range-input" oninput="document.querySelectorAll('label')[document.querySelectorAll('label').length-1].textContent='Escala de Dor – EVA: '+this.value+'/10'">
            <div class="range-labels">
                <span>0 – Sem dor</span>
                <span>10 – Dor máxima</span>
            </div>
        </div>

        <div class="form-grid">
            <div class="field">
                <label class="field-label">Mobilidade</label>
                <input type="text" class="input" id="fisio_mobilidade" value="${dados.mobilidade || ''}">
            </div>
            <div class="field">
                <label class="field-label">Força Muscular</label>
                <input type="text" class="input" id="fisio_forca" value="${dados.forca || ''}">
            </div>
        </div>

        <div class="field">
            <label class="field-label">Diagnóstico Fisioterapêutico</label>
            <input type="text" class="input" id="fisio_diag" value="${dados.diagnostico || ''}">
        </div>

        <div style="display: flex; align-items: center; gap: 8px; margin: 20px 0 14px; padding-bottom: 10px; border-bottom: 2px solid #1B5E8A;">
            <span style="font-size: 17px;">🏃</span>
            <span style="font-family: 'Crimson Pro', Georgia, serif; font-size: 16px; font-weight: 700; color: #1B5E8A;">Plano de Tratamento</span>
        </div>

        <div class="field">
            <label class="field-label">Objetivo</label>
            <textarea class="input" id="fisio_objetivo" style="min-height: 80px">${dados.objetivo || ''}</textarea>
        </div>

        <div class="form-grid">
            <div class="field">
                <label class="field-label">Frequência</label>
                <input type="text" class="input" id="fisio_frequencia" placeholder="Ex: 2x por semana" value="${dados.frequencia || ''}">
            </div>
            <div class="field">
                <label class="field-label">Duração Prevista</label>
                <input type="text" class="input" id="fisio_duracao" placeholder="Ex: 6 semanas" value="${dados.duracao || ''}">
            </div>
        </div>

        <div class="field">
            <label class="field-label">Técnicas Previstas (separe por vírgula)</label>
            <textarea class="input" id="fisio_tecnicas" style="min-height: 80px">${dados.tecnicas || ''}</textarea>
        </div>

        <div class="field">
            <label class="field-label">Conduta</label>
            <textarea class="input" id="fisio_conduta" style="min-height: 80px">${dados.conduta || ''}</textarea>
        </div>

        <div class="field">
            <label class="field-label">Observações do Profissional</label>
            <textarea class="input" id="fisio_obs" style="min-height: 80px">${dados.observacoesProfissional || ''}</textarea>
        </div>

        <div class="form-actions">
            <button class="btn btn-outline" onclick="closeModal()">Cancelar</button>
            <button class="btn btn-primary" style="background: #1B5E8A; border-color: #1B5E8A;" onclick="salvarProntuario('fisio')">💾 Salvar Prontuário Fisioterapia</button>
        </div>
    `;
}

function renderFormOdonto(dados) {
    return `
        <div class="field">
            <label class="field-label">Queixa principal</label>
            <input type="text" class="input" id="odonto_queixa" value="${dados.queixaPrincipal || ''}">
        </div>
        <div class="field">
            <label class="field-label">Histórico odontológico anterior</label>
            <textarea class="input" id="odonto_historico">${dados.historicoDental || ''}</textarea>
        </div>
        <div class="field">
            <label class="field-label">Necessidades identificadas</label>
            <textarea class="input" id="odonto_necessidades">${dados.necessidades || ''}</textarea>
        </div>
        <div class="form-actions">
            <button class="btn btn-outline" onclick="closeModal()">Cancelar</button>
            <button class="btn btn-primary" style="background: #0e7490; border-color: #0e7490;" onclick="salvarProntuario('odonto')">💾 Salvar Prontuário Odontologia</button>
        </div>
    `;
}

function renderToast() {
    return `<div class="toast">${appState.toast}</div>`;
}

// ─── EVENT LISTENERS ─────────────────────────────────────────────────────────
function attachLoginEvents() {
    const userInput = document.getElementById('login-user');
    const passInput = document.getElementById('login-pass');
    if (userInput) {
        userInput.addEventListener('keypress', e => e.key === 'Enter' && fazerLogin());
        passInput.addEventListener('keypress', e => e.key === 'Enter' && fazerLogin());
    }
}

function attachAdminEvents() {
    const searchInput = document.getElementById('admin-search');
    if (searchInput) {
        searchInput.addEventListener('input', e => {
            appState.adminBusca = e.target.value;
            render();
        });
    }
}

function attachListaEvents() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', e => {
            appState.busca = e.target.value;
            render();
        });
    }
}

function attachProntuarioEvents() {
}

function attachModalEvents() {
}

function setListaFiltro(valor) {
    appState.listaFiltro = valor;
    render();
}

// ─── ACTIONS ─────────────────────────────────────────────────────────────────
function fazerLogin() {
    const user = document.getElementById('login-user').value.trim();
    const pass = document.getElementById('login-pass').value;
    const perfilSel = document.getElementById('login-perfil')?.value || '';
    const errorEl = document.getElementById('login-error');

    if (!user || !pass) {
        errorEl.textContent = "Preencha usuário e senha.";
        errorEl.style.display = 'block';
        return;
    }

    if (user === 'admin') {
        if (pass === 'Admin@2026') {
            appState.usuario = { login: 'admin', ...USUARIOS.admin };
            appState.tela = "admin";
            render();
            return;
        }
        errorEl.textContent = "Usuário ou senha inválidos.";
        errorEl.style.display = 'block';
        return;
    }

    if (!perfilSel) {
        errorEl.textContent = "Selecione o núcleo / função.";
        errorEl.style.display = 'block';
        return;
    }

    const usr = USUARIOS[user];
    if (usr && usr.senha === pass && usr.perfil === perfilSel) {
        appState.usuario = { login: user, ...usr };
        appState.tela = "lista";
        render();
    } else {
        errorEl.textContent = "Usuário, perfil ou senha inválidos.";
        errorEl.style.display = 'block';
    }
}

function demoLogin(user) {
    document.getElementById('login-user').value = user;
    document.getElementById('login-pass').value = '1234';
    const perfilSelect = document.getElementById('login-perfil');
    if (perfilSelect && USUARIOS[user]) {
        perfilSelect.value = USUARIOS[user].perfil;
    }
    fazerLogin();
}

function fazerLogout() {
    appState.usuario = null;
    appState.tela = "lista";
    appState.pidSel = null;
    appState.abaSel = "identificacao";
    render();
}

function selecionarPaciente(pid) {
    appState.pidSel = pid;
    appState.abaSel = "identificacao";
    appState.tela = "prontuario";
    addAuditoria(pid, "Visualizou prontuário");
    render();
}

function voltarParaLista() {
    appState.tela = "lista";
    appState.pidSel = null;
    appState.abaSel = "identificacao";
    render();
}

function mudarAba(aba) {
    appState.abaSel = aba;
    render();
}

function abrirModalCadastro() {
    appState.modal = { tipo: 'cadastro' };
    render();
}

function abrirModalAgendamento() {
    appState.modal = { tipo: 'agendamento' };
    render();
}

function abrirModalEncaminhamento() {
    appState.modal = { tipo: 'encaminhamento' };
    render();
}

function abrirModalEditarId() {
    appState.modal = { tipo: 'editar_id' };
    render();
}

function abrirModalEvolucao(chave, label, cor) {
    appState.modal = { tipo: 'evolucao', servico: label, chave, cor };
    render();
}

function abrirModalProntuario(tipo) {
    const pac = appState.pacientes[appState.pidSel];
    appState.modal = { tipo: `pront_${tipo}`, editar: pac.prontuarios[tipo] };
    render();
}

function closeModal() {
    appState.modal = null;
    render();
}

function showToast(msg) {
    appState.toast = msg;
    render();
    setTimeout(() => {
        appState.toast = null;
        render();
    }, 2600);
}

function addAuditoria(pid, acao) {
    const entry = { data: agora(), usuario: appState.usuario.login, acao, ip: "192.168.*.*" };
    appState.pacientes[pid].auditoria.push(entry);
}

function salvarCadastro() {
    const dados = {
        nome: document.getElementById('cad_nome').value,
        nascimento: document.getElementById('cad_nasc').value,
        cpf: document.getElementById('cad_cpf').value,
        rg: document.getElementById('cad_rg').value,
        emailInst: document.getElementById('cad_emailInst').value,
        emailPes: document.getElementById('cad_emailPes').value,
        telefone: document.getElementById('cad_tel').value,
        endereco: document.getElementById('cad_endereco').value,
        curso: document.getElementById('cad_curso').value,
        periodo: document.getElementById('cad_periodo').value,
        matricula: document.getElementById('cad_matricula').value,
        turno: document.getElementById('cad_turno').value,
    };

    if (!dados.nome || !dados.nascimento) {
        alert("Nome e data de nascimento são obrigatórios");
        return;
    }

    const nid = "P" + String(Object.keys(appState.pacientes).length + 1).padStart(3, "0");
    const novo = mkPaciente(nid, dados.nome, dados.nascimento, dados.curso, dados.periodo, dados.matricula || uid(), dados.turno, dados.cpf, dados.rg, dados.emailInst, dados.emailPes, dados.telefone, dados.endereco);
    appState.pacientes[nid] = novo;
    showToast(`✅ Estudante ${dados.nome} cadastrado(a) — ${nid}`);
    closeModal();
    appState.tela = "lista";
    appState.busca = "";
    render();
}

function salvarAgendamento() {
    const dados = {
        id: uid(),
        pacienteId: appState.pidSel,
        pacienteNome: appState.pacientes[appState.pidSel].meta.nome,
        data: document.getElementById('agend_data').value,
        hora: document.getElementById('agend_hora').value,
        servico: document.getElementById('agend_destino').options[document.getElementById('agend_destino').selectedIndex].text,
        destino: document.getElementById('agend_destino').value,
        profissional: document.getElementById('agend_prof').value,
        status: document.getElementById('agend_status').value,
        obs: document.getElementById('agend_obs').value,
        origem: appState.usuario.perfil,
    };

    if (!dados.data) {
        alert("Data é obrigatória");
        return;
    }

    appState.pacientes[appState.pidSel].agendamentos.push(dados);
    addAuditoria(appState.pidSel, `Agendamento criado – ${dados.servico} em ${fmtData(dados.data)}`);
    showToast("✅ Agendamento salvo");
    closeModal();
    render();
}

function salvarEncaminhamento() {
    const destino = document.getElementById('encam_destino').value;
    const motivo = document.getElementById('encam_motivo').value;
    const status = document.querySelector('input[name="encam_status"]:checked').value;

    if (!motivo) {
        alert("Motivo é obrigatório");
        return;
    }

    const dados = {
        data: new Date().toISOString().slice(0, 10),
        origem: PERFIS[appState.usuario.perfil].label,
        destino,
        motivo,
        status,
    };

    appState.pacientes[appState.pidSel].encaminhamentos.push(dados);
    addAuditoria(appState.pidSel, `Adicionou encaminhamento para ${destino}`);
    showToast("✅ Encaminhamento salvo");
    closeModal();
    render();
}

function salvarEditarId() {
    const m = appState.pacientes[appState.pidSel].meta;
    m.nome = document.getElementById('edit_nome').value;
    m.nascimento = document.getElementById('edit_nasc').value;
    m.cpf = document.getElementById('edit_cpf').value;
    m.rg = document.getElementById('edit_rg').value;
    m.emailInst = document.getElementById('edit_emailInst').value;
    m.emailPes = document.getElementById('edit_emailPes').value;
    m.telefone = document.getElementById('edit_tel').value;
    m.endereco = document.getElementById('edit_endereco').value;
    m.curso = document.getElementById('edit_curso').value;
    m.periodo = document.getElementById('edit_periodo').value;
    m.matricula = document.getElementById('edit_matricula').value;
    m.turno = document.getElementById('edit_turno').value;
    m.status = document.getElementById('edit_status').value;

    addAuditoria(appState.pidSel, "Editou dados de identificação");
    showToast("✅ Dados atualizados");
    closeModal();
    render();
}

function salvarEvolucao() {
    const texto = document.getElementById('evol_texto').value;
    if (!texto.trim()) {
        alert("Descrição é obrigatória");
        return;
    }

    const entry = {
        data: new Date().toISOString().slice(0, 10),
        profissional: appState.usuario.nome,
        registro: texto,
    };

    appState.pacientes[appState.pidSel].evolucoes[appState.modal.chave].push(entry);
    addAuditoria(appState.pidSel, `Adicionou evolução – ${appState.modal.chave.toUpperCase()}`);
    showToast("✅ Evolução registrada");
    closeModal();
    render();
}

function salvarProntuario(tipo) {
    const pac = appState.pacientes[appState.pidSel];
    let dados = {};

    if (tipo === 'nupss') {
        dados = {
            chegada: document.querySelector('input[name="nupss_chegada"]:checked')?.value || '',
            quemEncaminhou: document.getElementById('nupss_quem')?.value || '',
            motivoEncaminhamento: document.getElementById('nupss_motivo')?.value || '',
            rendaFamiliar: document.getElementById('nupss_renda')?.value || '',
            numPessoas: document.getElementById('nupss_pessoas')?.value || '',
            moradia: document.querySelector('input[name="nupss_moradia"]:checked')?.value || '',
            situacaoMoradia: document.getElementById('nupss_situacao_moradia')?.value || '',
            trabalha: document.querySelector('input[name="nupss_trabalha"]:checked')?.value || '',
            vinculoEmprego: document.getElementById('nupss_vinculo')?.value || '',
            cargaHoraria: document.getElementById('nupss_carga')?.value || '',
            beneficiosSociais: document.getElementById('nupss_beneficios')?.value || '',
            situacaoPrevidenciaria: document.getElementById('nupss_previdenciaria')?.value || '',
            dificuldadesFinanceiras: document.getElementById('nupss_dificuldades')?.value || '',
            redesSuporte: document.getElementById('nupss_redes')?.value || '',
            violenciaSituacaoRisco: document.querySelector('input[name="nupss_violencia"]:checked')?.value || '',
            observacoesSociais: document.getElementById('nupss_obs')?.value || '',
            condutaEncaminhamento: document.getElementById('nupss_conduta')?.value || '',
            observacoesProfissional: document.getElementById('nupss_obs_prof')?.value || '',
        };
    } else if (tipo === 'nae') {
        dados = {
            chegada: document.querySelector('input[name="nae_chegada"]:checked')?.value || '',
            quemEncaminhou: document.getElementById('nae_quem')?.value || '',
            curso: document.getElementById('nae_curso')?.value || '',
            matricula: document.getElementById('nae_matricula')?.value || '',
            periodo: document.getElementById('nae_periodo')?.value || '',
            ira: document.getElementById('nae_ira')?.value || '',
            anoIngresso: document.getElementById('nae_anoIngresso')?.value || '',
            trancamentos: document.getElementById('nae_trancamentos')?.value || '',
            riscoJubilamento: document.getElementById('nae_riscoJubilamento')?.value || '',
            financiamento: document.getElementById('nae_financiamento')?.value || '',
            rendaFamiliar: document.getElementById('nae_rendaFamiliar')?.value || '',
            dificuldadesFinanceiras: document.getElementById('nae_dificuldadesFinanceiras')?.value || '',
            situacaoMoradia: document.getElementById('nae_situacaoMoradia')?.value || '',
            saude: document.getElementById('nae_saude')?.value || '',
            apoioPsicossocial: document.getElementById('nae_apoioPsicossocial')?.value || '',
            demanda: document.getElementById('nae_demanda')?.value || '',
            conduta: document.getElementById('nae_conduta')?.value || '',
            objetivos: document.getElementById('nae_objetivos')?.value || '',
        };
    } else if (tipo === 'nai') {
        dados = {
            chegada: document.querySelector('input[name="nai_chegada"]:checked')?.value || '',
            quemEncaminhou: document.getElementById('nai_quem')?.value || '',
            tipoCondicao: document.getElementById('nai_tipoCondicao')?.value || '',
            cid: document.getElementById('nai_cid')?.value || '',
            descricaoCondicao: document.getElementById('nai_descricaoCondicao')?.value || '',
            laudoMedicoObs: document.getElementById('nai_laudoMedico')?.value || '',
            emissorLaudo: document.getElementById('nai_emissorLaudo')?.value || '',
            dataLaudo: document.getElementById('nai_dataLaudo')?.value || '',
            barreirasIdentificadas: document.getElementById('nai_barreiras')?.value || '',
            recursosSolicitados: document.getElementById('nai_recursos')?.value || '',
            tecnologiaAssistiva: document.getElementById('nai_tecnologia')?.value || '',
            adaptacoesCurriculares: document.getElementById('nai_adaptacoes')?.value || '',
            objetivos: document.getElementById('nai_objetivos')?.value || '',
            condutaPaee: document.getElementById('nai_conduta')?.value || '',
        };
    } else if (tipo === 'nap') {
        dados = {
            chegada: document.querySelector('input[name="nap_chegada"]:checked')?.value || '',
            quemEncaminhou: document.getElementById('nap_quem')?.value || '',
            motivoDeclarado: document.getElementById('nap_motivoDeclarado')?.value || '',
            relato: document.getElementById('nap_relato')?.value || '',
            tempoDificuldade: document.getElementById('nap_tempoDificuldade')?.value || '',
            categorias: (document.getElementById('nap_categorias')?.value || '').split(',').map(s => s.trim()).filter(Boolean),
            especificacao: document.getElementById('nap_especificacao')?.value || '',
            escolasAnteriores: document.getElementById('nap_escolasAnteriores')?.value || '',
            anoIngresso: document.getElementById('nap_anoIngresso')?.value || '',
            reprovacoesTrancamentos: document.getElementById('nap_reprovacoesTrancamentos')?.value || '',
            desempenhoAtual: document.getElementById('nap_desempenhoAtual')?.value || '',
            disciplinasDificuldade: document.getElementById('nap_disciplinasDificuldade')?.value || '',
            rotina: document.getElementById('nap_rotina')?.value || '',
            acompPsico: document.querySelector('input[name="nap_acompPsico"]:checked')?.value || '',
            descAcomp: document.getElementById('nap_descAcomp')?.value || '',
            diagnostico: document.getElementById('nap_diagnostico')?.value || '',
            medicacao: document.getElementById('nap_medicacao')?.value || '',
            especDiagMed: document.getElementById('nap_especDiagMed')?.value || '',
            historicoSofrimento: document.getElementById('nap_historicoSofrimento')?.value || '',
            comQuemReside: document.getElementById('nap_comQuemReside')?.value || '',
            situacaoMoradia: document.getElementById('nap_situacaoMoradia')?.value || '',
            trabalha: document.querySelector('input[name="nap_trabalha"]:checked')?.value || '',
            cargaHoraria: document.getElementById('nap_cargaHoraria')?.value || '',
            relacaoFamiliar: document.getElementById('nap_relacaoFamiliar')?.value || '',
            redApoio: document.getElementById('nap_redApoio')?.value || '',
            situacoesRelevantes: document.getElementById('nap_situacoesRelevantes')?.value || '',
            objetivosExpectativas: document.getElementById('nap_objetivosExpectativas')?.value || '',
            conduta: document.getElementById('nap_conduta')?.value || '',
            detalheCoduta: document.getElementById('nap_detalheCoduta')?.value || '',
            observacoesProfissional: document.getElementById('nap_observacoesProfissional')?.value || '',
        };
    } else if (tipo === 'fisio') {
        dados = {
            queixa: document.getElementById('fisio_queixa')?.value || '',
            historico: document.getElementById('fisio_historico')?.value || '',
            comorbidades: document.getElementById('fisio_comorbidades')?.value || '',
            medicamentos: document.getElementById('fisio_medicamentos')?.value || '',
            alergias: document.getElementById('fisio_alergias')?.value || '',
            eva: document.getElementById('fisio_eva')?.value || 5,
            mobilidade: document.getElementById('fisio_mobilidade')?.value || '',
            forca: document.getElementById('fisio_forca')?.value || '',
            diagnostico: document.getElementById('fisio_diag')?.value || '',
            objetivo: document.getElementById('fisio_objetivo')?.value || '',
            frequencia: document.getElementById('fisio_frequencia')?.value || '',
            duracao: document.getElementById('fisio_duracao')?.value || '',
            tecnicas: document.getElementById('fisio_tecnicas')?.value || '',
            conduta: document.getElementById('fisio_conduta')?.value || '',
            observacoesProfissional: document.getElementById('fisio_obs')?.value || '',
        };
    } else if (tipo === 'odonto') {
        dados = {
            queixaPrincipal: document.getElementById('odonto_queixa')?.value || '',
            historicoDental: document.getElementById('odonto_historico')?.value || '',
            necessidades: document.getElementById('odonto_necessidades')?.value || '',
        };
    }

    pac.prontuarios[tipo] = dados;
    const labels = { nupss: 'NUPSS', fisio: 'Fisioterapia', odonto: 'Odontologia', nai: 'NAI', nae: 'NAE', nap: 'NAP' };
    addAuditoria(appState.pidSel, `Salvou prontuário ${labels[tipo]}`);
    showToast(`✅ Prontuário ${labels[tipo]} salvo com sucesso`);
    closeModal();
    render();
}

// ─── INIT ────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    render();
});


