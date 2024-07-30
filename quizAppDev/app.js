const quizData = [
    {
        question: "What is the correct syntax for referring to an external script called 'xxx.js'?",
        choices: ["<script href='xxx.js'>", "<script name='xxx.js'>", "<script src='xxx.js'>", "<script file='xxx.js'>"],
        correct: 2
    },
    {
        question: "How do you write 'Hello World' in an alert box?",
        choices: ["msgBox('Hello World');", "alertBox('Hello World');", "msg('Hello World');", "alert('Hello World');"],
        correct: 3
    },
    {
        question: "How do you create a function in JavaScript?",
        choices: ["function myFunction()", "function:myFunction()", "function = myFunction()", "function.myFunction()"],
        correct: 0
    },
    {
        question: "How do you call a function named 'myFunction'?",
        choices: ["call myFunction()", "call function myFunction()", "myFunction()", "Call.myFunction()"],
        correct: 2
    },
    {
        question: "How do you write an IF statement in JavaScript?",
        choices: ["if i == 5 then", "if i = 5 then", "if (i == 5)", "if i = 5"],
        correct: 2
    },
    {
        question: "How to write an IF statement for executing some code if 'i' is NOT equal to 5?",
        choices: ["if (i <> 5)", "if i <> 5", "if (i != 5)", "if i =! 5 then"],
        correct: 2
    },
    {
        question: "How does a WHILE loop start?",
        choices: ["while i = 1 to 10", "while (i <= 10; i++)", "while (i <= 10)", "while (i++ <= 10)"],
        correct: 2
    },
    {
        question: "How does a FOR loop start?",
        choices: ["for (i = 0; i <= 5)", "for (i <= 5; i++)", "for (i = 0; i <= 5; i++)", "for i = 1 to 5"],
        correct: 2
    },
    {
        question: "How can you add a comment in JavaScript?",
        choices: ["<!--This is a comment-->", "'This is a comment", "//This is a comment", "--This is a comment"],
        correct: 2
    },
    {
        question: "What is the correct way to write a JavaScript array?",
        choices: ["var colors = 'red', 'green', 'blue'", "var colors = (1:'red', 2:'green', 3:'blue')", "var colors = ['red', 'green', 'blue']", "var colors = 1 = ('red'), 2 = ('green'), 3 = ('blue')"],
        correct: 2
    }
];

let currentQuestionIndex = 0;
let score = 0;
let shuffledQuizData = [];

const questionElement = document.getElementById('question');
const choicesElements = document.querySelectorAll('.choice');
const scoreElement = document.getElementById('score');
const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const nextButton = document.getElementById('next-btn');
const questionNumberElement = document.getElementById('question-number');
const startScreen = document.getElementById('start-screen');

function startQuiz() {
    startScreen.classList.add('hidden');
    quizContainer.classList.remove('hidden');
    restartQuiz();
}

function loadQuestion() {
    const currentQuestion = shuffledQuizData[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    choicesElements.forEach((choiceElement, index) => {
        choiceElement.textContent = currentQuestion.choices[index];
        choiceElement.classList.remove('correct', 'incorrect');
    });
    questionNumberElement.textContent = `Question ${currentQuestionIndex + 1} of ${shuffledQuizData.length}`;
    nextButton.classList.add('hidden');
}

function selectAnswer(index) {
    const currentQuestion = shuffledQuizData[currentQuestionIndex];
    const isCorrect = index === currentQuestion.correct;
    choicesElements[index].classList.add(isCorrect ? 'correct' : 'incorrect');

    if (isCorrect) {
        score++;
    }

    choicesElements.forEach(button => button.disabled = true);

    nextButton.classList.remove('hidden');
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < shuffledQuizData.length) {
        loadQuestion();
        choicesElements.forEach(button => button.disabled = false);
    } else {
        showResult();
    }
}

function showResult() {
    quizContainer.classList.add('hidden');
    resultContainer.classList.remove('hidden');
    scoreElement.textContent = score;
}

function restartQuiz() {
    score = 0;
    currentQuestionIndex = 0;
    shuffledQuizData = shuffleArray([...quizData]);
    resultContainer.classList.add('hidden');
    quizContainer.classList.remove('hidden');
    loadQuestion();
    choicesElements.forEach(button => {
        button.disabled = false;
        button.classList.remove('correct', 'incorrect');
    });
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

document.addEventListener('click', function (event) {
    const isClickInsideQuiz = quizContainer.contains(event.target) || startScreen.contains(event.target) || resultContainer.contains(event.target);
    if (!isClickInsideQuiz && !quizContainer.classList.contains('hidden') && resultContainer.classList.contains('hidden')) {
        alert('Please complete the quiz before clicking outside!');
    }
});

quizContainer.classList.add('hidden');
resultContainer.classList.add('hidden');
startScreen.classList.remove('hidden');
