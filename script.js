const questions = [
    {
        question: "Which is best batsman in the world?",
        answers: [
            {
                text: "Babar Azam",
                correct: "false"
            },

            {
                text: "David warner",
                correct: "false"
            },

            {
                text: "Virat Kohli",
                correct: "true"
            },

            {
                text: "Rohit Sharma",
                correct: "false"
            }
        ]
    },
    {
        question: "Most IPL Title Winner Team?",
        answers: [
            {
                text: "Kolkata Knight Riders",
                correct: "false"
            },
            {
                text: "Mumbai Indians",
                correct: "true",
            },
            {
                text: "Chennai Super Kings",
                correct: "false",
            },
            {
                text: "Royal Challengers Banglore",
                correct: "false"
            }
        ]
    },
    {
        question: "Winner of World Cup 2011?",
        answers: [
            {
                text: "India",
                correct: "true",
            },
            {
                text: "Pakistan",
                correct: "false",
            },
            {
                text: "Sri Lanka",
                correct: "true",
            },
            {
                text: "Australia",
                correct: "false",
            }
        ],
    },
    {
        question: "Whom did India beat in the opening match of the 1983 World Cup?",
        answers: [
            {
                text: "Australia",
                correct: "false",
            },
            {
                text: "England",
                correct: "false",
            },
            {
                text: "Zimbambwe",
                correct: "false",
            },
            {
                text: "West Indies",
                correct: "true",
            }
        ],
    },
    {
        question:
            "Which colour cap is awarded to the player taking the most wickets in the tournament??",
        answers: [
            {
                text: "Red",
                correct: "true",
            },
            {
                text: "Orange",
                correct: "false",
            },
            {
                text: "Purple",
                correct: "true",
            },
            {
                text: "Blue",
                correct: "false",
            }
        ],
    },
];

// Selecting Elements

const questionEl = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {

    resetState();

    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionEl.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);

        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }

        button.addEventListener("click", selectAnswer)

    });

}

function resetState() {
    nextButton.style.display = "none";

    // remove all the previous childs
    while (answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild);
    }

}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButton.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < question.length) {
        showQuestion();
    } else {
        showScore();
    }
}

function showScore() {
    resetState();
    questionEl.innerHTML = `You scored ${score} out of ${questions.length}!`;

    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
})

startQuiz();
