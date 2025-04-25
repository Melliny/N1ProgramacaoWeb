class Personagem {
    constructor(nome, icone, descricao, forcas, habilidades, estilo) {
        this.nome = nome;
        this.icone = icone;
        this.descricao = descricao;
        this.forcas = forcas;
        this.habilidades = habilidades;
        this.estilo = estilo;
        this.pontuacao = 0;
    }
}

class QuizPersonagem {
    constructor() {
        this.personagens = [
            new Personagem(
                "Arqueira", "🏹", 
                "Você é ágil, estratégico e prefere resolver os problemas à distância. Sua precisão e capacidade de observação são admiráveis.",
                "Velocidade, precisão e visão aguçada",
                "Ataque à distância, camuflagem, rastreamento",
                "Prefere evitar confrontos diretos, analisa antes de agir"
            ),
            new Personagem(
                "Mago", "✨", 
                "Você é sábio, criativo e busca conhecimento. Sua inteligência e habilidade para resolver problemas complexos são seu maior diferencial.",
                "Inteligência, adaptabilidade e conhecimento arcano",
                "Feitiços variados, invisibilidade, cura",
                "Planeja cada movimento, usa a mente antes da força"
            ),
            new Personagem(
                "Guerreiro", "🛡️", 
                "Você é corajoso, determinado e confiável. Sua lealdade e força física são qualidades que inspiram todos ao seu redor.",
                "Força física, resistência e coragem",
                "Combate corpo a corpo, defesa com escudo, intimidação",
                "Enfrenta desafios diretamente, protetor por natureza"
            )
        ];
        
        this.perguntas = [
            {
                texto: "Como você prefere resolver conflitos?",
                opcoes: [
                    { texto: "Observando de longe e intervindo no momento certo", pontos: [3, 2, 1] },
                    { texto: "Usando estratégia e palavras para evitar a luta", pontos: [2, 3, 1] },
                    { texto: "Enfrentando diretamente e mostrando sua força", pontos: [1, 2, 3] }
                ]
            },
            {
                texto: "Qual seria seu papel ideal em um grupo?",
                opcoes: [
                    { texto: "Explorador e observador, investigando o caminho", pontos: [3, 1, 2] },
                    { texto: "Conselheiro e estrategista, planejando as ações", pontos: [2, 3, 1] },
                    { texto: "Protetor e líder, guiando o grupo com segurança", pontos: [1, 2, 3] }
                ]
            },
            {
                texto: "Como você reage a situações inesperadas?",
                opcoes: [
                    { texto: "Rapidamente me adapto e encontro rotas de escape", pontos: [3, 2, 1] },
                    { texto: "Analiso todas as possibilidades antes de decidir", pontos: [1, 3, 2] },
                    { texto: "Enfrento o problema de frente sem hesitar", pontos: [2, 1, 3] }
                ]
            },
            {
                texto: "Qual habilidade você valoriza mais?",
                opcoes: [
                    { texto: "Agilidade e precisão", pontos: [3, 1, 2] },
                    { texto: "Inteligência e conhecimento", pontos: [2, 3, 1] },
                    { texto: "Força e resistência", pontos: [1, 2, 3] }
                ]
            },
            {
                texto: "Em seus momentos livres, você prefere:",
                opcoes: [
                    { texto: "Praticar tiro ao alvo ou esportes que exigem precisão", pontos: [3, 1, 2] },
                    { texto: "Ler livros, aprender magias ou estudar", pontos: [1, 3, 2] },
                    { texto: "Treinar combate físico e aprimorar sua força", pontos: [2, 1, 3] }
                ]
            },
            {
                texto: "Como você lida com seus inimigos?",
                opcoes: [
                    { texto: "Prefiro manter distância e observar suas fraquezas", pontos: [3, 2, 1] },
                    { texto: "Uso astúcia e estratégia para confundi-los", pontos: [2, 3, 1] },
                    { texto: "Enfrento-os cara a cara para mostrar minha força", pontos: [1, 1, 3] }
                ]
            },
            {
                texto: "Qual ambiente você prefere?",
                opcoes: [
                    { texto: "Florestas e áreas amplas onde posso me mover livremente", pontos: [3, 1, 2] },
                    { texto: "Bibliotecas e lugares místicos cheios de conhecimento", pontos: [1, 3, 2] },
                    { texto: "Castelos e fortalezas que proporcionam proteção", pontos: [2, 2, 3] }
                ]
            },
            {
                texto: "Qual é o seu maior medo?",
                opcoes: [
                    { texto: "Ficar preso em um lugar sem saída", pontos: [3, 2, 1] },
                    { texto: "Perder conhecimentos valiosos", pontos: [1, 3, 2] },
                    { texto: "Não conseguir proteger quem ama", pontos: [2, 1, 3] }
                ]
            },
            {
                texto: "Como você abordaria uma missão importante?",
                opcoes: [
                    { texto: "Observaria e planejaria o melhor momento para agir", pontos: [3, 2, 1] },
                    { texto: "Pesquisaria todas as informações possíveis antes", pontos: [2, 3, 1] },
                    { texto: "Prepararia meu equipamento e partiria confiante", pontos: [1, 1, 3] }
                ]
            },
            {
                texto: "O que mais importa para você em uma aventura?",
                opcoes: [
                    { texto: "Explorar novos territórios e descobrir segredos", pontos: [3, 2, 1] },
                    { texto: "Adquirir novos conhecimentos e habilidades", pontos: [1, 3, 2] },
                    { texto: "Superar desafios físicos e proteger aliados", pontos: [2, 1, 3] }
                ]
            }
        ];
        
        this.indicePerguntaAtual = 0;
        this.respostasUsuario = [];
        
        this.elementos = {
            secaoBoasVindas: document.getElementById('welcomeSection'),
            secaoQuiz: document.getElementById('quizSection'),
            secaoResultado: document.getElementById('resultSection'),
            containerPergunta: document.getElementById('questionContainer'),
            barraProgresso: document.getElementById('progressBar'),
            botaoIniciar: document.getElementById('startBtn'),
            botaoProximo: document.getElementById('nextBtn'),
            botaoReiniciar: document.getElementById('restartBtn')
        };
        
        this.elementos.botaoIniciar.addEventListener('click', () => this.iniciarQuiz());
        this.elementos.botaoProximo.addEventListener('click', () => this.proximaPergunta());
        this.elementos.botaoReiniciar.addEventListener('click', () => this.reiniciarQuiz());
    }
    
    iniciarQuiz() {
        this.elementos.secaoBoasVindas.classList.add('hidden');
        this.elementos.secaoQuiz.classList.remove('hidden');
        this.carregarPergunta(0);
    }
    
    carregarPergunta(indice) {
        if (indice >= this.perguntas.length) {
            this.mostrarResultado();
            return;
        }
        
        const pergunta = this.perguntas[indice];
        
        this.elementos.containerPergunta.innerHTML = `
            <div class="question">
                <h3>Pergunta ${indice + 1}: ${pergunta.texto}</h3>
                <div class="options">
                    ${pergunta.opcoes.map((opcao, i) => 
                        `<div class="option" data-index="${i}">${opcao.texto}</div>`
                    ).join('')}
                </div>
            </div>
        `;
        
        const progresso = ((indice + 1) / this.perguntas.length) * 100;
        this.elementos.barraProgresso.style.width = `${progresso}%`;
        
        const opcoes = document.querySelectorAll('.option');
        opcoes.forEach(opcao => {
            opcao.addEventListener('click', () => {
                opcoes.forEach(opt => opt.classList.remove('selected'));
                opcao.classList.add('selected');
                this.elementos.botaoProximo.disabled = false;
            });
        });
        
        this.elementos.botaoProximo.disabled = true;
        this.indicePerguntaAtual = indice;
    }
    
    proximaPergunta() {
        const opcaoSelecionada = document.querySelector('.option.selected');
        if (!opcaoSelecionada) return;
        
        const indiceOpcao = parseInt(opcaoSelecionada.getAttribute('data-index'));
        this.respostasUsuario[this.indicePerguntaAtual] = indiceOpcao;
        
        this.carregarPergunta(this.indicePerguntaAtual + 1);
    }
    
    calcularResultados() {
        this.personagens.forEach(pers => pers.pontuacao = 0);
        
        this.respostasUsuario.forEach((resposta, qIndice) => {
            const pontos = this.perguntas[qIndice].opcoes[resposta].pontos;
            pontos.forEach((ponto, indicePersonagem) => {
                this.personagens[indicePersonagem].pontuacao += ponto;
            });
        });
        
        return this.personagens.reduce((anterior, atual) => 
            (anterior.pontuacao > atual.pontuacao) ? anterior : atual
        );
    }
    
    mostrarResultado() {
        this.elementos.secaoQuiz.classList.add('hidden');
        this.elementos.secaoResultado.classList.remove('hidden');
        
        const resultado = this.calcularResultados();
        
        document.getElementById('characterName').textContent = resultado.nome;
        document.getElementById('characterIcon').textContent = resultado.icone;
        document.getElementById('characterDescription').textContent = resultado.descricao;
        document.getElementById('characterStrengths').textContent = resultado.forcas;
        document.getElementById('characterAbilities').textContent = resultado.habilidades;
        document.getElementById('characterStyle').textContent = resultado.estilo;
        document.getElementById('characterScore').textContent = resultado.pontuacao + " pontos";
    }
    
    reiniciarQuiz() {
        this.indicePerguntaAtual = 0;
        this.respostasUsuario = [];
        this.elementos.secaoResultado.classList.add('hidden');
        this.elementos.secaoBoasVindas.classList.remove('hidden');
        this.personagens.forEach(pers => pers.pontuacao = 0);
    }
}

document.addEventListener('DOMContentLoaded', () => new QuizPersonagem());
