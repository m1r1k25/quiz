const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0;
let questionCounter = 0;
let availableQuestions = []

let questions = [
   {
      question: 'Сколько будет 2+2?',
      choice1: '2',
      choice2: '4',
      choice3: '5',
      choice4: '8',
      answer: 2,
   },
   {
      question: 'Страна с самым большим населением?',
      choice1: 'Индия',
      choice2: 'Россия',
      choice3: 'Китай',
      choice4: 'Беларусь',
      answer: 3,
   },
   {
      question: 'Столица Гватемалы?',
      choice1: 'Петен',
      choice2: 'Панахачель',
      choice3: 'Антигуа',
      choice4: 'Гватемала',
      answer: 4,
   },
   {
      question: 'Первый президент США?',
      choice1: 'Обама',
      choice2: 'Линкольн',
      choice3: 'Рузвельт',
      choice4: 'Вашингтон',
      answer: 4,
   }
]

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 4;

function startGame() {
   questionCounter = 0;
   score = 0;
   availableQuestions = [...questions];
   getNewQuestion()
}

function getNewQuestion() {
   if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
      localStorage.setItem('mostRecentScore', score);
      return window.location.assign('end.html');
   }
   questionCounter++;
   progressText.innerHTML = `Вопрос ${questionCounter} из ${MAX_QUESTIONS}`;
   progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`;

   const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
   currentQuestion = availableQuestions[questionsIndex];
   question.innerHTML = currentQuestion.question

   choices.forEach(choice => {
      const number = choice.dataset['number'];
      choice.innerHTML = currentQuestion['choice' + number];
   });

   availableQuestions.splice(questionsIndex, 1);

   acceptingAnswers = true;
};

choices.forEach(choice => {
   choice.addEventListener('click', e => {
      if(!acceptingAnswers) return 

      acceptingAnswers = false;
      const selectedChoice = e.target;
      const selectedAnswer = selectedChoice.dataset['number']

      let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

      if(classToApply === 'correct') {
         incrementScore(SCORE_POINTS);
      }

      selectedChoice.parentElement.classList.add(classToApply)

      setTimeout(() => {
         selectedChoice.parentElement.classList.remove(classToApply)
         getNewQuestion();
      }, 1000);
   });
});

incrementScore = num => {
   score+=num
   scoreText.innerHTML = score

}

startGame()