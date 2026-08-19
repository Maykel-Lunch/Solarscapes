var score = 0;
var answers = {
    q1: { correct: '1', selected: null },
    q2: { correct: '4', selected: null },
    q3: { correct: '4', selected: null },
    q4: { correct: '4', selected: null },
    q5: { correct: '2', selected: null }
};
var questionAnswered = false;

function selectOption(questionId, value, selectedOption) {
    if (questionAnswered) return;
    document.querySelectorAll('#options-' + questionId + ' .option-card').forEach(function (option) {
        option.classList.remove('selected');
    });
    selectedOption.classList.add('selected');
    answers[questionId].selected = value;
}

function getCorrectAnswerText(questionId) {
    var labels = {
        q1: { '1': 'Proxima Centauri', '2': 'Betelgeuse', '3': 'Sirius', '4': 'Alpha Centauri' },
        q2: { '1': 'Revolution around the sun', '2': 'Axial tilt', '3': 'Gravitational pull', '4': 'Spin on its axis' },
        q3: { '1': 'Size', '2': 'Presence of moon', '3': 'Orbiting the sun', '4': 'Clearing its orbital path' },
        q4: { '1': "Studying earth's climate", '2': 'Tracking asteroids', '3': 'Mapping ocean currents', '4': 'Observing distant galaxies' },
        q5: { '1': 'Solar wind', '2': 'Ionization of its nucleus', '3': 'Collision with asteroids', '4': 'Interaction with cosmic rays' }
    };
    return labels[questionId][answers[questionId].correct];
}

function checkAnswer(questionId, buttonId, nextButtonId) {
    var selected = answers[questionId].selected;
    var resultMessage = document.getElementById('resultMessage');
    var result = document.querySelector('.result');
    var correctAnswer = answers[questionId].correct;
    if (!selected) {
        resultMessage.textContent = 'Please select an answer first!';
        resultMessage.className = 'alert alert-warning';
        result.classList.remove('is-hidden');
        return;
    }
    questionAnswered = true;
    document.querySelectorAll('#options-' + questionId + ' .option-card').forEach(function (option) {
        var value = option.getAttribute('data-value');
        option.classList.add('disabled');
        if (value === correctAnswer) option.classList.add('correct');
        if (option.classList.contains('selected') && value !== correctAnswer) option.classList.add('wrong');
    });
    if (selected === correctAnswer) {
        resultMessage.textContent = 'Correct! Well done!';
        resultMessage.className = 'alert alert-success';
        score++;
    } else {
        resultMessage.textContent = 'Incorrect. The correct answer was: ' + getCorrectAnswerText(questionId);
        resultMessage.className = 'alert alert-danger';
    }
    result.classList.remove('is-hidden');
    document.getElementById(buttonId).classList.add('is-hidden');
    document.getElementById(nextButtonId).classList.remove('is-hidden');
}

function nextQuestion(nextQuestionId, currentQuestionId) {
    document.getElementById(currentQuestionId).classList.add('is-hidden');
    document.getElementById(nextQuestionId).classList.remove('is-hidden');
    document.querySelector('.result').classList.add('is-hidden');
    questionAnswered = false;
}

function resetQuiz() {
    score = 0;
    questionAnswered = false;
    Object.keys(answers).forEach(function (questionId) { answers[questionId].selected = null; });
    ['q1', 'q2', 'q3', 'q4', 'q5'].forEach(function (questionId, index) {
        document.getElementById(questionId).classList.toggle('is-hidden', index !== 0);
    });
    document.getElementById('Finish').classList.add('is-hidden');
    document.querySelector('.result').classList.add('is-hidden');
    document.querySelectorAll('.option-card').forEach(function (option) { option.classList.remove('selected', 'correct', 'wrong', 'disabled'); });
    document.querySelectorAll('.result-icon').forEach(function (icon) { icon.removeAttribute('style'); });
    document.querySelectorAll('[id^="checkAnswer"]').forEach(function (button) { button.classList.remove('is-hidden'); });
    ['nextQ1', 'nextQ2', 'nextQ3', 'nextQ4', 'finishQuiz'].forEach(function (id) { document.getElementById(id).classList.add('is-hidden'); });
    document.getElementById('resultMessage').textContent = '';
}

document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.option-card').forEach(function (option) {
        option.addEventListener('click', function () {
            selectOption(option.dataset.question, option.dataset.value, option);
        });
    });
    [['q1', 'checkAnswer1', 'nextQ1'], ['q2', 'checkAnswer2', 'nextQ2'], ['q3', 'checkAnswer3', 'nextQ3'], ['q4', 'checkAnswer4', 'nextQ4'], ['q5', 'checkAnswer5', 'finishQuiz']].forEach(function (item) {
        document.getElementById(item[1]).addEventListener('click', function () { checkAnswer(item[0], item[1], item[2]); });
    });
    [['nextQ1', 'q2', 'q1'], ['nextQ2', 'q3', 'q2'], ['nextQ3', 'q4', 'q3'], ['nextQ4', 'q5', 'q4']].forEach(function (item) {
        document.getElementById(item[0]).addEventListener('click', function () { nextQuestion(item[1], item[2]); });
    });
    document.getElementById('finishQuiz').addEventListener('click', function () {
        document.getElementById('q5').classList.add('is-hidden');
        document.querySelector('.result').classList.add('is-hidden');
        document.getElementById('Finish').classList.remove('is-hidden');
        document.getElementById('finalScore').textContent = score;
    });
    document.getElementById('home').addEventListener('click', function () { window.location.href = '../../index.html'; });
    document.getElementById('reviewQuiz').addEventListener('click', resetQuiz);
});
