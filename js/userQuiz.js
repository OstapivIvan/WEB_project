const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('quizSubmit');
const resetButton = document.getElementById('quizReset');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');

let currentQuestionIndex = 0;
let questionsData;
let userAnswers = [];
let resultMode = false

//Load test data from json
function loadQuestions() {
    fetch('/testData.json')
        .then(response => response.json())
        .then(data => {
            questionsData = data.questions;
            displayQuestion(currentQuestionIndex);
        })
        .catch(error => console.error('Error fetching questions:', error));
}

window.addEventListener('DOMContentLoaded', loadQuestions);

//Dislay the test questions one at a time
function displayQuestion(index) {
    const questionObj = questionsData[index];

    quizContainer.innerHTML = '';

    const questionElement = document.createElement('div');
    questionElement.classList.add('question');
    questionElement.textContent = `${index + 1}. ${questionObj.question}`;

    const answersElement = document.createElement('div');
    answersElement.classList.add('answers');

    questionObj.answers.forEach((answerObj, answerIndex) => {
        const answerItem = document.createElement('div');
        answerItem.classList.add('answer');

        const radioInput = document.createElement('input');
        radioInput.type = 'radio';
        radioInput.name = `answer${index}`;
        radioInput.value = answerIndex;

        if (typeof userAnswers[index] !== 'undefined' && userAnswers[index] === answerIndex) {
            radioInput.checked = true;
        }

        const answerText = document.createElement('span');
        answerText.textContent = answerObj.answer;

        radioInput.addEventListener('change', () => {
            userAnswers[index] = answerIndex;
        });

        answerItem.appendChild(radioInput);
        answerItem.appendChild(answerText);
        answersElement.appendChild(answerItem);
    });
    questionElement.appendChild(answersElement);
    quizContainer.appendChild(questionElement);
}


function nextQuestion() {
    if (currentQuestionIndex < questionsData.length - 1) {
        currentQuestionIndex++;
        displayQuestion(currentQuestionIndex);
    }
}

function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion(currentQuestionIndex);

    }
}

document.getElementById('next').addEventListener('click', () => {
    nextQuestion();
});

document.getElementById('prev').addEventListener('click', () => {
    prevQuestion();
});

