// ============================================================
// PETMATCH QUIZ — VERSÃO SIMPLES (estudo)
// O arquivo tem 3 partes:
//   1. DADOS      — os 6 pets e as 8 perguntas (com pontos de cada opção)
//   2. PONTUAÇÃO  — como o "match" é calculado
//   3. TELAS      — o que mostrar na página conforme o clique
// Não há chamadas à internet: tudo roda no próprio navegador.
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
let ultimoPlacar = null; // guardado para o botão "Compartilhar"

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
    botao.innerHTML = `<span class="opcao-emoji">${opcao.emoji}</span> ${opcao.rotulo}`;
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
  ultimoPlacar = placar;
  const vencedor = placar[0];
  const info = PETS[vencedor.pet];

  // Pódio: 1º lugar em destaque + 2º e 3º lado a lado
  const colocados = placar.slice(1, 3);
  $("podio").innerHTML = `
    <div class="vencedor" style="background:${info.fundo}">
      <span class="confete">🎉</span>
      <p class="faixa">Seu par perfeito</p>
      <span class="emoji-grande">${info.emoji}</span>
      <h2>${info.nome}</h2>
      <p>${info.frase}</p>
      <p class="selo">${vencedor.porcentagem}% de compatibilidade</p>
    </div>
    <div class="demais">
      ${colocados
        .map(
          (s, i) => `<div class="colocado">
            <span class="medalha">${i === 0 ? "🥈" : "🥉"}</span>
            <span class="emoji-medio">${PETS[s.pet].emoji}</span>
            <strong>${PETS[s.pet].nome}</strong>
            <span class="pontos-colocado">${s.porcentagem}%</span>
          </div>`
        )
        .join("")}
    </div>`;

  // Barras de afinidade: nasce com largura 0 e anima até o valor final
  $("barras-afinidade").innerHTML = placar
    .map(
      (s) => `<div class="linha">
        <span class="nome">${PETS[s.pet].emoji} ${PETS[s.pet].nome}</span>
        <div class="trilha"><div class="preenchimento" style="width:0;background:${PETS[s.pet].cor}"></div></div>
        <span class="valor">${s.porcentagem}%</span>
      </div>`
    )
    .join("");
  setTimeout(() => {
    document.querySelectorAll("#barras-afinidade .preenchimento").forEach((barra, i) => {
      barra.style.width = placar[i].porcentagem + "%";
    });
  }, 100);

  // Motivos: as 3 respostas em que o vencedor pontuou mais
  const motivos = PERGUNTAS.map((pergunta) => {
    const opcao = pergunta.opcoes.find((o) => o.id === respostas[pergunta.id]);
    return { titulo: pergunta.titulo, resposta: opcao.rotulo, pontos: opcao.pontos[vencedor.pet] ?? 0 };
  })
    .filter((m) => m.pontos > 0)
    .sort((a, b) => b.pontos - a.pontos)
    .slice(0, 3);
  $("motivos").innerHTML = motivos.length
    ? motivos.map((m) => `<li>🐾 <strong>${m.titulo}</strong> — sua resposta: ${m.resposta}</li>`).join("")
    : "<li>Seu perfil é bem equilibrado — qualquer companhia calma combina com você!</li>";

  $("dicas").innerHTML = info.dicas.map((d) => `<li>✅ ${d}</li>`).join("");

  mostrarTela("tela-resultado");
}

// ----- Grade de pets da tela inicial e rodapé -----
$("animais").innerHTML = Object.values(PETS)
  .map(
    (pet) => `<div class="cartao-animais" style="background:${pet.fundo}">
      <span class="emoji-animais">${pet.emoji}</span>
      <strong>${pet.nome}</strong>
      <span class="frase-animais">${pet.frase}</span>
    </div>`
  )
  .join("");

$("link-inicio").onclick = (evento) => {
  evento.preventDefault();
  mostrarTela("tela-inicio");
};
$("link-quiz").onclick = (evento) => {
  evento.preventDefault();
  comecarQuiz();
};

// Compartilha o resultado no WhatsApp
$("botao-compartilhar").onclick = () => {
  const vencedor = ultimoPlacar[0];
  const info = PETS[vencedor.pet];
  const texto =
    "Fiz o PetMatch Quiz e meu pet ideal é " + info.nome + " " + info.emoji +
    " (" + vencedor.porcentagem + "% de compatibilidade). Faça o seu também!";
  window.open("https://wa.me/?text=" + encodeURIComponent(texto), "_blank");
};

// ----- Liga os botões e parte do início -----
$("botao-comecar").onclick = comecarQuiz;
$("botao-voltar").onclick = () => {
  indice--;
  mostrarPergunta();
};
$("botao-refazer").onclick = comecarQuiz;
