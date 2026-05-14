import { useState } from "react";

// ─── USUÁRIOS ────────────────────────────────────────────────────────────────
const USUARIOS = {
  "nupss": { nome: "Dra. Mariana Souza", perfil: "nupss", senha: "1234", cor: "#2A7F6F" },
  "fisioterapeuta": { nome: "Dr. Carlos Lima", perfil: "fisioterapeuta", senha: "1234", cor: "#1B5E8A" },
  "odontologia": { nome: "Dra. Paula Rocha", perfil: "odontologia", senha: "1234", cor: "#0e7490" },
  "nai": { nome: "Dr. Fernando Dias", perfil: "nai", senha: "1234", cor: "#6B3FA0" },
  "nae": { nome: "Dra. Camila Nunes", perfil: "nae", senha: "1234", cor: "#b45309" },
  "nap": { nome: "Psic. Renata Alves", perfil: "nap", senha: "1234", cor: "#be185d" },
  "supervisor": { nome: "Prof. Ana Beatriz", perfil: "supervisor", senha: "1234", cor: "#374151" },
  "recepcao": { nome: "Juliana Mendes", perfil: "recepcao", senha: "1234", cor: "#b45309" },
};

const PERFIS = {
  nupss:         { label: "NUPSS", icon: "🏠", cor: "#2A7F6F" },
  fisioterapeuta:{ label: "Fisioterapia", icon: "🦴", cor: "#1B5E8A" },
  odontologia:   { label: "Odontologia", icon: "🦷", cor: "#0e7490" },
  nai:           { label: "NAI", icon: "♿", cor: "#6B3FA0" },
  nae:           { label: "NAE", icon: "🎓", cor: "#b45309" },
  nap:           { label: "NAP", icon: "🧠", cor: "#be185d" },
  supervisor:    { label: "Supervisor", icon: "👁", cor: "#374151" },
  recepcao:      { label: "Recepção", icon: "📋", cor: "#b45309" },
};

// ─── UTILS ────────────────────────────────────────────────────────────────────
const calcIdade = nasc => { if(!nasc)return "—"; const d=new Date(nasc),h=new Date(); let a=h.getFullYear()-d.getFullYear(); if(h.getMonth()<d.getMonth()||(h.getMonth()===d.getMonth()&&h.getDate()<d.getDate()))a--; return a; };
const fmtData = d => d ? new Date(d+"T00:00:00").toLocaleDateString("pt-BR") : "—";
const agora = () => { const n=new Date(); return `${n.toLocaleDateString("pt-BR")} ${n.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}`; };
const uid = () => Math.random().toString(36).slice(2,8).toUpperCase();

// ─── ESTADO INICIAL ───────────────────────────────────────────────────────────
const mkPaciente = (id,nome,nasc,curso,periodo,matricula,turno,cpf,rg,emailInst,emailPes,tel,end) => ({
  id, meta:{ id, nome, nascimento:nasc, cpf, rg, emailInst, emailPes, telefone:tel, endereco:end, curso, periodo, matricula, turno, status:"Ativo", ultimoAtendimento:"2026-05-08" },
  agendamentos:[],
  prontuarios:{ nupss:null, fisio:null, odonto:null, nai:null, nae:null, nap:null },
  evolucoes:{ nupss:[], fisio:[], odonto:[], nai:[], nae:[], nap:[] },
  encaminhamentos:[],
  auditoria:[],
});

const INICIAL_PACIENTES = {
  "P001": (() => {
    const p = mkPaciente("P001","Ana Paula Ferreira","2000-03-15","Fisioterapia","3","2023001","Noturno","***.***.***-01","MG-***","ana.ferreira@aluno.vassouras.edu.br","ana@gmail.com","(24) 99999-1111","Rua das Flores, 123 – Saquarema/RJ");
    p.prontuarios.nupss = { chegada:"espontanea", quemEncaminhou:"", motivoEncaminhamento:"", situacaoPrevidenciaria:"", beneficiosSociais:"", rendaFamiliar:"1,5 SM", numPessoas:"4", moradia:"alugada", situacaoMoradia:"", trabalha:"nao", vinculoEmprego:"", cargaHoraria:"", dificuldadesFinanceiras:"", redesSuporte:"", violenciaSituacaoRisco:"nao", observacoesSociais:"Família em situação de vulnerabilidade.", condutaEncaminhamento:"", observacoesProfissional:"Boa receptividade. Triagem realizada." };
    p.prontuarios.nap = { chegada:"encaminhamento_nupss", quemEncaminhou:"Dra. Mariana Souza", motivoDeclarado:"Ansiedade acadêmica", relato:"Sente muita ansiedade antes das provas.", tempoDificuldade:"6 meses", categorias:["ansiedade"], especificacao:"", escolasAnteriores:"Colégio Estadual NS", anoIngresso:"2023", reprovacoesTrancamentos:"Não", desempenhoAtual:"Regular", disciplinasDificuldade:"Bioestatística", rotina:"2h/dia, em casa", acompPsico:"nao", descAcomp:"", diagnostico:"nenhum", medicacao:"nenhum", especDiagMed:"", historicoSofrimento:"", comQuemReside:"Mãe e pai", situacaoMoradia:"alugada", trabalha:"nao", cargaHoraria:"", relacaoFamiliar:"Boa", redApoio:"Mãe e namorado", situacoesRelevantes:"", objetivosExpectativas:"Diminuir a ansiedade nas provas.", observacoesProfissional:"Estudante ansiosa, colaborativa.", conduta:"acomp_psico", detalheCoduta:"Iniciar acompanhamento semanal." };
    p.evolucoes.nupss = [{ data:"2026-03-10", profissional:"Dra. Mariana Souza", registro:"Triagem socioeconômica realizada. Demanda habitacional identificada." }];
    p.evolucoes.nap = [{ data:"2026-04-02", profissional:"Psic. Renata Alves", registro:"1ª sessão. Rapport estabelecido. Técnicas de respiração introduzidas." }];
    p.encaminhamentos = [{ data:"2026-04-05", origem:"NUPSS", destino:"NAP", motivo:"Suporte psicológico para ansiedade acadêmica", status:"Concluído" }];
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

// ─── UI BASE ──────────────────────────────────────────────────────────────────
const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;600;700&family=DM+Sans:wght@400;500;600;700&display=swap');*{box-sizing:border-box;}`;

const inp = { width:"100%", padding:"9px 12px", border:"1.5px solid #e2e8f0", borderRadius:7, fontSize:13, fontFamily:"inherit", outline:"none", boxSizing:"border-box", color:"#1a2940", background:"#fff" };
const ta  = { ...inp, resize:"vertical", minHeight:80 };

const Card = ({ children, style }) => (
  <div style={{ background:"#fff", borderRadius:10, boxShadow:"0 1px 4px rgba(0,0,0,0.08)", border:"1px solid #e8ecf0", padding:"20px 24px", marginBottom:14, ...style }}>{children}</div>
);

const SecTitle = ({ icon, title, cor, action }) => (
  <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:14, paddingBottom:10, borderBottom:`2px solid ${cor||"#e8ecf0"}` }}>
    <span style={{ fontSize:17 }}>{icon}</span>
    <span style={{ fontFamily:"'Crimson Pro',Georgia,serif", fontSize:16, fontWeight:700, color:cor||"#1a2940", flex:1 }}>{title}</span>
    {action}
  </div>
);

const InfoGrid = ({ items }) => (
  <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(190px,1fr))", gap:"10px 20px" }}>
    {items.map(({label,value})=>(
      <div key={label}>
        <div style={{ fontSize:10, color:"#8a96a3", textTransform:"uppercase", letterSpacing:1, fontWeight:700, marginBottom:2 }}>{label}</div>
        <div style={{ fontSize:13, color:"#1a2940", fontWeight:500 }}>{value||"—"}</div>
      </div>
    ))}
  </div>
);

const Btn = ({ children, onClick, cor="#1B5E8A", outline, small, style, disabled }) => (
  <button disabled={disabled} onClick={onClick} style={{ background:outline?"transparent":cor, color:outline?cor:"#fff", border:`1.5px solid ${disabled?"#ccc":cor}`, borderRadius:7, padding:small?"5px 12px":"9px 18px", fontSize:small?12:13, fontWeight:700, cursor:disabled?"not-allowed":"pointer", fontFamily:"inherit", opacity:disabled?.5:1, ...style }}>
    {children}
  </button>
);

const Badge = ({ children, cor }) => {
  const c = { verde:"#065f46", laranja:"#92400e", azul:"#1e3a5f", roxo:"#4c1d95" };
  return <span style={{ background:c[cor]||c.azul, color:"#fff", borderRadius:4, padding:"2px 8px", fontSize:11, fontWeight:700, letterSpacing:.5 }}>{children}</span>;
};

function Field({ label, required, children }) {
  return (
    <div style={{ marginBottom:12 }}>
      <label style={{ display:"block", fontSize:11, fontWeight:700, color:"#6b7280", textTransform:"uppercase", letterSpacing:1, marginBottom:4 }}>{label}{required&&<span style={{color:"#ef4444"}}> *</span>}</label>
      {children}
    </div>
  );
}

function CheckGroup({ options, values=[], onChange }) {
  return (
    <div style={{ display:"flex", flexWrap:"wrap", gap:"6px 14px" }}>
      {options.map(o=>(
        <label key={o.value} style={{ display:"flex", alignItems:"center", gap:6, fontSize:13, cursor:"pointer", color:"#374151" }}>
          <input type="checkbox" checked={values.includes(o.value)} onChange={e=>{ const nv=e.target.checked?[...values,o.value]:values.filter(v=>v!==o.value); onChange(nv); }} />
          {o.label}
        </label>
      ))}
    </div>
  );
}

function Radio({ options, value, onChange }) {
  return (
    <div style={{ display:"flex", flexWrap:"wrap", gap:"6px 16px" }}>
      {options.map(o=>(
        <label key={o.value} style={{ display:"flex", alignItems:"center", gap:6, fontSize:13, cursor:"pointer", color:"#374151" }}>
          <input type="radio" name={Math.random()} checked={value===o.value} onChange={()=>onChange(o.value)} />
          {o.label}
        </label>
      ))}
    </div>
  );
}

// ─── MODAL ────────────────────────────────────────────────────────────────────
function Modal({ title, onClose, children, wide }) {
  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.5)", zIndex:1000, display:"flex", alignItems:"flex-start", justifyContent:"center", padding:"20px 12px", overflowY:"auto" }}>
      <div style={{ background:"#fff", borderRadius:14, width:"100%", maxWidth:wide?720:540, boxShadow:"0 20px 60px rgba(0,0,0,0.3)", marginTop:20 }}>
        <div style={{ display:"flex", alignItems:"center", padding:"16px 22px", borderBottom:"1px solid #e8ecf0", position:"sticky", top:0, background:"#fff", borderRadius:"14px 14px 0 0", zIndex:1 }}>
          <span style={{ fontFamily:"'Crimson Pro',serif", fontSize:18, fontWeight:700, color:"#0f2342", flex:1 }}>{title}</span>
          <button onClick={onClose} style={{ background:"none", border:"none", fontSize:22, cursor:"pointer", color:"#9ca3af" }}>×</button>
        </div>
        <div style={{ padding:"22px 22px 20px", maxHeight:"80vh", overflowY:"auto" }}>{children}</div>
      </div>
    </div>
  );
}

// ─── PRONTUÁRIO NAP ───────────────────────────────────────────────────────────
function FormNAP({ initial, onSave, onCancel, usuario }) {
  const def = { chegada:"espontanea", quemEncaminhou:"", motivoDeclarado:"", relato:"", tempoDificuldade:"", categorias:[], especificacao:"", escolasAnteriores:"", anoIngresso:"", reprovacoesTrancamentos:"", desempenhoAtual:"", disciplinasDificuldade:"", rotina:"", acompPsico:"nao", descAcomp:"", diagnostico:"nenhum", medicacao:"nenhum", especDiagMed:"", historicoSofrimento:"", comQuemReside:"", situacaoMoradia:"", trabalha:"nao", cargaHoraria:"", relacaoFamiliar:"", redApoio:"", situacoesRelevantes:"", objetivosExpectativas:"", observacoesProfissional:"", conduta:"", detalheCoduta:"", ...initial };
  const [f, setF] = useState(def);
  const s = k => e => setF(p=>({...p,[k]:e.target.value}));
  const catOpts = [{value:"dificuldade_aprendizagem",label:"Dificuldade de aprendizagem"},{value:"ansiedade",label:"Ansiedade / estresse"},{value:"concentracao",label:"Dificuldade de concentração"},{value:"sofrimento_emocional",label:"Sofrimento emocional"},{value:"conflito",label:"Conflito interpessoal"},{value:"baixo_rendimento",label:"Baixo rendimento acadêmico"},{value:"leitura_escrita",label:"Dificuldade de leitura/escrita"},{value:"outros",label:"Outros"}];
  return (
    <div>
      <SecTitle icon="🧠" title="Prontuário NAP – Núcleo de Apoio Psicopedagógico e Psicológico" cor="#be185d" />
      <Field label="2. Forma de chegada"><Radio options={[{value:"espontanea",label:"Espontânea"},{value:"enc_prof_coord",label:"Prof./Coord."},{value:"enc_nae",label:"NAE"},{value:"enc_nai",label:"NAI"}]} value={f.chegada} onChange={v=>setF(p=>({...p,chegada:v}))} /></Field>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
        <Field label="Quem encaminhou"><input style={inp} value={f.quemEncaminhou} onChange={s("quemEncaminhou")} /></Field>
        <Field label="Motivo declarado"><input style={inp} value={f.motivoDeclarado} onChange={s("motivoDeclarado")} /></Field>
      </div>
      <Field label="3. Relato do estudante"><textarea style={ta} value={f.relato} onChange={s("relato")} /></Field>
      <Field label="Há quanto tempo percebe essa dificuldade?"><input style={inp} value={f.tempoDificuldade} onChange={s("tempoDificuldade")} /></Field>
      <Field label="Categorias da queixa"><CheckGroup options={catOpts} values={f.categorias} onChange={v=>setF(p=>({...p,categorias:v}))} /></Field>
      <Field label="Especifique"><textarea style={{...ta,minHeight:50}} value={f.especificacao} onChange={s("especificacao")} /></Field>
      <SecTitle icon="📚" title="4. Histórico Educacional e Acadêmico" cor="#be185d" />
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
        <Field label="Escolas anteriores (ensino médio)"><input style={inp} value={f.escolasAnteriores} onChange={s("escolasAnteriores")} /></Field>
        <Field label="Ano de ingresso na faculdade"><input style={inp} value={f.anoIngresso} onChange={s("anoIngresso")} /></Field>
      </div>
      <Field label="Reprovações ou trancamentos"><textarea style={{...ta,minHeight:50}} value={f.reprovacoesTrancamentos} onChange={s("reprovacoesTrancamentos")} /></Field>
      <Field label="Desempenho acadêmico atual"><input style={inp} value={f.desempenhoAtual} onChange={s("desempenhoAtual")} /></Field>
      <Field label="Disciplinas com maior dificuldade"><input style={inp} value={f.disciplinasDificuldade} onChange={s("disciplinasDificuldade")} /></Field>
      <Field label="Rotina de estudos"><input style={inp} value={f.rotina} onChange={s("rotina")} /></Field>
      <SecTitle icon="💊" title="5. Histórico Psicológico e de Saúde Mental" cor="#be185d" />
      <Field label="Acompanhamento psicológico"><Radio options={[{value:"ja_fez",label:"Já fez"},{value:"faz_atualmente",label:"Faz atualmente"},{value:"nao",label:"Nunca fez"}]} value={f.acompPsico} onChange={v=>setF(p=>({...p,acompPsico:v}))} /></Field>
      <Field label="Se sim, descreva"><textarea style={{...ta,minHeight:50}} value={f.descAcomp} onChange={s("descAcomp")} /></Field>
      <Field label="Diagnóstico / Medicação"><Radio options={[{value:"diagnostico",label:"Diagnóstico de transtorno"},{value:"medicacao",label:"Uso de medicação psiquiátrica"},{value:"nenhum",label:"Nenhum"}]} value={f.diagnostico} onChange={v=>setF(p=>({...p,diagnostico:v}))} /></Field>
      <Field label="Especifique diagnósticos e/ou medicações"><textarea style={{...ta,minHeight:50}} value={f.especDiagMed} onChange={s("especDiagMed")} /></Field>
      <Field label="Histórico de crises ou sofrimento intenso"><textarea style={ta} value={f.historicoSofrimento} onChange={s("historicoSofrimento")} /></Field>
      <SecTitle icon="🏘️" title="6. Contexto de Vida e Rede de Apoio" cor="#be185d" />
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
        <Field label="Com quem reside?"><input style={inp} value={f.comQuemReside} onChange={s("comQuemReside")} /></Field>
        <Field label="Situação de moradia"><input style={inp} value={f.situacaoMoradia} onChange={s("situacaoMoradia")} /></Field>
        <Field label="Trabalha?"><Radio options={[{value:"sim",label:"Sim"},{value:"nao",label:"Não"}]} value={f.trabalha} onChange={v=>setF(p=>({...p,trabalha:v}))} /></Field>
        <Field label="Carga horária de trabalho"><input style={inp} value={f.cargaHoraria} onChange={s("cargaHoraria")} /></Field>
      </div>
      <Field label="Relação com família / pessoas próximas"><input style={inp} value={f.relacaoFamiliar} onChange={s("relacaoFamiliar")} /></Field>
      <Field label="Rede de apoio emocional"><input style={inp} value={f.redApoio} onChange={s("redApoio")} /></Field>
      <Field label="Situações relevantes para o atendimento"><textarea style={{...ta,minHeight:50}} value={f.situacoesRelevantes} onChange={s("situacoesRelevantes")} /></Field>
      <SecTitle icon="🎯" title="7–9. Objetivos, Observações e Conduta" cor="#be185d" />
      <Field label="7. Expectativas do estudante"><textarea style={ta} value={f.objetivosExpectativas} onChange={s("objetivosExpectativas")} /></Field>
      <Field label="8. Observações do profissional na acolhida"><textarea style={ta} value={f.observacoesProfissional} onChange={s("observacoesProfissional")} /></Field>
      <Field label="9. Conduta adotada e próximos passos"><Radio options={[{value:"acomp_psico",label:"Acomp. psicológico"},{value:"acomp_psicopedagogico",label:"Acomp. psicopedagógico"},{value:"enc_externo",label:"Encam. externo"},{value:"enc_interno",label:"Encam. interno"}]} value={f.conduta} onChange={v=>setF(p=>({...p,conduta:v}))} /></Field>
      <Field label="Detalhe a conduta e próximos passos"><textarea style={ta} value={f.detalheCoduta} onChange={s("detalheCoduta")} /></Field>
      <div style={{ display:"flex", gap:10, justifyContent:"flex-end", marginTop:16, paddingTop:12, borderTop:"1px solid #e8ecf0" }}>
        <Btn outline cor="#6b7280" onClick={onCancel}>Cancelar</Btn>
        <Btn cor="#be185d" onClick={()=>onSave(f)}>💾 Salvar Prontuário NAP</Btn>
      </div>
    </div>
  );
}

// ─── PRONTUÁRIO NAE ───────────────────────────────────────────────────────────
function FormNAE({ initial, onSave, onCancel }) {
  const def = { chegada:"espontanea", quemEncaminhou:"", contexto:"", ira:"", faltas:"", anoIngresso:"", trancamentos:"", risco:"", disciplinasDificuldade:"", financiamento:"mensalidade", rendaFamiliar:"", numPessoas:"", responsavelFinanceiro:"", trabalha:"nao", vinculoEmprego:"", cargaHoraria:"", dificuldadesFinanceiras:"", barreiras:[], relato:"", demanda:[], comQuemReside:"", distancia:"", transporte:"", vulnerabilidade:"", conhecePoliticas:"", saude:"nao_acomp", obsSaude:"", objetivos:"", conduta:[], detalheCoduta:"", observacoesProfissional:"", ...initial };
  const [f, setF] = useState(def);
  const s = k => e => setF(p=>({...p,[k]:e.target.value}));
  return (
    <div>
      <SecTitle icon="🎓" title="Prontuário NAE – Núcleo de Atendimento ao Estudante" cor="#b45309" />
      <Field label="2. Forma de chegada"><Radio options={[{value:"espontanea",label:"Espontânea"},{value:"enc_coord",label:"Coordenação"},{value:"enc_nupss",label:"NUPSS"},{value:"enc_nap_nai",label:"NAP / NAI"}]} value={f.chegada} onChange={v=>setF(p=>({...p,chegada:v}))} /></Field>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
        <Field label="Quem encaminhou"><input style={inp} value={f.quemEncaminhou} onChange={s("quemEncaminhou")} /></Field>
        <Field label="Contexto"><input style={inp} value={f.contexto} onChange={s("contexto")} /></Field>
      </div>
      <SecTitle icon="📊" title="3. Situação Acadêmica" cor="#b45309" />
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:12 }}>
        <Field label="IRA / CRA atual"><input style={inp} value={f.ira} onChange={s("ira")} /></Field>
        <Field label="% de faltas (estimativa)"><input style={inp} value={f.faltas} onChange={s("faltas")} /></Field>
        <Field label="Ano de ingresso"><input style={inp} value={f.anoIngresso} onChange={s("anoIngresso")} /></Field>
      </div>
      <Field label="Trancamentos"><textarea style={{...ta,minHeight:50}} value={f.trancamentos} onChange={s("trancamentos")} /></Field>
      <Field label="Risco de jubilamento ou perda de vínculo?"><textarea style={{...ta,minHeight:50}} value={f.risco} onChange={s("risco")} /></Field>
      <Field label="Disciplinas com maior dificuldade"><input style={inp} value={f.disciplinasDificuldade} onChange={s("disciplinasDificuldade")} /></Field>
      <Field label="Forma de pagamento"><Radio options={[{value:"bolsista",label:"Bolsista"},{value:"fies_prouni",label:"FIES/ProUni"},{value:"mensalidade",label:"Mensalidade particular"},{value:"outros",label:"Outros"}]} value={f.financiamento} onChange={v=>setF(p=>({...p,financiamento:v}))} /></Field>
      <SecTitle icon="💰" title="4. Situação Socioeconômica" cor="#b45309" />
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
        <Field label="Renda familiar mensal (faixa)"><input style={inp} value={f.rendaFamiliar} onChange={s("rendaFamiliar")} /></Field>
        <Field label="Nº de pessoas no núcleo familiar"><input style={inp} value={f.numPessoas} onChange={s("numPessoas")} /></Field>
        <Field label="Responsável financeiro pela mensalidade"><input style={inp} value={f.responsavelFinanceiro} onChange={s("responsavelFinanceiro")} /></Field>
        <Field label="Trabalha?"><Radio options={[{value:"sim",label:"Sim"},{value:"nao",label:"Não"}]} value={f.trabalha} onChange={v=>setF(p=>({...p,trabalha:v}))} /></Field>
        <Field label="Vínculo de trabalho"><input style={inp} value={f.vinculoEmprego} onChange={s("vinculoEmprego")} /></Field>
        <Field label="Carga horária semanal"><input style={inp} value={f.cargaHoraria} onChange={s("cargaHoraria")} /></Field>
      </div>
      <Field label="Dificuldades financeiras que impactam a permanência"><textarea style={{...ta,minHeight:50}} value={f.dificuldadesFinanceiras} onChange={s("dificuldadesFinanceiras")} /></Field>
      <Field label="Barreiras"><CheckGroup options={[{value:"transporte",label:"Transporte"},{value:"alimentacao",label:"Alimentação"},{value:"moradia",label:"Moradia"},{value:"material_didatico",label:"Material didático"}]} values={f.barreiras} onChange={v=>setF(p=>({...p,barreiras:v}))} /></Field>
      <SecTitle icon="📝" title="5. Demanda e Motivo do Atendimento" cor="#b45309" />
      <Field label="Relato do estudante"><textarea style={ta} value={f.relato} onChange={s("relato")} /></Field>
      <Field label="Demanda (marque todas que se aplicam)"><CheckGroup options={[{value:"apoio_financeiro",label:"Apoio financeiro/bolsa"},{value:"orientacao_academica",label:"Orientação acadêmica"},{value:"renegociacao",label:"Renegociação de dívida"},{value:"auxilio_emergencial",label:"Auxílio emergencial"},{value:"direitos",label:"Orientação sobre direitos"},{value:"mediacao",label:"Mediação coord./prof."},{value:"permanencia",label:"Apoio na permanência"},{value:"outros",label:"Outros"}]} values={f.demanda} onChange={v=>setF(p=>({...p,demanda:v}))} /></Field>
      <SecTitle icon="🏘️" title="6. Rede de Suporte e Contexto Familiar" cor="#b45309" />
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:12 }}>
        <Field label="Com quem reside?"><input style={inp} value={f.comQuemReside} onChange={s("comQuemReside")} /></Field>
        <Field label="Distância da faculdade"><input style={inp} value={f.distancia} onChange={s("distancia")} /></Field>
        <Field label="Meio de transporte"><input style={inp} value={f.transporte} onChange={s("transporte")} /></Field>
      </div>
      <Field label="Vulnerabilidade social/familiar"><input style={inp} value={f.vulnerabilidade} onChange={s("vulnerabilidade")} /></Field>
      <Field label="Conhece políticas de assistência estudantil?"><Radio options={[{value:"sim",label:"Sim"},{value:"nao",label:"Não"}]} value={f.conhecePoliticas} onChange={v=>setF(p=>({...p,conhecePoliticas:v}))} /></Field>
      <SecTitle icon="❤️" title="7. Saúde e Bem-estar (triagem básica)" cor="#b45309" />
      <Field label="Acompanhamento de saúde"><Radio options={[{value:"faz_acomp",label:"Faz acompanhamento"},{value:"nao_acomp",label:"Não faz"},{value:"em_tratamento",label:"Em tratamento"}]} value={f.saude} onChange={v=>setF(p=>({...p,saude:v}))} /></Field>
      <Field label="Observações de saúde relevantes"><textarea style={{...ta,minHeight:50}} value={f.obsSaude} onChange={s("obsSaude")} /></Field>
      <SecTitle icon="🎯" title="8–10. Objetivos, Conduta e Observações" cor="#b45309" />
      <Field label="8. Objetivos e expectativas"><textarea style={ta} value={f.objetivos} onChange={s("objetivos")} /></Field>
      <Field label="9. Conduta / Encaminhamentos"><CheckGroup options={[{value:"enc_nap",label:"NAP"},{value:"enc_nai",label:"NAI"},{value:"enc_nupss",label:"NUPSS"},{value:"enc_externo",label:"Externo"},{value:"orientacao_beneficios",label:"Orientação sobre benefícios"},{value:"mediacao",label:"Mediação institucional"},{value:"acomp_nae",label:"Acomp. pelo NAE"}]} values={f.conduta} onChange={v=>setF(p=>({...p,conduta:v}))} /></Field>
      <Field label="Detalhe a conduta e próximos passos"><textarea style={ta} value={f.detalheCoduta} onChange={s("detalheCoduta")} /></Field>
      <Field label="10. Observações do profissional"><textarea style={ta} value={f.observacoesProfissional} onChange={s("observacoesProfissional")} /></Field>
      <div style={{ display:"flex", gap:10, justifyContent:"flex-end", marginTop:16, paddingTop:12, borderTop:"1px solid #e8ecf0" }}>
        <Btn outline cor="#6b7280" onClick={onCancel}>Cancelar</Btn>
        <Btn cor="#b45309" onClick={()=>onSave(f)}>💾 Salvar Prontuário NAE</Btn>
      </div>
    </div>
  );
}

// ─── PRONTUÁRIO NAI ───────────────────────────────────────────────────────────
function FormNAI({ initial, onSave, onCancel }) {
  const def = { chegada:"espontanea", quemEncaminhou:"", contexto:"", condicoes:[], descCondicao:"", laudos:[], profEmissor:"", dataLaudo:"", crmCrp:"", obsDoc:"", barreiras:[], descBarreiras:"", tecnologias:[], descTecnologias:"", adaptacoesSolicitadas:[], solicitacaoDetalhe:"", escoEspecial:"", expInclusao:"", expEnsioSuperior:"", comQuemReside:"", famConhece:"", suporteFamiliar:"", fatoresSeocioecon:"", objetivos:"", conduta:[], detalheCoduta:"", observacoesProfissional:"", ...initial };
  const [f, setF] = useState(def);
  const s = k => e => setF(p=>({...p,[k]:e.target.value}));
  return (
    <div>
      <SecTitle icon="♿" title="Prontuário NAI – Núcleo de Acessibilidade e Inclusão" cor="#6B3FA0" />
      <Field label="2. Forma de chegada"><Radio options={[{value:"espontanea",label:"Espontânea"},{value:"enc_coord",label:"Coordenação"},{value:"enc_nupss_nae",label:"NUPSS/NAE"},{value:"enc_externo",label:"Externo (laudos/serviços)"}]} value={f.chegada} onChange={v=>setF(p=>({...p,chegada:v}))} /></Field>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
        <Field label="Quem encaminhou"><input style={inp} value={f.quemEncaminhou} onChange={s("quemEncaminhou")} /></Field>
        <Field label="Contexto"><input style={inp} value={f.contexto} onChange={s("contexto")} /></Field>
      </div>
      <SecTitle icon="🔬" title="3. Condição de Saúde / Deficiência / Necessidade Específica" cor="#6B3FA0" />
      <Field label="Condições (marque todas que se aplicam)"><CheckGroup options={[{value:"def_fisica",label:"Deficiência física"},{value:"def_visual",label:"Def. visual"},{value:"def_auditiva",label:"Def. auditiva"},{value:"def_intelectual",label:"Def. intelectual"},{value:"tea",label:"TEA"},{value:"tdah",label:"TDAH"},{value:"transt_aprendizagem",label:"Transtorno de aprendizagem"},{value:"altas_hab",label:"Altas habilidades"},{value:"transt_mental",label:"Transtorno mental"},{value:"doenca_cronica",label:"Doença crônica"},{value:"mobilidade_reduzida",label:"Mobilidade reduzida (temp.)"},{value:"outra",label:"Outra"}]} values={f.condicoes} onChange={v=>setF(p=>({...p,condicoes:v}))} /></Field>
      <Field label="Descreva a condição com detalhes (diagnóstico, CID, impactos)"><textarea style={ta} value={f.descCondicao} onChange={s("descCondicao")} /></Field>
      <SecTitle icon="📄" title="4. Documentação Apresentada" cor="#6B3FA0" />
      <Field label="Documentos"><CheckGroup options={[{value:"laudo_medico",label:"Laudo médico"},{value:"rel_psicologico",label:"Relatório psicológico"},{value:"laudo_multiprofissional",label:"Laudo multiprofissional"},{value:"nenhum",label:"Nenhum"}]} values={f.laudos} onChange={v=>setF(p=>({...p,laudos:v}))} /></Field>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:12 }}>
        <Field label="Profissional emissor"><input style={inp} value={f.profEmissor} onChange={s("profEmissor")} /></Field>
        <Field label="Data do laudo"><input style={inp} type="date" value={f.dataLaudo} onChange={s("dataLaudo")} /></Field>
        <Field label="CRM / CRP do emissor"><input style={inp} value={f.crmCrp} onChange={s("crmCrp")} /></Field>
      </div>
      <Field label="Observações sobre a documentação"><textarea style={{...ta,minHeight:50}} value={f.obsDoc} onChange={s("obsDoc")} /></Field>
      <SecTitle icon="🚧" title="5. Barreiras no Ambiente Acadêmico" cor="#6B3FA0" />
      <Field label="Barreiras identificadas"><CheckGroup options={[{value:"arquitetonicas",label:"Arquitetônicas/físicas"},{value:"comunicacao",label:"Comunicação"},{value:"atitudinais",label:"Atitudinais (prof./colegas)"},{value:"tecnologicas",label:"Tecnológicas"},{value:"metodologicas",label:"Metodológicas"},{value:"avaliativas",label:"Processos avaliativos"},{value:"materiais",label:"Acesso a materiais adaptados"},{value:"outras",label:"Outras"}]} values={f.barreiras} onChange={v=>setF(p=>({...p,barreiras:v}))} /></Field>
      <Field label="Descreva as barreiras com mais detalhes"><textarea style={ta} value={f.descBarreiras} onChange={s("descBarreiras")} /></Field>
      <SecTitle icon="🛠️" title="6. Recursos / Tecnologias Assistivas" cor="#6B3FA0" />
      <Field label="Recursos já utilizados"><CheckGroup options={[{value:"nenhum",label:"Nenhum"},{value:"leitor_tela",label:"Leitor de tela"},{value:"libras",label:"LIBRAS / Intérprete"},{value:"cadeira_rodas",label:"Cadeira de rodas"},{value:"braille",label:"Prova em Braille"},{value:"tempo_estendido",label:"Tempo estendido"},{value:"material_ampliado",label:"Material ampliado"},{value:"outros",label:"Outros"}]} values={f.tecnologias} onChange={v=>setF(p=>({...p,tecnologias:v}))} /></Field>
      <Field label="Especifique recursos e efetividade"><textarea style={{...ta,minHeight:50}} value={f.descTecnologias} onChange={s("descTecnologias")} /></Field>
      <SecTitle icon="📋" title="7. Necessidades e Adaptações Solicitadas" cor="#6B3FA0" />
      <Field label="O que solicita"><CheckGroup options={[{value:"adapt_curricular",label:"Adaptação curricular"},{value:"adapt_avaliacao",label:"Adaptação de avaliação"},{value:"tec_assistiva",label:"Tecnologia assistiva"},{value:"adapt_espaco",label:"Adaptação de espaço"},{value:"interprete_libras",label:"Intérprete LIBRAS"},{value:"tutor",label:"Apoio de tutor"},{value:"material_acessivel",label:"Material acessível"},{value:"outros",label:"Outros"}]} values={f.adaptacoesSolicitadas} onChange={v=>setF(p=>({...p,adaptacoesSolicitadas:v}))} /></Field>
      <Field label="Detalhe o que é necessário para participar em igualdade de condições"><textarea style={ta} value={f.solicitacaoDetalhe} onChange={s("solicitacaoDetalhe")} /></Field>
      <SecTitle icon="🏫" title="8–9. Histórico Escolar e Contexto Sociofamiliar" cor="#6B3FA0" />
      <Field label="Frequentou escola especial ou regular com AEE?"><input style={inp} value={f.escoEspecial} onChange={s("escoEspecial")} /></Field>
      <Field label="Experiência de inclusão no ensino médio / outras instituições"><textarea style={{...ta,minHeight:50}} value={f.expInclusao} onChange={s("expInclusao")} /></Field>
      <Field label="Experiência anterior em IES (ensino superior)"><input style={inp} value={f.expEnsioSuperior} onChange={s("expEnsioSuperior")} /></Field>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
        <Field label="Com quem reside?"><input style={inp} value={f.comQuemReside} onChange={s("comQuemReside")} /></Field>
        <Field label="Família tem conhecimento da condição?"><Radio options={[{value:"sim",label:"Sim"},{value:"nao",label:"Não"}]} value={f.famConhece} onChange={v=>setF(p=>({...p,famConhece:v}))} /></Field>
      </div>
      <Field label="Suporte familiar para necessidades específicas"><input style={inp} value={f.suporteFamiliar} onChange={s("suporteFamiliar")} /></Field>
      <Field label="Fatores socioeconômicos que agravam barreiras de acessibilidade"><textarea style={{...ta,minHeight:50}} value={f.fatoresSeocioecon} onChange={s("fatoresSeocioecon")} /></Field>
      <SecTitle icon="🎯" title="10–12. Objetivos, Conduta e Observações" cor="#6B3FA0" />
      <Field label="10. Objetivos do estudante e expectativas com o NAI"><textarea style={ta} value={f.objetivos} onChange={s("objetivos")} /></Field>
      <Field label="11. Conduta / Encaminhamentos"><CheckGroup options={[{value:"paee",label:"PAEE"},{value:"comunicado_coord",label:"Comunicado à Coordenação"},{value:"enc_nap",label:"NAP"},{value:"enc_nae",label:"NAE"},{value:"adapt_avaliacao",label:"Solicit. adaptação de avaliação"},{value:"recurso_assistivo",label:"Solicit. recurso assistivo"},{value:"enc_externo",label:"Externo (saúde/reabilitação)"}]} values={f.conduta} onChange={v=>setF(p=>({...p,conduta:v}))} /></Field>
      <Field label="Detalhe a conduta e próximos passos"><textarea style={ta} value={f.detalheCoduta} onChange={s("detalheCoduta")} /></Field>
      <Field label="12. Observações do profissional"><textarea style={ta} value={f.observacoesProfissional} onChange={s("observacoesProfissional")} /></Field>
      <div style={{ display:"flex", gap:10, justifyContent:"flex-end", marginTop:16, paddingTop:12, borderTop:"1px solid #e8ecf0" }}>
        <Btn outline cor="#6b7280" onClick={onCancel}>Cancelar</Btn>
        <Btn cor="#6B3FA0" onClick={()=>onSave(f)}>💾 Salvar Prontuário NAI</Btn>
      </div>
    </div>
  );
}

// ─── PRONTUÁRIO NUPSS ─────────────────────────────────────────────────────────
function FormNUPSS({ initial, onSave, onCancel }) {
  const def = { chegada:"espontanea", quemEncaminhou:"", motivoEncaminhamento:"", situacaoPrevidenciaria:"", beneficiosSociais:"", rendaFamiliar:"", numPessoas:"", moradia:"propria", situacaoMoradia:"", trabalha:"nao", vinculoEmprego:"", cargaHoraria:"", dificuldadesFinanceiras:"", redesSuporte:"", violenciaSituacaoRisco:"nao", observacoesSociais:"", condutaEncaminhamento:"", observacoesProfissional:"", ...initial };
  const [f, setF] = useState(def);
  const s = k => e => setF(p=>({...p,[k]:e.target.value}));
  return (
    <div>
      <SecTitle icon="🏠" title="Prontuário NUPSS – Núcleo de Práticas do Serviço Social" cor="#2A7F6F" />
      <Field label="2. Forma de chegada"><Radio options={[{value:"espontanea",label:"Espontânea"},{value:"enc_coord",label:"Encaminhamento da Coordenação"},{value:"enc_nap",label:"NAP"},{value:"enc_nae",label:"NAE"},{value:"enc_nai",label:"NAI"}]} value={f.chegada} onChange={v=>setF(p=>({...p,chegada:v}))} /></Field>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
        <Field label="Quem encaminhou"><input style={inp} value={f.quemEncaminhou} onChange={s("quemEncaminhou")} /></Field>
        <Field label="Motivo do encaminhamento"><input style={inp} value={f.motivoEncaminhamento} onChange={s("motivoEncaminhamento")} /></Field>
      </div>
      <SecTitle icon="💼" title="3. Situação Socioeconômica" cor="#2A7F6F" />
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
        <Field label="Renda familiar mensal (faixa)"><input style={inp} value={f.rendaFamiliar} onChange={s("rendaFamiliar")} /></Field>
        <Field label="Nº de pessoas no núcleo familiar"><input style={inp} value={f.numPessoas} onChange={s("numPessoas")} /></Field>
      </div>
      <Field label="Situação de moradia"><Radio options={[{value:"propria",label:"Própria"},{value:"alugada",label:"Alugada"},{value:"cedida",label:"Cedida"},{value:"outra",label:"Outra"}]} value={f.moradia} onChange={v=>setF(p=>({...p,moradia:v}))} /></Field>
      <Field label="Detalhes sobre a moradia"><input style={inp} value={f.situacaoMoradia} onChange={s("situacaoMoradia")} /></Field>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
        <Field label="Trabalha?"><Radio options={[{value:"sim",label:"Sim"},{value:"nao",label:"Não"}]} value={f.trabalha} onChange={v=>setF(p=>({...p,trabalha:v}))} /></Field>
        <Field label="Vínculo de emprego"><input style={inp} value={f.vinculoEmprego} onChange={s("vinculoEmprego")} /></Field>
        <Field label="Carga horária semanal"><input style={inp} value={f.cargaHoraria} onChange={s("cargaHoraria")} /></Field>
      </div>
      <Field label="Benefícios sociais que recebe"><input style={inp} value={f.beneficiosSociais} onChange={s("beneficiosSociais")} placeholder="Ex: BPC, Bolsa Família, LOAS..." /></Field>
      <Field label="Situação previdenciária"><input style={inp} value={f.situacaoPrevidenciaria} onChange={s("situacaoPrevidenciaria")} /></Field>
      <Field label="Dificuldades financeiras que impactam os estudos"><textarea style={ta} value={f.dificuldadesFinanceiras} onChange={s("dificuldadesFinanceiras")} /></Field>
      <SecTitle icon="🤝" title="4. Rede de Suporte e Situação de Risco" cor="#2A7F6F" />
      <Field label="Rede de suporte familiar e social"><textarea style={{...ta,minHeight:50}} value={f.redesSuporte} onChange={s("redesSuporte")} /></Field>
      <Field label="Situação de violência ou risco identificada?"><Radio options={[{value:"sim",label:"Sim"},{value:"nao",label:"Não"},{value:"suspeita",label:"Suspeita"}]} value={f.violenciaSituacaoRisco} onChange={v=>setF(p=>({...p,violenciaSituacaoRisco:v}))} /></Field>
      <Field label="Observações sociais relevantes"><textarea style={ta} value={f.observacoesSociais} onChange={s("observacoesSociais")} /></Field>
      <SecTitle icon="📤" title="5. Conduta e Observações do Profissional" cor="#2A7F6F" />
      <Field label="Conduta e encaminhamentos adotados"><textarea style={ta} value={f.condutaEncaminhamento} onChange={s("condutaEncaminhamento")} /></Field>
      <Field label="Observações do profissional na acolhida"><textarea style={ta} value={f.observacoesProfissional} onChange={s("observacoesProfissional")} /></Field>
      <div style={{ display:"flex", gap:10, justifyContent:"flex-end", marginTop:16, paddingTop:12, borderTop:"1px solid #e8ecf0" }}>
        <Btn outline cor="#6b7280" onClick={onCancel}>Cancelar</Btn>
        <Btn cor="#2A7F6F" onClick={()=>onSave(f)}>💾 Salvar Prontuário NUPSS</Btn>
      </div>
    </div>
  );
}

// ─── PRONTUÁRIO FISIO ─────────────────────────────────────────────────────────
function FormFisio({ initial, onSave, onCancel }) {
  const def = { queixa:"", historico:"", comorbidades:"", medicamentos:"", alergias:"", eva:5, mobilidade:"", forca:"", diagnostico:"", objetivo:"", frequencia:"", duracao:"", tecnicas:"", observacoesProfissional:"", conduta:"", ...initial };
  const [f, setF] = useState(def);
  const s = k => e => setF(p=>({...p,[k]:e.target.value}));
  return (
    <div>
      <SecTitle icon="🦴" title="Prontuário Fisioterapia" cor="#1B5E8A" />
      <Field label="Queixa principal"><input style={inp} value={f.queixa} onChange={s("queixa")} /></Field>
      <Field label="Histórico clínico"><textarea style={ta} value={f.historico} onChange={s("historico")} /></Field>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
        <Field label="Comorbidades"><input style={inp} value={f.comorbidades} onChange={s("comorbidades")} /></Field>
        <Field label="Medicamentos em uso"><input style={inp} value={f.medicamentos} onChange={s("medicamentos")} /></Field>
        <Field label="Alergias"><input style={inp} value={f.alergias} onChange={s("alergias")} /></Field>
      </div>
      <Field label={`Escala de Dor – EVA: ${f.eva}/10`}>
        <input type="range" min={0} max={10} value={f.eva} onChange={e=>setF(p=>({...p,eva:Number(e.target.value)}))} style={{ width:"100%" }} />
        <div style={{ display:"flex", justifyContent:"space-between", fontSize:10, color:"#9ca3af" }}><span>0 – Sem dor</span><span>10 – Dor máxima</span></div>
      </Field>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
        <Field label="Mobilidade"><input style={inp} value={f.mobilidade} onChange={s("mobilidade")} /></Field>
        <Field label="Força muscular"><input style={inp} value={f.forca} onChange={s("forca")} /></Field>
      </div>
      <Field label="Diagnóstico fisioterapêutico"><input style={inp} value={f.diagnostico} onChange={s("diagnostico")} /></Field>
      <SecTitle icon="🏃" title="Plano de Tratamento" cor="#1B5E8A" />
      <Field label="Objetivo"><input style={inp} value={f.objetivo} onChange={s("objetivo")} /></Field>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
        <Field label="Frequência"><input style={inp} value={f.frequencia} onChange={s("frequencia")} /></Field>
        <Field label="Duração prevista"><input style={inp} value={f.duracao} onChange={s("duracao")} /></Field>
      </div>
      <Field label="Técnicas previstas (separe por vírgula)"><input style={inp} value={f.tecnicas} onChange={s("tecnicas")} /></Field>
      <Field label="Conduta"><textarea style={ta} value={f.conduta} onChange={s("conduta")} /></Field>
      <Field label="Observações do profissional"><textarea style={ta} value={f.observacoesProfissional} onChange={s("observacoesProfissional")} /></Field>
      <div style={{ display:"flex", gap:10, justifyContent:"flex-end", marginTop:16, paddingTop:12, borderTop:"1px solid #e8ecf0" }}>
        <Btn outline cor="#6b7280" onClick={onCancel}>Cancelar</Btn>
        <Btn cor="#1B5E8A" onClick={()=>onSave(f)}>💾 Salvar Prontuário Fisioterapia</Btn>
      </div>
    </div>
  );
}

// ─── PRONTUÁRIO ODONTO ────────────────────────────────────────────────────────
function FormOdonto({ initial, onSave, onCancel }) {
  const def = { queixaPrincipal:"", historicoDental:"", historicoMedico:"", medicamentos:"", alergias:"", habitos:"", condicaoGengival:"", condicaoOclusao:"", carie:"", necessidades:"", planoTratamento:"", higiene:"", observacoesProfissional:"", conduta:"", ...initial };
  const [f, setF] = useState(def);
  const s = k => e => setF(p=>({...p,[k]:e.target.value}));
  return (
    <div>
      <SecTitle icon="🦷" title="Prontuário Odontologia" cor="#0e7490" />
      <Field label="Queixa principal"><input style={inp} value={f.queixaPrincipal} onChange={s("queixaPrincipal")} /></Field>
      <Field label="Histórico odontológico anterior"><textarea style={ta} value={f.historicoDental} onChange={s("historicoDental")} /></Field>
      <Field label="Histórico médico geral relevante"><textarea style={{...ta,minHeight:50}} value={f.historicoMedico} onChange={s("historicoMedico")} /></Field>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
        <Field label="Medicamentos em uso"><input style={inp} value={f.medicamentos} onChange={s("medicamentos")} /></Field>
        <Field label="Alergias conhecidas"><input style={inp} value={f.alergias} onChange={s("alergias")} /></Field>
      </div>
      <Field label="Hábitos (bruxismo, tabagismo, álcool etc.)"><input style={inp} value={f.habitos} onChange={s("habitos")} /></Field>
      <SecTitle icon="🔍" title="Avaliação Clínica" cor="#0e7490" />
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
        <Field label="Condição gengival"><input style={inp} value={f.condicaoGengival} onChange={s("condicaoGengival")} /></Field>
        <Field label="Condição de oclusão"><input style={inp} value={f.condicaoOclusao} onChange={s("condicaoOclusao")} /></Field>
        <Field label="Cárie (índice / dentes afetados)"><input style={inp} value={f.carie} onChange={s("carie")} /></Field>
        <Field label="Higiene oral"><Radio options={[{value:"boa",label:"Boa"},{value:"regular",label:"Regular"},{value:"ruim",label:"Ruim"}]} value={f.higiene} onChange={v=>setF(p=>({...p,higiene:v}))} /></Field>
      </div>
      <Field label="Necessidades identificadas"><textarea style={ta} value={f.necessidades} onChange={s("necessidades")} /></Field>
      <Field label="Plano de tratamento"><textarea style={ta} value={f.planoTratamento} onChange={s("planoTratamento")} /></Field>
      <Field label="Conduta adotada"><textarea style={ta} value={f.conduta} onChange={s("conduta")} /></Field>
      <Field label="Observações do profissional"><textarea style={ta} value={f.observacoesProfissional} onChange={s("observacoesProfissional")} /></Field>
      <div style={{ display:"flex", gap:10, justifyContent:"flex-end", marginTop:16, paddingTop:12, borderTop:"1px solid #e8ecf0" }}>
        <Btn outline cor="#6b7280" onClick={onCancel}>Cancelar</Btn>
        <Btn cor="#0e7490" onClick={()=>onSave(f)}>💾 Salvar Prontuário Odontologia</Btn>
      </div>
    </div>
  );
}

// ─── LOGIN ────────────────────────────────────────────────────────────────────
function TelaLogin({ onLogin }) {
  const [u,setU]=useState(""); const [s,setS]=useState(""); const [err,setErr]=useState("");
  function login(){const usr=USUARIOS[u];if(usr&&usr.senha===s){onLogin({login:u,...usr});setErr("");}else setErr("Usuário ou senha inválidos.");}
  return (
    <div style={{ minHeight:"100vh", background:"linear-gradient(135deg,#0f2342 0%,#1B5E8A 60%,#2A7F6F 100%)", display:"flex", alignItems:"center", justifyContent:"center", padding:16, fontFamily:"'DM Sans','Segoe UI',sans-serif" }}>
      <style>{FONTS}</style>
      <div style={{ width:420, background:"rgba(255,255,255,0.97)", borderRadius:16, boxShadow:"0 24px 60px rgba(0,0,0,0.3)", overflow:"hidden" }}>
        <div style={{ background:"linear-gradient(135deg,#0f2342,#1B5E8A)", padding:"28px 32px 22px", textAlign:"center" }}>
          <div style={{ fontSize:34, marginBottom:6 }}>🏥</div>
          <div style={{ fontFamily:"'Crimson Pro',serif", fontSize:20, color:"#fff", fontWeight:700 }}>Prontuário Integrado – NUPSS</div>
          <div style={{ fontSize:11, color:"rgba(255,255,255,0.65)", marginTop:4 }}>Universidade de Vassouras – Campus Saquarema</div>
        </div>
        <div style={{ padding:"24px 28px 28px" }}>
          <Field label="Usuário"><input style={inp} value={u} onChange={e=>setU(e.target.value)} onKeyDown={e=>e.key==="Enter"&&login()} placeholder="login institucional" /></Field>
          <Field label="Senha"><input style={{...inp,marginBottom:4}} type="password" value={s} onChange={e=>setS(e.target.value)} onKeyDown={e=>e.key==="Enter"&&login()} placeholder="••••••••" /></Field>
          {err && <div style={{ color:"#dc2626", fontSize:12, marginBottom:8, textAlign:"center" }}>{err}</div>}
          <button onClick={login} style={{ width:"100%", background:"linear-gradient(135deg,#0f2342,#1B5E8A)", color:"#fff", border:"none", borderRadius:8, padding:"11px", fontSize:14, fontWeight:700, cursor:"pointer", marginTop:6 }}>Entrar no Sistema</button>
          <div style={{ marginTop:16, padding:"10px 12px", background:"#f8fafc", borderRadius:8, border:"1px solid #e8ecf0" }}>
            <div style={{ fontSize:10, color:"#8a96a3", fontWeight:700, textTransform:"uppercase", letterSpacing:1, marginBottom:6 }}>Acesso demo (senha: 1234)</div>
            {Object.entries(USUARIOS).map(([k,v])=>(
              <div key={k} onClick={()=>{setU(k);setS("1234");}} style={{ display:"flex", alignItems:"center", gap:8, padding:"3px 6px", borderRadius:5, cursor:"pointer", fontSize:12, color:"#374151", marginBottom:2 }}
                onMouseEnter={e=>e.currentTarget.style.background="#f0f4f8"} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                <span>{PERFIS[v.perfil].icon}</span><span style={{ fontWeight:600 }}>{k}</span><span style={{ color:"#9ca3af" }}>– {PERFIS[v.perfil].label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── EVOLUÇÃO ────────────────────────────────────────────────────────────────
function ModalEvolucao({ servico, cor, usuario, evolucoes, onSave, onClose }) {
  const [texto, setTexto] = useState("");
  function salvar() {
    if (!texto.trim()) return;
    onSave({ data: new Date().toISOString().slice(0,10), profissional: usuario.nome, registro: texto });
    onClose();
  }
  return (
    <Modal title={`Nova Evolução – ${servico}`} onClose={onClose}>
      <Field label="Profissional"><input style={inp} value={usuario.nome} disabled /></Field>
      <Field label="Data"><input style={inp} value={new Date().toISOString().slice(0,10)} disabled /></Field>
      <Field label="Registro *"><textarea style={ta} placeholder="Descreva o atendimento, técnicas, resposta do estudante..." value={texto} onChange={e=>setTexto(e.target.value)} /></Field>
      <div style={{ display:"flex", gap:10, justifyContent:"flex-end", marginTop:8 }}>
        <Btn outline cor="#6b7280" onClick={onClose}>Cancelar</Btn>
        <Btn cor={cor} onClick={salvar}>💾 Salvar</Btn>
      </div>
    </Modal>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [usuario, setUsuario] = useState(null);
  const [tela, setTela] = useState("lista");
  const [pidSel, setPidSel] = useState(null);
  const [abaSel, setAbaSel] = useState("identificacao");
  const [busca, setBusca] = useState("");
  const [pacientes, setPacientes] = useState(INICIAL_PACIENTES);
  const [toast, setToast] = useState(null);
  const [modal, setModal] = useState(null); // { tipo, ... }

  if (!usuario) return <TelaLogin onLogin={u=>{setUsuario(u);setTela("lista");}} />;

  const perfil = PERFIS[usuario.perfil];
  const pids = Object.keys(pacientes).filter(id => pacientes[id].meta.nome.toLowerCase().includes(busca.toLowerCase()) || id.includes(busca.toUpperCase()));
  const pac = pidSel ? pacientes[pidSel] : null;

  function showToast(msg) { setToast(msg); setTimeout(()=>setToast(null),2600); }

  function addAuditoria(pid, acao) {
    const entry = { data: agora(), usuario: usuario.login, acao, ip: "192.168.*.*" };
    setPacientes(prev=>({ ...prev, [pid]:{ ...prev[pid], auditoria:[...prev[pid].auditoria, entry] } }));
  }

  function salvarProntuario(pid, tipo, dados, label) {
    setPacientes(prev=>({ ...prev, [pid]:{ ...prev[pid], prontuarios:{ ...prev[pid].prontuarios, [tipo]:dados } } }));
    addAuditoria(pid, `Salvou prontuário ${label}`);
    showToast(`✅ Prontuário ${label} salvo com sucesso`);
    setModal(null);
  }

  function adicionarEvolucao(pid, tipo, entry) {
    setPacientes(prev=>({ ...prev, [pid]:{ ...prev[pid], evolucoes:{ ...prev[pid].evolucoes, [tipo]:[...prev[pid].evolucoes[tipo], entry] } } }));
    addAuditoria(pid, `Adicionou evolução – ${tipo.toUpperCase()}`);
    showToast("✅ Evolução registrada");
  }

  function adicionarEncaminhamento(pid, entry) {
    setPacientes(prev=>({ ...prev, [pid]:{ ...prev[pid], encaminhamentos:[...prev[pid].encaminhamentos, entry] } }));
    addAuditoria(pid, `Adicionou encaminhamento para ${entry.destino}`);
    showToast("✅ Encaminhamento salvo");
  }

  function cadastrarPaciente(dados) {
    const nid = "P"+String(Object.keys(pacientes).length+1).padStart(3,"0");
    const novo = mkPaciente(nid, dados.nome, dados.nascimento, dados.curso, dados.periodo, dados.matricula||uid(), dados.turno, dados.cpf, dados.rg, dados.emailInst, dados.emailPes, dados.telefone, dados.endereco);
    setPacientes(prev=>({...prev, [nid]:novo}));
    showToast(`✅ Estudante ${dados.nome} cadastrado(a) — ${nid}`);
    setModal(null);
  }

  function salvarAgendamento(pid, ag) {
    setPacientes(prev=>({ ...prev, [pid]:{ ...prev[pid], agendamentos:[...prev[pid].agendamentos, ag] } }));
    addAuditoria(pid, `Agendamento criado – ${ag.servico} em ${fmtData(ag.data)}`);
    showToast("✅ Agendamento salvo");
    setModal(null);
  }

  // ── ABAS por perfil ──────────────────────────────────────────────────────
  const ABAS_CONFIG = {
    recepcao:      ["identificacao","agendamentos","auditoria"],
    nupss:         ["identificacao","nupss","encaminhamentos","evolucoes","auditoria"],
    fisioterapeuta:["identificacao","fisio","evolucoes","auditoria"],
    odontologia:   ["identificacao","odonto","evolucoes","auditoria"],
    nai:           ["identificacao","nai","encaminhamentos","evolucoes","auditoria"],
    nae:           ["identificacao","nae","encaminhamentos","evolucoes","auditoria"],
    nap:           ["identificacao","nap","encaminhamentos","evolucoes","auditoria"],
    supervisor:    ["identificacao","nupss","fisio","odonto","nai","nae","nap","encaminhamentos","evolucoes","agendamentos","auditoria"],
  };

  const ABAS_LABEL = {
    identificacao: { icon:"👤", label:"Identificação" },
    nupss:         { icon:"🏠", label:"NUPSS" },
    fisio:         { icon:"🦴", label:"Fisioterapia" },
    odonto:        { icon:"🦷", label:"Odontologia" },
    nai:           { icon:"♿", label:"NAI" },
    nae:           { icon:"🎓", label:"NAE" },
    nap:           { icon:"🧠", label:"NAP" },
    encaminhamentos:{ icon:"📤", label:"Encaminhamentos" },
    evolucoes:     { icon:"📋", label:"Evoluções" },
    agendamentos:  { icon:"📅", label:"Agendamentos" },
    auditoria:     { icon:"🔍", label:"Auditoria" },
  };

  const abasVisiveis = (ABAS_CONFIG[usuario.perfil]||[]).map(id=>({ id, ...ABAS_LABEL[id] }));

  // ── MODAL CADASTRO ───────────────────────────────────────────────────────
  function ModalCadastro() {
    const [f, setF] = useState({ nome:"", nascimento:"", cpf:"", rg:"", emailInst:"", emailPes:"", telefone:"", endereco:"", curso:"", periodo:"", matricula:"", turno:"Noturno" });
    const s = k => e => setF(p=>({...p,[k]:e.target.value}));
    return (
      <Modal title="📋 Cadastrar Novo Estudante" onClose={()=>setModal(null)} wide>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
          <Field label="Nome Completo *"><input style={inp} value={f.nome} onChange={s("nome")} /></Field>
          <Field label="Data de Nascimento *"><input style={inp} type="date" value={f.nascimento} onChange={s("nascimento")} /></Field>
          <Field label="CPF"><input style={inp} value={f.cpf} onChange={s("cpf")} placeholder="000.000.000-00" /></Field>
          <Field label="RG"><input style={inp} value={f.rg} onChange={s("rg")} /></Field>
          <Field label="E-mail Institucional"><input style={inp} value={f.emailInst} onChange={s("emailInst")} placeholder="nome@aluno.vassouras.edu.br" /></Field>
          <Field label="E-mail Pessoal"><input style={inp} value={f.emailPes} onChange={s("emailPes")} /></Field>
          <Field label="Telefone / WhatsApp"><input style={inp} value={f.telefone} onChange={s("telefone")} /></Field>
          <Field label="Matrícula nº"><input style={inp} value={f.matricula} onChange={s("matricula")} /></Field>
          <Field label="Curso"><input style={inp} value={f.curso} onChange={s("curso")} /></Field>
          <Field label="Período / Semestre"><input style={inp} value={f.periodo} onChange={s("periodo")} /></Field>
          <Field label="Turno">
            <select style={inp} value={f.turno} onChange={s("turno")}>
              {["Manhã","Tarde","Noturno","Integral"].map(o=><option key={o}>{o}</option>)}
            </select>
          </Field>
        </div>
        <Field label="Endereço Completo"><input style={inp} value={f.endereco} onChange={s("endereco")} /></Field>
        <div style={{ display:"flex", gap:10, justifyContent:"flex-end", marginTop:12, paddingTop:10, borderTop:"1px solid #e8ecf0" }}>
          <Btn outline cor="#6b7280" onClick={()=>setModal(null)}>Cancelar</Btn>
          <Btn cor="#0f2342" disabled={!f.nome||!f.nascimento} onClick={()=>cadastrarPaciente(f)}>✅ Cadastrar Estudante</Btn>
        </div>
      </Modal>
    );
  }

  // ── MODAL AGENDAMENTO ────────────────────────────────────────────────────
  function ModalAgendamento({ pid }) {
    const [f, setF] = useState({ data:"", hora:"08:00", servico:"Fisioterapia", profissional:usuario.nome, status:"Confirmado", obs:"" });
    const s = k => e => setF(p=>({...p,[k]:e.target.value}));
    return (
      <Modal title="📅 Novo Agendamento" onClose={()=>setModal(null)}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
          <Field label="Data *"><input style={inp} type="date" value={f.data} onChange={s("data")} /></Field>
          <Field label="Horário"><input style={inp} type="time" value={f.hora} onChange={s("hora")} /></Field>
        </div>
        <Field label="Serviço">
          <select style={inp} value={f.servico} onChange={s("servico")}>
            {["Fisioterapia","Odontologia","NUPSS – Serviço Social","NAP – Psicologia","NAE – Atendimento ao Estudante","NAI – Acessibilidade","Avaliação","Reavaliação"].map(o=><option key={o}>{o}</option>)}
          </select>
        </Field>
        <Field label="Profissional"><input style={inp} value={f.profissional} onChange={s("profissional")} /></Field>
        <Field label="Status">
          <select style={inp} value={f.status} onChange={s("status")}>
            {["Confirmado","Pendente","Cancelado","Remarcado"].map(o=><option key={o}>{o}</option>)}
          </select>
        </Field>
        <Field label="Observações"><input style={inp} value={f.obs} onChange={s("obs")} /></Field>
        <div style={{ display:"flex", gap:10, justifyContent:"flex-end", marginTop:12, paddingTop:10, borderTop:"1px solid #e8ecf0" }}>
          <Btn outline cor="#6b7280" onClick={()=>setModal(null)}>Cancelar</Btn>
          <Btn cor="#b45309" disabled={!f.data} onClick={()=>salvarAgendamento(pid||pidSel, {...f, id: uid()})}>💾 Salvar</Btn>
        </div>
      </Modal>
    );
  }

  // ── MODAL ENCAMINHAMENTO ─────────────────────────────────────────────────
  function ModalEncaminhamento({ pid }) {
    const [f, setF] = useState({ destino:"NAP", motivo:"", status:"Pendente" });
    const s = k => e => setF(p=>({...p,[k]:e.target.value}));
    return (
      <Modal title="📤 Novo Encaminhamento" onClose={()=>setModal(null)}>
        <Field label="Destino">
          <select style={inp} value={f.destino} onChange={s("destino")}>
            {["NAP","NAE","NAI","NUPSS","Fisioterapia","Odontologia","Encaminhamento externo"].map(o=><option key={o}>{o}</option>)}
          </select>
        </Field>
        <Field label="Motivo *"><textarea style={ta} value={f.motivo} onChange={s("motivo")} /></Field>
        <Field label="Status"><Radio options={[{value:"Pendente",label:"Pendente"},{value:"Em andamento",label:"Em andamento"},{value:"Concluído",label:"Concluído"}]} value={f.status} onChange={v=>setF(p=>({...p,status:v}))} /></Field>
        <div style={{ display:"flex", gap:10, justifyContent:"flex-end", marginTop:12, paddingTop:10, borderTop:"1px solid #e8ecf0" }}>
          <Btn outline cor="#6b7280" onClick={()=>setModal(null)}>Cancelar</Btn>
          <Btn cor="#2A7F6F" disabled={!f.motivo} onClick={()=>{ adicionarEncaminhamento(pid||pidSel, { data: new Date().toISOString().slice(0,10), origem: PERFIS[usuario.perfil].label, ...f }); setModal(null); }}>💾 Salvar</Btn>
        </div>
      </Modal>
    );
  }

  // ── RENDER ABAS ──────────────────────────────────────────────────────────
  function renderAba() {
    if (!pac) return null;
    if (abaSel==="identificacao") {
      const m = pac.meta;
      return (
        <Card>
          <SecTitle icon="👤" title="Identificação do Estudante" cor="#0f2342" action={
            usuario.perfil==="recepcao"&&<Btn small onClick={()=>setModal({tipo:"editar_id",pid:pidSel})}>✏️ Editar</Btn>
          } />
          <InfoGrid items={[
            {label:"Nome Completo",value:m.nome},{label:"Data de Nascimento",value:fmtData(m.nascimento)+` (${calcIdade(m.nascimento)} anos)`},
            {label:"CPF",value:m.cpf},{label:"RG",value:m.rg},
            {label:"Curso",value:m.curso},{label:"Período",value:m.periodo},
            {label:"Matrícula",value:m.matricula},{label:"Turno",value:m.turno},
            {label:"E-mail Institucional",value:m.emailInst},{label:"E-mail Pessoal",value:m.emailPes},
            {label:"Telefone / WhatsApp",value:m.telefone},{label:"Endereço",value:m.endereco},
          ]} />
        </Card>
      );
    }

    const secPront = (tipo, label, FormComp, cor) => {
      const p = pac.prontuarios[tipo];
      return (
        <div>
          {p ? (
            <Card>
              <SecTitle icon={PERFIS[tipo]?.icon||"📄"} title={`Prontuário ${label}`} cor={cor}
                action={<Btn small cor={cor} onClick={()=>setModal({tipo:`pront_${tipo}`,pid:pidSel,editar:p})}>✏️ Editar Prontuário</Btn>} />
              <div style={{ fontSize:13, color:"#555", fontStyle:"italic", background:"#f8fafc", borderRadius:6, padding:"12px 16px" }}>
                Prontuário preenchido. Clique em "Editar" para revisar os dados.
              </div>
            </Card>
          ) : (
            <Card>
              <SecTitle icon={PERFIS[tipo]?.icon||"📄"} title={`Prontuário ${label}`} cor={cor} />
              <div style={{ textAlign:"center", padding:"20px 0", color:"#9ca3af", fontSize:13 }}>
                Prontuário ainda não preenchido.
                <div style={{ marginTop:12 }}><Btn cor={cor} onClick={()=>setModal({tipo:`pront_${tipo}`,pid:pidSel})}>+ Preencher Prontuário {label}</Btn></div>
              </div>
            </Card>
          )}
        </div>
      );
    };

    if (abaSel==="nupss") return secPront("nupss","NUPSS",FormNUPSS,"#2A7F6F");
    if (abaSel==="fisio") return secPront("fisio","Fisioterapia",FormFisio,"#1B5E8A");
    if (abaSel==="odonto") return secPront("odonto","Odontologia",FormOdonto,"#0e7490");
    if (abaSel==="nai") return secPront("nai","NAI",FormNAI,"#6B3FA0");
    if (abaSel==="nae") return secPront("nae","NAE",FormNAE,"#b45309");
    if (abaSel==="nap") return secPront("nap","NAP",FormNAP,"#be185d");

    if (abaSel==="evolucoes") {
      const mapa = { nupss:["#2A7F6F","NUPSS"], fisio:["#1B5E8A","Fisioterapia"], odonto:["#0e7490","Odontologia"], nai:["#6B3FA0","NAI"], nae:["#b45309","NAE"], nap:["#be185d","NAP"] };
      const permitidos = usuario.perfil==="supervisor" ? Object.keys(mapa) : [usuario.perfil==="fisioterapeuta"?"fisio":usuario.perfil==="odontologia"?"odonto":usuario.perfil];
      return (
        <div>
          {permitidos.filter(k=>mapa[k]).map(k=>{
            const [cor,label] = mapa[k];
            const evos = pac.evolucoes[k]||[];
            return (
              <Card key={k}>
                <SecTitle icon={ABAS_LABEL[k]?.icon||"📋"} title={`Evoluções – ${label}`} cor={cor}
                  action={<Btn small cor={cor} onClick={()=>setModal({tipo:"evolucao",servico:label,cor,chave:k,pid:pidSel})}>+ Nova Evolução</Btn>} />
                {evos.length===0 && <p style={{ color:"#9ca3af", fontSize:13 }}>Nenhuma evolução registrada.</p>}
                {evos.map((e,i)=>(
                  <div key={i} style={{ borderLeft:`2px solid ${cor}`, paddingLeft:14, marginBottom:12, position:"relative" }}>
                    <div style={{ position:"absolute", left:-5, top:4, width:8, height:8, borderRadius:"50%", background:cor }} />
                    <div style={{ fontSize:11, color:"#8a96a3", marginBottom:2 }}>{fmtData(e.data)} · {e.profissional}</div>
                    <div style={{ fontSize:13, color:"#2d3748", lineHeight:1.6 }}>{e.registro}</div>
                  </div>
                ))}
              </Card>
            );
          })}
        </div>
      );
    }

    if (abaSel==="encaminhamentos") {
      return (
        <Card>
          <SecTitle icon="📤" title="Encaminhamentos" cor="#2A7F6F"
            action={<Btn small cor="#2A7F6F" onClick={()=>setModal({tipo:"encaminhamento",pid:pidSel})}>+ Novo Encaminhamento</Btn>} />
          {pac.encaminhamentos.length===0 && <p style={{ color:"#9ca3af", fontSize:13 }}>Nenhum encaminhamento.</p>}
          {pac.encaminhamentos.map((e,i)=>(
            <div key={i} style={{ display:"flex", gap:14, alignItems:"center", padding:"10px 14px", background:"#f8fffe", borderRadius:6, marginBottom:8, border:"1px solid #c8e6e0" }}>
              <div style={{ flex:1 }}>
                <div style={{ fontWeight:600, fontSize:13 }}>{e.origem} → {e.destino}</div>
                <div style={{ fontSize:12, color:"#555", marginTop:2 }}>{e.motivo}</div>
              </div>
              <div style={{ textAlign:"right" }}>
                <div style={{ fontSize:11, color:"#8a96a3" }}>{fmtData(e.data)}</div>
                <Badge cor={e.status==="Concluído"?"verde":e.status==="Em andamento"?"azul":"laranja"}>{e.status}</Badge>
              </div>
            </div>
          ))}
        </Card>
      );
    }

    if (abaSel==="agendamentos") {
      return (
        <Card>
          <SecTitle icon="📅" title="Agendamentos" cor="#b45309"
            action={<Btn small cor="#b45309" onClick={()=>setModal({tipo:"agendamento",pid:pidSel})}>+ Novo Agendamento</Btn>} />
          {pac.agendamentos.length===0 && <p style={{ color:"#9ca3af", fontSize:13 }}>Nenhum agendamento.</p>}
          {pac.agendamentos.map((a,i)=>(
            <div key={i} style={{ display:"flex", gap:14, alignItems:"center", padding:"12px 16px", background:"#fffbeb", borderRadius:8, border:"1px solid #fcd34d", marginBottom:8 }}>
              <div style={{ textAlign:"center", minWidth:48, background:"#f59e0b", borderRadius:8, padding:"6px 8px", color:"#fff" }}>
                <div style={{ fontSize:10, fontWeight:700 }}>{new Date(a.data+"T00:00:00").toLocaleString("pt-BR",{month:"short"}).toUpperCase()}</div>
                <div style={{ fontSize:20, fontWeight:800, lineHeight:1 }}>{new Date(a.data+"T00:00:00").getDate()}</div>
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontWeight:700, fontSize:14, color:"#1a2940" }}>{a.servico}</div>
                <div style={{ fontSize:12, color:"#555" }}>{a.hora} · {a.profissional}</div>
                {a.obs && <div style={{ fontSize:12, color:"#8a96a3" }}>{a.obs}</div>}
              </div>
              <Badge cor={a.status==="Confirmado"?"verde":"laranja"}>{a.status}</Badge>
            </div>
          ))}
        </Card>
      );
    }

    if (abaSel==="auditoria") {
      return (
        <Card>
          <SecTitle icon="🔍" title="Log de Auditoria" cor="#374151" />
          {pac.auditoria.length===0 && <p style={{ color:"#9ca3af", fontSize:13 }}>Sem registros.</p>}
          <div style={{ overflowX:"auto" }}>
            <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12 }}>
              <thead><tr style={{ background:"#f8f8f8" }}>
                {["Data/Hora","Usuário","Ação","IP"].map(h=><th key={h} style={{ textAlign:"left", padding:"8px 12px", color:"#374151", fontWeight:700, fontSize:10, textTransform:"uppercase", letterSpacing:.8 }}>{h}</th>)}
              </tr></thead>
              <tbody>
                {[...pac.auditoria].reverse().map((l,i)=>(
                  <tr key={i} style={{ borderBottom:"1px solid #f0f0f0" }}>
                    <td style={{ padding:"8px 12px", color:"#555" }}>{l.data}</td>
                    <td style={{ padding:"8px 12px", fontWeight:600 }}>{l.usuario}</td>
                    <td style={{ padding:"8px 12px", color:"#555" }}>{l.acao}</td>
                    <td style={{ padding:"8px 12px", color:"#9ca3af", fontFamily:"monospace" }}>{l.ip}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      );
    }
  }

  // ── MODAL EDITAR IDENTIFICAÇÃO ────────────────────────────────────────
  function ModalEditarId({ pid }) {
    const [f, setF] = useState({ ...pacientes[pid].meta });
    const s = k => e => setF(p=>({...p,[k]:e.target.value}));
    function salvar() {
      setPacientes(prev=>({ ...prev, [pid]:{ ...prev[pid], meta:f } }));
      addAuditoria(pid, "Editou dados de identificação");
      showToast("✅ Dados atualizados");
      setModal(null);
    }
    return (
      <Modal title="✏️ Editar Identificação do Estudante" onClose={()=>setModal(null)} wide>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
          <Field label="Nome Completo"><input style={inp} value={f.nome} onChange={s("nome")} /></Field>
          <Field label="Data de Nascimento"><input style={inp} type="date" value={f.nascimento} onChange={s("nascimento")} /></Field>
          <Field label="CPF"><input style={inp} value={f.cpf} onChange={s("cpf")} /></Field>
          <Field label="RG"><input style={inp} value={f.rg} onChange={s("rg")} /></Field>
          <Field label="E-mail Institucional"><input style={inp} value={f.emailInst} onChange={s("emailInst")} /></Field>
          <Field label="E-mail Pessoal"><input style={inp} value={f.emailPes} onChange={s("emailPes")} /></Field>
          <Field label="Telefone / WhatsApp"><input style={inp} value={f.telefone} onChange={s("telefone")} /></Field>
          <Field label="Matrícula"><input style={inp} value={f.matricula} onChange={s("matricula")} /></Field>
          <Field label="Curso"><input style={inp} value={f.curso} onChange={s("curso")} /></Field>
          <Field label="Período"><input style={inp} value={f.periodo} onChange={s("periodo")} /></Field>
          <Field label="Turno">
            <select style={inp} value={f.turno} onChange={s("turno")}>
              {["Manhã","Tarde","Noturno","Integral"].map(o=><option key={o}>{o}</option>)}
            </select>
          </Field>
          <Field label="Status">
            <select style={inp} value={f.status} onChange={s("status")}>
              {["Ativo","Em espera","Inativo","Concluído"].map(o=><option key={o}>{o}</option>)}
            </select>
          </Field>
        </div>
        <Field label="Endereço Completo"><input style={inp} value={f.endereco} onChange={s("endereco")} /></Field>
        <div style={{ display:"flex", gap:10, justifyContent:"flex-end", marginTop:12, paddingTop:10, borderTop:"1px solid #e8ecf0" }}>
          <Btn outline cor="#6b7280" onClick={()=>setModal(null)}>Cancelar</Btn>
          <Btn cor="#0f2342" onClick={salvar}>💾 Salvar Alterações</Btn>
        </div>
      </Modal>
    );
  }

  return (
    <div style={{ minHeight:"100vh", background:"#f4f6f9", fontFamily:"'DM Sans','Segoe UI',sans-serif" }}>
      <style>{FONTS}</style>

      {/* TOAST */}
      {toast && <div style={{ position:"fixed", bottom:24, right:24, background:"#065f46", color:"#fff", borderRadius:10, padding:"12px 20px", fontSize:13, fontWeight:600, zIndex:2000, boxShadow:"0 8px 24px rgba(0,0,0,0.2)" }}>{toast}</div>}

      {/* MODAIS */}
      {modal?.tipo==="cadastro" && <ModalCadastro />}
      {modal?.tipo==="agendamento" && <ModalAgendamento pid={modal.pid} />}
      {modal?.tipo==="encaminhamento" && <ModalEncaminhamento pid={modal.pid} />}
      {modal?.tipo==="editar_id" && <ModalEditarId pid={modal.pid} />}
      {modal?.tipo==="evolucao" && <ModalEvolucao servico={modal.servico} cor={modal.cor} usuario={usuario} evolucoes={pac?.evolucoes[modal.chave]||[]} onSave={e=>adicionarEvolucao(modal.pid,modal.chave,e)} onClose={()=>setModal(null)} />}
      {modal?.tipo==="pront_nupss" && <Modal title="📋 Prontuário NUPSS" onClose={()=>setModal(null)} wide><FormNUPSS initial={modal.editar} onSave={d=>salvarProntuario(modal.pid,"nupss","NUPSS",d)} onCancel={()=>setModal(null)} /></Modal>}
      {modal?.tipo==="pront_fisio" && <Modal title="📋 Prontuário Fisioterapia" onClose={()=>setModal(null)} wide><FormFisio initial={modal.editar} onSave={d=>salvarProntuario(modal.pid,"fisio","Fisioterapia",d)} onCancel={()=>setModal(null)} /></Modal>}
      {modal?.tipo==="pront_odonto" && <Modal title="📋 Prontuário Odontologia" onClose={()=>setModal(null)} wide><FormOdonto initial={modal.editar} onSave={d=>salvarProntuario(modal.pid,"odonto","Odontologia",d)} onCancel={()=>setModal(null)} /></Modal>}
      {modal?.tipo==="pront_nai" && <Modal title="📋 Prontuário NAI" onClose={()=>setModal(null)} wide><FormNAI initial={modal.editar} onSave={d=>salvarProntuario(modal.pid,"nai","NAI",d)} onCancel={()=>setModal(null)} /></Modal>}
      {modal?.tipo==="pront_nae" && <Modal title="📋 Prontuário NAE" onClose={()=>setModal(null)} wide><FormNAE initial={modal.editar} onSave={d=>salvarProntuario(modal.pid,"nae","NAE",d)} onCancel={()=>setModal(null)} /></Modal>}
      {modal?.tipo==="pront_nap" && <Modal title="📋 Prontuário NAP" onClose={()=>setModal(null)} wide><FormNAP initial={modal.editar} onSave={d=>salvarProntuario(modal.pid,"nap","NAP",d)} usuario={usuario} onCancel={()=>setModal(null)} /></Modal>}

      {/* TOPBAR */}
      <div style={{ background:"#0f2342", display:"flex", alignItems:"center", padding:"0 20px", height:54, gap:12, boxShadow:"0 2px 8px rgba(0,0,0,0.25)" }}>
        {tela==="prontuario" && <button onClick={()=>setTela("lista")} style={{ background:"rgba(255,255,255,0.1)", border:"none", color:"#fff", borderRadius:6, padding:"5px 12px", cursor:"pointer", fontSize:13 }}>← Voltar</button>}
        <div style={{ fontFamily:"'Crimson Pro',serif", color:"#fff", fontSize:17, fontWeight:700, flex:1 }}>🏥 NUPSS – Prontuário Integrado · Universidade de Vassouras</div>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <div style={{ width:30, height:30, borderRadius:"50%", background:perfil.cor, display:"flex", alignItems:"center", justifyContent:"center", fontSize:13 }}>{perfil.icon}</div>
          <div>
            <div style={{ color:"#fff", fontSize:12, fontWeight:600 }}>{usuario.nome}</div>
            <div style={{ color:"rgba(255,255,255,0.5)", fontSize:10 }}>{perfil.label}</div>
          </div>
          <button onClick={()=>setUsuario(null)} style={{ background:"rgba(255,255,255,0.1)", border:"none", color:"rgba(255,255,255,0.65)", borderRadius:6, padding:"4px 10px", cursor:"pointer", fontSize:12, marginLeft:6 }}>Sair</button>
        </div>
      </div>

      <div style={{ maxWidth:980, margin:"0 auto", padding:"22px 14px" }}>
        <div style={{ background:"#fffbeb", border:"1px solid #fcd34d", borderRadius:8, padding:"9px 16px", marginBottom:18, display:"flex", gap:8, alignItems:"center", fontSize:12, color:"#92400e" }}>
          <span>⚠️</span><strong>Confidencialidade:</strong><span>Informações protegidas por sigilo profissional e LGPD. Acesso monitorado e registrado.</span>
        </div>

        {/* LISTA */}
        {tela==="lista" && (
          <>
            <div style={{ display:"flex", gap:14, marginBottom:18, alignItems:"center", flexWrap:"wrap" }}>
              <div style={{ fontFamily:"'Crimson Pro',serif", fontSize:22, fontWeight:700, color:"#0f2342", flex:1 }}>Estudantes Cadastrados</div>
              <input value={busca} onChange={e=>setBusca(e.target.value)} placeholder="Buscar por nome ou prontuário..." style={{ padding:"8px 14px", border:"1.5px solid #e2e8f0", borderRadius:8, fontSize:13, width:240, fontFamily:"inherit", outline:"none" }} />
              {usuario.perfil==="recepcao" && <Btn cor="#0f2342" onClick={()=>setModal({tipo:"cadastro"})}>+ Cadastrar Estudante</Btn>}
            </div>
            {pids.length===0 && <div style={{ textAlign:"center", padding:"40px", color:"#9ca3af" }}>Nenhum estudante encontrado.</div>}
            <div style={{ display:"grid", gap:10 }}>
              {pids.map(id=>{ const p=pacientes[id].meta; return (
                <div key={id} onClick={()=>{ setPidSel(id); setAbaSel("identificacao"); setTela("prontuario"); addAuditoria(id,"Visualizou prontuário"); }}
                  style={{ background:"#fff", borderRadius:10, border:"1px solid #e8ecf0", padding:"14px 20px", cursor:"pointer", display:"flex", alignItems:"center", gap:14, boxShadow:"0 1px 3px rgba(0,0,0,0.05)", transition:"box-shadow .15s" }}
                  onMouseEnter={e=>e.currentTarget.style.boxShadow="0 4px 16px rgba(27,94,138,0.15)"} onMouseLeave={e=>e.currentTarget.style.boxShadow="0 1px 3px rgba(0,0,0,0.05)"}>
                  <div style={{ width:42, height:42, borderRadius:"50%", background:"linear-gradient(135deg,#0f2342,#1B5E8A)", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:700, fontSize:16, flexShrink:0 }}>{p.nome.charAt(0)}</div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontWeight:700, fontSize:14, color:"#0f2342" }}>{p.nome}</div>
                    <div style={{ fontSize:12, color:"#8a96a3", marginTop:1 }}>Prontuário {p.id} · {p.curso} · {p.periodo}º período · {p.turno}</div>
                  </div>
                  <Badge cor={p.status==="Ativo"?"verde":"laranja"}>{p.status}</Badge>
                </div>
              );})}
            </div>
          </>
        )}

        {/* PRONTUÁRIO */}
        {tela==="prontuario" && pac && (
          <>
            <Card style={{ marginBottom:14 }}>
              <div style={{ display:"flex", gap:14, alignItems:"center", flexWrap:"wrap" }}>
                <div style={{ width:50, height:50, borderRadius:"50%", background:"linear-gradient(135deg,#0f2342,#1B5E8A)", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:700, fontSize:20, flexShrink:0 }}>{pac.meta.nome.charAt(0)}</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontFamily:"'Crimson Pro',serif", fontSize:20, fontWeight:700, color:"#0f2342" }}>{pac.meta.nome}</div>
                  <div style={{ fontSize:12, color:"#8a96a3" }}>Prontuário {pac.id} · {pac.meta.curso} · {pac.meta.periodo}º período · Matrícula: {pac.meta.matricula}</div>
                </div>
                <Badge cor={pac.meta.status==="Ativo"?"verde":"laranja"}>{pac.meta.status}</Badge>
                {usuario.perfil==="recepcao" && <Btn small cor="#b45309" onClick={()=>setModal({tipo:"agendamento",pid:pidSel})}>📅 Novo Agendamento</Btn>}
              </div>
            </Card>

            <div style={{ display:"flex", gap:3, marginBottom:16, borderBottom:"2px solid #e8ecf0", overflowX:"auto", paddingBottom:0 }}>
              {abasVisiveis.map(a=>(
                <button key={a.id} onClick={()=>setAbaSel(a.id)}
                  style={{ background:abaSel===a.id?"#0f2342":"transparent", color:abaSel===a.id?"#fff":"#555", border:"none", borderRadius:"6px 6px 0 0", padding:"8px 14px", cursor:"pointer", fontSize:12, fontWeight:600, fontFamily:"inherit", whiteSpace:"nowrap", display:"flex", gap:5, alignItems:"center" }}>
                  {a.icon} {a.label}
                </button>
              ))}
            </div>

            {renderAba()}
          </>
        )}
      </div>
    </div>
  );
}