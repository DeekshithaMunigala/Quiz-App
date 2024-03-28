const questions = [
    {
        question: `How do you write a conditional statement for executing some statements only if 'i' is equal to 5?`,
        answers : [
            {text: "if i = 5", correct: false},
            {text: "if i == 5 then", correct: false},
            {text: "if (i == 5)", correct: true},
            {text: "if i = 5 then", correct: false}
        ] 
    },
    {
        question: "How do you create a function in JavaScript?",
        answers : [
            {text: "function = myFunction()", correct: false},
            {text: "create myFunction()", correct: false},
            {text: "function:myFunction()", correct: false},
            {text: "function myFunction()", correct: true}
        ] 
    },
    {
        question: "What is the output of this code? console.log(typeof null);",
        answers : [
            {text: "null", correct: false},
            {text: "object", correct: true},
            {text: "undefined", correct: false},
            {text: "number", correct: false}
        ] 
    },
    {
        question: "Which method is used to add an element at the end of an array?",
        answers : [
            {text: "array.push(element)", correct: true},
            {text: "array.pop(element)", correct: false},
            {text: "array.unshift(element)", correct: false},
            {text: "array.shift(element)", correct: false}
        ] 
    },
    {
        question: "How do you find the number with the highest value of x and y?",
        answers : [
            {text: "Math.ceil(x, y)", correct: false},
            {text: "Math.max(x, y)", correct: true},
            {text: "top(x, y)", correct: false},
            {text: "ceil(x, y)", correct: false}
        ] 
    },
    {
        question: "How can a JavaScript variable be declared conditionally?",
        answers : [
            {text: "var x if (condition)", correct: false},
            {text: "if (condition) var x", correct: false},
            {text: "var x = (condition) ? value1 : value2", correct: true},
            {text: "condition(var x)", correct: false}
        ] 
    },
    {
        question: "Which statement creates a new object in JavaScript?",
        answers : [
            {text: "var obj = new Object();", correct: false},
            {text: "var obj = new obj();", correct: false},
            {text: "var obj = {};", correct: false},
            {text: "Both A and C are correct", correct: true}
        ] 
    },
    {
        question: "How can you detect the client's browser name in JavaScript?",
        answers : [
            {text: "navigator.appName", correct: true},
            {text: "browser.name", correct: false},
            {text: "client.browser", correct: false},
            {text: "window.browserName", correct: false}
        ] 
    },
    {
        question: "Which method converts JSON data to a JavaScript object?",
        answers : [
            {text: "JSON.toString()", correct: false},
            {text: "JSON.toObject()", correct: false},
            {text: "JSON.parse()", correct: true},
            {text: "JSON.stringify()", correct: false}
        ] 
    },
    {
        question: "How do you declare a JavaScript asynchronous function?",
        answers : [
            {text: "function async myFunc() {}", correct: false},
            {text: "function myFunc() async {}", correct: false},
            {text: "async() function myFunc() {}", correct: false},
            {text: "async function myFunc() {}", correct: true}
        ] 
    }

];

const questionElemwnt = document.querySelector("#question");
const answerButtons = document.querySelector("#answer-buttons");
const nextButton = document.querySelector("#next-btn");

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
    questionElemwnt.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button); 
        if(answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while(answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElemwnt.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
})

startQuiz();