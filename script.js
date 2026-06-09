const questions = [
{
    question: "Which language is used for web page structure?",
    answers: ["HTML", "CSS", "JavaScript", "Python"],
    correct: 0
},
{
    question: "Which CSS property changes text color?",
    answers: ["font-size", "background", "color", "border"],
    correct: 2
},
{
    question: "Which company developed JavaScript?",
    answers: ["Google", "Netscape", "Microsoft", "Apple"],
    correct: 1
}
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const nextBtn = document.getElementById("nextBtn");

nextBtn.disabled = true;

loadQuestion();

function loadQuestion() {
    answered = false;
    nextBtn.disabled = true;

    const q = questions[currentQuestion];

    questionEl.textContent = q.question;
    answersEl.innerHTML = "";

    q.answers.forEach((answer, index) => {
        const button = document.createElement("button");

        button.textContent = answer;
        button.classList.add("answer-btn");

        button.addEventListener("click", () => selectAnswer(button, index));

        answersEl.appendChild(button);
    });
}

function selectAnswer(selectedButton, index) {

    if(answered) return;

    answered = true;

    const buttons = document.querySelectorAll(".answer-btn");

    buttons.forEach(btn => btn.disabled = true);

    if(index === questions[currentQuestion].correct) {
        score++;
        selectedButton.style.backgroundColor = "lightgreen";
    } else {
        selectedButton.style.backgroundColor = "salmon";

        buttons[questions[currentQuestion].correct].style.backgroundColor = "lightgreen";
    }

    nextBtn.disabled = false;
}

nextBtn.addEventListener("click", () => {

    currentQuestion++;

    if(currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
});

function showResult() {

    document.getElementById("quiz").classList.add("hidden");

    document.getElementById("result").classList.remove("hidden");

    document.getElementById("score").textContent =
        `${score} / ${questions.length}`;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;

    document.getElementById("quiz").classList.remove("hidden");
    document.getElementById("result").classList.add("hidden");

    loadQuestion();
}