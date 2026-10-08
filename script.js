// ============================================================
// PETMATCH QUIZ — VERSÃO SIMPLES (estudo)
// O arquivo tem 3 partes:
//   1. DADOS      — os 6 pets e as 8 perguntas (com pontos de cada opção)
//   2. PONTUAÇÃO  — como o "match" é calculado
//   3. TELAS      — o que mostrar na página conforme o clique
// ============================================================

// ---------- 1. DADOS ----------
const PETS = {
  cachorro: {
    nome: "Cachorro", emoji: "🐶", cor: "#E05A36", fundo: "#FFF1EE",
    frase: "Companheiro, leal e cheio de energia",
    dicas: ["Passeios diários de 30 minutos", "Ração adequada à idade e ao porte", "Vacinas e vermifugação em dia"],
  },
  gato: {
    nome: "Gato", emoji: "🐱", cor: "#7C3AED", fundo: "#F5F3FF",
    frase: "Independente, afetuoso e adaptável",
    dicas: ["Caixa de areia limpa todo dia", "Arranhador para proteger o sofá", "Veterinário a cada 12 meses"],
  },
  ave: {
    nome: "Ave", emoji: "🦜", cor: "#D97706", fundo: "#FEF3C7",
    frase: "Alegre, musical e comunicativa",
    dicas: ["Gaiola ampla com brinquedos", "Ração própria e frutas liberadas", "Longe de correntes de ar"],
  },
  peixe: {
    nome: "Peixe", emoji: "🐠", cor: "#0284C7", fundo: "#E0F2FE",
    frase: "Relaxante, silencioso e hipnotizante",
    dicas: ["Prepare o aquário antes de receber o peixe", "Alimente 2x ao dia, sem exagerar", "Limpeza parcial semanal da água"],
  },
  roedor: {
    nome: "Roedor", emoji: "🐹", cor: "#D946EF", fundo: "#FDF4FF",
    frase: "Fofo, compacto e interativo",
    dicas: ["Gaiola com serragem e esconderijos", "Roda de exercício é essencial", "Manuseio calmo no fim da tarde"],
  },
  reptil: {
    nome: "Réptil", emoji: "🦎", cor: "#059669", fundo: "#ECFDF5",
    frase: "Exótico, tranquilo e sem pelos",
    dicas: ["Terrário com aquecimento e UVB", "Controle a umidade do ambiente", "Higiene das mãos após o manejo"],
  },
};

// Cada opção soma "pontos" para os pets que combinam com ela.
const PERGUNTAS = [
  {
    id: "tempo", titulo: "Quanto tempo livre você tem por dia para se dedicar ao pet?",
    opcoes: [
      { id: "t1", emoji: "⚡", rotulo: "Menos de 30 minutos", pontos: { peixe: 3, reptil: 3, roedor: 2, gato: 1, ave: 1, cachorro: 0 } },
      { id: "t2", emoji: "⏰", rotulo: "Entre 30 minutos e 1 hora", pontos: { gato: 3, roedor: 3, ave: 2, peixe: 2, reptil: 2, cachorro: 1 } },
      { id: "t3", emoji: "🎈", rotulo: "De 1 a 2 horas", pontos: { gato: 3, ave: 3, cachorro: 2, roedor: 2, peixe: 1, reptil: 1 } },
      { id: "t4", emoji: "❤️", rotulo: "Mais de 2 horas livres", pontos: { cachorro: 3, ave: 2, gato: 2, roedor: 1, peixe: 0, reptil: 0 } },
    ],
  },
  {
    id: "espaco", titulo: "Qual é o tamanho do seu espaço de convivência?",
    opcoes: [
      { id: "e1", emoji: "🏢", rotulo: "Quarto pequeno ou kitnet", pontos: { peixe: 3, roedor: 3, reptil: 2, gato: 2, ave: 1, cachorro: 0 } },
      { id: "e2", emoji: "🛋️", rotulo: "Apartamento padrão", pontos: { gato: 3, ave: 3, roedor: 2, peixe: 2, reptil: 2, cachorro: 1 } },
      { id: "e3", emoji: "🏡", rotulo: "Casa com quintal pequeno ou médio", pontos: { cachorro: 3, gato: 2, ave: 2, reptil: 2, roedor: 1, peixe: 1 } },
      { id: "e4", emoji: "🌳", rotulo: "Casa ampla com quintal grande", pontos: { cachorro: 3, gato: 2, ave: 2, reptil: 1, roedor: 1, peixe: 1 } },
    ],
  },
  {
    id: "criancas", titulo: "Há crianças ou idosos morando com você?",
    opcoes: [
      { id: "c1", emoji: "🧸", rotulo: "Sim, crianças pequenas", pontos: { cachorro: 3, gato: 2, peixe: 2, roedor: 1, ave: 1, reptil: 0 } },
      { id: "c2", emoji: "👵", rotulo: "Sim, crianças maiores ou idosos", pontos: { gato: 3, cachorro: 2, ave: 2, peixe: 2, roedor: 2, reptil: 1 } },
      { id: "c3", emoji: "☕", rotulo: "Apenas adultos", pontos: { cachorro: 2, gato: 2, ave: 2, peixe: 2, roedor: 2, reptil: 2 } },
    ],
  },
  {
    id: "orcamento", titulo: "Qual orçamento mensal você pretende investir?",
    opcoes: [
      { id: "o1", emoji: "🪙", rotulo: "Econômico (R$ 50 a R$ 120)", pontos: { peixe: 3, roedor: 3, reptil: 2, ave: 2, gato: 1, cachorro: 0 } },
      { id: "o2", emoji: "💳", rotulo: "Moderado (R$ 130 a R$ 300)", pontos: { gato: 3, ave: 3, roedor: 2, peixe: 2, reptil: 2, cachorro: 1 } },
      { id: "o3", emoji: "✨", rotulo: "Confortável (acima de R$ 350)", pontos: { cachorro: 3, gato: 2, reptil: 2, ave: 1, roedor: 1, peixe: 1 } },
    ],
  },
  {
    id: "interacao", titulo: "Que tipo de interação você mais valoriza?",
    opcoes: [
      { id: "i1", emoji: "🐾", rotulo: "Colo, lambidas e festinha ao chegar", pontos: { cachorro: 3, gato: 2, ave: 1, roedor: 0, peixe: 0, reptil: 0 } },
      { id: "i2", emoji: "😺", rotulo: "Companhia discreta e carinho nos termos dele", pontos: { gato: 3, ave: 2, roedor: 2, cachorro: 1, peixe: 1, reptil: 1 } },
      { id: "i3", emoji: "🌿", rotulo: "Observação relaxante e beleza visual", pontos: { peixe: 3, reptil: 3, ave: 2, roedor: 1, gato: 1, cachorro: 0 } },
      { id: "i4", emoji: "🎵", rotulo: "Curiosidade, cantos e inteligência", pontos: { ave: 3, roedor: 2, cachorro: 2, gato: 2, peixe: 0, reptil: 0 } },
    ],
  },
  {
    id: "alergias", titulo: "Alguém em casa tem alergia a pelos ou poeira?",
    opcoes: [
      { id: "a1", emoji: "🚫", rotulo: "Sim, alergia severa a pelos", pontos: { peixe: 3, reptil: 3, ave: 1, roedor: 0, gato: 0, cachorro: 0 } },
      { id: "a2", emoji: "🍃", rotulo: "Leve sensibilidade", pontos: { peixe: 2, reptil: 2, ave: 2, roedor: 2, gato: 1, cachorro: 1 } },
      { id: "a3", emoji: "✅", rotulo: "Não, ninguém tem alergia", pontos: { cachorro: 2, gato: 2, ave: 2, peixe: 2, roedor: 2, reptil: 2 } },
    ],
  },
  {
    id: "viagens", titulo: "Com que frequência você viaja ou se ausenta?",
    opcoes: [
      { id: "v1", emoji: "🏠", rotulo: "Raramente", pontos: { cachorro: 3, ave: 2, gato: 2, roedor: 2, peixe: 2, reptil: 2 } },
      { id: "v2", emoji: "🚗", rotulo: "1 a 2 vezes por mês", pontos: { gato: 3, peixe: 3, reptil: 3, roedor: 2, cachorro: 1, ave: 1 } },
      { id: "v3", emoji: "✈️", rotulo: "Com muita frequência", pontos: { peixe: 3, reptil: 3, gato: 2, roedor: 1, ave: 0, cachorro: 0 } },
    ],
  },
  {
    id: "experiencia", titulo: "É o seu primeiro pet como responsável principal?",
    opcoes: [
      { id: "x1", emoji: "🌱", rotulo: "Sim, de primeira viagem!", pontos: { gato: 3, peixe: 3, roedor: 3, cachorro: 1, ave: 1, reptil: 1 } },
      { id: "x2", emoji: "🐾", rotulo: "Já tive pets na infância", pontos: { gato: 3, cachorro: 2, ave: 2, roedor: 2, peixe: 2, reptil: 2 } },
      { id: "x3", emoji: "🏆", rotulo: "Sou experiente", pontos: { cachorro: 3, ave: 3, reptil: 3, gato: 2, roedor: 2, peixe: 2 } },
    ],
  },
];

// ---------- 2. PONTUAÇÃO ----------
function calcularScores(respostas) {
  const pontos = { cachorro: 0, gato: 0, ave: 0, peixe: 0, roedor: 0, reptil: 0 };

  // Soma os pontos de cada opção escolhida
  for (const pergunta of PERGUNTAS) {
    const opcao = pergunta.opcoes.find((o) => o.id === respostas[pergunta.id]);
    if (!opcao) continue;
    for (const [pet, valor] of Object.entries(opcao.pontos)) pontos[pet] += valor;
  }

  // Alergia severa a pelos: cachorro e gato ficam de fora
  if (respostas.alergias === "a1") {
    pontos.cachorro = 0;
    pontos.gato = 0;
  }

  // Porcentagem = pontos ÷ máximo possível (3 pontos × 8 perguntas) e ordena
  const maximo = PERGUNTAS.length * 3;
  return Object.keys(pontos)
    .map((pet) => ({ pet, pontos: pontos[pet], porcentagem: Math.round((pontos[pet] / maximo) * 100) }))
    .sort((a, b) => b.pontos - a.pontos);
}

// ---------- 3. TELAS ----------
const $ = (id) => document.getElementById(id);
let respostas = {};
let indice = 0;

function mostrarTela(tela) {
  for (const t of ["tela-inicio", "tela-perguntas", "tela-resultado"]) {
    $(t).classList.toggle("oculto", t !== tela);
  }
  window.scrollTo(0, 0);
}

function comecarQuiz() {
  respostas = {};
  indice = 0;
  mostrarPergunta();
}

function mostrarPergunta() {
  const p = PERGUNTAS[indice];
  $("indicador-pergunta").textContent = "Pergunta " + (indice + 1) + " de " + PERGUNTAS.length;
  $("barra").style.width = ((indice + 1) / PERGUNTAS.length) * 100 + "%";
  $("titulo-pergunta").textContent = p.titulo;
  $("botao-voltar").disabled = indice === 0;

  const container = $("opcoes");
  container.innerHTML = "";
  p.opcoes.forEach((opcao) => {
    const botao = document.createElement("button");
    botao.className = "opcao";
    botao.textContent = opcao.emoji + " " + opcao.rotulo;
    botao.onclick = () => escolherOpcao(opcao.id);
    container.appendChild(botao);
  });
  mostrarTela("tela-perguntas");
}

function escolherOpcao(idOpcao) {
  respostas[PERGUNTAS[indice].id] = idOpcao;
  if (indice < PERGUNTAS.length - 1) {
    indice++;
    mostrarPergunta();
  } else {
    mostrarResultado(calcularScores(respostas));
  }
}

function mostrarResultado(placar) {
  const vencedor = placar[0];
  const info = PETS[vencedor.pet];

  // Pódio: 1º lugar em destaque + 2º e 3º
  $("podio").innerHTML = `
    <div class="vencedor" style="background:${info.fundo}">
      <span class="emoji-grande">🎉 ${info.emoji}</span>
      <h2>${info.nome}</h2>
      <p>${info.frase}</p>
      <p class="selo">${vencedor.porcentagem}% de compatibilidade</p>
    </div>
    ${placar.slice(1, 3).map((s, i) => `<div class="colocado">${i === 0 ? "🥈 2º" : "🥉 3º"} — ${PETS[s.pet].emoji} ${PETS[s.pet].nome}: ${s.porcentagem}%</div>`).join("")}`;

  // Barras de afinidade com os 6 pets
  $("barras-afinidade").innerHTML = placar
    .map(
      (s) => `<div class="linha">
        <span class="nome">${PETS[s.pet].emoji} ${PETS[s.pet].nome}</span>
        <div class="trilha"><div class="preenchimento" style="width:${s.porcentagem}%;background:${PETS[s.pet].cor}"></div></div>
        <span class="valor">${s.porcentagem}%</span>
      </div>`
    )
    .join("");

  $("dicas").innerHTML = info.dicas.map((d) => `<li>✅ ${d}</li>`).join("");

  $("resumo-ia").textContent = "Gerando seu resumo personalizado...";
  pedirResumoIA(placar);
  salvarResultado(placar);
  mostrarTela("tela-resultado");
}

// ----- Falas com o servidor (opcional: só funcionam com o site no ar) -----

// Resumo escrito por IA, chegando em pedaços (streaming)
async function pedirResumoIA(placar) {
  // Converte as respostas em texto que a IA entende
  const legiveis = {};
  for (const p of PERGUNTAS) {
    const opcao = p.opcoes.find((o) => o.id === respostas[p.id]);
    if (opcao) legiveis[p.titulo] = opcao.rotulo;
  }
  try {
    const resposta = await fetch("/api/quiz/summary", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ top_pet: placar[0].pet, respostas: legiveis }),
    });
    if (!resposta.ok) throw new Error();
    const leitor = resposta.body.getReader();
    const decodificador = new TextDecoder();
    $("resumo-ia").textContent = "";
    while (true) {
      const { done, value } = await leitor.read();
      if (done) break;
      $("resumo-ia").textContent += decodificador.decode(value);
    }
  } catch {
    $("resumo-ia").textContent =
      "Resumo com IA disponível apenas no site no ar — mas o seu resultado é válido!";
  }
}

// Salva o resultado para as estatísticas globais
async function salvarResultado(placar) {
  try {
    await fetch("/api/quiz/results", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        top_pet: placar[0].pet,
        scores: Object.fromEntries(placar.map((s) => [s.pet, s.pontos])),
        respostas: Object.fromEntries(PERGUNTAS.map((p) => [p.id, respostas[p.id]])),
      }),
    });
  } catch {
    // Sem backend (arquivo aberto direto): tudo bem, o resultado continua na tela
  }
}

// Estatísticas da tela inicial
async function carregarEstatisticas() {
  try {
    const stats = await (await fetch("/api/quiz/stats")).json();
    const linhas = Object.entries(stats.counts)
      .sort((a, b) => b[1] - a[1])
      .map(([pet, qtd]) => {
        const pct = Math.round((qtd / stats.total) * 100);
        return `<div class="linha">
          <span class="nome">${PETS[pet].emoji} ${PETS[pet].nome}</span>
          <div class="trilha"><div class="preenchimento" style="width:${pct}%;background:${PETS[pet].cor}"></div></div>
          <span class="valor">${pct}%</span>
        </div>`;
      })
      .join("");
    $("estatisticas").innerHTML =
      `<p class="est-total"><strong>${stats.total}</strong> pessoas já descobriram seu pet ideal.</p>` + linhas;
  } catch {
    $("estatisticas").textContent = "As estatísticas aparecem quando o site é aberto pelo link do ar.";
  }
}

// ----- Liga os botões e parte do início -----
$("botao-comecar").onclick = comecarQuiz;
$("botao-voltar").onclick = () => {
  indice--;
  mostrarPergunta();
};
$("botao-refazer").onclick = comecarQuiz;
carregarEstatisticas();
