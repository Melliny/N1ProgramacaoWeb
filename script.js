class Character {
    constructor(name, icon, description, strengths, abilities, style) {
        this.name = name;
        this.icon = icon;
        this.description = description;
        this.strengths = strengths;
        this.abilities = abilities;
        this.style = style;
        this.score = 0;
    }
}

class CharacterQuiz {
    constructor() {
        this.characters = [
            new Character(
                "Arqueira", "🏹", 
                "Você é ágil, estratégico e prefere resolver os problemas à distância. Sua precisão e capacidade de observação são admiráveis.",
                "Velocidade, precisão e visão aguçada",
                "Ataque à distância, camuflagem, rastreamento",
                "Prefere evitar confrontos diretos, analisa antes de agir"
            ),
            new Character(
                "Mago", "✨", 
                "Você é sábio, criativo e busca conhecimento. Sua inteligência e habilidade para resolver problemas complexos são seu maior diferencial.",
                "Inteligência, adaptabilidade e conhecimento arcano",
                "Feitiços variados, invisibilidade, cura",
                "Planeja cada movimento, usa a mente antes da força"
            ),
            new Character(
                "Guerreiro", "🛡️", 
                "Você é corajoso, determinado e confiável. Sua lealdade e força física são qualidades que inspiram todos ao seu redor.",
                "Força física, resistência e coragem",
                "Combate corpo a corpo, defesa com escudo, intimidação",
                "Enfrenta desafios diretamente, protetor por natureza"
            )
        ];
        
        this.questions = [
            {
                text: "Como você prefere resolver conflitos?",
                options: [
                    { text: "Observando de longe e intervindo no momento certo", scores: [3, 2, 1] },
                    { text: "Usando estratégia e palavras para evitar a luta", scores: [2, 3, 1] },
                    { text: "Enfrentando diretamente e mostrando sua força", scores: [1, 2, 3] }
                ]
            },
            {
                text: "Qual seria seu papel ideal em um grupo?",
                options: [
                    { text: "Explorador e observador, investigando o caminho", scores: [3, 1, 2] },
                    { text: "Conselheiro e estrategista, planejando as ações", scores: [2, 3, 1] },
                    { text: "Protetor e líder, guiando o grupo com segurança", scores: [1, 2, 3] }
                ]
            },
            {
                text: "Como você reage a situações inesperadas?",
                options: [
                    { text: "Rapidamente me adapto e encontro rotas de escape", scores: [3, 2, 1] },
                    { text: "Analiso todas as possibilidades antes de decidir", scores: [1, 3, 2] },
                    { text: "Enfrento o problema de frente sem hesitar", scores: [2, 1, 3] }
                ]
            },
            {
                text: "Qual habilidade você valoriza mais?",
                options: [
                    { text: "Agilidade e precisão", scores: [3, 1, 2] },
                    { text: "Inteligência e conhecimento", scores: [2, 3, 1] },
                    { text: "Força e resistência", scores: [1, 2, 3] }
                ]
            },
            {
                text: "Em seus momentos livres, você prefere:",
                options: [
                    { text: "Praticar tiro ao alvo ou esportes que exigem precisão", scores: [3, 1, 2] },
                    { text: "Ler livros, aprender magias ou estudar", scores: [1, 3, 2] },
                    { text: "Treinar combate físico e aprimorar sua força", scores: [2, 1, 3] }
                ]
            },
            {
                text: "Como você lida com seus inimigos?",
                options: [
                    { text: "Prefiro manter distância e observar suas fraquezas", scores: [3, 2, 1] },
                    { text: "Uso astúcia e estratégia para confundi-los", scores: [2, 3, 1] },
                    { text: "Enfrento-os cara a cara para mostrar minha força", scores: [1, 1, 3] }
                ]
            },
            {
                text: "Qual ambiente você prefere?",
                options: [
                    { text: "Florestas e áreas amplas onde posso me mover livremente", scores: [3, 1, 2] },
                    { text: "Bibliotecas e lugares místicos cheios de conhecimento", scores: [1, 3, 2] },
                    { text: "Castelos e fortalezas que proporcionam proteção", scores: [2, 2, 3] }
                ]
            },
            {
                text: "Qual é o seu maior medo?",
                options: [
                    { text: "Ficar preso em um lugar sem saída", scores: [3, 2, 1] },
                    { text: "Perder conhecimentos valiosos", scores: [1, 3, 2] },
                    { text: "Não conseguir proteger quem ama", scores: [2, 1, 3] }
                ]
            },
            {
                text: "Como você abordaria uma missão importante?",
                options: [
                    { text: "Observaria e planejaria o melhor momento para agir", scores: [3, 2, 1] },
                    { text: "Pesquisaria todas as informações possíveis antes", scores: [2, 3, 1] },
                    { text: "Prepararia meu equipamento e partiria confiante", scores: [1, 1, 3] }
                ]
            },
            {
                text: "O que mais importa para você em uma aventura?",
                options: [
                    { text: "Explorar novos territórios e descobrir segredos", scores: [3, 2, 1] },
                    { text: "Adquirir novos conhecimentos e habilidades", scores: [1, 3, 2] },
                    { text: "Superar desafios físicos e proteger aliados", scores: [2, 1, 3] }
                ]
            }
        ];
        
        this.currentQuestionIndex = 0;
        this.userAnswers = [];
        
        this.elements = {
            welcomeSection: document.getElementById('welcomeSection'),
            quizSection: document.getElementById('quizSection'),
            resultSection: document.getElementById('resultSection'),
            questionContainer: document.getElementById('questionContainer'),
            progressBar: document.getElementById('progressBar'),
            startBtn: document.getElementById('startBtn'),
            nextBtn: document.getElementById('nextBtn'),
            restartBtn: document.getElementById('restartBtn')
        };
        
        this.elements.startBtn.addEventListener('click', () => this.startQuiz());
        this.elements.nextBtn.addEventListener('click', () => this.nextQuestion());
        this.elements.restartBtn.addEventListener('click', () => this.restartQuiz());
    }
    
    startQuiz() {
        this.elements.welcomeSection.classList.add('hidden');
        this.elements.quizSection.classList.remove('hidden');
        this.loadQuestion(0);
    }
    
    loadQuestion(index) {
        if (index >= this.questions.length) {
            this.showResult();
            return;
        }
        
        const question = this.questions[index];
        
        this.elements.questionContainer.innerHTML = `
            <div class="question">
                <h3>Pergunta ${index + 1}: ${question.text}</h3>
                <div class="options">
                    ${question.options.map((option, i) => 
                        `<div class="option" data-index="${i}">${option.text}</div>`
                    ).join('')}
                </div>
            </div>
        `;
        
        const progress = ((index + 1) / this.questions.length) * 100;
        this.elements.progressBar.style.width = `${progress}%`;
        
        const options = document.querySelectorAll('.option');
        options.forEach(option => {
            option.addEventListener('click', () => {
                options.forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');
                this.elements.nextBtn.disabled = false;
            });
        });
        
        this.elements.nextBtn.disabled = true;
        this.currentQuestionIndex = index;
    }
    
    nextQuestion() {
        const selectedOption = document.querySelector('.option.selected');
        if (!selectedOption) return;
        
        const optionIndex = parseInt(selectedOption.getAttribute('data-index'));
        this.userAnswers[this.currentQuestionIndex] = optionIndex;
        
        this.loadQuestion(this.currentQuestionIndex + 1);
    }
    
    calculateResults() {
        this.characters.forEach(char => char.score = 0);
        
        this.userAnswers.forEach((answer, qIndex) => {
            const scores = this.questions[qIndex].options[answer].scores;
            scores.forEach((score, charIndex) => {
                this.characters[charIndex].score += score;
            });
        });
        
        return this.characters.reduce((prev, current) => 
            (prev.score > current.score) ? prev : current
        );
    }
    
    showResult() {
        this.elements.quizSection.classList.add('hidden');
        this.elements.resultSection.classList.remove('hidden');
        
        const result = this.calculateResults();
        
        document.getElementById('characterName').textContent = result.name;
        document.getElementById('characterIcon').textContent = result.icon;
        document.getElementById('characterDescription').textContent = result.description;
        document.getElementById('characterStrengths').textContent = result.strengths;
        document.getElementById('characterAbilities').textContent = result.abilities;
        document.getElementById('characterStyle').textContent = result.style;
        document.getElementById('characterScore').textContent = result.score + " pontos";
    }
    
    restartQuiz() {
        this.currentQuestionIndex = 0;
        this.userAnswers = [];
        this.elements.resultSection.classList.add('hidden');
        this.elements.welcomeSection.classList.remove('hidden');
        this.characters.forEach(char => char.score = 0);
    }
}

document.addEventListener('DOMContentLoaded', () => new CharacterQuiz());