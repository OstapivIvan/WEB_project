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

nextButton.addEventListener('click', () => {
    nextQuestion();
    if (resultMode) {
        displayResults(userAnswers);
    }
});

prevButton.addEventListener('click', () => {
    prevQuestion();
    if (resultMode) {
        displayResults(userAnswers);
    }
});

function displayResults(userAnswers) {
    resultsContainer.innerHTML = '';
    //data for specific question by index
    const questionObj = questionsData[currentQuestionIndex];
    const correctAnswerIndex = questionObj.answers.findIndex(answer => answer.correct);
    const selectedAnswer = userAnswers[currentQuestionIndex];
    const isCorrect = selectedAnswer === correctAnswerIndex;

    //information about the question and answer 
    const resultElement = document.createElement('div');
    resultElement.classList.add('result');
    resultElement.textContent = `Results`;
    resultElement.textContent = `${currentQuestionIndex + 1}.Your answer is ${isCorrect ? 'correct (1 point)' : 'incorrect (0 point)'}. Your selected answer: ${questionObj.answers[selectedAnswer].answer}. Correct answer: ${questionObj.answers[correctAnswerIndex].answer}`;
    //count correct answsers
    let correctCount = 0;
    userAnswers.forEach((selectedAnswer, index) => {
        if (selectedAnswer === questionsData[index].answers.findIndex(answer => answer.correct)) {
            correctCount++;
        }
    });

    //total result
    const totalQuestions = questionsData.length;
    const percentage = (correctCount / totalQuestions) * 100;
    const totalResultElement = document.createElement('div');
    totalResultElement.classList.add('total-result');
    totalResultElement.textContent = `Total: ${correctCount} out of ${totalQuestions} questions correct(${percentage.toFixed(2)} %). Total: ${correctCount} point `;

    resultsContainer.appendChild(resultElement);
    resultsContainer.appendChild(totalResultElement);
}

//click event to the submit button
submitButton.addEventListener('click', (event) => {
    event.preventDefault();

    if (userAnswers.length === questionsData.length) {
        if (confirm("Are you sure you want to submit?")) {
            resultMode = true
            displayResults(userAnswers);
        }
    } else {
        alert("Please answer all questions before submitting.");
    }
});

//resetting quiz
resetButton.addEventListener('click', (event) => {
    if (confirm("Are you sure you reset quiz?")) {
        event.preventDefault();
        userAnswers = [];
        currentQuestionIndex = 0;
        resultMode = false;
        displayQuestion(currentQuestionIndex);
        resultsContainer.innerHTML = '';
    }
});